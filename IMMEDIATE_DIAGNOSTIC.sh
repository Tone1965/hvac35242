#!/bin/bash

# IMMEDIATE DIAGNOSTIC - Run this FIRST to see what's happening
# SSH to your server and run: bash IMMEDIATE_DIAGNOSTIC.sh

echo "======================================================"
echo "IMMEDIATE DIAGNOSTIC - WHAT'S REALLY HAPPENING?"
echo "======================================================"
echo ""

# 1. What's the server actually serving?
echo "[1] ACTUAL CONTENT being served:"
echo "======================================================"
curl -s http://localhost | grep -E '<title>|<h1>|<meta name="description"' | head -5
echo ""

# 2. Where is it coming from?
echo "[2] WHO is serving on port 80:"
echo "======================================================"
sudo lsof -i :80 -P -n | grep LISTEN
echo ""

# 3. Check all web roots
echo "[3] CONTENT in web directories:"
echo "======================================================"
echo "--- /var/www/html ---"
ls -la /var/www/html/ 2>/dev/null | head -5
echo ""
echo "--- /usr/share/nginx/html ---"
ls -la /usr/share/nginx/html/ 2>/dev/null | head -5
echo ""

# 4. Docker containers
echo "[4] DOCKER containers:"
echo "======================================================"
docker ps --format "table {{.Names}}\t{{.Image}}\t{{.Ports}}\t{{.Status}}"
echo ""

# 5. Check process details
echo "[5] DETAILED process info for port 80:"
echo "======================================================"
sudo ss -tlnp | grep :80
PID=$(sudo lsof -ti :80)
if [ ! -z "$PID" ]; then
    echo "Process $PID details:"
    ps -fp $PID
    echo "Process working directory:"
    sudo pwdx $PID 2>/dev/null || echo "Cannot determine"
    echo "Process open files:"
    sudo lsof -p $PID 2>/dev/null | grep -E 'html|js|css' | head -10
fi
echo ""

# 6. Recent modifications
echo "[6] RECENTLY modified web files:"
echo "======================================================"
find /var/www /usr/share/nginx /home -name "*.html" -mtime -7 2>/dev/null | head -10
echo ""

# 7. Network connections
echo "[7] ACTIVE connections to port 80:"
echo "======================================================"
sudo netstat -ant | grep :80 | head -5
echo ""

# 8. Check for reverse proxy
echo "[8] REVERSE PROXY or redirects:"
echo "======================================================"
curl -I http://localhost
echo ""

# Quick fix options
echo "======================================================"
echo "QUICK FIX COMMANDS TO TRY:"
echo "======================================================"
echo ""
echo "Option 1 - Kill everything and start fresh:"
echo "  sudo fuser -k 80/tcp && cd /tmp && git clone https://github.com/Tone1965/birmingham-hvac.git && cd birmingham-hvac && sudo python3 -m http.server 80"
echo ""
echo "Option 2 - Use Docker with force:"
echo "  docker stop \$(docker ps -aq) && docker run -d -p 80:80 --name hvac-site nginx"
echo ""
echo "Option 3 - Direct file replacement:"
echo "  sudo rm -rf /var/www/html/* && sudo git clone https://github.com/Tone1965/birmingham-hvac.git /var/www/html/"
echo ""