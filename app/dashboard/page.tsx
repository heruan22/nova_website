'use client';

import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBusinessData();
  }, []);

  const fetchBusinessData = async () => {
    try {
      const response = await fetch('/api/dashboard/business');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Failed to fetch business data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-600">加载中...</div>
      </div>
    );
  }

  const stats = data?.stats || [
    { label: '本月订单', value: '156', change: '+12%', trend: 'up', icon: '📦' },
    { label: '运输中', value: '89', change: '+5%', trend: 'up', icon: '🚢' },
    { label: '本月收入', value: '¥2.8M', change: '+18%', trend: 'up', icon: '💰' },
    { label: '客户总数', value: '342', change: '+8%', trend: 'up', icon: '👥' },
  ];

  const recentOrders = data?.recentOrders || [
    { id: 'ORD-2025-001', customer: '上海钢铁有限公司', cargo: '热轧卷板', volume: '500吨', status: '运输中', date: '2025-11-18' },
    { id: 'ORD-2025-002', customer: '宁波化工集团', cargo: '化工吨包', volume: '280吨', status: '已装船', date: '2025-11-19' },
    { id: 'ORD-2025-003', customer: '天津机械厂', cargo: '工程车辆', volume: '12台', status: '待装船', date: '2025-11-20' },
    { id: 'ORD-2025-004', customer: '青岛贸易公司', cargo: '钢材型材', volume: '350吨', status: '运输中', date: '2025-11-17' },
    { id: 'ORD-2025-005', customer: '大连物流', cargo: '集装箱货物', volume: '45FEU', status: '已完成', date: '2025-11-15' },
  ];

  return (
    <div className="space-y-8">
      {/* 欢迎横幅 */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">欢迎回来! 👋</h1>
            <p className="text-blue-100">今天也要继续加油哦,查看最新的业务数据和快捷功能</p>
          </div>
          <button 
            onClick={fetchBusinessData}
            className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition border border-white/30"
          >
            🔄 刷新数据
          </button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-2xl">
                {stat.icon}
              </div>
              <span className={`text-sm font-semibold ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">{stat.label}</h3>
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* 核心功能区 - 大卡片 */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">🎯 核心功能</h2>
          <span className="text-sm text-gray-500">点击卡片进入功能页面</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <a href="/dashboard/container-tracking" className="group bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center text-3xl backdrop-blur-sm group-hover:scale-110 transition-transform">
                📦
              </div>
              <svg className="w-6 h-6 text-white/80 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="text-white text-xl font-bold mb-2">货柜追踪</h3>
            <p className="text-blue-100 text-sm">实时追踪货柜位置和状态</p>
          </a>

          <a href="/dashboard/quotations" className="group bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center text-3xl backdrop-blur-sm group-hover:scale-110 transition-transform">
                💵
              </div>
              <svg className="w-6 h-6 text-white/80 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="text-white text-xl font-bold mb-2">报价管理</h3>
            <p className="text-green-100 text-sm">管理航线报价和运费</p>
          </a>

          <a href="/dashboard/customers" className="group bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center text-3xl backdrop-blur-sm group-hover:scale-110 transition-transform">
                👥
              </div>
              <svg className="w-6 h-6 text-white/80 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="text-white text-xl font-bold mb-2">客户管理</h3>
            <p className="text-purple-100 text-sm">CRM客户关系管理</p>
          </a>

          <a href="/dashboard/analytics" className="group bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center text-3xl backdrop-blur-sm group-hover:scale-110 transition-transform">
                📊
              </div>
              <svg className="w-6 h-6 text-white/80 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <h3 className="text-white text-xl font-bold mb-2">数据分析</h3>
            <p className="text-orange-100 text-sm">深度业务数据分析</p>
          </a>
        </div>
      </div>

      {/* 常用工具区 - 中等卡片 */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">🛠️ 常用工具</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a href="/dashboard/schedule-table" className="group bg-white border-2 border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-lg hover:border-blue-400 transition-all transform hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">📋</div>
              <div className="flex-1">
                <h3 className="text-gray-900 font-bold group-hover:text-blue-600 transition">船期表管理</h3>
                <p className="text-gray-500 text-xs">查看编辑船期</p>
              </div>
            </div>
          </a>

          <a href="/dashboard/schedule" className="group bg-white border-2 border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-lg hover:border-green-400 transition-all transform hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">🚢</div>
              <div className="flex-1">
                <h3 className="text-gray-900 font-bold group-hover:text-green-600 transition">船期看板</h3>
                <p className="text-gray-500 text-xs">实时船期动态</p>
              </div>
            </div>
          </a>

          <a href="/dashboard/profit-calculator" className="group bg-white border-2 border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-lg hover:border-purple-400 transition-all transform hover:-translate-y-1">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">💰</div>
              <div className="flex-1">
                <h3 className="text-gray-900 font-bold group-hover:text-purple-600 transition">利润计算器</h3>
                <p className="text-gray-500 text-xs">计算运输利润</p>
              </div>
            </div>
          </a>

          <a href="/dashboard/knowledge-nav" className="group bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl p-5 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border-2 border-transparent hover:border-pink-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-2xl backdrop-blur-sm group-hover:scale-110 transition-transform">🧭</div>
              <div className="flex-1">
                <h3 className="text-white font-bold">知识导航</h3>
                <p className="text-pink-100 text-xs">货代工具导航</p>
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* 图表区域 */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">📈 业务数据概览</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 月度趋势 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">月度业务趋势</h3>
            <div className="h-64 flex items-end justify-between gap-2">
              {[65, 78, 85, 72, 90, 88, 95, 82, 87, 92, 85, 96].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <div
                    className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all hover:from-blue-700 hover:to-blue-500 cursor-pointer relative"
                    style={{ height: `${height}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {height}%
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 font-medium">{i + 1}月</span>
                </div>
              ))}
            </div>
          </div>

          {/* 货物类型分布 */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">货物类型分布</h3>
            <div className="space-y-4">
              {[
                { name: '钢材产品', percentage: 35, color: 'from-blue-500 to-blue-600' },
                { name: '化工吨包', percentage: 28, color: 'from-green-500 to-green-600' },
                { name: '车辆机械', percentage: 20, color: 'from-purple-500 to-purple-600' },
                { name: '集装箱货物', percentage: 12, color: 'from-orange-500 to-orange-600' },
                { name: '其他', percentage: 5, color: 'from-gray-500 to-gray-600' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">{item.name}</span>
                    <span className="text-sm font-bold text-gray-900">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                      className={`bg-gradient-to-r ${item.color} h-3 rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 最近订单 */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">📋 最近订单</h2>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">订单号</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">客户</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">货物</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">数量</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">状态</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">日期</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-blue-600">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{order.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.cargo}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold">{order.volume}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1.5 text-xs font-bold rounded-full ${
                        order.status === '运输中' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                        order.status === '已装船' ? 'bg-green-100 text-green-700 border border-green-200' :
                        order.status === '待装船' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                        'bg-gray-100 text-gray-700 border border-gray-200'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
