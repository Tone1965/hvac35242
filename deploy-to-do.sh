#!/bin/bash

# One-click deployment to DigitalOcean
echo "🚀 Deploying Birmingham HVAC to DigitalOcean..."

# Server details
SERVER="142.93.194.81"
REPO="https://github.com/Tone1965/birmingham-hvac.git"

# Deploy
ssh root@$SERVER << 'EOF'
echo "📦 Pulling latest code..."
cd birmingham-hvac 2>/dev/null || git clone https://github.com/Tone1965/birmingham-hvac.git birmingham-hvac
cd birmingham-hvac
git pull

echo "🔨 Building and deploying with Docker..."
docker-compose down
docker-compose up -d --build

echo "✅ Deployment complete!"
docker-compose ps
EOF

echo "🎉 Birmingham HVAC is now live at http://$SERVER"