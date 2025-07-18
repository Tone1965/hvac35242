# Deployment Verification for Birmingham HVAC

## Current Status Check Commands

### 1. Connect to DigitalOcean Server
```bash
ssh root@142.93.194.81
```

### 2. Check Current Running Containers
```bash
docker ps -a
```

### 3. Check Development Container Status
```bash
docker logs hvac-dev
```

### 4. Check Production Container Status
```bash
docker logs hvac-prod
```

## Development Deployment Commands

### 1. Navigate to Project Directory
```bash
cd /root/birmingham-hvac
```

### 2. Pull Latest Changes (if using git)
```bash
git pull origin master
```

### 3. Stop Current Dev Container
```bash
docker-compose -f docker-compose.dev.yml down
```

### 4. Build and Deploy Development Site
```bash
docker-compose -f docker-compose.dev.yml up --build -d
```

### 5. Verify Development Deployment
```bash
docker logs hvac-dev -f
```

### 6. Test Development Site
```bash
curl -I https://dev.hvac35242.com
```

## Production Deployment Commands (After Dev Verification)

### 1. Deploy Production Site
```bash
docker-compose -f docker-compose.prod.yml up --build -d
```

### 2. Verify Production Deployment
```bash
docker logs hvac-prod -f
```

### 3. Test Production Site
```bash
curl -I https://www.hvac35242.com
```

## Health Check Commands

### Check Container Resource Usage
```bash
docker stats
```

### Check Container Logs for Errors
```bash
docker logs hvac-dev --tail 100
docker logs hvac-prod --tail 100
```

### Check Nginx Status (Production)
```bash
docker logs nginx --tail 100
```

## Port Configuration Analysis

### Development Configuration Issues Identified:
- **Current Issue**: Both docker-compose files map to port 80
- **Dev container**: Should map to port 3002 (as per project docs)
- **Prod container**: Should map to port 3001 (as per project docs)

### Required Port Corrections:
1. **docker-compose.dev.yml**: Change ports from "80:3000" to "3002:3000"
2. **docker-compose.prod.yml**: Change ports from "80:3000" to "3001:3000"

## SSL Certificate Status
- Let's Encrypt certificates should be in /etc/ssl on the server
- Nginx handles SSL termination for production
- Development site should also have SSL (dev.hvac35242.com)

## Post-Deployment Verification Checklist
- [ ] Development site loads at https://dev.hvac35242.com
- [ ] Production site loads at https://www.hvac35242.com
- [ ] SSL certificates are valid
- [ ] No container errors in logs
- [ ] Port configurations are correct
- [ ] All pages render correctly
- [ ] Mobile responsiveness works
- [ ] Contact forms function properly