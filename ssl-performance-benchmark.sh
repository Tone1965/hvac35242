#!/bin/bash

# ========================================
# SSL PERFORMANCE BENCHMARK SUITE
# Advanced SSL Performance and Load Testing for hvac35242.com
# ========================================

set -e

# Configuration
DOMAIN="hvac35242.com"
WWW_DOMAIN="www.hvac35242.com"
BENCHMARK_LOG="ssl-performance-benchmark-$(date +%Y%m%d-%H%M%S).log"
RESULTS_DIR="ssl-performance-results-$(date +%Y%m%d-%H%M%S)"

# Test parameters
CONCURRENT_CONNECTIONS=(1 5 10 25 50)
TEST_DURATION=30  # seconds
WARMUP_REQUESTS=10

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

# Create results directory
mkdir -p "$RESULTS_DIR"

log_benchmark() {
    echo -e "$1" | tee -a "$RESULTS_DIR/$BENCHMARK_LOG"
}

print_header() {
    echo -e "\n${PURPLE}============================================${NC}"
    echo -e "${PURPLE}$1${NC}"
    echo -e "${PURPLE}============================================${NC}"
    log_benchmark "\n============================================"
    log_benchmark "$1"
    log_benchmark "============================================"
}

# ========================================
# SSL HANDSHAKE PERFORMANCE TESTING
# ========================================

test_ssl_handshake_performance() {
    print_header "SSL Handshake Performance Testing"
    
    log_benchmark "${BLUE}Testing SSL handshake performance with multiple samples...${NC}"
    
    local total_tests=50
    local handshake_times=()
    local successful_tests=0
    
    for i in $(seq 1 $total_tests); do
        echo -ne "\rProgress: $i/$total_tests"
        
        # Measure handshake time
        timing=$(timeout 10 curl -w "%{time_connect},%{time_appconnect},%{time_total},%{http_code}" \
                 -o /dev/null -s "https://$DOMAIN" 2>/dev/null || echo "0,0,0,000")
        
        IFS=',' read -r connect_time appconnect_time total_time http_code <<< "$timing"
        
        if [ "$http_code" = "200" ] && [ "$connect_time" != "0" ] && [ "$appconnect_time" != "0" ]; then
            handshake_time=$(echo "$appconnect_time - $connect_time" | bc 2>/dev/null || echo "0")
            if [ "$handshake_time" != "0" ]; then
                handshake_times+=("$handshake_time")
                ((successful_tests++))
            fi
        fi
    done
    
    echo  # New line after progress
    
    if [ $successful_tests -gt 0 ]; then
        # Calculate statistics
        local sum=0
        local min=${handshake_times[0]}
        local max=${handshake_times[0]}
        
        for time in "${handshake_times[@]}"; do
            sum=$(echo "$sum + $time" | bc)
            if (( $(echo "$time < $min" | bc -l) )); then min=$time; fi
            if (( $(echo "$time > $max" | bc -l) )); then max=$time; fi
        done
        
        local avg=$(echo "scale=3; $sum / $successful_tests" | bc)
        
        # Calculate median
        IFS=$'\n' sorted_times=($(sort -n <<<"${handshake_times[*]}"))
        local median_index=$(( successful_tests / 2 ))
        local median=${sorted_times[$median_index]}
        
        # Calculate 95th percentile
        local p95_index=$(( successful_tests * 95 / 100 ))
        local p95=${sorted_times[$p95_index]}
        
        log_benchmark "${GREEN}SSL Handshake Performance Results:${NC}"
        log_benchmark "  Successful tests: $successful_tests/$total_tests"
        log_benchmark "  Average: ${avg}s"
        log_benchmark "  Median: ${median}s"
        log_benchmark "  Minimum: ${min}s"
        log_benchmark "  Maximum: ${max}s"
        log_benchmark "  95th percentile: ${p95}s"
        
        # Performance assessment
        if (( $(echo "$avg < 0.2" | bc -l) )); then
            log_benchmark "${GREEN}✓ Excellent SSL handshake performance${NC}"
        elif (( $(echo "$avg < 0.5" | bc -l) )); then
            log_benchmark "${GREEN}✓ Good SSL handshake performance${NC}"
        elif (( $(echo "$avg < 1.0" | bc -l) )); then
            log_benchmark "${YELLOW}⚠ Average SSL handshake performance${NC}"
        else
            log_benchmark "${RED}✗ Poor SSL handshake performance${NC}"
        fi
        
        # Generate performance graph data
        cat > "$RESULTS_DIR/handshake_times.csv" << EOF
Test,Handshake_Time_ms
$(for i in "${!handshake_times[@]}"; do echo "$((i+1)),$(echo "${handshake_times[$i]} * 1000" | bc)"; done)
EOF
        
    else
        log_benchmark "${RED}✗ Failed to measure SSL handshake performance${NC}"
    fi
}

# ========================================
# CONCURRENT CONNECTION TESTING
# ========================================

test_concurrent_ssl_connections() {
    print_header "Concurrent SSL Connection Testing"
    
    for connections in "${CONCURRENT_CONNECTIONS[@]}"; do
        log_benchmark "${BLUE}Testing $connections concurrent connections...${NC}"
        
        # Create temporary script for parallel execution
        temp_script="$RESULTS_DIR/temp_test_$connections.sh"
        cat > "$temp_script" << 'EOF'
#!/bin/bash
DOMAIN="$1"
REQUESTS="$2"
OUTPUT_FILE="$3"

for i in $(seq 1 $REQUESTS); do
    timing=$(curl -w "%{time_total},%{time_connect},%{time_appconnect},%{http_code},%{size_download}" \
             -o /dev/null -s "https://$DOMAIN" 2>/dev/null || echo "0,0,0,000,0")
    echo "$timing" >> "$OUTPUT_FILE"
done
EOF
        chmod +x "$temp_script"
        
        # Start concurrent tests
        local pids=()
        local requests_per_connection=5
        
        for i in $(seq 1 $connections); do
            output_file="$RESULTS_DIR/concurrent_${connections}_${i}.txt"
            "$temp_script" "$DOMAIN" "$requests_per_connection" "$output_file" &
            pids+=($!)
        done
        
        # Wait for all tests to complete
        for pid in "${pids[@]}"; do
            wait $pid
        done
        
        # Analyze results
        local total_requests=$((connections * requests_per_connection))
        local successful_requests=0
        local total_time=0
        local total_ssl_time=0
        
        for i in $(seq 1 $connections); do
            output_file="$RESULTS_DIR/concurrent_${connections}_${i}.txt"
            if [ -f "$output_file" ]; then
                while IFS=',' read -r total connect appconnect http_code size; do
                    if [ "$http_code" = "200" ] && [ "$total" != "0" ]; then
                        ((successful_requests++))
                        total_time=$(echo "$total_time + $total" | bc)
                        if [ "$appconnect" != "0" ] && [ "$connect" != "0" ]; then
                            ssl_time=$(echo "$appconnect - $connect" | bc)
                            total_ssl_time=$(echo "$total_ssl_time + $ssl_time" | bc)
                        fi
                    fi
                done < "$output_file"
                rm -f "$output_file"  # Cleanup
            fi
        done
        
        rm -f "$temp_script"  # Cleanup
        
        if [ $successful_requests -gt 0 ]; then
            local avg_response_time=$(echo "scale=3; $total_time / $successful_requests" | bc)
            local avg_ssl_time=$(echo "scale=3; $total_ssl_time / $successful_requests" | bc)
            local success_rate=$(echo "scale=1; $successful_requests * 100 / $total_requests" | bc)
            
            log_benchmark "  Concurrent connections: $connections"
            log_benchmark "  Total requests: $total_requests"
            log_benchmark "  Successful requests: $successful_requests"
            log_benchmark "  Success rate: ${success_rate}%"
            log_benchmark "  Average response time: ${avg_response_time}s"
            log_benchmark "  Average SSL time: ${avg_ssl_time}s"
            
            if (( $(echo "$success_rate >= 95" | bc -l) )); then
                log_benchmark "${GREEN}✓ Excellent concurrency handling${NC}"
            elif (( $(echo "$success_rate >= 90" | bc -l) )); then
                log_benchmark "${YELLOW}⚠ Good concurrency handling${NC}"
            else
                log_benchmark "${RED}✗ Poor concurrency handling${NC}"
            fi
        else
            log_benchmark "${RED}✗ All concurrent requests failed${NC}"
        fi
        
        sleep 2  # Brief pause between tests
    done
}

# ========================================
# SSL SESSION REUSE TESTING
# ========================================

test_ssl_session_reuse() {
    print_header "SSL Session Reuse Testing"
    
    log_benchmark "${BLUE}Testing SSL session reuse capabilities...${NC}"
    
    # Test session reuse with OpenSSL
    session_test_output="$RESULTS_DIR/session_test.txt"
    
    # First connection - establish session
    echo "quit" | timeout 10 openssl s_client -connect $DOMAIN:443 -servername $DOMAIN \
        -sess_out "$RESULTS_DIR/session.pem" > "$session_test_output" 2>&1
    
    if [ -f "$RESULTS_DIR/session.pem" ]; then
        log_benchmark "${GREEN}✓ SSL session established and saved${NC}"
        
        # Second connection - reuse session
        echo "quit" | timeout 10 openssl s_client -connect $DOMAIN:443 -servername $DOMAIN \
            -sess_in "$RESULTS_DIR/session.pem" >> "$session_test_output" 2>&1
        
        # Check if session was reused
        if grep -q "Reused.*YES" "$session_test_output"; then
            log_benchmark "${GREEN}✓ SSL session reuse is working${NC}"
        else
            log_benchmark "${YELLOW}⚠ SSL session reuse not detected${NC}"
        fi
        
        # Check session timeout
        session_timeout=$(grep "Session Timeout" "$session_test_output" | tail -1 | awk '{print $3}')
        if [ ! -z "$session_timeout" ]; then
            log_benchmark "  Session timeout: ${session_timeout}s"
        fi
        
        rm -f "$RESULTS_DIR/session.pem"
    else
        log_benchmark "${RED}✗ Failed to establish SSL session${NC}"
    fi
}

# ========================================
# SSL CIPHER PERFORMANCE TESTING
# ========================================

test_cipher_performance() {
    print_header "SSL Cipher Performance Testing"
    
    log_benchmark "${BLUE}Testing performance of different cipher suites...${NC}"
    
    # Common cipher suites to test
    ciphers=(
        "ECDHE-RSA-AES256-GCM-SHA384"
        "ECDHE-RSA-AES128-GCM-SHA256"
        "ECDHE-RSA-CHACHA20-POLY1305"
        "ECDHE-RSA-AES256-SHA384"
        "ECDHE-RSA-AES128-SHA256"
    )
    
    for cipher in "${ciphers[@]}"; do
        log_benchmark "${YELLOW}Testing cipher: $cipher${NC}"
        
        # Test if cipher is supported
        cipher_test=$(timeout 10 openssl s_client -connect $DOMAIN:443 -cipher "$cipher" < /dev/null 2>/dev/null | grep "Cipher.*:")
        
        if [ ! -z "$cipher_test" ]; then
            # Measure performance with this cipher
            local total_time=0
            local successful_tests=0
            
            for i in {1..10}; do
                timing=$(timeout 10 curl --ciphers "$cipher" -w "%{time_total}" -o /dev/null -s "https://$DOMAIN" 2>/dev/null || echo "0")
                if [ "$timing" != "0" ]; then
                    total_time=$(echo "$total_time + $timing" | bc)
                    ((successful_tests++))
                fi
            done
            
            if [ $successful_tests -gt 0 ]; then
                avg_time=$(echo "scale=3; $total_time / $successful_tests" | bc)
                log_benchmark "  ${GREEN}✓ Supported${NC} - Average time: ${avg_time}s"
            else
                log_benchmark "  ${YELLOW}⚠ Supported but performance test failed${NC}"
            fi
        else
            log_benchmark "  ${RED}✗ Not supported${NC}"
        fi
    done
}

