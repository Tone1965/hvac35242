import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface ServiceArea {
  zip: string;
  name: string;
  lat: number;
  lng: number;
  priority: 'high' | 'medium' | 'standard';
  responseTime: string;
}

export const ServiceAreaMap: React.FC = () => {
  useEffect(() => {
    // Initialize map
    const map = L.map('service-area-map').setView([33.5186, -86.8104], 10);

    // Add OpenStreetMap tiles (FREE - no API key needed)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors | Birmingham HVAC Service Areas',
    }).addTo(map);

    // Birmingham service areas
    const serviceAreas: ServiceArea[] = [
      { zip: '35223', name: 'Mountain Brook', lat: 33.5007, lng: -86.7522, priority: 'high', responseTime: 'Fastest' },
      { zip: '35242', name: 'Hoover', lat: 33.4054, lng: -86.8128, priority: 'high', responseTime: 'Fastest' },
      { zip: '35213', name: 'Vestavia Hills', lat: 33.4487, lng: -86.7877, priority: 'high', responseTime: 'Fastest' },
      { zip: '35124', name: 'Pelham', lat: 33.2851, lng: -86.8099, priority: 'medium', responseTime: 'Fast' },
      { zip: '35080', name: 'Helena', lat: 33.2962, lng: -86.8436, priority: 'medium', responseTime: 'Fast' },
      { zip: '35022', name: 'Bessemer', lat: 33.4018, lng: -86.9544, priority: 'medium', responseTime: 'Fast' },
      { zip: '35244', name: 'Hoover East', lat: 33.3731, lng: -86.8025, priority: 'high', responseTime: 'Fastest' },
      { zip: '35243', name: 'Cahaba Heights', lat: 33.4426, lng: -86.7419, priority: 'high', responseTime: 'Fastest' },
      { zip: '35216', name: 'Birmingham West', lat: 33.5446, lng: -86.8939, priority: 'standard', responseTime: 'Quick' },
      { zip: '35226', name: 'Birmingham South', lat: 33.4112, lng: -86.8325, priority: 'medium', responseTime: 'Fast' },
    ];

    // Add service area circles
    serviceAreas.forEach((area) => {
      const colors = {
        high: '#10b981',    // Green for high priority
        medium: '#3b82f6',  // Blue for medium priority
        standard: '#8b5cf6' // Purple for standard
      };

      const circle = L.circle([area.lat, area.lng], {
        color: colors[area.priority],
        fillColor: colors[area.priority],
        fillOpacity: 0.3,
        radius: 5000, // 5km radius
        weight: 2,
      }).addTo(map);

      // Add popup with service information
      circle.bindPopup(`
        <div class="service-popup">
          <h3 class="font-bold text-lg">${area.name} (${area.zip})</h3>
          <p class="text-sm mt-2">
            <span class="font-semibold">Response Time:</span> ${area.responseTime}<br>
            <span class="font-semibold">Service Level:</span> ${area.priority.charAt(0).toUpperCase() + area.priority.slice(1)} Priority<br>
            <span class="font-semibold">Available:</span> 24/7 Emergency Service
          </p>
          <div class="mt-3">
            <a href="tel:205-835-0111" class="text-blue-600 font-bold">
              Call (205) 835-0111
            </a>
          </div>
        </div>
      `);
    });

    // Add 24/7 emergency service zone
    const emergencyZone = L.circle([33.5186, -86.8104], {
      color: '#dc2626',
      fillColor: '#dc2626',
      fillOpacity: 0.05,
      radius: 30000, // 30km emergency response zone
      dashArray: '10, 5',
      weight: 3,
    }).addTo(map);

    emergencyZone.bindPopup(
      '<div class="text-center"><b class="text-red-600">24/7 Emergency Service Zone</b><br>Fast response for urgent HVAC needs!</div>'
    );

    // Add legend
    const legend = new L.Control({ position: 'bottomright' });
    legend.onAdd = function () {
      const div = L.DomUtil.create('div', 'info legend');
      div.style.backgroundColor = 'white';
      div.style.padding = '10px';
      div.style.borderRadius = '5px';
      div.style.boxShadow = '0 1px 5px rgba(0,0,0,0.2)';
      
      div.innerHTML = `
        <div style="font-weight: bold; margin-bottom: 5px;">Service Priority</div>
        <div><span style="display:inline-block;width:20px;height:20px;background:#10b981;margin-right:5px;"></span>High Priority</div>
        <div><span style="display:inline-block;width:20px;height:20px;background:#3b82f6;margin-right:5px;"></span>Medium Priority</div>
        <div><span style="display:inline-block;width:20px;height:20px;background:#8b5cf6;margin-right:5px;"></span>Standard</div>
        <div style="margin-top:5px;"><span style="display:inline-block;width:20px;height:20px;border:2px dashed #dc2626;margin-right:5px;"></span>Emergency Zone</div>
      `;
      
      return div;
    };
    legend.addTo(map);

    // Cleanup
    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className="service-area-map-container">
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold mb-2">Birmingham HVAC Service Coverage</h2>
        <p className="text-gray-600">
          Interactive map showing our service areas across Birmingham metro
        </p>
      </div>
      <div id="service-area-map" style={{ height: '500px', width: '100%' }} className="rounded-lg shadow-lg"></div>
      <div className="mt-4 text-center text-sm text-gray-600">
        <p>📍 Serving 46 ZIP codes across Birmingham, Hoover, Mountain Brook, and surrounding areas</p>
        <p className="mt-2">
          Need service? Call{' '}
          <a href="tel:205-835-0111" className="text-blue-600 font-bold">
            (205) 835-0111
          </a>
        </p>
      </div>
    </div>
  );
};