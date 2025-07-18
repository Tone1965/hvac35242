#!/bin/bash

# Install Chart.js Dependencies for Birmingham HVAC Project
# This script should be run on the DigitalOcean server (142.93.194.81)

echo "📦 Installing Chart.js dependencies for Birmingham HVAC"
echo "====================================================="

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in the correct directory. Please run from /root/birmingham-hvac"
    exit 1
fi

# Ensure we're in the birmingham-hvac directory
cd /root/birmingham-hvac

# Install dependencies
echo "🔧 Installing Node.js dependencies..."
npm install

# Verify Chart.js installation
echo "✅ Verifying Chart.js installation..."
npm list chart.js
npm list react-chartjs-2

# Check if installations were successful
if npm list chart.js > /dev/null 2>&1; then
    echo "✅ Chart.js successfully installed"
else
    echo "❌ Chart.js installation failed"
    exit 1
fi

if npm list react-chartjs-2 > /dev/null 2>&1; then
    echo "✅ React Chart.js 2 successfully installed"
else
    echo "❌ React Chart.js 2 installation failed"
    exit 1
fi

echo ""
echo "✅ All Chart.js dependencies installed successfully!"
echo "🚀 Ready to deploy with chart functionality"
echo ""
echo "Next steps:"
echo "1. Test development deployment: ./deploy-dev.sh"
echo "2. After verification, deploy to production: ./deploy-prod.sh"