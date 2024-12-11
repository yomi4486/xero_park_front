// AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
  picture: string;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null;
  handleAuthSuccess: (user: User) => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const handleAuthSuccess = (user: User) => {
    setIsAuthenticated(true);
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, handleAuthSuccess }}>
      {children}
    </AuthContext.Provider>
  );
};
