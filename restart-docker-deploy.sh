#!/bin/bash

# Restart Docker and deploy Birmingham HVAC
echo "🔄 Restarting Docker and deploying Birmingham HVAC..."

SERVER="142.93.194.81"

ssh root@$SERVER << 'EOF'
echo "=== RESTARTING DOCKER SERVICE ==="

# Stop all containers first
echo "Stopping all containers..."
docker stop $(docker ps -aq) 2>/dev/null || true
docker rm $(docker ps -aq) 2>/dev/null || true

# Restart Docker service
echo "Restarting Docker..."
sudo systemctl restart docker
sleep 5

# Verify Docker is running
echo "Checking Docker status..."
sudo systemctl status docker | grep Active

echo -e "\n=== DEPLOYING BIRMINGHAM HVAC ==="

# Navigate to project
cd /root
if [ ! -d "birmingham-hvac" ]; then
    echo "Cloning repository..."
    git clone https://github.com/Tone1965/birmingham-hvac.git
fi

cd birmingham-hvac
git pull

# Build and run
echo "Building Birmingham HVAC..."
docker build -t birmingham-hvac .

echo "Starting Birmingham HVAC on port 80..."
docker run -d \
  --name birmingham-hvac \
  -p 80:3000 \
  --restart always \
  birmingham-hvac

# Verify deployment
echo -e "\n=== VERIFICATION ==="
sleep 5
docker ps
echo -e "\n✅ Docker restarted and Birmingham HVAC deployed!"
echo "🌐 Your site should be live at: http://142.93.194.81"
EOF