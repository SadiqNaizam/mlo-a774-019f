import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RestaurantCard from '@/components/RestaurantCard';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

// Placeholder data for restaurants
const restaurants = [
  {
    id: 1,
    slug: 'pasta-paradiso',
    name: 'Pasta Paradiso',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80',
    cuisineTypes: ['Italian', 'Pizza', 'Pasta'],
    rating: 4.7,
    deliveryTime: '25-35 min',
  },
  {
    id: 2,
    slug: 'sushi-central',
    name: 'Sushi Central',
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    cuisineTypes: ['Japanese', 'Sushi', 'Asian'],
    rating: 4.9,
    deliveryTime: '30-40 min',
  },
  {
    id: 3,
    slug: 'the-burger-joint',
    name: 'The Burger Joint',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=699&q=80',
    cuisineTypes: ['American', 'Burgers', 'Fries'],
    rating: 4.5,
    deliveryTime: '20-30 min',
  },
  {
    id: 4,
    slug: 'taco-fiesta',
    name: 'Taco Fiesta',
    imageUrl: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80',
    cuisineTypes: ['Mexican', 'Tacos', 'Burritos'],
    rating: 4.6,
    deliveryTime: '25-35 min',
  },
  {
    id: 5,
    slug: 'veggie-delight',
    name: 'Veggie Delight',
    imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    cuisineTypes: ['Vegetarian', 'Healthy', 'Salads'],
    rating: 4.8,
    deliveryTime: '15-25 min',
  },
  {
    id: 6,
    slug: 'pho-king',
    name: 'Pho King',
    imageUrl: 'https://images.unsplash.com/photo-1585101647909-541543a68135?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    cuisineTypes: ['Vietnamese', 'Noodles', 'Pho'],
    rating: 4.7,
    deliveryTime: '35-45 min',
  },
];

const cuisineOptions = ['Italian', 'Japanese', 'American', 'Mexican', 'Vegetarian', 'Vietnamese', 'Thai', 'Indian'];

const RestaurantListingPage = () => {
  console.log('RestaurantListingPage loaded');
  const [priceRange, setPriceRange] = useState([50]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 w-full">
        <div className="container py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Restaurants Near You</h1>
            <p className="text-lg text-muted-foreground mt-2">Discover a world of flavors waiting for you.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
            {/* Filters Sidebar */}
            <aside className="hidden md:block">
              <div className="sticky top-24 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Filters
                  </h2>
                  <Button variant="ghost" size="sm">Reset</Button>
                </div>
                <Accordion type="multiple" defaultValue={['cuisine', 'price']} className="w-full">
                  <AccordionItem value="cuisine">
                    <AccordionTrigger className="text-base font-medium">Cuisine</AccordionTrigger>
                    <AccordionContent className="pt-2 space-y-3">
                      {cuisineOptions.map(cuisine => (
                        <div key={cuisine} className="flex items-center space-x-2">
                          <Checkbox id={`cuisine-${cuisine}`} />
                          <Label htmlFor={`cuisine-${cuisine}`} className="font-normal text-sm">{cuisine}</Label>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="price">
                    <AccordionTrigger className="text-base font-medium">Price Range</AccordionTrigger>
                    <AccordionContent className="pt-4 space-y-2">
                       <Slider
                          defaultValue={priceRange}
                          max={100}
                          step={1}
                          onValueChange={setPriceRange}
                        />
                        <div className="text-sm text-muted-foreground text-center">Up to ${priceRange[0]}</div>
                    </AccordionContent>
                  </AccordionItem>
                   <AccordionItem value="rating">
                    <AccordionTrigger className="text-base font-medium">Rating</AccordionTrigger>
                    <AccordionContent className="pt-2 space-y-3">
                      {[4.5, 4.0, 3.5].map(rating => (
                         <div key={rating} className="flex items-center space-x-2">
                          <Checkbox id={`rating-${rating}`} />
                          <Label htmlFor={`rating-${rating}`} className="font-normal text-sm">{rating} & up</Label>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </aside>
            
            {/* Restaurant Grid */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">{restaurants.length} results</p>
                <Select defaultValue="rating">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rating</SelectItem>
                    <SelectItem value="delivery_time">Delivery Time</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurants.map(restaurant => (
                  <RestaurantCard key={restaurant.id} {...restaurant} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RestaurantListingPage;