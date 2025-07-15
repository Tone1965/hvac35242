#!/bin/bash

# ========================================
# SSL Performance Testing Suite
# Comprehensive SSL/TLS performance analysis
# ========================================

set -e

DOMAIN="hvac35242.com"
WWW_DOMAIN="www.hvac35242.com"
PERFORMANCE_LOG="ssl-performance-results.log"
TEST_RUNS=5  # Number of test runs for averaging

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_perf() {
    echo -e "$1" | tee -a $PERFORMANCE_LOG
}

print_header() {
    echo -e "\n${BLUE}============================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}============================================${NC}"
}

# SSL Handshake Performance Test
test_ssl_handshake_performance() {
    print_header "SSL Handshake Performance Analysis"
    
    log_perf "${YELLOW}Testing SSL handshake performance for $DOMAIN...${NC}"
    log_perf "Running $TEST_RUNS test iterations for accuracy"
    
    total_connect_time=0
    total_ssl_time=0
    total_total_time=0
    successful_tests=0
    
    for i in $(seq 1 $TEST_RUNS); do
        log_perf "Test run $i/$TEST_RUNS..."
        
        # Perform timing test
        timing_result=$(curl -w "%{time_namelookup},%{time_connect},%{time_appconnect},%{time_pretransfer},%{time_starttransfer},%{time_total},%{speed_download},%{size_download}" \
                       -o /dev/null -s "https://$DOMAIN" 2>/dev/null || echo "0,0,0,0,0,0,0,0")
        
        IFS=',' read -r namelookup_time connect_time appconnect_time pretransfer_time starttransfer_time total_time speed_download size_download <<< "$timing_result"
        
        if [ "$connect_time" != "0" ] && [ "$appconnect_time" != "0" ]; then
            ssl_handshake_time=$(echo "$appconnect_time - $connect_time" | bc 2>/dev/null || echo "0")
            
            # Accumulate times
            total_connect_time=$(echo "$total_connect_time + $connect_time" | bc 2>/dev/null || echo "0")
            total_ssl_time=$(echo "$total_ssl_time + $ssl_handshake_time" | bc 2>/dev/null || echo "0")
            total_total_time=$(echo "$total_total_time + $total_time" | bc 2>/dev/null || echo "0")
            successful_tests=$((successful_tests + 1))
            
            log_perf "  DNS lookup: ${namelookup_time}s, TCP connect: ${connect_time}s, SSL handshake: ${ssl_handshake_time}s, Total: ${total_time}s"
        else
            log_perf "  ${RED}Test $i failed${NC}"
        fi
    done
    
    if [ $successful_tests -gt 0 ]; then
        # Calculate averages
        avg_connect=$(echo "scale=4; $total_connect_time / $successful_tests" | bc 2>/dev/null || echo "0")
        avg_ssl=$(echo "scale=4; $total_ssl_time / $successful_tests" | bc 2>/dev/null || echo "0")
        avg_total=$(echo "scale=4; $total_total_time / $successful_tests" | bc 2>/dev/null || echo "0")
        
        log_perf "\n${GREEN}Performance Summary:${NC}"
        log_perf "Successful tests: $successful_tests/$TEST_RUNS"
        log_perf "Average TCP connect time: ${avg_connect}s"
        log_perf "Average SSL handshake time: ${avg_ssl}s"
        log_perf "Average total time: ${avg_total}s"
        
        # Performance evaluation
        if (( $(echo "$avg_ssl < 0.2" | bc -l 2>/dev/null) )); then
            log_perf "${GREEN}✓ Excellent SSL performance${NC}"
        elif (( $(echo "$avg_ssl < 0.5" | bc -l 2>/dev/null) )); then
            log_perf "${YELLOW}⚠ Good SSL performance${NC}"
        else
            log_perf "${RED}✗ SSL performance needs optimization${NC}"
        fi
    else
        log_perf "${RED}✗ All performance tests failed${NC}"
    fi
}

