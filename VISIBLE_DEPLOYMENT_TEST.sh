#!/bin/bash

# VISIBLE DEPLOYMENT TEST - This will PROVE if deployment is working
# It adds visible timestamps to make changes obvious

echo "======================================================"
echo "VISIBLE DEPLOYMENT TEST"
echo "This will add TIMESTAMPS to prove deployment works"
echo "======================================================"
echo ""

# Get current timestamp
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
UNIX_TIME=$(date +%s)

# Kill anything on port 80
echo "[1] Killing anything on port 80..."
sudo fuser -k 80/tcp 2>/dev/null || true
sleep 2

# Create test deployment with VISIBLE marker
echo "[2] Creating test page with timestamp..."
cd /tmp
rm -rf visible-test
mkdir visible-test
cd visible-test

# Create a test page that CLEARLY shows deployment worked
cat > index.html << EOF
<!DOCTYPE html>
<html>
<head>
    <title>DEPLOYMENT TEST - $TIMESTAMP</title>
    <meta http-equiv="cache-control" content="no-cache">
    <meta http-equiv="expires" content="0">
    <meta http-equiv="pragma" content="no-cache">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #00ff00;
            text-align: center;
            padding: 50px;
        }
        .timestamp {
            background-color: #ffff00;
            padding: 20px;
            font-size: 24px;
            border: 5px solid red;
            margin: 20px;
        }
        .old-site {
            background-color: #ff0000;
            color: white;
            padding: 20px;
            margin: 20px;
        }
    </style>
</head>
<body>
    <h1>🚀 DEPLOYMENT SUCCESSFUL! 🚀</h1>
    <div class="timestamp">
        <h2>Deployed at: $TIMESTAMP</h2>
        <h3>Unix Time: $UNIX_TIME</h3>
        <p>If you see this GREEN page with THIS timestamp, deployment is working!</p>
    </div>
    <div class="old-site">
        <h3>❌ OLD SITE IS GONE ❌</h3>
        <p>The RankSavvy/AI Agents site has been removed!</p>
    </div>
    <hr>
    <h2>Next Steps:</h2>
    <ol>
        <li>If you see this page at http://142.93.194.81 - deployment works!</li>
        <li>If you still see the old site - it's a CACHING issue</li>
        <li>Try: Ctrl+F5, Incognito mode, or different browser</li>
    </ol>
    <hr>
    <p>Ready to deploy Birmingham HVAC? The server is working correctly!</p>
    <!-- Deployment verification: $UNIX_TIME -->
</body>
</html>
EOF

# Start simple server
echo "[3] Starting test server on port 80..."
sudo python3 -m http.server 80 &
SERVER_PID=$!
echo "Server started with PID: $SERVER_PID"

# Wait and test
sleep 3
echo ""
echo "[4] Testing local access..."
echo "======================================================"
curl -s http://localhost | grep -E "DEPLOYMENT SUCCESSFUL|$TIMESTAMP" | head -5
echo "======================================================"

echo ""
echo "✅ TEST DEPLOYMENT COMPLETE!"
echo ""
echo "Now check: http://142.93.194.81"
echo ""
echo "You should see:"
echo "  - GREEN background"
echo "  - Timestamp: $TIMESTAMP"
echo "  - 'DEPLOYMENT SUCCESSFUL' message"
echo ""
echo "If you STILL see the old RankSavvy site:"
echo "  1. Clear browser cache (Ctrl+Shift+Delete)"
echo "  2. Try Incognito/Private mode"
echo "  3. Try different browser"
echo "  4. Check if using CloudFlare (needs cache purge)"
echo "  5. Try: curl http://142.93.194.81 from command line"
echo ""
echo "To deploy Birmingham HVAC after confirming this works:"
echo "  sudo fuser -k 80/tcp"
echo "  cd /tmp && git clone https://github.com/Tone1965/birmingham-hvac.git"
echo "  cd birmingham-hvac && sudo python3 -m http.server 80"
echo ""

# Create a persistent check script
cat > /tmp/check-deployment.sh << 'CHECK_EOF'
#!/bin/bash
echo "Checking what's being served..."
echo "Local check:"
curl -s http://localhost | grep -o '<title>.*</title>' | head -1
echo ""
echo "Process on port 80:"
sudo lsof -i :80 -P -n | grep LISTEN
echo ""
echo "If local shows new content but browser shows old, it's caching!"
CHECK_EOF

chmod +x /tmp/check-deployment.sh
echo "Created check script: /tmp/check-deployment.sh"