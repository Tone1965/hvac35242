# SSL Installation Quick Reference

## Installation Order
```bash
# 1. Upload certificates securely
./ssl-upload-script.sh

# 2. Deploy SSL configuration
./deploy-ssl-config.sh

# 3. Test installation
./test-ssl-installation.sh
```

## Files Created
| File | Purpose |
|------|---------|
| `ssl-upload-script.sh` | Secure certificate upload |
| `nginx-ssl-config.conf` | A+ rated SSL configuration |
| `deploy-ssl-config.sh` | Configuration deployment |
| `test-ssl-installation.sh` | Comprehensive testing |
| `SSL_INSTALLATION_GUIDE.md` | Complete documentation |

## Critical Security Notes
- ⚠️ **NEVER** share your private key in chat
- 🔒 Private key permissions set to 600 automatically
- 🛡️ All transfers use secure SCP protocol
- ✅ Certificate validation before upload

## Server File Locations
```
/etc/ssl/certs/hvac35242.com/fullchain.crt   # Nginx certificate
/etc/ssl/private/hvac35242.com.key           # Private key
/etc/nginx/sites-available/hvac35242.com     # SSL config
```

## Quick Tests
```bash
# Test HTTPS
curl -I https://hvac35242.com

# Check SSL grade
https://www.ssllabs.com/ssltest/analyze.html?d=hvac35242.com

# Verify certificate
openssl s_client -connect hvac35242.com:443 -servername hvac35242.com
```

## Troubleshooting
```bash
# Check nginx
nginx -t && systemctl status nginx

# View logs
tail -f /var/log/nginx/error.log

# Test certificate/key match
openssl x509 -noout -modulus -in /path/to/cert | openssl md5
openssl rsa -noout -modulus -in /path/to/key | openssl md5
```