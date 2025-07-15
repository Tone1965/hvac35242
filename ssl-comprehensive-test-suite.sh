#!/bin/bash

# ========================================
# COMPREHENSIVE SSL TESTING SUITE FOR HVAC35242.COM
# Complete SSL Certificate Verification & Security Testing
# Combines all SSL testing procedures into a unified suite
# ========================================

set -e

# Configuration
DOMAIN="hvac35242.com"
WWW_DOMAIN="www.hvac35242.com"
TEST_SUITE_VERSION="2.0"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
RESULTS_DIR="ssl-test-results-$TIMESTAMP"
MAIN_LOG="$RESULTS_DIR/ssl-comprehensive-test.log"
EMAIL_ALERT="admin@hvac35242.com"

# Test configuration
CRITICAL_DAYS=7
WARNING_DAYS=30
SSL_LABS_GRADE_TARGET="A+"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

# Test counters
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0
WARNING_TESTS=0

# Create results directory
mkdir -p "$RESULTS_DIR"
echo "SSL Comprehensive Testing Suite v$TEST_SUITE_VERSION" > "$MAIN_LOG"
echo "Domain: $DOMAIN" >> "$MAIN_LOG"
echo "Timestamp: $(date)" >> "$MAIN_LOG"
echo "========================================" >> "$MAIN_LOG"

# Logging functions
log_result() {
    echo -e "$1" | tee -a "$MAIN_LOG"
}

log_test_start() {
    ((TOTAL_TESTS++))
    log_result "${BLUE}[TEST $TOTAL_TESTS] $1${NC}"
}

log_test_pass() {
    ((PASSED_TESTS++))
    log_result "${GREEN}✓ PASS: $1${NC}"
}

log_test_fail() {
    ((FAILED_TESTS++))
    log_result "${RED}✗ FAIL: $1${NC}"
}

log_test_warn() {
    ((WARNING_TESTS++))
    log_result "${YELLOW}⚠ WARNING: $1${NC}"
}

print_header() {
    echo -e "\n${PURPLE}============================================${NC}"
    echo -e "${PURPLE}$1${NC}"
    echo -e "${PURPLE}============================================${NC}"
    log_result "\n============================================"
    log_result "$1"
    log_result "============================================"
}

print_subheader() {
    echo -e "\n${CYAN}--- $1 ---${NC}"
    log_result "\n--- $1 ---"
}

# ========================================
# SECTION 1: BASIC SSL CERTIFICATE TESTS
# ========================================

test_certificate_retrieval() {
    print_subheader "Certificate Retrieval"
    
    log_test_start "Retrieving SSL certificate for $DOMAIN"
    
    cert_info=$(timeout 15 openssl s_client -connect $DOMAIN:443 -servername $DOMAIN < /dev/null 2>/dev/null | openssl x509 -noout -text 2>/dev/null || echo "FAILED")
    
    if [ "$cert_info" != "FAILED" ] && [ ! -z "$cert_info" ]; then
        log_test_pass "SSL certificate retrieved successfully"
        
        # Extract and log certificate details
        issuer=$(echo "$cert_info" | grep -E "Issuer.*CN" | sed 's/.*CN *= *//' | cut -d',' -f1)
        subject=$(echo "$cert_info" | grep -E "Subject.*CN" | sed 's/.*CN *= *//' | cut -d',' -f1)
        not_before=$(echo "$cert_info" | grep "Not Before" | cut -d: -f2-)
        not_after=$(echo "$cert_info" | grep "Not After" | cut -d: -f2-)
        
        log_result "  Certificate Issuer: $issuer"
        log_result "  Certificate Subject: $subject"
        log_result "  Valid From: $not_before"
        log_result "  Valid Until: $not_after"
        
        # Check if it's a Sectigo certificate
        if echo "$issuer" | grep -qi "sectigo\|comodo"; then
            log_test_pass "Sectigo certificate detected"
        else
            log_test_warn "Certificate not issued by Sectigo (Issuer: $issuer)"
        fi
        
        return 0
    else
        log_test_fail "Failed to retrieve SSL certificate"
        return 1
    fi
}

test_certificate_chain_validation() {
    print_subheader "Certificate Chain Validation"
    
    log_test_start "Validating certificate chain"
    
    chain_result=$(timeout 15 openssl s_client -connect $DOMAIN:443 -servername $DOMAIN -verify_return_error < /dev/null 2>&1 || echo "FAILED")
    
    if echo "$chain_result" | grep -q "Verify return code: 0"; then
        log_test_pass "Certificate chain is valid"
        
        # Count certificates in chain
        cert_count=$(echo "$chain_result" | grep -c "BEGIN CERTIFICATE" || echo "0")
        log_result "  Certificates in chain: $cert_count"
        
        if [ "$cert_count" -ge 2 ]; then
            log_test_pass "Complete certificate chain present"
        else
            log_test_warn "Incomplete certificate chain (only $cert_count certificates)"
        fi
        
        return 0
    else
        log_test_fail "Certificate chain validation failed"
        log_result "Error details: $(echo "$chain_result" | grep -E "verify error|error:" | head -3)"
        return 1
    fi
}

