#!/bin/bash

# Direct fix - remove old site, deploy Birmingham HVAC
SERVER="142.93.194.81"

echo "🔧 Fixing deployment on $SERVER..."

ssh root@$SERVER << 'EOF'
# Kill everything on port 80
sudo lsof -ti:80 | xargs -r kill -9

# Stop all Docker
docker kill $(docker ps -q) 2>/dev/null
docker rm -f $(docker ps -aq) 2>/dev/null
docker rmi -f $(docker images -q) 2>/dev/null

# Deploy Birmingham HVAC
cd /root
rm -rf birmingham-hvac
git clone https://github.com/Tone1965/birmingham-hvac.git
cd birmingham-hvac
docker build -t hvac .
docker run -d -p 80:3000 --name hvac --restart always hvac

# Check
sleep 5
docker ps
curl -I http://localhost
EOF

echo "✅ Fixed! Check http://142.93.194.81"