import { Restaurant } from '@/lib/types';

interface MapViewProps {
  restaurants: Restaurant[];
  onRestaurantClick: (restaurant: Restaurant) => void;
}

export function MapView({ restaurants, onRestaurantClick }: MapViewProps) {
  return (
    <div className="relative h-[500px] bg-secondary rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center p-8">
          <h3 className="text-lg font-semibold text-foreground mb-2">Interactive Map Coming Soon</h3>
          <p className="text-muted-foreground">
            This feature will show all restaurants on an interactive map of the Netherlands.
          </p>
        </div>
      </div>
      
      {/* Placeholder pins visualization */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" viewBox="0 0 400 300">
          {restaurants.slice(0, 8).map((restaurant, index) => (
            <circle
              key={restaurant.id}
              cx={50 + (index % 4) * 80}
              cy={60 + Math.floor(index / 4) * 80}
              r="6"
              fill="currentColor"
              className={`cursor-pointer transition-colors ${
                restaurant.visited ? 'text-accent' : 'text-primary'
              }`}
              onClick={() => onRestaurantClick(restaurant)}
            />
          ))}
        </svg>
      </div>
    </div>
  );
}