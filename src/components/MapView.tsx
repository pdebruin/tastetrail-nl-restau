import { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Restaurant } from '@/lib/types';

interface MapViewProps {
  restaurants: Restaurant[];
  onRestaurantClick: (restaurant: Restaurant) => void;
}

export function MapView({ restaurants, onRestaurantClick }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map centered on Netherlands
    const map = L.map(mapRef.current).setView([52.1326, 5.2913], 7);
    mapInstanceRef.current = map;

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Create custom icons for visited/unvisited restaurants
    const createCustomIcon = (visited: boolean) => {
      const color = visited ? '#e78c5c' : '#7ba05b'; // coral for visited, sage for unvisited
      
      return L.divIcon({
        html: `
          <div style="
            background-color: ${color};
            width: 24px;
            height: 24px;
            border-radius: 50%;
            border: 3px solid white;
            box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: white;
            font-size: 12px;
          ">
            ${visited ? '✓' : ''}
          </div>
        `,
        className: 'custom-map-marker',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, -12]
      });
    };

    // Add markers for each restaurant
    restaurants.forEach(restaurant => {
      const marker = L.marker([restaurant.latitude, restaurant.longitude], {
        icon: createCustomIcon(restaurant.visited || false)
      });

      // Create popup content
      const popupContent = `
        <div style="font-family: Inter, sans-serif; min-width: 200px;">
          <h3 style="margin: 0 0 8px 0; font-weight: 600; color: #2d3748;">${restaurant.name}</h3>
          <p style="margin: 0 0 8px 0; color: #4a5568; font-size: 14px;">${restaurant.city}</p>
          ${restaurant.description ? `<p style="margin: 0 0 8px 0; color: #4a5568; font-size: 13px;">${restaurant.description}</p>` : ''}
          <div style="margin: 8px 0;">
            ${restaurant.tags.map(tag => 
              `<span style="
                background: #e2e8f0; 
                color: #4a5568; 
                padding: 2px 6px; 
                border-radius: 12px; 
                font-size: 11px; 
                margin-right: 4px;
                display: inline-block;
                margin-bottom: 2px;
              ">${tag}</span>`
            ).join('')}
          </div>
          ${restaurant.visited ? 
            `<div style="margin-top: 8px; padding: 8px; background: #f0f9ff; border-radius: 6px; border-left: 3px solid #e78c5c;">
              <div style="font-weight: 500; color: #e78c5c; font-size: 12px;">✓ VISITED</div>
              ${restaurant.review ? `<div style="margin-top: 4px; font-size: 13px; color: #4a5568;">"${restaurant.review}"</div>` : ''}
            </div>` : 
            `<div style="margin-top: 8px; padding: 8px; background: #f7fafc; border-radius: 6px; border-left: 3px solid #7ba05b;">
              <div style="font-weight: 500; color: #7ba05b; font-size: 12px;">TO VISIT</div>
            </div>`
          }
        </div>
      `;

      marker.bindPopup(popupContent, {
        maxWidth: 300,
        className: 'custom-popup'
      });

      // Add click handler
      marker.on('click', () => {
        onRestaurantClick(restaurant);
      });

      marker.addTo(map);
      markersRef.current.push(marker);
    });

    // Fit map to show all markers
    if (restaurants.length > 0) {
      const group = new L.featureGroup(markersRef.current);
      map.fitBounds(group.getBounds().pad(0.1));
    }
  }, [restaurants, onRestaurantClick]);

  return (
    <div className="relative">
      <div
        ref={mapRef}
        className="h-[500px] rounded-lg overflow-hidden border border-border"
        style={{ zIndex: 0 }}
      />
      
      {/* Map legend */}
      <div className="absolute top-4 right-4 bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg z-10">
        <h4 className="font-medium text-sm text-foreground mb-2">Legend</h4>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-accent border-2 border-white shadow-sm flex items-center justify-center text-white text-xs font-bold">✓</div>
            <span className="text-muted-foreground">Visited</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-primary border-2 border-white shadow-sm"></div>
            <span className="text-muted-foreground">To Visit</span>
          </div>
        </div>
      </div>
    </div>
  );
}