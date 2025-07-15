#!/bin/bash

# Comprehensive SSL Security Audit Script
# Performs detailed security analysis of SSL/TLS configuration

set -euo pipefail

DOMAIN="hvac35242.com"
WWW_DOMAIN="www.hvac35242.com"
SSL_CERT_FILE="/etc/ssl/certs/${DOMAIN}.crt"
SSL_KEY_FILE="/etc/ssl/private/${DOMAIN}.key"
SSL_BUNDLE_FILE="/etc/ssl/certs/${DOMAIN}.ca-bundle"
NGINX_CONF="/etc/nginx/nginx.conf"
SITE_CONF="/etc/nginx/sites-available/${DOMAIN}"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

# Initialize scoring
TOTAL_SCORE=0
MAX_SCORE=0
CRITICAL_ISSUES=0
WARNINGS=0

# Logging functions
log_header() {
    echo -e "${PURPLE}╔══════════════════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${PURPLE}║$(printf "%78s" | tr ' ' ' ')║${NC}"
    echo -e "${PURPLE}║$(printf "%-78s" "  🔒 SSL SECURITY AUDIT - $1")║${NC}"
    echo -e "${PURPLE}║$(printf "%78s" | tr ' ' ' ')║${NC}"
    echo -e "${PURPLE}╚══════════════════════════════════════════════════════════════════════════════╝${NC}"
    echo ""
}

log_section() {
    echo -e "${CYAN}┌─ $1 ────────────────────────────────────────────────────────────────────${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
    TOTAL_SCORE=$((TOTAL_SCORE + ${2:-1}))
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
    WARNINGS=$((WARNINGS + 1))
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
    CRITICAL_ISSUES=$((CRITICAL_ISSUES + 1))
}

log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

increment_max_score() {
    MAX_SCORE=$((MAX_SCORE + ${1:-1}))
}

# Certificate validation tests
test_certificate_validity() {
    log_section "Certificate Validity Tests"
    
    # Test 1: Certificate file exists and is readable
    increment_max_score 1
    if [[ -f "$SSL_CERT_FILE" && -r "$SSL_CERT_FILE" ]]; then
        log_success "Certificate file exists and is readable"
    else
        log_error "Certificate file missing or not readable: $SSL_CERT_FILE"
        return 1
    fi
    
    # Test 2: Certificate format validation
    increment_max_score 1
    if openssl x509 -in "$SSL_CERT_FILE" -text -noout > /dev/null 2>&1; then
        log_success "Certificate format is valid"
    else
        log_error "Invalid certificate format"
        return 1
    fi
    
    # Test 3: Certificate expiry check
    increment_max_score 2
    local expiry_date=$(openssl x509 -enddate -noout -in "$SSL_CERT_FILE" | cut -d= -f2)
    local expiry_epoch=$(date -d "$expiry_date" +%s)
    local current_epoch=$(date +%s)
    local days_until_expiry=$(( ($expiry_epoch - $current_epoch) / 86400 ))
    
    if [[ $days_until_expiry -gt 90 ]]; then
        log_success "Certificate has good validity period ($days_until_expiry days remaining)" 2
    elif [[ $days_until_expiry -gt 30 ]]; then
        log_warning "Certificate expires in $days_until_expiry days - consider renewal soon"
        TOTAL_SCORE=$((TOTAL_SCORE + 1))
    elif [[ $days_until_expiry -gt 0 ]]; then
        log_error "Certificate expires very soon ($days_until_expiry days) - immediate renewal required"
    else
        log_error "Certificate has expired ($days_until_expiry days ago)"
    fi
    
    # Test 4: Certificate subject validation
    increment_max_score 1
    local cert_subject=$(openssl x509 -in "$SSL_CERT_FILE" -noout -subject | sed 's/subject= *//')
    if echo "$cert_subject" | grep -q "$DOMAIN"; then
        log_success "Certificate subject contains domain name"
    else
        log_warning "Certificate subject may not match domain: $cert_subject"
    fi
    
    # Test 5: Subject Alternative Names (SAN) check
    increment_max_score 1
    local san_names=$(openssl x509 -in "$SSL_CERT_FILE" -text -noout | grep -A1 "Subject Alternative Name" | tail -1 | tr ',' '\n' | grep DNS: || true)
    if echo "$san_names" | grep -q "$DOMAIN" && echo "$san_names" | grep -q "$WWW_DOMAIN"; then
        log_success "Certificate includes both domain and www subdomain in SAN"
    elif echo "$san_names" | grep -q "$DOMAIN"; then
        log_warning "Certificate includes domain but missing www subdomain in SAN"
    else
        log_error "Certificate missing required domain names in SAN"
    fi
    
    # Test 6: Certificate issuer validation
    increment_max_score 1
    local issuer=$(openssl x509 -in "$SSL_CERT_FILE" -noout -issuer)
    if echo "$issuer" | grep -qi "sectigo\|comodo"; then
        log_success "Certificate issued by trusted CA (Sectigo)"
    elif echo "$issuer" | grep -qi "let's encrypt"; then
        log_success "Certificate issued by trusted CA (Let's Encrypt)"
    else
        log_warning "Certificate issuer verification needed: $issuer"
    fi
    
    echo ""
}