# Cipher Suite Performance Test
test_cipher_performance() {
    print_header "Cipher Suite Performance Analysis"
    
    log_perf "${YELLOW}Testing different cipher suite performance...${NC}"
    
    # Common cipher suites to test
    ciphers=(
        "ECDHE-RSA-AES256-GCM-SHA384"
        "ECDHE-RSA-AES128-GCM-SHA256"
        "ECDHE-RSA-AES256-SHA384"
        "ECDHE-RSA-AES128-SHA256"
        "AES256-GCM-SHA384"
        "AES128-GCM-SHA256"
    )
    
    for cipher in "${ciphers[@]}"; do
        log_perf "\nTesting cipher: $cipher"
        
        # Test cipher performance
        cipher_time=$(timeout 10 bash -c "
            start=\$(date +%s.%N)
            openssl s_client -connect $DOMAIN:443 -cipher $cipher < /dev/null 2>/dev/null | grep -q 'BEGIN CERTIFICATE'
            end=\$(date +%s.%N)
            echo \"\$end - \$start\" | bc 2>/dev/null || echo '0'
        " 2>/dev/null || echo "failed")
        
        if [ "$cipher_time" != "failed" ] && [ "$cipher_time" != "0" ]; then
            log_perf "  Handshake time: ${cipher_time}s"
            
            if (( $(echo "$cipher_time < 0.3" | bc -l 2>/dev/null) )); then
                log_perf "  ${GREEN}✓ Fast cipher${NC}"
            elif (( $(echo "$cipher_time < 0.6" | bc -l 2>/dev/null) )); then
                log_perf "  ${YELLOW}⚠ Moderate cipher${NC}"
            else
                log_perf "  ${RED}✗ Slow cipher${NC}"
            fi
        else
            log_perf "  ${RED}✗ Cipher not supported or test failed${NC}"
        fi
    done
}

# Certificate Chain Performance
test_certificate_chain_performance() {
    print_header "Certificate Chain Performance"
    
    log_perf "${YELLOW}Analyzing certificate chain impact on performance...${NC}"
    
    # Get certificate chain
    cert_chain=$(openssl s_client -connect $DOMAIN:443 -servername $DOMAIN -showcerts < /dev/null 2>/dev/null)
    cert_count=$(echo "$cert_chain" | grep -c "BEGIN CERTIFICATE" || echo "0")
    
    log_perf "Certificate chain length: $cert_count certificates"
    
    # Test chain validation performance
    chain_validation_time=$(timeout 10 bash -c "
        start=\$(date +%s.%N)
        openssl s_client -connect $DOMAIN:443 -servername $DOMAIN -verify_return_error < /dev/null 2>/dev/null | grep -q 'Verify return code: 0'
        end=\$(date +%s.%N)
        echo \"\$end - \$start\" | bc 2>/dev/null || echo '0'
    " 2>/dev/null || echo "failed")
    
    if [ "$chain_validation_time" != "failed" ] && [ "$chain_validation_time" != "0" ]; then
        log_perf "Chain validation time: ${chain_validation_time}s"
        
        if (( $(echo "$chain_validation_time < 0.1" | bc -l 2>/dev/null) )); then
            log_perf "${GREEN}✓ Fast certificate validation${NC}"
        else
            log_perf "${YELLOW}⚠ Certificate validation could be faster${NC}"
        fi
    fi
    
    # Analyze certificate sizes
    cert_index=0
    echo "$cert_chain" | while IFS= read -r line; do
        if [[ $line == *"BEGIN CERTIFICATE"* ]]; then
            cert_index=$((cert_index + 1))
            cert_data=""
        elif [[ $line == *"END CERTIFICATE"* ]]; then
            cert_size=${#cert_data}
            log_perf "Certificate $cert_index size: $cert_size bytes"
        else
            cert_data="$cert_data$line"
        fi
    done
}

# Session Resumption Performance
test_session_resumption() {
    print_header "Session Resumption Performance"
    
    log_perf "${YELLOW}Testing TLS session resumption...${NC}"
    
    # Test session tickets
    session_ticket_test=$(openssl s_client -connect $DOMAIN:443 -servername $DOMAIN -sess_out /tmp/ssl_session.pem < /dev/null 2>&1)
    
    if echo "$session_ticket_test" | grep -q "New, "; then
        log_perf "${GREEN}✓ Session tickets supported${NC}"
        
        # Test session resumption performance
        log_perf "Testing session resumption speed..."
        
        # First connection (full handshake)
        full_handshake_time=$(curl -w "%{time_appconnect}" -o /dev/null -s "https://$DOMAIN" 2>/dev/null || echo "0")
        
        # Second connection (should use session resumption)
        resumed_handshake_time=$(curl -w "%{time_appconnect}" -o /dev/null -s "https://$DOMAIN" 2>/dev/null || echo "0")
        
        if [ "$full_handshake_time" != "0" ] && [ "$resumed_handshake_time" != "0" ]; then
            speedup=$(echo "scale=2; $full_handshake_time / $resumed_handshake_time" | bc 2>/dev/null || echo "1")
            log_perf "Full handshake time: ${full_handshake_time}s"
            log_perf "Resumed handshake time: ${resumed_handshake_time}s"
            log_perf "Session resumption speedup: ${speedup}x"
            
            if (( $(echo "$speedup > 1.5" | bc -l 2>/dev/null) )); then
                log_perf "${GREEN}✓ Good session resumption performance${NC}"
            else
                log_perf "${YELLOW}⚠ Session resumption may not be working optimally${NC}"
            fi
        fi
    else
        log_perf "${YELLOW}⚠ Session tickets not detected${NC}"
    fi
    
    # Clean up
    rm -f /tmp/ssl_session.pem 2>/dev/null || true
}

# OCSP Performance Test
test_ocsp_performance() {
    print_header "OCSP Performance Analysis"
    
    log_perf "${YELLOW}Testing OCSP stapling performance...${NC}"
    
    # Check for OCSP stapling
    ocsp_test=$(openssl s_client -connect $DOMAIN:443 -servername $DOMAIN -status < /dev/null 2>&1)
    
    if echo "$ocsp_test" | grep -q "OCSP Response Status: successful"; then
        log_perf "${GREEN}✓ OCSP stapling enabled${NC}"
        
        # Measure OCSP impact
        ocsp_time=$(timeout 10 bash -c "
            start=\$(date +%s.%N)
            openssl s_client -connect $DOMAIN:443 -servername $DOMAIN -status < /dev/null 2>/dev/null | grep -q 'OCSP Response Status'
            end=\$(date +%s.%N)
            echo \"\$end - \$start\" | bc 2>/dev/null || echo '0'
        " 2>/dev/null || echo "failed")
        
        if [ "$ocsp_time" != "failed" ] && [ "$ocsp_time" != "0" ]; then
            log_perf "OCSP validation time: ${ocsp_time}s"
        fi
    else
        log_perf "${YELLOW}⚠ OCSP stapling not detected${NC}"
        log_perf "Note: OCSP stapling improves performance by avoiding client-side OCSP requests"
    fi
}

# HTTP/2 vs HTTP/1.1 Performance
test_http_version_performance() {
    print_header "HTTP Protocol Version Performance"
    
    log_perf "${YELLOW}Comparing HTTP/1.1 vs HTTP/2 performance...${NC}"
    
    # Test HTTP/1.1
    http1_time=$(curl -w "%{time_total}" -o /dev/null -s --http1.1 "https://$DOMAIN" 2>/dev/null || echo "0")
    
    # Test HTTP/2
    http2_time=$(curl -w "%{time_total}" -o /dev/null -s --http2 "https://$DOMAIN" 2>/dev/null || echo "0")
    
    if [ "$http1_time" != "0" ] && [ "$http2_time" != "0" ]; then
        log_perf "HTTP/1.1 total time: ${http1_time}s"
        log_perf "HTTP/2 total time: ${http2_time}s"
        
        improvement=$(echo "scale=2; ($http1_time - $http2_time) / $http1_time * 100" | bc 2>/dev/null || echo "0")
        
        if (( $(echo "$improvement > 0" | bc -l 2>/dev/null) )); then
            log_perf "${GREEN}✓ HTTP/2 is ${improvement}% faster than HTTP/1.1${NC}"
        else
            log_perf "${YELLOW}⚠ HTTP/2 performance similar to HTTP/1.1${NC}"
        fi
    else
        log_perf "${RED}✗ Could not compare HTTP versions${NC}"
    fi
}

# Generate Performance Report
generate_performance_report() {
    local report_file="ssl-performance-report-$(date +%Y%m%d-%H%M%S).html"
    
    cat > "$report_file" << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>SSL Performance Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
        .header { background: #34495e; color: white; padding: 20px; border-radius: 5px; }
        .section { margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
        .metric { display: inline-block; margin: 10px; padding: 10px; background: #f8f9fa; border-radius: 3px; }
        .good { color: #27ae60; font-weight: bold; }
        .warning { color: #f39c12; font-weight: bold; }
        .error { color: #e74c3c; font-weight: bold; }
        .chart-placeholder { background: #ecf0f1; padding: 20px; text-align: center; border-radius: 5px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>SSL Performance Analysis Report</h1>
        <p>Domain: DOMAIN_PLACEHOLDER</p>
        <p>Generated: TIMESTAMP_PLACEHOLDER</p>
    </div>
    
    <div class="section">
        <h2>Performance Summary</h2>
        <div class="metric">
            <strong>SSL Handshake:</strong> Average timing analysis
        </div>
        <div class="metric">
            <strong>Cipher Suites:</strong> Performance comparison
        </div>
        <div class="metric">
            <strong>Session Resumption:</strong> Efficiency testing
        </div>
        <div class="metric">
            <strong>Protocol Versions:</strong> HTTP/1.1 vs HTTP/2
        </div>
    </div>
    
    <div class="section">
        <h2>Optimization Recommendations</h2>
        <ul>
            <li>Enable HTTP/2 for improved performance</li>
            <li>Implement OCSP stapling to reduce client-side requests</li>
            <li>Use modern cipher suites with hardware acceleration</li>
            <li>Enable session resumption for repeat visitors</li>
            <li>Optimize certificate chain length</li>
            <li>Consider CDN implementation for global performance</li>
        </ul>
    </div>
    
    <div class="section">
        <h2>Performance Metrics</h2>
        <p>Detailed timing analysis shows SSL handshake performance across multiple test runs.</p>
        <div class="chart-placeholder">
            [Performance charts would be displayed here in a full implementation]
        </div>
    </div>
</body>
</html>
EOF
    
    # Replace placeholders
    sed -i "s/DOMAIN_PLACEHOLDER/$DOMAIN/g" "$report_file"
    sed -i "s/TIMESTAMP_PLACEHOLDER/$(date)/g" "$report_file"
    
    log_perf "${GREEN}Performance report generated: $report_file${NC}"
}

# Main execution
main() {
    print_header "SSL Performance Testing Suite"
    log_perf "Starting SSL performance analysis for $DOMAIN"
    log_perf "Timestamp: $(date)"
    
    test_ssl_handshake_performance
    test_cipher_performance
    test_certificate_chain_performance
    test_session_resumption
    test_ocsp_performance
    test_http_version_performance
    generate_performance_report
    
    print_header "Performance Testing Complete"
    log_perf "${GREEN}All SSL performance tests completed${NC}"
    log_perf "Results saved to: $PERFORMANCE_LOG"
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

# Run the performance tests
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    check_dependencies
    main "$@"
fi