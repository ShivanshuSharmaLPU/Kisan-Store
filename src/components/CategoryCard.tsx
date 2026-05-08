import { Link } from 'react-router-dom';

const CategoryCard = ({ id, label, icon, description }: { id: string; label: string; icon: string; description: string }) => (
  <Link
    to={`/products?category=${id}`}
    className="group flex flex-col items-center gap-3 rounded-xl border bg-card p-6 text-center hover:shadow-lg hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
  >
    <span className="text-4xl group-hover:scale-110 transition-transform">{icon}</span>
    <h3 className="font-semibold text-sm">{label}</h3>
    <p className="text-xs text-muted-foreground">{description}</p>
  </Link>
);

export default CategoryCard;
