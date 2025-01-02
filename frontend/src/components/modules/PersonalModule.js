import React, { useState } from 'react';
import { Users, Calendar, CheckCircle, Clock } from 'lucide-react';

const PersonalModule = ({ isDarkMode }) => {
  const [tasks] = useState([
    {
      id: 1,
      title: '提交期末论文',
      deadline: '2024-01-10',
      status: 'pending',
      priority: 'high',
      category: '学习'
    },
    {
      id: 2,
      title: '参加社团活动',
      deadline: '2024-01-05',
      status: 'completed',
      priority: 'medium',
      category: '活动'
    },
    {
      id: 3,
      title: '图书馆借书续借',
      deadline: '2024-01-08',
      status: 'pending',
      priority: 'low',
      category: '日常'
    }
  ]);

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'text-pink-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className={`text-2xl font-semibold ${
        isDarkMode ? 'text-gray-100' : 'text-gray-800'
      }`}>个人事务</h2>

      <div className="grid gap-4">
        {tasks.map(task => (
          <div key={task.id} 
            className={`${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-xl`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
                <h3 className={`text-lg font-medium ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-800'
                }`}>{task.title}</h3>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                task.status === 'completed' 
                  ? 'bg-green-100 text-green-600' 
                  : 'bg-yellow-100 text-yellow-600'
              }`}>
                {task.status === 'completed' ? '已完成' : '进行中'}
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div className={`flex items-center gap-1 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <Calendar className="w-4 h-4" />
                <span>截止: {task.deadline}</span>
              </div>
              <div className={`flex items-center gap-1 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <CheckCircle className="w-4 h-4" />
                <span>{task.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalModule; 