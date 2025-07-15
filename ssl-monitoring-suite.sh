#!/bin/bash

# ========================================
# SSL Monitoring & Renewal Suite for hvac35242.com
# Automated SSL Health Monitoring & Alerts
# ========================================

set -e

# Configuration
DOMAIN="hvac35242.com"
WWW_DOMAIN="www.hvac35242.com"
MONITORING_LOG="ssl-monitoring.log"
ALERT_LOG="ssl-alerts.log"
EMAIL_ALERT="admin@hvac35242.com"  # Update with actual admin email
WEBHOOK_URL=""  # Add Slack/Discord webhook if needed

# Thresholds
CRITICAL_DAYS=7
WARNING_DAYS=30
CHECK_INTERVAL=3600  # 1 hour in seconds

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_entry() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" >> $MONITORING_LOG
    echo -e "$1"
}

send_alert() {
    local severity="$1"
    local message="$2"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    
    # Log alert
    echo "[$timestamp] $severity: $message" >> $ALERT_LOG
    
    # Send email alert if configured
    if command -v mail &> /dev/null && [ ! -z "$EMAIL_ALERT" ]; then
        echo "$message" | mail -s "SSL Alert - $DOMAIN ($severity)" "$EMAIL_ALERT"
    fi
    
    # Send webhook alert if configured
    if [ ! -z "$WEBHOOK_URL" ] && command -v curl &> /dev/null; then
        curl -X POST -H 'Content-type: application/json' \
             --data "{\"text\":\"SSL Alert - $DOMAIN: $message\"}" \
             "$WEBHOOK_URL" 2>/dev/null || true
    fi
    
    log_entry "${RED}ALERT SENT: $severity - $message${NC}"
}

check_certificate_expiration() {
    log_entry "${BLUE}Checking certificate expiration for $DOMAIN...${NC}"
    
    # Get certificate expiration date
    local exp_date
    exp_date=$(openssl s_client -connect $DOMAIN:443 -servername $DOMAIN < /dev/null 2>/dev/null | \
               openssl x509 -noout -enddate 2>/dev/null | cut -d= -f2)
    
    if [ -z "$exp_date" ]; then
        send_alert "CRITICAL" "Cannot retrieve SSL certificate expiration date for $DOMAIN"
        return 1
    fi
    
    # Calculate days until expiry
    local exp_timestamp current_timestamp days_until_expiry
    exp_timestamp=$(date -d "$exp_date" +%s 2>/dev/null || date -j -f "%b %d %H:%M:%S %Y %Z" "$exp_date" +%s 2>/dev/null)
    current_timestamp=$(date +%s)
    days_until_expiry=$(( (exp_timestamp - current_timestamp) / 86400 ))
    
    log_entry "Certificate expires: $exp_date"
    log_entry "Days until expiry: $days_until_expiry"
    
    # Check thresholds and send alerts
    if [ $days_until_expiry -le $CRITICAL_DAYS ]; then
        send_alert "CRITICAL" "SSL certificate expires in $days_until_expiry days - IMMEDIATE RENEWAL REQUIRED"
    elif [ $days_until_expiry -le $WARNING_DAYS ]; then
        send_alert "WARNING" "SSL certificate expires in $days_until_expiry days - renewal recommended"
    else
        log_entry "${GREEN}✓ Certificate valid for $days_until_expiry days${NC}"
    fi
    
    return 0
}

check_certificate_validity() {
    log_entry "${BLUE}Checking certificate validity...${NC}"
    
    # Test certificate chain
    local chain_result
    chain_result=$(openssl s_client -connect $DOMAIN:443 -servername $DOMAIN -verify_return_error < /dev/null 2>&1)
    
    if echo "$chain_result" | grep -q "Verify return code: 0"; then
        log_entry "${GREEN}✓ Certificate chain is valid${NC}"
    else
        send_alert "CRITICAL" "SSL certificate chain validation failed for $DOMAIN"
        return 1
    fi
    
    # Check if certificate matches domain
    local cert_subject
    cert_subject=$(openssl s_client -connect $DOMAIN:443 -servername $DOMAIN < /dev/null 2>/dev/null | \
                   openssl x509 -noout -subject 2>/dev/null | grep -o "CN=[^,]*" | cut -d= -f2)
    
    if [ ! -z "$cert_subject" ]; then
        if echo "$cert_subject" | grep -q "$DOMAIN" || echo "$cert_subject" | grep -q "\*\."; then
            log_entry "${GREEN}✓ Certificate matches domain${NC}"
        else
            send_alert "WARNING" "Certificate subject ($cert_subject) may not match domain $DOMAIN"
        fi
    fi
    
    return 0
}

