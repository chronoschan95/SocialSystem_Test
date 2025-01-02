import React from 'react';
import { Calendar, Bell } from 'lucide-react';

const CalendarModule = ({ isDarkMode }) => {
  const events = [
    {
      id: 1,
      title: '期末考试周',
      startDate: '2025-01-02',
      endDate: '2025-01-15',
      type: 'exam'
    },
    {
      id: 2,
      title: '寒假开始',
      startDate: '2025-01-16',
      type: 'holiday'
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className={`text-2xl font-semibold ${
        isDarkMode ? 'text-gray-100' : 'text-gray-800'
      }`}>校历通知</h2>
      
      <div className="grid gap-4">
        {events.map(event => (
          <div key={event.id} 
            className={`${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } rounded-xl p-6 shadow-lg`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg font-medium ${
                isDarkMode ? 'text-gray-100' : 'text-gray-800'
              }`}>{event.title}</h3>
              <span className={`px-3 py-1 rounded-full text-sm ${
                event.type === 'exam' 
                  ? 'bg-pink-100 text-pink-600' 
                  : 'bg-blue-100 text-blue-600'
              }`}>
                {event.type === 'exam' ? '考试' : '假期'}
              </span>
            </div>
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {event.startDate} {event.endDate ? `至 ${event.endDate}` : ''}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarModule; 