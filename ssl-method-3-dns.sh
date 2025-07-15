#!/bin/bash

# SSL WORKER AGENT 2 - METHOD 3: DNS VALIDATION TEST
# This method uses DNS TXT records instead of HTTP validation

set -e

DOMAIN="hvac35242.com"
WWW_DOMAIN="www.hvac35242.com"
EMAIL="admin@hvac35242.com"  # Change this to your actual email

echo "🔒 SSL METHOD 3: DNS VALIDATION"
echo "=============================="
echo "Domain: $DOMAIN"
echo "Testing DNS validation method..."
echo ""

# Install certbot if needed
if ! command -v certbot &> /dev/null; then
    echo "Installing certbot..."
    sudo apt update
    sudo apt install -y certbot
fi

echo "Step 1: Testing DNS validation with manual method..."
echo "⚠️  WARNING: This method requires manual DNS record creation"
echo ""

# First try with staging to see if it works
echo "Attempting DNS validation (staging)..."
echo "You will need to create DNS TXT records when prompted."
echo ""

if sudo certbot certonly \
    --manual \
    --preferred-challenges=dns \
    --email $EMAIL \
    --agree-tos \
    --no-eff-email \
    --staging \
    --manual-public-ip-logging-ok \
    -d $DOMAIN \
    -d $WWW_DOMAIN; then
    
    echo "✅ DNS validation staging certificate acquired!"
    echo ""
    
    echo "Step 2: Acquiring real certificate..."
    if sudo certbot certonly \
        --manual \
        --preferred-challenges=dns \
        --email $EMAIL \
        --agree-tos \
        --no-eff-email \
        --manual-public-ip-logging-ok \
        --force-renewal \
        -d $DOMAIN \
        -d $WWW_DOMAIN; then
        
        echo "🎉 SUCCESS! Real DNS-validated certificate acquired!"
        echo ""
        echo "Certificate files:"
        ls -la /etc/letsencrypt/live/$DOMAIN/ 2>/dev/null || echo "Certificate directory not found"
        
    else
        echo "❌ Real certificate failed, but staging worked"
    fi
    
else
    echo "❌ DNS validation failed"
    echo ""
    echo "This could be because:"
    echo "1. DNS records weren't created correctly"
    echo "2. DNS propagation hasn't completed (wait 5-10 minutes)"
    echo "3. DNS provider doesn't support TXT records"
fi

echo ""
echo "Step 3: Testing automated DNS with Cloudflare (if API token available)..."

if [ -n "$CLOUDFLARE_API_TOKEN" ]; then
    echo "Cloudflare API token found, installing DNS plugin..."
    
    # Install cloudflare plugin
    sudo apt install -y python3-certbot-dns-cloudflare
    
    # Create credentials file
    sudo tee /etc/letsencrypt/cloudflare.ini > /dev/null << EOF
dns_cloudflare_api_token = $CLOUDFLARE_API_TOKEN
EOF
    
    sudo chmod 600 /etc/letsencrypt/cloudflare.ini
    
    echo "Attempting automated Cloudflare DNS validation..."
    if sudo certbot certonly \
        --dns-cloudflare \
        --dns-cloudflare-credentials /etc/letsencrypt/cloudflare.ini \
        --email $EMAIL \
        --agree-tos \
        --no-eff-email \
        --staging \
        -d $DOMAIN \
        -d $WWW_DOMAIN; then
        
        echo "✅ Cloudflare DNS validation works!"
        
        # Try real certificate
        if sudo certbot certonly \
            --dns-cloudflare \
            --dns-cloudflare-credentials /etc/letsencrypt/cloudflare.ini \
            --email $EMAIL \
            --agree-tos \
            --no-eff-email \
            --force-renewal \
            -d $DOMAIN \
            -d $WWW_DOMAIN; then
            
            echo "🎉 SUCCESS! Cloudflare DNS certificate acquired!"
        fi
    fi
    
else
    echo "No CLOUDFLARE_API_TOKEN environment variable found."
    echo ""
    echo "To use automated Cloudflare DNS validation:"
    echo "1. Get API token from Cloudflare dashboard"
    echo "2. Export CLOUDFLARE_API_TOKEN='your_token'"
    echo "3. Run this script again"
fi

echo ""
echo "Step 4: Alternative DNS providers..."
echo ""
echo "If Cloudflare doesn't work, try these DNS plugins:"
echo "- Route53 (AWS): python3-certbot-dns-route53"
echo "- Google Cloud DNS: python3-certbot-dns-google"
echo "- DigitalOcean DNS: python3-certbot-dns-digitalocean"
echo ""
echo "Each requires API credentials and specific setup."

echo ""
echo "DNS Method Summary:"
echo "✓ Manual DNS validation requires creating TXT records yourself"
echo "✓ Automated DNS validation requires API access to your DNS provider"
echo "✓ DNS validation bypasses HTTP/web server requirements entirely"
echo "✓ Works even if ports 80/443 are blocked or in use"