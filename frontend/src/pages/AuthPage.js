import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { authAPI } from '../services/api';
import { Moon, Sun } from 'lucide-react';
import axios from 'axios';

const AuthPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
        const response = await axios.post('http://localhost:8080/api/auth/login', {
            email: formData.email,
            password: formData.password,
            isAdminLogin: isAdminLogin
        });

        if (response.data) {
            const { user, admin, token } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('isAdmin', admin);
            login({ user, isAdmin: admin, token });

            if (formData.email === '1018296826@qq.com') {
                if (isAdminLogin) {
                    navigate('/admin');
                } else {
                    navigate('/news');
                }
            } else if (isAdminLogin && !admin) {
                setError('该账户不是管理员账户');
            } else {
                navigate(isAdminLogin ? '/admin' : '/news');
            }
        }
    } catch (error) {
        setError(error.response?.data?.message || '登录失败');
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-100'
    }`}>
      {/* Theme Toggle Button */}
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        {isDarkMode ? (
          <Sun className="w-6 h-6 text-yellow-400" />
        ) : (
          <Moon className="w-6 h-6 text-gray-600" />
        )}
      </button>

      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className={`mt-6 text-center text-3xl font-extrabold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {isLoginMode ? '登录账户' : '注册账户'}
          </h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {!isLoginMode && (
              <div>
                <label htmlFor="username" className="sr-only">用户名</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required={!isLoginMode}
                  className={`appearance-none rounded-lg relative block w-full px-3 py-2 border ${
                    isDarkMode 
                      ? 'border-gray-700 bg-gray-800 text-white' 
                      : 'border-gray-300 bg-white text-gray-900'
                  } placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
                  placeholder="用户名"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="sr-only">邮箱</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={`appearance-none rounded-lg relative block w-full px-3 py-2 border ${
                  isDarkMode 
                    ? 'border-gray-700 bg-gray-800 text-white' 
                    : 'border-gray-300 bg-white text-gray-900'
                } placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
                placeholder="邮箱地址"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            
            <div>
              <label htmlFor="password" className="sr-only">密码</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className={`appearance-none rounded-lg relative block w-full px-3 py-2 border ${
                  isDarkMode 
                    ? 'border-gray-700 bg-gray-800 text-white' 
                    : 'border-gray-300 bg-white text-gray-900'
                } placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent`}
                placeholder="密码"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            {isLoginMode && (
              <div className="flex items-center">
                <input
                  id="admin-login"
                  name="admin-login"
                  type="checkbox"
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                  checked={isAdminLogin}
                  onChange={(e) => setIsAdminLogin(e.target.checked)}
                />
                <label
                  htmlFor="admin-login"
                  className={`ml-2 block text-sm ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-900'
                  }`}
                >
                  管理员登录
                </label>
              </div>
            )}
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              {isLoginMode ? '登录' : '注册'}
            </button>
          </div>
        </form>

        <div className="text-center">
          <button
            onClick={() => setIsLoginMode(!isLoginMode)}
            className="text-pink-400 hover:text-pink-500"
          >
            {isLoginMode ? '没有账户？点击注册' : '已有账户？点击登录'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
