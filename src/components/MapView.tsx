import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Restaurant, UserLocation } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Crosshair, Spinner } from '@phosphor-icons/react';
import { toast } from 'sonner';
import { calculateDistance, formatDistance } from '@/lib/utils';

interface MapViewProps {
  restaurants: Restaurant[];
  onRestaurantClick: (restaurant: Restaurant) => void;
  userLocation: UserLocation | null;
  onUserLocationChange: (location: UserLocation | null) => void;
}

export function MapView({ restaurants, onRestaurantClick, userLocation, onUserLocationChange }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const userLocationMarkerRef = useRef<L.Marker | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState<string>('unknown');

  // Check permission status on mount
  useEffect(() => {
    if ('permissions' in navigator) {
      navigator.permissions.query({ name: 'geolocation' as PermissionName })
        .then((result) => {
          setPermissionStatus(result.state);
          console.log('Geolocation permission:', result.state);
          
          result.onchange = () => {
            setPermissionStatus(result.state);
            console.log('Geolocation permission changed to:', result.state);
          };
        })
        .catch((error) => {
          console.log('Permission query failed:', error);
        });
    }
  }, []);

  const handleLocateUser = () => {
    // Debug logging
    console.log('Geolocation support:', !!navigator.geolocation);
    console.log('Is HTTPS:', window.location.protocol === 'https:');
    console.log('Current URL:', window.location.href);
    console.log('Permission status:', permissionStatus);
    
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by this browser');
      return;
    }

    // Show warning if permission is denied
    if (permissionStatus === 'denied') {
      toast.error('Location access is blocked', {
        description: 'Please enable location in your browser settings and refresh the page',
        duration: 8000
      });
      return;
    }

    setIsLocating(true);
    console.log('Starting geolocation request...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('Geolocation success:', position);
        const { latitude, longitude } = position.coords;
        const newLocation = { lat: latitude, lng: longitude };
        onUserLocationChange(newLocation);
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

          // Pan to user location without changing zoom level
          map.panTo([latitude, longitude], {
            animate: true,
            duration: 1
          });

          toast.success('Found your location!');
        }
      },
      (error) => {
        console.log('Geolocation error:', error);
        setIsLocating(false);
        let errorMessage = 'Unable to get your location';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please enable location permissions and try again.';
            console.log('Error: Permission denied');
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable. Please check your GPS settings.';
            console.log('Error: Position unavailable');
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out. Please try again.';
            console.log('Error: Timeout');
            break;
          default:
            console.log('Error: Unknown error', error.message);
            break;
        }
        
        toast.error(errorMessage, {
          description: 'Check browser permissions and location settings',
          duration: 5000
        });
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
      const distance = userLocation 
        ? calculateDistance(userLocation.lat, userLocation.lng, restaurant.latitude, restaurant.longitude)
        : null;
        
      const popupContent = `
        <div style="font-family: Inter, sans-serif; min-width: 200px;">
          <h3 style="margin: 0 0 8px 0; font-weight: 600; color: #2d3748;">${restaurant.name}</h3>
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
            <p style="margin: 0; color: #4a5568; font-size: 14px;">${restaurant.city}</p>
            ${distance !== null ? `<p style="margin: 0; color: #7ba05b; font-size: 13px; font-weight: 500;">📍 ${formatDistance(distance)}</p>` : ''}
          </div>
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
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
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
        
        {/* Debug info for development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="text-xs bg-card/95 backdrop-blur-sm border border-border rounded p-2 max-w-xs">
            <div>Geolocation: {navigator.geolocation ? '✅' : '❌'}</div>
            <div>Protocol: {window.location.protocol}</div>
            <div>Permission: {permissionStatus}</div>
            <div>Location: {userLocation ? '✅' : '❌'}</div>
          </div>
        )}
      </div>
      
      {/* Location help text */}
      {!userLocation && (
        <div className="absolute bottom-4 left-4 right-4 bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg z-10">
          <p className="text-xs text-muted-foreground">
            <strong>💡 Location Tips:</strong> 
            {permissionStatus === 'denied' ? (
              ' Location access is blocked. Enable location in browser settings and refresh.'
            ) : permissionStatus === 'prompt' ? (
              ' Click "My Location" and allow access when prompted.'
            ) : window.location.protocol !== 'https:' && window.location.hostname !== 'localhost' ? (
              ' Location requires HTTPS or localhost to work properly.'
            ) : (
              ' Click "My Location" to see yourself on the map.'
            )}
          </p>
        </div>
      )}
      
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