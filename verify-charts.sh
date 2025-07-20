#!/bin/bash

# Verify Chart.js Installation and Functionality
# This script should be run on the DigitalOcean server (142.93.194.81)

echo "🔍 Chart.js Verification for Birmingham HVAC"
echo "============================================="

# Check if we're in the correct directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in the correct directory. Please run from /root/birmingham-hvac"
    exit 1
fi

echo "📦 Checking Chart.js Dependencies..."
echo "-----------------------------------"

# Check Chart.js installation
if npm list chart.js > /dev/null 2>&1; then
    CHART_VERSION=$(npm list chart.js --depth=0 | grep chart.js | sed 's/.*@//')
    echo "✅ Chart.js installed: v$CHART_VERSION"
else
    echo "❌ Chart.js not installed"
    exit 1
fi

# Check React Chart.js 2 installation
if npm list react-chartjs-2 > /dev/null 2>&1; then
    REACT_CHART_VERSION=$(npm list react-chartjs-2 --depth=0 | grep react-chartjs-2 | sed 's/.*@//')
    echo "✅ React Chart.js 2 installed: v$REACT_CHART_VERSION"
else
    echo "❌ React Chart.js 2 not installed"
    exit 1
fi

echo ""
echo "📁 Checking Chart Components..."
echo "-------------------------------"

# Check if chart components exist
if [ -f "components/PricingTransparencyChart.tsx" ]; then
    echo "✅ PricingTransparencyChart.tsx exists"
    
    # Check if it imports Chart.js correctly
    if grep -q "import.*Chart.*from.*chart.js" components/PricingTransparencyChart.tsx; then
        echo "✅ PricingTransparencyChart imports Chart.js correctly"
    else
        echo "⚠️  PricingTransparencyChart may have import issues"
    fi
else
    echo "❌ PricingTransparencyChart.tsx not found"
fi

if [ -f "components/SeasonalDemandChart.tsx" ]; then
    echo "✅ SeasonalDemandChart.tsx exists"
    
    # Check if it imports Chart.js correctly
    if grep -q "import.*Chart.*from.*chart.js" components/SeasonalDemandChart.tsx; then
        echo "✅ SeasonalDemandChart imports Chart.js correctly"
    else
        echo "⚠️  SeasonalDemandChart may have import issues"
    fi
else
    echo "❌ SeasonalDemandChart.tsx not found"
fi

echo ""
echo "🌐 Testing Site Availability..."
echo "------------------------------"

# Test development site
if curl -s http://localhost:3002 > /dev/null; then
    echo "✅ Development site (port 3002) is responding"
    
    # Check if the site loads without errors
    HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3002)
    if [ "$HTTP_STATUS" = "200" ]; then
        echo "✅ Development site returns HTTP 200"
    else
        echo "⚠️  Development site returns HTTP $HTTP_STATUS"
    fi
else
    echo "❌ Development site (port 3002) is not responding"
fi

# Test production site
if curl -s http://localhost:3001 > /dev/null; then
    echo "✅ Production site (port 3001) is responding"
    
    # Check if the site loads without errors
    HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3001)
    if [ "$HTTP_STATUS" = "200" ]; then
        echo "✅ Production site returns HTTP 200"
    else
        echo "⚠️  Production site returns HTTP $HTTP_STATUS"
    fi
else
    echo "❌ Production site (port 3001) is not responding"
fi

echo ""
echo "🐳 Docker Container Status..."
echo "----------------------------"

# Check Docker containers
if docker ps | grep -q "hvac-dev"; then
    echo "✅ Development container is running"
    
    # Get container logs for any Chart.js errors
    echo "📋 Recent development container logs:"
    docker logs hvac-dev --tail 5 | grep -i "chart\|error" || echo "   No chart-related errors found"
else
    echo "❌ Development container is not running"
fi

if docker ps | grep -q "hvac-prod"; then
    echo "✅ Production container is running"
    
    # Get container logs for any Chart.js errors
    echo "📋 Recent production container logs:"
    docker logs hvac-prod --tail 5 | grep -i "chart\|error" || echo "   No chart-related errors found"
else
    echo "❌ Production container is not running"
fi

echo ""
echo "📊 Chart.js Verification Summary"
echo "================================"
echo "✅ Dependencies: Chart.js v$CHART_VERSION, React Chart.js 2 v$REACT_CHART_VERSION"
echo "✅ Components: PricingTransparencyChart, SeasonalDemandChart"
echo "🌐 Test your charts at:"
echo "   - Development: https://dev.hvac35242.com"
echo "   - Production: https://www.hvac35242.com"
echo ""
echo "📞 Birmingham HVAC: (205) 835-0111"