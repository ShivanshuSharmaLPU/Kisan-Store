import aboutImage from '@/assets/about-farmers.jpg';
import { Card } from '@/components/ui/card';
import { Sprout, Users, Truck, ShieldCheck } from 'lucide-react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
          About KisanMitra
        </h1>
        <p className="text-muted-foreground text-lg">
          Empowering Indian farmers with quality supplies, fair prices, and trusted service — straight from trusted brands to your farm.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
        <img
          src={aboutImage}
          alt="Indian farmers working together in a green field at sunrise"
          width={1280}
          height={768}
          loading="lazy"
          className="w-full h-auto rounded-2xl shadow-lg object-cover"
        />
        <div className="space-y-4">
          <h2 className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
            Our Story
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            KisanMitra (किसान मित्र — "Farmer's Friend") was born from a simple idea: every farmer deserves easy access to high-quality seeds, fertilizers, tools, and modern equipment without middlemen inflating the price.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We work directly with manufacturers and certified suppliers to bring you authentic agricultural products, delivered right to your village. Our mission is to make farming more profitable, sustainable, and dignified.
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        {[
          { icon: Sprout, title: 'Quality Products', desc: 'Certified seeds, fertilizers & tools.' },
          { icon: Users, title: '10,000+ Farmers', desc: 'Trusted across rural India.' },
          { icon: Truck, title: 'Fast Delivery', desc: 'Direct to your doorstep.' },
          { icon: ShieldCheck, title: 'Fair Pricing', desc: 'No middlemen, no markup.' },
        ].map(({ icon: Icon, title, desc }) => (
          <Card key={title} className="p-6 text-center hover:shadow-md transition-shadow">
            <Icon className="h-10 w-10 mx-auto mb-3 text-primary" />
            <h3 className="font-semibold mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{desc}</p>
          </Card>
        ))}
      </div>

      <section className="max-w-3xl mx-auto text-center bg-card border rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
          Our Mission 🌾
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          To bridge the gap between modern agriculture and the Indian farmer — by providing accessible technology, transparent pricing, and reliable support that helps every farm grow stronger, season after season.
        </p>
      </section>
    </div>
  );
};

export default About;
