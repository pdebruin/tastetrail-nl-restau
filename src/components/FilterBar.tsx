import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SearchBar } from '@/components/SearchBar';
import { FilterType, SortType, UserLocation } from '@/lib/types';
import { ArrowsDownUp } from '@phosphor-icons/react';

interface FilterBarProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  visitedCount: number;
  totalCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: SortType;
  onSortChange: (sort: SortType) => void;
  userLocation: UserLocation | null;
}

export function FilterBar({ 
  currentFilter, 
  onFilterChange, 
  visitedCount, 
  totalCount, 
  searchQuery, 
  onSearchChange,
  sortBy,
  onSortChange,
  userLocation
}: FilterBarProps) {
  const unvisitedCount = totalCount - visitedCount;

  return (
    <div className="space-y-4 mb-6">
      {/* Search Bar and Sort */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-card rounded-lg border">
        <div className="flex-1">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
          />
        </div>
        <div className="flex items-center gap-2 min-w-[140px]">
          <ArrowsDownUp size={16} className="text-muted-foreground" />
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="city">City</SelectItem>
              <SelectItem value="distance" disabled={!userLocation}>
                Distance {!userLocation && '(location needed)'}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Filter Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-card rounded-lg border">
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={currentFilter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onFilterChange('all')}
            className="flex-1 sm:flex-none"
          >
            All ({totalCount})
          </Button>
          <Button
            variant={currentFilter === 'visited' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onFilterChange('visited')}
            className="flex-1 sm:flex-none text-accent border-accent hover:bg-accent hover:text-accent-foreground"
          >
            Visited ({visitedCount})
          </Button>
          <Button
            variant={currentFilter === 'unvisited' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onFilterChange('unvisited')}
            className="flex-1 sm:flex-none"
          >
            To Visit ({unvisitedCount})
          </Button>
        </div>
        
        <div className="text-sm text-muted-foreground flex items-center">
          Progress: {visitedCount}/{totalCount} restaurants visited
        </div>
      </div>
    </div>
  );
}