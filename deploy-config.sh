#!/bin/bash

# Configurable deployment script
# CHANGE THIS TO YOUR SERVER IP
SERVER_IP="172.XX.XX.XX"  # <- UPDATE THIS WITH YOUR ACTUAL IP

echo "🚀 Deploying Birmingham HVAC to $SERVER_IP..."

# Check if IP is updated
if [[ "$SERVER_IP" == *"XX"* ]]; then
    echo "❌ ERROR: Please update SERVER_IP with your actual server IP address"
    echo "Edit this file and replace 172.XX.XX.XX with your server IP"
    exit 1
fi

ssh root@$SERVER_IP << 'EOF'
echo "=== CLEANING AND DEPLOYING ==="

# Stop and remove all containers
docker stop $(docker ps -aq) 2>/dev/null || true
docker rm -f $(docker ps -aq) 2>/dev/null || true

# Remove old images
docker rmi -f $(docker images -aq) 2>/dev/null || true

# Clean system
docker system prune -af --volumes

# Remove old directories
cd /root
rm -rf ranksavvy* ai-agent* agent* 2>/dev/null || true
rm -rf birmingham-hvac

# Clone and deploy
git clone https://github.com/Tone1965/birmingham-hvac.git
cd birmingham-hvac

# Build and run
docker build --no-cache -t birmingham-hvac .
docker run -d \
  --name birmingham-hvac \
  -p 80:3000 \
  --restart always \
  birmingham-hvac

# Verify
echo -e "\n=== DEPLOYMENT STATUS ==="
docker ps
echo -e "\n✅ Birmingham HVAC deployed!"
EOF

echo "🌐 Your site should be live at: http://$SERVER_IP"