import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/Layout';
import AuthPage from './pages/AuthPage';
import NewsPage from './pages/NewsPage';
import TopicsPage from './pages/TopicsPage';
import UpdatesPage from './pages/UpdatesPage';
import PersonalLogPage from './pages/PersonalLogPage';
import { useAuth } from './context/AuthContext';

// 保护路由组件
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<Navigate to="/auth" />} />
        
        {/* 受保护的路由 */}
        <Route path="/news" element={
          <ProtectedRoute>
            <AppLayout>
              <NewsPage />
            </AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/topics" element={
          <ProtectedRoute>
            <AppLayout>
              <TopicsPage />
            </AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/updates" element={
          <ProtectedRoute>
            <AppLayout>
              <UpdatesPage />
            </AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/personal-log" element={
          <ProtectedRoute>
            <AppLayout>
              <PersonalLogPage />
            </AppLayout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;