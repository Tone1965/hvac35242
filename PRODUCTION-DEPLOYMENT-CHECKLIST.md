# Birmingham HVAC Production Deployment Checklist

## Project Overview
- **Domain**: https://www.hvac35242.com
- **Development**: https://dev.hvac35242.com
- **Server**: DigitalOcean Droplet (142.93.194.81)
- **Repository**: /mnt/c/Users/kimma/birmingham-hvac

## Pre-Deployment Checklist

### 1. Code Quality & Testing
- [ ] All code changes reviewed and tested locally
- [ ] Next.js build completes successfully (`npm run build`)
- [ ] No TypeScript errors (`npm run lint`)
- [ ] All components render correctly
- [ ] Contact form functionality verified
- [ ] SEO metadata properly configured

### 2. Environment Preparation
- [ ] Development environment tested and verified
- [ ] Production environment variables configured
- [ ] SSL certificates valid and not expiring
- [ ] Docker containers running efficiently
- [ ] DigitalOcean server resources adequate

### 3. Backup & Safety
- [ ] Current production database backed up (if applicable)
- [ ] Current production container image tagged for rollback
- [ ] Deployment scripts tested in development
- [ ] Rollback procedure documented and tested

## Branch Management Strategy

### Feature Branch to Main Merge Process

#### 1. Feature Branch Development
```bash
# Create feature branch
git checkout -b feature/description-of-change

# Work on feature
# ... make changes ...

# Stage and commit changes
git add .
git commit -m "feat: description of change"
```

#### 2. Pre-Merge Validation
```bash
# Switch to main branch
git checkout main

# Pull latest changes
git pull origin main

# Switch back to feature branch
git checkout feature/description-of-change

# Rebase on main (if needed)
git rebase main

# Test build
npm run build
```

#### 3. Merge to Main
```bash
# Switch to main branch
git checkout main

# Merge feature branch (use squash for clean history)
git merge --squash feature/description-of-change

# Commit merged changes
git commit -m "feat: description of change"

# Tag for deployment
git tag -a v1.0.x -m "Release v1.0.x"

# Push to remote
git push origin main
git push origin v1.0.x
```

#### 4. Clean Up
```bash
# Delete feature branch
git branch -d feature/description-of-change
```

## Deployment to DigitalOcean

### Phase 1: Development Deployment & Testing

#### 1. Connect to DigitalOcean Server
```bash
ssh root@142.93.194.81
cd /root/birmingham-hvac
```

#### 2. Pull Latest Changes
```bash
git pull origin main
```

#### 3. Deploy to Development
```bash
./deploy-dev.sh
```

#### 4. Development Verification Checklist
- [ ] Development site loads at https://dev.hvac35242.com
- [ ] All pages render correctly
- [ ] Contact form submits successfully
- [ ] Images load properly
- [ ] Mobile responsive design works
- [ ] SEO meta tags present
- [ ] Site speed acceptable (< 3 seconds)

### Phase 2: Production Deployment (Zero-Downtime)

#### 1. Pre-Production Checks
```bash
# Check current production status
./check-status.sh

# Verify containers are healthy
docker ps
docker stats --no-stream

# Check disk space
df -h
```

#### 2. Production Deployment
```bash
# Deploy to production
./deploy-prod.sh

# Script will:
# - Stop existing production container
# - Build new container with latest code
# - Start new container
# - Verify deployment
```

#### 3. Post-Deployment Verification
- [ ] Production site loads at https://www.hvac35242.com
- [ ] SSL certificate valid and secure
- [ ] All critical pages functional
- [ ] Contact form operational
- [ ] Database connections working (if applicable)
- [ ] Performance metrics acceptable
- [ ] No 404 errors on key pages

### Phase 3: Post-Deployment Monitoring

#### 1. Health Checks (First 15 Minutes)
```bash
# Monitor container logs
docker logs hvac-prod -f

# Check resource usage
docker stats

# Test critical endpoints
curl -I https://www.hvac35242.com
curl -I https://www.hvac35242.com/contact
curl -I https://www.hvac35242.com/emergency
```

#### 2. Performance Monitoring
- [ ] Site response time < 2 seconds
- [ ] Memory usage within normal limits
- [ ] CPU usage stable
- [ ] No error logs in first 15 minutes

## Rollback Procedures

### Emergency Rollback (If New Deployment Fails)

