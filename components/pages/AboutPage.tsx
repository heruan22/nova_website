'use client';

import { useState } from 'react';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('vision');

  const features = [
    {
      icon: '🌍',
      title: '全球布局',
      description: '服务网络遍布六大洲，150+个国家和地区',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '🚀',
      title: '科技驱动',
      description: 'AI智能调度系统，实时货物追踪',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '🏆',
      title: '行业领先',
      description: '20+年行业经验，服务10000+企业客户',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: '💼',
      title: '专业团队',
      description: '500+资深物流专家，7x24小时在线服务',
      color: 'from-green-500 to-teal-500'
    }
  ];

  const tabs = [
    {
      id: 'vision',
      label: '企业愿景',
      icon: '🎯',
      content: {
        title: '成为全球最值得信赖的物流服务商',
        description: '我们致力于通过创新的物流解决方案，为全球客户创造价值。以客户需求为导向，以科技创新为驱动，构建高效、安全、可持续的全球物流网络。',
        highlights: [
          '打造智慧物流生态系统',
          '引领行业数字化转型',
          '实现绿色可持续发展'
        ]
      }
    },
    {
      id: 'mission',
      label: '核心使命',
      icon: '⚡',
      content: {
        title: '连接世界，畅通无阻',
        description: '通过整合全球优质物流资源，为客户提供端到端的供应链解决方案。我们不仅是货物的运输者，更是企业全球化发展的战略合作伙伴。',
        highlights: [
          '提供一站式物流服务',
          '优化供应链成本',
          '提升客户竞争优势'
        ]
      }
    },
    {
      id: 'values',
      label: '核心价值观',
      icon: '💎',
      content: {
        title: '诚信、专业、创新、共赢',
        description: '诚信是我们的立身之本，专业是我们的服务标准，创新是我们的发展动力，共赢是我们的合作理念。与客户、合作伙伴共同成长，创造更大价值。',
        highlights: [
          '客户至上，信誉第一',
          '精益求精，追求卓越',
          '开放合作，互利共赢'
        ]
      }
    }
  ];

  const currentTab = tabs.find(tab => tab.id === activeTab);

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 标题区域 */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            关于华顺船务
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            专注国际物流18年，为全球客户提供专业、高效、可靠的一站式物流解决方案
          </p>
        </div>

        {/* 核心特色卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
              <div className="relative">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tab切换区域 */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Tab导航 */}
          <div className="flex border-b border-gray-200 bg-gray-50">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-4 text-center font-semibold transition-all duration-300 relative ${
                  activeTab === tab.id
                    ? 'text-blue-600 bg-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span className="text-2xl mr-2">{tab.icon}</span>
                <span className="text-lg">{tab.label}</span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-cyan-600"></div>
                )}
              </button>
            ))}
          </div>

          {/* Tab内容 */}
          <div className="p-8 md:p-12">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                {currentTab?.content.title}
              </h3>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {currentTab?.content.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentTab?.content.highlights.map((highlight, index) => (
                  <div 
                    key={index}
                    className="flex items-start space-x-3 bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                    </div>
                    <p className="text-gray-700 font-medium">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
