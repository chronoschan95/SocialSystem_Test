import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import AuthPage from './pages/AuthPage';
import NewsPage from './pages/NewsPage';
import TopicsPage from './pages/TopicsPage';
import UpdatesPage from './pages/UpdatesPage';
import PersonalLogPage from './pages/PersonalLogPage';
import AdminPreview from './pages/AdminPreview';
import { useAuth } from './context/AuthContext';

// 保护路由组件
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/" element={<Navigate to="/auth" />} />
            
            {/* 管理员路由 */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminPreview />
              </ProtectedRoute>
            } />
            
            {/* 受保护的路由 */}
            <Route path="/news" element={
              <ProtectedRoute>
                <Layout>
                  <NewsPage />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/topics" element={
              <ProtectedRoute>
                <Layout>
                  <TopicsPage />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/updates" element={
              <ProtectedRoute>
                <Layout>
                  <UpdatesPage />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/personal-log" element={
              <ProtectedRoute>
                <Layout>
                  <PersonalLogPage />
                </Layout>
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;