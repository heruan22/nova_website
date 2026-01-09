'use client';

import { useState, useEffect } from 'react';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('本月');

  // 模拟数据
  const revenueData = {
    current: 2856000,
    previous: 2420000,
    growth: 18.0,
  };

  const monthlyData = [
    { month: '1月', revenue: 1850, orders: 45, containers: 156 },
    { month: '2月', revenue: 2100, orders: 52, containers: 178 },
    { month: '3月', revenue: 2450, orders: 58, containers: 195 },
    { month: '4月', revenue: 2280, orders: 55, containers: 188 },
    { month: '5月', revenue: 2680, orders: 62, containers: 208 },
    { month: '6月', revenue: 2920, orders: 68, containers: 225 },
    { month: '7月', revenue: 3150, orders: 75, containers: 245 },
    { month: '8月', revenue: 2890, orders: 70, containers: 232 },
    { month: '9月', revenue: 3080, orders: 73, containers: 238 },
    { month: '10月', revenue: 3250, orders: 78, containers: 255 },
    { month: '11月', revenue: 2856, orders: 68, containers: 228 },
    { month: '12月', revenue: 3400, orders: 82, containers: 268 },
  ];

  const routeStats = [
    { route: '中国-东南亚', orders: 156, revenue: 8520000, percentage: 29.8, color: 'bg-blue-500' },
    { route: '中国-中东', orders: 132, revenue: 7280000, percentage: 25.5, color: 'bg-green-500' },
    { route: '中国-非洲', orders: 98, revenue: 5460000, percentage: 19.1, color: 'bg-purple-500' },
    { route: '中国-南美', orders: 85, revenue: 4720000, percentage: 16.5, color: 'bg-orange-500' },
    { route: '其他航线', orders: 45, revenue: 2580000, percentage: 9.1, color: 'bg-gray-500' },
  ];

  const topCustomers = [
    { name: '上海钢铁集团', orders: 28, revenue: 1580000, growth: 25 },
    { name: '宁波化工公司', orders: 24, revenue: 1320000, growth: 18 },
    { name: '天津机械厂', orders: 22, revenue: 1150000, growth: 32 },
    { name: '青岛贸易集团', orders: 19, revenue: 980000, growth: 15 },
    { name: '大连物流', orders: 16, revenue: 850000, growth: -5 },
  ];

  const containerTypes = [
    { type: '20GP', count: 342, percentage: 38 },
    { type: '40GP', count: 285, percentage: 32 },
    { type: '40HQ', count: 198, percentage: 22 },
    { type: '其他', count: 75, percentage: 8 },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">数据分析看板</h1>
          <p className="text-gray-600 mt-1">深度分析业务数据和趋势</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="本周">本周</option>
          <option value="本月">本月</option>
          <option value="本季度">本季度</option>
          <option value="本年">本年</option>
        </select>
      </div>

      {/* 核心指标 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg">
          <div className="text-sm opacity-90 mb-2">总营收</div>
          <div className="text-3xl font-bold mb-1">¥{(revenueData.current / 10000).toFixed(1)}万</div>
          <div className="text-sm">
            <span className="text-green-300">↑ {revenueData.growth}%</span> vs 上月
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-6 shadow-lg">
          <div className="text-sm opacity-90 mb-2">总订单</div>
          <div className="text-3xl font-bold mb-1">516</div>
          <div className="text-sm">
            <span className="text-green-300">↑ 12.5%</span> vs 上月
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 shadow-lg">
          <div className="text-sm opacity-90 mb-2">总货柜</div>
          <div className="text-3xl font-bold mb-1">900</div>
          <div className="text-sm">
            <span className="text-green-300">↑ 8.3%</span> vs 上月
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-6 shadow-lg">
          <div className="text-sm opacity-90 mb-2">客户数</div>
          <div className="text-3xl font-bold mb-1">342</div>
          <div className="text-sm">
            <span className="text-green-300">↑ 15.2%</span> vs 上月
          </div>
        </div>
      </div>

      {/* 图表区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* 月度收入趋势 */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-4">月度收入趋势 (千元)</h3>
          <div className="h-64 flex items-end justify-between gap-1">
            {monthlyData.map((data, i) => {
              const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));
              const height = (data.revenue / maxRevenue) * 100;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="relative w-full">
                    <div
                      className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg transition-all hover:from-blue-700 hover:to-blue-500 cursor-pointer"
                      style={{ height: `${height * 2}px` }}
                      title={`${data.month}: ¥${data.revenue}k`}
                    ></div>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      ¥{data.revenue}k
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{data.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* 航线收入分布 */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-4">航线收入分布</h3>
          <div className="space-y-4">
            {routeStats.map((route, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{route.route}</span>
                  <div className="text-right">
                    <div className="text-sm font-bold">¥{(route.revenue / 10000).toFixed(1)}万</div>
                    <div className="text-xs text-gray-500">{route.orders}单</div>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div
                    className={`${route.color} h-3 rounded-full transition-all flex items-center justify-end pr-2`}
                    style={{ width: `${route.percentage}%` }}
                  >
                    <span className="text-xs text-white font-semibold">{route.percentage}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 下半部分 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* TOP客户 */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-4">TOP 5 客户排行</h3>
          <div className="space-y-3">
            {topCustomers.map((customer, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                    i === 0 ? 'bg-yellow-500' : i === 1 ? 'bg-gray-400' : i === 2 ? 'bg-orange-600' : 'bg-blue-500'
                  }`}>
                    {i + 1}
                  </div>
                  <div>
                    <div className="font-medium">{customer.name}</div>
                    <div className="text-xs text-gray-500">{customer.orders}单订单</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">¥{(customer.revenue / 10000).toFixed(1)}万</div>
                  <div className={`text-xs ${customer.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {customer.growth >= 0 ? '↑' : '↓'} {Math.abs(customer.growth)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 货柜类型分布 */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold mb-4">货柜类型分布</h3>
          <div className="flex items-center justify-center mb-6">
            <div className="relative w-48 h-48">
              {containerTypes.map((type, i) => {
                const colors = ['#3B82F6', '#10B981', '#F59E0B', '#6B7280'];
                const startAngle = containerTypes.slice(0, i).reduce((sum, t) => sum + (t.percentage * 3.6), 0);
                const endAngle = startAngle + (type.percentage * 3.6);
                
                return (
                  <div
                    key={i}
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `conic-gradient(${colors[i]} ${startAngle}deg ${endAngle}deg, transparent ${endAngle}deg)`,
                    }}
                  />
                );
              })}
              <div className="absolute inset-8 bg-white rounded-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold">900</div>
                  <div className="text-xs text-gray-500">总货柜</div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {containerTypes.map((type, i) => {
              const colors = ['bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-gray-500'];
              return (
                <div key={i} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${colors[i]}`}></div>
                  <span className="text-sm">{type.type}</span>
                  <span className="text-sm font-bold ml-auto">{type.count}</span>
                  <span className="text-xs text-gray-500">({type.percentage}%)</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 关键洞察 */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">💡</span>
            <span className="font-bold text-blue-900">业务洞察</span>
          </div>
          <p className="text-sm text-blue-800">东南亚航线持续增长,建议增加船期安排</p>
        </div>
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">📈</span>
            <span className="font-bold text-green-900">增长趋势</span>
          </div>
          <p className="text-sm text-green-800">本月营收增长18%,连续6个月保持增长</p>
        </div>
        <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">⚠️</span>
            <span className="font-bold text-orange-900">风险提示</span>
          </div>
          <p className="text-sm text-orange-800">大连物流订单下降5%,需要重点跟进</p>
        </div>
      </div>
    </div>
  );
}
