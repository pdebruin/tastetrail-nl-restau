import { Input } from '@/components/ui/input';
import { MagnifyingGlass, X } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  placeholder?: string;
}

export function SearchBar({ searchQuery, onSearchChange, placeholder = "Search restaurants, cities, or cuisine..." }: SearchBarProps) {
  const handleClear = () => {
    onSearchChange('');
  };

  return (
    <div className="relative flex-1">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
        <MagnifyingGlass size={16} />
      </div>
      <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 pr-10 text-sm sm:text-base"
      />
      {searchQuery && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 hover:bg-muted-foreground/10"
        >
          <X size={14} />
        </Button>
      )}
    </div>
  );
}