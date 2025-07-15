#!/bin/bash

# SSL Security Setup Script for hvac35242.com
# Creates secure directory structure and sets proper permissions

set -e

DOMAIN="hvac35242.com"
SSL_DIR="/etc/ssl"
CERTS_DIR="${SSL_DIR}/certs"
PRIVATE_DIR="${SSL_DIR}/private"
NGINX_CONF_DIR="/etc/nginx"
NGINX_SITES_DIR="${NGINX_CONF_DIR}/sites-available"
NGINX_SITES_ENABLED_DIR="${NGINX_CONF_DIR}/sites-enabled"
WEBROOT_DIR="/var/www/certbot"

echo "🔒 SSL Security Setup for ${DOMAIN}"
echo "=================================="
echo ""

# Function to check if running as root
check_root() {
    if [[ $EUID -ne 0 ]]; then
        echo "❌ This script must be run as root (use sudo)"
        exit 1
    fi
}

# Function to create secure directories
create_directories() {
    echo "📁 Creating secure directory structure..."
    
    # Create SSL directories
    mkdir -p "${CERTS_DIR}"
    mkdir -p "${PRIVATE_DIR}"
    mkdir -p "${WEBROOT_DIR}"
    mkdir -p "${NGINX_CONF_DIR}/conf.d"
    mkdir -p "${NGINX_SITES_DIR}"
    mkdir -p "${NGINX_SITES_ENABLED_DIR}"
    mkdir -p "/var/log/nginx"
    
    echo "✅ Directories created"
}

# Function to set proper permissions
set_permissions() {
    echo "🔐 Setting secure permissions..."
    
    # SSL certificates directory (readable by all, but not writable)
    chmod 755 "${CERTS_DIR}"
    chown root:root "${CERTS_DIR}"
    
    # Private keys directory (only readable by root)
    chmod 700 "${PRIVATE_DIR}"
    chown root:root "${PRIVATE_DIR}"
    
    # Webroot for Let's Encrypt challenges
    chmod 755 "${WEBROOT_DIR}"
    chown www-data:www-data "${WEBROOT_DIR}"
    
    # Nginx configuration directories
    chmod 755 "${NGINX_CONF_DIR}"
    chmod 755 "${NGINX_SITES_DIR}"
    chmod 755 "${NGINX_SITES_ENABLED_DIR}"
    chown -R root:root "${NGINX_CONF_DIR}"
    
    echo "✅ Permissions set securely"
}

# Function to install nginx if not present
install_nginx() {
    if ! command -v nginx &> /dev/null; then
        echo "📦 Installing nginx..."
        apt update
        apt install -y nginx
        systemctl enable nginx
        echo "✅ Nginx installed"
    else
        echo "✅ Nginx already installed"
    fi
}

# Function to install certbot if not present
install_certbot() {
    if ! command -v certbot &> /dev/null; then
        echo "📦 Installing certbot..."
        apt update
        apt install -y certbot python3-certbot-nginx
        echo "✅ Certbot installed"
    else
        echo "✅ Certbot already installed"
    fi
}

# Function to backup existing nginx config
backup_nginx_config() {
    if [ -f "/etc/nginx/nginx.conf" ]; then
        echo "💾 Backing up existing nginx configuration..."
        cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.backup.$(date +%Y%m%d_%H%M%S)
        echo "✅ Backup created"
    fi
}