# ========================================
# LOAD TESTING SIMULATION
# ========================================

simulate_load_test() {
    print_header "SSL Load Testing Simulation"
    
    log_benchmark "${BLUE}Simulating realistic load patterns...${NC}"
    
    # Check if ab (Apache Bench) is available
    if ! command -v ab &> /dev/null; then
        log_benchmark "${YELLOW}⚠ Apache Bench (ab) not available, skipping load test${NC}"
        log_benchmark "  Install with: sudo apt-get install apache2-utils"
        return
    fi
    
    # Load test configurations
    declare -A load_tests=(
        ["Light Load"]="10:100"     # 10 concurrent, 100 requests
        ["Medium Load"]="25:500"    # 25 concurrent, 500 requests
        ["Heavy Load"]="50:1000"    # 50 concurrent, 1000 requests
    )
    
    for test_name in "${!load_tests[@]}"; do
        IFS=':' read -r concurrent requests <<< "${load_tests[$test_name]}"
        
        log_benchmark "${YELLOW}Running $test_name test ($concurrent concurrent, $requests total)...${NC}"
        
        # Run Apache Bench test
        ab_output="$RESULTS_DIR/ab_${test_name// /_}.txt"
        timeout 120 ab -n "$requests" -c "$concurrent" -g "$RESULTS_DIR/ab_${test_name// /_}.tsv" \
            "https://$DOMAIN/" > "$ab_output" 2>&1
        
        if [ $? -eq 0 ]; then
            # Parse results
            local rps=$(grep "Requests per second" "$ab_output" | awk '{print $4}')
            local response_time=$(grep "Time per request.*mean" "$ab_output" | head -1 | awk '{print $4}')
            local failed_requests=$(grep "Failed requests" "$ab_output" | awk '{print $3}')
            local ssl_time=$(grep "SSL/TLS Connect" "$ab_output" | awk '{print $3}')
            
            log_benchmark "  Requests per second: $rps"
            log_benchmark "  Average response time: ${response_time}ms"
            log_benchmark "  Failed requests: $failed_requests"
            if [ ! -z "$ssl_time" ]; then
                log_benchmark "  SSL connect time: ${ssl_time}ms"
            fi
            
            # Performance assessment
            if (( $(echo "$rps > 100" | bc -l 2>/dev/null) )); then
                log_benchmark "${GREEN}✓ Excellent performance under $test_name${NC}"
            elif (( $(echo "$rps > 50" | bc -l 2>/dev/null) )); then
                log_benchmark "${GREEN}✓ Good performance under $test_name${NC}"
            elif (( $(echo "$rps > 20" | bc -l 2>/dev/null) )); then
                log_benchmark "${YELLOW}⚠ Average performance under $test_name${NC}"
            else
                log_benchmark "${RED}✗ Poor performance under $test_name${NC}"
            fi
        else
            log_benchmark "${RED}✗ Load test failed or timed out${NC}"
        fi
        
        sleep 5  # Brief pause between tests
    done
}

# ========================================
# MOBILE PERFORMANCE TESTING
# ========================================

