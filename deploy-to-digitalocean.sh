#!/bin/bash

echo "🚀 Birmingham HVAC - DigitalOcean Deployment Script"
echo "=================================================="

# Check if doctl is authenticated
if ! doctl auth list &>/dev/null; then
    echo "❌ DigitalOcean CLI not authenticated. Run: doctl auth init"
    exit 1
fi

# Function to deploy environment
deploy_environment() {
    local env=$1
    local spec_file="digitalocean-${env}-app.yaml"
    
    echo "📦 Deploying ${env} environment..."
    
    # Check if app already exists
    if doctl apps list --format Name | grep -q "birmingham-hvac-${env}"; then
        echo "♻️  Updating existing ${env} app..."
        APP_ID=$(doctl apps list --format ID,Name --no-header | grep "birmingham-hvac-${env}" | awk '{print $1}')
        doctl apps update $APP_ID --spec $spec_file
    else
        echo "🆕 Creating new ${env} app..."
        doctl apps create --spec $spec_file
    fi
    
    echo "✅ ${env} deployment initiated!"
}

# Deploy development environment
if [[ "$1" == "dev" || "$1" == "all" ]]; then
    deploy_environment "dev"
fi

# Deploy production environment
if [[ "$1" == "prod" || "$1" == "all" ]]; then
    deploy_environment "prod"
fi

# Show usage if no arguments
if [[ $# -eq 0 ]]; then
    echo "Usage: $0 [dev|prod|all]"
    echo "  dev  - Deploy development environment only"
    echo "  prod - Deploy production environment only"
    echo "  all  - Deploy both environments"
fi

echo "🔗 View your apps: https://cloud.digitalocean.com/apps"