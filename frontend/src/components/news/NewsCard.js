import React from 'react';
import { Share2 } from 'lucide-react';

const NewsCard = ({ type, icon, title, date, description, isImportant }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden
      ${isImportant ? 'border-l-4 border-pink-500' : ''}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            {icon}
            <span className={`text-sm ${
              isImportant ? 'text-pink-500' : 'text-gray-500'
            } dark:text-gray-400`}>
              {type}
            </span>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">{date}</span>
        </div>
        
        <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
          {title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
          {description}
        </p>
        
        <div className="flex justify-between items-center">
          <button className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            阅读更多
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <Share2 className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
