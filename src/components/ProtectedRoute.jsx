// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  // S'assurer que auth existe avant de le déstructurer
  if (!auth) return null;
  
  const { isAuthenticated, loading } = auth;

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <i className="fas fa-spinner fa-spin" style={{ 
          fontSize: '2rem', 
          color: 'var(--primary-color)' 
        }}></i>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;