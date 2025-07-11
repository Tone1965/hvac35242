#!/bin/bash

# LOOK what's running and DESTROY it
SERVER="142.93.194.81"

echo "👀 LOOKING AT WHAT'S RUNNING..."

ssh root@$SERVER << 'LOOK_DESTROY'
echo "=== PORT 80 STATUS ==="
sudo lsof -i :80
echo ""
sudo netstat -tlnp | grep :80

echo -e "\n=== DOCKER CONTAINERS RUNNING ==="
docker ps

echo -e "\n=== DOCKER IMAGES ON SYSTEM ==="
docker images

echo -e "\n🔥 DESTROYING EVERYTHING..."

# Kill port 80
sudo fuser -k 80/tcp 2>/dev/null || true

# Stop ALL containers
docker kill $(docker ps -q) 2>/dev/null || true
docker rm -f $(docker ps -aq) 2>/dev/null || true

# DELETE ALL IMAGES
docker rmi -f $(docker images -q) 2>/dev/null || true

echo -e "\n=== AFTER DESTRUCTION ==="
echo "Port 80:"
sudo lsof -i :80 || echo "Port 80 is FREE"
echo -e "\nDocker containers:"
docker ps -a
echo -e "\nDocker images:"
docker images

echo -e "\n✅ EVERYTHING DESTROYED. Port 80 is free."
echo "Ready for new deployment."
LOOK_DESTROY