#!/bin/bash

# Deep clean Docker - remove ALL RankSavvy traces
echo "🧹 DEEP CLEANING: Removing all RankSavvy content from Docker..."

SERVER="142.93.194.81"

ssh root@$SERVER << 'EOF'
echo "=== DEEP DOCKER CLEANUP - REMOVING RANKSAVVY ==="

# 1. Stop ALL containers
echo "Stopping ALL Docker containers..."
docker stop $(docker ps -aq) 2>/dev/null || true

# 2. Remove ALL containers
echo "Removing ALL Docker containers..."
docker rm -f $(docker ps -aq) 2>/dev/null || true

# 3. List and remove RankSavvy images
echo -e "\n=== Searching for RankSavvy images ==="
docker images | grep -i rank || echo "No RankSavvy images found"
docker images | grep -i savvy || echo "No Savvy images found"
docker images | grep -i ai-agent || echo "No AI Agent images found"
docker images | grep -i agent || echo "No Agent images found"

# Remove any found images
docker images | grep -i rank | awk '{print $3}' | xargs -r docker rmi -f 2>/dev/null || true
docker images | grep -i savvy | awk '{print $3}' | xargs -r docker rmi -f 2>/dev/null || true
docker images | grep -i ai-agent | awk '{print $3}' | xargs -r docker rmi -f 2>/dev/null || true
docker images | grep -i agent | awk '{print $3}' | xargs -r docker rmi -f 2>/dev/null || true

# 4. Remove ALL Docker images
echo -e "\nRemoving ALL Docker images..."
docker rmi -f $(docker images -aq) 2>/dev/null || true

# 5. Clean Docker volumes
echo -e "\nRemoving Docker volumes..."
docker volume rm $(docker volume ls -q) 2>/dev/null || true

# 6. Deep system prune
echo -e "\nPerforming deep Docker system prune..."
docker system prune -af --volumes

# 7. Remove RankSavvy directories
echo -e "\n=== Removing RankSavvy directories ==="
cd /root
find . -type d -iname "*rank*" -exec rm -rf {} + 2>/dev/null || true
find . -type d -iname "*savvy*" -exec rm -rf {} + 2>/dev/null || true
find . -type d -iname "*ai-agent*" -exec rm -rf {} + 2>/dev/null || true
rm -rf ranksavvy* 2>/dev/null || true
rm -rf rank-savvy* 2>/dev/null || true
rm -rf ai-agents* 2>/dev/null || true
rm -rf agent* 2>/dev/null || true

# 8. Check what's left
echo -e "\n=== Current Docker status ==="
echo "Images:"
docker images
echo -e "\nContainers:"
docker ps -a
echo -e "\nVolumes:"
docker volume ls

# 9. Clean up old Birmingham HVAC too
echo -e "\n=== Cleaning up for fresh deployment ==="
rm -rf birmingham-hvac

# 10. Clone and deploy Birmingham HVAC fresh
echo -e "\n=== Deploying Birmingham HVAC ==="
git clone https://github.com/Tone1965/birmingham-hvac.git
cd birmingham-hvac

# Build fresh
docker build --no-cache -t birmingham-hvac .

# Run on port 80
docker run -d \
  --name birmingham-hvac \
  -p 80:3000 \
  --restart always \
  birmingham-hvac

echo -e "\n=== FINAL STATUS ==="
docker ps
echo -e "\n✅ DEEP CLEAN COMPLETE!"
echo "🗑️  All RankSavvy content removed"
echo "🌐 Birmingham HVAC deployed at: http://142.93.194.81"
EOF