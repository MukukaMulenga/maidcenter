import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isTokenExpired } from './tokenUtils';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const userRole = sessionStorage.getItem('userRole'); // Retrieve user role from session storage
  const token = sessionStorage.getItem(`token_${userRole}`); // Get token by role

  // Check if the token is expired or not available, then redirect to login
  if (!token || isTokenExpired(token)) {
    return <Navigate to={`/authpage/${userRole}`} state={{ from: location }} replace />;
  }

  // Render the child component if the token is valid
  return children;
};

export default PrivateRoute;
