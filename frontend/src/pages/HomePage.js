import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Bell, TrendingUp, Users, MessageCircle, Sun, Moon, LogOut } from 'lucide-react';
import TimeDisplay from '../components/TimeDisplay';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import BackgroundAnimation from '../components/shared/BackgroundAnimation';
import CalendarModule from '../components/modules/CalendarModule';
import TrendingModule from '../components/modules/TrendingModule';
import PersonalModule from '../components/modules/PersonalModule';
import LiveModule from '../components/modules/LiveModule';
import AlertDialog from '../components/AlertDialog';

const HomePage = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { logout } = useAuth();
  const [activeModule, setActiveModule] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({});

  const modules = [
    {
      id: 'calendar',
      title: '校历通知',
      icon: Calendar,
      color: 'text-pink-500'
    },
    {
      id: 'trending',
      title: '热点事件',
      icon: TrendingUp,
      color: 'text-pink-500'
    },
    {
      id: 'personal',
      title: '个人事务',
      icon: Users,
      color: 'text-pink-500'
    },
    {
      id: 'live',
      title: 'Live圈',
      icon: MessageCircle,
      color: 'text-pink-500'
    }
  ];

  const handleError = (message) => {
    setAlertConfig({
      title: '错误提示',
      message: message,
      type: 'error',
      confirmText: '确定'
    });
    setShowAlert(true);
  };

  const handleLogout = () => {
    setAlertConfig({
      title: '退出确认',
      message: '确定要退出登录吗？',
      type: 'warning',
      confirmText: '确定',
      cancelText: '取消',
      onConfirm: () => {
        logout();
        navigate('/auth');
      }
    });
    setShowAlert(true);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <BackgroundAnimation />
      
      <div className="flex">
        {/* 左侧边栏 */}
        <div className={`fixed left-0 top-0 h-screen w-64 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } border-r ${
          isDarkMode ? 'border-gray-700' : 'border-gray-200'
        } p-6 space-y-6`}>
          {/* 时钟组件 */}
          <TimeDisplay isDarkMode={isDarkMode} />

          {/* 模块导航 */}
          <div className="space-y-2 mt-6">
            {modules.map(module => (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                className={`w-full p-4 rounded-lg transition-all duration-200 flex items-center gap-3
                  ${activeModule === module.id 
                    ? `${isDarkMode ? 'bg-gray-700' : 'bg-pink-50'} text-pink-500` 
                    : `${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'} 
                       ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`
                  }`}
              >
                <module.icon className="w-5 h-5" />
                <span className="font-medium">{module.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 主内容区域 */}
        <div className="ml-64 flex-1">
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
                    ? 'text-pink-400 hover:text-pink-300' 
                    : 'text-pink-600 hover:text-pink-700'
                  }`}
              >
                <LogOut className="w-5 h-5" />
                退出
              </button>
            </div>
          </div>

          {/* 内容区域 */}
          <div className="pt-16 p-6">
            {!activeModule ? (
              <div className="h-[calc(100vh-8rem)] flex items-center justify-center">
                <h1 className={`text-4xl font-bold ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-800'
                }`}>
                  Welcome to Campus Private Domain Platform
                </h1>
              </div>
            ) : (
              <ModuleContent moduleId={activeModule} isDarkMode={isDarkMode} />
            )}
          </div>
        </div>
      </div>
      
      <AlertDialog
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        {...alertConfig}
      />
    </div>
  );
};

// 模块内容组件
const ModuleContent = ({ moduleId, isDarkMode }) => {
  switch (moduleId) {
    case 'calendar':
      return <CalendarModule isDarkMode={isDarkMode} />;
    case 'trending':
      return <TrendingModule isDarkMode={isDarkMode} />;
    case 'personal':
      return <PersonalModule isDarkMode={isDarkMode} />;
    case 'live':
      return <LiveModule isDarkMode={isDarkMode} />;
    default:
      return null;
  }
};

export default HomePage; 