# Private key security tests
test_private_key_security() {
    log_section "Private Key Security Tests"
    
    # Test 1: Private key file exists and has correct permissions
    increment_max_score 2
    if [[ -f "$SSL_KEY_FILE" ]]; then
        local key_perms=$(stat -c %a "$SSL_KEY_FILE" 2>/dev/null || echo "000")
        if [[ "$key_perms" == "600" ]]; then
            log_success "Private key has secure permissions (600)" 2
        elif [[ "$key_perms" == "400" ]]; then
            log_success "Private key has secure permissions (400)" 2
        else
            log_error "Private key has insecure permissions ($key_perms) - should be 600 or 400"
        fi
    else
        log_error "Private key file not found: $SSL_KEY_FILE"
        return 1
    fi
    
    # Test 2: Private key format validation
    increment_max_score 1
    if openssl rsa -in "$SSL_KEY_FILE" -check -noout > /dev/null 2>&1; then
        log_success "Private key format is valid"
    else
        log_error "Invalid private key format"
        return 1
    fi
    
    # Test 3: Certificate and key matching
    increment_max_score 2
    local cert_hash=$(openssl x509 -noout -modulus -in "$SSL_CERT_FILE" 2>/dev/null | openssl md5)
    local key_hash=$(openssl rsa -noout -modulus -in "$SSL_KEY_FILE" 2>/dev/null | openssl md5)
    
    if [[ "$cert_hash" == "$key_hash" ]]; then
        log_success "Certificate and private key match perfectly" 2
    else
        log_error "Certificate and private key do not match - SSL will not work"
    fi
    
    # Test 4: Key strength analysis
    increment_max_score 1
    local key_size=$(openssl rsa -in "$SSL_KEY_FILE" -text -noout 2>/dev/null | grep "Private-Key:" | grep -o '[0-9]*' || echo "0")
    if [[ $key_size -ge 2048 ]]; then
        log_success "Private key has adequate strength ($key_size bits)"
    elif [[ $key_size -ge 1024 ]]; then
        log_warning "Private key has weak strength ($key_size bits) - recommend 2048+ bits"
    else
        log_error "Private key has insufficient strength ($key_size bits)"
    fi
    
    echo ""
}

