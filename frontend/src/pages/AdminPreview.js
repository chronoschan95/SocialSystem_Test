import React from 'react';
import { Layout, Users, Newspaper, Moon, User, Mail, Key } from 'lucide-react';

// Mock data for preview
const mockUsers = [
  { id: 1, username: "张三", email: "zhang@edu.cn", role: "user" },
  { id: 2, username: "李四", email: "li@edu.cn", role: "admin" }
];

const mockNews = [
  {
    id: 1,
    title: "2024春季开学通知",
    category: "重要通知",
    content: "根据学校安排，2024春季学期将于2月26日正式开始...",
    important: true
  }
];

const AdminPreview = () => {
  return (
    <div className="min-h-screen bg-pink-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Layout className="w-6 h-6 text-pink-500" />
            <span className="text-xl font-semibold text-pink-600">管理后台</span>
          </div>
          <div className="flex items-center gap-4">
            <Moon className="w-5 h-5 text-gray-600" />
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white h-screen shadow-sm p-4">
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 text-left px-4 py-2 rounded-lg bg-pink-50 text-pink-600">
              <Users className="w-5 h-5" />
              用户管理
            </button>
            <button className="w-full flex items-center gap-3 text-left px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-50">
              <Newspaper className="w-5 h-5" />
              新闻管理
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-800">用户管理</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索用户..."
                  className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
                />
              </div>
            </div>
            
            {/* User Table */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">用户名</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">邮箱</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">角色</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockUsers.map(user => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 text-gray-800">{user.username}</td>
                      <td className="px-6 py-4 text-gray-800">{user.email}</td>
                      <td className="px-6 py-4">
                        <select className="rounded-lg border border-gray-200 px-3 py-1">
                          <option value="user">普通用户</option>
                          <option value="admin">管理员</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-red-500 hover:text-red-600">删除</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* News Management Preview */}
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">新闻管理</h2>
              <div className="grid gap-6">
                {mockNews.map(item => (
                  <div key={item.id} className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          {item.important && (
                            <span className="px-3 py-1 bg-pink-100 text-pink-600 rounded-full text-sm">
                              重要
                            </span>
                          )}
                          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                            {item.category}
                          </span>
                        </div>
                        <h3 className="text-xl font-medium text-gray-800">
                          {item.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="text-gray-500 hover:text-gray-700">编辑</button>
                        <button className="text-red-500 hover:text-red-600">删除</button>
                      </div>
                    </div>
                    <p className="text-gray-600">{item.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPreview;