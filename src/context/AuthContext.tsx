import React, { createContext, ReactNode } from 'react';
import { useAuth } from '../libs/hooks/useAuth';

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  success: string | null;
  step: number;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    confirmPassword: string,
  ) => Promise<void>;
  verify: (email: string, verificationCode: string) => Promise<void>;
  logout: () => void;
  resetApiState: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
