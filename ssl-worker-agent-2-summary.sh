#!/bin/bash

# SSL WORKER AGENT 2 - SUMMARY AND EXECUTION SCRIPT
# Choose and run the best SSL method for your situation

set -e

DOMAIN="hvac35242.com"
SERVER_IP=$(curl -s ifconfig.me 2>/dev/null || echo "Unknown")
DOMAIN_IP=$(dig +short $DOMAIN 2>/dev/null || echo "Unknown")

echo "🔒 SSL WORKER AGENT 2 - METHOD SELECTION"
echo "========================================"
echo "Domain: $DOMAIN"
echo "Server IP: $SERVER_IP"
echo "Domain resolves to: $DOMAIN_IP"
echo ""

# Check DNS status
if [ "$DOMAIN_IP" = "$SERVER_IP" ]; then
    DNS_OK=true
    echo "✅ DNS is correctly pointing to this server"
else
    DNS_OK=false
    echo "❌ DNS mismatch detected"
fi

echo ""
echo "AVAILABLE SSL METHODS:"
echo "====================="
echo ""

echo "1. CERTBOT STANDALONE (Recommended if DNS is correct)"
echo "   - Stops nginx temporarily"
echo "   - Uses certbot's built-in web server"
echo "   - Works if ports 80/443 are free"
echo "   - File: ssl-method-1-standalone.sh"
echo ""

echo "2. CERTBOT WEBROOT (Good for production)"
echo "   - Uses nginx to serve challenge files"
echo "   - No downtime during certificate acquisition"
echo "   - Requires nginx configuration"
echo "   - File: ssl-method-2-webroot.sh"
echo ""

echo "3. DNS VALIDATION (Works even with blocked ports)"
echo "   - Uses DNS TXT records instead of HTTP"
echo "   - Bypasses web server entirely"
echo "   - Requires manual DNS record creation or API access"
echo "   - File: ssl-method-3-dns.sh"
echo ""

echo "4. STAGING TEST (Safe testing method)"
echo "   - Tests all methods with staging certificates"
echo "   - Avoids rate limits"
echo "   - Good for troubleshooting"
echo "   - File: ssl-method-4-staging-test.sh"
echo ""

echo "5. CLOUDFLARE PROXY SSL (Easiest overall)"
echo "   - Uses Cloudflare's free SSL"
echo "   - No server SSL configuration needed"
echo "   - Includes CDN and DDoS protection"
echo "   - File: ssl-method-5-cloudflare.sh"
echo ""

# Provide recommendations
echo "RECOMMENDATIONS:"
echo "==============="

if [ "$DNS_OK" = true ]; then
    echo "✅ DNS is correctly configured"
    echo ""
    echo "RECOMMENDED ORDER TO TRY:"
    echo "1. Method 4 (Staging Test) - Test everything safely first"
    echo "2. Method 1 (Standalone) - Usually works best with correct DNS"
    echo "3. Method 2 (Webroot) - Good for production environments"
    echo "4. Method 5 (Cloudflare) - Fallback option"
else
    echo "⚠️  DNS is not pointing to this server"
    echo ""
    echo "RECOMMENDED OPTIONS:"
    echo "1. Fix DNS first, then try methods 1-4"
    echo "2. Use Method 5 (Cloudflare) - works regardless of DNS"
    echo "3. Use Method 3 (DNS validation) - bypasses HTTP validation"
fi

echo ""
echo "QUICK START:"
echo "==========="

# Make scripts executable
chmod +x ssl-method-*.sh

echo "All SSL method scripts are now executable."
echo ""

if [ "$DNS_OK" = true ]; then
    echo "Recommended first step:"
    echo "  ./ssl-method-4-staging-test.sh"
    echo ""
    echo "If staging test succeeds, then run:"
    echo "  ./ssl-method-1-standalone.sh"
else
    echo "Since DNS isn't pointing here, recommended options:"
    echo ""
    echo "Option A - Fix DNS first:"
    echo "  1. Point $DOMAIN to $SERVER_IP in your DNS provider"
    echo "  2. Wait 5-10 minutes for propagation"
    echo "  3. Run: ./ssl-method-4-staging-test.sh"
    echo ""
    echo "Option B - Use Cloudflare (easiest):"
    echo "  ./ssl-method-5-cloudflare.sh"
    echo ""
    echo "Option C - Use DNS validation:"
    echo "  ./ssl-method-3-dns.sh"
fi

echo ""
echo "TROUBLESHOOTING:"
echo "==============="

# Check common issues
echo "Current system status:"

# Check if nginx is running
if systemctl is-active --quiet nginx; then
    echo "✅ Nginx is running"
else
    echo "❌ Nginx is not running"
fi

# Check what's using port 80
PORT_80=$(sudo lsof -i :80 2>/dev/null | wc -l)
if [ $PORT_80 -gt 1 ]; then
    echo "⚠️  Port 80 is in use"
    sudo lsof -i :80
else
    echo "✅ Port 80 is available"
fi

# Check what's using port 443
PORT_443=$(sudo lsof -i :443 2>/dev/null | wc -l)
if [ $PORT_443 -gt 1 ]; then
    echo "⚠️  Port 443 is in use"
    sudo lsof -i :443
else
    echo "✅ Port 443 is available"
fi

# Check certbot installation
if command -v certbot &> /dev/null; then
    echo "✅ Certbot is installed"
else
    echo "❌ Certbot is not installed"
    echo "   Install with: sudo apt update && sudo apt install -y certbot"
fi

echo ""
echo "SSL METHOD FILES CREATED:"
echo "========================"
ls -la ssl-method-*.sh

echo ""
echo "NEXT STEPS:"
echo "=========="
echo "1. Choose a method based on recommendations above"
echo "2. Run the corresponding script"
echo "3. Follow the on-screen instructions"
echo "4. Test your SSL certificate after acquisition"
echo ""
echo "TESTING URLS (after SSL is working):"
echo "  https://$DOMAIN"
echo "  https://www.$DOMAIN"
echo "  https://www.ssllabs.com/ssltest/analyze.html?d=$DOMAIN"
echo ""

# Interactive mode
read -p "Would you like to run a method now? (y/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "Which method would you like to run?"
    echo "1. Staging Test (safe)"
    echo "2. Standalone"
    echo "3. Webroot"
    echo "4. DNS Validation"
    echo "5. Cloudflare Setup"
    echo ""
    read -p "Enter method number (1-5): " method
    
    case $method in
        1)
            echo "Running staging test..."
            ./ssl-method-4-staging-test.sh
            ;;
        2)
            echo "Running standalone method..."
            ./ssl-method-1-standalone.sh
            ;;
        3)
            echo "Running webroot method..."
            ./ssl-method-2-webroot.sh
            ;;
        4)
            echo "Running DNS validation..."
            ./ssl-method-3-dns.sh
            ;;
        5)
            echo "Running Cloudflare setup..."
            ./ssl-method-5-cloudflare.sh
            ;;
        *)
            echo "Invalid selection. Run the script again to try."
            ;;
    esac
else
    echo "Run any of the ssl-method-*.sh scripts when ready."
fi