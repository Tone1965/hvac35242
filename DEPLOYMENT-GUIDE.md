# Birmingham HVAC Deployment Guide

## Quick Reference Commands

### 1. Connect to DigitalOcean Server
```bash
ssh root@142.93.194.81
cd /root/birmingham-hvac
```

### 2. Check Current Status
```bash
./check-status.sh
```

### 3. Deploy Development Site
```bash
./deploy-dev.sh
```

### 4. Deploy Production Site (After Dev Verification)
```bash
./deploy-prod.sh
```

## Port Configuration (FIXED)

- **Development**: Port 3002 → https://dev.hvac35242.com
- **Production**: Port 3001 → https://www.hvac35242.com
- **Nginx**: Port 443 (SSL termination)

## Manual Commands Reference

### Stop and Restart Development
```bash
docker-compose -f docker-compose.dev.yml down
docker-compose -f docker-compose.dev.yml up --build -d
```

### Stop and Restart Production
```bash
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up --build -d
```

### Check Logs
```bash
docker logs hvac-dev -f        # Development logs
docker logs hvac-prod -f       # Production logs
docker logs nginx -f           # Nginx logs
```

### Check Container Status
```bash
docker ps                      # Running containers
docker ps -a                   # All containers
docker stats                   # Resource usage
```

## Deployment Process

1. **Pre-deployment**: Run status check
2. **Development**: Deploy to dev environment first
3. **Testing**: Verify dev site works correctly
4. **Production**: Deploy to production after dev verification
5. **Post-deployment**: Verify both sites are working

## Site URLs

- **Development**: https://dev.hvac35242.com
- **Production**: https://www.hvac35242.com
- **Server IP**: 142.93.194.81

## Troubleshooting

### Container Won't Start
```bash
docker logs [container-name]
docker system prune -f
```

### Site Not Responding
```bash
curl -I http://localhost:3002    # Check dev locally
curl -I http://localhost:3001    # Check prod locally
netstat -tlnp | grep :3002       # Check port binding
```

### SSL Issues
```bash
docker logs nginx
ls -la /etc/ssl/                 # Check SSL certificates
```

## Files Modified

1. **docker-compose.dev.yml** - Fixed port mapping to 3002:3000
2. **docker-compose.prod.yml** - Fixed port mapping to 3001:3000
3. **Added deployment scripts** - deploy-dev.sh, deploy-prod.sh, check-status.sh