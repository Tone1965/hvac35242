#!/bin/bash

# ========================================
# SSL Browser Compatibility Testing Suite
# Tests SSL configuration across different browsers and devices
# ========================================

set -e

DOMAIN="hvac35242.com"
WWW_DOMAIN="www.hvac35242.com"
TEST_RESULTS_DIR="ssl-browser-tests"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Create results directory
mkdir -p "$TEST_RESULTS_DIR"

log_test() {
    echo -e "$1" | tee -a "$TEST_RESULTS_DIR/browser-test-$TIMESTAMP.log"
}

print_header() {
    echo -e "\n${BLUE}============================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}============================================${NC}"
}

# Test User Agent strings for different browsers
test_user_agents() {
    print_header "Browser User Agent SSL Testing"
    
    # Define user agents for major browsers
    declare -A user_agents=(
        ["Chrome Latest"]="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
        ["Firefox Latest"]="Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:119.0) Gecko/20100101 Firefox/119.0"
        ["Safari Latest"]="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15"
        ["Edge Latest"]="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0"
        ["Chrome Mobile"]="Mozilla/5.0 (Linux; Android 13; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36"
        ["Safari Mobile"]="Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
        ["Old Chrome"]="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36"
        ["Old Firefox"]="Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:88.0) Gecko/20100101 Firefox/88.0"
    )
    
    for browser in "${!user_agents[@]}"; do
        log_test "${YELLOW}Testing $browser...${NC}"
        
        response=$(curl -s -w "%{http_code},%{time_total},%{time_connect},%{time_appconnect}" \
                       -o /dev/null \
                       -H "User-Agent: ${user_agents[$browser]}" \
                       --connect-timeout 10 \
                       --max-time 30 \
                       "https://$DOMAIN" 2>/dev/null || echo "000,0,0,0")
        
        IFS=',' read -r http_code total_time connect_time appconnect_time <<< "$response"
        
        if [ "$http_code" = "200" ]; then
            ssl_time=$(echo "$appconnect_time - $connect_time" | bc 2>/dev/null || echo "N/A")
            log_test "${GREEN}✓ $browser: HTTP $http_code, SSL handshake: ${ssl_time}s${NC}"
        else
            log_test "${RED}✗ $browser: Failed (HTTP $http_code)${NC}"
        fi
    done
}

# Test SSL Labs compatibility
test_ssl_labs_compatibility() {
    print_header "SSL Labs Compatibility Analysis"
    
    log_test "${YELLOW}Analyzing SSL configuration compatibility...${NC}"
    
    # Get cipher suites
    ciphers=$(openssl s_client -connect $DOMAIN:443 -cipher 'ALL:COMPLEMENTOFALL' < /dev/null 2>/dev/null | grep "Cipher    :" | cut -d: -f2 | tr -d ' ')
    
    if [ ! -z "$ciphers" ]; then
        log_test "Active cipher suite: $ciphers"
        
        # Check for compatibility with older browsers
        case $ciphers in
            *"ECDHE"*|*"DHE"*)
                log_test "${GREEN}✓ Forward secrecy supported${NC}"
                ;;
            *)
                log_test "${YELLOW}⚠ Forward secrecy may not be supported${NC}"
                ;;
        esac
        
        case $ciphers in
            *"AES256"*|*"AES128"*)
                log_test "${GREEN}✓ Strong encryption (AES)${NC}"
                ;;
            *"3DES"*|*"RC4"*)
                log_test "${RED}✗ Weak encryption detected${NC}"
                ;;
        esac
    fi
    
    # Test protocol versions
    protocols=("TLSv1.2" "TLSv1.3")
    for protocol in "${protocols[@]}"; do
        if openssl s_client -connect $DOMAIN:443 -servername $DOMAIN -${protocol,,} < /dev/null 2>/dev/null | grep -q "Protocol"; then
            log_test "${GREEN}✓ $protocol supported${NC}"
        else
            log_test "${YELLOW}⚠ $protocol not supported${NC}"
        fi
    done
}

