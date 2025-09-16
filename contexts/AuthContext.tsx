import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, role: UserRole) => void;
  logout: () => void;
}

// FIX: Export AuthContext to allow it to be imported in other modules.
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_CLIENT_USER: User = {
  id: 'client-001',
  name: 'João da Silva',
  email: 'cliente@noty.com',
  role: UserRole.CLIENT,
  credits: 150,
  company: {
    name: "Advocacia Silva & Associados",
    document: "12.345.678/0001-99",
    address: "Rua das Leis, 123, São Paulo, SP",
    logoUrl: "https://i.imgur.com/8lC3N2i.png"
  }
};

const MOCK_ADMIN_USER: User = {
  id: 'admin-001',
  name: 'Maria Administradora',
  email: 'admin@noty.com',
  role: UserRole.ADMIN,
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((email: string, role: UserRole) => {
    if (role === UserRole.ADMIN) {
      setUser(MOCK_ADMIN_USER);
    } else {
      setUser(MOCK_CLIENT_USER);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
