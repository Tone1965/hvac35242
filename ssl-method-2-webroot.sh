#!/bin/bash

# SSL WORKER AGENT 2 - METHOD 2: CERTBOT WEBROOT TEST
# This method uses nginx to serve challenge files from a webroot directory

set -e

DOMAIN="hvac35242.com"
WWW_DOMAIN="www.hvac35242.com"
EMAIL="admin@hvac35242.com"  # Change this to your actual email
WEBROOT="/var/www/html"

echo "🔒 SSL METHOD 2: CERTBOT WEBROOT"
echo "==============================="
echo "Domain: $DOMAIN"
echo "Webroot: $WEBROOT"
echo "Testing webroot method..."
echo ""

# Install certbot if needed
if ! command -v certbot &> /dev/null; then
    echo "Installing certbot..."
    sudo apt update
    sudo apt install -y certbot python3-certbot-nginx
fi

echo "Step 1: Setting up webroot directory..."
sudo mkdir -p $WEBROOT/.well-known/acme-challenge
sudo chown -R www-data:www-data $WEBROOT/.well-known
sudo chmod -R 755 $WEBROOT/.well-known

echo "Step 2: Creating minimal nginx configuration..."
sudo tee /etc/nginx/sites-available/default > /dev/null << 'EOF'
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    
    server_name hvac35242.com www.hvac35242.com;
    root /var/www/html;
    index index.html index.htm;
    
    # ACME challenge location - CRITICAL for Let's Encrypt
    location /.well-known/acme-challenge/ {
        root /var/www/html;
        try_files $uri =404;
        allow all;
    }
    
    # Simple response for other requests
    location / {
        return 200 'SSL Setup in Progress';
        add_header Content-Type text/plain;
    }
}
EOF

echo "Step 3: Testing nginx configuration..."
if sudo nginx -t; then
    echo "✅ Nginx config is valid"
    sudo systemctl reload nginx
    echo "✅ Nginx reloaded"
else
    echo "❌ Nginx config is invalid"
    exit 1
fi

echo "Step 4: Testing challenge file accessibility..."
TEST_FILE="test-$(date +%s)"
echo "test-challenge-content" | sudo tee $WEBROOT/.well-known/acme-challenge/$TEST_FILE > /dev/null

echo "Testing local access..."
if curl -f "http://localhost/.well-known/acme-challenge/$TEST_FILE"; then
    echo "✅ Local challenge file access works"
else
    echo "❌ Local challenge file access failed"
fi

echo ""
echo "Testing external access..."
if curl -f "http://$DOMAIN/.well-known/acme-challenge/$TEST_FILE"; then
    echo "✅ External challenge file access works"
    
    # Clean up test file
    sudo rm $WEBROOT/.well-known/acme-challenge/$TEST_FILE
    
    echo ""
    echo "Step 5: Acquiring STAGING certificate..."
    if sudo certbot certonly \
        --webroot \
        --webroot-path=$WEBROOT \
        --email $EMAIL \
        --agree-tos \
        --no-eff-email \
        --staging \
        --non-interactive \
        -d $DOMAIN \
        -d $WWW_DOMAIN; then
        
        echo "✅ STAGING certificate acquired successfully!"
        echo ""
        
        echo "Step 6: Acquiring REAL certificate..."
        if sudo certbot certonly \
            --webroot \
            --webroot-path=$WEBROOT \
            --email $EMAIL \
            --agree-tos \
            --no-eff-email \
            --non-interactive \
            --force-renewal \
            -d $DOMAIN \
            -d $WWW_DOMAIN; then
            
            echo "🎉 SUCCESS! Real certificate acquired!"
            echo ""
            echo "Certificate files:"
            ls -la /etc/letsencrypt/live/$DOMAIN/ 2>/dev/null || echo "Certificate directory not found"
            
            echo ""
            echo "Step 7: Configuring nginx with SSL..."
            sudo tee /etc/nginx/sites-available/default > /dev/null << 'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name hvac35242.com www.hvac35242.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name hvac35242.com www.hvac35242.com;
    
    ssl_certificate /etc/letsencrypt/live/hvac35242.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/hvac35242.com/privkey.pem;
    
    # Modern SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    
    root /var/www/html;
    index index.html index.htm;
    
    location / {
        return 200 'SSL Certificate Installed Successfully!';
        add_header Content-Type text/plain;
    }
}
EOF
            
            if sudo nginx -t; then
                sudo systemctl reload nginx
                echo "✅ SSL configuration applied!"
                echo ""
                echo "Test your SSL setup:"
                echo "https://$DOMAIN"
                echo "https://$WWW_DOMAIN"
            else
                echo "❌ SSL configuration failed"
            fi
            
        else
            echo "❌ FAILED: Could not acquire real certificate"
            echo "But staging worked, so setup is correct. May have hit rate limits."
        fi
        
    else
        echo "❌ FAILED: Could not acquire staging certificate"
    fi
    
else
    echo "❌ External challenge file access failed"
    echo ""
    echo "Debug information:"
    echo "Server IP: $(curl -s ifconfig.me 2>/dev/null || echo 'Unknown')"
    echo "Domain resolves to: $(dig +short $DOMAIN)"
    echo ""
    echo "Possible issues:"
    echo "1. Domain DNS not pointing to this server"
    echo "2. Firewall blocking port 80"
    echo "3. nginx not serving files correctly"
    
    # Clean up test file
    sudo rm $WEBROOT/.well-known/acme-challenge/$TEST_FILE 2>/dev/null || true
fi

echo ""
echo "Current nginx status:"
sudo systemctl status nginx --no-pager -l