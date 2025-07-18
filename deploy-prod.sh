#!/bin/bash

# Birmingham HVAC Production Deployment Script
# This script should be run on the DigitalOcean server (142.93.194.81)
# ONLY deploy to production AFTER dev deployment is verified

echo "🚀 Starting Birmingham HVAC Production Deployment"
echo "=================================================="

# Check if we're in the correct directory
if [ ! -f "docker-compose.prod.yml" ]; then
    echo "❌ Error: Not in the correct directory. Please run from /root/birmingham-hvac"
    exit 1
fi

# Confirmation prompt
read -p "⚠️  Are you sure you want to deploy to PRODUCTION? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Production deployment cancelled"
    exit 1
fi

# Stop existing production container
echo "🛑 Stopping existing production container..."
docker-compose -f docker-compose.prod.yml down

# Remove old images to free up space
echo "🧹 Cleaning up old images..."
docker image prune -f

# Build and start production container
echo "🔨 Building and starting production container..."
docker-compose -f docker-compose.prod.yml up --build -d

# Wait for containers to start
echo "⏳ Waiting for containers to start..."
sleep 15

# Check container status
echo "📊 Checking container status..."
docker ps | grep hvac-prod
docker ps | grep nginx

# Check logs for any errors
echo "📋 Checking recent logs..."
docker logs hvac-prod --tail 20
docker logs nginx --tail 10

# Test the production site
echo "🌐 Testing production site..."
curl -I http://localhost:3001 || echo "❌ Production site not responding on port 3001"
curl -I https://www.hvac35242.com || echo "❌ Production site not responding via HTTPS"

echo ""
echo "✅ Production deployment complete!"
echo "🌐 Site should be available at: https://www.hvac35242.com"
echo "🔍 Check logs with: docker logs hvac-prod -f"
echo "📊 Check status with: docker ps"