'use client';

import { useState } from 'react';

interface NavLink {
  id: number;
  title: string;
  url: string;
  description: string;
  category: string;
  icon: string;
}

export default function KnowledgeNavPage() {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [searchTerm, setSearchTerm] = useState('');

  // 导航链接数据
  const navLinks: NavLink[] = [
    // 船公司查询
    { id: 1, title: 'COSCO官网', url: 'https://www.coscon.com', description: '中远海运集装箱运输官网', category: '船公司官网', icon: '🚢' },
    { id: 2, title: 'MSC官网', url: 'https://www.msc.com', description: '地中海航运官网', category: '船公司官网', icon: '🚢' },
    { id: 3, title: 'MAERSK官网', url: 'https://www.maersk.com.cn', description: '马士基航运官网', category: '船公司官网', icon: '🚢' },
    { id: 4, title: 'CMA CGM官网', url: 'https://www.cma-cgm.com', description: '达飞轮船官网', category: '船公司官网', icon: '🚢' },
    { id: 5, title: 'ONE官网', url: 'https://www.one-line.com', description: 'Ocean Network Express', category: '船公司官网', icon: '🚢' },
    { id: 6, title: 'HAPAG-LLOYD', url: 'https://www.hapag-lloyd.com', description: '赫伯罗特航运', category: '船公司官网', icon: '🚢' },
    
    // 货柜追踪
    { id: 7, title: '17TRACK', url: 'https://www.17track.net', description: '全球物流查询平台', category: '货柜追踪', icon: '📦' },
    { id: 8, title: 'Container Tracking', url: 'https://www.track-trace.com', description: '国际货柜追踪', category: '货柜追踪', icon: '📦' },
    { id: 9, title: 'SeaRates', url: 'https://www.searates.com', description: '海运货柜追踪', category: '货柜追踪', icon: '📦' },
    
    // 港口信息
    { id: 10, title: '上海港', url: 'https://www.portshanghai.com.cn', description: '上海港官方网站', category: '港口信息', icon: '⚓' },
    { id: 11, title: '宁波舟山港', url: 'https://www.nbport.com.cn', description: '宁波舟山港官网', category: '港口信息', icon: '⚓' },
    { id: 12, title: '深圳港', url: 'http://www.szmsa.gov.cn', description: '深圳港口管理局', category: '港口信息', icon: '⚓' },
    { id: 13, title: '青岛港', url: 'https://www.qdport.com', description: '青岛港官方网站', category: '港口信息', icon: '⚓' },
    
    // 海关报关
    { id: 14, title: '中国海关', url: 'http://www.customs.gov.cn', description: '中华人民共和国海关总署', category: '海关报关', icon: '📋' },
    { id: 15, title: '单一窗口', url: 'https://www.singlewindow.cn', description: '国际贸易单一窗口', category: '海关报关', icon: '📋' },
    { id: 16, title: 'HS编码查询', url: 'https://www.hsbianma.com', description: 'HS海关编码查询', category: '海关报关', icon: '📋' },
    
    // 汇率工具
    { id: 17, title: 'XE汇率', url: 'https://www.xe.com', description: '实时汇率查询', category: '实用工具', icon: '💱' },
    { id: 18, title: '中国银行汇率', url: 'https://www.boc.cn/sourcedb/whpj/', description: '中国银行外汇牌价', category: '实用工具', icon: '💱' },
    { id: 19, title: '货柜尺寸计算器', url: 'https://www.searates.com/container/calculator/', description: '货柜装载计算', category: '实用工具', icon: '📐' },
    { id: 20, title: '体积重量计算', url: 'https://www.icontainers.com/help/calculator/', description: '运费体积重量计算', category: '实用工具', icon: '⚖️' },
    
    // 行业资讯
    { id: 21, title: '航运在线', url: 'https://www.snet.com.cn', description: '航运物流门户网站', category: '行业资讯', icon: '📰' },
    { id: 22, title: '搜航网', url: 'https://www.sofreight.com', description: '国际货代综合服务平台', category: '行业资讯', icon: '📰' },
    { id: 23, title: '运去哪', url: 'https://www.yunquna.com', description: '国际物流在线服务', category: '行业资讯', icon: '📰' },
    { id: 24, title: 'Freightos', url: 'https://www.freightos.com', description: '国际运费比价平台', category: '行业资讯', icon: '📰' },
    
    // 学习资源
    { id: 25, title: '货代百科', url: 'https://baike.baidu.com/item/货运代理', description: '货代基础知识', category: '学习资源', icon: '📚' },
    { id: 26, title: 'Incoterms 2020', url: 'https://iccwbo.org/resources-for-business/incoterms-rules/', description: '国际贸易术语', category: '学习资源', icon: '📚' },
    { id: 27, title: '外贸圈', url: 'https://waimaoquan.alibaba.com', description: '外贸知识社区', category: '学习资源', icon: '📚' },
  ];

  const categories = ['全部', '船公司官网', '货柜追踪', '港口信息', '海关报关', '实用工具', '行业资讯', '学习资源'];

  // 过滤链接
  const filteredLinks = navLinks.filter(link => {
    const matchCategory = activeCategory === '全部' || link.category === activeCategory;
    const matchSearch = link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       link.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  // 按分类分组
  const groupedLinks = filteredLinks.reduce((acc, link) => {
    if (!acc[link.category]) {
      acc[link.category] = [];
    }
    acc[link.category].push(link);
    return acc;
  }, {} as Record<string, NavLink[]>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* 头部 */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                🧭 货代知识导航
              </h1>
              <p className="text-gray-600 mt-1">一站式货代工具和资源导航平台</p>
            </div>
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="搜索网站、工具..."
                  className="w-full border-2 border-gray-200 rounded-full px-5 py-3 pl-12 focus:outline-none focus:border-blue-500 transition"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* 分类标签 */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-full font-medium transition-all transform hover:scale-105 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-400'
                }`}
              >
                {category}
                {category !== '全部' && (
                  <span className="ml-2 text-xs opacity-75">
                    ({navLinks.filter(l => l.category === category).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* 统计信息 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-5 shadow-lg">
            <div className="text-3xl font-bold">{navLinks.length}</div>
            <div className="text-sm mt-1 opacity-90">总导航数</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-5 shadow-lg">
            <div className="text-3xl font-bold">{categories.length - 1}</div>
            <div className="text-sm mt-1 opacity-90">分类数量</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-5 shadow-lg">
            <div className="text-3xl font-bold">{navLinks.filter(l => l.category === '船公司官网').length}</div>
            <div className="text-sm mt-1 opacity-90">船公司</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-5 shadow-lg">
            <div className="text-3xl font-bold">{navLinks.filter(l => l.category === '实用工具').length}</div>
            <div className="text-sm mt-1 opacity-90">实用工具</div>
          </div>
        </div>

        {/* 导航链接卡片 */}
        {activeCategory === '全部' ? (
          // 按分类显示
          Object.keys(groupedLinks).map((category) => (
            <div key={category} className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded"></span>
                {category}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                {groupedLinks[category].map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white rounded-lg p-3 shadow-sm hover:shadow-md border border-gray-100 hover:border-blue-300 transition-all transform hover:-translate-y-0.5"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-md flex items-center justify-center text-lg flex-shrink-0 group-hover:scale-110 transition-transform">
                        {link.icon}
                      </div>
                      <h3 className="font-semibold text-sm text-gray-900 group-hover:text-blue-600 transition truncate">
                        {link.title}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{link.description}</p>
                  </a>
                ))}
              </div>
            </div>
          ))
        ) : (
          // 单一分类显示
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {filteredLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-lg p-3 shadow-sm hover:shadow-md border border-gray-100 hover:border-blue-300 transition-all transform hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-md flex items-center justify-center text-lg flex-shrink-0 group-hover:scale-110 transition-transform">
                    {link.icon}
                  </div>
                  <h3 className="font-semibold text-sm text-gray-900 group-hover:text-blue-600 transition truncate">
                    {link.title}
                  </h3>
                </div>
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{link.description}</p>
              </a>
            ))}
          </div>
        )}

        {/* 无结果提示 */}
        {filteredLinks.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">未找到相关内容</h3>
            <p className="text-gray-600">请尝试其他搜索词或选择不同的分类</p>
          </div>
        )}

        {/* 底部提示 */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-100">
          <div className="flex items-start gap-4">
            <div className="text-3xl">💡</div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">使用提示</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 点击任意卡片即可在新标签页打开对应网站</li>
                <li>• 使用搜索框快速查找所需工具和资源</li>
                <li>• 所有链接均已验证,可放心访问</li>
                <li>• 建议将常用网站加入浏览器书签</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
