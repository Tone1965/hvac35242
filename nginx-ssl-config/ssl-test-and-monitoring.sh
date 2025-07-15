#!/bin/bash

# SSL Testing and Monitoring Script
# Comprehensive SSL security testing and monitoring for hvac35242.com

set -e

DOMAIN="hvac35242.com"
WWW_DOMAIN="www.hvac35242.com"
SSL_CERT_FILE="/etc/ssl/certs/${DOMAIN}.crt"
SSL_KEY_FILE="/etc/ssl/private/${DOMAIN}.key"
NGINX_ERROR_LOG="/var/log/nginx/error.log"
NGINX_ACCESS_LOG="/var/log/nginx/access.log"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔒 SSL TESTING AND MONITORING SUITE${NC}"
echo -e "${BLUE}===================================${NC}"
echo ""

# Function to print colored output
print_status() {
    local status="$1"
    local message="$2"
    
    case $status in
        "SUCCESS")
            echo -e "${GREEN}✅ $message${NC}"
            ;;
        "ERROR")
            echo -e "${RED}❌ $message${NC}"
            ;;
        "WARNING")
            echo -e "${YELLOW}⚠️  $message${NC}"
            ;;
        "INFO")
            echo -e "${BLUE}ℹ️  $message${NC}"
            ;;
    esac
}

# Function to check if running as root
check_root_needed() {
    if [[ $EUID -ne 0 ]] && [[ "$1" == "system" ]]; then
        print_status "WARNING" "Some tests require root privileges. Run with sudo for full testing."
        return 1
    fi
    return 0
}

# Function to test nginx configuration
test_nginx_config() {
    echo -e "${BLUE}🧪 Testing Nginx Configuration${NC}"
    echo "=============================="
    
    if nginx -t 2>/dev/null; then
        print_status "SUCCESS" "Nginx configuration is valid"
        return 0
    else
        print_status "ERROR" "Nginx configuration has errors"
        echo "Error details:"
        nginx -t
        return 1
    fi
}

# Function to test nginx service status
test_nginx_service() {
    echo -e "${BLUE}🔧 Testing Nginx Service${NC}"
    echo "========================"
    
    if systemctl is-active --quiet nginx; then
        print_status "SUCCESS" "Nginx service is running"
        
        # Check if nginx is listening on correct ports
        if netstat -tlnp 2>/dev/null | grep -q ":80.*nginx" && netstat -tlnp 2>/dev/null | grep -q ":443.*nginx"; then
            print_status "SUCCESS" "Nginx is listening on ports 80 and 443"
        else
            print_status "WARNING" "Nginx may not be listening on expected ports"
            echo "Current listening ports:"
            netstat -tlnp 2>/dev/null | grep nginx || echo "No nginx ports found"
        fi
    else
        print_status "ERROR" "Nginx service is not running"
        echo "Service status:"
        systemctl status nginx --no-pager
        return 1
    fi
}

# Function to test SSL certificate files
test_ssl_certificate_files() {
    echo -e "${BLUE}📄 Testing SSL Certificate Files${NC}"
    echo "================================="
    
    # Check certificate file
    if [[ -f "$SSL_CERT_FILE" ]]; then
        print_status "SUCCESS" "Certificate file exists: $SSL_CERT_FILE"
        
        # Verify certificate format
        if openssl x509 -in "$SSL_CERT_FILE" -text -noout > /dev/null 2>&1; then
            print_status "SUCCESS" "Certificate file format is valid"
            
            # Show certificate details
            echo ""
            echo "Certificate Details:"
            echo "==================="
            openssl x509 -in "$SSL_CERT_FILE" -text -noout | grep -E "(Subject|Issuer|Not Before|Not After|DNS)" | sed 's/^/  /'
            
            # Check certificate expiry
            local expiry_date=$(openssl x509 -enddate -noout -in "$SSL_CERT_FILE" | cut -d= -f2)
            local expiry_epoch=$(date -d "$expiry_date" +%s)
            local current_epoch=$(date +%s)
            local days_until_expiry=$(( ($expiry_epoch - $current_epoch) / 86400 ))
            
            echo ""
            if [[ $days_until_expiry -gt 30 ]]; then
                print_status "SUCCESS" "Certificate expires in $days_until_expiry days ($expiry_date)"
            elif [[ $days_until_expiry -gt 0 ]]; then
                print_status "WARNING" "Certificate expires soon: $days_until_expiry days ($expiry_date)"
            else
                print_status "ERROR" "Certificate has expired! ($expiry_date)"
            fi
        else
            print_status "ERROR" "Certificate file format is invalid"
        fi
    else
        print_status "ERROR" "Certificate file not found: $SSL_CERT_FILE"
    fi
    
    # Check private key file
    if [[ -f "$SSL_KEY_FILE" ]]; then
        print_status "SUCCESS" "Private key file exists: $SSL_KEY_FILE"
        
        # Check file permissions
        local key_perms=$(stat -c %a "$SSL_KEY_FILE" 2>/dev/null)
        if [[ "$key_perms" == "600" ]]; then
            print_status "SUCCESS" "Private key has secure permissions (600)"
        else
            print_status "WARNING" "Private key permissions are $key_perms (should be 600)"
        fi
        
        # Verify private key format
        if openssl rsa -in "$SSL_KEY_FILE" -check -noout > /dev/null 2>&1; then
            print_status "SUCCESS" "Private key format is valid"
            
            # Verify certificate and key match
            if [[ -f "$SSL_CERT_FILE" ]]; then
                local cert_hash=$(openssl x509 -noout -modulus -in "$SSL_CERT_FILE" 2>/dev/null | openssl md5)
                local key_hash=$(openssl rsa -noout -modulus -in "$SSL_KEY_FILE" 2>/dev/null | openssl md5)
                
                if [[ "$cert_hash" == "$key_hash" ]]; then
                    print_status "SUCCESS" "Certificate and private key match"
                else
                    print_status "ERROR" "Certificate and private key do not match!"
                fi
            fi
        else
            print_status "ERROR" "Private key format is invalid"
        fi
    else
        print_status "ERROR" "Private key file not found: $SSL_KEY_FILE"
    fi
}

# Function to test HTTP to HTTPS redirect
test_http_redirect() {
    echo -e "${BLUE}🔄 Testing HTTP to HTTPS Redirect${NC}"
    echo "=================================="
    
    local test_url="http://$DOMAIN"
    local response=$(curl -s -I -L --max-time 10 "$test_url" 2>/dev/null || echo "CURL_FAILED")
    
    if [[ "$response" == "CURL_FAILED" ]]; then
        print_status "WARNING" "Could not test HTTP redirect (network/DNS issue)"
        return 1
    fi
    
    if echo "$response" | grep -q "301\|302"; then
        if echo "$response" | grep -q "https://"; then
            print_status "SUCCESS" "HTTP to HTTPS redirect is working"
        else
            print_status "WARNING" "Redirect found but may not be to HTTPS"
        fi
    else
        print_status "ERROR" "No HTTP to HTTPS redirect detected"
    fi
}

# Function to test HTTPS connection
test_https_connection() {
    echo -e "${BLUE}🔐 Testing HTTPS Connection${NC}"
    echo "==========================="
    
    # Test main domain
    echo "Testing $DOMAIN..."
    if curl -s --max-time 10 "https://$DOMAIN" > /dev/null 2>&1; then
        print_status "SUCCESS" "HTTPS connection to $DOMAIN successful"
    else
        print_status "ERROR" "HTTPS connection to $DOMAIN failed"
    fi
    
    # Test www domain
    echo "Testing $WWW_DOMAIN..."
    if curl -s --max-time 10 "https://$WWW_DOMAIN" > /dev/null 2>&1; then
        print_status "SUCCESS" "HTTPS connection to $WWW_DOMAIN successful"
    else
        print_status "WARNING" "HTTPS connection to $WWW_DOMAIN failed"
    fi
}

# Function to test SSL/TLS configuration
test_ssl_configuration() {
    echo -e "${BLUE}🔍 Testing SSL/TLS Configuration${NC}"
    echo "================================"
    
    # Test SSL protocols and ciphers
    local ssl_info=$(echo | openssl s_client -connect "$DOMAIN:443" -servername "$DOMAIN" 2>/dev/null)
    
    if [[ -n "$ssl_info" ]]; then
        print_status "SUCCESS" "SSL connection established"
        
        # Extract protocol version
        local protocol=$(echo "$ssl_info" | grep "Protocol" | awk '{print $3}')
        if [[ "$protocol" == "TLSv1.3" || "$protocol" == "TLSv1.2" ]]; then
            print_status "SUCCESS" "Using secure protocol: $protocol"
        else
            print_status "WARNING" "Using potentially insecure protocol: $protocol"
        fi
        
        # Extract cipher
        local cipher=$(echo "$ssl_info" | grep "Cipher" | awk '{print $3}')
        print_status "INFO" "Cipher suite: $cipher"
        
        # Check certificate chain
        local cert_chain_length=$(echo "$ssl_info" | grep -c "-----BEGIN CERTIFICATE-----")
        print_status "INFO" "Certificate chain length: $cert_chain_length"
        
    else
        print_status "ERROR" "Could not establish SSL connection"
    fi
}

# Function to test security headers
test_security_headers() {
    echo -e "${BLUE}🛡️  Testing Security Headers${NC}"
    echo "============================="
    
    local headers=$(curl -s -I --max-time 10 "https://$DOMAIN" 2>/dev/null)
    
    if [[ -z "$headers" ]]; then
        print_status "ERROR" "Could not retrieve headers"
        return 1
    fi
    
    # Check for HSTS
    if echo "$headers" | grep -qi "strict-transport-security"; then
        print_status "SUCCESS" "HSTS header present"
    else
        print_status "WARNING" "HSTS header missing"
    fi
    
    # Check for X-Frame-Options
    if echo "$headers" | grep -qi "x-frame-options"; then
        print_status "SUCCESS" "X-Frame-Options header present"
    else
        print_status "WARNING" "X-Frame-Options header missing"
    fi
    
    # Check for X-Content-Type-Options
    if echo "$headers" | grep -qi "x-content-type-options"; then
        print_status "SUCCESS" "X-Content-Type-Options header present"
    else
        print_status "WARNING" "X-Content-Type-Options header missing"
    fi
    
    # Check for CSP
    if echo "$headers" | grep -qi "content-security-policy"; then
        print_status "SUCCESS" "Content-Security-Policy header present"
    else
        print_status "WARNING" "Content-Security-Policy header missing"
    fi
}

# Function to check nginx logs for errors
check_nginx_logs() {
    echo -e "${BLUE}📋 Checking Nginx Logs${NC}"
    echo "======================"
    
    if [[ -f "$NGINX_ERROR_LOG" ]]; then
        local recent_errors=$(tail -n 50 "$NGINX_ERROR_LOG" | grep -i error | wc -l)
        if [[ $recent_errors -eq 0 ]]; then
            print_status "SUCCESS" "No recent errors in nginx error log"
        else
            print_status "WARNING" "$recent_errors recent errors found in nginx log"
            echo "Recent errors:"
            tail -n 50 "$NGINX_ERROR_LOG" | grep -i error | tail -n 5 | sed 's/^/  /'
        fi
    else
        print_status "WARNING" "Nginx error log not found: $NGINX_ERROR_LOG"
    fi
    
    # Check SSL-specific errors
    if [[ -f "$NGINX_ERROR_LOG" ]]; then
        local ssl_errors=$(tail -n 100 "$NGINX_ERROR_LOG" | grep -i "ssl\|certificate\|tls" | wc -l)
        if [[ $ssl_errors -eq 0 ]]; then
            print_status "SUCCESS" "No SSL-related errors in recent logs"
        else
            print_status "WARNING" "$ssl_errors SSL-related log entries found"
            echo "Recent SSL entries:"
            tail -n 100 "$NGINX_ERROR_LOG" | grep -i "ssl\|certificate\|tls" | tail -n 3 | sed 's/^/  /'
        fi
    fi
}

