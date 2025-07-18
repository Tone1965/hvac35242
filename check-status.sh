#!/bin/bash

# Birmingham HVAC Deployment Status Check Script
# This script should be run on the DigitalOcean server (142.93.194.81)

echo "🔍 Birmingham HVAC Deployment Status Check"
echo "==========================================="

# Check Docker is running
echo "🐳 Docker Status:"
systemctl is-active docker || echo "❌ Docker is not running"

# Check running containers
echo ""
echo "📦 Running Containers:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# Check all containers (including stopped)
echo ""
echo "📦 All Containers:"
docker ps -a --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# Check container resource usage
echo ""
echo "💻 Container Resource Usage:"
docker stats --no-stream

# Check disk usage
echo ""
echo "💾 Disk Usage:"
df -h /

# Check Docker disk usage
echo ""
echo "🐳 Docker Disk Usage:"
docker system df

# Check development site
echo ""
echo "🌐 Development Site Check:"
curl -I -s http://localhost:3002 | head -n 1 || echo "❌ Development site not responding"

# Check production site (local)
echo ""
echo "🌐 Production Site Check (Local):"
curl -I -s http://localhost:3001 | head -n 1 || echo "❌ Production site not responding locally"

# Check production site (HTTPS)
echo ""
echo "🌐 Production Site Check (HTTPS):"
curl -I -s https://www.hvac35242.com | head -n 1 || echo "❌ Production site not responding via HTTPS"

# Check development site (HTTPS)
echo ""
echo "🌐 Development Site Check (HTTPS):"
curl -I -s https://dev.hvac35242.com | head -n 1 || echo "❌ Development site not responding via HTTPS"

# Check recent logs for errors
echo ""
echo "📋 Recent Container Logs (Last 5 lines):"
echo "--- Development Logs ---"
docker logs hvac-dev --tail 5 2>/dev/null || echo "❌ No development container logs"

echo ""
echo "--- Production Logs ---"
docker logs hvac-prod --tail 5 2>/dev/null || echo "❌ No production container logs"

echo ""
echo "--- Nginx Logs ---"
docker logs nginx --tail 5 2>/dev/null || echo "❌ No nginx container logs"

# Check SSL certificates
echo ""
echo "🔒 SSL Certificate Status:"
echo "Checking www.hvac35242.com certificate..."
echo | openssl s_client -servername www.hvac35242.com -connect www.hvac35242.com:443 2>/dev/null | openssl x509 -noout -dates || echo "❌ Could not check SSL certificate"

echo ""
echo "✅ Status check complete!"