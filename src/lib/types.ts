export interface Restaurant {
  id: string;
  name: string;
  city: string;
  tags: string[];
  latitude: number;
  longitude: number;
  description?: string;
  visited?: boolean;
  review?: string;
}

export type FilterType = 'all' | 'visited' | 'unvisited';

export type ViewType = 'list' | 'map';

export type SortType = 'name' | 'city' | 'distance';

export interface UserLocation {
  lat: number;
  lng: number;
}