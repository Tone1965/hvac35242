#!/bin/bash

# SSL WORKER AGENT 2 - METHOD 1: CERTBOT STANDALONE TEST
# This method bypasses nginx entirely by stopping it and using certbot's built-in web server

set -e

DOMAIN="hvac35242.com"
WWW_DOMAIN="www.hvac35242.com"
EMAIL="admin@hvac35242.com"  # Change this to your actual email

echo "🔒 SSL METHOD 1: CERTBOT STANDALONE"
echo "=================================="
echo "Domain: $DOMAIN"
echo "Testing standalone method..."
echo ""

# Function to check what's using ports
check_ports() {
    echo "Checking what's using port 80:"
    sudo lsof -i :80 || echo "Port 80 is free"
    echo ""
    echo "Checking what's using port 443:"
    sudo lsof -i :443 || echo "Port 443 is free"
    echo ""
}

# Install certbot if needed
if ! command -v certbot &> /dev/null; then
    echo "Installing certbot..."
    sudo apt update
    sudo apt install -y certbot
fi

echo "Step 1: Checking current port usage..."
check_ports

echo "Step 2: Stopping nginx and freeing ports..."
sudo systemctl stop nginx 2>/dev/null || echo "Nginx not running"
sudo systemctl stop apache2 2>/dev/null || echo "Apache not running"

# Kill any processes on these ports
sudo fuser -k 80/tcp 2>/dev/null || true
sudo fuser -k 443/tcp 2>/dev/null || true

# Wait for ports to be freed
sleep 5

echo "Step 3: Verifying ports are free..."
check_ports

echo "Step 4: Testing with STAGING certificate first (to avoid rate limits)..."
if sudo certbot certonly \
    --standalone \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    --staging \
    --non-interactive \
    -d $DOMAIN \
    -d $WWW_DOMAIN; then
    
    echo "✅ STAGING certificate acquired successfully!"
    echo ""
    
    echo "Step 5: Acquiring REAL certificate..."
    if sudo certbot certonly \
        --standalone \
        --email $EMAIL \
        --agree-tos \
        --no-eff-email \
        --non-interactive \
        --force-renewal \
        -d $DOMAIN \
        -d $WWW_DOMAIN; then
        
        echo "🎉 SUCCESS! Real certificate acquired!"
        echo ""
        echo "Certificate files are located at:"
        echo "/etc/letsencrypt/live/$DOMAIN/"
        echo ""
        echo "Files:"
        ls -la /etc/letsencrypt/live/$DOMAIN/ 2>/dev/null || echo "Certificate directory not found"
        
    else
        echo "❌ FAILED: Could not acquire real certificate"
        echo "But staging worked, so the setup is correct."
        echo "You may have hit rate limits. Wait 1 hour and try again."
    fi
    
else
    echo "❌ FAILED: Could not acquire even staging certificate"
    echo ""
    echo "Possible issues:"
    echo "1. Domain DNS not pointing to this server"
    echo "2. Firewall blocking ports 80/443"
    echo "3. Domain validation failed"
    echo ""
    echo "Debug information:"
    echo "Server IP: $(curl -s ifconfig.me 2>/dev/null || echo 'Unknown')"
    echo "Domain resolves to: $(dig +short $DOMAIN)"
fi

echo ""
echo "Step 6: Restarting nginx..."
sudo systemctl start nginx 2>/dev/null || echo "Could not start nginx"

echo ""
echo "Final port check:"
check_ports