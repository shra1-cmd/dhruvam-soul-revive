import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Eye, EyeOff, Shield } from "lucide-react";
import bcrypt from 'bcryptjs';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      // Check admin credentials directly from admin_users table
      const { data: adminUsers, error } = await supabase
        .from('admin_users')
        .select('id, email, full_name, role, password_hash, is_active')
        .eq('email', email)
        .eq('is_active', true);

      if (error || !adminUsers || adminUsers.length === 0) {
        toast.error('Invalid credentials');
        setIsLoading(false);
        return;
      }

      const admin = adminUsers[0];
      
      // For demo purposes, check if password matches directly or use bcrypt
      const isPasswordValid = password === 'admin123' || 
        (admin.password_hash && await bcrypt.compare(password, admin.password_hash));

      if (!isPasswordValid) {
        toast.error('Invalid credentials');
        setIsLoading(false);
        return;
      }

      // Save admin session to localStorage
      localStorage.setItem('admin_session', JSON.stringify({
        id: admin.id,
        email: admin.email,
        full_name: admin.full_name,
        role: admin.role,
        loginTime: new Date().toISOString(),
      }));

      toast.success(`Welcome, ${admin.full_name || 'Admin'}!`);
      navigate('/admin');
    } catch (err) {
      console.error('Login error:', err);
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory to-sandalwood/20 flex items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-xl border-sandalwood/20">
        <CardHeader className="text-center pb-2">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Shield className="w-8 h-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-semibold text-primary">
            Admin Login
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            Garuda Dhruvam Foundation
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@garudadhruvam.org"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              Demo Credentials: admin@garudadhruvam.org / admin123
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;