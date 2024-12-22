import React, { useState } from 'react';
import { Calendar, Plus, Clock, ChevronRight } from 'lucide-react';

const PersonalLog = () => {
    const [logs, setLogs] = useState([
        {
            id: 1,
            title: '咖啡冲泡配方记录',
            lastUpdate: '2024-12-20',
            versions: [
                { id: 1, date: '2024-12-20', content: '水温：92℃, 粉水比：1:15' },
                { id: 2, date: '2024-12-19', content: '水温：88℃, 粉水比：1:16' }
            ]
        }
    ]);

    const [showNewLog, setShowNewLog] = useState(false);
    const [newLog, setNewLog] = useState({ title: '', content: '' });

    const handleNewLog = (e) => {
        e.preventDefault();
        if (newLog.title && newLog.content) {
            setLogs([{
                id: logs.length + 1,
                title: newLog.title,
                lastUpdate: new Date().toISOString().split('T')[0],
                versions: [{
                    id: 1,
                    date: new Date().toISOString().split('T')[0],
                    content: newLog.content
                }]
            }, ...logs]);
            setNewLog({ title: '', content: '' });
            setShowNewLog(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-semibold text-gray-800">个人记录</h1>
                <button
                    onClick={() => setShowNewLog(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    <span>新建记录</span>
                </button>
            </div>

            {showNewLog && (
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <form onSubmit={handleNewLog} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                标题
                            </label>
                            <input
                                type="text"
                                value={newLog.title}
                                onChange={(e) => setNewLog({...newLog, title: e.target.value})}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                                placeholder="输入记录标题"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                内容
                            </label>
                            <textarea
                                value={newLog.content}
                                onChange={(e) => setNewLog({...newLog, content: e.target.value})}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-1 focus:ring-pink-500 min-h-[100px]"
                                placeholder="输入记录内容"
                            />
                        </div>
                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => setShowNewLog(false)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                            >
                                取消
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition-colors"
                            >
                                保存
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="space-y-4">
                {logs.map(log => (
                    <div key={log.id} className="bg-white rounded-2xl shadow-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-medium text-gray-800">{log.title}</h3>
                            <div className="flex items-center text-sm text-gray-500">
                                <Clock className="w-4 h-4 mr-1" />
                                <span>最后更新：{log.lastUpdate}</span>
                            </div>
                        </div>
                        <div className="space-y-3">
                            {log.versions.map(version => (
                                <div
                                    key={version.id}
                                    className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50"
                                >
                                    <Calendar className="w-5 h-5 text-gray-400 mt-1" />
                                    <div className="flex-1">
                                        <div className="text-sm text-gray-500 mb-1">
                                            版本 {version.id} · {version.date}
                                        </div>
                                        <div className="text-gray-700">{version.content}</div>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PersonalLog;
