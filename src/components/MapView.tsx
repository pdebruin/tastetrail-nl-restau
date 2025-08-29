import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Restaurant } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Crosshair, Spinner } from '@phosphor-icons/react';
import { toast } from 'sonner';

interface MapViewProps {
  restaurants: Restaurant[];
  onRestaurantClick: (restaurant: Restaurant) => void;
}

export function MapView({ restaurants, onRestaurantClick }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const userLocationMarkerRef = useRef<L.Marker | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  const handleLocateUser = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by this browser');
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newLocation = { lat: latitude, lng: longitude };
        setUserLocation(newLocation);
        setIsLocating(false);

        const map = mapInstanceRef.current;
        if (map) {
          // Remove existing user location marker
          if (userLocationMarkerRef.current) {
            userLocationMarkerRef.current.remove();
          }

          // Create user location icon
          const userIcon = L.divIcon({
            html: `
              <div style="
                background-color: #3b82f6;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                border: 3px solid white;
                box-shadow: 0 2px 6px rgba(0,0,0,0.3);
                position: relative;
              ">
                <div style="
                  position: absolute;
                  top: -8px;
                  left: -8px;
                  width: 32px;
                  height: 32px;
                  border-radius: 50%;
                  background-color: rgba(59, 130, 246, 0.2);
                  border: 2px solid rgba(59, 130, 246, 0.4);
                  animation: pulse 2s infinite;
                "></div>
              </div>
            `,
            className: 'user-location-marker',
            iconSize: [22, 22],
            iconAnchor: [11, 11],
            popupAnchor: [0, -11]
          });

          // Add user location marker
          const userMarker = L.marker([latitude, longitude], {
            icon: userIcon
          }).addTo(map);

          userMarker.bindPopup(`
            <div style="font-family: Inter, sans-serif; text-align: center;">
              <div style="margin: 0; font-weight: 600; color: #3b82f6;">📍 Your Location</div>
              <div style="margin-top: 4px; font-size: 12px; color: #6b7280;">
                ${latitude.toFixed(4)}, ${longitude.toFixed(4)}
              </div>
            </div>
          `, {
            className: 'custom-popup'
          });

          userLocationMarkerRef.current = userMarker;

          // Pan to user location
          map.setView([latitude, longitude], Math.max(map.getZoom(), 12), {
            animate: true,
            duration: 1
          });

          toast.success('Found your location!');
        }
      },
      (error) => {
        setIsLocating(false);
        let errorMessage = 'Unable to get your location';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please enable location permissions.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
        }
        
        toast.error(errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  };

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
      if (userLocationMarkerRef.current) {
        userLocationMarkerRef.current.remove();
        userLocationMarkerRef.current = null;
      }
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
      
      {/* Locate user button */}
      <div className="absolute top-4 left-4 z-10">
        <Button
          size="sm"
          variant="secondary"
          onClick={handleLocateUser}
          disabled={isLocating}
          className="bg-card/95 backdrop-blur-sm border border-border shadow-lg hover:bg-card"
        >
          {isLocating ? (
            <Spinner size={16} className="mr-2 animate-spin" />
          ) : (
            <Crosshair size={16} className="mr-2" />
          )}
          {isLocating ? 'Locating...' : 'My Location'}
        </Button>
      </div>
      
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
          {userLocation && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-sm"></div>
              <span className="text-muted-foreground">Your Location</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}