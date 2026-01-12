import React from 'react'
import { useAuth } from '../../components/helpers/AuthProvider';
import { Navigate } from 'react-router-dom';
export const AccountLogged = () => {
  const { isLogged } = useAuth();
  if (!isLogged) {
   return <Navigate to="/auth" replace />;

  }
  return (
    <div>Cuenta mia :v</div>
  )
}
