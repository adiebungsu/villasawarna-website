import { createContext } from 'react';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
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