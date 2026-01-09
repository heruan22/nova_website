'use client';

import { useState, useEffect } from 'react';

interface Container {
  id?: number;
  container_no: string;
  booking_no: string;
  customer_name: string;
  vessel: string;
  voyage: string;
  pol: string;
  pod: string;
  etd: string;
  eta: string;
  status: string;
  current_location: string;
  cargo_description: string;
  weight: string;
  last_update: string;
}

const statusColors: { [key: string]: string } = {
  '已提箱': 'bg-blue-100 text-blue-800',
  '运输中': 'bg-yellow-100 text-yellow-800',
  '已到港': 'bg-green-100 text-green-800',
  '清关中': 'bg-purple-100 text-purple-800',
  '已提货': 'bg-gray-100 text-gray-800',
};

export default function ContainerTrackingPage() {
  const [containers, setContainers] = useState<Container[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedContainer, setSelectedContainer] = useState<Container | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const fetchContainers = async () => {
    try {
      let url = '/api/dashboard/container-tracking';
      if (searchTerm) {
        url += `?container_no=${searchTerm}`;
      } else if (statusFilter) {
        url += `?status=${statusFilter}`;
      }
      
      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        setContainers(data.data);
      }
    } catch (error) {
      console.error('获取数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContainers();
  }, [searchTerm, statusFilter]);

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedContainer) return;

    try {
      const response = await fetch('/api/dashboard/container-tracking', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedContainer),
      });
      const data = await response.json();
      if (data.success) {
        fetchContainers();
        setShowUpdateModal(false);
        setSelectedContainer(null);
        alert('更新成功');
      }
    } catch (error) {
      console.error('更新失败:', error);
      alert('更新失败');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">加载中...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">货柜追踪系统</h1>
          <p className="text-gray-600 mt-1">实时追踪货柜位置和状态</p>
        </div>
      </div>

      {/* 搜索和筛选 */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">搜索货柜号</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="输入货柜号..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">状态筛选</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">全部状态</option>
              <option value="已提箱">已提箱</option>
              <option value="运输中">运输中</option>
              <option value="已到港">已到港</option>
              <option value="清关中">清关中</option>
              <option value="已提货">已提货</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('');
              }}
              className="w-full bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
            >
              重置筛选
            </button>
          </div>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {['已提箱', '运输中', '已到港', '清关中', '已提货'].map((status) => {
          const count = containers.filter(c => c.status === status).length;
          return (
            <div key={status} className="bg-white rounded-lg p-4 shadow-sm text-center">
              <div className="text-2xl font-bold text-gray-900">{count}</div>
              <div className="text-sm text-gray-600 mt-1">{status}</div>
            </div>
          );
        })}
      </div>

      {/* 货柜列表 */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">货柜号</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">订舱号</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">客户</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">船名/航次</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">航线</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">状态</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">当前位置</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">预计到达</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {containers.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-gray-500">
                    暂无数据
                  </td>
                </tr>
              ) : (
                containers.map((container) => (
                  <tr key={container.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-sm font-bold text-blue-600">{container.container_no}</td>
                    <td className="px-4 py-3 text-sm">{container.booking_no}</td>
                    <td className="px-4 py-3 text-sm">{container.customer_name}</td>
                    <td className="px-4 py-3 text-sm">
                      {container.vessel}<br/>
                      <span className="text-xs text-gray-500">{container.voyage}</span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {container.pol} → {container.pod}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${statusColors[container.status] || 'bg-gray-100 text-gray-800'}`}>
                        {container.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">{container.current_location}</td>
                    <td className="px-4 py-3 text-sm">{container.eta}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => {
                          setSelectedContainer(container);
                          setShowUpdateModal(true);
                        }}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition"
                      >
                        更新
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 更新状态模态框 */}
      {showUpdateModal && selectedContainer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">更新货柜状态</h2>
            <form onSubmit={handleUpdateStatus}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">货柜号</label>
                  <input
                    type="text"
                    value={selectedContainer.container_no}
                    disabled
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">状态</label>
                  <select
                    value={selectedContainer.status}
                    onChange={(e) => setSelectedContainer({...selectedContainer, status: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="已提箱">已提箱</option>
                    <option value="运输中">运输中</option>
                    <option value="已到港">已到港</option>
                    <option value="清关中">清关中</option>
                    <option value="已提货">已提货</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">当前位置</label>
                  <input
                    type="text"
                    value={selectedContainer.current_location}
                    onChange={(e) => setSelectedContainer({...selectedContainer, current_location: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">预计到达</label>
                  <input
                    type="text"
                    value={selectedContainer.eta}
                    onChange={(e) => setSelectedContainer({...selectedContainer, eta: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  保存更新
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowUpdateModal(false);
                    setSelectedContainer(null);
                  }}
                  className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                >
                  取消
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 统计信息 */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <div className="text-sm text-gray-600">
          共 <span className="font-semibold text-gray-900">{containers.length}</span> 个货柜在追踪中
        </div>
      </div>
    </div>
  );
}
