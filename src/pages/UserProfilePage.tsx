import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import OrderTracker from '@/components/OrderTracker';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

// --- MOCK DATA ---
const mockOrders = [
  {
    id: 'FEAST-8462',
    date: 'October 23, 2023',
    total: 42.50,
    status: 'Order Placed' as 'Order Placed' | 'In the Kitchen' | 'Out for Delivery' | 'Delivered',
    restaurant: 'Pizzeria Luigi',
    items: [
      { name: 'Margherita Pizza', quantity: 1, price: 25.00 },
      { name: 'Garlic Bread', quantity: 1, price: 10.00 },
      { name: 'Soda', quantity: 2, price: 7.50 },
    ],
  },
  {
    id: 'FEAST-7921',
    date: 'October 15, 2023',
    total: 28.00,
    status: 'Delivered' as 'Order Placed' | 'In the Kitchen' | 'Out for Delivery' | 'Delivered',
    restaurant: 'Sushi House',
    items: [
      { name: 'California Roll', quantity: 2, price: 18.00 },
      { name: 'Miso Soup', quantity: 1, price: 10.00 },
    ],
  },
];

const mockAddresses = [
    { id: 'addr1', type: 'Home', line1: '123 Meadow Lane', city: 'Springfield, USA 12345' },
    { id: 'addr2', type: 'Work', line1: '456 Business Blvd, Suite 500', city: 'Metropolis, USA 54321' },
];

const mockPayments = [
    { id: 'pay1', type: 'Visa', last4: '1234', expiry: '08/26' },
    { id: 'pay2', type: 'Mastercard', last4: '5678', expiry: '11/25' },
];

const UserProfilePage = () => {
  console.log('UserProfilePage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-muted/40">
      <Header />
      <main className="flex-1 py-8 md:py-12">
        <div className="container">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">My Profile</h1>
          <Tabs defaultValue="order-history" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="order-history">Order History</TabsTrigger>
              <TabsTrigger value="saved-addresses">Saved Addresses</TabsTrigger>
              <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
            </TabsList>
            
            {/* Order History Content */}
            <TabsContent value="order-history" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Orders</CardTitle>
                  <CardDescription>View your past and current order details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {mockOrders.map((order) => (
                    <div key={order.id} className="p-6 border rounded-lg">
                      <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-2">
                        <div>
                          <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                          <p className="text-sm text-muted-foreground">{order.restaurant} - {order.date}</p>
                        </div>
                        <div className="text-lg md:text-xl font-bold text-right">
                          ${order.total.toFixed(2)}
                        </div>
                      </div>
                      <Table className="mb-6">
                        <TableHeader>
                          <TableRow>
                            <TableHead>Item</TableHead>
                            <TableHead className="text-center">Quantity</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {order.items.map((item) => (
                            <TableRow key={item.name}>
                              <TableCell className="font-medium">{item.name}</TableCell>
                              <TableCell className="text-center">{item.quantity}</TableCell>
                              <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <OrderTracker currentStatus={order.status} />
                      <div className="flex justify-end space-x-2 mt-6">
                        <Button variant="outline">Reorder</Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" disabled={order.status !== 'Order Placed'}>Cancel Order</Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure you want to cancel?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently cancel your order #{order.id}.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Go Back</AlertDialogCancel>
                              <AlertDialogAction>Confirm Cancellation</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Saved Addresses Content */}
            <TabsContent value="saved-addresses" className="mt-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Saved Addresses</CardTitle>
                        <CardDescription>Manage your delivery addresses.</CardDescription>
                    </div>
                    <Button><PlusCircle className="mr-2 h-4 w-4" /> Add Address</Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockAddresses.map(addr => (
                    <div key={addr.id} className="flex items-center justify-between p-4 border rounded-md">
                        <div>
                            <p className="font-semibold">{addr.type}</p>
                            <p className="text-sm text-muted-foreground">{addr.line1}</p>
                            <p className="text-sm text-muted-foreground">{addr.city}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4" /></Button>
                        </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payment Methods Content */}
            <TabsContent value="payment-methods" className="mt-6">
               <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Payment Methods</CardTitle>
                        <CardDescription>Manage your saved payment options.</CardDescription>
                    </div>
                    <Button><PlusCircle className="mr-2 h-4 w-4" /> Add Payment</Button>
                </CardHeader>
                <CardContent className="space-y-4">
                   {mockPayments.map(pay => (
                     <div key={pay.id} className="flex items-center justify-between p-4 border rounded-md">
                        <div>
                            <p className="font-semibold">{pay.type} ending in {pay.last4}</p>
                            <p className="text-sm text-muted-foreground">Expires {pay.expiry}</p>
                        </div>
                        <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                   ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserProfilePage;