export type Category = 'seeds' | 'pesticides' | 'fertilizers' | 'tools' | 'irrigation' | 'organic';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  stock: number;
  rating: number;
  sold: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: { productId: string; productName: string; quantity: number; price: number }[];
  total: number;
  address: string;
  date: string;
  status: 'pending' | 'shipped' | 'delivered';
}

export const categories: { id: Category; label: string; icon: string; description: string }[] = [
  { id: 'seeds', label: 'Seeds', icon: '🌱', description: 'High-quality seeds for every season' },
  { id: 'pesticides', label: 'Pesticides', icon: '🛡️', description: 'Protect your crops effectively' },
  { id: 'fertilizers', label: 'Fertilizers', icon: '🧪', description: 'Boost your soil nutrition' },
  { id: 'tools', label: 'Farm Tools', icon: '🔧', description: 'Essential farming equipment' },
  { id: 'irrigation', label: 'Irrigation', icon: '💧', description: 'Smart watering solutions' },
  { id: 'organic', label: 'Organic', icon: '🌿', description: 'Natural & eco-friendly products' },
];

import dapFertilizerImg from '@/assets/dap-fertilizer.jpg';

const sampleProducts: Product[] = [
  { id: '1', name: 'Hybrid Wheat Seeds', description: 'High-yield wheat seeds suitable for Rabi season. Resistant to rust and smut diseases.', price: 450, category: 'seeds', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400', stock: 200, rating: 4.5, sold: 0 },
  { id: '2', name: 'Basmati Rice Seeds', description: 'Premium long-grain basmati rice seeds with excellent aroma and taste.', price: 680, category: 'seeds', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400', stock: 150, rating: 4.7, sold: 0 },
  { id: '3', name: 'Tomato Seeds (Hybrid)', description: 'Disease-resistant hybrid tomato seeds for high productivity.', price: 120, category: 'seeds', image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400', stock: 500, rating: 4.3, sold: 0 },
  { id: '4', name: 'Neem Oil Pesticide', description: 'Organic neem oil based pesticide. Safe for crops and environment.', price: 350, category: 'pesticides', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400', stock: 300, rating: 4.6, sold: 0 },
  { id: '5', name: 'Fungicide Spray', description: 'Broad-spectrum fungicide to protect against blight and mildew.', price: 520, category: 'pesticides', image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400', stock: 180, rating: 4.2, sold: 0 },
  { id: '6', name: 'Insecticide Powder', description: 'Effective against aphids, whiteflies, and other common pests.', price: 280, category: 'pesticides', image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400', stock: 250, rating: 4.1, sold: 0 },
  { id: '7', name: 'DAP Fertilizer (50kg)', description: 'Di-ammonium phosphate for strong root development and flowering.', price: 1350, category: 'fertilizers', image: dapFertilizerImg, stock: 100, rating: 4.8, sold: 0 },
  { id: '8', name: 'Urea Fertilizer (45kg)', description: 'High nitrogen content urea for lush green growth.', price: 800, category: 'fertilizers', image: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=400', stock: 120, rating: 4.4, sold: 0 },
  { id: '9', name: 'Vermicompost (25kg)', description: 'Organic vermicompost rich in nutrients for sustainable farming.', price: 400, category: 'organic', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400', stock: 200, rating: 4.9, sold: 0 },
  { id: '10', name: 'Hand Cultivator', description: 'Durable steel hand cultivator for weeding and soil loosening.', price: 250, category: 'tools', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400', stock: 80, rating: 4.3, sold: 0 },
  { id: '11', name: 'Pruning Shears', description: 'Sharp stainless steel pruning shears for precise cutting.', price: 380, category: 'tools', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400', stock: 60, rating: 4.5, sold: 0 },
  { id: '12', name: 'Drip Irrigation Kit', description: 'Complete drip irrigation system for 1 acre. Water-efficient.', price: 4500, category: 'irrigation', image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400', stock: 30, rating: 4.7, sold: 0 },
  { id: '13', name: 'Sprinkler Set', description: 'Adjustable sprinkler set for uniform water distribution.', price: 1800, category: 'irrigation', image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400', stock: 50, rating: 4.4, sold: 0 },
  { id: '14', name: 'Bio Pesticide', description: 'Eco-friendly bio pesticide made from plant extracts.', price: 290, category: 'organic', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400', stock: 160, rating: 4.6, sold: 0 },
  { id: '15', name: 'Mustard Seeds', description: 'High oil content mustard seeds for winter sowing.', price: 320, category: 'seeds', image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400', stock: 300, rating: 4.2, sold: 0 },
];

// Persist products and orders in localStorage
const loadProducts = (): Product[] => {
  const saved = localStorage.getItem('kisanmitra_products');
  return saved ? JSON.parse(saved) : [...sampleProducts];
};

const loadOrders = (): Order[] => {
  const saved = localStorage.getItem('kisanmitra_orders');
  return saved ? JSON.parse(saved) : [];
};

let products = loadProducts();
let orders = loadOrders();

const saveProducts = () => localStorage.setItem('kisanmitra_products', JSON.stringify(products));
const saveOrders = () => localStorage.setItem('kisanmitra_orders', JSON.stringify(orders));

export const getProducts = () => products;
export const getProductsByCategory = (cat: Category) => products.filter(p => p.category === cat);
export const getProduct = (id: string) => products.find(p => p.id === id);
export const addProduct = (product: Omit<Product, 'id' | 'sold' | 'rating'>) => {
  const newProduct: Product = { ...product, id: String(Date.now()), sold: 0, rating: 0 };
  products = [newProduct, ...products];
  saveProducts();
  return newProduct;
};
export const deleteProduct = (id: string) => { products = products.filter(p => p.id !== id); saveProducts(); };
export const updateProduct = (id: string, data: Partial<Product>) => {
  products = products.map(p => p.id === id ? { ...p, ...data } : p);
  saveProducts();
};

// Orders
export const getOrders = () => orders;
export const getOrdersByUser = (email: string) => orders.filter(o => o.userId === email);
export const placeOrder = (userId: string, items: CartItem[], address: string): Order => {
  const order: Order = {
    id: String(Date.now()),
    userId,
    items: items.map(i => ({ productId: i.product.id, productName: i.product.name, quantity: i.quantity, price: i.product.price })),
    total: items.reduce((s, i) => s + i.product.price * i.quantity, 0),
    address,
    date: new Date().toISOString(),
    status: 'pending',
  };
  orders = [order, ...orders];
  // Update sold count and stock
  items.forEach(i => {
    const p = products.find(pr => pr.id === i.product.id);
    if (p) {
      p.sold += i.quantity;
      p.stock = Math.max(0, p.stock - i.quantity);
    }
  });
  saveOrders();
  saveProducts();
  return order;
};

// Stats computed dynamically from actual data
export const getStats = () => ({
  totalProducts: products.length,
  totalRevenue: products.reduce((s, p) => s + p.price * p.sold, 0),
  totalSold: products.reduce((s, p) => s + p.sold, 0),
  lowStock: products.filter(p => p.stock < 50).length,
  categorySales: categories.map(c => ({
    category: c.label,
    sales: products.filter(p => p.category === c.id).reduce((s, p) => s + p.sold, 0),
    revenue: products.filter(p => p.category === c.id).reduce((s, p) => s + p.price * p.sold, 0),
  })),
});

// Users helper for admin
export const getRegisteredUsers = () => {
  const users = JSON.parse(localStorage.getItem('kisanmitra_users') || '[]');
  return users.map((u: any) => ({ name: u.name, email: u.email, role: u.role, address: u.address || '' }));
};
