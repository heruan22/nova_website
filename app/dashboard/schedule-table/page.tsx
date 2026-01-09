'use client';

import { useState, useEffect } from 'react';

interface Schedule {
  id?: number;
  vessel: string;
  eta: string;
  pol: string;
  pod: string;
  route: string;
}

const routeColors: { [key: string]: string } = {
  '东阿亚': 'bg-purple-100 text-purple-800',
  '印度': 'bg-yellow-100 text-yellow-800',
  '中东': 'bg-red-100 text-red-800',
  '非洲': 'bg-green-100 text-green-800',
  '南美': 'bg-orange-100 text-orange-800',
};

export default function ScheduleTablePage() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Schedule>({
    vessel: '',
    eta: '',
    pol: '',
    pod: '',
    route: '',
  });
  const [showAddForm, setShowAddForm] = useState(false);

  // 获取船期数据
  const fetchSchedules = async () => {
    try {
      const response = await fetch('/api/dashboard/schedule-table');
      const data = await response.json();
      if (data.success) {
        setSchedules(data.data);
      }
    } catch (error) {
      console.error('获取数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  // 处理添加
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/dashboard/schedule-table', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        fetchSchedules();
        setFormData({ vessel: '', eta: '', pol: '', pod: '', route: '' });
        setShowAddForm(false);
        alert('添加成功');
      }
    } catch (error) {
      console.error('添加失败:', error);
      alert('添加失败');
    }
  };

  // 处理更新
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/dashboard/schedule-table', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, id: editingId }),
      });
      const data = await response.json();
      if (data.success) {
        fetchSchedules();
        setEditingId(null);
        setFormData({ vessel: '', eta: '', pol: '', pod: '', route: '' });
        alert('更新成功');
      }
    } catch (error) {
      console.error('更新失败:', error);
      alert('更新失败');
    }
  };

  // 处理删除
  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除这条记录吗?')) return;
    try {
      const response = await fetch(`/api/dashboard/schedule-table?id=${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        fetchSchedules();
        alert('删除成功');
      }
    } catch (error) {
      console.error('删除失败:', error);
      alert('删除失败');
    }
  };

  // 开始编辑
  const startEdit = (schedule: Schedule) => {
    setEditingId(schedule.id!);
    setFormData(schedule);
    setShowAddForm(false);
  };

  // 取消编辑
  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ vessel: '', eta: '', pol: '', pod: '', route: '' });
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
        <h1 className="text-3xl font-bold">船期表管理</h1>
        <button
          onClick={() => {
            setShowAddForm(!showAddForm);
            setEditingId(null);
            setFormData({ vessel: '', eta: '', pol: '', pod: '', route: '' });
          }}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {showAddForm ? '取消添加' : '+ 添加新船期'}
        </button>
      </div>

      {/* 添加/编辑表单 */}
      {(showAddForm || editingId !== null) && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingId !== null ? '编辑船期' : '添加新船期'}
          </h2>
          <form onSubmit={editingId !== null ? handleUpdate : handleAdd}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">船名 (VESSEL)</label>
                <input
                  type="text"
                  value={formData.vessel}
                  onChange={(e) => setFormData({ ...formData, vessel: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="例如: STRADION"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">预计到达 (ETA)</label>
                <input
                  type="text"
                  value={formData.eta}
                  onChange={(e) => setFormData({ ...formData, eta: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="例如: 01-06"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">装货港 (POL)</label>
                <input
                  type="text"
                  value={formData.pol}
                  onChange={(e) => setFormData({ ...formData, pol: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="例如: TIANJIN"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">卸货港 (POD)</label>
                <input
                  type="text"
                  value={formData.pod}
                  onChange={(e) => setFormData({ ...formData, pod: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  placeholder="例如: JAKARTA, MUMBAI"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">航线 (ROUTE)</label>
                <select
                  value={formData.route}
                  onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">选择航线</option>
                  <option value="东阿亚">东阿亚</option>
                  <option value="印度">印度</option>
                  <option value="中东">中东</option>
                  <option value="非洲">非洲</option>
                  <option value="南美">南美</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                type="submit"
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
              >
                {editingId !== null ? '保存修改' : '添加'}
              </button>
              {editingId !== null && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
                >
                  取消
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* 数据表格 */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">#</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">VESSEL</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">ETA</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">POL</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">POD</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">ROUTE</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {schedules.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                    暂无数据,请添加船期记录
                  </td>
                </tr>
              ) : (
                schedules.map((schedule, index) => (
                  <tr key={schedule.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-sm">{index + 1}</td>
                    <td className="px-4 py-3 text-sm font-medium">{schedule.vessel}</td>
                    <td className="px-4 py-3 text-sm">{schedule.eta}</td>
                    <td className="px-4 py-3">
                      <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                        {schedule.pol}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {schedule.pod.split(/[,\s]+/).filter(p => p).map((port, i) => (
                          <span
                            key={i}
                            className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                          >
                            {port}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-3 py-1 rounded text-sm ${
                          routeColors[schedule.route] || 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {schedule.route}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => startEdit(schedule)}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm transition"
                        >
                          编辑
                        </button>
                        <button
                          onClick={() => handleDelete(schedule.id!)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm transition"
                        >
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 统计信息 */}
      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <div className="text-sm text-gray-600">
          共 <span className="font-semibold text-gray-900">{schedules.length}</span> 条船期记录
        </div>
      </div>
    </div>
  );
}
