import React, { useState } from 'react';
import { MessageCircle, Heart, Share2, Image } from 'lucide-react';

const LiveModule = ({ isDarkMode }) => {
  const [posts] = useState([
    {
      id: 1,
      author: '张三',
      avatar: '张',
      content: '今天图书馆学习氛围真好！',
      images: ['library1.jpg', 'library2.jpg'],
      likes: 15,
      comments: 3,
      time: '10分钟前'
    },
    {
      id: 2,
      author: '李四',
      avatar: '李',
      content: '食堂新推出的菜品都很不错，推荐大家尝试！',
      images: ['food1.jpg'],
      likes: 28,
      comments: 7,
      time: '30分钟前'
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className={`text-2xl font-semibold ${
          isDarkMode ? 'text-gray-100' : 'text-gray-800'
        }`}>Live圈</h2>
        
        <button className={`px-4 py-2 rounded-lg ${
          isDarkMode 
            ? 'bg-pink-600 hover:bg-pink-700' 
            : 'bg-pink-500 hover:bg-pink-600'
        } text-white transition-colors duration-200`}>
          发布动态
        </button>
      </div>

      <div className="grid gap-6">
        {posts.map(post => (
          <div key={post.id} 
            className={`${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            } rounded-xl p-6 shadow-lg`}
          >
            {/* 作者信息 */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
                <span className="text-pink-600 font-medium">{post.avatar}</span>
              </div>
              <div>
                <h3 className={`font-medium ${
                  isDarkMode ? 'text-gray-100' : 'text-gray-800'
                }`}>{post.author}</h3>
                <span className={`text-sm ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>{post.time}</span>
              </div>
            </div>

            {/* 内容 */}
            <p className={`mb-4 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>{post.content}</p>

            {/* 图片网格 */}
            {post.images.length > 0 && (
              <div className={`grid ${
                post.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'
              } gap-2 mb-4`}>
                {post.images.map((image, index) => (
                  <div key={index} className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center">
                    <Image className="w-6 h-6 text-gray-400" />
                  </div>
                ))}
              </div>
            )}

            {/* 交互按钮 */}
            <div className="flex items-center gap-6">
              <button className={`flex items-center gap-2 ${
                isDarkMode ? 'text-gray-400 hover:text-pink-400' : 'text-gray-600 hover:text-pink-500'
              } transition-colors duration-200`}>
                <Heart className="w-5 h-5" />
                <span>{post.likes}</span>
              </button>
              <button className={`flex items-center gap-2 ${
                isDarkMode ? 'text-gray-400 hover:text-pink-400' : 'text-gray-600 hover:text-pink-500'
              } transition-colors duration-200`}>
                <MessageCircle className="w-5 h-5" />
                <span>{post.comments}</span>
              </button>
              <button className={`flex items-center gap-2 ${
                isDarkMode ? 'text-gray-400 hover:text-pink-400' : 'text-gray-600 hover:text-pink-500'
              } transition-colors duration-200`}>
                <Share2 className="w-5 h-5" />
                <span>分享</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveModule; 