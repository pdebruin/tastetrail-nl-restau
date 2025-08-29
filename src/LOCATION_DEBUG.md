# Location Feature Debug Guide

## Common Issues & Solutions

### 1. Permission Denied
**Symptoms:** Location button shows "Location access denied" toast
**Causes:**
- User previously denied location access
- Browser privacy settings block location
- Corporate/school network restrictions

**Solutions:**
- In Chrome: Click lock icon → Location → Allow
- In Firefox: Click shield icon → Permissions → Location → Allow  
- Clear site data and try again
- Check browser privacy settings

### 2. Location Unavailable
**Symptoms:** "Location information unavailable" message
**Causes:**
- GPS/location services disabled on device
- Poor GPS signal (indoors, urban canyons)
- VPN masking location
- Device doesn't have GPS capability

**Solutions:**
- Enable location services in device settings
- Try outdoors with clear sky view
- Disable VPN temporarily
- Use Wi-Fi for location assistance

### 3. HTTPS Requirement
**Symptoms:** Location works on localhost but not on deployed site
**Causes:**
- Modern browsers require HTTPS for geolocation API
- HTTP sites are considered insecure for location access

**Solutions:**
- Deploy site with HTTPS/SSL certificate
- Use localhost for development
- Some browsers allow location on local network IPs

### 4. Timeout Issues
**Symptoms:** "Location request timed out" message
**Causes:**
- Slow GPS acquisition
- Device struggling to get location fix
- Network connectivity issues

**Solutions:**
- Increase timeout setting (currently 10 seconds)
- Try again in different location
- Check network connection

### 5. Browser Support
**Symptoms:** "Geolocation is not supported" message
**Causes:**
- Very old browser
- Location API disabled in browser settings
- Browser privacy extensions blocking API

**Solutions:**
- Update browser to latest version
- Check browser location settings
- Disable privacy extensions temporarily

## Debug Information Available

When in development mode, the map shows debug info including:
- Geolocation API availability
- Current protocol (HTTP/HTTPS)
- Permission status
- Location acquisition status

## Testing Checklist

1. ✅ Check browser console for detailed error logs
2. ✅ Verify HTTPS on production deployments  
3. ✅ Test location permission flow
4. ✅ Confirm device location services enabled
5. ✅ Try different network conditions
6. ✅ Test on different devices/browsers

## Implementation Notes

The location feature includes:
- Comprehensive error handling with user-friendly messages
- Permission status monitoring
- Debugging information in development
- Graceful fallback when location unavailable
- Visual feedback during location acquisition
- Helpful tips based on current state