# SSL/TLS configuration analysis
test_ssl_configuration() {
    log_section "SSL/TLS Configuration Analysis"
    
    # Test 1: SSL protocols
    increment_max_score 2
    if grep -q "ssl_protocols.*TLSv1\.3" "$NGINX_CONF" "$SITE_CONF" 2>/dev/null; then
        if ! grep -q "ssl_protocols.*TLSv1\.1\|ssl_protocols.*TLSv1[^\.2]" "$NGINX_CONF" "$SITE_CONF" 2>/dev/null; then
            log_success "SSL configuration uses modern protocols only (TLS 1.2+)" 2
        else
            log_warning "SSL configuration includes legacy protocols - security risk"
            TOTAL_SCORE=$((TOTAL_SCORE + 1))
        fi
    else
        log_error "SSL configuration missing TLS 1.3 support"
    fi
    
    # Test 2: Cipher suite configuration
    increment_max_score 2
    if grep -q "ssl_ciphers.*ECDHE.*AES.*GCM" "$NGINX_CONF" "$SITE_CONF" 2>/dev/null; then
        if ! grep -q "ssl_ciphers.*RC4\|ssl_ciphers.*DES\|ssl_ciphers.*MD5" "$NGINX_CONF" "$SITE_CONF" 2>/dev/null; then
            log_success "Strong cipher suites configured" 2
        else
            log_error "Weak ciphers detected in configuration"
        fi
    else
        log_warning "Cipher suite configuration needs review"
    fi
    
    # Test 3: Perfect Forward Secrecy
    increment_max_score 1
    if grep -q "ssl_ciphers.*ECDHE" "$NGINX_CONF" "$SITE_CONF" 2>/dev/null; then
        log_success "Perfect Forward Secrecy (PFS) enabled"
    else
        log_warning "Perfect Forward Secrecy not properly configured"
    fi
    
    # Test 4: Session security
    increment_max_score 1
    if grep -q "ssl_session_tickets.*off" "$NGINX_CONF" "$SITE_CONF" 2>/dev/null; then
        log_success "SSL session tickets disabled for enhanced security"
    else
        log_warning "SSL session tickets enabled - potential security concern"
    fi
    
    # Test 5: OCSP stapling
    increment_max_score 1
    if grep -q "ssl_stapling.*on" "$NGINX_CONF" "$SITE_CONF" 2>/dev/null; then
        log_success "OCSP stapling enabled"
    else
        log_warning "OCSP stapling not configured"
    fi
    
    # Test 6: DH parameters
    increment_max_score 1
    if [[ -f "/etc/ssl/dhparams.pem" ]] && grep -q "ssl_dhparam" "$NGINX_CONF" "$SITE_CONF" 2>/dev/null; then
        local dh_size=$(openssl dhparam -in /etc/ssl/dhparams.pem -text -noout 2>/dev/null | grep "DH Parameters" | grep -o '[0-9]*' || echo "0")
        if [[ $dh_size -ge 2048 ]]; then
            log_success "Strong DH parameters configured ($dh_size bits)"
        else
            log_warning "Weak DH parameters ($dh_size bits)"
        fi
    else
        log_warning "DH parameters not configured or missing"
    fi
    
    echo ""
}

