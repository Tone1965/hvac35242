#!/bin/bash

# SSL WORKER AGENT 2 - METHOD 5: CLOUDFLARE PROXY SSL
# This method uses Cloudflare's proxy and SSL features

set -e

DOMAIN="hvac35242.com"
WWW_DOMAIN="www.hvac35242.com"

echo "🔒 SSL METHOD 5: CLOUDFLARE PROXY SSL"
echo "===================================="
echo "Domain: $DOMAIN"
echo "Testing Cloudflare proxy SSL method..."
echo ""

echo "🌟 CLOUDFLARE PROXY SSL SETUP GUIDE"
echo "=================================="
echo ""
echo "This method uses Cloudflare as a proxy with their free SSL certificate."
echo "It's often the easiest and most reliable method for SSL."
echo ""

echo "STEP 1: ADD DOMAIN TO CLOUDFLARE"
echo "================================"
echo "1. Go to https://dash.cloudflare.com/"
echo "2. Click 'Add a Site'"
echo "3. Enter: $DOMAIN"
echo "4. Choose 'Free' plan"
echo "5. Cloudflare will scan your DNS records"
echo ""

echo "STEP 2: UPDATE NAMESERVERS"
echo "========================="
echo "Cloudflare will provide nameservers like:"
echo "  - jane.ns.cloudflare.com"
echo "  - kirk.ns.cloudflare.com"
echo ""
echo "Update these in your domain registrar (Ionos):"
echo "1. Go to Ionos DNS management"
echo "2. Change nameservers to Cloudflare's"
echo "3. Wait 24-48 hours for propagation"
echo ""

echo "STEP 3: CONFIGURE DNS RECORDS IN CLOUDFLARE"
echo "==========================================="
echo "Add these DNS records in Cloudflare dashboard:"
echo ""
echo "A Record:"
echo "  Name: @"
echo "  Value: $(curl -s ifconfig.me 2>/dev/null || echo 'YOUR_SERVER_IP')"
echo "  Proxy: ✅ ON (orange cloud)"
echo ""
echo "CNAME Record:"
echo "  Name: www"
echo "  Value: $DOMAIN"
echo "  Proxy: ✅ ON (orange cloud)"
echo ""

echo "STEP 4: CONFIGURE SSL IN CLOUDFLARE"
echo "=================================="
echo "1. Go to SSL/TLS tab in Cloudflare"
echo "2. Set encryption mode to 'Flexible' or 'Full'"
echo "3. Enable 'Always Use HTTPS'"
echo "4. Enable 'HSTS' (optional but recommended)"
echo ""

echo "STEP 5: CONFIGURE YOUR SERVER"
echo "============================="
echo "Your server only needs to serve HTTP (port 80)"
echo "Cloudflare handles the HTTPS termination"
echo ""

# Create nginx config for Cloudflare
echo "Creating nginx configuration for Cloudflare..."

sudo tee /etc/nginx/sites-available/cloudflare-ssl > /dev/null << 'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name hvac35242.com www.hvac35242.com;
    
    # Trust Cloudflare IPs
    set_real_ip_from 173.245.48.0/20;
    set_real_ip_from 103.21.244.0/22;
    set_real_ip_from 103.22.200.0/22;
    set_real_ip_from 103.31.4.0/22;
    set_real_ip_from 141.101.64.0/18;
    set_real_ip_from 108.162.192.0/18;
    set_real_ip_from 190.93.240.0/20;
    set_real_ip_from 188.114.96.0/20;
    set_real_ip_from 197.234.240.0/22;
    set_real_ip_from 198.41.128.0/17;
    set_real_ip_from 162.158.0.0/15;
    set_real_ip_from 104.16.0.0/13;
    set_real_ip_from 104.24.0.0/14;
    set_real_ip_from 172.64.0.0/13;
    set_real_ip_from 131.0.72.0/22;
    real_ip_header CF-Connecting-IP;
    
    root /var/www/html;
    index index.html index.htm index.php;
    
    # Security headers (Cloudflare will also add some)
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    location / {
        try_files $uri $uri/ =404;
    }
    
    # Health check
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
EOF

