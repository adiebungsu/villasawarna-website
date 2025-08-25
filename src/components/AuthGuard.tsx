import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    const authExpiry = localStorage.getItem('admin_auth_expiry');
    
    if (auth === 'true' && authExpiry && new Date().getTime() < parseInt(authExpiry)) {
      setIsAuthenticated(true);
    } else {
      // Clear expired auth
      localStorage.removeItem('admin_auth');
      localStorage.removeItem('admin_auth_expiry');
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Dev-mode shortcut: allow demo credentials without backend
      if (import.meta.env.DEV && username === 'admin' && password === 'admin') {
        const expiry = new Date().getTime() + 24 * 60 * 60 * 1000;
        localStorage.setItem('admin_auth', 'true');
        localStorage.setItem('admin_auth_expiry', expiry.toString());
        setIsAuthenticated(true);
        toast.success('Login berhasil (mode dev)');
        return;
      }

      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Set auth with expiry (24 hours)
        const expiry = new Date().getTime() + 24 * 60 * 60 * 1000;
        localStorage.setItem('admin_auth', 'true');
        localStorage.setItem('admin_auth_expiry', expiry.toString());
        setIsAuthenticated(true);
        toast.success('Login berhasil');
      } else {
        const error = await response.json();
        setError(error.message || 'Username atau password salah');
        toast.error('Login gagal');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat login');
      toast.error('Terjadi kesalahan saat login');
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-gray-600">Masuk ke panel admin</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password"
              required
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Memproses...' : 'Masuk'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AuthGuard; 