check_https_accessibility() {
    log_entry "${BLUE}Checking HTTPS accessibility...${NC}"
    
    local domains=("$DOMAIN" "$WWW_DOMAIN")
    
    for test_domain in "${domains[@]}"; do
        if curl -s --connect-timeout 10 --max-time 30 "https://$test_domain" > /dev/null; then
            log_entry "${GREEN}✓ $test_domain HTTPS accessible${NC}"
        else
            send_alert "CRITICAL" "HTTPS not accessible for $test_domain"
            return 1
        fi
    done
    
    return 0
}

check_http_redirect() {
    log_entry "${BLUE}Checking HTTP to HTTPS redirect...${NC}"
    
    local domains=("$DOMAIN" "$WWW_DOMAIN")
    
    for test_domain in "${domains[@]}"; do
        local redirect_test
        redirect_test=$(curl -s -I -L --max-redirs 3 "http://$test_domain" 2>/dev/null)
        
        if echo "$redirect_test" | grep -qi "301\|302" && echo "$redirect_test" | grep -qi "https://"; then
            log_entry "${GREEN}✓ $test_domain redirects HTTP to HTTPS${NC}"
        else
            send_alert "WARNING" "HTTP to HTTPS redirect not working properly for $test_domain"
        fi
    done
}

check_ssl_protocols() {
    log_entry "${BLUE}Checking SSL protocol security...${NC}"
    
    # Check if insecure protocols are disabled
    local insecure_protocols=("ssl3" "tls1" "tls1_1")
    
    for protocol in "${insecure_protocols[@]}"; do
        if timeout 10 openssl s_client -connect $DOMAIN:443 -$protocol < /dev/null 2>/dev/null | grep -q "BEGIN CERTIFICATE"; then
            send_alert "WARNING" "Insecure protocol $protocol is enabled on $DOMAIN"
        else
            log_entry "${GREEN}✓ Insecure protocol $protocol is disabled${NC}"
        fi
    done
    
    # Check if secure protocols are enabled
    local secure_protocols=("tls1_2" "tls1_3")
    local secure_enabled=false
    
    for protocol in "${secure_protocols[@]}"; do
        if timeout 10 openssl s_client -connect $DOMAIN:443 -$protocol < /dev/null 2>/dev/null | grep -q "BEGIN CERTIFICATE"; then
            log_entry "${GREEN}✓ Secure protocol $protocol is enabled${NC}"
            secure_enabled=true
        fi
    done
    
    if [ "$secure_enabled" = false ]; then
        send_alert "CRITICAL" "No secure TLS protocols (1.2 or 1.3) are enabled on $DOMAIN"
    fi
}

check_certificate_issuer() {
    log_entry "${BLUE}Checking certificate issuer...${NC}"
    
    local issuer
    issuer=$(openssl s_client -connect $DOMAIN:443 -servername $DOMAIN < /dev/null 2>/dev/null | \
             openssl x509 -noout -issuer 2>/dev/null | sed 's/.*CN=//')
    
    if [ ! -z "$issuer" ]; then
        log_entry "Certificate issuer: $issuer"
        
        # Check if it's still a Sectigo certificate
        if echo "$issuer" | grep -qi "sectigo\|comodo"; then
            log_entry "${GREEN}✓ Certificate issued by Sectigo${NC}"
        else
            send_alert "INFO" "Certificate issuer changed to: $issuer"
        fi
    else
        send_alert "WARNING" "Cannot retrieve certificate issuer information"
    fi
}

run_health_check() {
    log_entry "${BLUE}========================================${NC}"
    log_entry "${BLUE}SSL Health Check - $(date)${NC}"
    log_entry "${BLUE}========================================${NC}"
    
    local overall_status=0
    
    # Run all checks
    check_certificate_expiration || overall_status=1
    check_certificate_validity || overall_status=1
    check_https_accessibility || overall_status=1
    check_http_redirect
    check_ssl_protocols
    check_certificate_issuer
    
    if [ $overall_status -eq 0 ]; then
        log_entry "${GREEN}✓ SSL health check completed - no critical issues${NC}"
    else
        log_entry "${RED}✗ SSL health check completed - critical issues found${NC}"
    fi
    
    log_entry "${BLUE}========================================${NC}"
    
    return $overall_status
}

