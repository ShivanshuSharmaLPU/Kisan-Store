import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import { getProducts, categories } from '@/lib/data';
import heroImage from '@/assets/hero-farm.jpg';

const Index = () => {
  const featured = getProducts().slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        className="relative overflow-hidden min-h-[600px] md:min-h-[680px] flex items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/20" />
        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-2xl text-center md:text-left">
            <span className="inline-block bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
              🌾 Trusted by 10,000+ Farmers
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-foreground drop-shadow-sm">
              Everything Your <span className="text-primary">Farm</span> Needs, Delivered
            </h1>
            <p className="text-foreground/80 text-lg max-w-xl mb-8 mx-auto md:mx-0">
              Premium seeds, pesticides, fertilizers & tools at the best prices. Direct from manufacturers to your doorstep.
            </p>
            <Button asChild size="lg" className="gap-2 text-base shadow-lg">
              <Link to="/products">Shop Now <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Truck, title: 'Free Delivery', desc: 'On orders above ₹999' },
            { icon: Shield, title: 'Genuine Products', desc: '100% authentic guaranteed' },
            { icon: Headphones, title: 'Expert Support', desc: 'Agri experts available 24/7' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-4 bg-card border rounded-xl p-5 shadow-sm">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">{title}</h3>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-2">Shop by Category</h2>
        <p className="text-muted-foreground text-center mb-10">Find exactly what your farm needs</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(c => <CategoryCard key={c.id} {...c} />)}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <p className="text-muted-foreground">Best sellers this season</p>
          </div>
          <Button asChild variant="outline">
            <Link to="/products">View All</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
};

export default Index;
