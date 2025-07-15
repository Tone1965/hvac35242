#!/bin/bash

# SSL WORKER AGENT 2 - METHOD 4: STAGING CERTIFICATE TESTING
# This method focuses on testing with staging certificates to avoid rate limits

set -e

DOMAIN="hvac35242.com"
WWW_DOMAIN="www.hvac35242.com"
EMAIL="admin@hvac35242.com"  # Change this to your actual email

echo "🔒 SSL METHOD 4: STAGING CERTIFICATE TESTING"
echo "==========================================="
echo "Domain: $DOMAIN"
echo "Testing various methods with staging certificates first..."
echo ""

# Install certbot if needed
if ! command -v certbot &> /dev/null; then
    echo "Installing certbot..."
    sudo apt update
    sudo apt install -y certbot python3-certbot-nginx
fi

# Function to test connectivity
test_connectivity() {
    echo "Testing connectivity to domain..."
    
    # Test DNS resolution
    DOMAIN_IP=$(dig +short $DOMAIN)
    SERVER_IP=$(curl -s ifconfig.me 2>/dev/null || echo "Unknown")
    
    echo "Domain $DOMAIN resolves to: $DOMAIN_IP"
    echo "Server public IP: $SERVER_IP"
    
    if [ "$DOMAIN_IP" = "$SERVER_IP" ]; then
        echo "✅ DNS correctly points to this server"
    else
        echo "❌ DNS mismatch - this may cause validation failures"
    fi
    
    # Test HTTP connectivity
    echo ""
    echo "Testing HTTP connectivity..."
    if curl -I "http://$DOMAIN" 2>/dev/null | head -1; then
        echo "✅ HTTP connection successful"
    else
        echo "❌ HTTP connection failed"
    fi
    
    echo ""
}

# Method 4a: Staging with standalone
test_staging_standalone() {
    echo "=== Testing Staging Standalone ==="
    
    # Stop nginx
    sudo systemctl stop nginx 2>/dev/null || true
    sleep 3
    
    if sudo certbot certonly \
        --standalone \
        --email $EMAIL \
        --agree-tos \
        --no-eff-email \
        --staging \
        --non-interactive \
        --dry-run \
        -d $DOMAIN; then
        
        echo "✅ Staging standalone DRY RUN successful!"
        
        # Try actual staging
        if sudo certbot certonly \
            --standalone \
            --email $EMAIL \
            --agree-tos \
            --no-eff-email \
            --staging \
            --non-interactive \
            -d $DOMAIN; then
            
            echo "✅ Staging standalone certificate acquired!"
            return 0
        fi
    fi
    
    echo "❌ Staging standalone failed"
    sudo systemctl start nginx 2>/dev/null || true
    return 1
}

# Method 4b: Staging with webroot
test_staging_webroot() {
    echo "=== Testing Staging Webroot ==="
    
    # Ensure nginx is running
    sudo systemctl start nginx 2>/dev/null || true
    
    # Set up webroot
    WEBROOT="/var/www/html"
    sudo mkdir -p $WEBROOT/.well-known/acme-challenge
    sudo chown -R www-data:www-data $WEBROOT/.well-known
    sudo chmod -R 755 $WEBROOT/.well-known
    
    # Create simple nginx config
    sudo tee /etc/nginx/sites-available/default > /dev/null << 'EOF'
server {
    listen 80 default_server;
    server_name _;
    root /var/www/html;
    
    location /.well-known/acme-challenge/ {
        root /var/www/html;
        try_files $uri =404;
    }
    
    location / {
        return 200 'Test page';
        add_header Content-Type text/plain;
    }
}
EOF
    
    sudo nginx -t && sudo systemctl reload nginx
    
    # Test challenge accessibility
    echo "test" | sudo tee $WEBROOT/.well-known/acme-challenge/test > /dev/null
    
    if curl -f "http://$DOMAIN/.well-known/acme-challenge/test" 2>/dev/null; then
        echo "✅ Challenge files are accessible"
        sudo rm $WEBROOT/.well-known/acme-challenge/test
        
        # Try dry run first
        if sudo certbot certonly \
            --webroot \
            --webroot-path=$WEBROOT \
            --email $EMAIL \
            --agree-tos \
            --no-eff-email \
            --staging \
            --non-interactive \
            --dry-run \
            -d $DOMAIN; then
            
            echo "✅ Staging webroot DRY RUN successful!"
            
            # Try actual staging
            if sudo certbot certonly \
                --webroot \
                --webroot-path=$WEBROOT \
                --email $EMAIL \
                --agree-tos \
                --no-eff-email \
                --staging \
                --non-interactive \
                -d $DOMAIN; then
                
                echo "✅ Staging webroot certificate acquired!"
                return 0
            fi
        fi
    else
        echo "❌ Challenge files not accessible"
    fi
    
    echo "❌ Staging webroot failed"
    return 1
}

