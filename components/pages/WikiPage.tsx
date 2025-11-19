'use client';

import { useState } from 'react';
import { useContact } from '@/components/ContactContext';

export default function WikiPage() {
  const [activeCategory, setActiveCategory] = useState('sea');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const { openContact } = useContact();

  const categories = [
    { id: 'sea', name: '海运知识', icon: '🌊' },
    { id: 'air', name: '空运知识', icon: '✈️' },
    { id: 'land', name: '陆运知识', icon: '🚚' },
    { id: 'customs', name: '报关清关', icon: '📋' },
    { id: 'hazmat', name: '危险品', icon: '⚠️' }
  ];

  const articles = {
    sea: [
      {
        id: 1,
        q: '什么是FCL和LCL运输？区别是什么？',
        a: 'FCL（Full Container Load）是整箱运输，指整个集装箱由单一客户承租，货物填满整个箱子。LCL（Less Than Container Load）是拼箱运输，多个客户的货物共用一个集装箱。FCL适合货量大（20GP以上）、要求高的货物；LCL适合中小货主、货量少（10立方米以下）的情况。FCL一般价格更低，LCL更灵活。'
      },
      {
        id: 2,
        q: '海运中20GP和40GP集装箱如何选择？',
        a: '20GP：内部尺寸5.9*2.35*2.39米，容积约33立方米，最大装载18吨。40GP：内部尺寸12.0*2.35*2.39米，容积约67立方米，最大装载30吨。选择标准：根据货物体积和重量，计算性价比。40GP成本虽高但单位价格低，适合大批量；20GP更灵活，适合小批量。'
      },
      {
        id: 3,
        q: '海运从中国到欧美通常需要多少天？',
        a: '中国到欧洲通常30-40天，到北美25-35天。具体时间受航线、港口、季节等影响。优化建议：选择主要港口出发（如上海）进口到主要港口；提前订舱；考虑直达船更快但成本高。'
      },
      {
        id: 4,
        q: '海运保险应该如何购买？',
        a: '海运保险通常分为平安险、水渍险、全险三种。平安险保障最基础，水渍险增加风险覆盖，全险最全面。建议：高价值货物购买全险；普通货物购买水渍险；购买保险时应声明真实价值；通过物流商统一购买更便宜。'
      },
      {
        id: 5,
        q: '海运费用包括哪些方面？',
        a: '海运费用主要包括：1）运费（基础费）2）燃油附加费 3）港口费 4）报关费 5）单证费 6）仓储费等。不同时期价格变动大，建议获取完整报价时详细了解各项费用构成。'
      }
    ],
    air: [
      {
        id: 6,
        q: '空运中的W/M价格如何计算？',
        a: '空运采用重量计费和体积计费两种方式，以W/M表示。W（Weight）为实际重量，M（Measure）为体积重量（长*宽*高/6000）。航空公司会按照两者中较高的数值计费。优化建议：利用轻的重型商品可降低成本；合理打包减少体积。'
      },
      {
        id: 7,
        q: '空运从中国到各地需要多少天？',
        a: '中国到美国通常2-3天，欧洲3-5天，日韩1-2天。空运时效快但成本高（约为海运的4-8倍）。适用于：电子产品、紧急补货、高价值商品、易损坏品。'
      },
      {
        id: 8,
        q: '什么是"经济舱"和"优先"空运？',
        a: '经济舱：运费相对便宜，但时间不固定，可能延误。优先舱：费用高，但时间有保证。选择标准：时间急或对交期要求严格选优先舱；成本优先选经济舱；关键订单平衡风险选择。'
      },
      {
        id: 9,
        q: '空运中危险品和食品的特殊要求？',
        a: '危险品：需要特殊包装和危险品证书，某些物品受限或禁运。食品：需要卫生证、原产地证等；某些成分受限。建议提前咨询，确保符合目的地要求。'
      },
      {
        id: 10,
        q: '空运如何选择合适的机场？',
        a: '主要考虑：1）你的货物所在地 2）目的地 3）航班频率 4）价格 5）清关时间。中国主要机场：北京、上海、广州。选择主枢纽机场通常有更多航班和更低价格。'
      }
    ],
    land: [
      {
        id: 11,
        q: '陆运中FTL和LTL如何选择？',
        a: 'FTL（Full Truck Load）整车运输，整辆车由你承租。LTL（Less Than Truck Load）零担运输，多个客户共用一辆车。FTL适合大批量（15吨以上），点对点运输；LTL适合中小批量、多点配送。'
      },
      {
        id: 12,
        q: '中国陆运到东南亚需要多少费用和时间？',
        a: '到泰国、越南通常3-5天，费用按照吨位计算（一般200-400元/吨）。陆运跨境需要办理报关手续，建议提前准备清关文件。'
      },
      {
        id: 13,
        q: '陆运保险有哪几种类型？',
        a: '陆运保险主要分为：1）基本险（偷盗险）2）全保险（包括自然灾害） 3）综合险。根据货物类型和价值选择。高价值或易损品建议购买综合险。'
      },
      {
        id: 14,
        q: '如何选择专业的陆运公司？',
        a: '关键指标：1）运输资质和营业执照 2）车队规模和条件 3）GPS追踪系统 4）保险覆盖 5）过往案例和口碑。建议选择有专业团队、现代化车队的公司。'
      },
      {
        id: 15,
        q: '什么情况下需要超限运输许可证？',
        a: '货物超过法定尺寸或重量限制时需要办理。标准限制为：高3.5m、宽2.5m、长18m、总重49吨。超出这些数据需要特殊许可，费用额外，时间也会延长。'
      }
    ],
    customs: [
      {
        id: 16,
        q: '进出口报关需要哪些基本文件？',
        a: '基本文件：1）商业单据（发票、装箱单） 2）提单或运单 3）合同 4）产地证 5）各类证书（许可证、卫生证等）。不同商品类别要求不同，需提前咨询。'
      },
      {
        id: 17,
        q: '关税、增值税和消费税如何区别？',
        a: '关税：对进出口商品征收，保护国内产业。增值税：对商品增值部分征收。消费税：对特定消费品征收。进口时这三种税都可能涉及，最终成本需要综合计算。'
      },
      {
        id: 18,
        q: '什么是暂时进出口？如何办理？',
        a: '暂时进出口指货物短期进出关境，如用于展览、维修、生产等临时目的。办理需要提供暂时进出口担保，优势是免征关税。适用于样品、展品、维修品。'
      },
      {
        id: 19,
        q: '海关查验通常需要多长时间？',
        a: '常规查验1-3天，布控查验5-10天。抽查比例通常在5-10%。加快查验方法：1）资料完整准确 2）配合海关 3）建立诚信记录 4）选择便捷通关试点。'
      },
      {
        id: 20,
        q: '如何判断产品是否违禁或受限？',
        a: '查看《HS编码表》了解商品分类，咨询海关或专业报关公司。常见限制品：某些电子产品、某些化学品、药品等。有疑问时先咨询再安排出运。'
      }
    ],
    hazmat: [
      {
        id: 21,
        q: '什么商品属于危险品？',
        a: '根据国际运输法规，危险品分为9大类：爆炸品、气体、易燃液体、易燃固体、氧化剂、毒性物质、放射性物质、腐蚀品、其他危险品。常见的有：锂电池、油漆、化学品、香精香料等。'
      },
      {
        id: 22,
        q: '危险品运输的特殊要求？',
        a: '需要：1）危险品证书 2）特殊包装 3）标签和标记 4）运输文件 5）驾驶员培训。成本高于普通货物30-50%，时间也更长。必须选择有危险品资质的承运人。'
      },
      {
        id: 23,
        q: '哪些危险品禁止空运？',
        a: '严格禁运：爆炸品、某些化学品、易燃液体等。限制运输：锂电池（有严格条件）、某些氧化剂等。最好的办法是向航空公司或物流商咨询确认。'
      },
      {
        id: 24,
        q: '危险品海运和空运的价格差异？',
        a: '海运虽然对危险品的限制较少，但费用依然比普通货物高20-40%。空运虽然时效快，但费用是普通空运的2-3倍，甚至某些危险品禁运。建议综合考虑时间、成本、风险。'
      },
      {
        id: 25,
        q: '运输中发生危险品泄漏怎么办？',
        a: '立即停运，隔离现场，通知相关部门。运输方需要有应急预案和保险。这就是为什么必须选择有资质、有经验、有保险的专业危险品运输商。'
      }
    ]
  };

  const currentArticles = articles[activeCategory as keyof typeof articles] || [];

  return (
    <section id="wiki" className="py-20 bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">航贸百科</h2>
        <p className="text-gray-600 text-lg text-center mb-12">
          汇集国际物流运输知识，为您解答关键问题，助力业务发展
        </p>

        {/* 分类导航 */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setExpandedId(null);
              }}
              className={`px-4 py-2 rounded-lg font-medium transition text-sm sm:text-base ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              <span className="mr-2">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* 文章列表 - 手风琴样式 */}
        <div className="space-y-3">
          {currentArticles.map(article => (
            <div key={article.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedId(expandedId === article.id ? null : article.id)}
                className="w-full px-6 py-4 text-left hover:bg-gray-50 transition flex items-center justify-between"
              >
                <h3 className="font-semibold text-gray-900 pr-4">{article.q}</h3>
                <span className={`flex-shrink-0 text-blue-600 transition transform ${
                  expandedId === article.id ? 'rotate-180' : ''
                }`}>
                  ▼
                </span>
              </button>
              
              {expandedId === article.id && (
                <div className="px-6 py-4 bg-blue-50 border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed">{article.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
}
