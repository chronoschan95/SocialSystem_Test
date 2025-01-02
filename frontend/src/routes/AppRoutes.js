import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/layout/Layout';
import AuthPage from '../pages/AuthPage';
import HomePage from '../pages/HomePage';
import AdminPreview from '../pages/AdminPreview';

// 保护路由组件
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }
  
  if (user?.role === 'admin') {
    return <Navigate to="/admin" />;
  }
  
  return children;
};

// 管理员路由保护
const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated || user?.role !== 'admin') {
    return <Navigate to="/auth" />;
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      
      {/* 默认路由重定向 */}
      <Route path="/" element={<Navigate to="/home" />} />
      
      {/* 管理员路由 */}
      <Route path="/admin/*" element={
        <AdminRoute>
          <AdminPreview />
        </AdminRoute>
      } />
      
      {/* 用户路由 */}
      <Route path="/home" element={
        <ProtectedRoute>
          <Layout>
            <HomePage />
          </Layout>
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default AppRoutes; 