# Security headers analysis
test_security_headers() {
    log_section "Security Headers Analysis"
    
    # Get headers for testing
    local headers=""
    if command -v curl &> /dev/null; then
        headers=$(curl -s -I -m 10 "https://$DOMAIN" 2>/dev/null || true)
    fi
    
    if [[ -z "$headers" ]]; then
        log_warning "Unable to retrieve headers for testing - checking configuration files instead"
        # Fallback to configuration file checking
        
        # Test HSTS in config
        increment_max_score 2
        if grep -q "Strict-Transport-Security.*max-age" "$SITE_CONF" 2>/dev/null; then
            if grep -q "includeSubDomains.*preload" "$SITE_CONF" 2>/dev/null; then
                log_success "HSTS configured with includeSubDomains and preload" 2
            else
                log_success "HSTS configured" 1
                log_warning "HSTS missing includeSubDomains or preload directive"
            fi
        else
            log_error "HSTS (Strict-Transport-Security) header not configured"
        fi
        
        # Test other headers in config
        increment_max_score 5
        local headers_found=0
        
        if grep -q "X-Frame-Options" "$SITE_CONF" 2>/dev/null; then
            log_success "X-Frame-Options header configured"
            headers_found=$((headers_found + 1))
        else
            log_error "X-Frame-Options header missing"
        fi
        
        if grep -q "X-Content-Type-Options" "$SITE_CONF" 2>/dev/null; then
            log_success "X-Content-Type-Options header configured"
            headers_found=$((headers_found + 1))
        else
            log_error "X-Content-Type-Options header missing"
        fi
        
        if grep -q "Content-Security-Policy" "$SITE_CONF" 2>/dev/null; then
            log_success "Content-Security-Policy header configured"
            headers_found=$((headers_found + 1))
        else
            log_error "Content-Security-Policy header missing"
        fi
        
        if grep -q "Referrer-Policy" "$SITE_CONF" 2>/dev/null; then
            log_success "Referrer-Policy header configured"
            headers_found=$((headers_found + 1))
        else
            log_warning "Referrer-Policy header missing"
        fi
        
        if grep -q "Permissions-Policy" "$SITE_CONF" 2>/dev/null; then
            log_success "Permissions-Policy header configured"
            headers_found=$((headers_found + 1))
        else
            log_warning "Permissions-Policy header missing"
        fi
        
        TOTAL_SCORE=$((TOTAL_SCORE + headers_found))
        
    else
        # Test live headers
        
        # Test 1: HSTS header
        increment_max_score 2
        if echo "$headers" | grep -qi "strict-transport-security"; then
            local hsts_header=$(echo "$headers" | grep -i "strict-transport-security" | head -1)
            if echo "$hsts_header" | grep -q "includeSubDomains" && echo "$hsts_header" | grep -q "preload"; then
                log_success "HSTS header present with includeSubDomains and preload" 2
            elif echo "$hsts_header" | grep -q "includeSubDomains"; then
                log_success "HSTS header present with includeSubDomains" 1
                log_warning "HSTS missing preload directive"
            else
                log_success "HSTS header present" 1
                log_warning "HSTS missing includeSubDomains and preload directives"
            fi
        else
            log_error "HSTS (Strict-Transport-Security) header missing"
        fi
        
        # Test 2: X-Frame-Options
        increment_max_score 1
        if echo "$headers" | grep -qi "x-frame-options"; then
            local xfo_value=$(echo "$headers" | grep -i "x-frame-options" | head -1 | cut -d: -f2 | tr -d ' \r\n')
            if [[ "$xfo_value" == "DENY" ]]; then
                log_success "X-Frame-Options: DENY (most secure)"
            elif [[ "$xfo_value" == "SAMEORIGIN" ]]; then
                log_success "X-Frame-Options: SAMEORIGIN (good)"
            else
                log_warning "X-Frame-Options present but value may be weak: $xfo_value"
            fi
        else
            log_error "X-Frame-Options header missing"
        fi
        
        # Test 3: X-Content-Type-Options
        increment_max_score 1
        if echo "$headers" | grep -qi "x-content-type-options.*nosniff"; then
            log_success "X-Content-Type-Options: nosniff present"
        else
            log_error "X-Content-Type-Options: nosniff header missing"
        fi
        
        # Test 4: Content-Security-Policy
        increment_max_score 1
        if echo "$headers" | grep -qi "content-security-policy"; then
            log_success "Content-Security-Policy header present"
            # Could add more detailed CSP analysis here
        else
            log_error "Content-Security-Policy header missing"
        fi
        
        # Test 5: Additional modern security headers
        increment_max_score 3
        local modern_headers=0
        
        if echo "$headers" | grep -qi "referrer-policy"; then
            log_success "Referrer-Policy header present"
            modern_headers=$((modern_headers + 1))
        else
            log_warning "Referrer-Policy header missing"
        fi
        
        if echo "$headers" | grep -qi "permissions-policy"; then
            log_success "Permissions-Policy header present"
            modern_headers=$((modern_headers + 1))
        else
            log_warning "Permissions-Policy header missing"
        fi
        
        if echo "$headers" | grep -qi "cross-origin"; then
            log_success "Cross-Origin headers present"
            modern_headers=$((modern_headers + 1))
        else
            log_warning "Cross-Origin headers missing"
        fi
        
        TOTAL_SCORE=$((TOTAL_SCORE + modern_headers))
    fi
    
    echo ""
}

