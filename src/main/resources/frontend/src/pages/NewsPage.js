import React, { useState } from 'react';
import { Calendar, Bell, Star } from 'lucide-react';

const NewsPage = () => {
    const [news] = useState([
        {
            id: 1,
            title: '2024年春季学期开学通知',
            category: '重要通知',
            date: '2024-12-20',
            summary: '关于2024年春季学期开学安排的详细通知...',
            important: true
        },
        {
            id: 2,
            title: '校园图书馆冬季开放时间调整',
            category: '服务公告',
            date: '2024-12-19',
            summary: '因应寒假期间，图书馆开放时间调整如下...',
            important: false
        }
    ]);

    const [calendar] = useState([
        {
            id: 1,
            event: '期末考试周',
            startDate: '2025-01-02',
            endDate: '2025-01-15',
            type: 'exam'
        },
        {
            id: 2,
            event: '寒假开始',
            startDate: '2025-01-16',
            type: 'holiday'
        }
    ]);

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 新闻列表 */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">校园新闻</h2>

                    {news.map(item => (
                        <div key={item.id} className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        {item.important && (
                                            <span className="flex items-center gap-1 px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm">
                        <Star className="w-4 h-4" />
                        重要
                      </span>
                                        )}
                                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                      {item.category}
                    </span>
                                    </div>
                                    <h3 className="text-xl font-medium text-gray-800">{item.title}</h3>
                                </div>
                                <span className="text-sm text-gray-500">{item.date}</span>
                            </div>

                            <p className="text-gray-600">{item.summary}</p>

                            <button className="mt-4 text-pink-500 hover:text-pink-600 font-medium">
                                阅读更多
                            </button>
                        </div>
                    ))}
                </div>

                {/* 校历和通知侧边栏 */}
                <div className="lg:col-span-1 space-y-6">
                    {/* 校历 */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h3 className="text-lg font-medium text-gray-800 mb-6 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-pink-500" />
                            校历
                        </h3>

                        <div className="space-y-4">
                            {calendar.map(event => (
                                <div key={event.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-pink-50 transition-colors">
                                    <div className="w-12 h-12 flex-shrink-0 bg-pink-100 rounded-xl flex items-center justify-center">
                    <span className="text-pink-500 text-sm font-medium">
                      {event.startDate.split('-')[2]}日
                    </span>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-800">{event.event}</h4>
                                        <span className="text-sm text-gray-500">
                      {event.startDate}
                                            {event.endDate ? ` 至 ${event.endDate}` : ''}
                    </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 通知提醒 */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h3 className="text-lg font-medium text-gray-800 mb-6 flex items-center gap-2">
                            <Bell className="w-5 h-5 text-pink-500" />
                            通知提醒
                        </h3>

                        <div className="p-4 bg-pink-50 rounded-xl text-pink-600 text-sm">
                            最近有 3 个重要截止日期即将到来
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsPage;