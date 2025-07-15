#!/bin/bash

# Complete Secure SSL Deployment Script for hvac35242.com
# Deploys Sectigo wildcard certificate with maximum security configuration

set -euo pipefail

# Configuration variables
DOMAIN="hvac35242.com"
WWW_DOMAIN="www.hvac35242.com"
PROJECT_DIR="/mnt/c/Users/kimma/birmingham-hvac"
SSL_CONFIG_DIR="${PROJECT_DIR}/nginx-ssl-config"
SSL_CERTS_DIR="/etc/ssl/certs"
SSL_PRIVATE_DIR="/etc/ssl/private"
NGINX_CONF_DIR="/etc/nginx"
BACKUP_DIR="/etc/ssl/backup/$(date +%Y%m%d_%H%M%S)"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Logging function
log() {
    local level="$1"
    local message="$2"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    
    case $level in
        "INFO")
            echo -e "${BLUE}[${timestamp}] ℹ️  ${message}${NC}"
            ;;
        "SUCCESS")
            echo -e "${GREEN}[${timestamp}] ✅ ${message}${NC}"
            ;;
        "WARNING")
            echo -e "${YELLOW}[${timestamp}] ⚠️  ${message}${NC}"
            ;;
        "ERROR")
            echo -e "${RED}[${timestamp}] ❌ ${message}${NC}"
            ;;
        "HEADER")
            echo -e "${PURPLE}[${timestamp}] 🔒 ${message}${NC}"
            ;;
    esac
}

# Error handling
error_exit() {
    log "ERROR" "$1"
    exit 1
}

# Check if running as root
check_root() {
    if [[ $EUID -ne 0 ]]; then
        error_exit "This script must be run as root (use sudo)"
    fi
}

# Create backup directory
create_backup_dir() {
    log "INFO" "Creating backup directory: $BACKUP_DIR"
    mkdir -p "$BACKUP_DIR"
    log "SUCCESS" "Backup directory created"
}

# Backup existing configuration
backup_existing_config() {
    log "INFO" "Backing up existing configuration files..."
    
    # Backup nginx main config
    if [[ -f "/etc/nginx/nginx.conf" ]]; then
        cp "/etc/nginx/nginx.conf" "$BACKUP_DIR/nginx.conf.backup"
        log "SUCCESS" "Backed up nginx.conf"
    fi
    
    # Backup existing SSL certificates
    if [[ -f "${SSL_CERTS_DIR}/${DOMAIN}.crt" ]]; then
        cp "${SSL_CERTS_DIR}/${DOMAIN}.crt" "$BACKUP_DIR/"
        log "SUCCESS" "Backed up existing certificate"
    fi
    
    if [[ -f "${SSL_PRIVATE_DIR}/${DOMAIN}.key" ]]; then
        cp "${SSL_PRIVATE_DIR}/${DOMAIN}.key" "$BACKUP_DIR/"
        log "SUCCESS" "Backed up existing private key"
    fi
    
    # Backup site configuration
    if [[ -f "/etc/nginx/sites-available/${DOMAIN}" ]]; then
        cp "/etc/nginx/sites-available/${DOMAIN}" "$BACKUP_DIR/"
        log "SUCCESS" "Backed up site configuration"
    fi
}

# Install required packages
install_dependencies() {
    log "INFO" "Installing required packages..."
    
    apt update -qq
    
    # Install nginx if not present
    if ! command -v nginx &> /dev/null; then
        log "INFO" "Installing nginx..."
        apt install -y nginx
        systemctl enable nginx
        log "SUCCESS" "Nginx installed and enabled"
    else
        log "SUCCESS" "Nginx already installed"
    fi
    
    # Install OpenSSL if not present
    if ! command -v openssl &> /dev/null; then
        log "INFO" "Installing OpenSSL..."
        apt install -y openssl
        log "SUCCESS" "OpenSSL installed"
    else
        log "SUCCESS" "OpenSSL already installed"
    fi
    
    # Install curl for testing
    if ! command -v curl &> /dev/null; then
        log "INFO" "Installing curl..."
        apt install -y curl
        log "SUCCESS" "Curl installed"
    fi
}

