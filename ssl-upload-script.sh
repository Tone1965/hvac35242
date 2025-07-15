#!/bin/bash

# Secure SSL Certificate Upload Script for hvac35242.com
# This script securely uploads SSL certificate files to the DigitalOcean server

SERVER_IP="142.93.194.81"
SERVER_USER="root"
DOMAIN="hvac35242.com"

echo "============================================"
echo "SSL Certificate Upload Script for $DOMAIN"
echo "============================================"
echo

# Function to check if file exists
check_file() {
    if [ ! -f "$1" ]; then
        echo "ERROR: File $1 not found!"
        echo "Please ensure the file exists and try again."
        exit 1
    fi
}

# Function to validate certificate file
validate_cert() {
    if ! openssl x509 -in "$1" -text -noout >/dev/null 2>&1; then
        echo "ERROR: $1 does not appear to be a valid certificate file!"
        exit 1
    fi
    echo "✓ Certificate file $1 is valid"
}

# Function to validate private key
validate_key() {
    if ! openssl rsa -in "$1" -check -noout >/dev/null 2>&1; then
        echo "ERROR: $1 does not appear to be a valid private key file!"
        exit 1
    fi
    echo "✓ Private key file $1 is valid"
}

# Get certificate file path
echo "Enter the path to your certificate file (.crt or .pem):"
read -r CERT_FILE
check_file "$CERT_FILE"
validate_cert "$CERT_FILE"

# Get private key file path
echo
echo "Enter the path to your private key file (.key):"
read -r -s KEY_FILE
echo
check_file "$KEY_FILE"
validate_key "$KEY_FILE"

# Get CA bundle file path
echo "Enter the path to your CA bundle/intermediate certificate file:"
read -r CA_BUNDLE_FILE
check_file "$CA_BUNDLE_FILE"
validate_cert "$CA_BUNDLE_FILE"

echo
echo "Files validated successfully!"
echo "Certificate: $CERT_FILE"
echo "Private Key: [HIDDEN FOR SECURITY]"
echo "CA Bundle: $CA_BUNDLE_FILE"
echo

# Confirm upload
echo "Are you ready to upload these files to the server? (y/N)"
read -r CONFIRM
if [[ ! $CONFIRM =~ ^[Yy]$ ]]; then
    echo "Upload cancelled."
    exit 0
fi

echo
echo "Uploading SSL certificate files..."

# Upload certificate file
echo "Uploading certificate..."
if scp "$CERT_FILE" "$SERVER_USER@$SERVER_IP:/etc/ssl/certs/$DOMAIN/$DOMAIN.crt"; then
    echo "✓ Certificate uploaded successfully"
else
    echo "✗ Failed to upload certificate"
    exit 1
fi

# Upload private key (with secure permissions)
echo "Uploading private key..."
if scp "$KEY_FILE" "$SERVER_USER@$SERVER_IP:/etc/ssl/private/$DOMAIN.key"; then
    echo "✓ Private key uploaded successfully"
    # Set secure permissions on private key
    ssh "$SERVER_USER@$SERVER_IP" "chmod 600 /etc/ssl/private/$DOMAIN.key"
    echo "✓ Private key permissions secured"
else
    echo "✗ Failed to upload private key"
    exit 1
fi

# Upload CA bundle
echo "Uploading CA bundle..."
if scp "$CA_BUNDLE_FILE" "$SERVER_USER@$SERVER_IP:/etc/ssl/certs/$DOMAIN/ca_bundle.crt"; then
    echo "✓ CA bundle uploaded successfully"
else
    echo "✗ Failed to upload CA bundle"
    exit 1
fi

# Create combined certificate file (cert + ca_bundle)
echo "Creating combined certificate file..."
ssh "$SERVER_USER@$SERVER_IP" "cat /etc/ssl/certs/$DOMAIN/$DOMAIN.crt /etc/ssl/certs/$DOMAIN/ca_bundle.crt > /etc/ssl/certs/$DOMAIN/fullchain.crt"
echo "✓ Combined certificate created"

# Verify files on server
echo
echo "Verifying files on server..."
ssh "$SERVER_USER@$SERVER_IP" "ls -la /etc/ssl/certs/$DOMAIN/ && ls -la /etc/ssl/private/$DOMAIN.key"

echo
echo "============================================"
echo "SSL certificate files uploaded successfully!"
echo "============================================"
echo "Next steps:"
echo "1. Configure nginx to use the SSL certificates"
echo "2. Test the SSL configuration"
echo "3. Set up HTTPS redirects"
echo