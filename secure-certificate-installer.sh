#!/bin/bash

# ========================================
# SECURE CERTIFICATE INSTALLER
# Handles Sectigo wildcard certificate installation
# ========================================

set -e

# Configuration
SERVER_IP="142.93.194.81"
SERVER_USER="root"
DOMAIN="hvac35242.com"

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

# Security validation
validate_files() {
    local cert_file="$1"
    local key_file="$2"
    local bundle_file="$3"
    
    print_header "VALIDATING CERTIFICATE FILES"
    
    # Check if files exist
    if [[ ! -f "$cert_file" ]]; then
        echo -e "${RED}❌ Certificate file not found: $cert_file${NC}"
        return 1
    fi
    
    if [[ ! -f "$key_file" ]]; then
        echo -e "${RED}❌ Private key file not found: $key_file${NC}"
        return 1
    fi
    
    if [[ ! -f "$bundle_file" ]]; then
        echo -e "${RED}❌ CA bundle file not found: $bundle_file${NC}"
        return 1
    fi
    
    # Validate certificate format
    if ! openssl x509 -in "$cert_file" -text -noout &>/dev/null; then
        echo -e "${RED}❌ Invalid certificate format${NC}"
        return 1
    fi
    
    # Validate private key format
    if ! openssl rsa -in "$key_file" -check &>/dev/null; then
        echo -e "${RED}❌ Invalid private key format${NC}"
        return 1
    fi
    
    # Check if certificate and key match
    cert_hash=$(openssl x509 -noout -modulus -in "$cert_file" | openssl md5)
    key_hash=$(openssl rsa -noout -modulus -in "$key_file" | openssl md5)
    
    if [[ "$cert_hash" != "$key_hash" ]]; then
        echo -e "${RED}❌ Certificate and private key do not match${NC}"
        return 1
    fi
    
    echo -e "${GREEN}✅ All certificate files are valid and match${NC}"
    return 0
}

# Secure file upload
upload_certificates() {
    local cert_file="$1"
    local key_file="$2"
    local bundle_file="$3"
    
    print_header "UPLOADING CERTIFICATES SECURELY"
    
    # Create temporary secure directory on server
    ssh root@$SERVER_IP "mkdir -p /tmp/ssl-install && chmod 700 /tmp/ssl-install"
    
    # Upload files with secure permissions
    echo -e "${BLUE}Uploading certificate file...${NC}"
    scp "$cert_file" root@$SERVER_IP:/tmp/ssl-install/hvac35242.com.crt
    
    echo -e "${BLUE}Uploading private key (secure)...${NC}"
    scp "$key_file" root@$SERVER_IP:/tmp/ssl-install/hvac35242.com.key
    
    echo -e "${BLUE}Uploading CA bundle...${NC}"
    scp "$bundle_file" root@$SERVER_IP:/tmp/ssl-install/hvac35242.com.ca-bundle
    
    # Set secure permissions on server
    ssh root@$SERVER_IP "chmod 644 /tmp/ssl-install/hvac35242.com.crt"
    ssh root@$SERVER_IP "chmod 600 /tmp/ssl-install/hvac35242.com.key"
    ssh root@$SERVER_IP "chmod 644 /tmp/ssl-install/hvac35242.com.ca-bundle"
    
    echo -e "${GREEN}✅ Certificates uploaded securely${NC}"
}

# Deploy SSL configuration
deploy_ssl_config() {
    print_header "DEPLOYING SSL CONFIGURATION"
    
    # Upload our enhanced nginx configuration
    scp nginx-ssl-config/nginx.conf root@$SERVER_IP:/etc/nginx/nginx.conf
    scp nginx-ssl-config/hvac35242.conf root@$SERVER_IP:/etc/nginx/sites-available/hvac35242.com
    
    # Install certificates to proper locations
    ssh root@$SERVER_IP << 'EOF'
        # Create SSL directories
        mkdir -p /etc/ssl/certs /etc/ssl/private /etc/ssl/backup
        
        # Install certificates
        cp /tmp/ssl-install/hvac35242.com.crt /etc/ssl/certs/
        cp /tmp/ssl-install/hvac35242.com.key /etc/ssl/private/
        cp /tmp/ssl-install/hvac35242.com.ca-bundle /etc/ssl/certs/
        
        # Set proper permissions
        chmod 644 /etc/ssl/certs/hvac35242.com.crt
        chmod 600 /etc/ssl/private/hvac35242.com.key
        chmod 644 /etc/ssl/certs/hvac35242.com.ca-bundle
        chown root:root /etc/ssl/certs/hvac35242.com.crt
        chown root:root /etc/ssl/private/hvac35242.com.key
        chown root:root /etc/ssl/certs/hvac35242.com.ca-bundle
        
        # Enable site
        ln -sf /etc/nginx/sites-available/hvac35242.com /etc/nginx/sites-enabled/
        rm -f /etc/nginx/sites-enabled/default
        
        # Test configuration
        nginx -t
        
        # Clean up temporary files
        rm -rf /tmp/ssl-install
        
        # Restart nginx
        systemctl reload nginx
EOF
    
    echo -e "${GREEN}✅ SSL configuration deployed${NC}"
}

# Test SSL installation
test_ssl() {
    print_header "TESTING SSL INSTALLATION"
    
    echo -e "${BLUE}Testing HTTPS connection...${NC}"
    if curl -I https://$DOMAIN &>/dev/null; then
        echo -e "${GREEN}✅ HTTPS connection successful${NC}"
    else
        echo -e "${RED}❌ HTTPS connection failed${NC}"
        return 1
    fi
    
    echo -e "${BLUE}Testing certificate validity...${NC}"
    cert_info=$(echo | openssl s_client -connect $DOMAIN:443 -servername $DOMAIN 2>/dev/null | openssl x509 -noout -dates)
    echo "$cert_info"
    
    echo -e "${GREEN}✅ SSL installation completed successfully${NC}"
}

# Main installation function
install_certificate() {
    if [[ $# -ne 3 ]]; then
        echo "Usage: $0 <certificate.crt> <private.key> <ca-bundle.pem>"
        echo ""
        echo "Example:"
        echo "  $0 hvac35242.com.crt hvac35242.com.key hvac35242.com.ca-bundle"
        exit 1
    fi
    
    local cert_file="$1"
    local key_file="$2"
    local bundle_file="$3"
    
    print_header "SECURE SSL CERTIFICATE INSTALLATION"
    echo -e "${YELLOW}Domain: $DOMAIN${NC}"
    echo -e "${YELLOW}Server: $SERVER_IP${NC}"
    
    # Validate files
    if ! validate_files "$cert_file" "$key_file" "$bundle_file"; then
        echo -e "${RED}❌ File validation failed${NC}"
        exit 1
    fi
    
    # Upload certificates
    upload_certificates "$cert_file" "$key_file" "$bundle_file"
    
    # Deploy configuration
    deploy_ssl_config
    
    # Test installation
    test_ssl
    
    print_header "INSTALLATION COMPLETE"
    echo -e "${GREEN}🎉 SSL certificate successfully installed!${NC}"
    echo -e "${GREEN}Your website is now secured with HTTPS${NC}"
    echo ""
    echo -e "${BLUE}Test your site:${NC}"
    echo -e "  https://$DOMAIN"
    echo -e "  https://www.$DOMAIN"
    echo ""
    echo -e "${BLUE}Check SSL rating:${NC}"
    echo -e "  https://www.ssllabs.com/ssltest/analyze.html?d=$DOMAIN"
}

# Run installation if called directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    install_certificate "$@"
fi