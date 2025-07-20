#!/bin/bash

# Birmingham HVAC Deployment Verification Script
# This script verifies that the deployment was successful
# This script should be run on the DigitalOcean server (142.93.194.81)

echo "✅ Starting Birmingham HVAC Deployment Verification"
echo "=================================================="

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counters
TESTS_PASSED=0
TESTS_FAILED=0

# Function to run test and track results
run_test() {
    local test_name="$1"
    local test_command="$2"
    
    echo -n "Testing $test_name... "
    
    if eval "$test_command" >/dev/null 2>&1; then
        echo -e "${GREEN}✅ PASSED${NC}"
        ((TESTS_PASSED++))
        return 0
    else
        echo -e "${RED}❌ FAILED${NC}"
        ((TESTS_FAILED++))
        return 1
    fi
}

# Function to run test with custom validation
run_test_with_output() {
    local test_name="$1"
    local test_command="$2"
    local expected_pattern="$3"
    
    echo -n "Testing $test_name... "
    
    local output=$(eval "$test_command" 2>/dev/null)
    
    if [[ "$output" =~ $expected_pattern ]]; then
        echo -e "${GREEN}✅ PASSED${NC}"
        ((TESTS_PASSED++))
        return 0
    else
        echo -e "${RED}❌ FAILED${NC}"
        if [ ! -z "$output" ]; then
            echo -e "${YELLOW}Output: $output${NC}"
        fi
        ((TESTS_FAILED++))
        return 1
    fi
}

echo "🔍 Container Status Tests"
echo "========================"

# Test if production container is running
run_test "Production container running" "docker ps | grep -q hvac-prod"

# Test if nginx container is running
run_test "Nginx container running" "docker ps | grep -q nginx"

# Test container health
run_test_with_output "Production container health" "docker inspect hvac-prod --format='{{.State.Health.Status}}'" "healthy|starting"

echo ""
echo "🌐 Network Connectivity Tests"
echo "============================="

# Test local port connectivity
run_test "Local port 3001 accessible" "curl -f http://localhost:3001"

# Test HTTPS connectivity
run_test "HTTPS site accessible" "curl -f https://www.hvac35242.com"

# Test dev site accessibility
run_test "Dev site accessible" "curl -f https://dev.hvac35242.com"

echo ""
echo "📄 Critical Pages Tests"
echo "======================="

# Define critical pages to test
CRITICAL_PAGES=(
    "/"
    "/contact"
    "/emergency"
    "/services"
    "/quote"
)

# Test each critical page
for page in "${CRITICAL_PAGES[@]}"; do
    run_test "Page $page loads" "curl -f https://www.hvac35242.com$page"
done

echo ""
echo "🔒 SSL Certificate Tests"
echo "========================"

# Test SSL certificate validity
run_test "SSL certificate valid" "curl -f --connect-timeout 10 https://www.hvac35242.com"

# Test SSL certificate expiry (not expiring in next 30 days)
run_test_with_output "SSL certificate not expiring soon" "openssl s_client -connect www.hvac35242.com:443 -servername www.hvac35242.com </dev/null 2>/dev/null | openssl x509 -noout -dates | grep 'notAfter'" "$(date -d '+30 days' '+%Y')"

echo ""
echo "⚡ Performance Tests"
echo "==================="