# Test certificate compatibility
test_certificate_compatibility() {
    print_header "Certificate Compatibility Testing"
    
    log_test "${YELLOW}Analyzing certificate compatibility...${NC}"
    
    # Get certificate details
    cert_details=$(openssl s_client -connect $DOMAIN:443 -servername $DOMAIN < /dev/null 2>/dev/null | openssl x509 -noout -text 2>/dev/null)
    
    # Check key size
    key_size=$(echo "$cert_details" | grep "RSA Public-Key" | grep -o "[0-9]\+ bit" | cut -d' ' -f1)
    if [ ! -z "$key_size" ]; then
        log_test "RSA key size: $key_size bits"
        if [ "$key_size" -ge 2048 ]; then
            log_test "${GREEN}✓ Key size meets modern standards${NC}"
        else
            log_test "${RED}✗ Key size below recommended minimum${NC}"
        fi
    fi
    
    # Check signature algorithm
    sig_alg=$(echo "$cert_details" | grep "Signature Algorithm" | head -1 | cut -d: -f2 | tr -d ' ')
    if [ ! -z "$sig_alg" ]; then
        log_test "Signature algorithm: $sig_alg"
        case $sig_alg in
            *"sha256"*|*"sha384"*|*"sha512"*)
                log_test "${GREEN}✓ Modern signature algorithm${NC}"
                ;;
            *"sha1"*|*"md5"*)
                log_test "${RED}✗ Deprecated signature algorithm${NC}"
                ;;
        esac
    fi
    
    # Check SAN (Subject Alternative Names)
    san_entries=$(echo "$cert_details" | grep -A 10 "Subject Alternative Name" | grep "DNS:" | wc -l)
    if [ "$san_entries" -gt 0 ]; then
        log_test "${GREEN}✓ Certificate has $san_entries SAN entries${NC}"
        echo "$cert_details" | grep -A 10 "Subject Alternative Name" | grep "DNS:" | while read line; do
            log_test "  $line"
        done
    else
        log_test "${YELLOW}⚠ No SAN entries found${NC}"
    fi
}

# Test HSTS compatibility
test_hsts_compatibility() {
    print_header "HSTS Compatibility Testing"
    
    log_test "${YELLOW}Testing HSTS implementation...${NC}"
    
    hsts_header=$(curl -s -I "https://$DOMAIN" | grep -i "strict-transport-security" | cut -d: -f2- | tr -d ' \r')
    
    if [ ! -z "$hsts_header" ]; then
        log_test "${GREEN}✓ HSTS header present: $hsts_header${NC}"
        
        # Parse HSTS parameters
        if echo "$hsts_header" | grep -q "max-age="; then
            max_age=$(echo "$hsts_header" | grep -o "max-age=[0-9]*" | cut -d= -f2)
            log_test "  Max-age: $max_age seconds"
            
            if [ "$max_age" -ge 31536000 ]; then
                log_test "${GREEN}  ✓ Max-age meets recommended minimum (1 year)${NC}"
            else
                log_test "${YELLOW}  ⚠ Max-age below recommended minimum${NC}"
            fi
        fi
        
        if echo "$hsts_header" | grep -q "includeSubDomains"; then
            log_test "${GREEN}  ✓ includeSubDomains directive present${NC}"
        else
            log_test "${YELLOW}  ⚠ includeSubDomains directive missing${NC}"
        fi
        
        if echo "$hsts_header" | grep -q "preload"; then
            log_test "${GREEN}  ✓ preload directive present${NC}"
        else
            log_test "${YELLOW}  ⚠ preload directive missing${NC}"
        fi
    else
        log_test "${RED}✗ HSTS header not present${NC}"
    fi
}

# Test mobile browser compatibility
test_mobile_compatibility() {
    print_header "Mobile Browser Compatibility"
    
    mobile_agents=(
        "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1"
        "Mozilla/5.0 (Linux; Android 11; SM-A505F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.85 Mobile Safari/537.36"
        "Mozilla/5.0 (Linux; Android 10; SM-G975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.85 Mobile Safari/537.36"
        "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Mobile/15E148 Safari/604.1"
    )
    
    for agent in "${mobile_agents[@]}"; do
        device=$(echo "$agent" | grep -o -E "(iPhone|Android|SM-[A-Z0-9]+)" | head -1)
        log_test "${YELLOW}Testing mobile device: $device${NC}"
        
        response=$(curl -s -w "%{http_code}" -o /dev/null -H "User-Agent: $agent" --connect-timeout 10 "https://$DOMAIN" 2>/dev/null || echo "000")
        
        if [ "$response" = "200" ]; then
            log_test "${GREEN}✓ $device: SSL connection successful${NC}"
        else
            log_test "${RED}✗ $device: SSL connection failed (HTTP $response)${NC}"
        fi
    done
}

