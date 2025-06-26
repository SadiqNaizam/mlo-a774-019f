import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Star, Clock } from 'lucide-react';

interface RestaurantCardProps {
  id: string | number;
  slug: string;
  name: string;
  imageUrl: string;
  cuisineTypes: string[];
  rating: number;
  deliveryTime: string;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  name,
  imageUrl,
  cuisineTypes,
  rating,
  deliveryTime,
  slug,
}) => {
  console.log('RestaurantCard loaded for:', name);

  // NOTE: The link points to a static "/restaurant-detail" as per App.tsx.
  // To make it dynamic, the route should be updated to "/restaurant-detail/:slug"
  // and the `to` prop below changed to `/restaurant-detail/${slug}`.
  return (
    <Link to="/restaurant-detail" className="block group outline-none" aria-label={`View details for ${name}`}>
      <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-xl focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <CardHeader className="p-0">
          <AspectRatio ratio={16 / 9}>
            <img
              src={imageUrl || 'https://via.placeholder.com/400x225'}
              alt={`Photo of ${name}`}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          </AspectRatio>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          <CardTitle className="text-lg font-bold tracking-tight line-clamp-1">
            {name}
          </CardTitle>
          <div className="flex flex-wrap items-center gap-2">
            {cuisineTypes.slice(0, 3).map((cuisine) => (
              <Badge key={cuisine} variant="secondary" className="font-normal">
                {cuisine}
              </Badge>
            ))}
            {cuisineTypes.length > 3 && (
                <Badge variant="outline" className="font-normal">
                    +{cuisineTypes.length - 3}
                </Badge>
            )}
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground pt-1">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="font-medium">{rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{deliveryTime}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RestaurantCard;