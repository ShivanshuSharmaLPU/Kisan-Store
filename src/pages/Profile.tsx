import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { User, Mail, MapPin, Phone, Package, Edit2, Save, Camera } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { getOrdersByUser } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: '', address: '', phone: '' });

  if (!user) return <Navigate to="/login" />;

  const orders = getOrdersByUser(user.email);
  const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  const startEdit = () => {
    setForm({ name: user.name, address: user.address || '', phone: user.phone || '' });
    setEditing(true);
  };

  const saveEdit = () => {
    updateProfile({ name: form.name, address: form.address, phone: form.phone });
    setEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardContent className="p-6 text-center">
            <div className="relative inline-block mb-4">
              <Avatar className="h-24 w-24 mx-auto">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}&backgroundColor=2d8a4e&textColor=ffffff`} alt={user.name} />
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">{initials}</AvatarFallback>
              </Avatar>
              <div className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                <Camera className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
            </div>

            {editing ? (
              <div className="space-y-3 text-left">
                <Input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                <Input placeholder="Phone" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                <Input placeholder="Delivery Address" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
                <Button className="w-full gap-2" onClick={saveEdit}><Save className="h-4 w-4" /> Save</Button>
                <Button variant="outline" className="w-full" onClick={() => setEditing(false)}>Cancel</Button>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <Badge variant="secondary" className="mt-1 capitalize">{user.role}</Badge>
                <div className="mt-4 space-y-3 text-sm text-left">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="h-4 w-4 shrink-0" /> <span className="truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Phone className="h-4 w-4 shrink-0" /> {user.phone || 'Not set'}
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="h-4 w-4 shrink-0" /> {user.address || 'Not set'}
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 gap-2" onClick={startEdit}>
                  <Edit2 className="h-4 w-4" /> Edit Profile
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Orders Section */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Purchase History ({orders.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="orders" className="space-y-4 mt-4">
              {orders.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Package className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                    <p className="text-muted-foreground">No purchases yet</p>
                    <Button asChild className="mt-4"><Link to="/products">Shop Now</Link></Button>
                  </CardContent>
                </Card>
              ) : (
                orders.map(order => (
                  <Card key={order.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Order #{order.id.slice(-6)}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'} className="capitalize text-xs">
                            {order.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{new Date(order.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        {order.items.map((item, i) => (
                          <div key={i} className="flex justify-between text-sm">
                            <span>{item.productName} × {item.quantity}</span>
                            <span className="font-medium">₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>
                      <div className="border-t mt-2 pt-2 flex justify-between font-bold text-sm">
                        <span>Total</span>
                        <span>₹{order.total}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                        <MapPin className="h-3 w-3" /> {order.address || 'No address'}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
