import React, { useState } from 'react';
import { Bell, Clock, MessageSquare, ThumbsUp } from 'lucide-react';

const UpdatesPage = () => {
    const [updates] = useState([
        {
            id: 1,
            author: '张三',
            content: '刚刚参加了校园摄影比赛，分享几张作品...',
            time: '10分钟前',
            likes: 15,
            comments: 3
        },
        {
            id: 2,
            author: '李四',
            content: '图书馆新增了一批计算机科学相关书籍，推荐大家借阅！',
            time: '30分钟前',
            likes: 28,
            comments: 7
        }
    ]);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">最新动态</h2>
            <div className="space-y-6">
                {updates.map(update => (
                    <div key={update.id} className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                                <span className="text-pink-600 font-medium">
                                    {update.author[0]}
                                </span>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-800">{update.author}</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Clock className="w-4 h-4" />
                                    <span>{update.time}</span>
                                </div>
                            </div>
                        </div>

                        <p className="text-gray-600 mb-4">{update.content}</p>

                        <div className="flex items-center gap-6 text-gray-500">
                            <button className="flex items-center gap-2 hover:text-pink-500">
                                <ThumbsUp className="w-5 h-5" />
                                <span>{update.likes}</span>
                            </button>
                            <button className="flex items-center gap-2 hover:text-pink-500">
                                <MessageSquare className="w-5 h-5" />
                                <span>{update.comments}</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpdatesPage; 