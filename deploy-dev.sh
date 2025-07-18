#!/bin/bash

# Birmingham HVAC Development Deployment Script
# This script should be run on the DigitalOcean server (142.93.194.81)

echo "🚀 Starting Birmingham HVAC Development Deployment"
echo "=================================================="

# Check if we're in the correct directory
if [ ! -f "docker-compose.dev.yml" ]; then
    echo "❌ Error: Not in the correct directory. Please run from /root/birmingham-hvac"
    exit 1
fi

# Stop existing development container
echo "🛑 Stopping existing development container..."
docker-compose -f docker-compose.dev.yml down

# Remove old images to free up space
echo "🧹 Cleaning up old images..."
docker image prune -f

# Build and start development container
echo "🔨 Building and starting development container..."
docker-compose -f docker-compose.dev.yml up --build -d

# Wait for container to start
echo "⏳ Waiting for container to start..."
sleep 10

# Check container status
echo "📊 Checking container status..."
docker ps | grep hvac-dev

# Check logs for any errors
echo "📋 Checking recent logs..."
docker logs hvac-dev --tail 20

# Test the development site
echo "🌐 Testing development site..."
curl -I http://localhost:3002 || echo "❌ Development site not responding on port 3002"

echo ""
echo "✅ Development deployment complete!"
echo "🌐 Site should be available at: https://dev.hvac35242.com"
echo "🔍 Check logs with: docker logs hvac-dev -f"
echo "📊 Check status with: docker ps"