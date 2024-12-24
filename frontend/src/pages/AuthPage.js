import React, { useState, useEffect, useRef } from 'react';
import { 
  Moon, Sun, Users, MessageCircle, Heart, Share2, 
  BookMarked, Hash, TrendingUp, Bell, Calendar, User, Radio
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';

const AuthPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const animationFrameRef = useRef();
  const lastUpdateRef = useRef(Date.now());
  
  // 状态管理
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [animationElements, setAnimationElements] = useState([]);
  const [trendingTopics] = useState([
    { icon: Calendar, text: "校历通知" },
    { icon: TrendingUp, text: "热点事件" },
    { icon: User, text: "个人事务迭代记录" },
    { icon: Radio, text: "Live圈" }
  ]);

  // 优化动画效果
  useEffect(() => {
    const generateElements = () => {
      return Array.from({ length: 12 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        delay: i * 0.3,
        scale: 0.8 + Math.random() * 0.4,
        type: i % 4,
        speed: 0.5 + Math.random() * 0.5, // 控制移动速度
        angle: Math.random() * Math.PI * 2 // 随机移动方向
      }));
    };

    setAnimationElements(generateElements());

    const updateAnimations = () => {
      const now = Date.now();
      const deltaTime = (now - lastUpdateRef.current) / 1000; // 转换为秒
      lastUpdateRef.current = now;

      setAnimationElements(prev => prev.map(el => {
        // 计算新的位置，使用正弦和余弦实现平滑的圆周运动
        const newTop = el.top + Math.sin(el.angle) * el.speed * deltaTime;
        const newLeft = el.left + Math.cos(el.angle) * el.speed * deltaTime;

        // 边界检查，确保元素保持在可见区域内
        if (newTop <= 0 || newTop >= 100) el.angle = Math.PI - el.angle;
        if (newLeft <= 0 || newLeft >= 100) el.angle = -el.angle;

        return {
          ...el,
          top: Math.max(0, Math.min(100, newTop)),
          left: Math.max(0, Math.min(100, newLeft)),
          scale: 0.8 + Math.sin(now / 2000 + el.delay) * 0.2 // 平滑的缩放动画
        };
      }));

      animationFrameRef.current = requestAnimationFrame(updateAnimations);
    };

    animationFrameRef.current = requestAnimationFrame(updateAnimations);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // 社交元素动画组件
  const SocialElements = () => (
    <>
      {animationElements.map((el) => (
        <div
          key={el.id}
          className={`absolute transition-all duration-[${el.duration}s] ease-in-out`}
          style={{
            top: `${el.top}%`,
            left: `${el.left}%`,
            transform: `scale(${el.scale})`,
            transition: `all ${el.duration}s ease-in-out`
          }}
        >
          {el.type === 0 ? (
            <MessageCircle className={`w-8 h-8 ${isDarkMode ? 'text-pink-400/30' : 'text-pink-400/40'}`} />
          ) : el.type === 1 ? (
            <Heart className={`w-8 h-8 ${isDarkMode ? 'text-pink-300/30' : 'text-pink-400/40'}`} />
          ) : el.type === 2 ? (
            <Share2 className={`w-8 h-8 ${isDarkMode ? 'text-pink-200/30' : 'text-pink-400/40'}`} />
          ) : (
            <BookMarked className={`w-8 h-8 ${isDarkMode ? 'text-pink-100/30' : 'text-pink-400/40'}`} />
          )}
        </div>
      ))}
    </>
  );

  // 主题相关样式优化
  const getThemeStyles = () => ({
    background: isDarkMode
      ? 'linear-gradient(to bottom right, #1a1a1a, #2d1a24, #1a1a1a)'
      : 'linear-gradient(to bottom right, #ffffff, #fff1f2, #ffe4e6)',
    text: isDarkMode ? 'text-white' : 'text-gray-900',
    cardBg: isDarkMode ? 'bg-gray-800/90' : 'bg-white/90',
  });

  const themeStyles = getThemeStyles();

  // 处理表单提交
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!isLoginMode) {
        // 注册逻辑
        const registerResponse = await axios.post('http://localhost:8080/api/auth/register', formData);
        if (registerResponse.status === 201) {
          alert('注册成功！请登录');
          setIsLoginMode(true);
        }
      } else {
        // 登录逻辑
        const loginResponse = await axios.post('http://localhost:8080/api/auth/login', {
          email: formData.email,
          password: formData.password,
          isAdminLogin
        });

        if (loginResponse.data) {
          const { user, admin, token } = loginResponse.data;
          localStorage.setItem('token', token);
          localStorage.setItem('isAdmin', admin);
          login({ user, isAdmin: admin, token });
          navigate(isAdminLogin ? '/admin' : '/news');
        }
      }
    } catch (error) {
      setError(error.response?.data?.message || '操作失败���请重试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div 
        className={`absolute inset-0 transition-all duration-500 ease-in-out ${
          isDarkMode 
            ? 'bg-gradient-to-br from-gray-900 via-pink-900/40 to-gray-900'
            : 'bg-gradient-to-br from-white via-pink-300/60 to-pink-200'
        }`}
      >
        {/* 主题切换按钮 */}
        <button
          onClick={toggleDarkMode}
          className={`fixed top-4 right-4 p-2 rounded-full transition-all duration-300 z-50 ${
            isDarkMode 
              ? 'bg-gray-800/80 hover:bg-gray-700/80 text-yellow-400' 
              : 'bg-white/80 hover:bg-gray-100/80 text-gray-600 shadow-lg'
          }`}
          aria-label={isDarkMode ? '切换到亮色模式' : '切换到暗色模式'}
        >
          {isDarkMode ? (
            <Sun className="w-6 h-6" />
          ) : (
            <Moon className="w-6 h-6" />
          )}
        </button>

        {/* 背景网格 - 增强对比度 */}
        <div 
          className={`absolute inset-0 transition-opacity duration-500 ${
            isDarkMode ? 'opacity-10' : 'opacity-20'
          }`}
          style={{
            backgroundImage: `linear-gradient(${isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(244,114,182,0.3)'} 1px, transparent 1px),
                            linear-gradient(90deg, ${isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(244,114,182,0.3)'} 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        />
        
        <SocialElements />
        
        {/* 修改热门话题面板样式 */}
        <div className={`absolute left-4 top-4 ${
          isDarkMode 
            ? 'bg-gray-800/70 text-pink-300' 
            : 'bg-white/90 text-gray-800'
        } backdrop-blur-sm rounded-lg p-4 max-w-xs transition-colors duration-300`}>
          <div className="space-y-3">
            {trendingTopics.map((topic, index) => {
              const Icon = topic.icon;
              return (
                <div 
                  key={index} 
                  className={`flex items-center ${
                    isDarkMode 
                      ? 'text-pink-200/90 hover:text-pink-100' 
                      : 'text-gray-600 hover:text-gray-900'
                  } text-sm cursor-pointer transition-colors group`}
                >
                  <Icon className={`w-4 h-4 mr-2 ${
                    isDarkMode ? 'text-pink-400' : 'text-gray-600'
                  } group-hover:scale-110 transition-transform`} />
                  <span className="font-medium">{topic.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 主内容区域 */}
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-md w-full space-y-8">
            {/* 标题部分 */}
            <div className="text-center">
              <h1 className={`text-3xl font-allegro font-bold mb-8 ${
                isDarkMode ? 'text-pink-200' : 'text-gray-900'
              } transition-colors duration-300`}>
                Campus Private Domain Platform
                <span className={`block text-sm ${
                  isDarkMode ? 'text-pink-300/70' : 'text-gray-600'
                } mt-1 transition-colors duration-300`}>
                  —Made by Chronos
                </span>
              </h1>
            </div>

            {/* 认证表单卡片 */}
            <div className={`${
              isDarkMode 
                ? 'bg-gray-800/90 border border-pink-900/30' 
                : 'bg-white/90'
            } p-8 rounded-xl shadow-lg backdrop-blur-sm transform hover:scale-105 transition-all duration-300`}>
              <h2 className={`text-2xl font-bold text-center mb-8 ${
                isDarkMode ? 'text-pink-200' : 'text-gray-800'
              }`}>
                {isLoginMode ? '登录账户' : '注册账户'}
              </h2>

              {/* 表单输入框样式更新 */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLoginMode && (
                  <div className="relative">
                    <Users className={`w-5 h-5 ${
                      isDarkMode ? 'text-pink-400' : 'text-gray-400'
                    } absolute left-3 top-3`} />
                    <input
                      name="username"
                      type="text"
                      required={!isLoginMode}
                      className={`w-full p-3 pl-10 border rounded-lg ${
                        isDarkMode 
                          ? 'bg-gray-700 border-pink-900/30 text-pink-100 placeholder-pink-300/50' 
                          : 'border-gray-300 text-gray-900 placeholder-gray-400'
                      } focus:ring-2 focus:ring-pink-500 transition-colors duration-300`}
                      placeholder="用户名"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      disabled={isLoading}
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
                    disabled={isLoading}
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
                    disabled={isLoading}
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
                      disabled={isLoading}
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

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 px-4 rounded-lg text-white ${
                    isDarkMode
                      ? 'bg-gradient-to-r from-pink-800 to-pink-900 hover:from-pink-700 hover:to-pink-800'
                      : 'bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transform hover:scale-102 transition-all duration-300`}
                >
                  {isLoading ? '处理中...' : (isLoginMode ? '登录' : '注册')}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => {
                    setIsLoginMode(!isLoginMode);
                    setIsAdminLogin(false);
                    setError('');
                    setFormData({
                      username: '',
                      email: '',
                      password: ''
                    });
                  }}
                  disabled={isLoading}
                  className={`${
                    isDarkMode ? 'text-pink-400 hover:text-pink-300' : 'text-pink-500 hover:text-pink-600'
                  } transition-colors duration-300`}
                >
                  {isLoginMode ? '没有账户？点击注册' : '已有账户？点击登录'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @font-face {
          font-family: 'Allegro';
          src: url('/fonts/Allegro.ttf') format('truetype');
        }
        
        .font-allegro {
          font-family: 'Allegro', sans-serif;
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0);
            opacity: ${isDarkMode ? 0.4 : 0.6};
          }
          50% {
            transform: translate(0, -10px);
            opacity: ${isDarkMode ? 0.6 : 0.8};
          }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .bg-grid {
          background-image: linear-gradient(
            ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 1px,
            transparent 1px
          ),
          linear-gradient(
            90deg,
            ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} 1px,
            transparent 1px
          );
          background-size: 20px 20px;
          transition: background-image 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default AuthPage;