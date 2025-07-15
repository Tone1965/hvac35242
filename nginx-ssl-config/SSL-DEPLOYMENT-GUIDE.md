# Complete SSL Security Deployment Guide for hvac35242.com

This guide provides step-by-step instructions for deploying a maximum security SSL configuration with your Sectigo wildcard certificate.

## 🔒 Security Overview

Your SSL configuration includes:
- **TLS 1.2/1.3 only** (no legacy protocols)
- **Strong cipher suites** with Perfect Forward Secrecy
- **Maximum security headers** (HSTS, CSP, COEP, COOP, etc.)
- **Certificate monitoring** and expiry alerts
- **OCSP stapling** for performance
- **Rate limiting** and DDoS protection
- **File permissions** following security best practices

## 📋 Prerequisites

Before starting, ensure you have:
1. **Root access** to your server
2. **Sectigo wildcard certificate** files:
   - Certificate file (*.crt)
   - Private key file (*.key)
   - CA bundle file (*.ca-bundle or *.pem)
3. **Domain DNS** pointing to your server
4. **Firewall** allowing ports 80 and 443

## 🚀 Quick Deployment (Recommended)

### Step 1: Deploy Secure SSL Configuration

```bash
# Navigate to the SSL configuration directory
cd /mnt/c/Users/kimma/birmingham-hvac/nginx-ssl-config

# Run the complete SSL deployment script
sudo ./deploy-secure-ssl.sh
```

This script will:
- ✅ Install and configure nginx with maximum security
- ✅ Create secure directory structure with proper permissions
- ✅ Deploy enhanced SSL configuration
- ✅ Generate DH parameters for additional security
- ✅ Set up certificate monitoring
- ✅ Configure firewall rules
- ✅ Create temporary certificate for testing

### Step 2: Install Your Sectigo Certificate

```bash
# Upload your certificate files to the server first, then:
sudo ./install-sectigo-certificate.sh
```

**Interactive mode** (recommended):
- The script will prompt for certificate file paths
- It validates all certificates before installation
- Creates automatic backups
- Tests the configuration

**Command line mode**:
```bash
sudo ./install-sectigo-certificate.sh certificate.crt private.key ca-bundle.pem
```

### Step 3: Verify SSL Security

```bash
# Run comprehensive SSL security audit
sudo ./ssl-security-audit.sh

# Run specific SSL tests
sudo ./ssl-test-and-monitoring.sh
```

## 🔧 Manual Deployment (Step by Step)

If you prefer manual control or need to understand each step:

### 1. Prepare System

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install required packages
sudo apt install -y nginx openssl curl

# Start and enable nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

### 2. Create Secure Directory Structure

```bash
# Run the security setup script
sudo ./ssl-security-setup.sh
```

Or manually:
```bash
# Create SSL directories
sudo mkdir -p /etc/ssl/certs /etc/ssl/private /etc/ssl/backup

# Set secure permissions
sudo chmod 755 /etc/ssl/certs
sudo chmod 700 /etc/ssl/private
sudo chown root:root /etc/ssl/certs /etc/ssl/private
```

### 3. Generate DH Parameters

```bash
# Generate 2048-bit DH parameters (takes 2-5 minutes)
sudo openssl dhparam -out /etc/ssl/dhparams.pem 2048
sudo chmod 644 /etc/ssl/dhparams.pem
```

### 4. Deploy Configuration Files

```bash
# Backup existing configuration
sudo cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.backup

# Deploy enhanced nginx configuration
sudo cp nginx.conf /etc/nginx/nginx.conf
sudo cp hvac35242.conf /etc/nginx/sites-available/hvac35242.com

# Enable site
sudo ln -sf /etc/nginx/sites-available/hvac35242.com /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t
```

### 5. Install SSL Certificate

```bash
# Copy certificate files with proper permissions
sudo cp your-certificate.crt /etc/ssl/certs/hvac35242.com.crt
sudo cp your-private-key.key /etc/ssl/private/hvac35242.com.key
sudo cp your-ca-bundle.pem /etc/ssl/certs/hvac35242.com.ca-bundle

# Set secure permissions
sudo chmod 644 /etc/ssl/certs/hvac35242.com.crt
sudo chmod 600 /etc/ssl/private/hvac35242.com.key
sudo chmod 644 /etc/ssl/certs/hvac35242.com.ca-bundle
sudo chown root:root /etc/ssl/certs/hvac35242.com.crt
sudo chown root:root /etc/ssl/private/hvac35242.com.key
sudo chown root:root /etc/ssl/certs/hvac35242.com.ca-bundle
```

### 6. Restart Services

```bash
# Test configuration again
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx

# Verify nginx is running
sudo systemctl status nginx
```

## 🧪 Testing Your SSL Configuration

### Automated Testing

```bash
# Run comprehensive security audit
sudo ./ssl-security-audit.sh

# Run all SSL tests
sudo ./ssl-test-and-monitoring.sh all

# Check specific components
sudo ./ssl-test-and-monitoring.sh certificate
sudo ./ssl-test-and-monitoring.sh security
sudo ./ssl-test-and-monitoring.sh connection
```

### Manual Testing

```bash
# Test HTTPS connection
curl -I https://hvac35242.com
curl -I https://www.hvac35242.com

# Test HTTP redirect
curl -I http://hvac35242.com

# Test SSL/TLS protocols
openssl s_client -connect hvac35242.com:443 -servername hvac35242.com

# Check certificate details
openssl x509 -in /etc/ssl/certs/hvac35242.com.crt -text -noout
```

### Online SSL Testing

1. **SSL Labs Test**: https://www.ssllabs.com/ssltest/analyze.html?d=hvac35242.com
2. **Qualys SSL Test**: https://www.ssllabs.com/ssltest/
3. **SSL Checker**: https://www.sslchecker.com/sslchecker?host=hvac35242.com

## 📊 Expected Security Results

With this configuration, you should achieve:

- **SSL Labs Grade**: A+ 
- **Security Score**: 95-100%
- **TLS Version**: 1.3 (preferred) or 1.2
- **Forward Secrecy**: Yes
- **HSTS**: Yes (with preload)
- **Certificate Transparency**: Yes

## 🔍 Monitoring and Maintenance

### Automatic Monitoring

The deployment sets up:
- **Weekly certificate expiry checks** (every Monday 9 AM)
- **Automatic log rotation**
- **Security monitoring alerts**

### Manual Monitoring

```bash
# Check certificate expiry
sudo /usr/local/bin/check-ssl-expiry.sh

# View monitoring logs
sudo tail -f /var/log/ssl-monitoring.log

# Check nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

## 🛠 Troubleshooting

### Common Issues

**Issue**: Nginx fails to start
```bash
# Check configuration
sudo nginx -t

# Check logs
sudo journalctl -u nginx -f
```

**Issue**: Certificate and key don't match
```bash
# Verify certificate
openssl x509 -in /etc/ssl/certs/hvac35242.com.crt -text -noout

# Verify private key
openssl rsa -in /etc/ssl/private/hvac35242.com.key -check

# Check if they match
openssl x509 -noout -modulus -in /etc/ssl/certs/hvac35242.com.crt | openssl md5
openssl rsa -noout -modulus -in /etc/ssl/private/hvac35242.com.key | openssl md5
```

**Issue**: HTTPS not accessible
```bash
# Check if nginx is listening
sudo netstat -tlnp | grep nginx

# Check firewall
sudo ufw status
sudo iptables -L

# Test local connection
curl -k https://localhost
```

### Log Analysis

```bash
# Check for SSL errors
sudo grep -i "ssl\|certificate" /var/log/nginx/error.log

# Check for connection issues
sudo grep -i "refused\|timeout" /var/log/nginx/error.log

# Monitor real-time access
sudo tail -f /var/log/nginx/access.log
```

## 🔄 Certificate Renewal

### Sectigo Certificate Renewal (Annual)

1. **30 days before expiry**: Get renewal reminder
2. **Obtain new certificate** from Sectigo
3. **Install new certificate**:
   ```bash
   sudo ./install-sectigo-certificate.sh new-cert.crt new-key.key new-bundle.pem
   ```
4. **Test configuration**: 
   ```bash
   sudo ./ssl-security-audit.sh
   ```

### Alternative: Let's Encrypt (Free)

If you prefer free certificates:
```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d hvac35242.com -d www.hvac35242.com

# Test auto-renewal
sudo certbot renew --dry-run
```

## 📋 Security Checklist

- [ ] **TLS 1.2/1.3 only** configured
- [ ] **Strong ciphers** with PFS enabled
- [ ] **Security headers** implemented (HSTS, CSP, etc.)
- [ ] **Certificate chain** properly configured
- [ ] **OCSP stapling** enabled
- [ ] **Rate limiting** configured
- [ ] **DH parameters** generated (2048+ bits)
- [ ] **File permissions** secured (600 for keys, 644 for certs)
- [ ] **Monitoring** scripts active
- [ ] **Firewall** configured (ports 80, 443)
- [ ] **HTTP redirect** working
- [ ] **SSL Labs grade** A or A+
- [ ] **Certificate expiry** monitoring active

## 🆘 Emergency Procedures

### Certificate Expired

```bash
# Check expiry
openssl x509 -in /etc/ssl/certs/hvac35242.com.crt -enddate -noout

# Temporarily use Let's Encrypt
sudo certbot --nginx --force-renewal -d hvac35242.com -d www.hvac35242.com

# Or restore from backup
sudo cp /etc/ssl/backup/latest/hvac35242.com.crt /etc/ssl/certs/
sudo systemctl reload nginx
```

### Configuration Broken

```bash
# Restore from backup
sudo cp /etc/ssl/backup/[timestamp]/nginx.conf.backup /etc/nginx/nginx.conf
sudo cp /etc/ssl/backup/[timestamp]/hvac35242.com /etc/nginx/sites-available/

# Test and reload
sudo nginx -t
sudo systemctl reload nginx
```

### Complete Reset

```bash
# Remove all SSL configuration
sudo rm -rf /etc/nginx/sites-enabled/*
sudo cp /etc/nginx/sites-available/default /etc/nginx/sites-enabled/

# Redeploy from scratch
cd /mnt/c/Users/kimma/birmingham-hvac/nginx-ssl-config
sudo ./deploy-secure-ssl.sh
```

## 📞 Support and Resources

- **SSL Labs Testing**: https://www.ssllabs.com/ssltest/
- **Mozilla SSL Config**: https://ssl-config.mozilla.org/
- **OWASP Transport Security**: https://owasp.org/www-community/Transport_Layer_Security_Cheat_Sheet
- **Let's Encrypt**: https://letsencrypt.org/
- **Sectigo Support**: https://sectigo.com/support

---

## 🎯 Quick Reference Commands

```bash
# Deploy everything
sudo ./deploy-secure-ssl.sh

# Install certificate
sudo ./install-sectigo-certificate.sh

# Security audit
sudo ./ssl-security-audit.sh

# SSL testing
sudo ./ssl-test-and-monitoring.sh

# Check expiry
sudo /usr/local/bin/check-ssl-expiry.sh

# Reload nginx
sudo nginx -t && sudo systemctl reload nginx
```

---

**Your SSL configuration is now ready for maximum security! 🔒**