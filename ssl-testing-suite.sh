#!/bin/bash

# ========================================
# SSL Testing Suite for hvac35242.com
# Complete SSL Certificate Verification & Monitoring
# ========================================

set -e

# Configuration
DOMAIN="hvac35242.com"
WWW_DOMAIN="www.hvac35242.com"
LOG_FILE="ssl-test-results.log"
EMAIL_ALERT="admin@hvac35242.com"  # Update with actual admin email

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Create log file
echo "SSL Testing Suite - $(date)" > $LOG_FILE

log_result() {
    echo -e "$1" | tee -a $LOG_FILE
}

print_header() {
    echo -e "\n${BLUE}============================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}============================================${NC}"
}

# Test 1: Basic SSL Certificate Information
test_ssl_certificate_info() {
    print_header "1. SSL Certificate Information"
    
    log_result "${YELLOW}Testing SSL certificate for $DOMAIN...${NC}"
    
    # Get certificate information
    cert_info=$(openssl s_client -connect $DOMAIN:443 -servername $DOMAIN < /dev/null 2>/dev/null | openssl x509 -noout -text 2>/dev/null)
    
    if [ $? -eq 0 ]; then
        log_result "${GREEN}✓ SSL certificate retrieved successfully${NC}"
        
        # Extract key information
        issuer=$(echo "$cert_info" | grep -A1 "Issuer:" | head -1 | sed 's/.*CN=//')
        subject=$(echo "$cert_info" | grep -A1 "Subject:" | head -1 | sed 's/.*CN=//')
        not_before=$(echo "$cert_info" | grep "Not Before" | cut -d: -f2-)
        not_after=$(echo "$cert_info" | grep "Not After" | cut -d: -f2-)
        
        log_result "  Issuer: $issuer"
        log_result "  Subject: $subject"
        log_result "  Valid From: $not_before"
        log_result "  Valid Until: $not_after"
        
        # Check if it's a Sectigo certificate
        if echo "$issuer" | grep -qi "sectigo\|comodo"; then
            log_result "${GREEN}✓ Sectigo certificate detected${NC}"
        else
            log_result "${YELLOW}⚠ Certificate not issued by Sectigo${NC}"
        fi
    else
        log_result "${RED}✗ Failed to retrieve SSL certificate${NC}"
        return 1
    fi
}

# Test 2: Certificate Chain Validation
test_certificate_chain() {
    print_header "2. Certificate Chain Validation"
    
    log_result "${YELLOW}Validating certificate chain...${NC}"
    
    # Test certificate chain
    chain_test=$(openssl s_client -connect $DOMAIN:443 -servername $DOMAIN -verify_return_error < /dev/null 2>&1)
    
    if echo "$chain_test" | grep -q "Verify return code: 0"; then
        log_result "${GREEN}✓ Certificate chain is valid${NC}"
    else
        log_result "${RED}✗ Certificate chain validation failed${NC}"
        log_result "Chain test output: $chain_test"
    fi
    
    # Check intermediate certificates
    log_result "\nIntermediate certificates:"
    openssl s_client -connect $DOMAIN:443 -servername $DOMAIN -showcerts < /dev/null 2>/dev/null | grep -c "BEGIN CERTIFICATE" | while read cert_count; do
        log_result "  Certificate count: $cert_count"
    done
}

# Test 3: SSL Protocol and Cipher Testing
test_ssl_protocols() {
    print_header "3. SSL Protocol and Cipher Testing"
    
    protocols=("ssl3" "tls1" "tls1_1" "tls1_2" "tls1_3")
    
    for protocol in "${protocols[@]}"; do
        log_result "${YELLOW}Testing $protocol...${NC}"
        
        if timeout 10 openssl s_client -connect $DOMAIN:443 -$protocol < /dev/null 2>/dev/null | grep -q "BEGIN CERTIFICATE"; then
            log_result "${GREEN}✓ $protocol supported${NC}"
        else
            if [ "$protocol" = "ssl3" ] || [ "$protocol" = "tls1" ] || [ "$protocol" = "tls1_1" ]; then
                log_result "${GREEN}✓ $protocol disabled (good for security)${NC}"
            else
                log_result "${RED}✗ $protocol not supported${NC}"
            fi
        fi
    done
    
    # Test cipher suites
    log_result "\n${YELLOW}Testing cipher suites...${NC}"
    cipher_info=$(openssl s_client -connect $DOMAIN:443 -servername $DOMAIN < /dev/null 2>/dev/null | grep "Cipher    :")
    if [ ! -z "$cipher_info" ]; then
        log_result "Active cipher: $cipher_info"
    fi
}