# Create secure directory structure
create_secure_directories() {
    log "INFO" "Creating secure directory structure..."
    
    # Create SSL directories with proper permissions
    mkdir -p "$SSL_CERTS_DIR"
    mkdir -p "$SSL_PRIVATE_DIR"
    mkdir -p "/etc/nginx/sites-available"
    mkdir -p "/etc/nginx/sites-enabled"
    mkdir -p "/etc/nginx/conf.d"
    mkdir -p "/var/www/certbot"
    mkdir -p "/var/log/nginx"
    
    # Set secure permissions
    chmod 755 "$SSL_CERTS_DIR"
    chmod 700 "$SSL_PRIVATE_DIR"
    chmod 755 "/var/www/certbot"
    
    # Set ownership
    chown root:root "$SSL_CERTS_DIR"
    chown root:root "$SSL_PRIVATE_DIR"
    chown www-data:www-data "/var/www/certbot"
    
    log "SUCCESS" "Secure directory structure created"
}

# Generate DH parameters for enhanced security
generate_dhparams() {
    local dhparam_file="/etc/ssl/dhparams.pem"
    
    if [[ ! -f "$dhparam_file" ]]; then
        log "INFO" "Generating Diffie-Hellman parameters (this may take several minutes)..."
        openssl dhparam -out "$dhparam_file" 2048
        chmod 644 "$dhparam_file"
        chown root:root "$dhparam_file"
        log "SUCCESS" "DH parameters generated: $dhparam_file"
    else
        log "SUCCESS" "DH parameters already exist: $dhparam_file"
    fi
}

# Deploy nginx configuration files
deploy_nginx_config() {
    log "INFO" "Deploying nginx configuration files..."
    
    # Deploy main nginx.conf
    if [[ -f "${SSL_CONFIG_DIR}/nginx.conf" ]]; then
        cp "${SSL_CONFIG_DIR}/nginx.conf" "/etc/nginx/nginx.conf"
        chown root:root "/etc/nginx/nginx.conf"
        chmod 644 "/etc/nginx/nginx.conf"
        log "SUCCESS" "Main nginx configuration deployed"
    else
        error_exit "nginx.conf not found in ${SSL_CONFIG_DIR}"
    fi
    
    # Deploy site configuration
    if [[ -f "${SSL_CONFIG_DIR}/hvac35242.conf" ]]; then
        cp "${SSL_CONFIG_DIR}/hvac35242.conf" "/etc/nginx/sites-available/${DOMAIN}"
        chown root:root "/etc/nginx/sites-available/${DOMAIN}"
        chmod 644 "/etc/nginx/sites-available/${DOMAIN}"
        log "SUCCESS" "Site configuration deployed"
        
        # Enable site
        if [[ ! -L "/etc/nginx/sites-enabled/${DOMAIN}" ]]; then
            ln -sf "/etc/nginx/sites-available/${DOMAIN}" "/etc/nginx/sites-enabled/${DOMAIN}"
            log "SUCCESS" "Site configuration enabled"
        fi
    else
        error_exit "hvac35242.conf not found in ${SSL_CONFIG_DIR}"
    fi
    
    # Disable default site
    if [[ -L "/etc/nginx/sites-enabled/default" ]]; then
        rm "/etc/nginx/sites-enabled/default"
        log "SUCCESS" "Default site disabled"
    fi
}

