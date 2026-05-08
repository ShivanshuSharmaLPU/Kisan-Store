import { create } from 'zustand';
import type { Product, CartItem } from './data';

interface CartStore {
  items: CartItem[];
  currentUser: string | null;
  setUser: (email: string | null) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
  count: () => number;
}

const CART_PREFIX = 'kisanmitra_cart_';

const loadCart = (email: string | null): CartItem[] => {
  if (!email) return [];
  try {
    const saved = localStorage.getItem(CART_PREFIX + email);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveCart = (email: string | null, items: CartItem[]) => {
  if (!email) return;
  localStorage.setItem(CART_PREFIX + email, JSON.stringify(items));
};

export const useCart = create<CartStore>((set, get) => ({
  items: [],
  currentUser: null,
  setUser: (email) => {
    const items = loadCart(email);
    set({ currentUser: email, items });
  },
  addToCart: (product) => set((state) => {
    const existing = state.items.find(i => i.product.id === product.id);
    const newItems = existing
      ? state.items.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)
      : [...state.items, { product, quantity: 1 }];
    saveCart(state.currentUser, newItems);
    return { items: newItems };
  }),
  removeFromCart: (productId) => set((state) => {
    const newItems = state.items.filter(i => i.product.id !== productId);
    saveCart(state.currentUser, newItems);
    return { items: newItems };
  }),
  updateQuantity: (productId, quantity) => set((state) => {
    const newItems = quantity <= 0
      ? state.items.filter(i => i.product.id !== productId)
      : state.items.map(i => i.product.id === productId ? { ...i, quantity } : i);
    saveCart(state.currentUser, newItems);
    return { items: newItems };
  }),
  clearCart: () => set((state) => {
    if (state.currentUser) localStorage.removeItem(CART_PREFIX + state.currentUser);
    return { items: [] };
  }),
  total: () => get().items.reduce((s, i) => s + i.product.price * i.quantity, 0),
  count: () => get().items.reduce((s, i) => s + i.quantity, 0),
}));
