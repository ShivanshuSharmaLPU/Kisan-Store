import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useCart } from './cart';

export type UserRole = 'farmer' | 'admin';

export interface User {
  email: string;
  name: string;
  role: UserRole;
  address: string;
  phone: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string, role: UserRole) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const ADMIN_EMAIL = 'kisanmitra@gmail.com';
const ADMIN_PASSWORD = '12345';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('kisanmitra_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('kisanmitra_user', JSON.stringify(user));
      useCart.getState().setUser(user.email);
    } else {
      localStorage.removeItem('kisanmitra_user');
      useCart.getState().setUser(null);
    }
  }, [user]);

  const login = (email: string, password: string): boolean => {
    // Only this specific email+password gets admin access
    if (email.toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setUser({ email, name: 'Admin', role: 'admin', address: '', phone: '' });
      return true;
    }
    const users = JSON.parse(localStorage.getItem('kisanmitra_users') || '[]');
    const found = users.find((u: any) => u.email === email && u.password === password);
    if (found) {
      // Always login as farmer role regardless of what's stored
      setUser({ email: found.email, name: found.name, role: 'farmer', address: found.address || '', phone: found.phone || '' });
      return true;
    }
    return false;
  };

  const signup = (name: string, email: string, password: string, role: UserRole): boolean => {
    if (email.toLowerCase() === ADMIN_EMAIL) return false;
    const users = JSON.parse(localStorage.getItem('kisanmitra_users') || '[]');
    if (users.find((u: any) => u.email === email)) return false;
    // Always set role to farmer for signups
    users.push({ name, email, password, role: 'farmer', address: '', phone: '' });
    localStorage.setItem('kisanmitra_users', JSON.stringify(users));
    setUser({ email, name, role: 'farmer', address: '', phone: '' });
    return true;
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    const users = JSON.parse(localStorage.getItem('kisanmitra_users') || '[]');
    const idx = users.findIndex((u: any) => u.email === user.email);
    if (idx >= 0) {
      users[idx] = { ...users[idx], ...data };
      localStorage.setItem('kisanmitra_users', JSON.stringify(users));
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfile, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
