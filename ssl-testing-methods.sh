#!/bin/bash

# SSL WORKER AGENT 2 - ALTERNATIVE SSL CERTIFICATE TESTING METHODS
# Testing different SSL certificate acquisition methods to find one that works
# Domain: hvac35242.com
# Server: 142.93.194.81

set -e

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DOMAIN="hvac35242.com"
WWW_DOMAIN="www.hvac35242.com"
EMAIL="admin@hvac35242.com"  # Change this to your email
WEBROOT="/var/www/html"
NGINX_CONF="/etc/nginx/sites-available/default"

# Function to print colored output
print_status() {
    echo -e "${BLUE}[SSL-TEST]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Function to check if domain points to this server
check_domain_dns() {
    print_status "Checking DNS resolution for $DOMAIN..."
    
    DOMAIN_IP=$(dig +short $DOMAIN)
    SERVER_IP=$(curl -s ifconfig.me)
    
    echo "Domain $DOMAIN resolves to: $DOMAIN_IP"
    echo "Server public IP: $SERVER_IP"
    
    if [ "$DOMAIN_IP" = "$SERVER_IP" ]; then
        print_success "DNS is correctly pointing to this server"
        return 0
    else
        print_error "DNS mismatch! Domain points to $DOMAIN_IP but server is $SERVER_IP"
        return 1
    fi
}

# Function to install certbot if not installed
install_certbot() {
    if ! command -v certbot &> /dev/null; then
        print_status "Installing certbot..."
        sudo apt update
        sudo apt install -y certbot python3-certbot-nginx
        print_success "Certbot installed"
    else
        print_status "Certbot already installed"
    fi
}

# Method 1: Certbot Standalone (bypass nginx entirely)
test_certbot_standalone() {
    print_status "=== TESTING METHOD 1: CERTBOT STANDALONE ==="
    
    # Stop nginx temporarily
    print_status "Stopping nginx to free ports 80/443..."
    sudo systemctl stop nginx 2>/dev/null || print_warning "Nginx not running"
    
    # Kill any processes on port 80/443
    sudo fuser -k 80/tcp 2>/dev/null || true
    sudo fuser -k 443/tcp 2>/dev/null || true
    
    # Wait a moment
    sleep 3
    
    # Test with staging first to avoid rate limits
    print_status "Testing with staging certificates first..."
    
    if sudo certbot certonly \
        --standalone \
        --email $EMAIL \
        --agree-tos \
        --no-eff-email \
        --staging \
        --non-interactive \
        -d $DOMAIN \
        -d $WWW_DOMAIN; then
        
        print_success "Staging certificate acquired successfully!"
        
        # Now try real certificate
        print_status "Acquiring real certificate..."
        if sudo certbot certonly \
            --standalone \
            --email $EMAIL \
            --agree-tos \
            --no-eff-email \
            --non-interactive \
            --force-renewal \
            -d $DOMAIN \
            -d $WWW_DOMAIN; then
            
            print_success "METHOD 1 SUCCESS: Real certificate acquired!"
            
            # Restart nginx
            sudo systemctl start nginx
            
            return 0
        else
            print_error "Real certificate failed"
        fi
    else
        print_error "METHOD 1 FAILED: Staging certificate failed"
    fi
    
    # Restart nginx even if failed
    sudo systemctl start nginx 2>/dev/null || true
    return 1
}

# Method 2: Certbot Webroot with manual file placement
test_certbot_webroot() {
    print_status "=== TESTING METHOD 2: CERTBOT WEBROOT ==="
    
    # Ensure nginx is running
    sudo systemctl start nginx
    
    # Create webroot directory
    sudo mkdir -p $WEBROOT/.well-known/acme-challenge
    sudo chown -R www-data:www-data $WEBROOT/.well-known
    sudo chmod -R 755 $WEBROOT/.well-known
    
    # Create test challenge file
    TEST_FILE="test-$(date +%s)"
    echo "test-content" | sudo tee $WEBROOT/.well-known/acme-challenge/$TEST_FILE > /dev/null
    
    print_status "Testing challenge file accessibility..."
    if curl -f http://$DOMAIN/.well-known/acme-challenge/$TEST_FILE; then
        print_success "Challenge files are accessible"
        
        # Remove test file
        sudo rm $WEBROOT/.well-known/acme-challenge/$TEST_FILE
        
        # Try webroot method with staging
        print_status "Testing webroot method with staging..."
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
            
            print_success "Staging webroot certificate acquired!"
            
            # Try real certificate
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
                
                print_success "METHOD 2 SUCCESS: Real webroot certificate acquired!"
                return 0
            fi
        fi
    else
        print_error "Challenge files not accessible via HTTP"
    fi
    
    print_error "METHOD 2 FAILED: Webroot method failed"
    return 1
}

# Method 3: DNS validation (manual)
test_dns_validation() {
    print_status "=== TESTING METHOD 3: DNS VALIDATION ==="
    
    print_status "Attempting DNS validation (manual)..."
    
    # This will require manual intervention
    if sudo certbot certonly \
        --manual \
        --preferred-challenges=dns \
        --email $EMAIL \
        --agree-tos \
        --no-eff-email \
        --staging \
        -d $DOMAIN \
        -d $WWW_DOMAIN; then
        
        print_success "METHOD 3 SUCCESS: DNS validation worked!"
        return 0
    else
        print_error "METHOD 3 FAILED: DNS validation failed"
        return 1
    fi
}

# Method 4: Test with different challenge ports
test_alternative_ports() {
    print_status "=== TESTING METHOD 4: ALTERNATIVE PORTS ==="
    
    # Stop nginx
    sudo systemctl stop nginx 2>/dev/null || true
    
    # Try standalone on different port
    if sudo certbot certonly \
        --standalone \
        --http-01-port 8080 \
        --email $EMAIL \
        --agree-tos \
        --no-eff-email \
        --staging \
        --non-interactive \
        -d $DOMAIN; then
        
        print_success "METHOD 4 SUCCESS: Alternative port worked!"
        sudo systemctl start nginx
        return 0
    else
        print_error "METHOD 4 FAILED: Alternative port failed"
        sudo systemctl start nginx
        return 1
    fi
}

# Method 5: Create minimal nginx config for ACME challenge
create_minimal_nginx_config() {
    print_status "=== TESTING METHOD 5: MINIMAL NGINX CONFIG ==="
    
    # Backup existing config
    sudo cp $NGINX_CONF $NGINX_CONF.backup 2>/dev/null || true
    
    # Create minimal config focused on ACME challenges
    sudo tee $NGINX_CONF > /dev/null << EOF
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    
    server_name $DOMAIN $WWW_DOMAIN;
    
    root $WEBROOT;
    index index.html index.htm;
    
    # ACME challenge location
    location /.well-known/acme-challenge/ {
        root $WEBROOT;
        try_files \$uri =404;
    }
    
    # Temporary basic page
    location / {
        return 200 'SSL Setup in Progress';
        add_header Content-Type text/plain;
    }
}
EOF
    
    # Test nginx config
    if sudo nginx -t; then
        print_status "Nginx config is valid, reloading..."
        sudo systemctl reload nginx
        
        # Now try webroot method
        if test_certbot_webroot; then
            print_success "METHOD 5 SUCCESS: Minimal nginx config worked!"
            return 0
        fi
    else
        print_error "Invalid nginx config"
        # Restore backup
        sudo cp $NGINX_CONF.backup $NGINX_CONF 2>/dev/null || true
        sudo systemctl reload nginx 2>/dev/null || true
    fi
    
    print_error "METHOD 5 FAILED: Minimal nginx config didn't work"
    return 1
}

