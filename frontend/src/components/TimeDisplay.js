import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TimeDisplay = ({ isDarkMode }) => {
  // ... 保持原有代码不变 ...
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Calendar navigation functions
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));
  };

  // Calendar helper functions
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  // Format time with AM/PM
  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8" />);
    }
    
    // Add the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = new Date().toDateString() === new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toDateString();
      days.push(
        <div
          key={day}
          className={`h-8 w-8 flex items-center justify-center rounded-full
            ${isToday ? (isDarkMode ? 'bg-pink-600 text-white' : 'bg-pink-500 text-white') : ''}
            ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}
          `}
        >
          {day}
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className={`w-full mx-auto ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
      {/* Digital Clock */}
      <div className="text-center mb-8">
        <div className={`text-4xl font-bold mb-2 ${isDarkMode ? 'text-pink-400' : 'text-pink-600'}`}>
          {formatTime(currentTime)}
        </div>
        <div className="text-sm opacity-75">
          {currentTime.toLocaleDateString('zh-CN', { weekday: 'long' })}
        </div>
      </div>

      {/* Calendar */}
      <div className={`rounded-2xl p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className={`p-1 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-semibold">
            {currentMonth.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' })}
          </span>
          <button onClick={nextMonth} className={`p-1 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {['日', '一', '二', '三', '四', '五', '六'].map(day => (
            <div key={day} className="text-sm font-medium opacity-75">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {generateCalendarDays()}
        </div>
      </div>
    </div>
  );
};

export default TimeDisplay; 