test_mobile_ssl_performance() {
    print_header "Mobile SSL Performance Testing"
    
    log_benchmark "${BLUE}Testing SSL performance with mobile user agents...${NC}"
    
    # Mobile user agents
    declare -A mobile_agents=(
        ["iPhone Safari"]="Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1"
        ["Android Chrome"]="Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36"
        ["iPad Safari"]="Mozilla/5.0 (iPad; CPU OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1"
    )
    
    for device in "${!mobile_agents[@]}"; do
        log_benchmark "${YELLOW}Testing $device performance...${NC}"
        
        local total_time=0
        local ssl_time=0
        local successful_tests=0
        
        for i in {1..10}; do
            timing=$(timeout 15 curl -H "User-Agent: ${mobile_agents[$device]}" \
                     -w "%{time_total},%{time_connect},%{time_appconnect},%{http_code}" \
                     -o /dev/null -s "https://$DOMAIN" 2>/dev/null || echo "0,0,0,000")
            
            IFS=',' read -r total connect appconnect http_code <<< "$timing"
            
            if [ "$http_code" = "200" ] && [ "$total" != "0" ]; then
                total_time=$(echo "$total_time + $total" | bc)
                if [ "$appconnect" != "0" ] && [ "$connect" != "0" ]; then
                    handshake_time=$(echo "$appconnect - $connect" | bc)
                    ssl_time=$(echo "$ssl_time + $handshake_time" | bc)
                fi
                ((successful_tests++))
            fi
        done
        
        if [ $successful_tests -gt 0 ]; then
            local avg_total=$(echo "scale=3; $total_time / $successful_tests" | bc)
            local avg_ssl=$(echo "scale=3; $ssl_time / $successful_tests" | bc)
            
            log_benchmark "  Average total time: ${avg_total}s"
            log_benchmark "  Average SSL time: ${avg_ssl}s"
            
            if (( $(echo "$avg_total < 2.0" | bc -l) )); then
                log_benchmark "${GREEN}✓ Good mobile performance${NC}"
            elif (( $(echo "$avg_total < 4.0" | bc -l) )); then
                log_benchmark "${YELLOW}⚠ Average mobile performance${NC}"
            else
                log_benchmark "${RED}✗ Poor mobile performance${NC}"
            fi
        else
            log_benchmark "${RED}✗ All mobile tests failed${NC}"
        fi
    done
}

# ========================================
# GENERATE PERFORMANCE REPORT
# ========================================

