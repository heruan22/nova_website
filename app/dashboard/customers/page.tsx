'use client';

import { useState, useEffect } from 'react';

interface Customer {
  id?: number;
  company_name: string;
  contact_person: string;
  phone: string;
  email: string;
  address: string;
  customer_type: string;
  industry: string;
  credit_level: string;
  status: string;
  last_contact_date: string;
  next_followup_date: string;
  notes: string;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [formData, setFormData] = useState<Customer>({
    company_name: '', contact_person: '', phone: '', email: '', address: '',
    customer_type: '潜在客户', industry: '', credit_level: 'B', status: '活跃',
    last_contact_date: '', next_followup_date: '', notes: '',
  });

  const fetchCustomers = async () => {
    try {
      let url = '/api/dashboard/customers';
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (statusFilter) params.append('status', statusFilter);
      if (params.toString()) url += `?${params.toString()}`;

      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        setCustomers(data.data);
      }
    } catch (error) {
      console.error('获取数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [searchTerm, statusFilter]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = '/api/dashboard/customers';
      const method = editingId ? 'PUT' : 'POST';
      const body = editingId ? { ...formData, id: editingId } : formData;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (data.success) {
        fetchCustomers();
        resetForm();
        alert(editingId ? '更新成功' : '添加成功');
      }
    } catch (error) {
      console.error('操作失败:', error);
      alert('操作失败');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除这个客户吗?')) return;
    try {
      const response = await fetch(`/api/dashboard/customers?id=${id}`, { method: 'DELETE' });
      const data = await response.json();
      if (data.success) {
        fetchCustomers();
        alert('删除成功');
      }
    } catch (error) {
      console.error('删除失败:', error);
      alert('删除失败');
    }
  };

  const startEdit = (customer: Customer) => {
    setEditingId(customer.id!);
    setFormData(customer);
    setShowForm(true);
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      company_name: '', contact_person: '', phone: '', email: '', address: '',
      customer_type: '潜在客户', industry: '', credit_level: 'B', status: '活跃',
      last_contact_date: '', next_followup_date: '', notes: '',
    });
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen"><div className="text-xl">加载中...</div></div>;
  }

  const stats = [
    { label: '总客户数', value: customers.length, color: 'bg-blue-500' },
    { label: '活跃客户', value: customers.filter(c => c.status === '活跃').length, color: 'bg-green-500' },
    { label: '重点客户', value: customers.filter(c => c.customer_type === '重点客户').length, color: 'bg-purple-500' },
    { label: '待跟进', value: customers.filter(c => c.next_followup_date).length, color: 'bg-orange-500' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">客户管理系统</h1>
          <p className="text-gray-600 mt-1">管理客户信息和跟进记录</p>
        </div>
        <button onClick={() => { setShowForm(!showForm); if (showForm) resetForm(); }}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          {showForm ? '取消' : '+ 添加客户'}
        </button>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, idx) => (
          <div key={idx} className={`${stat.color} text-white rounded-lg p-6 shadow-lg`}>
            <div className="text-3xl font-bold">{stat.value}</div>
            <div className="text-sm mt-1 opacity-90">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* 搜索筛选 */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="搜索公司名或联系人..." />
          </div>
          <div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2">
              <option value="">全部状态</option>
              <option value="活跃">活跃</option>
              <option value="暂停">暂停</option>
              <option value="流失">流失</option>
            </select>
          </div>
          <button onClick={() => { setSearchTerm(''); setStatusFilter(''); }}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">重置</button>
        </div>
      </div>

      {/* 表单 */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">{editingId ? '编辑客户' : '添加新客户'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">公司名称 *</label>
                <input type="text" value={formData.company_name} onChange={(e) => setFormData({...formData, company_name: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">联系人 *</label>
                <input type="text" value={formData.contact_person} onChange={(e) => setFormData({...formData, contact_person: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">电话 *</label>
                <input type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">邮箱</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">地址</label>
                <input type="text" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">客户类型</label>
                <select value={formData.customer_type} onChange={(e) => setFormData({...formData, customer_type: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option value="潜在客户">潜在客户</option>
                  <option value="普通客户">普通客户</option>
                  <option value="重点客户">重点客户</option>
                  <option value="VIP客户">VIP客户</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">行业</label>
                <input type="text" value={formData.industry} onChange={(e) => setFormData({...formData, industry: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2" placeholder="例如: 制造业" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">信用等级</label>
                <select value={formData.credit_level} onChange={(e) => setFormData({...formData, credit_level: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option value="A">A级(优秀)</option>
                  <option value="B">B级(良好)</option>
                  <option value="C">C级(一般)</option>
                  <option value="D">D级(较差)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">状态</label>
                <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option value="活跃">活跃</option>
                  <option value="暂停">暂停</option>
                  <option value="流失">流失</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">最后联系日期</label>
                <input type="date" value={formData.last_contact_date} onChange={(e) => setFormData({...formData, last_contact_date: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">下次跟进日期</label>
                <input type="date" value={formData.next_followup_date} onChange={(e) => setFormData({...formData, next_followup_date: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">备注</label>
                <textarea value={formData.notes} onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2" rows={3} />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
                {editingId ? '保存修改' : '添加客户'}
              </button>
              {editingId && (
                <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600">取消</button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* 客户列表 */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">公司名称</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">联系人</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">电话</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">邮箱</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">类型</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">信用</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">状态</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">下次跟进</th>
                <th className="px-4 py-3 text-center text-sm font-semibold">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {customers.length === 0 ? (
                <tr><td colSpan={9} className="px-4 py-8 text-center text-gray-500">暂无客户数据</td></tr>
              ) : (
                customers.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm font-medium">{c.company_name}</td>
                    <td className="px-4 py-3 text-sm">{c.contact_person}</td>
                    <td className="px-4 py-3 text-sm">{c.phone}</td>
                    <td className="px-4 py-3 text-sm text-blue-600">{c.email}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                        c.customer_type === 'VIP客户' ? 'bg-purple-100 text-purple-800' :
                        c.customer_type === '重点客户' ? 'bg-blue-100 text-blue-800' :
                        c.customer_type === '普通客户' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>{c.customer_type}</span>
                    </td>
                    <td className="px-4 py-3 text-sm font-bold">{c.credit_level}级</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                        c.status === '活跃' ? 'bg-green-100 text-green-800' :
                        c.status === '暂停' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>{c.status}</span>
                    </td>
                    <td className="px-4 py-3 text-sm">{c.next_followup_date || '-'}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => startEdit(c)} className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">编辑</button>
                        <button onClick={() => handleDelete(c.id!)} className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">删除</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