test_certificate_expiration() {
    print_subheader "Certificate Expiration Analysis"
    
    log_test_start "Checking certificate expiration"
    
    exp_date=$(timeout 10 openssl s_client -connect $DOMAIN:443 -servername $DOMAIN < /dev/null 2>/dev/null | openssl x509 -noout -enddate 2>/dev/null | cut -d= -f2)
    
    if [ ! -z "$exp_date" ]; then
        exp_timestamp=$(date -d "$exp_date" +%s 2>/dev/null || date -j -f "%b %d %H:%M:%S %Y %Z" "$exp_date" +%s 2>/dev/null)
        current_timestamp=$(date +%s)
        days_until_expiry=$(( (exp_timestamp - current_timestamp) / 86400 ))
        
        log_result "  Certificate expires: $exp_date"
        log_result "  Days until expiry: $days_until_expiry"
        
        if [ $days_until_expiry -le $CRITICAL_DAYS ]; then
            log_test_fail "Certificate expires in $days_until_expiry days - IMMEDIATE RENEWAL REQUIRED"
        elif [ $days_until_expiry -le $WARNING_DAYS ]; then
            log_test_warn "Certificate expires in $days_until_expiry days - renewal recommended"
        else
            log_test_pass "Certificate valid for $days_until_expiry days"
        fi
        
        return 0
    else
        log_test_fail "Could not retrieve certificate expiration date"
        return 1
    fi
}

# ========================================
# SECTION 2: SSL PROTOCOL AND CIPHER TESTS
# ========================================

test_ssl_protocols() {
    print_subheader "SSL/TLS Protocol Testing"
    
    protocols=("ssl3" "tls1" "tls1_1" "tls1_2" "tls1_3")
    
    for protocol in "${protocols[@]}"; do
        log_test_start "Testing $protocol support"
        
        if timeout 10 openssl s_client -connect $DOMAIN:443 -$protocol < /dev/null 2>/dev/null | grep -q "BEGIN CERTIFICATE"; then
            if [ "$protocol" = "ssl3" ] || [ "$protocol" = "tls1" ] || [ "$protocol" = "tls1_1" ]; then
                log_test_fail "$protocol is enabled (security vulnerability)"
            else
                log_test_pass "$protocol is supported"
            fi
        else
            if [ "$protocol" = "ssl3" ] || [ "$protocol" = "tls1" ] || [ "$protocol" = "tls1_1" ]; then
                log_test_pass "$protocol is disabled (good for security)"
            else
                log_test_warn "$protocol is not supported"
            fi
        fi
    done
}

test_cipher_suites() {
    print_subheader "Cipher Suite Analysis"
    
    log_test_start "Analyzing active cipher suites"
    
    cipher_info=$(timeout 10 openssl s_client -connect $DOMAIN:443 -servername $DOMAIN < /dev/null 2>/dev/null | grep "Cipher.*:" | cut -d: -f2 | tr -d ' ')
    
    if [ ! -z "$cipher_info" ]; then
        log_result "  Active cipher: $cipher_info"
        
        # Check for strong encryption
        case $cipher_info in
            *"ECDHE"*|*"DHE"*)
                log_test_pass "Perfect Forward Secrecy (PFS) supported"
                ;;
            *)
                log_test_warn "Perfect Forward Secrecy may not be supported"
                ;;
        esac
        
        case $cipher_info in
            *"AES256-GCM"*|*"AES128-GCM"*|*"CHACHA20"*)
                log_test_pass "Strong AEAD cipher in use"
                ;;
            *"AES256"*|*"AES128"*)
                log_test_pass "Strong AES encryption in use"
                ;;
            *"3DES"*|*"RC4"*|*"DES"*)
                log_test_fail "Weak cipher detected: $cipher_info"
                ;;
            *)
                log_test_warn "Unknown cipher strength: $cipher_info"
                ;;
        esac
        
        return 0
    else
        log_test_fail "Could not retrieve cipher information"
        return 1
    fi
}

# ========================================
# SECTION 3: DOMAIN AND CONNECTIVITY TESTS
# ========================================

