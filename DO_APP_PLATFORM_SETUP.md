# DigitalOcean App Platform Setup for Birmingham HVAC

## Step 1: Create App Platform App

1. **Go to**: https://cloud.digitalocean.com/apps
2. **Click**: "Create App"
3. **Choose**: "GitHub" as source
4. **Repository**: Select `Tone1965/birmingham-hvac`
5. **Branch**: `main`
6. **Autodeploy**: ✅ Enable

## Step 2: Configure App Settings

### Basic Settings:
- **App Name**: `birmingham-hvac-production`
- **Region**: New York (NYC3)
- **Plan**: Basic ($12/month - apps-s-1vcpu-2gb)

### Build Settings:
- **Build Command**: `npm run build`
- **Run Command**: `npm start`
- **HTTP Port**: 3000
- **Dockerfile**: ✅ Use existing Dockerfile

### Environment Variables:
```
NODE_ENV=production
NEXT_PUBLIC_ENVIRONMENT=production
```

### Health Check:
- **Path**: `/en/`
- **Initial Delay**: 30 seconds
- **Period**: 10 seconds
- **Timeout**: 5 seconds

## Step 3: Add Custom Domain

### In App Platform:
1. **Go to**: Settings → Domains
2. **Add Domain**: `hvac35242.com`
3. **Add Domain**: `www.hvac35242.com` (alias)

### In Ionos DNS:
**Add these CNAME records:**
```
Type: CNAME
Name: @
Value: [provided by DigitalOcean]

Type: CNAME  
Name: www
Value: [provided by DigitalOcean]
```

## Step 4: SSL Certificate
- **Automatic**: DigitalOcean will provision Let's Encrypt SSL
- **No configuration needed**
- **Will be ready in 5-10 minutes**

## Expected Outcome:
- ✅ `https://hvac35242.com` → Birmingham HVAC site
- ✅ `https://www.hvac35242.com` → Redirects to main domain
- ✅ Automatic SSL certificate
- ✅ Automatic deployments from GitHub
- ✅ 24/7 uptime monitoring

## Total Cost: ~$12/month for production-ready hosting