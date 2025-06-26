import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MenuItem, { MenuItemProps } from '@/components/MenuItem';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Star, MapPin, Clock } from 'lucide-react';

// --- Placeholder Data ---

const restaurant = {
  name: "Mama's Pizzeria",
  cuisine: ['Italian', 'Pizza'],
  rating: 4.5,
  reviews: 258,
  address: '123 Pizza Lane, Flavor Town, USA',
  hours: '11:00 AM - 10:00 PM',
  imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
};

const menuCategories: { name: string; items: MenuItemProps[] }[] = [
  {
    name: 'Pizzas',
    items: [
      {
        name: 'Margherita Pizza',
        description: 'Classic delight with fresh mozzarella, tomatoes, fresh basil, salt, and extra-virgin olive oil.',
        price: 14.99,
        imageUrl: 'https://images.unsplash.com/photo-1598021680135-2d885b927502?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        name: 'Pepperoni Pizza',
        description: 'A timeless favorite with a generous layer of spicy pepperoni and melted mozzarella cheese.',
        price: 16.99,
        imageUrl: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
  },
  {
    name: 'Pastas',
    items: [
      {
        name: 'Spaghetti Carbonara',
        description: 'Creamy pasta with pancetta, pecorino cheese, and a hint of black pepper.',
        price: 18.50,
        imageUrl: 'https://images.unsplash.com/photo-1588013273468-31508b946d4d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        name: 'Fettuccine Alfredo',
        description: 'Rich and cheesy fettuccine pasta in a classic Alfredo sauce.',
        price: 17.00,
        imageUrl: 'https://images.unsplash.com/photo-1621996346565-e326e20f0e28?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
  },
  {
    name: 'Desserts',
    items: [
      {
        name: 'Tiramisu',
        description: 'A coffee-flavoured Italian dessert. Ladyfingers dipped in coffee, layered with a whipped mixture of eggs, sugar, and mascarpone cheese.',
        price: 8.99,
        imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
  },
];

const RestaurantDetailPage = () => {
  console.log('RestaurantDetailPage loaded');

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        {/* Banner Image */}
        <section className="relative h-48 w-full sm:h-64 md:h-80">
          <img
            src={restaurant.imageUrl}
            alt={`${restaurant.name} banner`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </section>

        <div className="container mx-auto max-w-5xl px-4 py-8">
          {/* Restaurant Info Header */}
          <Card className="-mt-20 md:-mt-24 shadow-lg border-none z-10 relative bg-background">
            <CardContent className="p-6">
              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{restaurant.name}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                {restaurant.cuisine.map((c) => (
                  <Badge key={c} variant="secondary" className="text-sm">
                    {c}
                  </Badge>
                ))}
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-semibold text-foreground">{restaurant.rating}</span> ({restaurant.reviews} reviews)
                </div>
              </div>
              <div className="mt-4 space-y-1 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 flex-shrink-0" />
                  <span>{restaurant.address}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="h-4 w-4 flex-shrink-0" />
                  <span>Open today: {restaurant.hours}</span>
                </p>
              </div>
            </CardContent>
          </Card>
          
          {/* Menu Section */}
          <section className="mt-12">
            {menuCategories.map((category) => (
              <div key={category.name} className="mb-10">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {category.name}
                </h2>
                <Separator className="my-4" />
                <div className="flex flex-col">
                  {category.items.map((item) => (
                    <MenuItem
                      key={item.name}
                      name={item.name}
                      description={item.description}
                      price={item.price}
                      imageUrl={item.imageUrl}
                    />
                  ))}
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RestaurantDetailPage;