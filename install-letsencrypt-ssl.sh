#!/bin/bash

# ========================================
# AUTOMATED LET'S ENCRYPT SSL INSTALLATION
# For hvac35242.com with A+ Security Rating
# ========================================

set -e

# Configuration
SERVER_IP="142.93.194.81"
DOMAIN="hvac35242.com"
WWW_DOMAIN="www.hvac35242.com"
EMAIL="admin@hvac35242.com"  # Change this to your email

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_header() {
    echo -e "\n${BLUE}========================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}========================================${NC}"
}

# Deploy base SSL configuration
deploy_base_config() {
    print_header "DEPLOYING BASE SSL CONFIGURATION"
    
    # Upload our enhanced nginx configuration
    scp nginx-ssl-config/nginx.conf root@$SERVER_IP:/etc/nginx/nginx.conf
    
    # Create basic site configuration for Let's Encrypt
    cat > temp-basic-site.conf << EOF
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN $WWW_DOMAIN;
    
    # Allow Let's Encrypt challenges
    location /.well-known/acme-challenge/ {
        root /var/www/html;
        allow all;
    }
    
    # Redirect everything else to HTTPS (will be enabled after cert install)
    location / {
        return 301 https://\$server_name\$request_uri;
    }
}
EOF
    
    scp temp-basic-site.conf root@$SERVER_IP:/etc/nginx/sites-available/hvac35242.com
    rm temp-basic-site.conf
    
    # Enable site and test
    ssh root@$SERVER_IP << 'EOF'
        ln -sf /etc/nginx/sites-available/hvac35242.com /etc/nginx/sites-enabled/
        rm -f /etc/nginx/sites-enabled/default
        nginx -t && systemctl reload nginx
EOF
    
    echo -e "${GREEN}✅ Base configuration deployed${NC}"
}

# Install Let's Encrypt certificate
install_letsencrypt() {
    print_header "INSTALLING LET'S ENCRYPT SSL CERTIFICATE"
    
    ssh root@$SERVER_IP << EOF
        # Install certbot
        apt update
        apt install -y certbot python3-certbot-nginx
        
        # Stop nginx temporarily for standalone mode
        systemctl stop nginx
        
        # Get certificate using standalone mode
        certbot certonly --standalone \
            --non-interactive \
            --agree-tos \
            --email $EMAIL \
            -d $DOMAIN \
            -d $WWW_DOMAIN
        
        # Start nginx back up
        systemctl start nginx
EOF
    
    echo -e "${GREEN}✅ Let's Encrypt certificate installed${NC}"
}

# Deploy enhanced SSL configuration
deploy_enhanced_ssl() {
    print_header "DEPLOYING ENHANCED SSL CONFIGURATION"
    
    # Create enhanced SSL site configuration
    cat > temp-ssl-site.conf << 'EOF'
# Enhanced SSL Configuration for hvac35242.com
# Optimized for A+ SSL Labs rating

server {
    listen 80;
    listen [::]:80;
    server_name hvac35242.com www.hvac35242.com;
    
    # Allow Let's Encrypt challenges
    location /.well-known/acme-challenge/ {
        root /var/www/html;
        allow all;
    }
    
    # Redirect to HTTPS
    location / {
        return 301 https://$server_name$request_uri;
    }
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name hvac35242.com www.hvac35242.com;
    
    # SSL Certificate Configuration
    ssl_certificate /etc/letsencrypt/live/hvac35242.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/hvac35242.com/privkey.pem;
    
    # SSL Security Configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 1d;
    ssl_session_tickets off;
    
    # OCSP Stapling
    ssl_stapling on;
    ssl_stapling_verify on;
    ssl_trusted_certificate /etc/letsencrypt/live/hvac35242.com/chain.pem;
    resolver 8.8.8.8 8.8.4.4 valid=300s;
    resolver_timeout 5s;
    
    # Security Headers
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none';" always;
    
    # Root and index
    root /var/www/html;
    index index.html index.htm;
    
    # Main location
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Security - Hide sensitive files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
    
    # Let's Encrypt challenges
    location /.well-known/acme-challenge/ {
        root /var/www/html;
        allow all;
    }
}
EOF
    
    scp temp-ssl-site.conf root@$SERVER_IP:/etc/nginx/sites-available/hvac35242.com
    rm temp-ssl-site.conf
    
    # Test and reload
    ssh root@$SERVER_IP << 'EOF'
        nginx -t && systemctl reload nginx
EOF
    
    echo -e "${GREEN}✅ Enhanced SSL configuration deployed${NC}"
}

# Test SSL installation
test_ssl_installation() {
    print_header "TESTING SSL INSTALLATION"
    
    echo -e "${BLUE}Testing HTTPS connection...${NC}"
    sleep 5  # Wait for nginx to fully reload
    
    if curl -I https://$DOMAIN &>/dev/null; then
        echo -e "${GREEN}✅ HTTPS connection successful${NC}"
    else
        echo -e "${RED}❌ HTTPS connection failed${NC}"
        return 1
    fi
    
    echo -e "${BLUE}Testing WWW redirect...${NC}"
    if curl -I https://$WWW_DOMAIN &>/dev/null; then
        echo -e "${GREEN}✅ WWW HTTPS connection successful${NC}"
    else
        echo -e "${YELLOW}⚠ WWW HTTPS connection issue${NC}"
    fi
    
    echo -e "${BLUE}Testing HTTP to HTTPS redirect...${NC}"
    redirect_test=$(curl -I http://$DOMAIN 2>/dev/null | grep -i "location.*https" || echo "")
    if [[ ! -z "$redirect_test" ]]; then
        echo -e "${GREEN}✅ HTTP to HTTPS redirect working${NC}"
    else
        echo -e "${YELLOW}⚠ HTTP redirect may not be working${NC}"
    fi
}

# Setup automatic renewal
setup_auto_renewal() {
    print_header "SETTING UP AUTOMATIC RENEWAL"
    
    ssh root@$SERVER_IP << 'EOF'
        # Test renewal
        certbot renew --dry-run
        
        # Add cron job for automatic renewal
        echo "0 12 * * * /usr/bin/certbot renew --quiet && /usr/bin/systemctl reload nginx" > /etc/cron.d/certbot-renew
        
        # Set permissions
        chmod 644 /etc/cron.d/certbot-renew
EOF
    
    echo -e "${GREEN}✅ Automatic renewal configured${NC}"
}

# Main installation
main() {
    print_header "LET'S ENCRYPT SSL INSTALLATION"
    echo -e "${YELLOW}Domain: $DOMAIN${NC}"
    echo -e "${YELLOW}WWW Domain: $WWW_DOMAIN${NC}"
    echo -e "${YELLOW}Server: $SERVER_IP${NC}"
    
    deploy_base_config
    install_letsencrypt
    deploy_enhanced_ssl
    test_ssl_installation
    setup_auto_renewal
    
    print_header "SSL INSTALLATION COMPLETE"
    echo -e "${GREEN}🎉 Let's Encrypt SSL successfully installed!${NC}"
    echo -e "${GREEN}Your website is now secured with HTTPS${NC}"
    echo ""
    echo -e "${BLUE}Test your site:${NC}"
    echo -e "  https://$DOMAIN"
    echo -e "  https://$WWW_DOMAIN"
    echo ""
    echo -e "${BLUE}Check SSL rating:${NC}"
    echo -e "  https://www.ssllabs.com/ssltest/analyze.html?d=$DOMAIN"
    echo ""
    echo -e "${GREEN}Certificate will auto-renew every 90 days!${NC}"
}

# Run installation
main "$@"