import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, Banknote, CreditCard, MapPin } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { useAuth } from '@/lib/auth';
import { placeOrder } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, total } = useCart();
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [address, setAddress] = useState(user?.address || '');

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-6">Start shopping to add products</p>
        <Button asChild><Link to="/products">Browse Products</Link></Button>
      </div>
    );
  }

  const handleCheckout = () => {
    if (!user) {
      toast({ title: 'Please login first', description: 'You need to be logged in to place an order', variant: 'destructive' });
      navigate('/login');
      return;
    }
    if (!address.trim()) {
      toast({ title: 'Address required', description: 'Please enter your delivery address', variant: 'destructive' });
      return;
    }
    placeOrder(user.email, items, address);
    updateProfile({ address });
    clearCart();
    toast({ title: '🎉 Order placed successfully!', description: 'Check your profile for order details.' });
    navigate('/profile');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <div className="space-y-4">
        {items.map(({ product, quantity }) => (
          <div key={product.id} className="flex gap-4 items-center border rounded-xl p-4 bg-card">
            <img src={product.image} alt={product.name} className="h-20 w-20 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm truncate">{product.name}</h3>
              <p className="text-primary font-bold">₹{product.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(product.id, quantity - 1)}>
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-8 text-center font-medium text-sm">{quantity}</span>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(product.id, quantity + 1)}>
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <span className="font-bold text-sm w-20 text-right">₹{product.price * quantity}</span>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => removeFromCart(product.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-8 border rounded-xl p-6 bg-card space-y-5">
        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2"><MapPin className="h-4 w-4" /> Delivery Address</h3>
          <Textarea
            placeholder="Enter your full delivery address (House no, Street, City, State, PIN)"
            value={address}
            onChange={e => setAddress(e.target.value)}
            rows={3}
          />
        </div>

        <div>
          <h3 className="font-semibold mb-3">Payment Method</h3>
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-2">
            <div className="flex items-center gap-3 border rounded-lg p-3">
              <RadioGroupItem value="cod" id="cod" />
              <Label htmlFor="cod" className="flex items-center gap-2 cursor-pointer flex-1">
                <Banknote className="h-5 w-5 text-primary" /> Cash on Delivery
              </Label>
            </div>
            <div className="flex items-center gap-3 border rounded-lg p-3">
              <RadioGroupItem value="online" id="online" />
              <Label htmlFor="online" className="flex items-center gap-2 cursor-pointer flex-1">
                <CreditCard className="h-5 w-5 text-primary" /> Online Payment (UPI / Card)
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm"><span>Subtotal</span><span>₹{total()}</span></div>
          <div className="flex justify-between text-sm"><span>Delivery</span><span className="text-primary">Free</span></div>
          <div className="flex justify-between font-bold text-lg border-t pt-2"><span>Total</span><span>₹{total()}</span></div>
        </div>

        <Button className="w-full text-lg py-6" onClick={handleCheckout}>
          Place Order — ₹{total()}
        </Button>
      </div>
    </div>
  );
};

export default Cart;
