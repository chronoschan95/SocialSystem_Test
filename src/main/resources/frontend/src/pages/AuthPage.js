import React, { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // 这里将连接后端API
        console.log('Form submitted:', formData);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-8 text-pink-600">
                    {isLogin ? '欢迎回来' : '创建新账号'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {!isLogin && (
                        <div className="relative">
                            <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                name="username"
                                placeholder="用户名"
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>
                    )}

                    <div className="relative">
                        <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                        <input
                            type="email"
                            name="email"
                            placeholder="邮箱地址"
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                        <input
                            type="password"
                            name="password"
                            placeholder="密码"
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 outline-none"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition-colors font-medium"
                    >
                        {isLogin ? '登录' : '注册'}
                    </button>
                </form>

                <p className="text-center mt-6 text-gray-600">
                    {isLogin ? '还没有账号？' : '已有账号？'}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-pink-500 hover:text-pink-600 ml-2 font-medium"
                    >
                        {isLogin ? '立即注册' : '立即登录'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default AuthPage;