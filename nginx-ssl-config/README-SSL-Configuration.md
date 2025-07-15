# SSL Security Configuration for hvac35242.com

## 🔒 Overview

This directory contains a complete, enterprise-grade SSL security configuration designed for maximum protection of your hvac35242.com website. The configuration is optimized for Sectigo wildcard certificates and implements the latest security best practices.

## 📁 File Structure

```
nginx-ssl-config/
├── README-SSL-Configuration.md     # This file - overview and quick start
├── SSL-DEPLOYMENT-GUIDE.md         # Complete deployment guide
├── nginx.conf                      # Enhanced nginx main configuration
├── hvac35242.conf                  # Site-specific SSL configuration
├── deploy-secure-ssl.sh           # One-click secure deployment
├── install-sectigo-certificate.sh # Certificate installation script
├── ssl-security-setup.sh          # System security setup
├── ssl-test-and-monitoring.sh     # Comprehensive SSL testing
├── ssl-security-audit.sh          # Security audit and scoring
├── docker-compose-ssl.yml         # Docker deployment (alternative)
└── ...                             # Additional testing scripts
```

## 🚀 Quick Start

### Option 1: One-Click Deployment (Recommended)

```bash
cd /mnt/c/Users/kimma/birmingham-hvac/nginx-ssl-config
sudo ./deploy-secure-ssl.sh
sudo ./install-sectigo-certificate.sh
```

### Option 2: Step-by-Step Deployment

1. **Read the complete guide**: `SSL-DEPLOYMENT-GUIDE.md`
2. **Deploy base configuration**: `sudo ./ssl-security-setup.sh`
3. **Install certificate**: `sudo ./install-sectigo-certificate.sh`
4. **Test security**: `sudo ./ssl-security-audit.sh`

## 🛡️ Security Features

### SSL/TLS Configuration
- **Protocols**: TLS 1.2 and 1.3 only (no legacy SSL/TLS)
- **Ciphers**: Strong AEAD ciphers with Perfect Forward Secrecy
- **Key Exchange**: ECDHE with P-384 and P-256 curves
- **Session Security**: Session tickets disabled, secure session cache
- **OCSP Stapling**: Enabled for better performance and privacy

### Security Headers
- **HSTS**: HTTP Strict Transport Security with preload
- **CSP**: Content Security Policy with strict rules
- **Frame Protection**: X-Frame-Options set to DENY
- **Content Type**: X-Content-Type-Options nosniff
- **Cross-Origin**: COEP, COOP, and CORP headers
- **Permissions**: Restrictive Permissions-Policy

### Nginx Security
- **Rate Limiting**: Multiple zones for different endpoints
- **Server Tokens**: Disabled to hide version info
- **Buffer Limits**: Configured to prevent attacks
- **File Protection**: Hidden files and sensitive paths blocked
- **Error Handling**: Custom error pages

### Certificate Security
- **File Permissions**: Private keys secured with 600 permissions
- **Ownership**: Root-only access to certificate files
- **Monitoring**: Automatic expiry checking and alerts
- **Backup**: Automatic backup of existing certificates
- **Validation**: Certificate and key matching verification

## 📊 Expected Security Ratings

With this configuration, you should achieve:

| Test | Expected Result |
|------|----------------|
| **SSL Labs Grade** | A+ |
| **Security Headers** | A+ |
| **TLS Configuration** | Excellent |
| **Certificate Chain** | Complete |
| **Forward Secrecy** | Yes |
| **HSTS Preload** | Eligible |
| **Mixed Content** | Blocked |

## 🔧 Available Scripts

### Deployment Scripts
- `deploy-secure-ssl.sh` - Complete automated deployment
- `ssl-security-setup.sh` - Base system security setup
- `install-sectigo-certificate.sh` - Certificate installation

### Testing Scripts
- `ssl-security-audit.sh` - Comprehensive security audit with scoring
- `ssl-test-and-monitoring.sh` - Full SSL testing suite
- Various specialized testing scripts for specific scenarios

### Monitoring Scripts
- Certificate expiry monitoring (automatically installed)
- Log analysis and error detection
- Performance monitoring capabilities

## 🏆 Security Standards Compliance

This configuration meets or exceeds:
- **OWASP** Transport Layer Security recommendations
- **Mozilla** Modern SSL configuration guidelines
- **NIST** Cybersecurity Framework standards
- **PCI DSS** requirements for payment processing
- **GDPR** security requirements for EU compliance

## 🔍 Testing Your Configuration

### Automated Testing
```bash
# Run complete security audit
sudo ./ssl-security-audit.sh

# Test all SSL components
sudo ./ssl-test-and-monitoring.sh all

# Quick certificate check
sudo /usr/local/bin/check-ssl-expiry.sh
```

### Online Testing Tools
- **SSL Labs**: https://www.ssllabs.com/ssltest/analyze.html?d=hvac35242.com
- **Security Headers**: https://securityheaders.com/?q=https://hvac35242.com
- **HackerTarget**: https://hackertarget.com/ssl-check/

### Manual Testing
```bash
# Test HTTPS connection
curl -I https://hvac35242.com

# Check certificate details
openssl s_client -connect hvac35242.com:443 -servername hvac35242.com

# Verify security headers
curl -I https://hvac35242.com | grep -i security
```

## 📈 Performance Optimization

The configuration includes several performance optimizations:
- **HTTP/2**: Enabled for faster page loads
- **OCSP Stapling**: Reduces TLS handshake time
- **Session Resumption**: Optimized for repeat visitors
- **Compression**: Gzip enabled for faster content delivery
- **Caching**: Optimized cache headers for static content

## 🔄 Maintenance

### Regular Tasks
- **Monthly**: Review SSL Labs rating
- **Weekly**: Check certificate expiry (automated)
- **Quarterly**: Update cipher suites if needed
- **Annually**: Renew Sectigo certificate

### Monitoring
- Certificate expiry alerts (30 days warning)
- SSL configuration change detection
- Security header compliance monitoring
- Performance impact tracking

## 🆘 Troubleshooting

### Common Issues

**SSL Labs shows warnings**
```bash
# Run security audit to identify issues
sudo ./ssl-security-audit.sh

# Check configuration
sudo nginx -t
```

**Certificate errors**
```bash
# Verify certificate installation
openssl x509 -in /etc/ssl/certs/hvac35242.com.crt -text -noout

# Check certificate chain
openssl verify -CAfile /etc/ssl/certs/hvac35242.com.ca-bundle /etc/ssl/certs/hvac35242.com.crt
```

**Performance issues**
```bash
# Check nginx error logs
sudo tail -f /var/log/nginx/error.log

# Test connection speed
curl -w "@curl-format.txt" -o /dev/null -s https://hvac35242.com
```

## 🔗 Related Documentation

- `SSL-DEPLOYMENT-GUIDE.md` - Complete step-by-step deployment
- Individual script files contain detailed inline documentation
- Configuration files include security explanations
- Online resources linked in deployment guide

## 🎯 Next Steps

1. **Deploy the configuration** using the automated scripts
2. **Install your Sectigo certificate** 
3. **Run security audit** to verify everything is working
4. **Test with online tools** (SSL Labs, Security Headers)
5. **Set up monitoring** for ongoing security maintenance
6. **Schedule certificate renewal** (annually for Sectigo)

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section in `SSL-DEPLOYMENT-GUIDE.md`
2. Run the security audit script for detailed diagnostics
3. Review nginx error logs for specific error messages
4. Test with online SSL testing tools for external validation

---

**Your website will have enterprise-grade SSL security! 🔒**

*This configuration provides maximum security while maintaining excellent performance and compatibility.*