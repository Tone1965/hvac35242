#!/bin/bash

# Cleanup and deploy script
echo "🧹 Cleaning up port 80 and deploying Birmingham HVAC..."

SERVER="142.93.194.81"

ssh root@$SERVER << 'EOF'
echo "🔍 Checking what's running on port 80..."
sudo lsof -i :80 || echo "Port 80 is clear"

echo "🛑 Stopping any services on port 80..."
# Stop common services that might be using port 80
sudo systemctl stop nginx 2>/dev/null || true
sudo systemctl stop apache2 2>/dev/null || true
docker ps -q --filter "publish=80" | xargs -r docker stop
docker ps -aq --filter "publish=80" | xargs -r docker rm

echo "📦 Deploying Birmingham HVAC..."
cd birmingham-hvac 2>/dev/null || git clone https://github.com/Tone1965/birmingham-hvac.git birmingham-hvac
cd birmingham-hvac
git pull
docker-compose down
docker-compose up -d --build

echo "✅ Deployment complete!"
docker-compose ps
echo "🌐 Birmingham HVAC (40 pages) is now live at http://142.93.194.81"
EOF