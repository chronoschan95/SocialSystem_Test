import React from 'react';
import { TrendingUp, Star } from 'lucide-react';

const TrendingModule = ({ isDarkMode }) => {
  const trends = [
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
  ];

  return (
    <div className="space-y-6">
      <h2 className={`text-2xl font-semibold ${
        isDarkMode ? 'text-gray-100' : 'text-gray-800'
      }`}>热点事件</h2>
      
      <div className="grid gap-4">
        {trends.map(trend => (
          <div key={trend.id} 
            className={`${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } rounded-xl p-6 shadow-lg`}
          >
            <div className="flex items-center gap-3 mb-2">
              {trend.important && (
                <span className="flex items-center gap-1 px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm">
                  <Star className="w-4 h-4" />
                  重要
                </span>
              )}
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                {trend.category}
              </span>
            </div>
            <h3 className={`text-xl font-medium mb-2 ${
              isDarkMode ? 'text-gray-100' : 'text-gray-800'
            }`}>{trend.title}</h3>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>{trend.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingModule; 