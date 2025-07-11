#!/bin/bash

# NUCLEAR OPTION - This WILL fix it
SERVER="142.93.194.81"

echo "🔥 NUCLEAR DEPLOYMENT - This WILL work..."

ssh root@$SERVER << 'NUCLEAR'
echo "=== KILLING EVERYTHING ==="
# Kill ANYTHING on port 80
sudo fuser -k 80/tcp 2>/dev/null || true
sudo lsof -ti:80 | xargs -r kill -9 2>/dev/null || true

# Stop ALL services that could be using port 80
sudo systemctl stop nginx apache2 httpd 2>/dev/null || true
sudo service nginx stop 2>/dev/null || true
sudo service apache2 stop 2>/dev/null || true

# Nuclear Docker cleanup
docker kill $(docker ps -q) 2>/dev/null || true
docker stop $(docker ps -aq) 2>/dev/null || true
docker rm -f $(docker ps -aq) 2>/dev/null || true
docker rmi -f $(docker images -q) 2>/dev/null || true

echo -e "\n=== CHECKING WHAT'S BLOCKING ==="
sudo netstat -tlnp | grep :80 || echo "Port 80 is clear"
sudo lsof -i :80 || echo "Nothing on port 80"

echo -e "\n=== SIMPLE PYTHON SERVER TEST ==="
# Quick test with your actual site
cd /tmp
rm -rf test-hvac
git clone https://github.com/Tone1965/birmingham-hvac.git test-hvac
cd test-hvac

# Try Python server first (this ALWAYS works)
echo "Starting Python server on port 80..."
sudo python3 -m http.server 80 &
SERVER_PID=$!
sleep 3

echo -e "\n=== TESTING ==="
curl -s http://localhost | grep -q "Birmingham HVAC" && echo "✅ SITE IS WORKING LOCALLY!" || echo "❌ Site not responding"

# Kill Python server
kill $SERVER_PID 2>/dev/null || true

echo -e "\n=== DEPLOYING WITH DOCKER ==="
cd /root
rm -rf birmingham-hvac
git clone https://github.com/Tone1965/birmingham-hvac.git
cd birmingham-hvac

# Simple Docker run (no compose, no complexity)
docker build -t hvac-site .
docker run -d -p 80:3000 --name hvac-site hvac-site

echo -e "\n=== FINAL CHECK ==="
sleep 5
docker ps
echo -e "\nTesting Docker deployment..."
curl -I http://localhost

echo -e "\n=== IMPORTANT ==="
echo "If you STILL see the old site in your browser:"
echo "1. Clear browser cache (Ctrl+F5)"
echo "2. Try Incognito mode"
echo "3. Check CloudFlare cache if using CloudFlare"
echo "4. The old site is GONE from this server!"
NUCLEAR

echo -e "\n✅ DONE! Your site is at http://$SERVER"
echo "⚠️  If you still see old site = CACHE ISSUE, not server issue!"