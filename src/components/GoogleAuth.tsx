import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { GoogleLogin, GoogleOAuthProvider, useGoogleLogin, TokenResponse, CredentialResponse } from "@react-oauth/google";
import { toast } from "@/components/ui/use-toast";
import { showLoginSuccessToast } from '@/components/toasts/login-success';
import { useAuth } from "@/context/use-auth";
import OptimizedImage from './OptimizedImage';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DecodedToken {
  sub: string;
  name: string;
  email: string;
  picture?: string;
}

const handleCredentialLoginSuccess = (credentialResponse: CredentialResponse, setUser: (user: AuthUser | null) => void, navigate: any) => {
  if (!credentialResponse.credential) {
    toast({
      title: "Login gagal",
      description: "Tidak ada credential yang diterima dari Google",
      variant: "destructive",
    });
    return;
  }
  try {
    const base64Url = credentialResponse.credential.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    const decodedToken = JSON.parse(jsonPayload) as DecodedToken;
    const userData: AuthUser = {
      id: decodedToken.sub,
      name: decodedToken.name,
      email: decodedToken.email,
      profileImage: decodedToken.picture
    };
    localStorage.setItem('user', JSON.stringify(userData));
    // aktifkan tour singkat dashboard pada render pertama setelah login
    try { localStorage.setItem('showDashboardTour', '1'); } catch {}
    setUser(userData); // Update context state
    showLoginSuccessToast({ name: userData.name });
    // Redirect ke dashboard setelah login berhasil
    navigate('/dashboard');
  } catch (error) {
    console.error("Failed to decode credential", error);
    toast({
      title: "Login gagal",
      description: "Terjadi kesalahan saat login dengan Google",
      variant: "destructive",
    });
  }
};

const handleTokenLoginSuccess = (tokenResponse: TokenResponse) => {
  toast({
    title: "Login Google OAuth berhasil!",
    description: `Akses token: ${tokenResponse.access_token}`,
  });
};

const GoogleAuth = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleScriptLoaded, setIsGoogleScriptLoaded] = useState(false);

  // Check if Google script is loaded
  useEffect(() => {
    const checkGoogleScript = () => {
      const script = document.querySelector('script[src*="accounts.google.com/gsi/client"]');
      console.log('Google script status:', !!script);
      console.log('Current domain:', window.location.origin);
      console.log('Script URL:', script?.src);
      console.log('Environment:', import.meta.env.MODE);
      setIsGoogleScriptLoaded(!!script);
    };

    checkGoogleScript();
    const interval = setInterval(checkGoogleScript, 1000);
    return () => clearInterval(interval);
  }, []);

  // Validate OAuth configuration on mount
  useEffect(() => {
    const currentDomain = window.location.origin;
    const allowedDomains = [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://villasawarna.com',
      'https://www.villasawarna.com',
      'https://villasawarna.vercel.app',
      'https://villasawarna.netlify.app'
    ];
    
    console.log('🔧 OAuth Configuration Check:');
    console.log('  - Current Domain:', currentDomain);
    console.log('  - Environment:', import.meta.env.MODE);
    console.log('  - Client ID:', import.meta.env.VITE_GOOGLE_CLIENT_ID);
    console.log('  - Allowed Domains:', allowedDomains);
    
    if (!allowedDomains.includes(currentDomain)) {
      console.warn(`🚨 OAuth Warning: Current domain ${currentDomain} may not be authorized in Google Cloud Console`);
      console.warn('🔧 Please add this domain to Authorized JavaScript origins in Google Cloud Console');
      console.warn('📋 Add this to Google Cloud Console:');
      console.warn(`   ${currentDomain}`);
    } else {
      console.log('✅ Domain is in allowed list');
    }
  }, []);

  // Log when component mounts
  useEffect(() => {
    console.log('GoogleAuth component mounted');
    console.log('User state:', user);
    console.log('Google script loaded:', isGoogleScriptLoaded);
    console.log('Current environment:', import.meta.env.MODE);
    console.log('Current URL:', window.location.href);
  }, [user, isGoogleScriptLoaded]);

  // Custom Google login handler
  const login = useGoogleLogin({
    onSuccess: handleTokenLoginSuccess,
    onError: () => {
      toast({
        title: "Login gagal",
        description: "Terjadi kesalahan saat login dengan Google",
        variant: "destructive",
      });
    },
    flow: 'implicit',
  });

  // Check if user is already logged in
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
      }
    }
  }, [setUser]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: "Logout berhasil",
      description: "Anda telah keluar dari akun"
    });
    navigate('/logout');
  };

  if (!isGoogleScriptLoaded) {
    return (
      <Button variant="outline" disabled>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading...
      </Button>
    );
  }

  return (
    <div>
      {user ? (
        <div className="flex items-center gap-4">
          <div className="relative w-8 h-8 rounded-full overflow-hidden">
            <OptimizedImage
              src={user.profileImage || '/images/default-avatar.png'}
              alt={user.name || 'User'}
              className="w-full h-full object-cover"
              quality={80}
            />
          </div>
          <span className="font-medium hidden md:block">{user.name}</span>
          <Button 
            variant="outline"
            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      ) : (
        <GoogleLogin
          onSuccess={(credentialResponse) => handleCredentialLoginSuccess(credentialResponse, setUser, navigate)}
          onError={() => {
            toast({
              title: "Login gagal",
              description: "Terjadi kesalahan saat login dengan Google",
              variant: "destructive",
            });
          }}
          useOneTap
          theme="outline"
        />
      )}
    </div>
  );
}

export default GoogleAuth;