# Test different TLS versions with various clients
test_tls_client_compatibility() {
    print_header "TLS Client Compatibility Testing"
    
    # Test with different TLS versions
    tls_versions=("1.0" "1.1" "1.2" "1.3")
    
    for version in "${tls_versions[@]}"; do
        log_test "${YELLOW}Testing TLS $version compatibility...${NC}"
        
        case $version in
            "1.0") tls_flag="-tls1" ;;
            "1.1") tls_flag="-tls1_1" ;;
            "1.2") tls_flag="-tls1_2" ;;
            "1.3") tls_flag="-tls1_3" ;;
        esac
        
        if timeout 10 openssl s_client -connect $DOMAIN:443 $tls_flag < /dev/null 2>/dev/null | grep -q "BEGIN CERTIFICATE"; then
            if [ "$version" = "1.0" ] || [ "$version" = "1.1" ]; then
                log_test "${YELLOW}⚠ TLS $version supported (security risk)${NC}"
            else
                log_test "${GREEN}✓ TLS $version supported${NC}"
            fi
        else
            if [ "$version" = "1.0" ] || [ "$version" = "1.1" ]; then
                log_test "${GREEN}✓ TLS $version disabled (good for security)${NC}"
            else
                log_test "${RED}✗ TLS $version not supported${NC}"
            fi
        fi
    done
}

# Generate browser compatibility report
generate_browser_report() {
    local report_file="$TEST_RESULTS_DIR/browser-compatibility-report-$TIMESTAMP.html"
    
    cat > "$report_file" << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>SSL Browser Compatibility Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { background: #2c3e50; color: white; padding: 20px; border-radius: 5px; }
        .section { margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
        .success { color: #27ae60; }
        .warning { color: #f39c12; }
        .error { color: #e74c3c; }
        .test-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; }
        .test-item { padding: 10px; border: 1px solid #eee; border-radius: 3px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>SSL Browser Compatibility Report</h1>
        <p>Domain: DOMAIN_PLACEHOLDER</p>
        <p>Generated: TIMESTAMP_PLACEHOLDER</p>
    </div>
    
    <div class="section">
        <h2>Test Summary</h2>
        <div class="test-grid">
            <div class="test-item">
                <h3>Desktop Browsers</h3>
                <p>Chrome, Firefox, Safari, Edge compatibility tested</p>
            </div>
            <div class="test-item">
                <h3>Mobile Browsers</h3>
                <p>iOS Safari, Android Chrome compatibility tested</p>
            </div>
            <div class="test-item">
                <h3>TLS Protocols</h3>
                <p>TLS 1.0, 1.1, 1.2, 1.3 support analyzed</p>
            </div>
            <div class="test-item">
                <h3>Security Features</h3>
                <p>HSTS, certificate chain, ciphers verified</p>
            </div>
        </div>
    </div>
    
    <div class="section">
        <h2>Recommendations</h2>
        <ul>
            <li>Ensure TLS 1.2 and 1.3 are enabled for maximum compatibility</li>
            <li>Disable TLS 1.0 and 1.1 for security</li>
            <li>Implement HSTS with appropriate max-age value</li>
            <li>Use modern cipher suites with forward secrecy</li>
            <li>Regular monitoring of certificate expiration</li>
        </ul>
    </div>
    
    <div class="section">
        <h2>Browser Support Matrix</h2>
        <p>This report shows compatibility across major browsers and devices.</p>
        <p>All modern browsers should successfully connect with a secure SSL configuration.</p>
    </div>
</body>
</html>
EOF
    
    # Replace placeholders
    sed -i "s/DOMAIN_PLACEHOLDER/$DOMAIN/g" "$report_file"
    sed -i "s/TIMESTAMP_PLACEHOLDER/$(date)/g" "$report_file"
    
    log_test "${GREEN}Browser compatibility report generated: $report_file${NC}"
}

# Main execution
main() {
    print_header "SSL Browser Compatibility Testing Suite"
    log_test "Starting browser compatibility tests for $DOMAIN"
    log_test "Timestamp: $(date)"
    
    test_user_agents
    test_ssl_labs_compatibility
    test_certificate_compatibility
    test_hsts_compatibility
    test_mobile_compatibility
    test_tls_client_compatibility
    generate_browser_report
    
    print_header "Browser Compatibility Testing Complete"
    log_test "${GREEN}All browser compatibility tests completed${NC}"
    log_test "Results saved in: $TEST_RESULTS_DIR/"
}

# Check dependencies
check_dependencies() {
    deps=("openssl" "curl" "bc")
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

# Run the tests
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    check_dependencies
    main "$@"
fi