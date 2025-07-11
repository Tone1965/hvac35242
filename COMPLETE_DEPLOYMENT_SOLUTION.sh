#!/bin/bash

# COMPLETE DEPLOYMENT SOLUTION FOR BIRMINGHAM HVAC SITE
# This script will thoroughly clean the server and deploy the new site
# Server: 142.93.194.81

set -e  # Exit on any error

echo "================================================"
echo "COMPLETE DEPLOYMENT SOLUTION - BIRMINGHAM HVAC"
echo "================================================"
echo ""

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[STATUS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# STEP 1: COMPREHENSIVE SYSTEM DIAGNOSIS
print_status "Starting comprehensive system diagnosis..."
echo ""

# Check what's using port 80 and 443
print_status "Checking what's using port 80..."
sudo lsof -i :80 || echo "Port 80 is free"
echo ""

print_status "Checking what's using port 443..."
sudo lsof -i :443 || echo "Port 443 is free"
echo ""

# Check all running Docker containers
print_status "Listing all Docker containers (running and stopped)..."
docker ps -a
echo ""

# Check Docker images
print_status "Listing all Docker images..."
docker images
echo ""

# Check if nginx is installed and running outside Docker
print_status "Checking for nginx outside Docker..."
systemctl status nginx 2>/dev/null || echo "Nginx not running as system service"
echo ""

# Check if Apache is installed and running
print_status "Checking for Apache..."
systemctl status apache2 2>/dev/null || echo "Apache not running"
echo ""

# Check all listening ports
print_status "All listening ports on the system..."
sudo netstat -tlnp || sudo ss -tlnp
echo ""

# STEP 2: COMPLETE CLEANUP
print_warning "Starting complete cleanup process..."
echo ""

# Stop all Docker containers
print_status "Stopping ALL Docker containers..."
docker stop $(docker ps -aq) 2>/dev/null || echo "No containers to stop"
echo ""

# Remove all Docker containers
print_status "Removing ALL Docker containers..."
docker rm $(docker ps -aq) 2>/dev/null || echo "No containers to remove"
echo ""

# Remove Docker images related to old projects
print_status "Removing old Docker images..."
docker rmi $(docker images -q) 2>/dev/null || echo "No images to remove"
echo ""

# Prune Docker system
print_status "Pruning Docker system..."
docker system prune -af --volumes
echo ""

# Stop nginx if running as system service
print_status "Stopping nginx system service if running..."
sudo systemctl stop nginx 2>/dev/null || echo "Nginx not running"
sudo systemctl disable nginx 2>/dev/null || echo "Nginx not installed"
echo ""

# Stop Apache if running
print_status "Stopping Apache if running..."
sudo systemctl stop apache2 2>/dev/null || echo "Apache not running"
sudo systemctl disable apache2 2>/dev/null || echo "Apache not installed"
echo ""

# Kill any process using port 80 or 443
print_status "Killing any remaining processes on ports 80/443..."
sudo fuser -k 80/tcp 2>/dev/null || echo "No process on port 80"
sudo fuser -k 443/tcp 2>/dev/null || echo "No process on port 443"
echo ""

# Clear any old deployment directories
print_status "Cleaning deployment directories..."
sudo rm -rf /var/www/html/* 2>/dev/null || echo "No old web files"
sudo rm -rf /app/* 2>/dev/null || echo "No old app files"
sudo rm -rf ~/ranksavvy* 2>/dev/null || echo "No old RankSavvy files"
sudo rm -rf ~/ai-agents* 2>/dev/null || echo "No old AI Agents files"
echo ""

# STEP 3: DEPLOY BIRMINGHAM HVAC SITE
print_success "Starting Birmingham HVAC deployment..."
echo ""

# Create deployment directory
print_status "Creating deployment directory..."
mkdir -p ~/birmingham-hvac-deployment
cd ~/birmingham-hvac-deployment
echo ""

# Clone the repository
print_status "Cloning Birmingham HVAC repository..."
rm -rf birmingham-hvac
git clone https://github.com/Tone1965/birmingham-hvac.git
cd birmingham-hvac
echo ""

# Check if it's a static site or needs build process
print_status "Checking project structure..."
if [ -f "package.json" ]; then
    echo "Node.js project detected"
    PROJECT_TYPE="nodejs"
elif [ -f "requirements.txt" ]; then
    echo "Python project detected"
    PROJECT_TYPE="python"
elif [ -f "index.html" ]; then
    echo "Static HTML project detected"
    PROJECT_TYPE="static"
else
    echo "Project type unclear, checking for Docker configuration..."
    PROJECT_TYPE="unknown"
fi
echo ""

# Create appropriate Dockerfile if none exists
if [ ! -f "Dockerfile" ]; then
    print_status "Creating Dockerfile..."
    
    if [ "$PROJECT_TYPE" == "nodejs" ]; then
        cat > Dockerfile << 'EOF'
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build || echo "No build script"

EXPOSE 3000

CMD ["npm", "start"]
EOF
    elif [ "$PROJECT_TYPE" == "static" ]; then
        cat > Dockerfile << 'EOF'
FROM nginx:alpine

# Remove default nginx config
RUN rm -rf /usr/share/nginx/html/*

# Copy static files
COPY . /usr/share/nginx/html/

# Copy nginx config if exists, otherwise use default
COPY nginx.conf /etc/nginx/nginx.conf || true

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
EOF
    else
        cat > Dockerfile << 'EOF'
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

# Remove default nginx files
RUN rm -rf ./*

# Copy all files
COPY . .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
EOF
    fi
fi

# Create nginx.conf if it doesn't exist
if [ ! -f "nginx.conf" ] && [ "$PROJECT_TYPE" == "static" ]; then
    print_status "Creating nginx configuration..."
    cat > nginx.conf << 'EOF'
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    server {
        listen 80;
        server_name _;
        
        root /usr/share/nginx/html;
        index index.html index.htm;
        
        location / {
            try_files $uri $uri/ /index.html;
        }
        
        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
    }
}
EOF
fi

# Build Docker image
print_status "Building Docker image..."
docker build -t birmingham-hvac:latest .
echo ""

# Run the container
print_status "Starting Birmingham HVAC container..."
docker run -d \
    --name birmingham-hvac \
    --restart always \
    -p 80:80 \
    -p 443:443 \
    birmingham-hvac:latest
echo ""

# STEP 4: VERIFICATION
print_success "Deployment complete! Running verification..."
echo ""

# Check if container is running
print_status "Checking container status..."
docker ps | grep birmingham-hvac
echo ""

# Check ports again
print_status "Verifying port bindings..."
sudo netstat -tlnp | grep -E ':80|:443'
echo ""

# Test the site
print_status "Testing site availability..."
curl -I http://localhost || print_error "Site not responding on port 80"
echo ""

# Create systemd service for auto-start
print_status "Creating systemd service for auto-start..."
sudo tee /etc/systemd/system/birmingham-hvac.service > /dev/null << 'EOF'
[Unit]
Description=Birmingham HVAC Docker Container
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
ExecStart=/usr/bin/docker start birmingham-hvac
ExecStop=/usr/bin/docker stop birmingham-hvac

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable birmingham-hvac.service
echo ""

# STEP 5: FIREWALL CONFIGURATION
print_status "Configuring firewall..."
sudo ufw allow 80/tcp 2>/dev/null || echo "UFW not configured"
sudo ufw allow 443/tcp 2>/dev/null || echo "UFW not configured"
echo ""

# STEP 6: FINAL REPORT
echo ""
echo "================================================"
echo "DEPLOYMENT COMPLETE - FINAL REPORT"
echo "================================================"
echo ""
print_success "Birmingham HVAC site should now be running on:"
echo "  - http://142.93.194.81"
echo "  - http://localhost (on the server)"
echo ""
echo "Container name: birmingham-hvac"
echo "Docker image: birmingham-hvac:latest"
echo ""
echo "To check logs: docker logs birmingham-hvac"
echo "To restart: docker restart birmingham-hvac"
echo "To stop: docker stop birmingham-hvac"
echo ""

# Additional debugging info
print_status "Current Docker status:"
docker ps --format "table {{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}"
echo ""

# Test from the server
print_status "Testing site content..."
curl -s http://localhost | head -20 || echo "Could not fetch site content"
echo ""

print_success "Deployment script completed!"
echo ""
echo "If the site is still showing the old content:"
echo "1. Clear your browser cache completely"
echo "2. Try accessing in incognito/private mode"
echo "3. Check DNS propagation if using a domain"
echo "4. Run: docker logs birmingham-hvac"
echo ""