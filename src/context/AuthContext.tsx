import React, { useState } from 'react';
import { AuthContext, AuthUser, AuthContextType } from './auth-context-helpers';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  
  const value: AuthContextType = {
    user,
    setUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 