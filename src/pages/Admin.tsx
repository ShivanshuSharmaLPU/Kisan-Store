import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Package, DollarSign, TrendingUp, AlertTriangle, Plus, Trash2, Users, MapPin, LayoutDashboard, ShoppingBag, UserCog, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { getProducts, getStats, getOrders, getRegisteredUsers, addProduct, deleteProduct, categories, type Category } from '@/lib/data';
import { useAuth } from '@/lib/auth';

const COLORS = ['#2d8a4e', '#c87f2a', '#3b82f6', '#ef4444', '#8b5cf6', '#06b6d4'];

type Tab = 'analytics' | 'products' | 'users' | 'orders';

const sidebarItems: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'analytics', label: 'Analytics', icon: LayoutDashboard },
  { id: 'products', label: 'Products', icon: ShoppingBag },
  { id: 'users', label: 'Users', icon: UserCog },
  { id: 'orders', label: 'Orders', icon: ClipboardList },
];

const Admin = () => {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [, forceUpdate] = useState(0);
  const refresh = () => forceUpdate(n => n + 1);
  const stats = getStats();
  const products = getProducts();
  const allOrders = getOrders();
  const registeredUsers = getRegisteredUsers();
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('analytics');
  const [form, setForm] = useState({ name: '', description: '', price: '', category: 'seeds' as Category, stock: '', image: '' });

  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
        <p className="text-muted-foreground mb-6">Only admins can access this page.</p>
        <Button asChild><Link to="/login">Sign In as Admin</Link></Button>
      </div>
    );
  }

  const handleAdd = () => {
    if (!form.name || !form.price) { toast({ title: 'Error', description: 'Name and price are required', variant: 'destructive' }); return; }
    addProduct({ name: form.name, description: form.description, price: Number(form.price), category: form.category, stock: Number(form.stock) || 0, image: form.image || 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400' });
    setForm({ name: '', description: '', price: '', category: 'seeds', stock: '', image: '' });
    setOpen(false);
    refresh();
    toast({ title: 'Product added!' });
  };

  const handleDelete = (id: string) => { deleteProduct(id); refresh(); toast({ title: 'Product deleted' }); };

  const formatRevenue = (val: number) => val >= 1000 ? `₹${(val / 1000).toFixed(0)}K` : `₹${val}`;

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r bg-card hidden md:flex flex-col">
        <div className="p-4 border-b">
          <h2 className="font-bold text-lg">Admin Panel</h2>
          <p className="text-xs text-muted-foreground">KisanMitra Dashboard</p>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {sidebarItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
              {item.id === 'users' && <Badge variant="secondary" className="ml-auto text-[10px] px-1.5">{registeredUsers.length}</Badge>}
              {item.id === 'orders' && <Badge variant="secondary" className="ml-auto text-[10px] px-1.5">{allOrders.length}</Badge>}
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile tab bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card flex md:hidden">
        {sidebarItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex-1 flex flex-col items-center gap-0.5 py-2 text-[10px] font-medium ${
              activeTab === item.id ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 pb-20 md:pb-6 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold capitalize">{activeTab}</h1>
            <p className="text-sm text-muted-foreground">
              {activeTab === 'analytics' && 'Overview of your store performance'}
              {activeTab === 'products' && `${products.length} products in store`}
              {activeTab === 'users' && `${registeredUsers.length} registered users`}
              {activeTab === 'orders' && `${allOrders.length} total orders`}
            </p>
          </div>
          {activeTab === 'products' && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2"><Plus className="h-4 w-4" /> Add Product</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Add New Product</DialogTitle></DialogHeader>
                <div className="space-y-3">
                  <Input placeholder="Product Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                  <Textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                  <div className="grid grid-cols-2 gap-3">
                    <Input placeholder="Price (₹)" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
                    <Input placeholder="Stock" type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} />
                  </div>
                  <Select value={form.category} onValueChange={(v: Category) => setForm({ ...form, category: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {categories.map(c => <SelectItem key={c.id} value={c.id}>{c.icon} {c.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Input placeholder="Image URL (optional)" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
                  <Button className="w-full" onClick={handleAdd}>Add Product</Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Stats row - always visible */}
        {activeTab === 'analytics' && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              {[
                { label: 'Total Products', value: stats.totalProducts, icon: Package, color: 'text-primary' },
                { label: 'Total Revenue', value: formatRevenue(stats.totalRevenue), icon: DollarSign, color: 'text-accent' },
                { label: 'Units Sold', value: stats.totalSold.toLocaleString(), icon: TrendingUp, color: 'text-primary' },
                { label: 'Low Stock', value: stats.lowStock, icon: AlertTriangle, color: 'text-destructive' },
                { label: 'Users', value: registeredUsers.length, icon: Users, color: 'text-primary' },
              ].map(({ label, value, icon: Icon, color }) => (
                <Card key={label}>
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-lg bg-muted flex items-center justify-center ${color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-[11px] text-muted-foreground">{label}</p>
                      <p className="text-xl font-bold">{value}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader><CardTitle className="text-base">Sales by Category</CardTitle></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={stats.categorySales}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="category" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Bar dataKey="sales" fill="hsl(142, 50%, 35%)" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-base">Revenue Distribution</CardTitle></CardHeader>
                <CardContent className="flex justify-center">
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie data={stats.categorySales} dataKey="revenue" nameKey="category" cx="50%" cy="50%" outerRadius={100} label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}>
                        {stats.categorySales.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {activeTab === 'products' && (
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Stock</TableHead>
                    <TableHead className="text-right">Sold</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map(p => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.name}</TableCell>
                      <TableCell className="capitalize">{p.category}</TableCell>
                      <TableCell className="text-right">₹{p.price}</TableCell>
                      <TableCell className="text-right">
                        <span className={p.stock < 50 ? 'text-destructive font-bold' : ''}>{p.stock}</span>
                      </TableCell>
                      <TableCell className="text-right">{p.sold}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(p.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {activeTab === 'users' && (
          <Card>
            <CardContent className="p-0">
              {registeredUsers.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">No registered users yet</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead className="text-right">Orders</TableHead>
                      <TableHead className="text-right">Total Spent</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {registeredUsers.map((u: any) => {
                      const userOrders = allOrders.filter(o => o.userId === u.email);
                      const totalSpent = userOrders.reduce((s: number, o: any) => s + o.total, 0);
                      return (
                        <TableRow key={u.email}>
                          <TableCell className="font-medium">{u.name}</TableCell>
                          <TableCell>{u.email}</TableCell>
                          <TableCell><Badge variant="secondary" className="capitalize">{u.role}</Badge></TableCell>
                          <TableCell>
                            {u.address ? (
                              <span className="flex items-center gap-1 text-sm"><MapPin className="h-3 w-3" /> {u.address}</span>
                            ) : (
                              <span className="text-muted-foreground text-sm">Not set</span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">{userOrders.length}</TableCell>
                          <TableCell className="text-right font-medium">₹{totalSpent}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === 'orders' && (
          <Card>
            <CardContent className="p-0">
              {allOrders.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">No orders yet</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Delivery Address</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allOrders.map(order => (
                      <TableRow key={order.id}>
                        <TableCell className="font-mono text-xs">#{order.id.slice(-6)}</TableCell>
                        <TableCell>{order.userId}</TableCell>
                        <TableCell className="text-sm">{order.items.map(i => `${i.productName} ×${i.quantity}`).join(', ')}</TableCell>
                        <TableCell>
                          {order.address ? (
                            <span className="flex items-center gap-1 text-sm"><MapPin className="h-3 w-3" /> {order.address}</span>
                          ) : (
                            <span className="text-muted-foreground text-sm">N/A</span>
                          )}
                        </TableCell>
                        <TableCell><Badge variant="secondary" className="capitalize text-xs">{order.status}</Badge></TableCell>
                        <TableCell className="text-right font-medium">₹{order.total}</TableCell>
                        <TableCell className="text-xs">{new Date(order.date).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Admin;