# Method 4c: Staging with nginx plugin
test_staging_nginx() {
    echo "=== Testing Staging Nginx Plugin ==="
    
    sudo systemctl start nginx 2>/dev/null || true
    
    # Try dry run first
    if sudo certbot certonly \
        --nginx \
        --email $EMAIL \
        --agree-tos \
        --no-eff-email \
        --staging \
        --non-interactive \
        --dry-run \
        -d $DOMAIN; then
        
        echo "✅ Staging nginx plugin DRY RUN successful!"
        
        # Try actual staging
        if sudo certbot certonly \
            --nginx \
            --email $EMAIL \
            --agree-tos \
            --no-eff-email \
            --staging \
            --non-interactive \
            -d $DOMAIN; then
            
            echo "✅ Staging nginx plugin certificate acquired!"
            return 0
        fi
    fi
    
    echo "❌ Staging nginx plugin failed"
    return 1
}

# Test alternative certificate authorities
test_alternative_ca() {
    echo "=== Testing Alternative Certificate Authority ==="
    
    # Try ZeroSSL (alternative to Let's Encrypt)
    if sudo certbot register \
        --email $EMAIL \
        --agree-tos \
        --server https://acme.zerossl.com/v2/DV90; then
        
        echo "✅ Registered with ZeroSSL"
        
        if sudo certbot certonly \
            --standalone \
            --email $EMAIL \
            --agree-tos \
            --no-eff-email \
            --non-interactive \
            --server https://acme.zerossl.com/v2/DV90 \
            -d $DOMAIN; then
            
            echo "✅ ZeroSSL certificate acquired!"
            return 0
        fi
    fi
    
    echo "❌ Alternative CA failed"
    return 1
}

# Main function
main() {
    test_connectivity
    
    echo "Starting staging certificate tests..."
    echo ""
    
    # Test methods in order
    if test_staging_standalone; then
        echo "🎉 Staging standalone method works!"
        echo "You can now run the real certificate with:"
        echo "sudo certbot certonly --standalone --email $EMAIL --agree-tos --no-eff-email -d $DOMAIN"
        
    elif test_staging_webroot; then
        echo "🎉 Staging webroot method works!"
        echo "You can now run the real certificate with:"
        echo "sudo certbot certonly --webroot --webroot-path=/var/www/html --email $EMAIL --agree-tos --no-eff-email -d $DOMAIN"
        
    elif test_staging_nginx; then
        echo "🎉 Staging nginx plugin works!"
        echo "You can now run the real certificate with:"
        echo "sudo certbot --nginx --email $EMAIL --agree-tos --no-eff-email -d $DOMAIN"
        
    elif test_alternative_ca; then
        echo "🎉 Alternative CA works!"
        
    else
        echo "❌ All staging methods failed"
        echo ""
        echo "Troubleshooting checklist:"
        echo "1. ✓ Check DNS resolution"
        echo "2. ✓ Check firewall ports 80/443"
        echo "3. ✓ Check if domain is reachable externally"
        echo "4. ✓ Verify nginx configuration"
        echo "5. ✓ Check server logs for errors"
        
        echo ""
        echo "Debug commands:"
        echo "sudo certbot --help"
        echo "sudo nginx -t"
        echo "sudo systemctl status nginx"
        echo "curl -I http://$DOMAIN"
        echo "dig $DOMAIN"
    fi
}

# Run main function
main