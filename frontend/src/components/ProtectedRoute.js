import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requireAdmin }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (requireAdmin && (!user.admin || !user.loginAsAdmin)) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default ProtectedRoute;