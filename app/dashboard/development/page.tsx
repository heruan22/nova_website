'use client';

import { useState, useEffect } from 'react';

export default function DevelopmentPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDevelopmentData();
  }, []);

  const fetchDevelopmentData = async () => {
    try {
      const response = await fetch('/api/dashboard/development');
      const result = await response.json();
      setLeads(result.leads || mockLeads);
      setStats(result.stats || mockStats);
    } catch (error) {
      console.error('Failed to fetch development data:', error);
      setLeads(mockLeads);
      setStats(mockStats);
    } finally {
      setLoading(false);
    }
  };

  const mockStats = {
    totalLeads: 156,
    newThisMonth: 28,
    converted: 42,
    conversionRate: 27,
  };

  const mockLeads = [
    {
      id: 1,
      company: '江苏钢铁集团',
      contact: '张经理',
      phone: '138****8888',
      source: '网站咨询',
      stage: '初次接触',
      potential: '高',
      assignedTo: '李明',
      createdAt: '2025-11-18',
    },
    {
      id: 2,
      company: '深圳科技有限公司',
      contact: '王总',
      phone: '139****9999',
      source: '展会',
      stage: '需求确认',
      potential: '中',
      assignedTo: '王芳',
      createdAt: '2025-11-17',
    },
    {
      id: 3,
      company: '上海贸易公司',
      contact: '刘主管',
      phone: '136****7777',
      source: '客户推荐',
      stage: '方案报价',
      potential: '高',
      assignedTo: '李明',
      createdAt: '2025-11-15',
    },
    {
      id: 4,
      company: '北京物流企业',
      contact: '陈经理',
      phone: '137****6666',
      source: '电话营销',
      stage: '商务谈判',
      potential: '高',
      assignedTo: '赵强',
      createdAt: '2025-11-12',
    },
    {
      id: 5,
      company: '广州化工集团',
      contact: '周总',
      phone: '135****5555',
      source: '网站咨询',
      stage: '初次接触',
      potential: '中',
      assignedTo: '王芳',
      createdAt: '2025-11-10',
    },
  ];

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
          <h1 className="text-2xl font-bold text-gray-900">客户开发看板</h1>
          <p className="text-gray-600 mt-1">销售线索与客户开发进度跟踪</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          + 新增线索
        </button>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">总线索数</span>
            <span className="text-2xl">📋</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.totalLeads}</p>
          <p className="text-sm text-gray-500 mt-1">累计客户线索</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">本月新增</span>
            <span className="text-2xl">🆕</span>
          </div>
          <p className="text-3xl font-bold text-blue-600">{stats.newThisMonth}</p>
          <p className="text-sm text-green-600 mt-1">+15% 环比上月</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">已转化</span>
            <span className="text-2xl">✅</span>
          </div>
          <p className="text-3xl font-bold text-green-600">{stats.converted}</p>
          <p className="text-sm text-gray-500 mt-1">成功签约客户</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">转化率</span>
            <span className="text-2xl">📈</span>
          </div>
          <p className="text-3xl font-bold text-purple-600">{stats.conversionRate}%</p>
          <p className="text-sm text-green-600 mt-1">+3% 环比上月</p>
        </div>
      </div>

      {/* 销售漏斗 */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-6">销售漏斗</h3>
        <div className="space-y-3">
          {[
            { stage: '初次接触', count: 68, percentage: 100 },
            { stage: '需求确认', count: 45, percentage: 66 },
            { stage: '方案报价', count: 32, percentage: 47 },
            { stage: '商务谈判', count: 18, percentage: 26 },
            { stage: '签约成功', count: 12, percentage: 18 },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-24 text-sm font-medium text-gray-700">{item.stage}</div>
              <div className="flex-1">
                <div className="bg-gray-100 rounded-full h-8 relative overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-8 rounded-full flex items-center justify-end px-3 transition-all"
                    style={{ width: `${item.percentage}%` }}
                  >
                    <span className="text-white text-sm font-semibold">{item.count}</span>
                  </div>
                </div>
              </div>
              <div className="w-16 text-sm text-gray-500 text-right">{item.percentage}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* 线索列表 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">最新线索</h3>
          <div className="flex gap-2">
            <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm">
              <option>全部阶段</option>
              <option>初次接触</option>
              <option>需求确认</option>
              <option>方案报价</option>
              <option>商务谈判</option>
            </select>
            <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm">
              <option>全部潜力</option>
              <option>高</option>
              <option>中</option>
              <option>低</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">公司名称</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">联系人</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">电话</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">来源</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">阶段</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">潜力</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">负责人</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">创建时间</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-semibold text-gray-900">{lead.company}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{lead.contact}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{lead.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{lead.source}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                      {lead.stage}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      lead.potential === '高' ? 'bg-red-100 text-red-700' :
                      lead.potential === '中' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {lead.potential}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{lead.assignedTo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.createdAt}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                      编辑
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