test_domain_variations() {
    print_subheader "Domain Variation Testing"
    
    domains=("$DOMAIN" "$WWW_DOMAIN")
    
    for test_domain in "${domains[@]}"; do
        log_test_start "Testing HTTPS connectivity for $test_domain"
        
        response=$(timeout 15 curl -s -w "%{http_code},%{time_total},%{time_connect},%{time_appconnect}" -o /dev/null "https://$test_domain" 2>/dev/null || echo "000,0,0,0")
        
        IFS=',' read -r http_code total_time connect_time appconnect_time <<< "$response"
        
        if [ "$http_code" = "200" ]; then
            ssl_time=$(echo "$appconnect_time - $connect_time" | bc 2>/dev/null || echo "N/A")
            log_test_pass "$test_domain HTTPS accessible (HTTP $http_code, SSL handshake: ${ssl_time}s)"
        else
            log_test_fail "$test_domain HTTPS not accessible (HTTP $http_code)"
            continue
        fi
        
        # Test certificate subject match
        cert_subject=$(timeout 10 openssl s_client -connect $test_domain:443 -servername $test_domain < /dev/null 2>/dev/null | openssl x509 -noout -subject 2>/dev/null | grep -o "CN=[^,]*" | cut -d= -f2)
        
        if [ ! -z "$cert_subject" ]; then
            if echo "$cert_subject" | grep -q "$test_domain" || echo "$cert_subject" | grep -q "\*\."; then
                log_test_pass "Certificate matches $test_domain"
            else
                log_test_warn "Certificate subject mismatch for $test_domain (cert: $cert_subject)"
            fi
        fi
    done
}

test_http_to_https_redirect() {
    print_subheader "HTTP to HTTPS Redirect Testing"
    
    for test_domain in "$DOMAIN" "$WWW_DOMAIN"; do
        log_test_start "Testing HTTP redirect for $test_domain"
        
        redirect_response=$(timeout 10 curl -s -I -L --max-redirs 3 "http://$test_domain" 2>/dev/null || echo "FAILED")
        
        if [ "$redirect_response" = "FAILED" ]; then
            log_test_fail "Could not test HTTP redirect for $test_domain"
            continue
        fi
        
        if echo "$redirect_response" | grep -qi "301\|302"; then
            if echo "$redirect_response" | grep -qi "https://"; then
                log_test_pass "$test_domain redirects HTTP to HTTPS"
            else
                log_test_warn "$test_domain redirects but not to HTTPS"
            fi
        else
            log_test_fail "$test_domain does not redirect HTTP to HTTPS"
        fi
    done
}

# ========================================
# SECTION 4: SECURITY HEADERS AND FEATURES
# ========================================

test_security_headers() {
    print_subheader "Security Headers Analysis"
    
    log_test_start "Checking HTTP security headers"
    
    headers=$(timeout 10 curl -s -I "https://$DOMAIN" 2>/dev/null || echo "FAILED")
    
    if [ "$headers" = "FAILED" ]; then
        log_test_fail "Could not retrieve HTTP headers"
        return 1
    fi
    
    # Test HSTS
    if echo "$headers" | grep -qi "strict-transport-security"; then
        hsts_header=$(echo "$headers" | grep -i "strict-transport-security" | cut -d: -f2- | tr -d ' \r')
        log_test_pass "HSTS header present: $hsts_header"
        
        # Analyze HSTS parameters
        if echo "$hsts_header" | grep -q "max-age="; then
            max_age=$(echo "$hsts_header" | grep -o "max-age=[0-9]*" | cut -d= -f2)
            if [ "$max_age" -ge 31536000 ]; then
                log_test_pass "HSTS max-age meets recommended minimum (≥1 year)"
            else
                log_test_warn "HSTS max-age below recommended minimum ($max_age < 31536000)"
            fi
        fi
        
        if echo "$hsts_header" | grep -q "includeSubDomains"; then
            log_test_pass "HSTS includeSubDomains directive present"
        else
            log_test_warn "HSTS includeSubDomains directive missing"
        fi
        
        if echo "$hsts_header" | grep -q "preload"; then
            log_test_pass "HSTS preload directive present"
        else
            log_test_warn "HSTS preload directive missing"
        fi
    else
        log_test_fail "HSTS header not present"
    fi
    
    # Test other security headers
    security_headers=(
        "X-Frame-Options:Clickjacking protection"
        "X-Content-Type-Options:MIME sniffing protection"
        "X-XSS-Protection:XSS protection"
        "Content-Security-Policy:Content Security Policy"
        "Referrer-Policy:Referrer policy"
    )
    
    for header_check in "${security_headers[@]}"; do
        IFS=':' read -r header_name description <<< "$header_check"
        log_test_start "Checking $description ($header_name)"
        
        if echo "$headers" | grep -qi "$header_name"; then
            header_value=$(echo "$headers" | grep -i "$header_name" | cut -d: -f2- | tr -d ' \r')
            log_test_pass "$header_name present: $header_value"
        else
            log_test_warn "$header_name missing"
        fi
    done
}

# ========================================
# SECTION 5: BROWSER COMPATIBILITY TESTS
# ========================================

test_browser_compatibility() {
    print_subheader "Browser Compatibility Testing"
    
    # Modern browser user agents
    declare -A browsers=(
        ["Chrome Latest"]="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
        ["Firefox Latest"]="Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:119.0) Gecko/20100101 Firefox/119.0"
        ["Safari Latest"]="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15"
        ["Edge Latest"]="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0"
        ["Chrome Mobile"]="Mozilla/5.0 (Linux; Android 13; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36"
        ["Safari iOS"]="Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
    )
    
    for browser in "${!browsers[@]}"; do
        log_test_start "Testing $browser compatibility"
        
        response=$(timeout 15 curl -s -w "%{http_code},%{time_total}" -o /dev/null -H "User-Agent: ${browsers[$browser]}" "https://$DOMAIN" 2>/dev/null || echo "000,0")
        
        IFS=',' read -r http_code total_time <<< "$response"
        
        if [ "$http_code" = "200" ]; then
            log_test_pass "$browser: SSL connection successful (${total_time}s)"
        else
            log_test_fail "$browser: SSL connection failed (HTTP $http_code)"
        fi
    done
}

# ========================================
# SECTION 6: CERTIFICATE TECHNICAL ANALYSIS
# ========================================

test_certificate_technical_details() {
    print_subheader "Certificate Technical Analysis"
    
    log_test_start "Analyzing certificate technical details"
    
    cert_details=$(timeout 10 openssl s_client -connect $DOMAIN:443 -servername $DOMAIN < /dev/null 2>/dev/null | openssl x509 -noout -text 2>/dev/null)
    
    if [ -z "$cert_details" ]; then
        log_test_fail "Could not retrieve certificate details"
        return 1
    fi
    
    # Check key size
    key_size=$(echo "$cert_details" | grep -E "RSA Public-Key|Public-Key" | grep -o "[0-9]\+ bit" | cut -d' ' -f1)
    if [ ! -z "$key_size" ]; then
        log_result "  RSA key size: $key_size bits"
        if [ "$key_size" -ge 2048 ]; then
            log_test_pass "Key size meets modern standards (≥2048 bits)"
        else
            log_test_fail "Key size below recommended minimum ($key_size < 2048)"
        fi
    fi
    
    # Check signature algorithm
    sig_alg=$(echo "$cert_details" | grep "Signature Algorithm" | head -1 | cut -d: -f2 | tr -d ' ')
    if [ ! -z "$sig_alg" ]; then
        log_result "  Signature algorithm: $sig_alg"
        case $sig_alg in
            *"sha256"*|*"sha384"*|*"sha512"*)
                log_test_pass "Modern signature algorithm in use"
                ;;
            *"sha1"*|*"md5"*)
                log_test_fail "Deprecated signature algorithm: $sig_alg"
                ;;
            *)
                log_test_warn "Unknown signature algorithm: $sig_alg"
                ;;
        esac
    fi
    
    # Check Subject Alternative Names (SAN)
    san_count=$(echo "$cert_details" | grep -A 20 "Subject Alternative Name" | grep -c "DNS:" || echo "0")
    if [ "$san_count" -gt 0 ]; then
        log_test_pass "Certificate has $san_count SAN entries"
        echo "$cert_details" | grep -A 20 "Subject Alternative Name" | grep "DNS:" | while read line; do
            log_result "    $line"
        done
    else
        log_test_warn "No SAN entries found in certificate"
    fi
    
    # Check certificate extensions
    if echo "$cert_details" | grep -q "Authority Information Access"; then
        log_test_pass "Authority Information Access extension present"
    else
        log_test_warn "Authority Information Access extension missing"
    fi
    
    if echo "$cert_details" | grep -q "CRL Distribution Points"; then
        log_test_pass "CRL Distribution Points extension present"
    else
        log_test_warn "CRL Distribution Points extension missing"
    fi
}

# ========================================
# SECTION 7: SSL PERFORMANCE TESTING
# ========================================

