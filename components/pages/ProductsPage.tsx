'use client';

import { useMemo } from 'react';
import { useContact } from '@/components/ContactContext';

const summaryMetrics = [
  { label: '全球港口网络', value: '150+', sub: '覆盖亚欧、拉美、非洲主要枢纽' },
  { label: '年度项目出运', value: '2,400+', sub: '散杂 / 集装箱 / 多式联运' },
  { label: '资深项目经理', value: '36', sub: '一对一全流程响应' }
];

const productFamilies = [
  {
    id: 'breakbulk',
    title: '散杂大件',
    subtitle: '重装设备一站式统筹',
    description: '覆盖散杂船、滚装船、驳船等多种运力，适配风电、矿建、轨道交通等超尺寸货物。',
    icon: '⚙️',
    delivery: '48h 制定吊装与配载方案',
    service: '配套：项目驻场 / 吊装指挥',
    badges: ['重载 30,000+ 吨', '甲板/舱位双方案'],
    products: ['工程机械', '风电设备', '钢结构模块', '轨道交通车辆']
  },
  {
    id: 'steel_mining',
    title: '钢材矿产',
    subtitle: '大宗原材料保供',
    description: '长期服务钢厂与贸易商，提供集合、仓储、加固与分拨一体化解决方案。',
    icon: '🏗️',
    delivery: '船期锁定 + 货权监控',
    service: '配套：港口仓储 / 质检',
    badges: ['集港效率 30%+', '港到门联运'],
    products: ['热轧卷板', '钢管型材', '铁矿砂', '合金材料']
  },
  {
    id: 'chemical',
    title: '化工新材',
    subtitle: '吨袋 / 特货全链路',
    description: '针对吨包、危化、新能源材料提供恒温仓、专线运输与合规报关。',
    icon: '🧪',
    delivery: '危化品 MSDS 快速审核',
    service: '配套：监管仓 / 保险',
    badges: ['UN 包材认证', '24/7 状态回传'],
    products: ['化工吨包', '塑胶粒子', '新能源材料', '危险品绿色通道']
  },
  {
    id: 'container',
    title: '整车整箱',
    subtitle: '标准与特种箱兼容',
    description: 'FCL、OOG、冷链等多类型箱型，可叠加拼箱、短倒与海外清关。',
    icon: '🚚',
    delivery: '主航线周班覆盖',
    service: '配套：GPS 监控 / 车队',
    badges: ['特箱平台 120+ 套', '冷链温控 ±1℃'],
    products: ['整车出口', '平板集卡', 'OOG 特箱', '冷链集装箱']
  },
  {
    id: 'energy',
    title: '能源矿建',
    subtitle: 'EPC 工程物资',
    description: '服务油气、电力、矿山等项目，提供多港并行、分段运输与现场交付。',
    icon: '⚡️',
    delivery: '多港统筹 / 同步报关',
    service: '配套：现场交付 / 驻外',
    badges: ['EPC 经验 80+ 项', '跨境陆运联控'],
    products: ['液化天然气设备', '矿山机械', '石油钻具', '电力设备']
  },
  {
    id: 'supply_chain',
    title: '供应链增值',
    subtitle: '金融与数字化服务',
    description: '提供报关报检、海外仓、金融保理及数据看板，提升整体供应链效率。',
    icon: '🌐',
    delivery: 'T+1 数据可视与预警',
    service: '配套：资金解决方案',
    badges: ['海外仓 60,000㎡', '多币种结算'],
    products: ['报关报检', '海外仓储', '金融保理', '供应链数字化']
  }
];

export default function ProductsPage() {
  const { openContact } = useContact();

  return (
    <section id="products" className="py-24 bg-gradient-to-b from-white via-slate-50 to-blue-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-100 text-blue-700 px-4 py-1 text-sm font-semibold">
            产品矩阵 · 六大解决方案
          </span>
          <h2 className="mt-6 text-4xl font-bold text-slate-900">覆盖全链路的产品组合</h2>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
            24 个核心产品支撑不同业务场景，从散杂船项目到供应链增值服务，确保每一次出运都更高效、更透明、更可控。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {summaryMetrics.map(metric => (
            <div
              key={metric.label}
              className="rounded-2xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_45px_rgba(15,23,42,0.08)] backdrop-blur"
            >
              <p className="text-sm font-semibold text-blue-600 mb-2">{metric.label}</p>
              <p className="text-4xl font-bold text-slate-900 mb-2">{metric.value}</p>
              <p className="text-sm text-slate-500 leading-relaxed">{metric.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {productFamilies.map(family => (
            <article
              key={family.id}
              className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_25px_60px_rgba(15,23,42,0.08)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-cyan-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1 text-sm font-semibold text-slate-700">
                      <span className="text-xl">{family.icon}</span>
                      {family.title}
                    </div>
                    <h3 className="mt-4 text-2xl font-bold text-slate-900">{family.subtitle}</h3>
                    <p className="mt-2 text-slate-600 leading-relaxed">{family.description}</p>
                  </div>
                  <div className="text-right text-sm text-slate-500">
                    <p className="font-semibold text-slate-800">{family.delivery}</p>
                    <p>{family.service}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">核心产品</p>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {family.products.map(product => (
                      <div
                        key={product}
                        className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 shadow-inner"
                      >
                        {product}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {family.badges.map(badge => (
                    <span
                      key={badge}
                      className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-dashed border-slate-200 pt-6">
                  <div className="text-sm text-slate-500">
                    为该产品线定制运输方案
                  </div>
                  <button
                    onClick={() => openContact('产品矩阵咨询')}
                    className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    咨询定制
                    <span className="text-lg">→</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20 rounded-3xl bg-slate-900 px-8 py-12 text-white shadow-[0_30px_80px_rgba(15,23,42,0.45)]">
          <div className="grid gap-8 md:grid-cols-[2fr,1fr] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-200">Get In Touch</p>
              <h3 className="mt-4 text-3xl font-bold">告诉我们您的货物和目的地</h3>
              <p className="mt-3 text-blue-100 text-lg">
                我们将在 2 小时内回传舱位、运价与执行方案，确保项目节点按期推进。
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => openContact('产品矩阵咨询')}
                className="rounded-2xl bg-white/95 px-6 py-4 text-lg font-semibold text-slate-900 shadow-lg transition hover:-translate-y-0.5"
              >
                立即对接顾问
              </button>
              <button className="rounded-2xl border border-white/40 px-6 py-4 text-lg font-semibold text-white/90 transition hover:bg-white/10">
                下载产品画册
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
