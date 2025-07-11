#!/bin/bash

# Remove old site and deploy new Birmingham HVAC
echo "🗑️ Removing old site and deploying Birmingham HVAC..."

SERVER="142.93.194.81"

ssh root@$SERVER << 'EOF'
echo "=== REMOVING OLD SITE ==="

# Stop ALL Docker containers
echo "Stopping all Docker containers..."
docker stop $(docker ps -aq) 2>/dev/null || true
docker rm $(docker ps -aq) 2>/dev/null || true

# Remove all Docker images to clean up space
echo "Removing old Docker images..."
docker rmi $(docker images -q) 2>/dev/null || true

# Kill anything on port 80
echo "Killing processes on port 80..."
sudo lsof -ti:80 | xargs -r kill -9 2>/dev/null || true

# Stop any web servers
echo "Stopping any web servers..."
sudo systemctl stop nginx 2>/dev/null || true
sudo systemctl stop apache2 2>/dev/null || true
sudo systemctl stop httpd 2>/dev/null || true

# Remove old project directories (if any)
echo "Cleaning up old projects..."
rm -rf /root/my-app 2>/dev/null || true
rm -rf /root/old-site 2>/dev/null || true
rm -rf /root/website 2>/dev/null || true

echo -e "\n=== DEPLOYING NEW BIRMINGHAM HVAC SITE ==="

# Clone the new site
cd /root
rm -rf birmingham-hvac
git clone https://github.com/Tone1965/birmingham-hvac.git
cd birmingham-hvac

# Build and deploy
echo "Building Birmingham HVAC site..."
docker build -t birmingham-hvac .

echo "Starting new site on port 80..."
docker run -d --name birmingham-hvac -p 80:3000 --restart always birmingham-hvac

# Verify
echo -e "\n=== VERIFICATION ==="
sleep 5
docker ps
echo -e "\n✅ Old site removed! New Birmingham HVAC site deployed!"
echo "🌐 Your site is now live at: http://142.93.194.81"
EOF