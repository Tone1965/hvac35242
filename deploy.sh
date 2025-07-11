#!/bin/bash

# Deploy HVAC site to DigitalOcean
SERVER="142.93.194.81"
PROJECT_NAME="birmingham-hvac"

echo "🚀 Deploying Birmingham HVAC to $SERVER..."

# Build the Docker image locally
echo "📦 Building Docker image..."
docker build -t $PROJECT_NAME:latest .

# Save the image
echo "💾 Saving Docker image..."
docker save $PROJECT_NAME:latest | gzip > $PROJECT_NAME.tar.gz

# Transfer to server
echo "📡 Transferring to server..."
scp $PROJECT_NAME.tar.gz root@$SERVER:/tmp/

# Deploy on server
echo "🔧 Deploying on server..."
ssh root@$SERVER << 'ENDSSH'
cd /tmp
docker load < birmingham-hvac.tar.gz
docker stop birmingham-hvac 2>/dev/null || true
docker rm birmingham-hvac 2>/dev/null || true
docker run -d --name birmingham-hvac -p 80:3000 --restart always birmingham-hvac:latest
rm /tmp/birmingham-hvac.tar.gz
echo "✅ Deployment complete!"
docker ps | grep birmingham-hvac
ENDSSH

# Cleanup
rm $PROJECT_NAME.tar.gz

echo "🎉 Birmingham HVAC deployed successfully to $SERVER!"