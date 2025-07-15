#!/bin/bash

# Sectigo Wildcard Certificate Installation Script
# Securely installs Sectigo SSL certificate for hvac35242.com

set -e

DOMAIN="hvac35242.com"
SSL_CERTS_DIR="/etc/ssl/certs"
SSL_PRIVATE_DIR="/etc/ssl/private"

echo "🔒 Sectigo Certificate Installation for ${DOMAIN}"
echo "==============================================="
echo ""

# Function to check if running as root
check_root() {
    if [[ $EUID -ne 0 ]]; then
        echo "❌ This script must be run as root (use sudo)"
        exit 1
    fi
}

# Function to verify file exists and is readable
verify_file() {
    local file_path="$1"
    local file_description="$2"
    
    if [ ! -f "$file_path" ]; then
        echo "❌ $file_description not found: $file_path"
        return 1
    fi
    
    if [ ! -r "$file_path" ]; then
        echo "❌ $file_description is not readable: $file_path"
        return 1
    fi
    
    echo "✅ $file_description found and readable"
    return 0
}

# Function to verify certificate files
verify_certificate_files() {
    echo "🔍 Verifying certificate files..."
    
    local cert_file="$1"
    local key_file="$2"
    local ca_bundle_file="$3"
    
    # Check if all files exist
    verify_file "$cert_file" "Certificate file" || return 1
    verify_file "$key_file" "Private key file" || return 1
    verify_file "$ca_bundle_file" "CA bundle file" || return 1
    
    # Verify certificate format
    if ! openssl x509 -in "$cert_file" -text -noout > /dev/null 2>&1; then
        echo "❌ Invalid certificate format in $cert_file"
        return 1
    fi
    
    # Verify private key format
    if ! openssl rsa -in "$key_file" -check -noout > /dev/null 2>&1; then
        echo "❌ Invalid private key format in $key_file"
        return 1
    fi
    
    # Verify certificate and key match
    local cert_hash=$(openssl x509 -noout -modulus -in "$cert_file" | openssl md5)
    local key_hash=$(openssl rsa -noout -modulus -in "$key_file" | openssl md5)
    
    if [ "$cert_hash" != "$key_hash" ]; then
        echo "❌ Certificate and private key do not match!"
        return 1
    fi
    
    echo "✅ Certificate files are valid and match"
    return 0
}

# Function to backup existing certificates
backup_existing_certificates() {
    echo "💾 Backing up existing certificates..."
    
    local backup_dir="/etc/ssl/backup/$(date +%Y%m%d_%H%M%S)"
    mkdir -p "$backup_dir"
    
    if [ -f "${SSL_CERTS_DIR}/${DOMAIN}.crt" ]; then
        cp "${SSL_CERTS_DIR}/${DOMAIN}.crt" "$backup_dir/"
        echo "✅ Backed up existing certificate"
    fi
    
    if [ -f "${SSL_PRIVATE_DIR}/${DOMAIN}.key" ]; then
        cp "${SSL_PRIVATE_DIR}/${DOMAIN}.key" "$backup_dir/"
        echo "✅ Backed up existing private key"
    fi
    
    if [ -f "${SSL_CERTS_DIR}/${DOMAIN}.ca-bundle" ]; then
        cp "${SSL_CERTS_DIR}/${DOMAIN}.ca-bundle" "$backup_dir/"
        echo "✅ Backed up existing CA bundle"
    fi
    
    echo "✅ Backup completed to: $backup_dir"
}

