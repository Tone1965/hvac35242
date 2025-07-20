#!/bin/bash

# Deploy Chart.js Updates for Birmingham HVAC Project
# This script should be run on the DigitalOcean server (142.93.194.81)

echo "📈 Deploying Chart.js Updates for Birmingham HVAC"
echo "================================================="

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in the correct directory. Please run from /root/birmingham-hvac"
    exit 1
fi

# Ensure we're in the birmingham-hvac directory
cd /root/birmingham-hvac

# Show current Chart.js status
echo "🔍 Checking current Chart.js dependencies..."
npm list chart.js || echo "Chart.js not currently installed"
npm list react-chartjs-2 || echo "React Chart.js 2 not currently installed"

echo ""
echo "📦 Installing Chart.js dependencies..."
npm install chart.js@^4.4.0 react-chartjs-2@^5.2.0

# Verify installations
echo ""
echo "✅ Verifying Chart.js installations..."
if npm list chart.js > /dev/null 2>&1; then
    echo "✅ Chart.js successfully installed: $(npm list chart.js --depth=0 | grep chart.js)"
else
    echo "❌ Chart.js installation failed"
    exit 1
fi

if npm list react-chartjs-2 > /dev/null 2>&1; then
    echo "✅ React Chart.js 2 successfully installed: $(npm list react-chartjs-2 --depth=0 | grep react-chartjs-2)"
else
    echo "❌ React Chart.js 2 installation failed"
    exit 1
fi

echo ""
echo "🚀 Deploying to development environment..."
./deploy-dev.sh

echo ""
echo "⏳ Waiting for development deployment to complete..."
sleep 20

echo ""
echo "🧪 Testing Chart.js functionality..."
# Test if the development site is responding
if curl -s http://localhost:3002 > /dev/null; then
    echo "✅ Development site is responding"
    
    # Check if Chart.js is loading (basic test)
    if curl -s http://localhost:3002 | grep -q "chart"; then
        echo "✅ Chart-related content detected on development site"
    else
        echo "⚠️  No chart-related content detected (this may be normal if charts load dynamically)"
    fi
else
    echo "❌ Development site is not responding"
    exit 1
fi

echo ""
echo "✅ Chart.js deployment complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Test charts manually at: https://dev.hvac35242.com"
echo "2. Verify PricingTransparencyChart and SeasonalDemandChart components work"
echo "3. If all tests pass, deploy to production: ./deploy-prod.sh"
echo ""
echo "📊 Chart components available:"
echo "   - PricingTransparencyChart (Bar chart showing service pricing)"
echo "   - SeasonalDemandChart (Line chart showing seasonal demand)"
echo ""
echo "📞 Birmingham HVAC Support: (205) 835-0111"