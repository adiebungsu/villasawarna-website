import { createContext } from 'react';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  createdAt?: string;
  phoneNumber?: string;
  loginMethod?: 'google' | 'email' | 'whatsapp';
  birthday?: string; // ISO date string for birthday rewards
}

export interface AuthContextType {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  isLoading: true
}); 