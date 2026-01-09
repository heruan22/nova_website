'use client';

import { useState, useEffect } from 'react';

interface Quotation {
  id?: number;
  route_name: string;
  pol: string;
  pod: string;
  freight_20gp: string;
  freight_40gp: string;
  freight_40hq: string;
  shipping_line: string;
  transit_time: string;
  validity_start: string;
  validity_end: string;
  remarks: string;
  status: string;
}

export default function QuotationsPage() {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Quotation>({
    route_name: '',
    pol: '',
    pod: '',
    freight_20gp: '',
    freight_40gp: '',
    freight_40hq: '',
    shipping_line: '',
    transit_time: '',
    validity_start: '',
    validity_end: '',
    remarks: '',
    status: '有效',
  });

  const fetchQuotations = async () => {
    try {
      const response = await fetch('/api/dashboard/quotations');
      const data = await response.json();
      if (data.success) {
        setQuotations(data.data);
      }
    } catch (error) {
      console.error('获取数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotations();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = '/api/dashboard/quotations';
      const method = editingId ? 'PUT' : 'POST';
      const body = editingId ? { ...formData, id: editingId } : formData;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (data.success) {
        fetchQuotations();
        resetForm();
        alert(editingId ? '更新成功' : '添加成功');
      }
    } catch (error) {
      console.error('操作失败:', error);
      alert('操作失败');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除这条报价吗?')) return;
    try {
      const response = await fetch(`/api/dashboard/quotations?id=${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        fetchQuotations();
        alert('删除成功');
      }
    } catch (error) {
      console.error('删除失败:', error);
      alert('删除失败');
    }
  };

  const startEdit = (quotation: Quotation) => {
    setEditingId(quotation.id!);
    setFormData(quotation);
    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      route_name: '', pol: '', pod: '', freight_20gp: '', freight_40gp: '', freight_40hq: '',
      shipping_line: '', transit_time: '', validity_start: '', validity_end: '', remarks: '', status: '有效',
    });
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen"><div className="text-xl">加载中...</div></div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">报价管理系统</h1>
          <p className="text-gray-600 mt-1">管理航线报价和运费信息</p>
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm);
            if (showForm) resetForm();
          }}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {showForm ? '取消' : '+ 添加报价'}
        </button>
      </div>

      {/* 表单 */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">{editingId ? '编辑报价' : '添加新报价'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">航线名称</label>
                <input type="text" value={formData.route_name} onChange={(e) => setFormData({...formData, route_name: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2" required placeholder="例如: 中国-东南亚" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">起运港 (POL)</label>
                <input type="text" value={formData.pol} onChange={(e) => setFormData({...formData, pol: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2" required placeholder="例如: TIANJIN" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">目的港 (POD)</label>
                <input type="text" value={formData.pod} onChange={(e) => setFormData({...formData, pod: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2" required placeholder="例如: JAKARTA" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">20GP运费 (USD)</label>
                <input type="text" value={formData.freight_20gp} onChange={(e) => setFormData({...formData, freight_20gp: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2" required placeholder="例如: 850" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">40GP运费 (USD)</label>
                <input type="text" value={formData.freight_40gp} onChange={(e) => setFormData({...formData, freight_40gp: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2" required placeholder="例如: 1200" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">40HQ运费 (USD)</label>
                <input type="text" value={formData.freight_40hq} onChange={(e) => setFormData({...formData, freight_40hq: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2" required placeholder="例如: 1250" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">船公司</label>
                <input type="text" value={formData.shipping_line} onChange={(e) => setFormData({...formData, shipping_line: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2" required placeholder="例如: COSCO" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">运输时间</label>
                <input type="text" value={formData.transit_time} onChange={(e) => setFormData({...formData, transit_time: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2" required placeholder="例如: 15天" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">状态</label>
                <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2" required>
                  <option value="有效">有效</option>
                  <option value="即将过期">即将过期</option>
                  <option value="已过期">已过期</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">有效期开始</label>
                <input type="date" value={formData.validity_start} onChange={(e) => setFormData({...formData, validity_start: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">有效期结束</label>
                <input type="date" value={formData.validity_end} onChange={(e) => setFormData({...formData, validity_end: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2" required />
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-medium mb-1">备注</label>
                <textarea value={formData.remarks} onChange={(e) => setFormData({...formData, remarks: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2" rows={2} placeholder="其他说明..." />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
                {editingId ? '保存修改' : '添加报价'}
              </button>
              {editingId && (
                <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition">
                  取消编辑
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* 报价表格 */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">航线</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">起运港</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">目的港</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">20GP</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">40GP</th>
                <th className="px-4 py-3 text-right text-sm font-semibold">40HQ</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">船公司</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">运输时间</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">有效期</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">状态</th>
                <th className="px-4 py-3 text-center text-sm font-semibold">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {quotations.length === 0 ? (
                <tr><td colSpan={11} className="px-4 py-8 text-center text-gray-500">暂无数据</td></tr>
              ) : (
                quotations.map((q) => (
                  <tr key={q.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium">{q.route_name}</td>
                    <td className="px-4 py-3 text-sm">{q.pol}</td>
                    <td className="px-4 py-3 text-sm">{q.pod}</td>
                    <td className="px-4 py-3 text-sm text-right font-semibold text-green-600">${q.freight_20gp}</td>
                    <td className="px-4 py-3 text-sm text-right font-semibold text-green-600">${q.freight_40gp}</td>
                    <td className="px-4 py-3 text-sm text-right font-semibold text-green-600">${q.freight_40hq}</td>
                    <td className="px-4 py-3 text-sm">{q.shipping_line}</td>
                    <td className="px-4 py-3 text-sm">{q.transit_time}</td>
                    <td className="px-4 py-3 text-sm text-xs">{q.validity_start} ~ {q.validity_end}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                        q.status === '有效' ? 'bg-green-100 text-green-800' :
                        q.status === '即将过期' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>{q.status}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => startEdit(q)} className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">编辑</button>
                        <button onClick={() => handleDelete(q.id!)} className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">删除</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <div className="text-sm text-gray-600">共 <span className="font-semibold text-gray-900">{quotations.length}</span> 条报价记录</div>
      </div>
    </div>
  );
}
