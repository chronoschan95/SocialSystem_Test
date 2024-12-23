import React, { useState } from 'react';
import { Layout, Users, Newspaper, Moon, Sun, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

// Mock data for preview
const mockUsers = [
  { id: 1, username: "张三", email: "zhang@edu.cn", role: "user" },
  { id: 2, username: "李四", email: "li@edu.cn", role: "admin" }
];

const mockNews = [
  {
    id: 1,
    title: "2024春季开学通知",
    category: "重要通知",
    content: "根据学校安排，2024春季学期将于2月26日正式开始...",
    important: true
  }
];

const AdminPreview = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  // Local state
  const [currentSection, setCurrentSection] = useState('users');
  const [users, setUsers] = useState(mockUsers);
  const [news, setNews] = useState(mockNews);
  const [searchQuery, setSearchQuery] = useState('');

  // User management handlers
  const handleRoleChange = (userId, newRole) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('确定要删除此用户吗？')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  // News management handlers
  const handleDeleteNews = (newsId) => {
    if (window.confirm('确定要删除此新闻吗？')) {
      setNews(news.filter(item => item.id !== newsId));
    }
  };

  const handleEditNews = (newsId) => {
    // Mock edit functionality
    alert('打开编辑界面: ' + newsId);
  };

  // Logout handler
  const handleLogout = () => {
    if (window.confirm('确定要退出登录吗？')) {
      logout();
      navigate('/auth');
    }
  };

  // 修改主题切换处理函数
  const handleThemeToggle = () => {
    toggleDarkMode();
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'dark bg-gray-900' : 'bg-pink-50'}`}>
      {/* Navigation Bar */}
      <nav className={`transition-colors duration-200 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm p-4`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Layout className="w-6 h-6 text-pink-500" />
            <span className={`text-xl font-semibold ${isDarkMode ? 'text-pink-400' : 'text-pink-600'}`}>
              管理后台
            </span>
          </div>
          <div className="flex items-center gap-4">
            {/* 主题切换按钮 */}
            <button
              onClick={handleThemeToggle}
              className={`p-2 rounded-full transition-all duration-200 ${
                isDarkMode 
                  ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            {/* 登出按钮 */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-500 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              退出登录
            </button>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className={`w-64 transition-colors duration-200 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} h-screen shadow-sm p-4`}>
          <div className="space-y-2">
            <button
              onClick={() => setCurrentSection('users')}
              className={`w-full flex items-center gap-3 text-left px-4 py-2 rounded-lg transition-colors ${
                currentSection === 'users'
                  ? isDarkMode
                    ? 'bg-pink-900/50 text-pink-400'
                    : 'bg-pink-50 text-pink-600'
                  : isDarkMode
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Users className="w-5 h-5" />
              用户管理
            </button>
            <button
              onClick={() => setCurrentSection('news')}
              className={`w-full flex items-center gap-3 text-left px-4 py-2 rounded-lg transition-colors ${
                currentSection === 'news'
                  ? isDarkMode
                    ? 'bg-pink-900/50 text-pink-400'
                    : 'bg-pink-50 text-pink-600'
                  : isDarkMode
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Newspaper className="w-5 h-5" />
              新闻管理
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-800">用户管理</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索用户..."
                  className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                />
              </div>
            </div>
            
            {/* User Table */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">用户名</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">邮箱</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">��色</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockUsers.map(user => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 text-gray-800">{user.username}</td>
                      <td className="px-6 py-4 text-gray-800">{user.email}</td>
                      <td className="px-6 py-4">
                        <select className="rounded-lg border border-gray-200 px-3 py-1">
                          <option value="user">普通用户</option>
                          <option value="admin">管理员</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-red-500 hover:text-red-600">删除</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* News Management Preview */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">新闻管理</h2>
              <div className="grid gap-6">
                {mockNews.map(item => (
                  <div key={item.id} className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          {item.important && (
                            <span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm">
                              重要
                            </span>
                          )}
                          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                            {item.category}
                          </span>
                        </div>
                        <h3 className="text-xl font-medium text-gray-800">
                          {item.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="text-gray-500 hover:text-gray-700">编辑</button>
                        <button className="text-red-500 hover:text-red-600">删除</button>
                      </div>
                    </div>
                    <p className="text-gray-600">{item.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPreview;