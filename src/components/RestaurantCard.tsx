import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, Circle, MapPin, Edit3, NavigationArrow } from '@phosphor-icons/react';
import { Restaurant, UserLocation } from '@/lib/types';
import { calculateDistance, formatDistance } from '@/lib/utils';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onToggleVisited: (id: string) => void;
  onUpdateReview: (id: string, review: string) => void;
  userLocation?: UserLocation | null;
}

export function RestaurantCard({ restaurant, onToggleVisited, onUpdateReview, userLocation }: RestaurantCardProps) {
  const [isEditingReview, setIsEditingReview] = useState(false);
  const [reviewText, setReviewText] = useState(restaurant.review || '');

  const handleSaveReview = () => {
    onUpdateReview(restaurant.id, reviewText);
    setIsEditingReview(false);
  };

  const handleCancelReview = () => {
    setReviewText(restaurant.review || '');
    setIsEditingReview(false);
  };

  // Calculate distance if user location is available
  const distance = userLocation 
    ? calculateDistance(userLocation.lat, userLocation.lng, restaurant.latitude, restaurant.longitude)
    : null;

  return (
    <Card className={`transition-all duration-200 hover:shadow-md ${restaurant.visited ? 'ring-2 ring-accent/20' : ''}`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-foreground mb-1">{restaurant.name}</h3>
            <div className="flex items-center text-muted-foreground mb-2 gap-4">
              <div className="flex items-center">
                <MapPin size={16} className="mr-1" />
                <span className="text-sm">{restaurant.city}</span>
              </div>
              {distance !== null && (
                <div className="flex items-center text-primary">
                  <NavigationArrow size={16} className="mr-1" />
                  <span className="text-sm font-medium">{formatDistance(distance)}</span>
                </div>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleVisited(restaurant.id)}
            className={`ml-2 ${restaurant.visited ? 'text-accent hover:text-accent/80' : 'text-muted-foreground hover:text-accent'}`}
          >
            {restaurant.visited ? (
              <CheckCircle size={24} weight="fill" />
            ) : (
              <Circle size={24} />
            )}
          </Button>
        </div>

        {restaurant.description && (
          <p className="text-sm text-muted-foreground mb-3">{restaurant.description}</p>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {restaurant.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Your Review</span>
            {!isEditingReview && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditingReview(true)}
                className="h-8 px-2 text-muted-foreground hover:text-foreground"
              >
                <Edit3 size={16} />
              </Button>
            )}
          </div>
          
          {isEditingReview ? (
            <div className="space-y-2">
              <Textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your experience..."
                className="min-h-[80px] resize-none"
                id={`review-${restaurant.id}`}
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={handleSaveReview}>
                  Save
                </Button>
                <Button size="sm" variant="outline" onClick={handleCancelReview}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              {restaurant.review || 'No review yet. Click to add one!'}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}