# Function to perform SSL Labs-style rating
perform_ssl_rating() {
    echo -e "${BLUE}⭐ SSL Security Rating${NC}"
    echo "===================="
    
    local score=100
    local grade="A+"
    
    # Test various security aspects
    
    # Check certificate validity
    if [[ ! -f "$SSL_CERT_FILE" ]] || ! openssl x509 -in "$SSL_CERT_FILE" -text -noout > /dev/null 2>&1; then
        score=$((score - 30))
        print_status "ERROR" "Invalid or missing certificate (-30 points)"
    fi
    
    # Check certificate expiry
    if [[ -f "$SSL_CERT_FILE" ]]; then
        local expiry_date=$(openssl x509 -enddate -noout -in "$SSL_CERT_FILE" | cut -d= -f2)
        local expiry_epoch=$(date -d "$expiry_date" +%s)
        local current_epoch=$(date +%s)
        local days_until_expiry=$(( ($expiry_epoch - $current_epoch) / 86400 ))
        
        if [[ $days_until_expiry -lt 0 ]]; then
            score=$((score - 50))
            print_status "ERROR" "Expired certificate (-50 points)"
        elif [[ $days_until_expiry -lt 30 ]]; then
            score=$((score - 10))
            print_status "WARNING" "Certificate expires soon (-10 points)"
        fi
    fi
    
    # Test HTTPS connection
    if ! curl -s --max-time 10 "https://$DOMAIN" > /dev/null 2>&1; then
        score=$((score - 25))
        print_status "ERROR" "HTTPS connection failed (-25 points)"
    fi
    
    # Test security headers
    local headers=$(curl -s -I --max-time 10 "https://$DOMAIN" 2>/dev/null)
    if [[ -n "$headers" ]]; then
        if ! echo "$headers" | grep -qi "strict-transport-security"; then
            score=$((score - 5))
            print_status "WARNING" "Missing HSTS header (-5 points)"
        fi
        
        if ! echo "$headers" | grep -qi "x-frame-options"; then
            score=$((score - 3))
            print_status "WARNING" "Missing X-Frame-Options header (-3 points)"
        fi
        
        if ! echo "$headers" | grep -qi "content-security-policy"; then
            score=$((score - 5))
            print_status "WARNING" "Missing CSP header (-5 points)"
        fi
    fi
    
    # Determine grade
    if [[ $score -ge 90 ]]; then
        grade="A+"
    elif [[ $score -ge 80 ]]; then
        grade="A"
    elif [[ $score -ge 70 ]]; then
        grade="B"
    elif [[ $score -ge 60 ]]; then
        grade="C"
    else
        grade="F"
    fi
    
    echo ""
    echo "SSL Security Score: $score/100"
    echo "SSL Security Grade: $grade"
    echo ""
    
    if [[ "$grade" == "A+" ]]; then
        print_status "SUCCESS" "Excellent SSL security configuration!"
    elif [[ "$grade" == "A" ]]; then
        print_status "SUCCESS" "Good SSL security configuration"
    elif [[ "$grade" == "B" ]]; then
        print_status "WARNING" "Acceptable SSL security, room for improvement"
    else
        print_status "ERROR" "SSL security needs improvement"
    fi
}

