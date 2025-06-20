import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ProtectedRoute = ({ children, roleRequired }) => {
  const { token, role } = useAuth();

  if (!token) return <Navigate to="/login" />;

  if (roleRequired && role !== roleRequired) {
    return <Navigate to="/" />;
  }

  return children;
};
