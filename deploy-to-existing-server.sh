#!/bin/bash

echo "🚀 Deploying Birmingham HVAC to EXISTING DigitalOcean Server"
echo "============================================================"
echo "Server IP: 142.93.194.81"
echo "============================================================"

SERVER_IP="142.93.194.81"
SERVER_USER="root"

# Function to deploy to existing server
deploy_to_server() {
    local env=$1
    local port=$2
    
    echo "📦 Deploying $env environment to $SERVER_IP..."
    
    # Copy project files to server
    echo "📂 Copying project files..."
    rsync -avz --exclude 'node_modules' --exclude '.git' --exclude '.next' . $SERVER_USER@$SERVER_IP:/var/www/birmingham-hvac-$env/
    
    # SSH into server and deploy
    ssh $SERVER_USER@$SERVER_IP << EOF
echo "🐳 Setting up Docker environment on server..."
cd /var/www/birmingham-hvac-$env

# Stop existing containers
docker-compose -f docker-compose.$env.yml down 2>/dev/null || true

# Build and start containers
echo "🔨 Building Docker containers..."
docker-compose -f docker-compose.$env.yml build

echo "🚀 Starting containers..."
docker-compose -f docker-compose.$env.yml up -d

# Show running containers
echo "✅ Deployment complete! Running containers:"
docker ps

echo "🌐 Your $env site should be available at: http://$SERVER_IP:$port"
EOF
}

# Deploy based on argument
case "$1" in
    "dev")
        deploy_to_server "dev" "3000"
        ;;
    "prod")
        deploy_to_server "prod" "80"
        ;;
    "both")
        deploy_to_server "dev" "3000"
        deploy_to_server "prod" "80"
        ;;
    *)
        echo "Usage: $0 [dev|prod|both]"
        echo "  dev  - Deploy development to port 3000"
        echo "  prod - Deploy production to port 80"
        echo "  both - Deploy both environments"
        echo ""
        echo "Server: $SERVER_IP"
        exit 1
        ;;
esac

echo "✅ Deployment to existing server complete!"
echo "🔗 SSH access: ssh $SERVER_USER@$SERVER_IP"