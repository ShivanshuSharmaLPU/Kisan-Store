import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, LogOut, User } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { useAuth } from '@/lib/auth';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import ThemeToggle from '@/components/ThemeToggle';

const Navbar = () => {
  const { count } = useCart();
  const { user, logout, isAdmin } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl">🌾</span>
          <span className="font-bold text-xl" style={{ fontFamily: 'Playfair Display, serif' }}>
            KisanMitra
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
          <Link to="/products" className="text-sm font-medium hover:text-primary transition-colors">Products</Link>
         <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">
  About
</Link>

<a
  href="http://localhost:5173"
  target="_blank"
  rel="noopener noreferrer"
  className="
    rounded-md
    bg-gradient-to-r from-green-500 to-emerald-500
    px-3 py-1.5
    text-xs font-medium text-white
    shadow-md
    transition-all duration-300
    hover:scale-105 hover:brightness-110
  "
>
  KisanMitra AI
</a>

{isAdmin && (
  <Link to="/admin" className="text-sm font-medium hover:text-primary transition-colors">
    Admin
  </Link>
)}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {!isAdminPage && (
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {count() > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                    {count()}
                  </span>
                )}
              </Button>
            </Link>
          )}
          {user ? (
            <div className="hidden md:flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="h-4 w-4" /> {user.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-destructive cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Button asChild variant="default" size="sm" className="hidden md:inline-flex">
              <Link to="/login">Sign In</Link>
            </Button>
          )}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t bg-card p-4 space-y-2">
          <Link to="/" className="block py-2 text-sm font-medium" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/products" className="block py-2 text-sm font-medium" onClick={() => setOpen(false)}>Products</Link>
          <Link to="/about" className="block py-2 text-sm font-medium" onClick={() => setOpen(false)}>About</Link>
          {isAdmin && <Link to="/admin" className="block py-2 text-sm font-medium" onClick={() => setOpen(false)}>Admin</Link>}
          {user ? (
            <>
              <Link to="/profile" className="block py-2 text-sm font-medium" onClick={() => setOpen(false)}>My Profile</Link>
              <button className="block py-2 text-sm font-medium text-destructive" onClick={() => { logout(); setOpen(false); }}>
                Logout ({user.name})
              </button>
            </>
          ) : (
            <Link to="/login" className="block py-2 text-sm font-medium text-primary" onClick={() => setOpen(false)}>Sign In</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
