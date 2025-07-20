#!/bin/bash

# Birmingham HVAC Production Rollback Script
# This script should be run on the DigitalOcean server (142.93.194.81)
# Usage: ./rollback-prod.sh [rollback_tag]

echo "🔄 Starting Birmingham HVAC Production Rollback"
echo "================================================"

# Check if we're in the correct directory
if [ ! -f "docker-compose.prod.yml" ]; then
    echo "❌ Error: Not in the correct directory. Please run from /root/birmingham-hvac"
    exit 1
fi

# Check if rollback tag is provided
if [ -z "$1" ]; then
    echo "❌ Error: No rollback tag provided"
    echo "Usage: ./rollback-prod.sh [rollback_tag]"
    echo ""
    echo "Available rollback tags:"
    docker images | grep "birmingham-hvac-hvac-prod" | grep "rollback_"
    exit 1
fi

ROLLBACK_TAG=$1

# Verify rollback image exists
if ! docker images | grep -q "birmingham-hvac-hvac-prod:$ROLLBACK_TAG"; then
    echo "❌ Error: Rollback image not found: birmingham-hvac-hvac-prod:$ROLLBACK_TAG"
    echo ""
    echo "Available rollback tags:"
    docker images | grep "birmingham-hvac-hvac-prod" | grep "rollback_"
    exit 1
fi

# Confirmation prompt
echo "⚠️  You are about to rollback production to: $ROLLBACK_TAG"
read -p "Are you sure you want to proceed? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Rollback cancelled"
    exit 1
fi

# Stop current production container
echo "🛑 Stopping current production container..."
docker-compose -f docker-compose.prod.yml down

# Tag rollback image as latest
echo "📦 Tagging rollback image as latest..."
docker tag birmingham-hvac-hvac-prod:$ROLLBACK_TAG birmingham-hvac-hvac-prod:latest

# Start production container with rollback image
echo "🚀 Starting production container with rollback image..."
docker-compose -f docker-compose.prod.yml up -d

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

# Test the production site
echo "🌐 Testing production site..."
curl -I http://localhost:3001 || echo "❌ Production site not responding on port 3001"
curl -I https://www.hvac35242.com || echo "❌ Production site not responding via HTTPS"

echo ""
echo "✅ Production rollback complete!"
echo "🌐 Site should be available at: https://www.hvac35242.com"
echo "🔍 Check logs with: docker logs hvac-prod -f"
echo "📊 Check status with: docker ps"
echo "📝 Rolled back to: $ROLLBACK_TAG"