# Nginx configuration security
test_nginx_security() {
    log_section "Nginx Configuration Security"
    
    # Test 1: Server tokens disabled
    increment_max_score 1
    if grep -q "server_tokens.*off" "$NGINX_CONF" 2>/dev/null; then
        log_success "Server tokens disabled (version hiding)"
    else
        log_warning "Server tokens not disabled - version information exposed"
    fi
    
    # Test 2: Rate limiting configured
    increment_max_score 1
    if grep -q "limit_req_zone" "$NGINX_CONF" "$SITE_CONF" 2>/dev/null; then
        log_success "Rate limiting configured"
    else
        log_warning "Rate limiting not configured"
    fi
    
    # Test 3: Buffer size limits
    increment_max_score 1
    if grep -q "client_max_body_size" "$NGINX_CONF" 2>/dev/null; then
        local max_body_size=$(grep "client_max_body_size" "$NGINX_CONF" | head -1 | awk '{print $2}' | tr -d ';')
        log_success "Client body size limited to $max_body_size"
    else
        log_warning "Client body size not limited"
    fi
    
    # Test 4: Sensitive file protection
    increment_max_score 1
    if grep -q "location.*\\." "$SITE_CONF" 2>/dev/null && grep -q "deny all" "$SITE_CONF" 2>/dev/null; then
        log_success "Hidden file access blocked"
    else
        log_warning "Hidden file access protection not configured"
    fi
    
    # Test 5: Nginx version check
    increment_max_score 1
    if command -v nginx &> /dev/null; then
        local nginx_version=$(nginx -v 2>&1 | grep -o '[0-9]\+\.[0-9]\+\.[0-9]\+' || echo "unknown")
        if [[ "$nginx_version" != "unknown" ]]; then
            # Check if version is reasonably recent (1.18+ is good)
            local major=$(echo "$nginx_version" | cut -d. -f1)
            local minor=$(echo "$nginx_version" | cut -d. -f2)
            if [[ $major -gt 1 ]] || [[ $major -eq 1 && $minor -ge 18 ]]; then
                log_success "Nginx version is recent ($nginx_version)"
            else
                log_warning "Nginx version may be outdated ($nginx_version)"
            fi
        else
            log_warning "Unable to determine nginx version"
        fi
    else
        log_error "Nginx not found"
    fi
    
    echo ""
}

# Connection and protocol tests
test_connection_security() {
    log_section "Connection Security Tests"
    
    if ! command -v curl &> /dev/null; then
        log_warning "curl not available - skipping connection tests"
        return
    fi
    
    # Test 1: HTTPS connection
    increment_max_score 2
    if curl -s -m 10 "https://$DOMAIN" > /dev/null 2>&1; then
        log_success "HTTPS connection successful" 2
    else
        log_error "HTTPS connection failed"
        # Skip remaining connection tests if basic HTTPS fails
        return
    fi
    
    # Test 2: HTTP to HTTPS redirect
    increment_max_score 1
    local redirect_response=$(curl -s -I -m 10 "http://$DOMAIN" 2>/dev/null | head -1 || echo "")
    if echo "$redirect_response" | grep -q "301\|302"; then
        log_success "HTTP to HTTPS redirect working"
    else
        log_warning "HTTP to HTTPS redirect not detected"
    fi
    
    # Test 3: SSL/TLS protocol test with OpenSSL
    increment_max_score 2
    if command -v openssl &> /dev/null; then
        local ssl_info=$(echo | timeout 10 openssl s_client -connect "$DOMAIN:443" -servername "$DOMAIN" 2>/dev/null || true)
        
        if [[ -n "$ssl_info" ]]; then
            local protocol=$(echo "$ssl_info" | grep "Protocol" | awk '{print $3}' || echo "unknown")
            
            if [[ "$protocol" == "TLSv1.3" ]]; then
                log_success "Using TLS 1.3 (excellent)" 2
            elif [[ "$protocol" == "TLSv1.2" ]]; then
                log_success "Using TLS 1.2 (good)" 1
                log_info "Consider enabling TLS 1.3 for optimal security"
            else
                log_error "Using potentially insecure protocol: $protocol"
            fi
            
            # Check cipher
            local cipher=$(echo "$ssl_info" | grep "Cipher" | awk '{print $3}' || echo "unknown")
            if echo "$cipher" | grep -q "ECDHE.*AES.*GCM\|CHACHA20"; then
                log_info "Strong cipher in use: $cipher"
            else
                log_warning "Cipher strength verification needed: $cipher"
            fi
        else
            log_error "Unable to establish SSL connection for protocol testing"
        fi
    else
        log_warning "OpenSSL not available for protocol testing"
    fi
    
    # Test 4: Certificate chain validation
    increment_max_score 1
    if [[ -f "$SSL_BUNDLE_FILE" ]]; then
        local chain_length=$(openssl crl2pkcs7 -nocrl -certfile "$SSL_BUNDLE_FILE" 2>/dev/null | openssl pkcs7 -print_certs -noout 2>/dev/null | grep -c "subject=" || echo "0")
        if [[ $chain_length -gt 0 ]]; then
            log_success "Certificate chain configured (length: $chain_length)"
        else
            log_warning "Certificate chain may be incomplete"
        fi
    else
        log_warning "Certificate bundle file not found"
    fi
    
    echo ""
}

# Generate security recommendations
generate_recommendations() {
    log_section "Security Recommendations"
    
    if [[ $CRITICAL_ISSUES -eq 0 && $WARNINGS -eq 0 ]]; then
        log_success "No critical issues or warnings found - excellent security posture!"
        return
    fi
    
    if [[ $CRITICAL_ISSUES -gt 0 ]]; then
        echo -e "${RED}Critical Issues Found:${NC}"
        echo "- Review certificate installation and configuration"
        echo "- Ensure private key has proper permissions (600 or 400)"
        echo "- Verify certificate and key files match"
        echo "- Check certificate expiry dates"
        echo ""
    fi
    
    if [[ $WARNINGS -gt 0 ]]; then
        echo -e "${YELLOW}Recommended Improvements:${NC}"
        echo "- Enable all security headers (HSTS, CSP, X-Frame-Options, etc.)"
        echo "- Configure OCSP stapling for better performance"
        echo "- Set up certificate monitoring and alerts"
        echo "- Consider upgrading to TLS 1.3 only"
        echo "- Implement Content Security Policy"
        echo "- Enable HSTS preloading"
        echo ""
    fi
    
    echo -e "${BLUE}Best Practices:${NC}"
    echo "- Regularly update nginx and OpenSSL"
    echo "- Monitor certificate expiry (30+ days before expiration)"
    echo "- Perform regular security audits"
    echo "- Test SSL configuration with online tools"
    echo "- Keep SSL configuration up to date with latest standards"
    echo "- Consider implementing Certificate Transparency monitoring"
    echo ""
}