# Function to copy new nginx configurations
deploy_nginx_config() {
    echo "⚙️  Deploying nginx configurations..."
    
    # Copy main nginx.conf
    if [ -f "./nginx.conf" ]; then
        cp "./nginx.conf" "/etc/nginx/nginx.conf"
        echo "✅ Main nginx.conf deployed"
    else
        echo "⚠️  nginx.conf not found in current directory"
    fi
    
    # Copy site configuration
    if [ -f "./hvac35242.conf" ]; then
        cp "./hvac35242.conf" "${NGINX_SITES_DIR}/${DOMAIN}"
        
        # Create symlink to enable site
        if [ ! -L "${NGINX_SITES_ENABLED_DIR}/${DOMAIN}" ]; then
            ln -s "${NGINX_SITES_DIR}/${DOMAIN}" "${NGINX_SITES_ENABLED_DIR}/${DOMAIN}"
            echo "✅ Site configuration deployed and enabled"
        fi
    else
        echo "⚠️  hvac35242.conf not found in current directory"
    fi
    
    # Remove default nginx site if it exists
    if [ -L "${NGINX_SITES_ENABLED_DIR}/default" ]; then
        rm "${NGINX_SITES_ENABLED_DIR}/default"
        echo "✅ Default site disabled"
    fi
}

# Function to create DH parameters for enhanced security
create_dhparams() {
    echo "🔑 Creating Diffie-Hellman parameters (this may take a while)..."
    
    if [ ! -f "${SSL_DIR}/dhparams.pem" ]; then
        openssl dhparam -out "${SSL_DIR}/dhparams.pem" 2048
        chmod 644 "${SSL_DIR}/dhparams.pem"
        echo "✅ DH parameters created"
    else
        echo "✅ DH parameters already exist"
    fi
}

# Function to test nginx configuration
test_nginx_config() {
    echo "🧪 Testing nginx configuration..."
    
    if nginx -t; then
        echo "✅ Nginx configuration is valid"
        return 0
    else
        echo "❌ Nginx configuration has errors"
        return 1
    fi
}

# Function to create certificate placeholder files
create_cert_placeholders() {
    echo "📄 Creating certificate placeholder files..."
    
    # Create self-signed certificate for initial nginx start
    if [ ! -f "${CERTS_DIR}/${DOMAIN}.crt" ]; then
        openssl req -x509 -nodes -days 1 -newkey rsa:2048 \
            -keyout "${PRIVATE_DIR}/${DOMAIN}.key" \
            -out "${CERTS_DIR}/${DOMAIN}.crt" \
            -subj "/C=US/ST=Alabama/L=Birmingham/O=HVAC Company/CN=${DOMAIN}"
        
        # Create empty CA bundle file
        touch "${CERTS_DIR}/${DOMAIN}.ca-bundle"
        
        # Set proper permissions
        chmod 600 "${PRIVATE_DIR}/${DOMAIN}.key"
        chmod 644 "${CERTS_DIR}/${DOMAIN}.crt"
        chmod 644 "${CERTS_DIR}/${DOMAIN}.ca-bundle"
        
        echo "✅ Temporary self-signed certificate created"
    fi
}

# Function to start nginx
start_nginx() {
    echo "🚀 Starting nginx..."
    
    systemctl start nginx
    systemctl enable nginx
    
    if systemctl is-active --quiet nginx; then
        echo "✅ Nginx started successfully"
    else
        echo "❌ Failed to start nginx"
        systemctl status nginx
        return 1
    fi
}

# Function to show SSL certificate installation instructions
show_ssl_instructions() {
    echo ""
    echo "🎯 SSL CERTIFICATE INSTALLATION INSTRUCTIONS"
    echo "============================================"
    echo ""
    echo "You now have a secure nginx configuration ready for SSL certificates."
    echo "To install your Sectigo wildcard certificate:"
    echo ""
    echo "1. Upload your certificate files:"
    echo "   - Certificate file: ${CERTS_DIR}/${DOMAIN}.crt"
    echo "   - Private key file: ${PRIVATE_DIR}/${DOMAIN}.key"
    echo "   - CA bundle file: ${CERTS_DIR}/${DOMAIN}.ca-bundle"
    echo ""
    echo "2. Set correct permissions:"
    echo "   sudo chmod 644 ${CERTS_DIR}/${DOMAIN}.crt"
    echo "   sudo chmod 600 ${PRIVATE_DIR}/${DOMAIN}.key"
    echo "   sudo chmod 644 ${CERTS_DIR}/${DOMAIN}.ca-bundle"
    echo ""
    echo "3. Test and reload nginx:"
    echo "   sudo nginx -t"
    echo "   sudo systemctl reload nginx"
    echo ""
    echo "4. Test your SSL setup:"
    echo "   https://${DOMAIN}"
    echo "   https://www.ssllabs.com/ssltest/analyze.html?d=${DOMAIN}"
    echo ""
    
    # Alternative Let's Encrypt instructions
    echo "🔄 ALTERNATIVE: Use Let's Encrypt (Free SSL)"
    echo "==========================================="
    echo ""
    echo "If you prefer to use Let's Encrypt instead of Sectigo:"
    echo ""
    echo "1. Ensure your domain points to this server"
    echo "2. Run: sudo certbot --nginx -d ${DOMAIN} -d www.${DOMAIN}"
    echo "3. Follow the prompts to obtain and install the certificate"
    echo ""
}

