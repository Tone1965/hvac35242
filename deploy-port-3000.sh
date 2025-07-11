#!/bin/bash

# Deploy to port 3000 after cleanup
echo "🧹 Cleaning up port 3000 and deploying Birmingham HVAC..."

SERVER="142.93.194.81"

ssh root@$SERVER << 'EOF'
echo "🔍 Checking what's running on port 3000..."
sudo lsof -i :3000 || echo "Port 3000 is clear"

echo "🛑 Stopping any services on port 3000..."
# Kill any process using port 3000
sudo lsof -ti:3000 | xargs -r kill -9
# Stop any docker containers using port 3000
docker ps -q --filter "publish=3000" | xargs -r docker stop
docker ps -aq --filter "publish=3000" | xargs -r docker rm

echo "📦 Deploying Birmingham HVAC to port 3000..."
cd birmingham-hvac 2>/dev/null || git clone https://github.com/Tone1965/birmingham-hvac.git birmingham-hvac
cd birmingham-hvac
git pull

# Update docker-compose to use port 3000
cat > docker-compose-3000.yml << 'COMPOSE'
version: '3.8'

services:
  hvac-site:
    build: .
    container_name: birmingham-hvac
    ports:
      - "3000:3000"
    restart: always
    environment:
      - NODE_ENV=production
    networks:
      - hvac-network

networks:
  hvac-network:
    driver: bridge
COMPOSE

# Deploy using the new config
docker-compose -f docker-compose-3000.yml down
docker-compose -f docker-compose-3000.yml up -d --build

echo "✅ Deployment complete!"
docker-compose -f docker-compose-3000.yml ps
echo "🌐 Birmingham HVAC is now live at http://142.93.194.81:3000"
EOF