test_ssl_performance() {
    print_subheader "SSL Performance Testing"
    
    log_test_start "Measuring SSL handshake performance"
    
    # Perform multiple tests for average
    total_handshake_time=0
    successful_tests=0
    
    for i in {1..5}; do
        timing=$(timeout 10 curl -w "%{time_connect},%{time_appconnect},%{time_total}" -o /dev/null -s "https://$DOMAIN" 2>/dev/null || echo "0,0,0")
        
        IFS=',' read -r connect_time appconnect_time total_time <<< "$timing"
        
        if [ "$connect_time" != "0" ] && [ "$appconnect_time" != "0" ]; then
            handshake_time=$(echo "$appconnect_time - $connect_time" | bc 2>/dev/null || echo "0")
            if [ "$handshake_time" != "0" ]; then
                total_handshake_time=$(echo "$total_handshake_time + $handshake_time" | bc 2>/dev/null)
                ((successful_tests++))
            fi
        fi
    done
    
    if [ $successful_tests -gt 0 ]; then
        avg_handshake_time=$(echo "scale=3; $total_handshake_time / $successful_tests" | bc 2>/dev/null)
        log_result "  Average SSL handshake time: ${avg_handshake_time}s (from $successful_tests tests)"
        
        if (( $(echo "$avg_handshake_time < 0.5" | bc -l 2>/dev/null) )); then
            log_test_pass "SSL handshake performance is excellent (<0.5s)"
        elif (( $(echo "$avg_handshake_time < 1.0" | bc -l 2>/dev/null) )); then
            log_test_pass "SSL handshake performance is good (<1.0s)"
        elif (( $(echo "$avg_handshake_time < 2.0" | bc -l 2>/dev/null) )); then
            log_test_warn "SSL handshake performance could be improved (<2.0s)"
        else
            log_test_fail "SSL handshake performance is poor (≥2.0s)"
        fi
    else
        log_test_fail "Could not measure SSL handshake performance"
    fi
}

# ========================================
# SECTION 8: EXTERNAL VALIDATION
# ========================================

test_external_validation() {
    print_subheader "External SSL Validation"
    
    log_test_start "Checking external SSL validation services"
    
    # Try to use SSL Labs if available
    if command -v ssllabs-scan &> /dev/null; then
        log_result "Running SSL Labs analysis..."
        ssl_labs_result=$(timeout 120 ssllabs-scan -quiet -usecache $DOMAIN 2>/dev/null || echo "FAILED")
        
        if [ "$ssl_labs_result" != "FAILED" ]; then
            grade=$(echo "$ssl_labs_result" | grep -o "Grade: [A-F][+-]*" | cut -d' ' -f2)
            if [ ! -z "$grade" ]; then
                log_result "  SSL Labs Grade: $grade"
                if [ "$grade" = "A+" ] || [ "$grade" = "A" ]; then
                    log_test_pass "SSL Labs grade is excellent: $grade"
                elif [ "$grade" = "B" ]; then
                    log_test_warn "SSL Labs grade needs improvement: $grade"
                else
                    log_test_fail "SSL Labs grade is poor: $grade"
                fi
            fi
        else
            log_test_warn "SSL Labs scan failed or timed out"
        fi
    else
        log_result "SSL Labs scanner not available"
        log_result "Manual check recommended at: https://www.ssllabs.com/ssltest/analyze.html?d=$DOMAIN"
    fi
    
    # Test OCSP stapling
    log_test_start "Testing OCSP stapling"
    ocsp_result=$(timeout 15 openssl s_client -connect $DOMAIN:443 -servername $DOMAIN -status < /dev/null 2>/dev/null | grep -A 5 "OCSP Response Status")
    
    if echo "$ocsp_result" | grep -q "successful"; then
        log_test_pass "OCSP stapling is working"
    else
        log_test_warn "OCSP stapling not detected or not working"
    fi
}

# ========================================
# SECTION 9: MONITORING AND ALERTS SETUP
# ========================================

setup_monitoring() {
    print_subheader "SSL Monitoring Setup"
    
    log_test_start "Setting up SSL monitoring"
    
    # Create monitoring script
    monitoring_script="$RESULTS_DIR/ssl-monitor-cron.sh"
    cat > "$monitoring_script" << 'EOF'
#!/bin/bash
# Automated SSL monitoring script
# Add to crontab: 0 */6 * * * /path/to/ssl-monitor-cron.sh

DOMAIN="hvac35242.com"
LOG_FILE="/var/log/ssl-monitor.log"
ALERT_EMAIL="admin@hvac35242.com"

# Check certificate expiration
exp_date=$(openssl s_client -connect $DOMAIN:443 -servername $DOMAIN < /dev/null 2>/dev/null | openssl x509 -noout -enddate 2>/dev/null | cut -d= -f2)

if [ ! -z "$exp_date" ]; then
    exp_timestamp=$(date -d "$exp_date" +%s 2>/dev/null || date -j -f "%b %d %H:%M:%S %Y %Z" "$exp_date" +%s 2>/dev/null)
    current_timestamp=$(date +%s)
    days_until_expiry=$(( (exp_timestamp - current_timestamp) / 86400 ))
    
    echo "$(date): SSL certificate expires in $days_until_expiry days" >> $LOG_FILE
    
    if [ $days_until_expiry -le 7 ]; then
        echo "URGENT: SSL certificate for $DOMAIN expires in $days_until_expiry days" | mail -s "SSL Certificate Expiry Alert" $ALERT_EMAIL
    elif [ $days_until_expiry -le 30 ]; then
        echo "WARNING: SSL certificate for $DOMAIN expires in $days_until_expiry days" | mail -s "SSL Certificate Expiry Warning" $ALERT_EMAIL
    fi
fi

# Test HTTPS connectivity
if ! curl -s --connect-timeout 10 "https://$DOMAIN" > /dev/null; then
    echo "$(date): HTTPS connectivity failed for $DOMAIN" >> $LOG_FILE
    echo "ALERT: HTTPS connectivity failed for $DOMAIN" | mail -s "SSL Connectivity Alert" $ALERT_EMAIL
fi
EOF
    
    chmod +x "$monitoring_script"
    log_test_pass "SSL monitoring script created: $monitoring_script"
    log_result "  To enable monitoring, add to crontab:"
    log_result "  0 */6 * * * $monitoring_script"
}

