import React, { useState, useEffect } from 'react';
import { AuthContext, AuthUser, AuthContextType } from './auth-context-helpers';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);
  
  const value: AuthContextType = {
    user,
    setUser,
    isLoading
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 