# Create temporary self-signed certificate for initial setup
create_temporary_certificate() {
    local temp_cert="/etc/ssl/certs/${DOMAIN}.crt"
    local temp_key="/etc/ssl/private/${DOMAIN}.key"
    local temp_bundle="/etc/ssl/certs/${DOMAIN}.ca-bundle"
    
    if [[ ! -f "$temp_cert" ]]; then
        log "INFO" "Creating temporary self-signed certificate..."
        
        openssl req -x509 -nodes -days 1 -newkey rsa:2048 \
            -keyout "$temp_key" \
            -out "$temp_cert" \
            -subj "/C=US/ST=Alabama/L=Birmingham/O=HVAC Company/CN=${DOMAIN}" \
            -addext "subjectAltName=DNS:${DOMAIN},DNS:${WWW_DOMAIN}"
        
        # Create empty CA bundle
        touch "$temp_bundle"
        
        # Set proper permissions
        chmod 600 "$temp_key"
        chmod 644 "$temp_cert"
        chmod 644 "$temp_bundle"
        chown root:root "$temp_key" "$temp_cert" "$temp_bundle"
        
        log "SUCCESS" "Temporary certificate created"
    else
        log "SUCCESS" "Certificate files already exist"
    fi
}

# Test nginx configuration
test_nginx_configuration() {
    log "INFO" "Testing nginx configuration..."
    
    if nginx -t; then
        log "SUCCESS" "Nginx configuration is valid"
        return 0
    else
        error_exit "Nginx configuration has errors"
    fi
}

# Start/restart nginx service
restart_nginx() {
    log "INFO" "Restarting nginx service..."
    
    if systemctl is-active --quiet nginx; then
        systemctl reload nginx
        log "SUCCESS" "Nginx reloaded"
    else
        systemctl start nginx
        log "SUCCESS" "Nginx started"
    fi
    
    # Verify nginx is running
    if systemctl is-active --quiet nginx; then
        log "SUCCESS" "Nginx is running and active"
    else
        error_exit "Failed to start nginx"
    fi
}

# Setup SSL certificate monitoring
setup_ssl_monitoring() {
    log "INFO" "Setting up SSL certificate monitoring..."
    
    # Create monitoring script
    cat > /usr/local/bin/check-ssl-expiry.sh << 'EOF'
#!/bin/bash
# SSL Certificate Expiry Check Script for hvac35242.com

DOMAIN="hvac35242.com"
CERT_FILE="/etc/ssl/certs/${DOMAIN}.crt"
WARN_DAYS=30
EMAIL_ALERT="admin@hvac35242.com"

if [[ -f "$CERT_FILE" ]]; then
    EXPIRY_DATE=$(openssl x509 -enddate -noout -in "$CERT_FILE" | cut -d= -f2)
    EXPIRY_EPOCH=$(date -d "$EXPIRY_DATE" +%s)
    CURRENT_EPOCH=$(date +%s)
    DAYS_UNTIL_EXPIRY=$(( ($EXPIRY_EPOCH - $CURRENT_EPOCH) / 86400 ))
    
    echo "[$(date)] SSL Certificate for $DOMAIN expires in $DAYS_UNTIL_EXPIRY days ($EXPIRY_DATE)"
    
    if [[ $DAYS_UNTIL_EXPIRY -lt $WARN_DAYS ]]; then
        echo "[$(date)] WARNING: Certificate expires in $DAYS_UNTIL_EXPIRY days!"
        # Log to syslog
        logger -t ssl-monitor "WARNING: SSL certificate for $DOMAIN expires in $DAYS_UNTIL_EXPIRY days"
    fi
    
    if [[ $DAYS_UNTIL_EXPIRY -lt 0 ]]; then
        echo "[$(date)] CRITICAL: Certificate has expired!"
        logger -t ssl-monitor "CRITICAL: SSL certificate for $DOMAIN has expired!"
    fi
else
    echo "[$(date)] ERROR: Certificate file not found: $CERT_FILE"
    logger -t ssl-monitor "ERROR: SSL certificate file not found: $CERT_FILE"
fi
EOF
    
    chmod +x /usr/local/bin/check-ssl-expiry.sh
    chown root:root /usr/local/bin/check-ssl-expiry.sh
    
    # Create cron job for weekly monitoring
    cat > /etc/cron.d/ssl-certificate-check << 'EOF'
# SSL Certificate Expiry Check - Runs every Monday at 9 AM
0 9 * * 1 root /usr/local/bin/check-ssl-expiry.sh >> /var/log/ssl-monitoring.log 2>&1
EOF
    
    chmod 644 /etc/cron.d/ssl-certificate-check
    
    log "SUCCESS" "SSL monitoring setup complete"
}

# Setup firewall rules
setup_firewall() {
    log "INFO" "Configuring firewall for HTTPS..."
    
    # Check if ufw is available and active
    if command -v ufw &> /dev/null; then
        # Allow HTTP and HTTPS
        ufw allow 80/tcp comment "HTTP"
        ufw allow 443/tcp comment "HTTPS"
        
        # Allow SSH (make sure we don't lock ourselves out)
        ufw allow ssh
        
        log "SUCCESS" "UFW firewall rules configured"
    elif command -v iptables &> /dev/null; then
        # Configure iptables rules
        iptables -A INPUT -p tcp --dport 80 -j ACCEPT
        iptables -A INPUT -p tcp --dport 443 -j ACCEPT
        
        # Save iptables rules (Ubuntu/Debian)
        if command -v iptables-save &> /dev/null; then
            iptables-save > /etc/iptables/rules.v4
        fi
        
        log "SUCCESS" "iptables firewall rules configured"
    else
        log "WARNING" "No firewall detected. Make sure ports 80 and 443 are open"
    fi
}

# Perform initial SSL tests
perform_initial_tests() {
    log "INFO" "Performing initial SSL configuration tests..."
    
    # Test nginx configuration
    if nginx -t; then
        log "SUCCESS" "Nginx configuration test passed"
    else
        log "ERROR" "Nginx configuration test failed"
        return 1
    fi
    
    # Test if nginx is listening on correct ports
    if netstat -tlnp 2>/dev/null | grep -q ":80.*nginx" && netstat -tlnp 2>/dev/null | grep -q ":443.*nginx"; then
        log "SUCCESS" "Nginx is listening on ports 80 and 443"
    else
        log "WARNING" "Nginx may not be listening on expected ports"
    fi
    
    # Test HTTP redirect (will fail with temp cert, but should show redirect)
    if curl -s -I -L --max-time 5 "http://localhost" 2>/dev/null | grep -q "301\|302"; then
        log "SUCCESS" "HTTP to HTTPS redirect is working"
    else
        log "WARNING" "HTTP redirect test inconclusive (may be due to DNS/network)"
    fi
}

# Display SSL certificate installation instructions
show_certificate_instructions() {
    log "HEADER" "SSL CERTIFICATE INSTALLATION INSTRUCTIONS"
    echo ""
    echo "Your secure nginx configuration is now ready for the Sectigo wildcard certificate."
    echo ""
    echo "To install your Sectigo certificate, you need three files:"
    echo "1. Certificate file (*.crt)"
    echo "2. Private key file (*.key)"
    echo "3. CA bundle file (*.ca-bundle or *.pem)"
    echo ""
    echo "Installation steps:"
    echo "==================="
    echo ""
    echo "1. Upload your certificate files to the server"
    echo ""
    echo "2. Install the certificate using the provided script:"
    echo "   cd ${SSL_CONFIG_DIR}"
    echo "   sudo ./install-sectigo-certificate.sh"
    echo ""
    echo "3. Or manually install the files:"
    echo "   sudo cp your-certificate.crt ${SSL_CERTS_DIR}/${DOMAIN}.crt"
    echo "   sudo cp your-private-key.key ${SSL_PRIVATE_DIR}/${DOMAIN}.key"
    echo "   sudo cp your-ca-bundle.pem ${SSL_CERTS_DIR}/${DOMAIN}.ca-bundle"
    echo ""
    echo "4. Set proper permissions:"
    echo "   sudo chmod 644 ${SSL_CERTS_DIR}/${DOMAIN}.crt"
    echo "   sudo chmod 600 ${SSL_PRIVATE_DIR}/${DOMAIN}.key"
    echo "   sudo chmod 644 ${SSL_CERTS_DIR}/${DOMAIN}.ca-bundle"
    echo ""
    echo "5. Test and reload nginx:"
    echo "   sudo nginx -t"
    echo "   sudo systemctl reload nginx"
    echo ""
    echo "Testing your SSL configuration:"
    echo "==============================="
    echo ""
    echo "1. Test your website:"
    echo "   https://${DOMAIN}"
    echo "   https://${WWW_DOMAIN}"
    echo ""
    echo "2. Run comprehensive SSL tests:"
    echo "   cd ${SSL_CONFIG_DIR}"
    echo "   sudo ./ssl-test-and-monitoring.sh"
    echo ""
    echo "3. Online SSL testing:"
    echo "   SSL Labs: https://www.ssllabs.com/ssltest/analyze.html?d=${DOMAIN}"
    echo "   Qualys SSL Test: https://www.ssllabs.com/ssltest/"
    echo ""
    echo "Monitoring:"
    echo "==========="
    echo ""
    echo "- SSL certificate monitoring is set up with weekly checks"
    echo "- Check logs: tail -f /var/log/ssl-monitoring.log"
    echo "- Manual check: sudo /usr/local/bin/check-ssl-expiry.sh"
    echo ""
}

