import React from 'react';
import { useAuth } from '../../lib/AuthContext';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated)
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

export default PrivateRoute;