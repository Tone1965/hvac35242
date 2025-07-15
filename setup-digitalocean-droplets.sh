#!/bin/bash

echo "🚀 Setting up DigitalOcean Droplets for Birmingham HVAC"
echo "======================================================"

# Check if doctl is authenticated
if ! ~/.local/bin/doctl auth list &>/dev/null; then
    echo "❌ DigitalOcean CLI not authenticated. Run: doctl auth init"
    exit 1
fi

# Create SSH key if it doesn't exist
if [ ! -f ~/.ssh/id_rsa ]; then
    echo "🔑 Creating SSH key..."
    ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa -N ""
fi

# Add SSH key to DigitalOcean
echo "🔐 Adding SSH key to DigitalOcean..."
SSH_KEY_ID=$(~/.local/bin/doctl compute ssh-key create "hvac-deploy-key" --public-key-file ~/.ssh/id_rsa.pub --format ID --no-header 2>/dev/null || echo "existing")

if [ "$SSH_KEY_ID" = "existing" ]; then
    SSH_KEY_ID=$(~/.local/bin/doctl compute ssh-key list --format ID,Name --no-header | grep "hvac-deploy-key" | awk '{print $1}')
fi

# Function to create droplet
create_droplet() {
    local name=$1
    local tag=$2
    
    echo "🖥️  Creating $name droplet..."
    
    ~/.local/bin/doctl compute droplet create $name \
        --region nyc3 \
        --image docker-20-04 \
        --size s-2vcpu-2gb \
        --ssh-keys $SSH_KEY_ID \
        --tag-names $tag \
        --wait
    
    # Get droplet IP
    DROPLET_IP=$(~/.local/bin/doctl compute droplet list --format Name,PublicIPv4 --no-header | grep $name | awk '{print $2}')
    echo "✅ $name created at IP: $DROPLET_IP"
    
    return $DROPLET_IP
}

# Create development droplet
if [[ "$1" == "dev" || "$1" == "all" ]]; then
    create_droplet "hvac-dev" "development"
    DEV_IP=$?
fi

# Create production droplet
if [[ "$1" == "prod" || "$1" == "all" ]]; then
    create_droplet "hvac-prod" "production"
    PROD_IP=$?
fi

# Show usage if no arguments
if [[ $# -eq 0 ]]; then
    echo "Usage: $0 [dev|prod|all]"
    echo "  dev  - Create development droplet only"
    echo "  prod - Create production droplet only"
    echo "  all  - Create both droplets"
fi

echo "🔗 View your droplets: https://cloud.digitalocean.com/droplets"