generate_performance_report() {
    print_header "Generating Performance Report"
    
    local html_report="$RESULTS_DIR/ssl-performance-report.html"
    
    cat > "$html_report" << EOF
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SSL Performance Benchmark Report - $DOMAIN</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; border-radius: 10px; box-shadow: 0 0 20px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
        .header h1 { margin: 0; font-size: 2.5em; }
        .content { padding: 30px; }
        .section { margin-bottom: 40px; }
        .section h2 { color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px; }
        .metrics { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 20px 0; }
        .metric { padding: 20px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #667eea; }
        .metric h3 { margin-top: 0; color: #333; }
        .value { font-size: 2em; font-weight: bold; color: #667eea; }
        .recommendations { background: #e7f3ff; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .recommendations h3 { color: #0066cc; margin-top: 0; }
        .chart-placeholder { height: 300px; background: #f8f9fa; border: 2px dashed #ccc; display: flex; align-items: center; justify-content: center; margin: 20px 0; border-radius: 8px; }
        .footer { text-align: center; padding: 20px; color: #666; border-top: 1px solid #e9ecef; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>SSL Performance Benchmark Report</h1>
            <p><strong>Domain:</strong> $DOMAIN</p>
            <p><strong>Test Date:</strong> $(date)</p>
            <p><strong>Test Duration:</strong> Comprehensive performance analysis</p>
        </div>
        
        <div class="content">
            <div class="section">
                <h2>Performance Summary</h2>
                <div class="metrics">
                    <div class="metric">
                        <h3>SSL Handshake Performance</h3>
                        <div class="value">$(grep "Average:" "$RESULTS_DIR/$BENCHMARK_LOG" | head -1 | awk '{print $2}' | cut -d's' -f1 || echo "N/A")s</div>
                        <p>Average SSL handshake time</p>
                    </div>
                    <div class="metric">
                        <h3>Concurrent Connections</h3>
                        <div class="value">${CONCURRENT_CONNECTIONS[-1]}</div>
                        <p>Maximum tested concurrent connections</p>
                    </div>
                    <div class="metric">
                        <h3>Session Reuse</h3>
                        <div class="value">$(grep -q "session reuse is working" "$RESULTS_DIR/$BENCHMARK_LOG" && echo "✓" || echo "✗")</div>
                        <p>SSL session reuse capability</p>
                    </div>
                    <div class="metric">
                        <h3>Mobile Performance</h3>
                        <div class="value">$(grep -c "Good mobile performance" "$RESULTS_DIR/$BENCHMARK_LOG" || echo "0")/3</div>
                        <p>Mobile devices with good performance</p>
                    </div>
                </div>
            </div>
            
            <div class="section">
                <h2>Test Categories</h2>
                <ul>
                    <li><strong>SSL Handshake Performance:</strong> Measured average time for SSL negotiation</li>
                    <li><strong>Concurrent Connections:</strong> Tested scalability under load</li>
                    <li><strong>Session Reuse:</strong> Verified SSL session caching efficiency</li>
                    <li><strong>Cipher Performance:</strong> Analyzed different cipher suite performance</li>
                    <li><strong>Mobile Performance:</strong> Tested performance on mobile devices</li>
                    <li><strong>Load Testing:</strong> Simulated real-world traffic patterns</li>
                </ul>
            </div>
            
            <div class="chart-placeholder">
                <p>Performance charts would be displayed here<br>
                (Raw data available in CSV files for external visualization)</p>
            </div>
            
            <div class="recommendations">
                <h3>Performance Optimization Recommendations</h3>
                <ul>
                    <li>Enable SSL session resumption for better performance</li>
                    <li>Use HTTP/2 to reduce connection overhead</li>
                    <li>Implement OCSP stapling to reduce handshake time</li>
                    <li>Consider using modern cipher suites (ChaCha20-Poly1305)</li>
                    <li>Enable SSL session caching on the server</li>
                    <li>Optimize certificate chain length</li>
                    <li>Monitor performance regularly under production load</li>
                </ul>
            </div>
        </div>
        
        <div class="footer">
            <p>SSL Performance Benchmark Report generated on $(date)</p>
            <p>Raw data files available in: $RESULTS_DIR/</p>
        </div>
    </div>
</body>
</html>
EOF

    log_benchmark "${GREEN}Performance report generated: $html_report${NC}"
    log_benchmark "Raw data files available in: $RESULTS_DIR/"
}

# ========================================
# MAIN EXECUTION
# ========================================

main() {
    print_header "SSL PERFORMANCE BENCHMARK SUITE"
    log_benchmark "Starting SSL performance testing for $DOMAIN"
    log_benchmark "Results will be saved to: $RESULTS_DIR/"
    
    # Warmup
    log_benchmark "${BLUE}Performing warmup requests...${NC}"
    for i in $(seq 1 $WARMUP_REQUESTS); do
        curl -s -o /dev/null "https://$DOMAIN" &
    done
    wait
    log_benchmark "Warmup complete"
    
    # Run performance tests
    test_ssl_handshake_performance
    test_concurrent_ssl_connections
    test_ssl_session_reuse
    test_cipher_performance
    simulate_load_test
    test_mobile_ssl_performance
    generate_performance_report
    
    print_header "PERFORMANCE TESTING COMPLETE"
    log_benchmark "${GREEN}All performance tests completed successfully${NC}"
    log_benchmark "Check the following files for detailed results:"
    log_benchmark "  Main log: $RESULTS_DIR/$BENCHMARK_LOG"
    log_benchmark "  HTML report: $RESULTS_DIR/ssl-performance-report.html"
    log_benchmark "  CSV data: $RESULTS_DIR/*.csv"
}

# Check dependencies
check_dependencies() {
    local deps=("curl" "openssl" "bc")
    local missing_deps=()
    
    for dep in "${deps[@]}"; do
        if ! command -v "$dep" &> /dev/null; then
            missing_deps+=("$dep")
        fi
    done
    
    if [ ${#missing_deps[@]} -ne 0 ]; then
        echo -e "${RED}Missing required dependencies: ${missing_deps[*]}${NC}"
        echo "Please install missing dependencies and try again."
        exit 1
    fi
    
    # Optional dependencies
    if ! command -v ab &> /dev/null; then
        echo -e "${YELLOW}Optional: Apache Bench (ab) not found - load testing will be skipped${NC}"
        echo "Install with: sudo apt-get install apache2-utils"
    fi
}

# Script execution
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    check_dependencies
    main "$@"
fi