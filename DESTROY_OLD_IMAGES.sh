#!/bin/bash

# DESTROY ALL OLD DOCKER IMAGES
SERVER="142.93.194.81"

echo "💀 DESTROYING ALL OLD DOCKER IMAGES..."

ssh root@$SERVER << 'DESTROY'
echo "=== CURRENT DOCKER IMAGES ==="
docker images

echo -e "\n=== STOPPING EVERYTHING ==="
docker stop $(docker ps -aq) 2>/dev/null || true
docker rm -f $(docker ps -aq) 2>/dev/null || true

echo -e "\n=== HUNTING OLD IMAGES ==="
# List all images with details
docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.ID}}\t{{.CreatedAt}}\t{{.Size}}"

echo -e "\n=== DESTROYING SPECIFIC OLD IMAGES ==="
# Remove by repository name patterns
docker images | grep -E "rank|savvy|agent|ai-|old|app|website" | awk '{print $3}' | xargs -r docker rmi -f
docker images | grep -v "birmingham-hvac" | grep -v "REPOSITORY" | awk '{print $3}' | xargs -r docker rmi -f

echo -e "\n=== FORCE REMOVING ALL IMAGES ==="
# Nuclear option - remove EVERYTHING
docker rmi -f $(docker images -aq) 2>/dev/null || true

echo -e "\n=== CLEANING DOCKER COMPLETELY ==="
# Clean build cache
docker builder prune -af
# Clean everything
docker system prune -af --volumes
# Remove any dangling images
docker image prune -af

echo -e "\n=== VERIFYING CLEAN STATE ==="
echo "Images left:"
docker images
echo -e "\nContainers left:"
docker ps -a

echo -e "\n=== DEPLOYING FRESH BIRMINGHAM HVAC ==="
cd /root
rm -rf birmingham-hvac
git clone https://github.com/Tone1965/birmingham-hvac.git
cd birmingham-hvac

# Build with absolutely no cache
docker build --no-cache --pull -t birmingham-hvac:latest .

# Run it
docker run -d --name birmingham-hvac -p 80:3000 --restart always birmingham-hvac:latest

echo -e "\n=== FINAL STATUS ==="
docker images
docker ps

echo -e "\n✅ ALL OLD IMAGES DESTROYED!"
echo "🆕 Only Birmingham HVAC should be running now"
DESTROY

echo "🌐 Check http://$SERVER (clear cache if needed)"