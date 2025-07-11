# 🚨 FINAL SOLUTION GUIDE - Birmingham HVAC Deployment

## THE PROBLEM
Old AI Agents/RankSavvy site showing at http://142.93.194.81 instead of Birmingham HVAC site.

## STEP-BY-STEP SOLUTION

### Step 1: SSH to Your Server
```bash
ssh root@142.93.194.81
```

### Step 2: Run This Single Command (Copy & Paste)
```bash
sudo fuser -k 80/tcp 2>/dev/null; cd /tmp; rm -rf birmingham-hvac; git clone https://github.com/Tone1965/birmingham-hvac.git && cd birmingham-hvac && echo "<!-- Deployed $(date) -->" >> index.html && sudo python3 -m http.server 80
```

### Step 3: Verify It's Working on Server
```bash
curl -s http://localhost | head -5
```

You should see Birmingham HVAC content.

### Step 4: Check in Browser
1. Open **Incognito/Private Mode**
2. Go to http://142.93.194.81
3. Press Ctrl+F5 (force refresh)

## IF STILL SHOWING OLD SITE

### It's a Caching Issue! Try These:

#### 1. Clear Everything
- Chrome: Settings → Privacy → Clear browsing data → All time → Clear data
- Firefox: Settings → Privacy → Clear Data → Everything
- Edge: Settings → Privacy → Clear browsing data → All time

#### 2. Test Different Ways
```bash
# From your computer terminal:
curl http://142.93.194.81

# Or use online tool:
https://www.site24x7.com/tools/find-website-location.html
# Enter: http://142.93.194.81
```

#### 3. Check for CDN/CloudFlare
If you're using CloudFlare:
1. Log into CloudFlare
2. Select your domain
3. Caching → Configuration → Purge Everything
4. Or enable "Development Mode"

## MAKE IT PERMANENT

After confirming it works, make it permanent:

```bash
# On your server:
sudo tee /etc/systemd/system/hvac.service << 'EOF'
[Unit]
Description=Birmingham HVAC Website
After=network.target

[Service]
Type=simple
ExecStart=/usr/bin/python3 -m http.server 80
WorkingDirectory=/tmp/birmingham-hvac
Restart=always

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl enable hvac
sudo systemctl start hvac
```

## COMMON ISSUES & FIXES

### "Address already in use"
```bash
sudo fuser -k 80/tcp
sudo lsof -ti:80 | xargs kill -9
```

### "Permission denied"
```bash
# Use sudo before commands
sudo python3 -m http.server 80
```

### Still seeing old content after all steps
1. **You might be accessing wrong server** - Verify IP in DigitalOcean
2. **ISP/Corporate proxy caching** - Try mobile data or VPN
3. **Wrong DNS** - Make sure no domain is pointing elsewhere

## NUCLEAR OPTION

If absolutely nothing works:

```bash
# WARNING: This will stop ALL services
sudo systemctl stop nginx apache2 docker
sudo killall -9 nginx apache2 node python python3
sudo rm -rf /var/www/* /usr/share/nginx/html/*
docker stop $(docker ps -aq)
docker system prune -af
cd /tmp && git clone https://github.com/Tone1965/birmingham-hvac.git hvac-final
cd hvac-final && sudo python3 -m http.server 80
```

## VERIFICATION COMMANDS

```bash
# What's serving on port 80?
sudo lsof -i :80

# What content is being served?
curl -s http://localhost | grep -i "title\|h1"

# Is firewall blocking?
sudo ufw status

# What's the server IP?
curl ifconfig.me
```

## SUCCESS CHECKLIST

- [ ] SSH to server works
- [ ] Deployment command runs without errors  
- [ ] `curl http://localhost` shows Birmingham HVAC
- [ ] Browser incognito mode shows Birmingham HVAC
- [ ] Old RankSavvy site is gone
- [ ] Service is set to auto-start

---

**If this guide doesn't work**, the issue is NOT the deployment - it's infrastructure (wrong server, DNS, CDN, etc.)