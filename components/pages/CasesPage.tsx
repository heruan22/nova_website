'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { useContact } from '@/components/ContactContext';

export default function CasesPage() {
  const [activeCategory, setActiveCategory] = useState('steel');

  const categories = [
    { id: 'all', name: '全部案例' },
    { id: 'steel', name: '钢材产品' },
    { id: 'ton-bags', name: '化工吨包' },
    { id: 'vehicle', name: '车辆机械' },
    { id: 'equipment', name: '工业设备' },
    { id: 'bulk-cargo', name: '大宗散货' },
    { id: 'others', name: '其他货物' }
  ];

  const categoryMap = categories.reduce<Record<string, string>>((acc, cur) => {
    acc[cur.id] = cur.name;
    return acc;
  }, {});

  const galleryCases = useMemo(() => [
    { id: 's1', category: 'steel', title: '热卷', image: '/images/products/热卷舱底.jpg' },
    { id: 's2', category: 'steel', title: '彩涂卷', image: '/images/products/彩涂卷舱底.jpg' },
    { id: 's3', category: 'steel', title: '热轧钢板', image: '/images/products/steel-plate.jpg' },
    { id: 's4', category: 'steel', title: '盘条', image: '/images/products/盘条舱底.jpg' },
    { id: 's5', category: 'steel', title: '型钢', image: '/images/products/型材舱底3.jpg' },
    { id: 's6', category: 'steel', title: '镀锌管', image: '/images/products/镀锌圆管舱底.jpg' },
    { id: 's7', category: 'steel', title: '大口径无缝管', image: '/images/products/大口径无缝管.jpg' },
    // { id: 's8', category: 'steel', title: '钢轨', image: '/images/products/grain.jpg' },
    { id: 's9', category: 'steel', title: '钢结构', image: '/images/products/钢结构卸货.jpg' },
    { id: 't1', category: 'ton-bags', title: '石油焦', image: '/images/products/兰炭装船.jpeg' },
    { id: 't2', category: 'ton-bags', title: '兰炭', image: '/images/products/semi-coke.jpg' },
    { id: 't3', category: 'ton-bags', title: '化肥', image: '/images/products/化肥.jpg' },
    // { id: 't4', category: 'ton-bags', title: '元明粉', image: '/images/products/plastic-pellets.jpg' },
    { id: 't5', category: 'ton-bags', title: '食品添加剂', image: '/images/products/食品添加剂舱底.jpg' },
    // { id: 't6', category: 'ton-bags', title: 'PVC', image: '/images/products/plastic-pellets.jpg' },
    { id: 'v1', category: 'vehicle', title: '自卸车', image: '/images/products/自卸车甲板.jpg' },
    { id: 'v2', category: 'vehicle', title: '油罐车', image: '/images/products/油罐车装船.jpg' },
    { id: 'v3', category: 'vehicle', title: '半挂车', image: '/images/products/车头装船.jpg' },
    { id: 'v4', category: 'vehicle', title: '小汽车', image: '/images/products/滚装船.png' },
    { id: 'v5', category: 'vehicle', title: '起重机', image: '/images/products/汽车起重机3.png' },
    { id: 'v6', category: 'vehicle', title: '挖掘机', image: '/images/products/挖掘机1.jpg' },
    // { id: 'e1', category: 'equipment', title: '变压器', image: '/images/products/hot-rolled-coil.jpg' },
    { id: 'e2', category: 'equipment', title: '锅炉设备', image: '/images/products/工业设备.jpg' },
    // { id: 'e3', category: 'equipment', title: '矿山设备', image: '/images/products/hot-rolled-coil.jpg' },
    // { id: 'e4', category: 'equipment', title: '水电设备', image: '/images/products/hot-rolled-coil.jpg' },
    // { id: 'b1', category: 'bulk-cargo', title: '风电设备', image: '/images/products/hot-rolled-coil.jpg' },
    { id: 'b2', category: 'bulk-cargo', title: '煤炭', image: '/images/products/煤炭.jpg' },
    // { id: 'b3', category: 'bulk-cargo', title: '水渣', image: '/images/products/hot-rolled-coil.jpg' },
    // { id: 'b4', category: 'bulk-cargo', title: '矾土', image: '/images/products/hot-rolled-coil.jpg' },
    { id: 'o1', category: 'others', title: '胶合板', image: '/images/products/胶合板.jpg' },
    // { id: 'o2', category: 'others', title: '集装箱', image: '/images/products/hot-rolled-coil.jpg' },
    // { id: 'o3', category: 'others', title: '阳极碳块', image: '/images/products/resin.jpg' }
  ], []);

  const displayedCases = useMemo(() => (
    activeCategory === 'all'
      ? galleryCases
      : galleryCases.filter(item => item.category === activeCategory)
  ), [activeCategory, galleryCases]);

  return (
    <section id="cases" className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">案例介绍</h2>
        <p className="text-gray-600 text-lg text-center mb-12 max-w-3xl mx-auto">
          华顺船务已为数千家企业提供专业的物流服务，以下是部分典型案例，展现我们的专业能力和服务水平
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
          {displayedCases.map(caseItem => (
            <div
              key={caseItem.id}
              className="group relative h-64 overflow-hidden rounded-3xl bg-black shadow-lg"
            >
              <Image
                src={caseItem.image}
                alt={caseItem.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-110"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute left-5 top-5 inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-800 backdrop-blur">
                {categoryMap[caseItem.category] || '典型案例'}
              </div>
              <p className="absolute left-5 right-5 bottom-5 text-lg font-semibold text-white leading-snug">
                {caseItem.title}
              </p>
            </div>
          ))}
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
