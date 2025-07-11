#!/bin/bash

# Find EXACTLY what's running the old site
SERVER="142.93.194.81"

echo "🔍 FINDING THE OLD SITE..."

ssh root@$SERVER << 'FIND'
echo "=== WHAT'S ON PORT 80? ==="
sudo lsof -i :80
sudo netstat -tlnp | grep :80

echo -e "\n=== ALL DOCKER CONTAINERS ==="
docker ps --format "table {{.Names}}\t{{.Image}}\t{{.Ports}}\t{{.Status}}"

echo -e "\n=== ALL DOCKER IMAGES (with dates) ==="
docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.ID}}\t{{.CreatedAt}}"

echo -e "\n=== PROCESSES USING PORT 80 ==="
sudo ss -tlnp | grep :80

echo -e "\n=== KILLING THE OLD SITE ==="
# Get container using port 80
CONTAINER_ID=$(docker ps --format "{{.ID}}\t{{.Ports}}" | grep "0.0.0.0:80" | cut -f1)
if [ ! -z "$CONTAINER_ID" ]; then
    echo "Found container on port 80: $CONTAINER_ID"
    docker stop $CONTAINER_ID
    docker rm -f $CONTAINER_ID
    # Get its image
    IMAGE_ID=$(docker ps -a --filter "id=$CONTAINER_ID" --format "{{.Image}}")
    echo "Removing image: $IMAGE_ID"
    docker rmi -f $IMAGE_ID
else
    echo "No Docker container found on port 80"
fi

# Kill any non-Docker process on port 80
sudo fuser -k 80/tcp

echo -e "\n=== REMOVING ALL NON-BIRMINGHAM IMAGES ==="
# Remove everything except birmingham-hvac
docker images | grep -v "birmingham-hvac" | grep -v "REPOSITORY" | awk '{print $3}' | sort -u | xargs -r docker rmi -f

echo -e "\n=== CLEAN STATE ==="
docker images
docker ps

echo -e "\n✅ Old site killed. Ready for Birmingham HVAC deployment."
FIND