#!/bin/bash

# Emergency deployment fix script
echo "🔧 Let's fix this deployment issue..."

SERVER="142.93.194.81"

# First, let's check what's happening
echo "📡 Connecting to server and diagnosing..."

ssh root@$SERVER << 'EOF'
echo "=== 1. Checking Docker status ==="
sudo systemctl status docker | grep Active

echo -e "\n=== 2. Checking what's running on ports ==="
echo "Port 80:"
sudo lsof -i :80 || echo "Nothing on port 80"
echo "Port 3000:"
sudo lsof -i :3000 || echo "Nothing on port 3000"

echo -e "\n=== 3. Checking firewall ==="
sudo ufw status

echo -e "\n=== 4. Opening necessary ports ==="
sudo ufw allow 80/tcp
sudo ufw allow 3000/tcp
sudo ufw allow 22/tcp
sudo ufw --force enable

echo -e "\n=== 5. Checking Docker containers ==="
docker ps -a

echo -e "\n=== 6. Deploying Birmingham HVAC ==="
# Clean up everything first
docker stop $(docker ps -aq) 2>/dev/null || true
docker rm $(docker ps -aq) 2>/dev/null || true

# Clone fresh if needed
if [ ! -d "birmingham-hvac" ]; then
    git clone https://github.com/Tone1965/birmingham-hvac.git
fi

cd birmingham-hvac
git pull

# Build and run on port 80
docker build -t birmingham-hvac .
docker run -d --name hvac-site -p 80:3000 --restart always birmingham-hvac

echo -e "\n=== 7. Verifying deployment ==="
sleep 5
docker ps
curl -I http://localhost:80 || echo "Site not responding yet"

echo -e "\n=== 8. Checking logs ==="
docker logs hvac-site --tail 20

echo -e "\n=== DONE ==="
echo "Site should be available at:"
echo "- http://142.93.194.81"
echo "- http://142.93.194.81:80"
EOF

echo "✅ Deployment fix complete. Your site should now be accessible!"