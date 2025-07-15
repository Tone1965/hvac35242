#!/bin/bash

# Extract certificate parts from combined file
# Usage: ./extract-certificate-parts.sh combined-certificate.pem

if [ $# -eq 0 ]; then
    echo "Usage: $0 <combined-certificate-file>"
    echo "This will extract the certificate and CA bundle from a combined file"
    exit 1
fi

COMBINED_FILE="$1"
DOMAIN="hvac35242.com"

echo "Extracting certificate parts from: $COMBINED_FILE"

# Extract the main certificate (first certificate block)
awk '/-----BEGIN CERTIFICATE-----/{flag=1} flag && /-----END CERTIFICATE-----/{print; flag=0; exit} flag' "$COMBINED_FILE" > "${DOMAIN}.crt"

# Extract CA bundle (remaining certificate blocks)
awk '/-----BEGIN CERTIFICATE-----/{if(++count>1) flag=1} flag' "$COMBINED_FILE" > "${DOMAIN}.ca-bundle"

echo "Files created:"
echo "  ${DOMAIN}.crt (main certificate)"
echo "  ${DOMAIN}.ca-bundle (certificate chain)"
echo ""
echo "You already have the private key file."
echo "Now you have all 3 required files for SSL installation!"