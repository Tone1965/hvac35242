# Chart.js Integration for Birmingham HVAC

## Overview
This document outlines the Chart.js integration for the Birmingham HVAC website (www.hvac35242.com), providing interactive data visualizations for service pricing and seasonal demand patterns.

## Dependencies Installed

### Chart.js v4.4.0
- Core charting library for creating interactive charts
- Supports bar charts, line charts, pie charts, and more
- Fully responsive and mobile-friendly

### React Chart.js 2 v5.2.0
- React wrapper for Chart.js
- Provides better React integration and lifecycle management
- Enables declarative chart configuration

## Chart Components

### 1. PricingTransparencyChart
**Location**: `/components/PricingTransparencyChart.tsx`
**Type**: Bar Chart
**Purpose**: Display transparent pricing for HVAC services

**Features**:
- Shows starting prices, average prices, and complex job pricing
- Services include: AC Repair, Heating Repair, Maintenance, Installation, Emergency
- Interactive tooltips with formatted pricing
- Responsive design with proper aspect ratio

**Data Structure**:
```typescript
Services: AC Repair, Heating Repair, Maintenance, Installation, Emergency
Price Ranges: Starting ($89-$250), Average ($149-$450), Complex ($249-$8000)
```

### 2. SeasonalDemandChart
**Location**: `/components/SeasonalDemandChart.tsx`
**Type**: Line Chart
**Purpose**: Show seasonal demand patterns for HVAC services

**Features**:
- Three datasets: AC Service Calls, Heating Service Calls, Maintenance Calls
- 12-month data visualization
- Filled area charts with smooth curves
- Seasonal tips and recommendations

**Data Structure**:
```typescript
Months: Jan-Dec
AC Calls: Peak in summer (Jun-Aug: 450-580 calls)
Heating Calls: Peak in winter (Dec-Feb: 420-520 calls)
Maintenance: Consistent year-round (100-320 calls)
```

## Implementation Details

### Chart.js Configuration
Both components use:
- `Chart.register(...registerables)` for full feature set
- Responsive design with `maintainAspectRatio: false`
- Custom styling matching Birmingham HVAC brand colors
- Proper cleanup in useEffect return function

### Color Scheme
- **Green** (#22C55E): Starting prices, maintenance calls
- **Blue** (#3B82F6): Average prices, AC service calls
- **Orange** (#FB923C): Complex pricing
- **Red** (#EF4444): Heating service calls

### Responsive Design
- Charts adapt to container width
- Fixed height of 400px for optimal viewing
- Mobile-friendly touch interactions
- Proper scaling for different screen sizes

## Deployment Scripts

### 1. install-chart-dependencies.sh
- Installs Chart.js and React Chart.js 2
- Verifies successful installation
- Provides next steps for deployment

### 2. deploy-chart-update.sh
- Complete deployment workflow for Chart.js updates
- Installs dependencies and deploys to development
- Includes testing and verification steps

### 3. verify-charts.sh
- Comprehensive verification of Chart.js installation
- Checks dependencies, components, and site availability
- Provides troubleshooting information

## Usage Instructions

### For Development
1. Run on DigitalOcean server (142.93.194.81):
   ```bash
   cd /root/birmingham-hvac
   ./deploy-chart-update.sh
   ```

2. Test at: https://dev.hvac35242.com

### For Production
1. After dev verification:
   ```bash
   ./deploy-prod.sh
   ```

2. Test at: https://www.hvac35242.com

### For Verification
```bash
./verify-charts.sh
```

## Chart Integration in Pages

### Service Pages
- PricingTransparencyChart displays service pricing
- Helps customers understand transparent pricing structure
- Encourages calls with prominent phone number: (205) 835-0111

### Location Pages
- SeasonalDemandChart shows service patterns
- Helps customers plan maintenance schedules
- Provides seasonal tips for optimal HVAC care

## Technical Benefits

1. **User Experience**: Interactive visual data presentation
2. **SEO**: Rich content that increases time on page
3. **Conversion**: Clear pricing builds trust and encourages calls
4. **Mobile**: Responsive charts work on all devices
5. **Performance**: Efficient Chart.js rendering with React optimization

## Troubleshooting

### Common Issues
1. **Charts not loading**: Check if Chart.js dependencies are installed
2. **Responsive issues**: Verify container CSS and chart configuration
3. **Data not displaying**: Check data format and Chart.js registration

### Debug Commands
```bash
# Check dependencies
npm list chart.js react-chartjs-2

# Check container logs
docker logs hvac-dev --tail 50
docker logs hvac-prod --tail 50

# Test site availability
curl -I http://localhost:3002  # Development
curl -I http://localhost:3001  # Production
```

## Future Enhancements

1. **Real-time Data**: Connect to API for live service call data
2. **Additional Charts**: Add pie charts for service type breakdown
3. **Interactive Filters**: Allow users to filter by date range or service type
4. **Export Features**: Enable chart export as images or PDFs
5. **Animation**: Add smooth transitions and hover effects

## Contact
For technical support or questions about the Chart.js integration:
- Birmingham HVAC: (205) 835-0111
- DigitalOcean Server: 142.93.194.81
- Development: https://dev.hvac35242.com
- Production: https://www.hvac35242.com