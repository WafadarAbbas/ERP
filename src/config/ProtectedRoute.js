import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../Compo/utilis/getToken'; 

const ProtectedRoute = () => {
  const token = getToken(); 
 
  return token ? <Outlet /> : <Navigate to='/user/login-v3' />;
};

export default ProtectedRoute;