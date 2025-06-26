import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Plus, Minus } from 'lucide-react';

export interface MenuItemProps {
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ name, description, price, imageUrl }) => {
  const [quantity, setQuantity] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  useEffect(() => {
    console.log(`MenuItem loaded: ${name}`);
  }, [name]);

  const handleAddToOrder = () => {
    console.log(`Adding ${quantity} of ${name} to order.`);
    toast.success(`${name} added to your order!`, {
      description: `Quantity: ${quantity}, Total: $${(price * quantity).toFixed(2)}`,
    });
    setIsDialogOpen(false); // Close the dialog
  };

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };
  
  // Reset quantity to 1 when dialog opens
  useEffect(() => {
    if (isDialogOpen) {
      setQuantity(1);
    }
  }, [isDialogOpen]);

  return (
    <>
      <div className="w-full py-4">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-800">{name}</h3>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{description}</p>
            <p className="text-md font-bold text-gray-900 mt-2">${price.toFixed(2)}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            {imageUrl && (
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-md overflow-hidden bg-gray-100">
                <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
              </div>
            )}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-24 mt-auto">Add</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{name}</DialogTitle>
                  <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="quantity" className="text-right font-semibold">
                      Quantity
                    </Label>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(-1)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        id="quantity"
                        type="number"
                        value={quantity}
                        readOnly
                        className="w-16 text-center"
                      />
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="notes">Special Instructions</Label>
                     <Textarea id="notes" placeholder="e.g. Extra spicy, no onions" />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    className="w-full"
                    onClick={handleAddToOrder}
                  >
                    Add to Order &bull; ${(price * quantity).toFixed(2)}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <Separator />
    </>
  );
};

export default MenuItem;