# Function to install certificate files
install_certificate_files() {
    local cert_file="$1"
    local key_file="$2"
    local ca_bundle_file="$3"
    
    echo "📁 Installing certificate files..."
    
    # Copy certificate file
    cp "$cert_file" "${SSL_CERTS_DIR}/${DOMAIN}.crt"
    chmod 644 "${SSL_CERTS_DIR}/${DOMAIN}.crt"
    chown root:root "${SSL_CERTS_DIR}/${DOMAIN}.crt"
    echo "✅ Certificate installed: ${SSL_CERTS_DIR}/${DOMAIN}.crt"
    
    # Copy private key file
    cp "$key_file" "${SSL_PRIVATE_DIR}/${DOMAIN}.key"
    chmod 600 "${SSL_PRIVATE_DIR}/${DOMAIN}.key"
    chown root:root "${SSL_PRIVATE_DIR}/${DOMAIN}.key"
    echo "✅ Private key installed: ${SSL_PRIVATE_DIR}/${DOMAIN}.key"
    
    # Copy CA bundle file
    cp "$ca_bundle_file" "${SSL_CERTS_DIR}/${DOMAIN}.ca-bundle"
    chmod 644 "${SSL_CERTS_DIR}/${DOMAIN}.ca-bundle"
    chown root:root "${SSL_CERTS_DIR}/${DOMAIN}.ca-bundle"
    echo "✅ CA bundle installed: ${SSL_CERTS_DIR}/${DOMAIN}.ca-bundle"
}

# Function to test nginx configuration
test_nginx_configuration() {
    echo "🧪 Testing nginx configuration..."
    
    if nginx -t; then
        echo "✅ Nginx configuration is valid"
        return 0
    else
        echo "❌ Nginx configuration has errors"
        echo "Please check your nginx configuration files"
        return 1
    fi
}

# Function to reload nginx
reload_nginx() {
    echo "🔄 Reloading nginx..."
    
    if systemctl reload nginx; then
        echo "✅ Nginx reloaded successfully"
        return 0
    else
        echo "❌ Failed to reload nginx"
        systemctl status nginx
        return 1
    fi
}

# Function to test SSL certificate
test_ssl_certificate() {
    echo "🔍 Testing SSL certificate..."
    
    # Test local SSL connection
    echo "Testing local SSL connection..."
    if echo | openssl s_client -connect localhost:443 -servername "$DOMAIN" 2>/dev/null | openssl x509 -noout -subject; then
        echo "✅ Local SSL connection successful"
    else
        echo "⚠️  Local SSL connection failed (may be due to DNS/firewall)"
    fi
    
    # Show certificate information
    echo ""
    echo "Certificate Information:"
    echo "======================="
    openssl x509 -in "${SSL_CERTS_DIR}/${DOMAIN}.crt" -text -noout | grep -E "(Subject|Issuer|Not Before|Not After|DNS)"
    
    echo ""
    echo "Certificate Chain Length:"
    openssl crl2pkcs7 -nocrl -certfile "${SSL_CERTS_DIR}/${DOMAIN}.ca-bundle" | openssl pkcs7 -print_certs -noout | grep -c "subject="
}

# Function to show post-installation instructions
show_post_installation_instructions() {
    echo ""
    echo "🎉 CERTIFICATE INSTALLATION COMPLETE!"
    echo "===================================="
    echo ""
    echo "Your Sectigo wildcard certificate has been successfully installed."
    echo ""
    echo "🔗 Test your SSL configuration:"
    echo "   https://${DOMAIN}"
    echo "   https://www.${DOMAIN}"
    echo ""
    echo "🔍 Security Testing:"
    echo "   SSL Labs Test: https://www.ssllabs.com/ssltest/analyze.html?d=${DOMAIN}"
    echo "   Qualys SSL Test: https://www.ssllabs.com/ssltest/"
    echo ""
    echo "📊 Certificate Monitoring:"
    echo "   Run: /usr/local/bin/check-ssl-expiry.sh"
    echo "   Set up cron job for regular checks"
    echo ""
    echo "🔧 Troubleshooting:"
    echo "   Check nginx logs: sudo tail -f /var/log/nginx/error.log"
    echo "   Check SSL status: sudo systemctl status nginx"
    echo "   Test config: sudo nginx -t"
    echo ""
    echo "🔄 Certificate Renewal:"
    echo "   Your Sectigo certificate will need to be renewed annually"
    echo "   Set calendar reminder 30 days before expiry"
    echo ""
}