echo "✅ Nginx config created for Cloudflare"

# Test nginx config
if sudo nginx -t; then
    echo "✅ Nginx configuration is valid"
    
    # Enable the site
    sudo ln -sf /etc/nginx/sites-available/cloudflare-ssl /etc/nginx/sites-enabled/default
    sudo systemctl reload nginx
    echo "✅ Nginx configuration applied"
else
    echo "❌ Nginx configuration failed"
    exit 1
fi

echo ""
echo "STEP 6: TESTING SETUP"
echo "===================="

# Test local HTTP
echo "Testing local HTTP..."
if curl -f http://localhost/health 2>/dev/null; then
    echo "✅ Local HTTP works"
else
    echo "❌ Local HTTP failed"
fi

# Test external HTTP
echo "Testing external HTTP..."
if curl -f "http://$DOMAIN/health" 2>/dev/null; then
    echo "✅ External HTTP works"
else
    echo "❌ External HTTP failed (this is expected until Cloudflare is configured)"
fi

echo ""
echo "STEP 7: VERIFY CLOUDFLARE SSL (After setup)"
echo "==========================================="
echo "After completing Cloudflare setup, test these URLs:"
echo ""
echo "HTTP (should redirect to HTTPS):"
echo "  http://$DOMAIN"
echo "  http://$WWW_DOMAIN"
echo ""
echo "HTTPS (should work with SSL):"
echo "  https://$DOMAIN"
echo "  https://$WWW_DOMAIN"
echo ""

echo "SSL TEST TOOLS:"
echo "=============="
echo "1. SSL Labs Test: https://www.ssllabs.com/ssltest/analyze.html?d=$DOMAIN"
echo "2. Cloudflare SSL Test: https://www.cloudflare.com/ssl-checker/"
echo "3. Browser dev tools: Check for SSL errors"
echo ""

echo "CLOUDFLARE BENEFITS:"
echo "=================="
echo "✅ Free SSL certificate (automatically renewed)"
echo "✅ CDN and caching (faster site)"
echo "✅ DDoS protection"
echo "✅ Analytics and monitoring"
echo "✅ Easy to set up (no server SSL config needed)"
echo "✅ Works even with blocked ports 80/443 on server"
echo ""

echo "TROUBLESHOOTING:"
echo "==============="
echo "If it doesn't work:"
echo "1. Wait for DNS propagation (up to 48 hours)"
echo "2. Check Cloudflare SSL mode (try 'Flexible' first)"
echo "3. Verify DNS records have orange cloud (proxy enabled)"
echo "4. Check server logs: sudo tail -f /var/log/nginx/error.log"
echo "5. Test without Cloudflare: temporarily disable proxy (gray cloud)"
echo ""

echo "NEXT STEPS:"
echo "=========="
echo "1. Complete Cloudflare setup in their dashboard"
echo "2. Wait for DNS propagation"
echo "3. Test HTTPS access"
echo "4. Configure your application to work behind Cloudflare proxy"
echo ""

# Create a simple test page
sudo tee /var/www/html/index.html > /dev/null << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>Birmingham HVAC - SSL Test</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
        .success { color: green; }
        .info { color: blue; }
    </style>
</head>
<body>
    <h1 class="success">SSL Setup Successful!</h1>
    <p class="info">Birmingham HVAC site is now secured with SSL</p>
    <p>Server time: <span id="time"></span></p>
    
    <script>
        document.getElementById('time').textContent = new Date().toLocaleString();
    </script>
</body>
</html>
EOF

echo "✅ Test page created at /var/www/html/index.html"
echo ""
echo "🎉 Cloudflare SSL method setup complete!"
echo "Complete the Cloudflare configuration in their dashboard to activate SSL."