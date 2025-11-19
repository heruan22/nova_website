'use client';

import { useState } from 'react';
import { useContact } from '@/components/ContactContext';

export default function CasesPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const cases = [
    {
      id: 1,
      category: 'manufacturing',
      title: '全球知名汽车零部件企业海运方案',
      company: '汽车零部件出口商',
      challenge: '该企业每月需要向欧洲、美国、日本等地出口大量汽车零部件，对运输成本和时效性要求高',
      solution: '设计海运拼箱方案，定期班船，降低物流成本；同时建立了仓储配送中心，实现快速分拨',
      result: '成功降低物流成本18%，提高交货准时率至99.2%，年度合作额达2000万',
      stats: [
        { label: '成本节省', value: '18%' },
        { label: '准时率', value: '99.2%' },
        { label: '年度合作额', value: '2000万' }
      ]
    },
    {
      id: 2,
      category: 'electronics',
      title: '电子产品跨国多渠道流通物流',
      company: '国际电子产品企业',
      challenge: '客户产品需要从中国同时送往美国、欧洲、东南亚等多个市场，需要多地协调运输',
      solution: '建立全球物流网络，采用海运主干、空运补充、陆运配送的多式联运方案',
      result: '实现全球协调一体化运输，物流效率提升35%，服务覆盖全球40多个国家',
      stats: [
        { label: '效率提升', value: '35%' },
        { label: '覆盖国家', value: '40+' },
        { label: '月运输量', value: '5000+柜' }
      ]
    },
    {
      id: 3,
      category: 'fmcg',
      title: '快消品冷链物流综合解决方案',
      company: '国际快消品集团',
      challenge: '需要运输生鲜、冷冻食品等对温度要求严格的产品，需要全程冷链管理',
      solution: '建立专业冷链物流体系，配备温度监控设备，全程0-4℃恒温保存',
      result: '产品完好率达98.5%，建立了长期稳定的合作关系，成为主要物流供应商',
      stats: [
        { label: '完好率', value: '98.5%' },
        { label: '日均处理', value: '100吨+' },
        { label: '覆盖城市', value: '50+' }
      ]
    },
    {
      id: 4,
      category: 'machinery',
      title: '大型机械设备重大件运输',
      company: '工程机械制造企业',
      challenge: '需要运输几十吨重的大型工程机械至中东、非洲等地，运输难度大',
      solution: '配备专业的重大件运输团队和设备，进行特殊包装和运输方案设计',
      result: '安全运抵目的地，零事故，为客户节省成本25%，建立了专项合作',
      stats: [
        { label: '运输成功率', value: '100%' },
        { label: '成本节省', value: '25%' },
        { label: '单次吨位', value: '100+吨' }
      ]
    },
    {
      id: 5,
      category: 'retail',
      title: '国际零售企业全球配送网络',
      company: '国际零售集团',
      challenge: '需要建立全球统一的配送平台，将产品从中国分拨至全球各地零售店',
      solution: '建立全球配送中心网络，建设自动化分拨系统，实现一体化管理',
      result: '配送时效从45天缩短至25天，效率提升44%，用户满意度达96%',
      stats: [
        { label: '时效缩短', value: '44%' },
        { label: '满意度', value: '96%' },
        { label: '月发货量', value: '10000+单' }
      ]
    },
    {
      id: 6,
      category: 'crossborder',
      title: '跨境电商物流一体化服务',
      company: '跨境电商平台',
      challenge: '处理来自全球的订单，需要快速、经济的跨境物流方案',
      solution: '提供FBA空运、海运、专线等多种方案，实现全球仓配一体化',
      result: '日均处理订单10000+，平均交付时间7天，物流成本节省22%',
      stats: [
        { label: '日均订单', value: '10000+' },
        { label: '平均时效', value: '7天' },
        { label: '成本节省', value: '22%' }
      ]
    }
  ];

  const categories = [
    { id: 'all', name: '全部案例' },
    { id: 'manufacturing', name: '制造业' },
    { id: 'electronics', name: '电子产品' },
    { id: 'fmcg', name: '快消品' },
    { id: 'machinery', name: '重工机械' },
    { id: 'retail', name: '零售电商' },
    { id: 'crossborder', name: '跨境电商' }
  ];

  const categoryMap = categories.reduce<Record<string, string>>((acc, cur) => {
    acc[cur.id] = cur.name;
    return acc;
  }, {});

  const categoryVisuals: Record<string, { icon: string; gradient: string }> = {
    manufacturing: { icon: '🏭', gradient: 'from-blue-500 via-blue-400 to-blue-300' },
    electronics: { icon: '💡', gradient: 'from-purple-500 via-indigo-400 to-blue-300' },
    fmcg: { icon: '🥗', gradient: 'from-green-500 via-lime-400 to-amber-300' },
    machinery: { icon: '⚙️', gradient: 'from-slate-600 via-gray-500 to-gray-400' },
    retail: { icon: '🛍️', gradient: 'from-pink-500 via-rose-400 to-orange-300' },
    crossborder: { icon: '🌐', gradient: 'from-cyan-500 via-blue-400 to-indigo-300' },
    all: { icon: '🚢', gradient: 'from-blue-500 via-blue-400 to-blue-300' }
  };

  const filteredCases = activeCategory === 'all' 
    ? cases 
    : cases.filter(c => c.category === activeCategory);

  return (
    <section id="cases" className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">案例介绍</h2>
        <p className="text-gray-600 text-lg text-center mb-12 max-w-3xl mx-auto">
          华顺物流已为10000+客户提供专业物流服务，以下是部分典型案例，展现我们的专业能力和服务水平
        </p>

        {/* 分类过滤 */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full font-medium transition ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-900 border border-gray-300 hover:border-blue-600'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* 案例列表 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredCases.map(caseItem => {
            const visual = categoryVisuals[caseItem.category] || categoryVisuals.all;
            return (
              <div key={caseItem.id} className="rounded-3xl overflow-hidden shadow-md bg-white">
                <div className={`h-40 w-full bg-gradient-to-br ${visual.gradient} flex items-center justify-center text-5xl text-white`}>
                  <span>{visual.icon}</span>
                </div>
                <p className="px-5 py-4 text-base font-semibold text-gray-900 line-clamp-2">
                  {caseItem.title}
                </p>
              </div>
            );
          })}
        </div>

        
      </div>
    </section>
  );
}

function CasesCTA() {
  const { openContact } = useContact();
  return (
    <button onClick={() => openContact('咨询物流方案')} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition">
      咨询物流方案
    </button>
  );
}
