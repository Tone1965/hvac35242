#!/bin/bash

# Deploy SSL Configuration Script for hvac35242.com
# This script deploys the nginx SSL configuration to the server

SERVER_IP="142.93.194.81"
SERVER_USER="root"
DOMAIN="hvac35242.com"

echo "============================================"
echo "Deploying SSL Configuration for $DOMAIN"
echo "============================================"
echo

# Function to run command on server with error checking
run_server_command() {
    echo "Running: $1"
    if ssh "$SERVER_USER@$SERVER_IP" "$1"; then
        echo "✓ Command executed successfully"
    else
        echo "✗ Command failed: $1"
        exit 1
    fi
}

# Check if nginx SSL config file exists locally
if [ ! -f "nginx-ssl-config.conf" ]; then
    echo "ERROR: nginx-ssl-config.conf not found in current directory!"
    echo "Please ensure the file exists and try again."
    exit 1
fi

echo "Step 1: Backing up current nginx configuration..."
run_server_command "cp /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-available/$DOMAIN.backup.$(date +%Y%m%d_%H%M%S)"

echo
echo "Step 2: Uploading new SSL configuration..."
if scp nginx-ssl-config.conf "$SERVER_USER@$SERVER_IP:/etc/nginx/sites-available/$DOMAIN"; then
    echo "✓ SSL configuration uploaded successfully"
else
    echo "✗ Failed to upload SSL configuration"
    exit 1
fi

echo
echo "Step 3: Testing nginx configuration..."
run_server_command "nginx -t"

echo
echo "Step 4: Checking SSL certificate files..."
run_server_command "test -f /etc/ssl/certs/$DOMAIN/fullchain.crt && echo 'Certificate found' || echo 'Certificate missing'"
run_server_command "test -f /etc/ssl/private/$DOMAIN.key && echo 'Private key found' || echo 'Private key missing'"
run_server_command "test -f /etc/ssl/certs/$DOMAIN/ca_bundle.crt && echo 'CA bundle found' || echo 'CA bundle missing'"

echo
echo "Step 5: Reloading nginx..."
run_server_command "systemctl reload nginx"

echo
echo "Step 6: Checking nginx status..."
run_server_command "systemctl status nginx --no-pager -l"

echo
echo "Step 7: Testing SSL configuration..."
echo "Testing HTTPS connection..."
if curl -I -s --connect-timeout 10 "https://$DOMAIN" | head -1 | grep -q "200\|301\|302"; then
    echo "✓ HTTPS is responding"
else
    echo "⚠ HTTPS may not be responding correctly"
fi

echo
echo "Step 8: Testing HTTP to HTTPS redirect..."
if curl -I -s --connect-timeout 10 "http://$DOMAIN" | head -1 | grep -q "301"; then
    echo "✓ HTTP to HTTPS redirect is working"
else
    echo "⚠ HTTP to HTTPS redirect may not be working"
fi

echo
echo "============================================"
echo "SSL Configuration Deployment Complete!"
echo "============================================"
echo
echo "Next steps:"
echo "1. Test your website: https://$DOMAIN"
echo "2. Check SSL rating: https://www.ssllabs.com/ssltest/analyze.html?d=$DOMAIN"
echo "3. Verify all subdomains work with the wildcard certificate"
echo
echo "Useful commands for troubleshooting:"
echo "- Check nginx error logs: ssh $SERVER_USER@$SERVER_IP 'tail -f /var/log/nginx/error.log'"
echo "- Check SSL certificate: ssh $SERVER_USER@$SERVER_IP 'openssl x509 -in /etc/ssl/certs/$DOMAIN/fullchain.crt -text -noout'"
echo "- Test SSL connection: openssl s_client -connect $DOMAIN:443 -servername $DOMAIN"
echo