generate_ssl_report() {
    local report_file="ssl-status-report-$(date +%Y%m%d-%H%M%S).txt"
    
    cat > "$report_file" << EOF
SSL Status Report for $DOMAIN
Generated: $(date)

========================================
CERTIFICATE INFORMATION
========================================
EOF
    
    # Get certificate details
    openssl s_client -connect $DOMAIN:443 -servername $DOMAIN < /dev/null 2>/dev/null | \
    openssl x509 -noout -text 2>/dev/null >> "$report_file"
    
    cat >> "$report_file" << EOF

========================================
RECENT MONITORING LOG (Last 50 entries)
========================================
EOF
    
    if [ -f "$MONITORING_LOG" ]; then
        tail -50 "$MONITORING_LOG" >> "$report_file"
    fi
    
    cat >> "$report_file" << EOF

========================================
RECENT ALERTS (Last 20 entries)
========================================
EOF
    
    if [ -f "$ALERT_LOG" ]; then
        tail -20 "$ALERT_LOG" >> "$report_file"
    fi
    
    log_entry "SSL report generated: $report_file"
}

start_monitoring_daemon() {
    log_entry "${BLUE}Starting SSL monitoring daemon...${NC}"
    log_entry "Check interval: $CHECK_INTERVAL seconds"
    log_entry "Critical threshold: $CRITICAL_DAYS days"
    log_entry "Warning threshold: $WARNING_DAYS days"
    
    while true; do
        run_health_check
        
        # Sleep for the specified interval
        sleep $CHECK_INTERVAL
    done
}

# Certificate renewal automation
auto_renew_certificate() {
    log_entry "${BLUE}Attempting automatic certificate renewal...${NC}"
    
    # Check if certbot is available
    if command -v certbot &> /dev/null; then
        log_entry "Running certbot renewal..."
        
        if certbot renew --quiet --no-self-upgrade; then
            log_entry "${GREEN}✓ Certificate renewal successful${NC}"
            send_alert "INFO" "SSL certificate successfully renewed for $DOMAIN"
            
            # Restart web server if needed
            if systemctl is-active --quiet nginx; then
                systemctl reload nginx
                log_entry "Nginx reloaded"
            elif systemctl is-active --quiet apache2; then
                systemctl reload apache2
                log_entry "Apache reloaded"
            fi
        else
            send_alert "CRITICAL" "Certificate renewal failed for $DOMAIN"
            return 1
        fi
    else
        send_alert "WARNING" "Certbot not available for automatic renewal"
        return 1
    fi
}

# Main menu
show_menu() {
    echo -e "\n${BLUE}SSL Monitoring Suite for $DOMAIN${NC}"
    echo -e "${BLUE}========================================${NC}"
    echo "1. Run single health check"
    echo "2. Start monitoring daemon"
    echo "3. Generate SSL report"
    echo "4. Attempt certificate renewal"
    echo "5. View recent alerts"
    echo "6. View monitoring log"
    echo "7. Exit"
    echo -e "${BLUE}========================================${NC}"
}

case "${1:-menu}" in
    "check")
        run_health_check
        ;;
    "monitor")
        start_monitoring_daemon
        ;;
    "report")
        generate_ssl_report
        ;;
    "renew")
        auto_renew_certificate
        ;;
    "alerts")
        if [ -f "$ALERT_LOG" ]; then
            tail -20 "$ALERT_LOG"
        else
            echo "No alerts found"
        fi
        ;;
    "log")
        if [ -f "$MONITORING_LOG" ]; then
            tail -50 "$MONITORING_LOG"
        else
            echo "No monitoring log found"
        fi
        ;;
    "menu"|*)
        while true; do
            show_menu
            read -p "Select option: " choice
            case $choice in
                1) run_health_check ;;
                2) start_monitoring_daemon ;;
                3) generate_ssl_report ;;
                4) auto_renew_certificate ;;
                5) 
                    if [ -f "$ALERT_LOG" ]; then
                        tail -20 "$ALERT_LOG"
                    else
                        echo "No alerts found"
                    fi
                    ;;
                6)
                    if [ -f "$MONITORING_LOG" ]; then
                        tail -50 "$MONITORING_LOG"
                    else
                        echo "No monitoring log found"
                    fi
                    ;;
                7) exit 0 ;;
                *) echo "Invalid option" ;;
            esac
            echo -e "\nPress Enter to continue..."
            read
        done
        ;;
esac