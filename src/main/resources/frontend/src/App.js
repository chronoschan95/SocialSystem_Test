import React, { useState, useEffect } from 'react';
import { Layout, Moon, Sun } from 'lucide-react';

const App = () => {
    const [currentPage, setCurrentPage] = useState('updates');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // 初始化时检查系统偏好的主题
    useEffect(() => {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(prefersDark);
    }, []);

    // 当暗色模式状态改变时，更新文档根元素的类名
    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        setIsDarkMode(prev => !prev);
    };

    const renderContent = () => {
        if (!isAuthenticated) {
            return (
                <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-pink-50 text-gray-800'} flex items-center justify-center p-4`}>
                    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl shadow-xl p-8 w-full max-w-md`}>
                        <h2 className={`text-2xl font-semibold text-center mb-8 ${isDarkMode ? 'text-pink-400' : 'text-pink-600'}`}>
                            登录以继续
                        </h2>
                        <button
                            onClick={() => setIsAuthenticated(true)}
                            className="w-full py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition-colors font-medium"
                        >
                            模拟登录
                        </button>
                    </div>
                </div>
            );
        }

        switch (currentPage) {
            case 'personal-log':
                return (
                    <div className="p-4">
                        <h1 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>个人日志</h1>
                    </div>
                );
            // ... 其他页面的渲染逻辑 ...
        }
    };

    if (!isAuthenticated) {
        return renderContent();
    }

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-pink-50 text-gray-800'}`}>
            {/* Navigation */}
            <nav className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm p-4`}>
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <Layout className="w-6 h-6 text-pink-500" />
                        <span className={`text-xl font-semibold ${isDarkMode ? 'text-pink-400' : 'text-pink-600'}`}>校园社交</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleDarkMode}
                            className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'} hover:opacity-80 transition-opacity`}
                        >
                            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                        <button
                            onClick={() => setIsAuthenticated(false)}
                            className={`px-4 py-2 ${isDarkMode ? 'text-pink-400 hover:text-pink-300' : 'text-pink-600 hover:text-pink-700'}`}
                        >
                            退出
                        </button>
                    </div>
                </div>
            </nav>

            {/* Sidebar and Content */}
            <div className="flex">
                {/* Sidebar */}
                <div className={`w-64 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} h-screen shadow-sm p-4`}>
                    <div className="space-y-2">
                        {['personal-log', 'updates', 'topics', 'news'].map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                                    currentPage === page
                                        ? isDarkMode
                                            ? 'bg-pink-900/50 text-pink-400'
                                            : 'bg-pink-50 text-pink-600'
                                        : isDarkMode
                                            ? 'text-gray-300 hover:bg-gray-700'
                                            : 'text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                {page === 'personal-log' && '个人日志'}
                                {page === 'updates' && '动态更新'}
                                {page === 'topics' && '话题讨论'}
                                {page === 'news' && '校园新闻'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default App;