# Test 4: Domain Variations Testing
test_domain_variations() {
    print_header "4. Domain Variations Testing"
    
    domains=("$DOMAIN" "$WWW_DOMAIN")
    
    for test_domain in "${domains[@]}"; do
        log_result "${YELLOW}Testing $test_domain...${NC}"
        
        # Test HTTPS connectivity
        if curl -s --connect-timeout 10 "https://$test_domain" > /dev/null; then
            log_result "${GREEN}✓ $test_domain HTTPS accessible${NC}"
        else
            log_result "${RED}✗ $test_domain HTTPS not accessible${NC}"
        fi
        
        # Test certificate match
        cert_subject=$(openssl s_client -connect $test_domain:443 -servername $test_domain < /dev/null 2>/dev/null | openssl x509 -noout -subject 2>/dev/null | grep -o "CN=[^,]*" | cut -d= -f2)
        if [ ! -z "$cert_subject" ]; then
            if echo "$cert_subject" | grep -q "$test_domain" || echo "$cert_subject" | grep -q "\*\."; then
                log_result "${GREEN}✓ Certificate matches $test_domain${NC}"
            else
                log_result "${YELLOW}⚠ Certificate subject: $cert_subject${NC}"
            fi
        fi
    done
}

# Test 5: HTTP to HTTPS Redirect
test_http_redirect() {
    print_header "5. HTTP to HTTPS Redirect Testing"
    
    for test_domain in "$DOMAIN" "$WWW_DOMAIN"; do
        log_result "${YELLOW}Testing HTTP redirect for $test_domain...${NC}"
        
        redirect_test=$(curl -s -I -L --max-redirs 3 "http://$test_domain" 2>/dev/null)
        
        if echo "$redirect_test" | grep -qi "301\|302"; then
            if echo "$redirect_test" | grep -qi "https://"; then
                log_result "${GREEN}✓ $test_domain redirects HTTP to HTTPS${NC}"
            else
                log_result "${YELLOW}⚠ $test_domain redirects but not to HTTPS${NC}"
            fi
        else
            log_result "${RED}✗ $test_domain does not redirect HTTP to HTTPS${NC}"
        fi
    done
}

# Test 6: Certificate Expiration Check
test_certificate_expiration() {
    print_header "6. Certificate Expiration Check"
    
    log_result "${YELLOW}Checking certificate expiration...${NC}"
    
    # Get certificate expiration date
    exp_date=$(openssl s_client -connect $DOMAIN:443 -servername $DOMAIN < /dev/null 2>/dev/null | openssl x509 -noout -enddate 2>/dev/null | cut -d= -f2)
    
    if [ ! -z "$exp_date" ]; then
        exp_timestamp=$(date -d "$exp_date" +%s 2>/dev/null || date -j -f "%b %d %H:%M:%S %Y %Z" "$exp_date" +%s 2>/dev/null)
        current_timestamp=$(date +%s)
        days_until_expiry=$(( (exp_timestamp - current_timestamp) / 86400 ))
        
        log_result "Certificate expires: $exp_date"
        log_result "Days until expiry: $days_until_expiry"
        
        if [ $days_until_expiry -gt 30 ]; then
            log_result "${GREEN}✓ Certificate valid for $days_until_expiry days${NC}"
        elif [ $days_until_expiry -gt 7 ]; then
            log_result "${YELLOW}⚠ Certificate expires in $days_until_expiry days - consider renewal${NC}"
        else
            log_result "${RED}✗ Certificate expires in $days_until_expiry days - URGENT RENEWAL NEEDED${NC}"
        fi
    else
        log_result "${RED}✗ Could not retrieve certificate expiration date${NC}"
    fi
}

# Test 7: SSL Labs Rating (if ssllabs-scan is available)
test_ssl_labs_rating() {
    print_header "7. SSL Labs Rating Check"
    
    if command -v ssllabs-scan &> /dev/null; then
        log_result "${YELLOW}Running SSL Labs scan...${NC}"
        ssllabs_result=$(ssllabs-scan -quiet -usecache $DOMAIN 2>/dev/null || echo "SSL Labs scan failed")
        log_result "$ssllabs_result"
    else
        log_result "${YELLOW}SSL Labs scanner not installed. Manual check recommended at:${NC}"
        log_result "https://www.ssllabs.com/ssltest/analyze.html?d=$DOMAIN"
    fi
}

