import { useState, useMemo } from 'react';
import { useKV } from '@github/spark/hooks';
import { toast, Toaster } from 'sonner';
import { Button } from '@/components/ui/button';
import { RestaurantCard } from '@/components/RestaurantCard';
import { FilterBar } from '@/components/FilterBar';
import { MapView } from '@/components/MapView';
import { Restaurant, FilterType, ViewType, SortType, UserLocation } from '@/lib/types';
import { defaultRestaurants } from '@/lib/data';
import { calculateDistance } from '@/lib/utils';
import { List, MapTrifold } from '@phosphor-icons/react';
import logoImage from '@/assets/images/download.png';

function App() {
  const [restaurants, setRestaurants] = useKV('tastetrail-restaurants', defaultRestaurants);
  const [currentFilter, setCurrentFilter] = useKV<FilterType>('tastetrail-filter', 'all');
  const [searchQuery, setSearchQuery] = useKV<string>('tastetrail-search', '');
  const [sortBy, setSortBy] = useKV<SortType>('tastetrail-sort', 'name');
  const [currentView, setCurrentView] = useState<ViewType>('list');
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);

  const filteredAndSortedRestaurants = useMemo(() => {
    let filtered = restaurants;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(restaurant => 
        restaurant.name.toLowerCase().includes(query) ||
        restaurant.city.toLowerCase().includes(query) ||
        restaurant.tags.some(tag => tag.toLowerCase().includes(query)) ||
        (restaurant.description && restaurant.description.toLowerCase().includes(query))
      );
    }

    // Apply visit status filter
    filtered = filtered.filter(restaurant => {
      switch (currentFilter) {
        case 'visited':
          return restaurant.visited;
        case 'unvisited':
          return !restaurant.visited;
        default:
          return true;
      }
    });

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'city':
          return a.city.localeCompare(b.city);
        case 'distance':
          if (!userLocation) return 0;
          const distanceA = calculateDistance(userLocation.lat, userLocation.lng, a.latitude, a.longitude);
          const distanceB = calculateDistance(userLocation.lat, userLocation.lng, b.latitude, b.longitude);
          return distanceA - distanceB;
        default:
          return 0;
      }
    });

    return sorted;
  }, [restaurants, currentFilter, searchQuery, sortBy, userLocation]);

  const visitedCount = restaurants.filter(r => r.visited).length;

  const handleFilterChange = (filter: FilterType) => {
    setCurrentFilter(filter);
    // Optionally clear search when changing filters for better UX
    // setSearchQuery('');
  };

  const handleToggleVisited = (id: string) => {
    setRestaurants(current => 
      current.map(restaurant =>
        restaurant.id === id 
          ? { ...restaurant, visited: !restaurant.visited }
          : restaurant
      )
    );
  };

  const handleUpdateReview = (id: string, review: string, reviewDate?: string) => {
    setRestaurants(current =>
      current.map(restaurant =>
        restaurant.id === id
          ? { 
              ...restaurant, 
              review,
              reviewDate: reviewDate || new Date().toISOString()
            }
          : restaurant
      )
    );
  };

  const handleRestaurantClick = (restaurant: Restaurant) => {
    const status = restaurant.visited ? 'visited' : 'on your list';
    toast.success(`${restaurant.name} in ${restaurant.city} is ${status}`, {
      description: restaurant.description || restaurant.tags.join(', '),
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Toaster position="top-right" />
      <header className="bg-card border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src={logoImage} 
                alt="TasteTrail NL Logo" 
                className="w-10 h-10 object-contain"
              />
              <div>
                <h1 className="text-2xl font-bold text-foreground">TasteTrail NL</h1>
                <p className="text-muted-foreground">Your restaurant bucket list for the Netherlands</p>
              </div>
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
          onFilterChange={handleFilterChange}
          visitedCount={visitedCount}
          totalCount={restaurants.length}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          userLocation={userLocation}
        />

        {currentView === 'list' ? (
          <div className="space-y-6">
            {searchQuery.trim() && (
              <div className="text-sm text-muted-foreground">
                {filteredAndSortedRestaurants.length} restaurant{filteredAndSortedRestaurants.length !== 1 ? 's' : ''} found for "{searchQuery}"
              </div>
            )}
            {filteredAndSortedRestaurants.length > 0 ? (
              filteredAndSortedRestaurants.map(restaurant => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  onToggleVisited={handleToggleVisited}
                  onUpdateReview={handleUpdateReview}
                  userLocation={userLocation}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {searchQuery.trim() 
                    ? `No restaurants found matching "${searchQuery}"`
                    : currentFilter === 'visited' 
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
            restaurants={filteredAndSortedRestaurants}
            onRestaurantClick={handleRestaurantClick}
            userLocation={userLocation}
            onUserLocationChange={setUserLocation}
          />
        )}
      </main>
    </div>
  );
}

export default App