# Method 6: Test with Cloudflare API (if available)
test_cloudflare_dns() {
    print_status "=== TESTING METHOD 6: CLOUDFLARE DNS API ==="
    
    if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
        print_warning "CLOUDFLARE_API_TOKEN not set, skipping this method"
        print_status "To use this method, set: export CLOUDFLARE_API_TOKEN='your_token'"
        return 1
    fi
    
    # Install cloudflare plugin
    sudo apt install -y python3-certbot-dns-cloudflare
    
    # Create credentials file
    sudo tee /etc/letsencrypt/cloudflare.ini > /dev/null << EOF
dns_cloudflare_api_token = $CLOUDFLARE_API_TOKEN
EOF
    
    sudo chmod 600 /etc/letsencrypt/cloudflare.ini
    
    if sudo certbot certonly \
        --dns-cloudflare \
        --dns-cloudflare-credentials /etc/letsencrypt/cloudflare.ini \
        --email $EMAIL \
        --agree-tos \
        --no-eff-email \
        --staging \
        -d $DOMAIN \
        -d $WWW_DOMAIN; then
        
        print_success "METHOD 6 SUCCESS: Cloudflare DNS API worked!"
        return 0
    else
        print_error "METHOD 6 FAILED: Cloudflare DNS API failed"
        return 1
    fi
}

# Function to configure nginx with SSL after certificate is obtained
configure_nginx_ssl() {
    print_status "Configuring nginx with SSL..."
    
    sudo tee $NGINX_CONF > /dev/null << EOF
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN $WWW_DOMAIN;
    return 301 https://\$server_name\$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name $DOMAIN $WWW_DOMAIN;
    
    ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;
    
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    
    root $WEBROOT;
    index index.html index.htm;
    
    location / {
        try_files \$uri \$uri/ =404;
    }
}
EOF
    
    if sudo nginx -t; then
        sudo systemctl reload nginx
        print_success "Nginx SSL configuration applied"
    else
        print_error "Invalid nginx SSL configuration"
        return 1
    fi
}

# Main testing function
main() {
    echo "================================================"
    echo "SSL CERTIFICATE TESTING - WORKER AGENT 2"
    echo "================================================"
    echo "Domain: $DOMAIN"
    echo "Server: $(curl -s ifconfig.me 2>/dev/null || echo 'Unknown')"
    echo "================================================"
    echo ""
    
    # Check prerequisites
    install_certbot
    
    # Check DNS
    if ! check_domain_dns; then
        print_error "DNS not configured correctly. Please fix DNS first."
        exit 1
    fi
    
    # Test methods in order
    METHODS=(
        "test_certbot_standalone"
        "create_minimal_nginx_config"
        "test_certbot_webroot"
        "test_alternative_ports"
        "test_cloudflare_dns"
    )
    
    for method in "${METHODS[@]}"; do
        echo ""
        print_status "Trying method: $method"
        
        if $method; then
            print_success "SUCCESS! Method $method worked!"
            
            # Configure nginx with SSL
            if configure_nginx_ssl; then
                print_success "SSL setup complete!"
                echo ""
                echo "Test your SSL certificate:"
                echo "https://$DOMAIN"
                echo "https://$WWW_DOMAIN"
                echo ""
                echo "Check SSL rating:"
                echo "https://www.ssllabs.com/ssltest/analyze.html?d=$DOMAIN"
            fi
            
            exit 0
        else
            print_warning "Method $method failed, trying next method..."
        fi
    done
    
    print_error "All methods failed. Manual intervention required."
    echo ""
    echo "Debugging steps:"
    echo "1. Check if domain DNS is pointing to this server"
    echo "2. Ensure ports 80/443 are open in firewall"
    echo "3. Check if other services are using these ports"
    echo "4. Consider using DNS validation instead of HTTP"
    
    exit 1
}

# Run if executed directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi