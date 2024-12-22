import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import AuthPage from './pages/AuthPage';
import NewsPage from './pages/NewsPage';
import TopicsPage from './pages/TopicsPage';
import UpdatesPage from './pages/UpdatesPage';
import PersonalLogPage from './pages/PersonalLogPage';
import Layout from './components/layout/Layout';
import { useAuth } from './context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

const App = () => {
  return (
      <AuthProvider>
        <ThemeProvider>
          <Router>
            <Routes>
              <Route path="/auth" element={<AuthPage />} />
              <Route
                  path="/*"
                  element={
                    <PrivateRoute>
                      <Layout>
                        <Routes>
                          <Route path="/" element={<Navigate to="/news" />} />
                          <Route path="/news" element={<NewsPage />} />
                          <Route path="/topics" element={<TopicsPage />} />
                          <Route path="/updates" element={<UpdatesPage />} />
                          <Route path="/personal-log" element={<PersonalLogPage />} />
                        </Routes>
                      </Layout>
                    </PrivateRoute>
                  }
              />
            </Routes>
          </Router>
        </ThemeProvider>
      </AuthProvider>
  );
};

export default App;