#### Option 1: Container Rollback
```bash
# Stop current failing container
docker stop hvac-prod

# List available images
docker images | grep birmingham-hvac

# Start previous working container
docker run -d --name hvac-prod-rollback \
  -p 3001:3000 \
  -e NODE_ENV=production \
  [previous-image-id]

# Update nginx if needed
docker restart nginx
```

#### Option 2: Git Rollback
```bash
# Identify last working commit
git log --oneline -10

# Revert to previous commit
git reset --hard [previous-commit-hash]

# Redeploy
./deploy-prod.sh
```

### Planned Rollback Process
1. **Identify Issue**: Document what went wrong
2. **Notify Stakeholders**: Inform team of rollback
3. **Execute Rollback**: Use appropriate method above
4. **Verify**: Ensure rolled-back version works
5. **Investigate**: Fix issue in development
6. **Plan Re-deployment**: Schedule new deployment

## Zero-Downtime Deployment Configuration

### Blue-Green Deployment Strategy

#### Current Configuration
- **Blue (Production)**: Port 3001 → hvac-prod container
- **Green (Staging)**: Port 3002 → hvac-dev container

#### Enhanced Zero-Downtime Process
1. **Prepare Green Environment**: Build new version in development
2. **Health Check**: Verify green environment fully functional
3. **Switch Traffic**: Update nginx configuration
4. **Graceful Shutdown**: Stop old blue container
5. **Cleanup**: Remove old images and containers

### Load Balancer Configuration (Future Enhancement)
```nginx
upstream hvac_backend {
    server 127.0.0.1:3001 weight=1;
    server 127.0.0.1:3002 weight=0 backup;
}
```

## Monitoring & Alerting

### Key Metrics to Monitor
- **Response Time**: < 2 seconds average
- **Error Rate**: < 1% of requests
- **Uptime**: > 99.9%
- **Memory Usage**: < 80% of available
- **CPU Usage**: < 70% sustained

### Alert Thresholds
- **Critical**: Site down > 2 minutes
- **Warning**: Response time > 5 seconds
- **Info**: Memory usage > 70%

## Security Considerations

### SSL Certificate Management
- [ ] Certificates auto-renew via Let's Encrypt
- [ ] Certificate expiry monitoring enabled
- [ ] HTTPS redirects properly configured

### Container Security
- [ ] Containers run with non-root user
- [ ] No sensitive data in environment variables
- [ ] Regular security updates applied

## Documentation Updates

### After Each Deployment
- [ ] Update DEPLOYMENT-GUIDE.md if process changes
- [ ] Tag release with version number
- [ ] Update any README files if needed
- [ ] Document any issues encountered

## Emergency Contacts

### Key Personnel
- **Technical Lead**: Available for critical issues
- **DigitalOcean Support**: For infrastructure problems
- **Domain Registrar**: For DNS issues

### Emergency Procedures
1. **Site Down**: Execute rollback immediately
2. **Performance Issues**: Check logs and scale if needed
3. **Security Incident**: Take site offline if necessary

## Success Criteria

### Deployment Considered Successful When:
- [ ] All verification checks pass
- [ ] No critical errors in first 30 minutes
- [ ] Performance metrics within acceptable range
- [ ] All stakeholders notified of successful deployment

### Deployment Considered Failed When:
- [ ] Site returns 5xx errors
- [ ] Response time > 10 seconds
- [ ] Critical functionality broken
- [ ] SSL certificate issues

## Version Control

### Tagging Strategy
- **Major Release**: v1.0.0 (Breaking changes)
- **Minor Release**: v1.1.0 (New features)
- **Patch Release**: v1.1.1 (Bug fixes)

### Commit Message Format
```
feat: add new HVAC service pages
fix: resolve contact form submission issue
docs: update deployment procedures
refactor: optimize component structure
```

## Post-Deployment Tasks

### Immediate (0-1 hour)
- [ ] Monitor logs for errors
- [ ] Verify all critical paths
- [ ] Update deployment documentation
- [ ] Notify stakeholders of completion

### Short-term (1-24 hours)
- [ ] Performance monitoring
- [ ] User feedback monitoring
- [ ] SEO ranking checks
- [ ] Analytics verification

### Long-term (1-7 days)
- [ ] Full performance analysis
- [ ] User experience validation
- [ ] SEO impact assessment
- [ ] Plan next deployment cycle

---

**Last Updated**: July 18, 2025
**Next Review**: Before next major deployment