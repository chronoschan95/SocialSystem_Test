import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarWidget = () => {
  const [currentDate] = useState(new Date());
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  return (
    <div className="w-full">
      {/* 月份导航 */}
      <div className="flex items-center justify-between mb-4">
        <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
          <ChevronLeft className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </button>
        <span className="font-medium text-gray-800 dark:text-white">
          2025年1月
        </span>
        <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
          <ChevronRight className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </button>
      </div>

      {/* 星期标题 */}
      <div className="grid grid-cols-7 mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-center text-sm text-gray-500 dark:text-gray-400">
            {day}
          </div>
        ))}
      </div>

      {/* 日期网格 */}
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 31 }, (_, i) => (
          <button
            key={i + 1}
            className={`aspect-square flex items-center justify-center text-sm rounded-full
              ${i + 1 === 2 ? 'bg-pink-500 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
              ${i + 1 === currentDate.getDate() ? 'font-bold' : ''}
            `}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CalendarWidget;
