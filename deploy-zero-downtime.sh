#!/bin/bash

# Birmingham HVAC Zero-Downtime Deployment Script
# This script implements blue-green deployment strategy
# This script should be run on the DigitalOcean server (142.93.194.81)

echo "🚀 Starting Birmingham HVAC Zero-Downtime Deployment"
echo "===================================================="

# Check if we're in the correct directory
if [ ! -f "docker-compose.prod.yml" ]; then
    echo "❌ Error: Not in the correct directory. Please run from /root/birmingham-hvac"
    exit 1
fi

# Create timestamp for versioning
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
ROLLBACK_TAG="rollback_${TIMESTAMP}"
GREEN_CONTAINER="hvac-green-${TIMESTAMP}"
GREEN_PORT="3003"

# Tag current production image for rollback
echo "📦 Tagging current production image for rollback..."
CURRENT_IMAGE=$(docker images -q birmingham-hvac-hvac-prod:latest 2>/dev/null)
if [ ! -z "$CURRENT_IMAGE" ]; then
    docker tag $CURRENT_IMAGE birmingham-hvac-hvac-prod:$ROLLBACK_TAG
    echo "✅ Current image tagged as: $ROLLBACK_TAG"
fi

# Build new green container
echo "🔨 Building new green container..."
docker build -t birmingham-hvac:green-${TIMESTAMP} .

# Start green container on alternative port
echo "🟢 Starting green container on port $GREEN_PORT..."
docker run -d \
    --name $GREEN_CONTAINER \
    -p $GREEN_PORT:3000 \
    -e NODE_ENV=production \
    -e NEXT_PUBLIC_ENVIRONMENT=production \
    --restart unless-stopped \
    birmingham-hvac:green-${TIMESTAMP}

# Wait for green container to be ready
echo "⏳ Waiting for green container to be ready..."
sleep 30

# Health check on green container
echo "🏥 Performing health check on green container..."
for i in {1..5}; do
    if curl -f http://localhost:$GREEN_PORT >/dev/null 2>&1; then
        echo "✅ Green container health check passed"
        break
    else
        echo "⏳ Health check $i/5 failed, retrying..."
        sleep 10
    fi
    
    if [ $i -eq 5 ]; then
        echo "❌ Green container failed health checks"
        echo "🧹 Cleaning up failed green container..."
        docker stop $GREEN_CONTAINER
        docker rm $GREEN_CONTAINER
        docker rmi birmingham-hvac:green-${TIMESTAMP}
        exit 1
    fi
done

# Test critical pages on green container
echo "🧪 Testing critical pages on green container..."
CRITICAL_PAGES=("/" "/contact" "/emergency" "/services")
for page in "${CRITICAL_PAGES[@]}"; do
    if curl -f http://localhost:$GREEN_PORT$page >/dev/null 2>&1; then
        echo "✅ $page - OK"
    else
        echo "❌ $page - FAILED"
        echo "🧹 Cleaning up failed green container..."
        docker stop $GREEN_CONTAINER
        docker rm $GREEN_CONTAINER
        docker rmi birmingham-hvac:green-${TIMESTAMP}
        exit 1
    fi
done

# Confirmation prompt
echo "✅ Green container is healthy and ready"
read -p "⚠️  Switch production traffic to green container? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Deployment cancelled"
    echo "🧹 Cleaning up green container..."
    docker stop $GREEN_CONTAINER
    docker rm $GREEN_CONTAINER
    docker rmi birmingham-hvac:green-${TIMESTAMP}
    exit 1
fi

# Create backup of current nginx config
echo "📋 Backing up current nginx configuration..."
if [ -f "/etc/nginx/sites-available/hvac35242.com" ]; then
    cp /etc/nginx/sites-available/hvac35242.com /etc/nginx/sites-available/hvac35242.com.backup.${TIMESTAMP}
fi

# Switch nginx to point to green container
echo "🔄 Switching nginx to green container..."
# Update nginx config to point to green container (port 3003)
sed -i "s/proxy_pass http:\/\/localhost:3001;/proxy_pass http:\/\/localhost:$GREEN_PORT;/" /etc/nginx/sites-available/hvac35242.com

# Test nginx configuration
echo "🧪 Testing nginx configuration..."
nginx -t
if [ $? -ne 0 ]; then
    echo "❌ Nginx configuration test failed"
    echo "🔄 Reverting nginx configuration..."
    cp /etc/nginx/sites-available/hvac35242.com.backup.${TIMESTAMP} /etc/nginx/sites-available/hvac35242.com
    echo "🧹 Cleaning up green container..."
    docker stop $GREEN_CONTAINER
    docker rm $GREEN_CONTAINER
    docker rmi birmingham-hvac:green-${TIMESTAMP}
    exit 1
fi

# Reload nginx
echo "🔄 Reloading nginx..."
systemctl reload nginx

# Wait for nginx to update
sleep 5

# Test production site with new configuration
echo "🌐 Testing production site with new configuration..."
for i in {1..3}; do
    if curl -f https://www.hvac35242.com >/dev/null 2>&1; then
        echo "✅ Production site responding correctly"
        break
    else
        echo "⏳ Test $i/3 failed, retrying..."
        sleep 5
    fi
    
    if [ $i -eq 3 ]; then
        echo "❌ Production site not responding after nginx switch"
        echo "🔄 Reverting nginx configuration..."
        cp /etc/nginx/sites-available/hvac35242.com.backup.${TIMESTAMP} /etc/nginx/sites-available/hvac35242.com
        systemctl reload nginx
        echo "🧹 Cleaning up green container..."
        docker stop $GREEN_CONTAINER
        docker rm $GREEN_CONTAINER
        docker rmi birmingham-hvac:green-${TIMESTAMP}
        exit 1
    fi
done

# Stop and remove old blue container
echo "🛑 Stopping old blue container..."
docker-compose -f docker-compose.prod.yml down

# Update production image tag
echo "📦 Updating production image tag..."
docker tag birmingham-hvac:green-${TIMESTAMP} birmingham-hvac-hvac-prod:latest

# Clean up old images (keep rollback images)
echo "🧹 Cleaning up old images..."
docker image prune -f

# Update nginx config to use standard port (3001) for future deployments
echo "🔄 Updating nginx config to standard port..."
sed -i "s/proxy_pass http:\/\/localhost:$GREEN_PORT;/proxy_pass http:\/\/localhost:3001;/" /etc/nginx/sites-available/hvac35242.com

# Stop green container and start standard production container
echo "🔄 Switching to standard production container..."
docker stop $GREEN_CONTAINER
docker rm $GREEN_CONTAINER

# Start standard production container with new image
docker-compose -f docker-compose.prod.yml up -d

# Wait for standard container to start
echo "⏳ Waiting for standard container to start..."
sleep 15

# Reload nginx to point back to standard port
systemctl reload nginx

# Final health check
echo "🏥 Final health check..."
curl -f https://www.hvac35242.com >/dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Zero-downtime deployment successful!"
else
    echo "❌ Final health check failed"
    exit 1
fi

echo ""
echo "🎉 Zero-downtime deployment complete!"
echo "🌐 Site is available at: https://www.hvac35242.com"
echo "🔍 Check logs with: docker logs hvac-prod -f"
echo "📊 Check status with: docker ps"
echo "🔄 Rollback available with: ./rollback-prod.sh $ROLLBACK_TAG"
echo "📝 Rollback tag: $ROLLBACK_TAG"
echo "🗑️  Clean up green image with: docker rmi birmingham-hvac:green-${TIMESTAMP}"