# Function to create certificate monitoring cron job
setup_certificate_monitoring() {
    echo "📅 Setting up certificate monitoring..."
    
    # Create cron job to check certificate expiry weekly
    cat > /etc/cron.d/ssl-certificate-check << EOF
# SSL Certificate Expiry Check - Runs every Monday at 9 AM
0 9 * * 1 root /usr/local/bin/check-ssl-expiry.sh
EOF
    
    echo "✅ Certificate monitoring cron job created"
}

# Interactive certificate installation
interactive_installation() {
    echo "🎯 INTERACTIVE CERTIFICATE INSTALLATION"
    echo "======================================="
    echo ""
    echo "Please provide the paths to your Sectigo certificate files:"
    echo ""
    
    # Get certificate file path
    read -p "Enter path to certificate file (.crt): " cert_file
    [ -z "$cert_file" ] && cert_file="./hvac35242.com.crt"
    
    # Get private key file path
    read -p "Enter path to private key file (.key): " key_file
    [ -z "$key_file" ] && key_file="./hvac35242.com.key"
    
    # Get CA bundle file path
    read -p "Enter path to CA bundle file (.ca-bundle): " ca_bundle_file
    [ -z "$ca_bundle_file" ] && ca_bundle_file="./hvac35242.com.ca-bundle"
    
    echo ""
    echo "Files to install:"
    echo "Certificate: $cert_file"
    echo "Private Key: $key_file"
    echo "CA Bundle: $ca_bundle_file"
    echo ""
    
    read -p "Proceed with installation? (y/N): " -n 1 -r
    echo ""
    
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Installation cancelled."
        exit 0
    fi
    
    return 0
}

# Main function
main() {
    check_root
    
    # Check if files are provided as arguments
    if [ $# -eq 3 ]; then
        cert_file="$1"
        key_file="$2"
        ca_bundle_file="$3"
        echo "Using provided file paths:"
        echo "Certificate: $cert_file"
        echo "Private Key: $key_file"
        echo "CA Bundle: $ca_bundle_file"
        echo ""
    else
        interactive_installation
    fi
    
    # Verify certificate files
    if ! verify_certificate_files "$cert_file" "$key_file" "$ca_bundle_file"; then
        echo "❌ Certificate verification failed"
        exit 1
    fi
    
    # Create directories if they don't exist
    mkdir -p "$SSL_CERTS_DIR"
    mkdir -p "$SSL_PRIVATE_DIR"
    mkdir -p "/etc/ssl/backup"
    
    # Backup existing certificates
    backup_existing_certificates
    
    # Install new certificates
    install_certificate_files "$cert_file" "$key_file" "$ca_bundle_file"
    
    # Test nginx configuration
    if ! test_nginx_configuration; then
        echo "❌ Installation failed due to nginx configuration errors"
        exit 1
    fi
    
    # Reload nginx
    if ! reload_nginx; then
        echo "❌ Installation failed due to nginx reload errors"
        exit 1
    fi
    
    # Test SSL certificate
    test_ssl_certificate
    
    # Setup monitoring
    setup_certificate_monitoring
    
    # Show final instructions
    show_post_installation_instructions
}

# Show usage if no arguments and not interactive
if [ $# -eq 0 ]; then
    echo "Usage: $0 [certificate_file] [private_key_file] [ca_bundle_file]"
    echo ""
    echo "Example:"
    echo "  $0 hvac35242.com.crt hvac35242.com.key hvac35242.com.ca-bundle"
    echo ""
    echo "Or run without arguments for interactive mode"
    echo ""
    
    read -p "Run in interactive mode? (y/N): " -n 1 -r
    echo ""
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        main
    else
        exit 0
    fi
else
    main "$@"
fi