# Function to show firewall instructions
show_firewall_instructions() {
    echo "🔥 FIREWALL CONFIGURATION"
    echo "========================"
    echo ""
    echo "Make sure your firewall allows HTTPS traffic:"
    echo ""
    echo "For UFW:"
    echo "  sudo ufw allow 80/tcp"
    echo "  sudo ufw allow 443/tcp"
    echo ""
    echo "For iptables:"
    echo "  sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT"
    echo "  sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT"
    echo ""
}

# Function to create SSL monitoring script
create_ssl_monitoring() {
    echo "📊 Creating SSL monitoring script..."
    
    cat > /usr/local/bin/check-ssl-expiry.sh << 'EOF'
#!/bin/bash

# SSL Certificate Expiry Check Script
DOMAIN="hvac35242.com"
CERT_FILE="/etc/ssl/certs/${DOMAIN}.crt"
WARN_DAYS=30

if [ -f "$CERT_FILE" ]; then
    EXPIRY_DATE=$(openssl x509 -enddate -noout -in "$CERT_FILE" | cut -d= -f2)
    EXPIRY_EPOCH=$(date -d "$EXPIRY_DATE" +%s)
    CURRENT_EPOCH=$(date +%s)
    DAYS_UNTIL_EXPIRY=$(( ($EXPIRY_EPOCH - $CURRENT_EPOCH) / 86400 ))
    
    echo "SSL Certificate for $DOMAIN expires in $DAYS_UNTIL_EXPIRY days"
    
    if [ $DAYS_UNTIL_EXPIRY -lt $WARN_DAYS ]; then
        echo "WARNING: Certificate expires soon!"
        # You can add email notification here
    fi
else
    echo "Certificate file not found: $CERT_FILE"
fi
EOF
    
    chmod +x /usr/local/bin/check-ssl-expiry.sh
    echo "✅ SSL monitoring script created at /usr/local/bin/check-ssl-expiry.sh"
}

# Main execution
main() {
    echo "Starting SSL security setup..."
    echo ""
    
    check_root
    create_directories
    set_permissions
    install_nginx
    install_certbot
    backup_nginx_config
    deploy_nginx_config
    create_dhparams
    create_cert_placeholders
    
    if test_nginx_config; then
        start_nginx
        create_ssl_monitoring
        show_ssl_instructions
        show_firewall_instructions
        
        echo ""
        echo "🎉 SSL SECURITY SETUP COMPLETE!"
        echo "==============================="
        echo ""
        echo "Your server is now configured with:"
        echo "✅ Secure directory structure"
        echo "✅ Proper file permissions"
        echo "✅ Modern nginx SSL configuration"
        echo "✅ Security headers enabled"
        echo "✅ Rate limiting configured"
        echo "✅ HTTPS redirects ready"
        echo ""
        echo "Next steps:"
        echo "1. Install your SSL certificate (see instructions above)"
        echo "2. Test your website: https://${DOMAIN}"
        echo "3. Run SSL security test: https://www.ssllabs.com/ssltest/"
        echo ""
    else
        echo "❌ Setup failed due to nginx configuration errors"
        exit 1
    fi
}

# Run main function
main "$@"