# Test 8: Browser Compatibility Test
test_browser_compatibility() {
    print_header "8. Browser Compatibility Test"
    
    log_result "${YELLOW}Testing browser compatibility indicators...${NC}"
    
    # Check for modern TLS versions
    if openssl s_client -connect $DOMAIN:443 -tls1_2 < /dev/null 2>/dev/null | grep -q "BEGIN CERTIFICATE"; then
        log_result "${GREEN}✓ TLS 1.2 supported (compatible with all modern browsers)${NC}"
    fi
    
    if openssl s_client -connect $DOMAIN:443 -tls1_3 < /dev/null 2>/dev/null | grep -q "BEGIN CERTIFICATE"; then
        log_result "${GREEN}✓ TLS 1.3 supported (latest security standard)${NC}"
    fi
    
    # Check certificate signature algorithm
    sig_alg=$(openssl s_client -connect $DOMAIN:443 -servername $DOMAIN < /dev/null 2>/dev/null | openssl x509 -noout -text 2>/dev/null | grep "Signature Algorithm" | head -1 | cut -d: -f2 | tr -d ' ')
    
    if [ ! -z "$sig_alg" ]; then
        log_result "Signature Algorithm: $sig_alg"
        case $sig_alg in
            *sha256*|*sha384*|*sha512*)
                log_result "${GREEN}✓ Using secure signature algorithm${NC}"
                ;;
            *sha1*|*md5*)
                log_result "${RED}✗ Using deprecated signature algorithm${NC}"
                ;;
        esac
    fi
}

# Test 9: Security Headers Check
test_security_headers() {
    print_header "9. Security Headers Check"
    
    log_result "${YELLOW}Checking HTTPS security headers...${NC}"
    
    headers=$(curl -s -I "https://$DOMAIN" 2>/dev/null)
    
    # Check HSTS
    if echo "$headers" | grep -qi "strict-transport-security"; then
        log_result "${GREEN}✓ HSTS header present${NC}"
    else
        log_result "${YELLOW}⚠ HSTS header missing${NC}"
    fi
    
    # Check other security headers
    security_headers=("X-Frame-Options" "X-Content-Type-Options" "X-XSS-Protection" "Content-Security-Policy")
    
    for header in "${security_headers[@]}"; do
        if echo "$headers" | grep -qi "$header"; then
            log_result "${GREEN}✓ $header present${NC}"
        else
            log_result "${YELLOW}⚠ $header missing${NC}"
        fi
    done
}

# Test 10: Performance Test
test_ssl_performance() {
    print_header "10. SSL Performance Test"
    
    log_result "${YELLOW}Testing SSL handshake performance...${NC}"
    
    # Measure SSL handshake time
    handshake_time=$(curl -w "%{time_connect},%{time_appconnect},%{time_total}\n" -o /dev/null -s "https://$DOMAIN")
    
    if [ ! -z "$handshake_time" ]; then
        IFS=',' read -r connect_time appconnect_time total_time <<< "$handshake_time"
        ssl_time=$(echo "$appconnect_time - $connect_time" | bc 2>/dev/null || echo "N/A")
        
        log_result "Connection time: ${connect_time}s"
        log_result "SSL handshake time: ${ssl_time}s"
        log_result "Total time: ${total_time}s"
        
        if [ "$ssl_time" != "N/A" ] && (( $(echo "$ssl_time < 0.5" | bc -l 2>/dev/null) )); then
            log_result "${GREEN}✓ SSL handshake performance is good${NC}"
        elif [ "$ssl_time" != "N/A" ]; then
            log_result "${YELLOW}⚠ SSL handshake is slower than optimal${NC}"
        fi
    fi
}

# Main execution
main() {
    echo -e "${BLUE}Starting SSL Testing Suite for $DOMAIN${NC}"
    echo -e "${BLUE}$(date)${NC}\n"
    
    # Run all tests
    test_ssl_certificate_info
    test_certificate_chain
    test_ssl_protocols
    test_domain_variations
    test_http_redirect
    test_certificate_expiration
    test_ssl_labs_rating
    test_browser_compatibility
    test_security_headers
    test_ssl_performance
    
    print_header "SSL Testing Complete"
    log_result "${GREEN}All SSL tests completed. Check $LOG_FILE for full results.${NC}"
    log_result "\nSummary saved to: $(pwd)/$LOG_FILE"
    
    # Check if critical issues were found
    if grep -q "✗" $LOG_FILE; then
        log_result "${RED}⚠ Critical issues found - review the log file${NC}"
        exit 1
    else
        log_result "${GREEN}✓ No critical SSL issues detected${NC}"
    fi
}

# Check dependencies
check_dependencies() {
    deps=("openssl" "curl")
    missing_deps=()
    
    for dep in "${deps[@]}"; do
        if ! command -v $dep &> /dev/null; then
            missing_deps+=($dep)
        fi
    done
    
    if [ ${#missing_deps[@]} -ne 0 ]; then
        echo -e "${RED}Missing required dependencies: ${missing_deps[*]}${NC}"
        echo "Please install missing dependencies and try again."
        exit 1
    fi
}

# Run the suite
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    check_dependencies
    main "$@"
fi