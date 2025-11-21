'use client';

import { useState, useEffect } from 'react';

export default function PoolPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchPoolData();
  }, []);

  const fetchPoolData = async () => {
    try {
      const response = await fetch('/api/dashboard/pool');
      const result = await response.json();
      setCustomers(result.customers || mockCustomers);
      setStats(result.stats || mockStats);
    } catch (error) {
      console.error('Failed to fetch pool data:', error);
      setCustomers(mockCustomers);
      setStats(mockStats);
    } finally {
      setLoading(false);
    }
  };

  const mockStats = {
    total: 342,
    active: 156,
    inactive: 98,
    vip: 88,
  };

  const mockCustomers = [
    {
      id: 1,
      company: '上海钢铁集团',
      contact: '张总',
      phone: '138****8888',
      email: 'zhang@example.com',
      category: 'VIP',
      industry: '钢铁贸易',
      lastOrder: '2025-11-15',
      totalOrders: 45,
      totalRevenue: '¥5.8M',
      status: '活跃',
      assignedTo: '李明',
    },
    {
      id: 2,
      company: '宁波化工有限公司',
      contact: '王经理',
      phone: '139****9999',
      email: 'wang@example.com',
      category: 'A类',
      industry: '化工',
      lastOrder: '2025-11-18',
      totalOrders: 32,
      totalRevenue: '¥3.2M',
      status: '活跃',
      assignedTo: '王芳',
    },
    {
      id: 3,
      company: '天津机械制造厂',
      contact: '刘主管',
      phone: '136****7777',
      email: 'liu@example.com',
      category: 'B类',
      industry: '机械制造',
      lastOrder: '2025-10-20',
      totalOrders: 18,
      totalRevenue: '¥1.5M',
      status: '沉睡',
      assignedTo: '李明',
    },
    {
      id: 4,
      company: '青岛物流公司',
      contact: '陈总',
      phone: '137****6666',
      email: 'chen@example.com',
      category: 'A类',
      industry: '物流',
      lastOrder: '2025-11-12',
      totalOrders: 28,
      totalRevenue: '¥2.8M',
      status: '活跃',
      assignedTo: '赵强',
    },
    {
      id: 5,
      company: '大连贸易企业',
      contact: '周经理',
      phone: '135****5555',
      email: 'zhou@example.com',
      category: 'B类',
      industry: '贸易',
      lastOrder: '2025-09-05',
      totalOrders: 12,
      totalRevenue: '¥980K',
      status: '流失',
      assignedTo: '王芳',
    },
  ];

  const filteredCustomers = filter === 'all' 
    ? customers 
    : customers.filter(c => c.status === filter);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-600">加载中...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">客户池子看板</h1>
          <p className="text-gray-600 mt-1">客户资源管理与维护</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
            导出数据
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            + 新增客户
          </button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">客户总数</span>
            <span className="text-2xl">👥</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
          <p className="text-sm text-gray-500 mt-1">全部客户</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition" onClick={() => setFilter('活跃')}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">活跃客户</span>
            <span className="text-2xl">✅</span>
          </div>
          <p className="text-3xl font-bold text-green-600">{stats.active}</p>
          <p className="text-sm text-green-600 mt-1">近30天有业务</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition" onClick={() => setFilter('沉睡')}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">沉睡客户</span>
            <span className="text-2xl">😴</span>
          </div>
          <p className="text-3xl font-bold text-yellow-600">{stats.inactive}</p>
          <p className="text-sm text-yellow-600 mt-1">需要激活</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">VIP客户</span>
            <span className="text-2xl">👑</span>
          </div>
          <p className="text-3xl font-bold text-purple-600">{stats.vip}</p>
          <p className="text-sm text-purple-600 mt-1">重点维护</p>
        </div>
      </div>

      {/* 客户分类统计 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">客户分类分布</h3>
          <div className="space-y-4">
            {[
              { category: 'VIP客户', count: 88, percentage: 26, color: 'bg-purple-600' },
              { category: 'A类客户', count: 125, percentage: 37, color: 'bg-blue-600' },
              { category: 'B类客户', count: 89, percentage: 26, color: 'bg-green-600' },
              { category: 'C类客户', count: 40, percentage: 11, color: 'bg-gray-600' },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{item.category}</span>
                  <span className="text-sm font-semibold text-gray-900">{item.count} ({item.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`${item.color} h-2 rounded-full transition-all`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">行业分布</h3>
          <div className="space-y-3">
            {[
              { industry: '钢铁贸易', count: 92, color: 'bg-blue-500' },
              { industry: '化工', count: 78, color: 'bg-green-500' },
              { industry: '机械制造', count: 65, color: 'bg-purple-500' },
              { industry: '物流运输', count: 58, color: 'bg-orange-500' },
              { industry: '其他', count: 49, color: 'bg-gray-500' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`${item.color} w-3 h-3 rounded-full`}></div>
                <span className="flex-1 text-sm text-gray-700">{item.industry}</span>
                <span className="text-sm font-semibold text-gray-900">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 筛选栏 */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">状态:</span>
            <div className="flex gap-2">
              {['全部', '活跃', '沉睡', '流失'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status === '全部' ? 'all' : status)}
                  className={`px-3 py-1 text-sm rounded-lg transition ${
                    filter === (status === '全部' ? 'all' : status)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="搜索客户名称、联系人..."
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* 客户列表 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">公司名称</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">联系人</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">分类</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">行业</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">最近订单</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">订单数</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">总营收</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">状态</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">负责人</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-semibold text-gray-900">{customer.company}</div>
                    <div className="text-xs text-gray-500">{customer.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.contact}</div>
                    <div className="text-xs text-gray-500">{customer.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      customer.category === 'VIP' ? 'bg-purple-100 text-purple-700' :
                      customer.category === 'A类' ? 'bg-blue-100 text-blue-700' :
                      customer.category === 'B类' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {customer.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{customer.industry}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{customer.lastOrder}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{customer.totalOrders}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{customer.totalRevenue}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      customer.status === '活跃' ? 'bg-green-100 text-green-700' :
                      customer.status === '沉睡' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{customer.assignedTo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                      查看
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