# ========================================
# SECTION 10: REPORT GENERATION
# ========================================

generate_comprehensive_report() {
    print_subheader "Generating Comprehensive Report"
    
    local html_report="$RESULTS_DIR/ssl-comprehensive-report.html"
    local json_report="$RESULTS_DIR/ssl-test-results.json"
    local text_summary="$RESULTS_DIR/ssl-test-summary.txt"
    
    # Generate HTML Report
    cat > "$html_report" << EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SSL Comprehensive Test Report - $DOMAIN</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; border-radius: 10px; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
        .header h1 { margin: 0; font-size: 2.5em; }
        .header p { margin: 5px 0; opacity: 0.9; }
        .summary { padding: 30px; background: #f8f9fa; border-bottom: 1px solid #e9ecef; }
        .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0; }
        .stat { text-align: center; padding: 20px; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .stat-number { font-size: 2.5em; font-weight: bold; margin-bottom: 10px; }
        .stat-label { color: #666; font-size: 0.9em; text-transform: uppercase; letter-spacing: 1px; }
        .pass { color: #28a745; }
        .fail { color: #dc3545; }
        .warn { color: #ffc107; }
        .content { padding: 30px; }
        .section { margin-bottom: 40px; }
        .section h2 { color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px; }
        .test-item { padding: 15px; margin: 10px 0; border-left: 4px solid #ddd; background: #f8f9fa; border-radius: 0 5px 5px 0; }
        .test-item.pass { border-left-color: #28a745; }
        .test-item.fail { border-left-color: #dc3545; }
        .test-item.warn { border-left-color: #ffc107; }
        .recommendations { background: #e7f3ff; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .recommendations h3 { color: #0066cc; margin-top: 0; }
        .footer { text-align: center; padding: 20px; color: #666; border-top: 1px solid #e9ecef; }
        .links { background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .links h3 { color: #856404; margin-top: 0; }
        .links a { color: #0066cc; text-decoration: none; }
        .links a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>SSL Comprehensive Test Report</h1>
            <p><strong>Domain:</strong> $DOMAIN</p>
            <p><strong>Test Date:</strong> $(date)</p>
            <p><strong>Test Suite Version:</strong> $TEST_SUITE_VERSION</p>
        </div>
        
        <div class="summary">
            <h2>Test Summary</h2>
            <div class="stats">
                <div class="stat">
                    <div class="stat-number pass">$PASSED_TESTS</div>
                    <div class="stat-label">Tests Passed</div>
                </div>
                <div class="stat">
                    <div class="stat-number fail">$FAILED_TESTS</div>
                    <div class="stat-label">Tests Failed</div>
                </div>
                <div class="stat">
                    <div class="stat-number warn">$WARNING_TESTS</div>
                    <div class="stat-label">Warnings</div>
                </div>
                <div class="stat">
                    <div class="stat-number">$TOTAL_TESTS</div>
                    <div class="stat-label">Total Tests</div>
                </div>
            </div>
        </div>
        
        <div class="content">
            <div class="section">
                <h2>Test Categories Completed</h2>
                <div class="test-item pass">
                    <strong>✓ Certificate Validation</strong><br>
                    Certificate retrieval, chain validation, and expiration checks
                </div>
                <div class="test-item pass">
                    <strong>✓ Protocol & Cipher Analysis</strong><br>
                    SSL/TLS protocol support and cipher suite security
                </div>
                <div class="test-item pass">
                    <strong>✓ Domain Connectivity</strong><br>
                    HTTPS access and HTTP redirect testing
                </div>
                <div class="test-item pass">
                    <strong>✓ Security Headers</strong><br>
                    HSTS, CSP, and other security header analysis
                </div>
                <div class="test-item pass">
                    <strong>✓ Browser Compatibility</strong><br>
                    Cross-browser SSL support testing
                </div>
                <div class="test-item pass">
                    <strong>✓ Performance Testing</strong><br>
                    SSL handshake performance measurement
                </div>
            </div>
            
            <div class="recommendations">
                <h3>Key Recommendations</h3>
                <ul>
                    <li>Monitor certificate expiration dates regularly</li>
                    <li>Ensure TLS 1.2 and 1.3 are enabled, disable older protocols</li>
                    <li>Implement comprehensive security headers (HSTS, CSP)</li>
                    <li>Use strong cipher suites with Perfect Forward Secrecy</li>
                    <li>Regular SSL Labs testing for security rating</li>
                    <li>Set up automated certificate renewal</li>
                </ul>
            </div>
            
            <div class="links">
                <h3>External Validation Links</h3>
                <ul>
                    <li><a href="https://www.ssllabs.com/ssltest/analyze.html?d=$DOMAIN" target="_blank">SSL Labs Test</a></li>
                    <li><a href="https://www.sslchecker.com/sslchecker?host=$DOMAIN" target="_blank">SSL Checker</a></li>
                    <li><a href="https://securityheaders.com/?q=https://$DOMAIN" target="_blank">Security Headers Test</a></li>
                    <li><a href="https://hstspreload.org/?domain=$DOMAIN" target="_blank">HSTS Preload Status</a></li>
                </ul>
            </div>
        </div>
        
        <div class="footer">
            <p>SSL Comprehensive Testing Suite v$TEST_SUITE_VERSION</p>
            <p>Generated on $(date) for $DOMAIN</p>
        </div>
    </div>
</body>
</html>
EOF

    # Generate JSON Report
    cat > "$json_report" << EOF
{
    "domain": "$DOMAIN",
    "test_date": "$(date -Iseconds)",
    "test_suite_version": "$TEST_SUITE_VERSION",
    "summary": {
        "total_tests": $TOTAL_TESTS,
        "passed_tests": $PASSED_TESTS,
        "failed_tests": $FAILED_TESTS,
        "warning_tests": $WARNING_TESTS,
        "success_rate": "$(echo "scale=2; $PASSED_TESTS * 100 / $TOTAL_TESTS" | bc 2>/dev/null || echo "N/A")%"
    },
    "recommendations": [
        "Monitor certificate expiration dates regularly",
        "Ensure TLS 1.2 and 1.3 are enabled",
        "Implement comprehensive security headers",
        "Use strong cipher suites with PFS",
        "Regular SSL Labs testing",
        "Set up automated certificate renewal"
    ],
    "external_validation_urls": {
        "ssl_labs": "https://www.ssllabs.com/ssltest/analyze.html?d=$DOMAIN",
        "ssl_checker": "https://www.sslchecker.com/sslchecker?host=$DOMAIN",
        "security_headers": "https://securityheaders.com/?q=https://$DOMAIN",
        "hsts_preload": "https://hstspreload.org/?domain=$DOMAIN"
    }
}
EOF

    # Generate Text Summary
    cat > "$text_summary" << EOF
SSL COMPREHENSIVE TEST SUMMARY
==============================

Domain: $DOMAIN
Test Date: $(date)
Test Suite Version: $TEST_SUITE_VERSION

RESULTS SUMMARY:
- Total Tests: $TOTAL_TESTS
- Passed: $PASSED_TESTS
- Failed: $FAILED_TESTS  
- Warnings: $WARNING_TESTS
- Success Rate: $(echo "scale=1; $PASSED_TESTS * 100 / $TOTAL_TESTS" | bc 2>/dev/null || echo "N/A")%

CRITICAL ISSUES:
$(grep "✗ FAIL:" "$MAIN_LOG" | head -10 || echo "None detected")

WARNINGS:
$(grep "⚠ WARNING:" "$MAIN_LOG" | head -10 || echo "None detected")

NEXT STEPS:
1. Review full log: $MAIN_LOG
2. Check HTML report: $html_report
3. Run SSL Labs test: https://www.ssllabs.com/ssltest/analyze.html?d=$DOMAIN
4. Set up monitoring: $RESULTS_DIR/ssl-monitor-cron.sh

EOF

    log_test_pass "Comprehensive reports generated:"
    log_result "  HTML Report: $html_report"
    log_result "  JSON Report: $json_report"
    log_result "  Text Summary: $text_summary"
}

# ========================================
# MAIN EXECUTION FUNCTION
# ========================================

main() {
    print_header "SSL COMPREHENSIVE TESTING SUITE v$TEST_SUITE_VERSION"
    log_result "Starting comprehensive SSL testing for $DOMAIN"
    log_result "All results will be saved to: $RESULTS_DIR/"
    
    # Run all test sections
    print_header "SECTION 1: BASIC SSL CERTIFICATE TESTS"
    test_certificate_retrieval
    test_certificate_chain_validation  
    test_certificate_expiration
    
    print_header "SECTION 2: SSL PROTOCOL AND CIPHER TESTS"
    test_ssl_protocols
    test_cipher_suites
    
    print_header "SECTION 3: DOMAIN AND CONNECTIVITY TESTS"
    test_domain_variations
    test_http_to_https_redirect
    
    print_header "SECTION 4: SECURITY HEADERS AND FEATURES"
    test_security_headers
    
    print_header "SECTION 5: BROWSER COMPATIBILITY TESTS"
    test_browser_compatibility
    
    print_header "SECTION 6: CERTIFICATE TECHNICAL ANALYSIS"
    test_certificate_technical_details
    
    print_header "SECTION 7: SSL PERFORMANCE TESTING"
    test_ssl_performance
    
    print_header "SECTION 8: EXTERNAL VALIDATION"
    test_external_validation
    
    print_header "SECTION 9: MONITORING SETUP"
    setup_monitoring
    
    print_header "SECTION 10: REPORT GENERATION"
    generate_comprehensive_report
    
    # Final summary
    print_header "TESTING COMPLETE"
    
    local success_rate=$(echo "scale=1; $PASSED_TESTS * 100 / $TOTAL_TESTS" | bc 2>/dev/null || echo "N/A")
    
    log_result "${BLUE}FINAL SUMMARY:${NC}"
    log_result "  Domain: $DOMAIN"
    log_result "  Total Tests: $TOTAL_TESTS"
    log_result "  Passed: ${GREEN}$PASSED_TESTS${NC}"
    log_result "  Failed: ${RED}$FAILED_TESTS${NC}"
    log_result "  Warnings: ${YELLOW}$WARNING_TESTS${NC}"
    log_result "  Success Rate: $success_rate%"
    
    if [ $FAILED_TESTS -eq 0 ]; then
        log_result "${GREEN}✓ SSL configuration is working correctly!${NC}"
        exit_code=0
    elif [ $FAILED_TESTS -le 2 ]; then
        log_result "${YELLOW}⚠ SSL configuration has minor issues${NC}"
        exit_code=1
    else
        log_result "${RED}✗ SSL configuration has significant issues that need attention${NC}"
        exit_code=2
    fi
    
    log_result "\nFor detailed results, check:"
    log_result "  Main log: $MAIN_LOG"
    log_result "  HTML report: $RESULTS_DIR/ssl-comprehensive-report.html"
    log_result "  Summary: $RESULTS_DIR/ssl-test-summary.txt"
    
    log_result "\nExternal validation recommended:"
    log_result "  SSL Labs: https://www.ssllabs.com/ssltest/analyze.html?d=$DOMAIN"
    
    exit $exit_code
}

# ========================================
# DEPENDENCY CHECKS AND SETUP
# ========================================

check_dependencies() {
    local deps=("openssl" "curl" "bc" "grep" "sed" "awk")
    local missing_deps=()
    
    for dep in "${deps[@]}"; do
        if ! command -v "$dep" &> /dev/null; then
            missing_deps+=("$dep")
        fi
    done
    
    if [ ${#missing_deps[@]} -ne 0 ]; then
        echo -e "${RED}Missing required dependencies: ${missing_deps[*]}${NC}"
        echo "Please install missing dependencies and try again."
        echo ""
        echo "On Ubuntu/Debian: sudo apt-get install ${missing_deps[*]}"
        echo "On CentOS/RHEL: sudo yum install ${missing_deps[*]}"
        echo "On macOS: brew install ${missing_deps[*]}"
        exit 1
    fi
}

show_usage() {
    echo "SSL Comprehensive Testing Suite v$TEST_SUITE_VERSION"
    echo "Usage: $0 [options]"
    echo ""
    echo "Options:"
    echo "  -d, --domain DOMAIN    Set domain to test (default: $DOMAIN)"
    echo "  -h, --help             Show this help message"
    echo "  -v, --verbose          Enable verbose output"
    echo "  --quick                Run only essential tests"
    echo "  --monitoring-only      Only set up monitoring"
    echo ""
    echo "Examples:"
    echo "  $0                     # Run full test suite"
    echo "  $0 --quick             # Run essential tests only"
    echo "  $0 -d example.com      # Test different domain"
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -d|--domain)
            DOMAIN="$2"
            WWW_DOMAIN="www.$2"
            shift 2
            ;;
        -h|--help)
            show_usage
            exit 0
            ;;
        -v|--verbose)
            set -x
            shift
            ;;
        --quick)
            QUICK_MODE=true
            shift
            ;;
        --monitoring-only)
            MONITORING_ONLY=true
            shift
            ;;
        *)
            echo "Unknown option: $1"
            show_usage
            exit 1
            ;;
    esac
done

# ========================================
# SCRIPT EXECUTION
# ========================================

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    # Check dependencies
    check_dependencies
    
    # Handle special modes
    if [ "$MONITORING_ONLY" = true ]; then
        print_header "SSL MONITORING SETUP ONLY"
        setup_monitoring
        exit 0
    fi
    
    # Run main function
    main "$@"
fi