# Function to generate monitoring report
generate_monitoring_report() {
    echo -e "${BLUE}📊 Generating Monitoring Report${NC}"
    echo "==============================="
    
    local report_file="/tmp/ssl-monitoring-report-$(date +%Y%m%d_%H%M%S).txt"
    
    {
        echo "SSL MONITORING REPORT"
        echo "===================="
        echo "Generated: $(date)"
        echo "Domain: $DOMAIN"
        echo ""
        
        echo "CERTIFICATE INFORMATION:"
        echo "========================"
        if [[ -f "$SSL_CERT_FILE" ]]; then
            openssl x509 -in "$SSL_CERT_FILE" -text -noout | grep -E "(Subject|Issuer|Not Before|Not After|DNS)"
        else
            echo "Certificate file not found"
        fi
        echo ""
        
        echo "SERVICE STATUS:"
        echo "==============="
        systemctl status nginx --no-pager
        echo ""
        
        echo "RECENT NGINX ERRORS:"
        echo "==================="
        if [[ -f "$NGINX_ERROR_LOG" ]]; then
            tail -n 20 "$NGINX_ERROR_LOG" | grep -i "error\|ssl\|certificate" || echo "No recent SSL errors"
        else
            echo "Error log not found"
        fi
        
    } > "$report_file"
    
    print_status "SUCCESS" "Monitoring report saved: $report_file"
}

# Function to show SSL testing URLs
show_ssl_testing_urls() {
    echo -e "${BLUE}🔗 SSL Testing URLs${NC}"
    echo "=================="
    echo ""
    echo "Online SSL Testing Tools:"
    echo "========================"
    echo "SSL Labs Test:      https://www.ssllabs.com/ssltest/analyze.html?d=$DOMAIN"
    echo "Qualys SSL Test:    https://www.ssllabs.com/ssltest/"
    echo "SSL Checker:        https://www.sslchecker.com/sslchecker?host=$DOMAIN"
    echo "SSL Server Test:    https://globalsign.ssllabs.com/analyze.html?d=$DOMAIN"
    echo ""
    echo "Command Line Tests:"
    echo "=================="
    echo "OpenSSL test:       openssl s_client -connect $DOMAIN:443 -servername $DOMAIN"
    echo "Curl test:          curl -I https://$DOMAIN"
    echo "Certificate info:   openssl x509 -in $SSL_CERT_FILE -text -noout"
    echo ""
}

# Main function to run all tests
main() {
    local test_type="${1:-all}"
    
    case $test_type in
        "config")
            test_nginx_config
            ;;
        "service")
            check_root_needed "system"
            test_nginx_service
            ;;
        "certificate")
            test_ssl_certificate_files
            ;;
        "connection")
            test_http_redirect
            test_https_connection
            test_ssl_configuration
            ;;
        "security")
            test_security_headers
            ;;
        "logs")
            check_root_needed "system"
            check_nginx_logs
            ;;
        "rating")
            perform_ssl_rating
            ;;
        "report")
            check_root_needed "system"
            generate_monitoring_report
            ;;
        "urls")
            show_ssl_testing_urls
            ;;
        "all"|*)
            echo "Running comprehensive SSL testing..."
            echo ""
            test_nginx_config
            echo ""
            if check_root_needed "system"; then
                test_nginx_service
                echo ""
            fi
            test_ssl_certificate_files
            echo ""
            test_http_redirect
            test_https_connection
            test_ssl_configuration
            echo ""
            test_security_headers
            echo ""
            if check_root_needed "system"; then
                check_nginx_logs
                echo ""
            fi
            perform_ssl_rating
            echo ""
            show_ssl_testing_urls
            ;;
    esac
}

# Show usage information
if [[ "$1" == "--help" || "$1" == "-h" ]]; then
    echo "SSL Testing and Monitoring Script"
    echo ""
    echo "Usage: $0 [test_type]"
    echo ""
    echo "Test types:"
    echo "  all         - Run all tests (default)"
    echo "  config      - Test nginx configuration"
    echo "  service     - Test nginx service status"
    echo "  certificate - Test SSL certificate files"
    echo "  connection  - Test HTTP/HTTPS connections"
    echo "  security    - Test security headers"
    echo "  logs        - Check nginx logs for errors"
    echo "  rating      - Perform SSL security rating"
    echo "  report      - Generate monitoring report"
    echo "  urls        - Show SSL testing URLs"
    echo ""
    echo "Examples:"
    echo "  $0                    # Run all tests"
    echo "  $0 certificate        # Test only certificate files"
    echo "  $0 security           # Test only security headers"
    echo "  sudo $0 service       # Test service status (requires root)"
    echo ""
    exit 0
fi

# Run main function
main "$@"