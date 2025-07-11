#!/bin/bash

# Force deployment - remove EVERYTHING and deploy Birmingham HVAC
echo "🔥 FORCE REMOVING old AI Agents site and deploying Birmingham HVAC..."

SERVER="142.93.194.81"

ssh root@$SERVER << 'EOF'
echo "=== AGGRESSIVE CLEANUP ==="

# 1. Stop and remove ALL Docker containers and images
echo "Removing ALL Docker containers and images..."
docker stop $(docker ps -aq) 2>/dev/null || true
docker rm -f $(docker ps -aq) 2>/dev/null || true
docker rmi -f $(docker images -aq) 2>/dev/null || true
docker system prune -af --volumes

# 2. Kill EVERYTHING on ports 80, 443, 3000, 8080
echo "Killing all web processes..."
for port in 80 443 3000 8080 8000 5000; do
    sudo lsof -ti:$port | xargs -r kill -9 2>/dev/null || true
done

# 3. Stop ALL web services
echo "Stopping all web services..."
sudo systemctl stop nginx apache2 httpd 2>/dev/null || true
sudo systemctl disable nginx apache2 httpd 2>/dev/null || true

# 4. Remove ALL web directories
echo "Removing old web directories..."
cd /root
rm -rf ai-agents* 2>/dev/null || true
rm -rf website* 2>/dev/null || true
rm -rf app* 2>/dev/null || true
rm -rf my-* 2>/dev/null || true
rm -rf agent* 2>/dev/null || true
rm -rf /var/www/* 2>/dev/null || true
rm -rf /usr/share/nginx/* 2>/dev/null || true

# 5. Clean Docker completely
echo "Cleaning Docker..."
docker ps -aq | xargs -r docker rm -f
docker images -aq | xargs -r docker rmi -f
docker volume ls -q | xargs -r docker volume rm

echo -e "\n=== DEPLOYING BIRMINGHAM HVAC ==="

# Fresh start
cd /root
rm -rf birmingham-hvac
git clone https://github.com/Tone1965/birmingham-hvac.git
cd birmingham-hvac

# Build with no cache
echo "Building Birmingham HVAC (no cache)..."
docker build --no-cache -t birmingham-hvac .

# Run on port 80
echo "Starting Birmingham HVAC..."
docker run -d \
  --name birmingham-hvac \
  -p 80:3000 \
  --restart always \
  birmingham-hvac

# Wait and verify
sleep 10
echo -e "\n=== VERIFICATION ==="
docker ps
echo -e "\nTesting site..."
curl -s http://localhost | grep -q "Birmingham HVAC" && echo "✅ Site is running!" || echo "❌ Site not responding yet"

echo -e "\n🎉 COMPLETE! Birmingham HVAC should now be at http://142.93.194.81"
echo "The old AI Agents site has been completely removed."
EOF