import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Users, Newspaper, Sun, Moon, LogOut } from 'lucide-react';
import TimeDisplay from '../components/TimeDisplay';

const AdminPreview = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('users'); // 'users' or 'news'

  const handleLogout = () => {
    if (window.confirm('确定要退出登录吗？')) {
      logout();
      navigate('/auth');
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* 左侧边栏 */}
      <div className={`fixed left-0 top-0 h-screen w-64 transition-colors duration-200 
        ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} 
        border-r flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6">
          <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            管理后台
          </h1>
        </div>

        {/* 导航菜单 */}
        <nav className="flex-1 px-4 space-y-2">
          <button
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
              ${activeTab === 'users'
                ? (isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900')
                : (isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100')
              }`}
          >
            <Users className="w-5 h-5" />
            用户管理
          </button>
          
          <button
            onClick={() => setActiveTab('news')}
            className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
              ${activeTab === 'news'
                ? (isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900')
                : (isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100')
              }`}
          >
            <Newspaper className="w-5 h-5" />
            新闻管理
          </button>
        </nav>

        {/* 时钟组件 */}
        <div className="p-4">
          <TimeDisplay isDarkMode={isDarkMode} />
        </div>
      </div>

      {/* 主内容区域 */}
      <div className="ml-64 min-h-screen">
        {/* 顶部导航栏 */}
        <div className={`fixed top-0 right-0 left-64 z-10 h-16 px-6 
          ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} 
          border-b flex items-center justify-end`}
        >
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors
                ${isDarkMode 
                  ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={handleLogout}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
                ${isDarkMode 
                  ? 'text-red-400 hover:text-red-300' 
                  : 'text-red-600 hover:text-red-700'
                }`}
            >
              <LogOut className="w-5 h-5" />
              退出登录
            </button>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="pt-16 p-6">
          {activeTab === 'users' ? (
            <UserManagement isDarkMode={isDarkMode} />
          ) : (
            <NewsManagement isDarkMode={isDarkMode} />
          )}
        </div>
      </div>
    </div>
  );
};

// 用户管理组件
const UserManagement = ({ isDarkMode }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPasswordId, setShowPasswordId] = useState(null);
  const [userPassword, setUserPassword] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: ''
  });

  // 获取用户列表
  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8080/api/admin/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('获取用户列表失败:', error);
    }
  }, []);

  // 初始加载
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // 切换用户角色
  const handleToggleRole = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/admin/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        await fetchUsers(); // 重新获取用户列表
      }
    } catch (error) {
      console.error('更改用户角色失败:', error);
    }
  };

  // 切换用户状态（删除/恢复）
  const handleToggleStatus = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/admin/users/${userId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        await fetchUsers(); // 重新获取用户列表
      }
    } catch (error) {
      console.error('更改用户状态失败:', error);
    }
  };

  // 查看密码
  const handleViewPassword = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/admin/users/${userId}/password`);
      if (response.ok) {
        const password = await response.text();
        setUserPassword(password);
        setShowPasswordId(userId);
      }
    } catch (error) {
      console.error('获取密码失败:', error);
    }
  };

  // 添加用户
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      
      if (response.ok) {
        await fetchUsers();
        setShowAddModal(false);
        setNewUser({ username: '', email: '', password: '' });
      }
    } catch (error) {
      console.error('添加用户失败:', error);
    }
  };

  // 过滤用户列表
  const filteredUsers = users.filter(user => 
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-6`}>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            用户管理
          </h2>
          <button
            onClick={() => setShowAddModal(true)}
            className={`px-4 py-2 rounded-lg ${
              isDarkMode
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            添加用户
          </button>
        </div>
        <input
          type="text"
          placeholder="搜索用户..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`px-4 py-2 rounded-lg ${
            isDarkMode 
              ? 'bg-gray-700 text-gray-200 placeholder-gray-400' 
              : 'bg-gray-100 text-gray-800 placeholder-gray-500'
          } focus:outline-none focus:ring-2 focus:ring-pink-500`}
        />
      </div>

      {/* 用户表格 */}
      <div className={`overflow-x-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        <table className="min-w-full">
          <thead className={isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">用户名</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">邮箱</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">密码</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">角色</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">状态</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">操作</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${isDarkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
            {filteredUsers.map(user => (
              <tr key={user.id} className={user.deleted ? 'line-through opacity-50' : ''}>
                <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span>{showPasswordId === user.id ? userPassword : '••••••'}</span>
                    <button
                      onClick={() => handleViewPassword(user.id)}
                      className={`p-1 rounded-full ${
                        isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.admin 
                      ? (isDarkMode ? 'bg-pink-900 text-pink-200' : 'bg-pink-100 text-pink-800')
                      : (isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800')
                  }`}>
                    {user.admin ? '管理员' : '普通用户'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.deleted
                      ? (isDarkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800')
                      : (isDarkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800')
                  }`}>
                    {user.deleted ? '已删除' : '正常'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleToggleRole(user.id)}
                      className={`px-3 py-1 rounded-lg text-sm ${
                        isDarkMode
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-blue-100 hover:bg-blue-200 text-blue-800'
                      }`}
                    >
                      {user.admin ? '设为普通用户' : '设为管理员'}
                    </button>
                    <button
                      onClick={() => handleToggleStatus(user.id)}
                      className={`px-3 py-1 rounded-lg text-sm ${
                        user.deleted
                          ? (isDarkMode ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-green-100 hover:bg-green-200 text-green-800')
                          : (isDarkMode ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-red-100 hover:bg-red-200 text-red-800')
                      }`}
                    >
                      {user.deleted ? '恢复' : '删除'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 添加用户模态框 */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className={`rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 w-96`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              添加新用户
            </h3>
            <form onSubmit={handleAddUser}>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="用户名"
                  value={newUser.username}
                  onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                  className={`w-full px-4 py-2 rounded-lg ${
                    isDarkMode 
                      ? 'bg-gray-700 text-gray-200 placeholder-gray-400' 
                      : 'bg-gray-100 text-gray-800 placeholder-gray-500'
                  }`}
                  required
                />
                <input
                  type="email"
                  placeholder="邮箱"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  className={`w-full px-4 py-2 rounded-lg ${
                    isDarkMode 
                      ? 'bg-gray-700 text-gray-200 placeholder-gray-400' 
                      : 'bg-gray-100 text-gray-800 placeholder-gray-500'
                  }`}
                  required
                />
                <input
                  type="password"
                  placeholder="密码"
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  className={`w-full px-4 py-2 rounded-lg ${
                    isDarkMode 
                      ? 'bg-gray-700 text-gray-200 placeholder-gray-400' 
                      : 'bg-gray-100 text-gray-800 placeholder-gray-500'
                  }`}
                  required
                />
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className={`px-4 py-2 rounded-lg ${
                    isDarkMode
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                  }`}
                >
                  取消
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-lg ${
                    isDarkMode
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
                >
                  添加
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// 新闻管理组件
const NewsManagement = ({ isDarkMode }) => {
  return (
    <div className={`rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-6`}>
      <h2 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
        新闻管理
      </h2>
      <div className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
        <div className="mb-4">
          <button className={`px-4 py-2 rounded-lg ${
            isDarkMode 
              ? 'bg-blue-600 hover:bg-blue-700' 
              : 'bg-blue-500 hover:bg-blue-600'
            } text-white transition-colors`}
          >
            添加新闻
          </button>
        </div>
        <div className="space-y-4">
          {/* 新闻列表 */}
        </div>
      </div>
    </div>
  );
};

export default AdminPreview;