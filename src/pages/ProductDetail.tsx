import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, Package, Truck, Shield, Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { getProduct, getProducts } from '@/lib/data';
import { useCart } from '@/lib/cart';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import ProductCard from '@/components/ProductCard';

const ProductDetail = () => {
  const { id } = useParams();
  const product = getProduct(id || '');
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
        <Button asChild><Link to="/products">Browse Products</Link></Button>
      </div>
    );
  }

  const related = getProducts().filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    toast({ title: 'Added to cart', description: `${qty}× ${product.name} added` });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Link to="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="h-4 w-4" /> Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Image */}
        <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        </div>

        {/* Details */}
        <div className="space-y-5">
          <div>
            <Badge variant="secondary" className="uppercase text-xs mb-2">{product.category}</Badge>
            <h1 className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>{product.name}</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`} />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">{product.rating} rating</span>
            <span className="text-sm text-muted-foreground">• {product.sold} sold</span>
          </div>

          <p className="text-3xl font-bold text-primary">₹{product.price}</p>

          <p className="text-muted-foreground leading-relaxed">{product.description}</p>

          <Separator />

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Quantity:</span>
            <div className="flex items-center border rounded-lg">
              <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setQty(Math.max(1, qty - 1))}><Minus className="h-4 w-4" /></Button>
              <span className="w-10 text-center font-medium">{qty}</span>
              <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setQty(Math.min(product.stock, qty + 1))}><Plus className="h-4 w-4" /></Button>
            </div>
            <span className="text-sm text-muted-foreground">{product.stock} in stock</span>
          </div>

          <Button size="lg" className="w-full gap-2 text-base" onClick={handleAdd}>
            <ShoppingCart className="h-5 w-5" /> Add to Cart — ₹{product.price * qty}
          </Button>

          <div className="grid grid-cols-3 gap-3 pt-2">
            {[
              { icon: Truck, label: 'Free Delivery', sub: 'Orders above ₹500' },
              { icon: Shield, label: 'Quality Assured', sub: '100% genuine' },
              { icon: Package, label: 'Easy Returns', sub: '7-day policy' },
            ].map(({ icon: Icon, label, sub }) => (
              <Card key={label}>
                <CardContent className="p-3 text-center">
                  <Icon className="h-5 w-5 mx-auto mb-1 text-primary" />
                  <p className="text-xs font-medium">{label}</p>
                  <p className="text-[10px] text-muted-foreground">{sub}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
