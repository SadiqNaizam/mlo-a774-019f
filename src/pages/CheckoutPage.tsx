import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

// Icons
import { CreditCard, Wallet } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  address: z.string().min(5, { message: "Please enter a valid address." }),
  city: z.string().min(2, { message: "Please enter a valid city." }),
  zip: z.string().regex(/^\d{5}$/, { message: "Please enter a valid 5-digit zip code." }),
  paymentMethod: z.enum(['credit-card', 'paypal'], { required_error: "You need to select a payment method." }),
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvc: z.string().optional(),
}).refine(data => {
    if (data.paymentMethod === 'credit-card') {
        return !!data.cardNumber && !!data.expiryDate && !!data.cvc;
    }
    return true;
}, {
    message: "Credit card details are required.",
    path: ["cardNumber"], 
});

// Placeholder Data
const cartItems = [
    { id: 1, name: "Margherita Pizza", price: 12.99, quantity: 1, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60" },
    { id: 2, name: "Soda Can", price: 1.99, quantity: 2, image: "https://images.unsplash.com/photo-1581636625402-29b2a7046c59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60" }
];

const CheckoutPage = () => {
  console.log('CheckoutPage loaded');
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('credit-card');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Guest User",
      address: "123 Feast St",
      city: "Foodville",
      zip: "12345",
      paymentMethod: "credit-card",
    },
  });

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryFee = 5.00;
  const total = subtotal + deliveryFee;

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Order submitted:", values);
    toast.success("Your order has been placed!", {
        description: "You will be redirected to your profile to track it.",
    });
    setTimeout(() => {
        navigate('/user-profile'); // Navigate to user profile page as per user journey
    }, 2000);
  }
  
  // Watch for changes in paymentMethod radio group
  const watchedPaymentMethod = form.watch("paymentMethod");
  useEffect(() => {
    setPaymentMethod(watchedPaymentMethod);
  }, [watchedPaymentMethod]);


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 container py-8">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Checkout</h1>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Form Details */}
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Delivery Information</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={form.control} name="name" render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                            <FormField control={form.control} name="address" render={({ field }) => (
                                <FormItem className="md:col-span-2">
                                    <FormLabel>Street Address</FormLabel>
                                    <FormControl><Input placeholder="123 Main St" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                            <FormField control={form.control} name="city" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl><Input placeholder="Anytown" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                            <FormField control={form.control} name="zip" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ZIP Code</FormLabel>
                                    <FormControl><Input placeholder="12345" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Payment Method</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <FormField control={form.control} name="paymentMethod" render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Label htmlFor="credit-card" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
                                                <RadioGroupItem value="credit-card" id="credit-card" className="sr-only" />
                                                <CreditCard className="mb-3 h-6 w-6" />
                                                Credit Card
                                            </Label>
                                            <Label htmlFor="paypal" className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
                                                <RadioGroupItem value="paypal" id="paypal" className="sr-only" />
                                                <Wallet className="mb-3 h-6 w-6" />
                                                PayPal
                                            </Label>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/>

                            {paymentMethod === 'credit-card' && (
                                <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <FormField control={form.control} name="cardNumber" render={({ field }) => (
                                        <FormItem className="md:col-span-4">
                                            <FormLabel>Card Number</FormLabel>
                                            <FormControl><Input placeholder="•••• •••• •••• ••••" {...field} /></FormControl>
                                        </FormItem>
                                    )}/>
                                    <FormField control={form.control} name="expiryDate" render={({ field }) => (
                                        <FormItem className="md:col-span-2">
                                            <FormLabel>Expiry Date</FormLabel>
                                            <FormControl><Input placeholder="MM/YY" {...field} /></FormControl>
                                        </FormItem>
                                    )}/>
                                    <FormField control={form.control} name="cvc" render={({ field }) => (
                                        <FormItem className="md:col-span-2">
                                            <FormLabel>CVC</FormLabel>
                                            <FormControl><Input placeholder="•••" {...field} /></FormControl>
                                        </FormItem>
                                    )}/>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Order Summary */}
                <div className="lg:col-span-1">
                    <Card className="sticky top-24">
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex justify-between items-center text-sm">
                                        <div className="flex items-center gap-2">
                                            <img src={item.image} alt={item.name} className="h-10 w-10 rounded object-cover" />
                                            <span>{item.name} x {item.quantity}</span>
                                        </div>
                                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                            <Separator />
                            <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Delivery Fee</span>
                                    <span>${deliveryFee.toFixed(2)}</span>
                                </div>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                             <div className="flex gap-2 pt-2">
                                <Input placeholder="Promo Code" />
                                <Button type="button" variant="outline">Apply</Button>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full" size="lg">Place Order</Button>
                        </CardFooter>
                    </Card>
                </div>
            </form>
        </Form>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;