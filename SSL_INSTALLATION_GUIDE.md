# Secure SSL Certificate Installation Guide for hvac35242.com

## Overview
This guide provides a secure, step-by-step process to install your Sectigo wildcard SSL certificate on the DigitalOcean server at 142.93.194.81.

## Security Features
- 🔒 Private key protection (never shared in chat)
- 🛡️ Secure file transfer protocols
- 🔐 Proper file permissions (600 for private keys)
- ⚡ A+ SSL rating configuration
- 🚀 Modern TLS protocols (1.2 and 1.3)
- 🛡️ Security headers implementation

## Prerequisites
Before starting, ensure you have:
- [ ] SSL certificate file (.crt or .pem)
- [ ] Private key file (.key) - KEEP THIS SECURE
- [ ] CA bundle/intermediate certificate file
- [ ] SSH access to your DigitalOcean server
- [ ] OpenSSL installed locally (for validation)

## Installation Process

### Step 1: Prepare Your Certificate Files
Ensure you have these three files from Sectigo:
- **Certificate**: Usually named something like `hvac35242_com.crt`
- **Private Key**: The key you generated (e.g., `hvac35242.com.key`)
- **CA Bundle**: Intermediate certificates (e.g., `ca_bundle.crt`)

### Step 2: Upload Certificate Files Securely
Run the secure upload script:
```bash
./ssl-upload-script.sh
```

This script will:
- ✅ Validate certificate files before upload
- 🔒 Securely transfer files via SCP
- 🛡️ Set proper permissions (600 for private key)
- 📁 Create combined certificate file for nginx
- ✅ Verify files on the server

### Step 3: Deploy SSL Configuration
Run the configuration deployment script:
```bash
./deploy-ssl-config.sh
```

This script will:
- 💾 Backup existing nginx configuration
- 📤 Upload new SSL-optimized configuration
- ✅ Test nginx configuration syntax
- 🔄 Reload nginx service
- 🌐 Test basic connectivity

### Step 4: Test SSL Installation
Run comprehensive SSL testing:
```bash
./test-ssl-installation.sh
```

This script tests:
- 🌐 HTTPS connectivity
- 🔀 HTTP to HTTPS redirects
- 🔀 WWW to non-WWW redirects
- 🔒 SSL certificate validation
- 🛡️ TLS protocol support
- 🛡️ Security headers
- 🔗 Certificate chain validation
- 🌟 Wildcard certificate functionality

## Configuration Details

### SSL Security Features Implemented
- **TLS Protocols**: 1.2 and 1.3 only (secure)
- **Ciphers**: Strong ECDHE and DHE ciphers
- **HSTS**: Strict Transport Security with preload
- **OCSP Stapling**: Enabled for performance
- **Session Security**: Secure session management

### Security Headers Applied
- `Strict-Transport-Security`: Forces HTTPS
- `X-Frame-Options`: Prevents clickjacking
- `X-Content-Type-Options`: Prevents MIME type sniffing
- `X-XSS-Protection`: XSS attack protection
- `Referrer-Policy`: Controls referrer information
- `Content-Security-Policy`: Comprehensive CSP

### Performance Optimizations
- HTTP/2 support enabled
- SSL session caching
- Gzip compression
- Static file caching
- Optimized SSL buffer size

## File Locations on Server
```
/etc/ssl/certs/hvac35242.com/
├── hvac35242.com.crt        # Your certificate
├── ca_bundle.crt            # CA intermediate certificates
└── fullchain.crt            # Combined certificate (cert + ca_bundle)

/etc/ssl/private/
└── hvac35242.com.key        # Private key (permissions: 600)

/etc/nginx/sites-available/
└── hvac35242.com            # Nginx SSL configuration
```

## Troubleshooting

### Common Issues and Solutions

#### 1. Certificate Not Trusted
```bash
# Check certificate chain
openssl s_client -connect hvac35242.com:443 -servername hvac35242.com
```

#### 2. Private Key Mismatch
```bash
# Verify certificate and key match
openssl x509 -noout -modulus -in /etc/ssl/certs/hvac35242.com/hvac35242.com.crt | openssl md5
openssl rsa -noout -modulus -in /etc/ssl/private/hvac35242.com.key | openssl md5
```

#### 3. Nginx Configuration Errors
```bash
# Test nginx configuration
nginx -t

# Check nginx error logs
tail -f /var/log/nginx/error.log
```

#### 4. SSL Not Loading
```bash
# Check if nginx is running
systemctl status nginx

# Restart nginx
systemctl restart nginx
```

### Log Files to Monitor
- Nginx access logs: `/var/log/nginx/hvac35242.com.access.log`
- Nginx error logs: `/var/log/nginx/hvac35242.com.error.log`
- System logs: `journalctl -u nginx`

## Verification Checklist

After installation, verify:
- [ ] https://hvac35242.com loads correctly
- [ ] http://hvac35242.com redirects to HTTPS
- [ ] https://www.hvac35242.com redirects to https://hvac35242.com
- [ ] SSL certificate shows as valid in browser
- [ ] No mixed content warnings
- [ ] SSL Labs test shows A+ rating
- [ ] All required subdomains work with wildcard cert

## SSL Labs Testing
Check your SSL rating at:
https://www.ssllabs.com/ssltest/analyze.html?d=hvac35242.com

Target rating: **A+**

## Certificate Renewal
Set up automatic renewal monitoring:
- Certificate expires: Check your Sectigo account
- Renewal reminder: Set calendar alert 30 days before expiration
- Renewal process: Repeat this installation with new certificate files

## Security Best Practices
1. 🔒 Never share private key files
2. 🔄 Regular security updates for server
3. 📊 Monitor SSL certificate expiration
4. 🛡️ Use strong passwords for server access
5. 🔍 Regular security audits
6. 📱 Enable two-factor authentication where possible

## Support Commands
Useful commands for ongoing maintenance:

```bash
# Check certificate expiration
openssl x509 -in /etc/ssl/certs/hvac35242.com/hvac35242.com.crt -noout -enddate

# Test SSL connection
openssl s_client -connect hvac35242.com:443 -servername hvac35242.com

# Check nginx configuration
nginx -t

# Reload nginx (after config changes)
systemctl reload nginx

# View real-time nginx logs
tail -f /var/log/nginx/hvac35242.com.access.log
```

---

## Emergency Contact Information
If you encounter issues during installation:
1. Check the troubleshooting section above
2. Review nginx error logs
3. Ensure all certificate files are properly uploaded
4. Verify DNS settings are pointing to the correct server

Remember: Your private key should never be shared or transmitted insecurely. The upload script handles this securely via SCP.