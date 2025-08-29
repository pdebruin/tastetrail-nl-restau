import { useState, useMemo } from 'react';
import { useKV } from '@github/spark/hooks';
import { Button } from '@/components/ui/button';
import { RestaurantCard } from '@/components/RestaurantCard';
import { FilterBar } from '@/components/FilterBar';
import { MapView } from '@/components/MapView';
import { Restaurant, FilterType, ViewType } from '@/lib/types';
import { defaultRestaurants } from '@/lib/data';
import { List, MapTrifold } from '@phosphor-icons/react';

function App() {
  const [restaurants, setRestaurants] = useKV('tastetrail-restaurants', defaultRestaurants);
  const [currentFilter, setCurrentFilter] = useKV<FilterType>('tastetrail-filter', 'all');
  const [currentView, setCurrentView] = useState<ViewType>('list');

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter(restaurant => {
      switch (currentFilter) {
        case 'visited':
          return restaurant.visited;
        case 'unvisited':
          return !restaurant.visited;
        default:
          return true;
      }
    });
  }, [restaurants, currentFilter]);

  const visitedCount = restaurants.filter(r => r.visited).length;

  const handleToggleVisited = (id: string) => {
    setRestaurants(current => 
      current.map(restaurant =>
        restaurant.id === id 
          ? { ...restaurant, visited: !restaurant.visited }
          : restaurant
      )
    );
  };

  const handleUpdateReview = (id: string, review: string) => {
    setRestaurants(current =>
      current.map(restaurant =>
        restaurant.id === id
          ? { ...restaurant, review }
          : restaurant
      )
    );
  };

  const handleRestaurantClick = (restaurant: Restaurant) => {
    console.log('Restaurant clicked:', restaurant.name);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">TasteTrail NL</h1>
              <p className="text-muted-foreground">Your restaurant bucket list for the Netherlands</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant={currentView === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentView('list')}
              >
                <List size={16} className="mr-2" />
                List
              </Button>
              <Button
                variant={currentView === 'map' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentView('map')}
              >
                <MapTrifold size={16} className="mr-2" />
                Map
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <FilterBar
          currentFilter={currentFilter}
          onFilterChange={setCurrentFilter}
          visitedCount={visitedCount}
          totalCount={restaurants.length}
        />

        {currentView === 'list' ? (
          <div className="space-y-6">
            {filteredRestaurants.length > 0 ? (
              filteredRestaurants.map(restaurant => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  onToggleVisited={handleToggleVisited}
                  onUpdateReview={handleUpdateReview}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {currentFilter === 'visited' 
                    ? "You haven't visited any restaurants yet. Start exploring!"
                    : currentFilter === 'unvisited'
                    ? "Congratulations! You've visited all restaurants in your list."
                    : "No restaurants found."
                  }
                </p>
              </div>
            )}
          </div>
        ) : (
          <MapView
            restaurants={restaurants}
            onRestaurantClick={handleRestaurantClick}
          />
        )}
      </main>
    </div>
  );
}

export default App