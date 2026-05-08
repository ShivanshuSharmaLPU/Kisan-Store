import { Star, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Product } from '@/lib/data';
import { useCart } from '@/lib/cart';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast({ title: 'Added to cart', description: `${product.name} added successfully` });
  };

  return (
    <Link to={`/product/${product.id}`}>
      <Card className="group overflow-hidden border-2 border-border hover:border-primary hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className="aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
        <CardContent className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-accent">
              <Star className="h-3.5 w-3.5 fill-current" />
              <span className="text-xs font-medium text-foreground">{product.rating}</span>
            </div>
          </div>
          <h3 className="font-semibold text-sm leading-tight line-clamp-1" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between pt-1">
            <span className="text-lg font-bold text-primary">₹{product.price}</span>
            <Button size="sm" onClick={handleAdd} className="gap-1.5">
              <ShoppingCart className="h-3.5 w-3.5" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
