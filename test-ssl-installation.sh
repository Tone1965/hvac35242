#!/bin/bash

# SSL Installation Testing Script for hvac35242.com
# This script performs comprehensive testing of the SSL installation

DOMAIN="hvac35242.com"
SERVER_IP="142.93.194.81"

echo "============================================"
echo "SSL Installation Testing for $DOMAIN"
echo "============================================"
echo

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print status
print_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✓ $2${NC}"
    else
        echo -e "${RED}✗ $2${NC}"
    fi
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

echo "Test 1: Basic HTTPS connectivity..."
if curl -I -s --connect-timeout 10 "https://$DOMAIN" >/dev/null 2>&1; then
    print_status 0 "HTTPS connection successful"
else
    print_status 1 "HTTPS connection failed"
fi

echo
echo "Test 2: HTTP to HTTPS redirect..."
REDIRECT_STATUS=$(curl -I -s --connect-timeout 10 "http://$DOMAIN" | head -1 | grep -o "301\|302" || echo "none")
if [ "$REDIRECT_STATUS" = "301" ] || [ "$REDIRECT_STATUS" = "302" ]; then
    print_status 0 "HTTP to HTTPS redirect working (Status: $REDIRECT_STATUS)"
else
    print_status 1 "HTTP to HTTPS redirect not working"
fi

echo
echo "Test 3: WWW to non-WWW redirect..."
WWW_REDIRECT=$(curl -I -s --connect-timeout 10 "https://www.$DOMAIN" | head -1 | grep -o "301\|302" || echo "none")
if [ "$WWW_REDIRECT" = "301" ] || [ "$WWW_REDIRECT" = "302" ]; then
    print_status 0 "WWW to non-WWW redirect working (Status: $WWW_REDIRECT)"
else
    print_status 1 "WWW to non-WWW redirect not working"
fi

echo
echo "Test 4: SSL Certificate validation..."
if openssl s_client -connect "$DOMAIN:443" -servername "$DOMAIN" </dev/null 2>/dev/null | openssl x509 -noout -text | grep -q "Subject:"; then
    print_status 0 "SSL certificate is valid"
    
    # Get certificate details
    CERT_SUBJECT=$(openssl s_client -connect "$DOMAIN:443" -servername "$DOMAIN" </dev/null 2>/dev/null | openssl x509 -noout -subject | sed 's/subject=//')
    CERT_ISSUER=$(openssl s_client -connect "$DOMAIN:443" -servername "$DOMAIN" </dev/null 2>/dev/null | openssl x509 -noout -issuer | sed 's/issuer=//')
    CERT_EXPIRY=$(openssl s_client -connect "$DOMAIN:443" -servername "$DOMAIN" </dev/null 2>/dev/null | openssl x509 -noout -enddate | sed 's/notAfter=//')
    
    echo "   Subject: $CERT_SUBJECT"
    echo "   Issuer: $CERT_ISSUER"
    echo "   Expires: $CERT_EXPIRY"
else
    print_status 1 "SSL certificate validation failed"
fi

echo
echo "Test 5: SSL Protocol support..."
TLS12_SUPPORT=$(openssl s_client -connect "$DOMAIN:443" -tls1_2 </dev/null 2>/dev/null | grep -c "Verify return code: 0")
TLS13_SUPPORT=$(openssl s_client -connect "$DOMAIN:443" -tls1_3 </dev/null 2>/dev/null | grep -c "Verify return code: 0")

if [ "$TLS12_SUPPORT" -gt 0 ]; then
    print_status 0 "TLS 1.2 supported"
else
    print_status 1 "TLS 1.2 not supported"
fi

if [ "$TLS13_SUPPORT" -gt 0 ]; then
    print_status 0 "TLS 1.3 supported"
else
    print_warning "TLS 1.3 not supported (may be normal depending on server/client)"
fi

echo
echo "Test 6: Security headers..."
SECURITY_HEADERS=$(curl -I -s "https://$DOMAIN" | grep -i "strict-transport-security\|x-frame-options\|x-content-type-options\|x-xss-protection")
if [ -n "$SECURITY_HEADERS" ]; then
    print_status 0 "Security headers present"
    echo "$SECURITY_HEADERS" | while read -r line; do
        echo "   $line"
    done
else
    print_status 1 "Security headers missing"
fi

echo
echo "Test 7: Certificate chain validation..."
if openssl s_client -connect "$DOMAIN:443" -servername "$DOMAIN" -verify_return_error </dev/null >/dev/null 2>&1; then
    print_status 0 "Certificate chain is valid"
else
    print_status 1 "Certificate chain validation failed"
fi

echo
echo "Test 8: Wildcard certificate test..."
# Test a subdomain if wildcard cert is installed
SUBDOMAIN="www.$DOMAIN"
if openssl s_client -connect "$SUBDOMAIN:443" -servername "$SUBDOMAIN" </dev/null 2>/dev/null | openssl x509 -noout -text | grep -q "Subject:"; then
    print_status 0 "Wildcard certificate working for subdomains"
else
    print_warning "Wildcard certificate test failed (may need subdomain setup)"
fi

echo
echo "Test 9: SSL Labs rating check..."
echo "You can check your SSL rating at:"
echo "https://www.ssllabs.com/ssltest/analyze.html?d=$DOMAIN"

echo
echo "Test 10: Server configuration check..."
if nc -z "$SERVER_IP" 443 2>/dev/null; then
    print_status 0 "Port 443 is open and accessible"
else
    print_status 1 "Port 443 is not accessible"
fi

if nc -z "$SERVER_IP" 80 2>/dev/null; then
    print_status 0 "Port 80 is open and accessible"
else
    print_status 1 "Port 80 is not accessible"
fi

echo
echo "============================================"
echo "SSL Testing Complete!"
echo "============================================"
echo
echo "Summary of recommended next steps:"
echo "1. Visit https://$DOMAIN to verify the site loads correctly"
echo "2. Test any subdomains you plan to use (e.g., www.$DOMAIN, api.$DOMAIN)"
echo "3. Check SSL Labs rating for security optimization"
echo "4. Set up monitoring for certificate expiration"
echo "5. Consider setting up auto-renewal if not already configured"
echo
echo "If any tests failed, check:"
echo "- Nginx error logs: ssh root@$SERVER_IP 'tail -f /var/log/nginx/error.log'"
echo "- Nginx configuration: ssh root@$SERVER_IP 'nginx -t'"
echo "- Certificate files: ssh root@$SERVER_IP 'ls -la /etc/ssl/certs/$DOMAIN/ && ls -la /etc/ssl/private/$DOMAIN.key'"
echo