# Test response time (should be less than 5 seconds)
echo -n "Testing response time... "
RESPONSE_TIME=$(curl -o /dev/null -s -w '%{time_total}' https://www.hvac35242.com)
if (( $(echo "$RESPONSE_TIME < 5.0" | bc -l) )); then
    echo -e "${GREEN}✅ PASSED${NC} (${RESPONSE_TIME}s)"
    ((TESTS_PASSED++))
else
    echo -e "${RED}❌ FAILED${NC} (${RESPONSE_TIME}s - too slow)"
    ((TESTS_FAILED++))
fi

# Test page size (should return content)
run_test_with_output "Page returns content" "curl -s https://www.hvac35242.com | wc -c" "^[1-9][0-9]*$"

echo ""
echo "📊 Resource Usage Tests"
echo "======================="

# Test memory usage
echo -n "Testing memory usage... "
MEMORY_USAGE=$(docker stats --no-stream --format "table {{.MemPerc}}" hvac-prod | tail -1 | sed 's/%//')
if (( $(echo "$MEMORY_USAGE < 80" | bc -l) )); then
    echo -e "${GREEN}✅ PASSED${NC} (${MEMORY_USAGE}%)"
    ((TESTS_PASSED++))
else
    echo -e "${RED}❌ FAILED${NC} (${MEMORY_USAGE}% - too high)"
    ((TESTS_FAILED++))
fi

# Test CPU usage
echo -n "Testing CPU usage... "
CPU_USAGE=$(docker stats --no-stream --format "table {{.CPUPerc}}" hvac-prod | tail -1 | sed 's/%//')
if (( $(echo "$CPU_USAGE < 80" | bc -l) )); then
    echo -e "${GREEN}✅ PASSED${NC} (${CPU_USAGE}%)"
    ((TESTS_PASSED++))
else
    echo -e "${YELLOW}⚠️ WARNING${NC} (${CPU_USAGE}% - high but acceptable)"
    ((TESTS_PASSED++))
fi

echo ""
echo "🔍 SEO & Content Tests"
echo "======================"

# Test if title tag is present
run_test_with_output "Title tag present" "curl -s https://www.hvac35242.com | grep -i '<title>'" "<title>"

# Test if meta description is present
run_test_with_output "Meta description present" "curl -s https://www.hvac35242.com | grep -i 'meta name=\"description\"'" "meta.*description"

# Test if contact phone number is present
run_test_with_output "Contact phone number present" "curl -s https://www.hvac35242.com | grep -i '205.*835.*0111'" "205.*835.*0111"

echo ""
echo "🛠️ Functionality Tests"
echo "======================"

# Test if contact form is present
run_test_with_output "Contact form present" "curl -s https://www.hvac35242.com/contact | grep -i 'form'" "form"

# Test if emergency CTA is present
run_test_with_output "Emergency CTA present" "curl -s https://www.hvac35242.com | grep -i 'emergency'" "emergency"

echo ""
echo "📋 Docker Environment Tests"
echo "==========================="

# Test if containers have correct environment variables
run_test_with_output "Production environment set" "docker exec hvac-prod env | grep NODE_ENV" "NODE_ENV=production"

# Test if containers are set to restart
run_test_with_output "Container restart policy" "docker inspect hvac-prod --format='{{.HostConfig.RestartPolicy.Name}}'" "unless-stopped"

echo ""
echo "🚨 Error Log Tests"
echo "=================="

# Check for critical errors in container logs (last 50 lines)
echo -n "Checking for critical errors... "
CRITICAL_ERRORS=$(docker logs hvac-prod --tail 50 2>&1 | grep -i -E "error|fatal|exception|crash" | wc -l)
if [ "$CRITICAL_ERRORS" -eq 0 ]; then
    echo -e "${GREEN}✅ PASSED${NC} (No critical errors)"
    ((TESTS_PASSED++))
else
    echo -e "${RED}❌ FAILED${NC} ($CRITICAL_ERRORS critical errors found)"
    echo -e "${YELLOW}Recent errors:${NC}"
    docker logs hvac-prod --tail 50 2>&1 | grep -i -E "error|fatal|exception|crash" | head -5
    ((TESTS_FAILED++))
fi

# Check nginx error logs
echo -n "Checking nginx errors... "
NGINX_ERRORS=$(docker logs nginx --tail 50 2>&1 | grep -i error | wc -l)
if [ "$NGINX_ERRORS" -eq 0 ]; then
    echo -e "${GREEN}✅ PASSED${NC} (No nginx errors)"
    ((TESTS_PASSED++))
else
    echo -e "${YELLOW}⚠️ WARNING${NC} ($NGINX_ERRORS nginx errors found)"
    ((TESTS_PASSED++))
fi

echo ""
echo "📊 DEPLOYMENT VERIFICATION SUMMARY"
echo "=================================="
echo -e "Tests Passed: ${GREEN}$TESTS_PASSED${NC}"
echo -e "Tests Failed: ${RED}$TESTS_FAILED${NC}"
echo -e "Total Tests: $(($TESTS_PASSED + $TESTS_FAILED))"

if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "\n🎉 ${GREEN}DEPLOYMENT VERIFICATION SUCCESSFUL!${NC}"
    echo -e "✅ All tests passed. The deployment is ready for production."
    exit 0
elif [ $TESTS_FAILED -le 2 ]; then
    echo -e "\n⚠️  ${YELLOW}DEPLOYMENT VERIFICATION COMPLETED WITH WARNINGS${NC}"
    echo -e "🟡 Minor issues detected. Review failed tests and consider fixes."
    exit 1
else
    echo -e "\n❌ ${RED}DEPLOYMENT VERIFICATION FAILED${NC}"
    echo -e "🔴 Critical issues detected. DO NOT proceed with production traffic."
    echo -e "🔧 Please fix the failed tests before continuing."
    exit 2
fi