import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RestaurantCard from '@/components/RestaurantCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

// Placeholder data for restaurant cards
const featuredRestaurants = [
  {
    id: 1,
    slug: 'the-golden-spoon',
    name: 'The Golden Spoon',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    cuisineTypes: ['Thai', 'Asian', 'Noodles'],
    rating: 4.7,
    deliveryTime: '20-30 min',
  },
  {
    id: 2,
    slug: 'burger-bliss',
    name: 'Burger Bliss',
    imageUrl: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    cuisineTypes: ['American', 'Burgers', 'Fries'],
    rating: 4.5,
    deliveryTime: '15-25 min',
  },
  {
    id: 3,
    slug: 'pizza-palazzo',
    name: 'Pizza Palazzo',
    imageUrl: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    cuisineTypes: ['Italian', 'Pizza', 'Pasta'],
    rating: 4.8,
    deliveryTime: '25-35 min',
  },
  {
    id: 4,
    slug: 'sushi-sensation',
    name: 'Sushi Sensation',
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    cuisineTypes: ['Japanese', 'Sushi', 'Seafood'],
    rating: 4.9,
    deliveryTime: '30-40 min',
  },
];

const popularRestaurants = [
  {
    id: 5,
    slug: 'taco-fiesta',
    name: 'Taco Fiesta',
    imageUrl: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    cuisineTypes: ['Mexican', 'Tacos', 'Burritos'],
    rating: 4.6,
    deliveryTime: '20-30 min',
  },
  {
    id: 6,
    slug: 'veggie-delight',
    name: 'Veggie Delight',
    imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    cuisineTypes: ['Vegetarian', 'Healthy', 'Salads'],
    rating: 4.8,
    deliveryTime: '15-25 min',
  },
  {
    id: 7,
    slug: 'the-noodle-house',
    name: 'The Noodle House',
    imageUrl: 'https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    cuisineTypes: ['Chinese', 'Noodles', 'Asian'],
    rating: 4.4,
    deliveryTime: '25-35 min',
  },
    {
    id: 8,
    slug: 'bbq-central',
    name: 'BBQ Central',
    imageUrl: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    cuisineTypes: ['BBQ', 'American', 'Ribs'],
    rating: 4.7,
    deliveryTime: '35-45 min',
  },
];


const HomePage: React.FC = () => {
  console.log('HomePage loaded');
  const navigate = useNavigate();

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Navigate to the restaurant listing page upon search
    navigate('/restaurant-listing');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center text-center text-white">
          <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
            alt="A table spread with various delicious food"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-20 container px-4 space-y-4">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
              Your next meal, delivered.
            </h1>
            <p className="text-lg md:text-xl text-white/90 drop-shadow-md max-w-2xl mx-auto">
              Discover local restaurants, browse menus, and order your favorite food with a few clicks.
            </p>
            <form
              onSubmit={handleSearchSubmit}
              className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2 max-w-xl mx-auto"
            >
              <div className="relative w-full">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Enter your delivery address..."
                  className="w-full h-12 pl-10 text-black"
                />
              </div>
              <Button type="submit" size="lg" className="w-full sm:w-auto h-12">
                Find Food
              </Button>
            </form>
          </div>
        </section>

        {/* Featured Restaurants Section */}
        <section className="py-12 md:py-20 bg-muted/20">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tight mb-8">Featured Restaurants</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} {...restaurant} />
              ))}
            </div>
          </div>
        </section>

        {/* Popular Near You Section */}
        <section className="py-12 md:py-20">
          <div className="container">
            <h2 className="text-3xl font-bold tracking-tight mb-8">Popular Near You</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {popularRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} {...restaurant} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;