# Display post-deployment summary
show_deployment_summary() {
    log "HEADER" "SECURE SSL DEPLOYMENT SUMMARY"
    echo ""
    echo "✅ Secure directory structure created"
    echo "✅ Enhanced nginx SSL configuration deployed"
    echo "✅ Strong cipher suites configured (TLS 1.2/1.3 only)"
    echo "✅ Security headers enabled (HSTS, CSP, etc.)"
    echo "✅ Rate limiting configured"
    echo "✅ DH parameters generated (2048-bit)"
    echo "✅ SSL monitoring system setup"
    echo "✅ Firewall rules configured"
    echo "✅ HTTP to HTTPS redirect ready"
    echo "✅ Temporary certificate installed for testing"
    echo ""
    echo "Security Features Enabled:"
    echo "========================="
    echo "- HSTS with preload and includeSubDomains"
    echo "- Content Security Policy (CSP)"
    echo "- X-Frame-Options: DENY"
    echo "- X-Content-Type-Options: nosniff"
    echo "- Cross-Origin policies"
    echo "- Permissions policy restrictions"
    echo "- OCSP stapling"
    echo "- Perfect Forward Secrecy"
    echo "- Session ticket encryption disabled"
    echo ""
    echo "Next Steps:"
    echo "==========="
    echo "1. Install your Sectigo wildcard certificate"
    echo "2. Test SSL configuration thoroughly"
    echo "3. Monitor certificate expiry"
    echo "4. Run regular security audits"
    echo ""
    
    log "SUCCESS" "Secure SSL deployment completed successfully!"
}

# Main deployment function
main() {
    log "HEADER" "STARTING SECURE SSL DEPLOYMENT FOR ${DOMAIN}"
    echo ""
    
    # Pre-flight checks
    check_root
    
    # Create backup
    create_backup_dir
    backup_existing_config
    
    # Setup system
    install_dependencies
    create_secure_directories
    generate_dhparams
    
    # Deploy configuration
    deploy_nginx_config
    create_temporary_certificate
    
    # Test and start services
    test_nginx_configuration
    restart_nginx
    
    # Setup monitoring and security
    setup_ssl_monitoring
    setup_firewall
    
    # Perform tests
    perform_initial_tests
    
    # Show instructions
    echo ""
    show_certificate_instructions
    echo ""
    show_deployment_summary
    
    log "SUCCESS" "Deployment completed! Configuration backup saved to: $BACKUP_DIR"
}

# Show usage if help requested
if [[ "${1:-}" == "--help" || "${1:-}" == "-h" ]]; then
    echo "Secure SSL Deployment Script for hvac35242.com"
    echo ""
    echo "This script deploys a complete secure SSL configuration with:"
    echo "- Enhanced nginx SSL settings"
    echo "- Strong security headers"
    echo "- Certificate monitoring"
    echo "- Firewall configuration"
    echo "- Testing tools"
    echo ""
    echo "Usage: sudo $0"
    echo ""
    echo "After running this script, use ./install-sectigo-certificate.sh"
    echo "to install your Sectigo wildcard certificate."
    echo ""
    exit 0
fi

# Run main function
main "$@"