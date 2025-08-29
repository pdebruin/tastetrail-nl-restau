import { Button } from '@/components/ui/button';
import { FilterType } from '@/lib/types';

interface FilterBarProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  visitedCount: number;
  totalCount: number;
}

export function FilterBar({ currentFilter, onFilterChange, visitedCount, totalCount }: FilterBarProps) {
  const unvisitedCount = totalCount - visitedCount;

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-card rounded-lg border mb-6">
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
  );
}