 'use client';

import { useState } from 'react';

type StatusMessage = {
  type: 'success' | 'error';
  text: string;
};

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatusMessage(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data?.error || '提交失败，请稍后重试');
      }

      setStatusMessage({
        type: 'success',
        text: data?.message || '感谢您的咨询，我们会尽快与您联系！'
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: ''
      });
    } catch (error: any) {
      setStatusMessage({
        type: 'error',
        text: error?.message || '提交失败，请稍后重试'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">联系我们</h2>
        <p className="text-gray-600 text-lg text-center mb-16 max-w-3xl mx-auto">
          天津总部客服团队随时待命，为您提供专属的国际物流咨询与定制方案
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">快速咨询</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">姓名 *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                      placeholder="请输入您的姓名"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">邮箱</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                      placeholder="请输入您的邮箱"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">电话 *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                      placeholder="请输入您的电话"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">公司名称</label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                      placeholder="请输入您的公司名称"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">咨询主题 *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                  >
                    <option value="">请选择咨询主题</option>
                    <option value="shipping">散杂货咨询</option>
                    <option value="airfreight">集装箱咨询</option>
                    <option value="landtransport">滚装船咨询</option>
                    <option value="customs">大宗散运咨询</option>
                    <option value="hazmat">港口地面咨询</option>
                    <option value="other">其他咨询</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">咨询内容 *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                    placeholder="请详细描述您的物流需求"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition"
                >
                  {isSubmitting ? '提交中...' : '提交咨询'}
                </button>

                {statusMessage && (
                  <p
                    className={`text-sm text-center ${
                      statusMessage.type === 'success' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {statusMessage.text}
                  </p>
                )}
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-8 rounded-2xl h-full flex flex-col">
              <div className="mb-6">
                <p className="text-blue-100 text-sm tracking-wide uppercase">天津总部客服</p>
                <h3 className="text-2xl font-bold mt-2">专属对接团队</h3>
                <p className="text-blue-100 mt-2 text-sm">为您服务</p>
              </div>

              <div className="space-y-5 flex-1">
                <div className="flex items-start gap-4">
                  <span className="text-2xl">📞</span>
                  <div>
                    <p className="text-blue-100 text-sm mb-1">客服电话</p>
                    <p className="text-white text-xl font-semibold">15900736092</p>
                    <p className="text-blue-100 text-xs">周一至周五 08:30-17:30</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-2xl">✉️</span>
                  <div>
                    <p className="text-blue-100 text-sm mb-1">商务邮箱</p>
                    <p className="text-white font-semibold break-all">chartering@yewstar.com.cn</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="text-blue-100 text-sm mb-1">办公地址</p>
                    <p className="text-white font-semibold">
                      天津市河西区合肥道11号
                      <br />富力中心A座1807室
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-2xl">🤝</span>
                  <div>
                    <p className="text-blue-100 text-sm mb-1">服务范围</p>
                    <p className="text-white">定制物流方案 / 船期咨询 / 运价咨询</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/20 text-sm text-blue-100">
                欢迎预约现场拜访或视频会议，我们将根据您的业务需求提供最优解决方案。
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </section>
  );
}