# Generate final security score and grade
generate_security_score() {
    log_section "Security Score and Grade"
    
    local percentage=0
    if [[ $MAX_SCORE -gt 0 ]]; then
        percentage=$((TOTAL_SCORE * 100 / MAX_SCORE))
    fi
    
    local grade="F"
    local grade_color="$RED"
    
    if [[ $percentage -ge 95 && $CRITICAL_ISSUES -eq 0 ]]; then
        grade="A+"
        grade_color="$GREEN"
    elif [[ $percentage -ge 90 && $CRITICAL_ISSUES -eq 0 ]]; then
        grade="A"
        grade_color="$GREEN"
    elif [[ $percentage -ge 80 && $CRITICAL_ISSUES -eq 0 ]]; then
        grade="B"
        grade_color="$YELLOW"
    elif [[ $percentage -ge 70 ]]; then
        grade="C"
        grade_color="$YELLOW"
    elif [[ $percentage -ge 60 ]]; then
        grade="D"
        grade_color="$RED"
    fi
    
    echo ""
    echo -e "${BLUE}╔═══════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║                      SECURITY AUDIT RESULTS                  ║${NC}"
    echo -e "${BLUE}╠═══════════════════════════════════════════════════════════════╣${NC}"
    echo -e "${BLUE}║${NC} Domain: $(printf "%-49s" "$DOMAIN") ${BLUE}║${NC}"
    echo -e "${BLUE}║${NC} Score: $(printf "%-50s" "$TOTAL_SCORE / $MAX_SCORE ($percentage%)") ${BLUE}║${NC}"
    echo -e "${BLUE}║${NC} Grade: $(printf "%s%-49s%s" "$grade_color" "$grade" "$NC") ${BLUE}║${NC}"
    echo -e "${BLUE}║${NC} Critical Issues: $(printf "%-38s" "$CRITICAL_ISSUES") ${BLUE}║${NC}"
    echo -e "${BLUE}║${NC} Warnings: $(printf "%-46s" "$WARNINGS") ${BLUE}║${NC}"
    echo -e "${BLUE}║${NC} Date: $(printf "%-50s" "$(date)") ${BLUE}║${NC}"
    echo -e "${BLUE}╚═══════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    
    # Grade interpretation
    case $grade in
        "A+")
            echo -e "${GREEN}🏆 EXCELLENT: Your SSL configuration meets the highest security standards!${NC}"
            ;;
        "A")
            echo -e "${GREEN}🥇 VERY GOOD: Your SSL configuration is very secure with minor room for improvement.${NC}"
            ;;
        "B")
            echo -e "${YELLOW}🥈 GOOD: Your SSL configuration is solid but could be enhanced.${NC}"
            ;;
        "C")
            echo -e "${YELLOW}🥉 ACCEPTABLE: Your SSL configuration works but needs security improvements.${NC}"
            ;;
        "D")
            echo -e "${RED}⚠️  POOR: Your SSL configuration has significant security weaknesses.${NC}"
            ;;
        "F")
            echo -e "${RED}❌ FAILING: Your SSL configuration has critical security issues that must be addressed.${NC}"
            ;;
    esac
    echo ""
}

# Main audit function
main() {
    log_header "$(date '+%Y-%m-%d %H:%M:%S')"
    
    echo -e "${BLUE}Domain: $DOMAIN${NC}"
    echo -e "${BLUE}Timestamp: $(date)${NC}"
    echo ""
    
    # Run all security tests
    test_certificate_validity || true
    test_private_key_security || true
    test_ssl_configuration || true
    test_security_headers || true
    test_nginx_security || true
    test_connection_security || true
    
    # Generate results
    generate_recommendations
    generate_security_score
    
    # Save report
    local report_file="/tmp/ssl-security-audit-$(date +%Y%m%d_%H%M%S).txt"
    {
        echo "SSL SECURITY AUDIT REPORT"
        echo "========================="
        echo "Domain: $DOMAIN"
        echo "Date: $(date)"
        echo "Score: $TOTAL_SCORE / $MAX_SCORE ($((TOTAL_SCORE * 100 / MAX_SCORE))%)"
        echo "Critical Issues: $CRITICAL_ISSUES"
        echo "Warnings: $WARNINGS"
        echo ""
        echo "This report was generated by the SSL Security Audit script."
        echo "For detailed results, run the script interactively."
    } > "$report_file"
    
    log_info "Detailed report saved to: $report_file"
    
    # Return appropriate exit code
    if [[ $CRITICAL_ISSUES -gt 0 ]]; then
        exit 2
    elif [[ $WARNINGS -gt 0 ]]; then
        exit 1
    else
        exit 0
    fi
}

# Show help
if [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
    echo "SSL Security Audit Script"
    echo ""
    echo "Performs comprehensive security analysis of SSL/TLS configuration for $DOMAIN"
    echo ""
    echo "Usage: $0 [options]"
    echo ""
    echo "Options:"
    echo "  -h, --help    Show this help message"
    echo ""
    echo "The script tests:"
    echo "  ✓ Certificate validity and expiration"
    echo "  ✓ Private key security and permissions"
    echo "  ✓ SSL/TLS protocol and cipher configuration"
    echo "  ✓ Security headers implementation"
    echo "  ✓ Nginx security settings"
    echo "  ✓ Connection security and redirects"
    echo ""
    echo "Exit codes:"
    echo "  0 - No issues found"
    echo "  1 - Warnings found"
    echo "  2 - Critical issues found"
    echo ""
    exit 0
fi

# Run the audit
main "$@"