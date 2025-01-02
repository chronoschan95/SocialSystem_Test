import React, { useState, useEffect, useRef } from 'react';
import { 
  Moon, Sun, Users, MessageCircle, Heart, Share2, 
  BookMarked, Hash, TrendingUp, Bell, Calendar, User, Radio, Mail, Lock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';
import AlertDialog from '../components/AlertDialog';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    title: '',
    message: '',
    type: 'info',
    confirmText: '确定',
    cancelText: '取消',
    onConfirm: null,
    onCancel: null
  });

  // 添加动画配置
  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
  };

  const formTransition = {
    initial: { opacity: 0, x: isLoginMode ? -20 : 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: isLoginMode ? 20 : -20 },
    transition: { duration: 0.3 }
  };

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

  // 表单验证函数
  const validateForm = () => {
    if (!formData.email?.trim()) {
      setAlertConfig({
        title: '验证失败',
        message: '请输入邮箱地址',
        type: 'error',
        confirmText: '确定'
      });
      setShowAlert(true);
      return false;
    }

    if (!formData.password) {
      setAlertConfig({
        title: '验证失败',
        message: '请输入密码',
        type: 'error',
        confirmText: '确定'
      });
      setShowAlert(true);
      return false;
    }

    return true;
  };

  // 修改注册验证函数
  const validateRegistration = () => {
    // 验证用户名
    if (!formData.username?.trim()) {
      setAlertConfig({
        title: '验证失败',
        message: '请输入用户名',
        type: 'error',
        confirmText: '确定'
      });
      setShowAlert(true);
      return false;
    }

    // 验证邮箱
    if (!formData.email?.trim()) {
      setAlertConfig({
        title: '验证失败',
        message: '请输入邮箱地址',
        type: 'error',
        confirmText: '确定'
      });
      setShowAlert(true);
      return false;
    }

    // 验证密码
    if (!formData.password || formData.password.length < 6) {
      setAlertConfig({
        title: '验证失败',
        message: '密码长度至少为6位',
        type: 'error',
        confirmText: '确定'
      });
      setShowAlert(true);
      return false;
    }

    return true;
  };

  // 处理登录成功
  const handleLoginSuccess = (data) => {
    setAlertConfig({
      title: '登录成功',
      message: '正在跳转...',
      type: 'success',
      confirmText: '确定',
      onConfirm: () => {
        if (data.user.admin && isAdminLogin) {
          navigate('/admin');
        } else {
          navigate('/home');
        }
      }
    });
    setShowAlert(true);
  };

  // 修改表单提交处理
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLoginMode) {
      if (!validateForm()) return;
    } else {
      if (!validateRegistration()) return;
    }

    setIsLoading(true);
    try {
      if (isLoginMode) {
        const loginData = {
          email: formData.email.trim(),
          password: formData.password,
          loginAsAdmin: isAdminLogin
        };

        const response = await fetch('http://localhost:8080/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
          credentials: 'include'
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || '登录失败');
        }

        // 确保在存储之前数据是完整的
        if (data.user && data.user.email) {
          localStorage.setItem('email', data.user.email);
          localStorage.setItem('user', JSON.stringify(data.user));
          login(data);

          if (isAdminLogin && !data.user.admin) {
            setAlertConfig({
              title: '权限不足',
              message: '您的账号没有管理员权限',
              type: 'error',
              confirmText: '确定'
            });
            setShowAlert(true);
            return;
          }
          
          handleLoginSuccess(data);
        } else {
          throw new Error('登录响应中缺少用户信息');
        }
      } else {
        // 修改后的注册逻辑
        const registerData = {
          username: formData.username.trim(),
          email: formData.email.trim(),
          password: formData.password
        };

        const response = await fetch('http://localhost:8080/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(registerData)
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || '注册失败');
        }

        // 注册成功
        setAlertConfig({
          title: '注册成功',
          message: '请使用新账号登录',
          type: 'success',
          confirmText: '确定',
          onConfirm: () => {
            setIsLoginMode(true);
            setFormData({
              username: '',
              email: '',
              password: ''
            });
          }
        });
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error:', error);
      setAlertConfig({
        title: isLoginMode ? '登录失败' : '注册失败',
        message: error.message || '操作失败，请稍后重试',
        type: 'error',
        confirmText: '确定'
      });
      setShowAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  // 定义输入框通用样式
  const inputClassName = `w-full p-3 pl-10 border rounded-lg ${
    isDarkMode 
      ? 'bg-gray-700 border-pink-900/30 text-pink-100 placeholder-pink-300/50' 
      : 'border-gray-300 text-gray-900 placeholder-gray-400'
    } focus:ring-2 focus:ring-pink-500 transition-colors duration-300`;

  return (
    <motion.div 
      className="min-h-screen relative overflow-hidden"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
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
          <AnimatePresence mode="wait">
            <motion.div
              key={isLoginMode ? 'login' : 'register'}
              className="max-w-md w-full space-y-8"
              {...formTransition}
            >
              {/* 标题部分 */}
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
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
              </motion.div>

              {/* 认证表单卡片 */}
              <motion.div 
                className={`${
                  isDarkMode 
                    ? 'bg-gray-800/90 border border-pink-900/30' 
                    : 'bg-white/90'
                } p-8 rounded-xl shadow-lg backdrop-blur-sm transform hover:scale-105 transition-all duration-300`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
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
                        required
                        className={inputClassName}
                        placeholder="用户名"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        disabled={isLoading}
                      />
                    </div>
                  )}

                  <div className="relative">
                    <Mail className={`w-5 h-5 ${
                      isDarkMode ? 'text-pink-400' : 'text-gray-400'
                    } absolute left-3 top-3`} />
                    <input
                      name="email"
                      type="email"
                      required
                      className={inputClassName}
                      placeholder="邮箱地址"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={isLoading}
                    />
                  </div>

                  <div className="relative">
                    <Lock className={`w-5 h-5 ${
                      isDarkMode ? 'text-pink-400' : 'text-gray-400'
                    } absolute left-3 top-3`} />
                    <input
                      name="password"
                      type="password"
                      required
                      className={inputClassName}
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

                <motion.div 
                  className="mt-6 text-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
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
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
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

      {/* 添加 AlertDialog 组件 */}
      <AlertDialog
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        {...alertConfig}
      />
    </motion.div>
  );
};

export default AuthPage;