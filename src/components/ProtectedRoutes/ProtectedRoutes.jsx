import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, isAdminRoute }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const isAdmin = useSelector((state) => state.user.userData?.user?.isadmin);
    
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (isAdminRoute && !isAdmin) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default ProtectedRoute;