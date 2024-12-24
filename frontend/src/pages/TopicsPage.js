import React, { useState } from 'react';
import { TrendingUp, MessageSquare, Users, Clock } from 'lucide-react';
import BackgroundAnimation from '../components/shared/BackgroundAnimation';
import Button from '../components/shared/Button';
import { useTheme } from '../context/ThemeContext';

const TopicsPage = () => {
    const { isDarkMode } = useTheme();
    const [topics, setTopics] = useState([
        {
            id: 1,
            title: '期末复习经验分享',
            description: '大家可以分享一下各自的复习方法和技巧',
            participants: 128,
            replies: 56,
            lastActive: '10分钟前',
            tags: ['学习', '考试', '经验']
        },
        {
            id: 2,
            title: '校园摄影作品展',
            description: '分享你拍摄的最美校园瞬间',
            participants: 89,
            replies: 34,
            lastActive: '30分钟前',
            tags: ['摄影', '艺术', '校园']
        }
    ]);

    const [trendingTopics] = useState([
        {
            id: 1,
            title: '#期末复习',
            count: 1234,
            trending: '+25%'
        },
        {
            id: 2,
            title: '#校园摄影',
            count: 890,
            trending: '+15%'
        }
    ]);

    return (
        <div className={`min-h-screen relative ${
            isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}>
            <BackgroundAnimation />
            
            <div className="max-w-6xl mx-auto p-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* 主话题列表 */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex justify-between items-center">
                            <h2 className={`text-2xl font-semibold ${
                                isDarkMode ? 'text-gray-100' : 'text-gray-800'
                            } mb-6`}>话题讨论</h2>
                            <Button variant="primary" size="md">
                                发起话题
                            </Button>
                        </div>
                        
                        {topics.map(topic => (
                            <div key={topic.id} className="bg-white rounded-2xl shadow-lg p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-medium text-gray-800">{topic.title}</h3>
                                    <div className="flex gap-2">
                                        {topic.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm">
                      {tag}
                    </span>
                                        ))}
                                    </div>
                                </div>

                                <p className="text-gray-600 mb-4">{topic.description}</p>

                                <div className="flex items-center gap-6 text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <Users className="w-5 h-5" />
                                        <span>{topic.participants} 参与</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MessageSquare className="w-5 h-5" />
                                        <span>{topic.replies} 回复</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-5 h-5" />
                                        <span>{topic.lastActive}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 热门话题侧边栏 */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="text-lg font-medium text-gray-800 mb-6 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-pink-500" />
                                热门话题
                            </h3>

                            <div className="space-y-4">
                                {trendingTopics.map(topic => (
                                    <div key={topic.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-pink-50 transition-colors">
                                        <div>
                                            <h4 className="font-medium text-gray-800">{topic.title}</h4>
                                            <span className="text-sm text-gray-500">{topic.count} 讨论</span>
                                        </div>
                                        <span className="text-green-500 text-sm">{topic.trending}</span>
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

export default TopicsPage;