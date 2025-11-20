'use client';

import { useState } from 'react';
import { useContact } from '@/components/ContactContext';

type CategoryId = 'all' | 'breakbulk' | 'container' | 'logistics' | 'foreign_trade';
type Article = { id: number; q: string; a: string };
type ArticleMap = Record<Exclude<CategoryId, 'all'>, Article[]>;

export default function WikiPage() {
  const { openContact } = useContact();

  const categories: { id: CategoryId; name: string; icon: string }[] = [
    { id: 'all', name: '全部', icon: '🌐' },
    { id: 'breakbulk', name: '散杂百科', icon: '⚓️' },
    { id: 'container', name: '集运百科', icon: '🚢' },
    { id: 'logistics', name: '物流百科', icon: '🚚' },
    { id: 'foreign_trade', name: '外贸百科', icon: '🏦' }
  ];

  const articles: ArticleMap = {
    breakbulk: [
      {
        id: 1,
        q: '什么是散货船？',
        a: '散货船是专门装运谷物、煤炭、矿砂等大宗散货的船舶。这类船舶构造特点是多为尾机型单甲板船，舱口也较大，并且多不配起货设备\n散货船：正如名字表示的一样，这种船通常被用来运输散货（例如煤炭、铁矿石、粮食、矿石等），然而一些杂货（比如袋装货物和钢材）也经常会被装载一些小型的散货船上。'
      },
      {
        id: 2,
        q: '散货船怎么分类？',
        a: `散货船分类及对应的指数：
A、灵便型 (handysize)：载重 2～4 万吨，指数 BHI/BHSI
B、超灵便型 (supersize 或 handymax)：载重 4～5 万吨，指数 BSI
C、巴拿马型 (panamax)：载重 6～8 万吨，指数 BPI，POST-panamax <12.5
D、好望角型 (capesize)：载重 12.5-22 万吨以上，指数 BCI`
      },
      {
        id: 3,
        q: '散杂船的条款有哪些',
        a: `FLT条款 (Full Liner Term)：船东负责装卸及相关费用，常用于设备、车辆货物。
FILO条款 (Free In Liner Out)：船东负责卸不负责装，可扩展为 FILO UH、FILO POR。
FIO条款 (Free In Out)：船东不负责装卸，常用于散杂货租船。
LIFO条款 (Liner In Free Out)：船东负责装不卸，使用较少。
FIOST：Free In and Out, Stowed and Trimmed，船方不负责装卸、堆装、平舱费。`
      },
      
      {
        id: 4,
        q: '散货船的询价要素？',
        a: '（1）起运港和目的港（或告知工厂地址）\n（2）品名/重量/尺寸\n（3）货好时间（或预计交期）\n（4）装卸条款（如有）\n（5）其他要求（配载位置/是否分批/航程要求）\n（6）箱单和照片'
      },
      {
        id: 5,
        q: '散杂货海运的操作流程？',
        a: '散杂货海运操作一般流程：\n1、客户询价——运输方式、起运港和目的港、货物品名和件重尺，装率和卸率、预计出运日期、客户联系方式等。根据这些信息尽快给客户报价。 \n2、签订合同，根据合同要求开始操作——正式操作时要熟读合同，了解各方关系如收发货人、委托人、船东、贸易条款、各项费用由何方支付等以及报关报检、装船卸船、绑扎加固由何方负责，还有装卸条款、货量、能否装载甲板、能否叠放以及是否有其他特殊要求等。 \n3、收集整理本次出运货物的详细信息，了解货物准备情况——保持与发货人联系，确定预计发货日期，货物数量，货好时间（运抵码头并同时备好相关单据），货物件重尺等信息，转发给租船，地面代理等做相应准备。 \n4、收到《装箱单》后发送给港口船长，租船，地面代理，船代理（如有必要）等，确保各环节、各相关方流畅衔接。 \n5、正式订船——第一、核对《装箱单》统计总货量、核查箱单所列货物的件重尺，如有疑问及时找相关方核实解决。第二、经核查的《装箱单》发送港口船长——确认货物是否能够按要求装船。如果有问题，及时通知客户，和客户协商处理办法。 \n6、订船后发《送货通知》给相关发货人或委托方并告知相关信息，要求客户提供最终《装箱单》，或要求在指定时间内提供最终《装箱单》。 \n7、向发货人或委托方索要报关等信息，准备货物报关等工作，提醒发货人注意事项。尤其是报关单据提前核对，告知报关期限和要求。 \n8、安排送货至码头——发《装箱单》给港口地面代理，告知船代理联系人、电话和船期等基本信息，并提供相关报关信息，转发给发货人或委托方，如有特殊要求一定多提醒，并密切跟踪送货情况。如果货物无法按时到港，书面通知客户可能产生的费用，要求发货方或委托方书面确认并协商处理办法。 \n9、送货完毕后，安排对所有货物进行打尺，发送最终《装箱单》给打尺公司，并通知各方现场监尺。 \n10、及时发送船舶动态给发货人或委托方，告知客户具体的装船日期等动态情况。 \n11、货物装船前，发《装船通知》给相关发货人或委托方，并告知相关港口船长、预配图、预计装船时间等信息。 \n12、确保船舶到达港口之前货物已到齐，并通关完毕。 \n13、装船，出运，跟踪船舶动态，和客户结算运杂费等'
      }
    ],
    container: [
      {
        id: 6,
        q: '',
        a: ''
      },
      {
        id: 7,
        q: '',
        a: ''
      },
      {
        id: 8,
        q: '',
        a: ''
      },
      {
        id: 9,
        q: '',
        a: ''
      },
      {
        id: 10,
        q: '',
        a: ''
      }
    ],
    logistics: [
      {
        id: 11,
        q: '',
        a: ''
      },
      {
        id: 12,
        q: '',
        a: ''
      },
      {
        id: 13,
        q: '',
        a: ''
      },
      {
        id: 14,
        q: '',
        a: ''
      },
      {
        id: 15,
        q: '',
        a: ''
      }
    ],
    foreign_trade: [
      {
        id: 16,
        q: '',
        a: ''
      },
      {
        id: 17,
        q: '',
        a: ''
      },
      {
        id: 18,
        q: '',
        a: ''
      },
      {
        id: 19,
        q: '',
        a: ''
      },
      {
        id: 20,
        q: '',
        a: ''
      }
    ]
  };

  const allArticles = Object.values(articles).flat();

  const [activeCategory, setActiveCategory] = useState<CategoryId>('breakbulk');
  const [expandedIds, setExpandedIds] = useState<number[]>([]);

  const getArticlesByCategory = (categoryId: CategoryId): Article[] =>
    categoryId === 'all' ? allArticles : articles[categoryId];

  const handleCategoryChange = (categoryId: CategoryId) => {
    setActiveCategory(categoryId);
    const nextArticles = getArticlesByCategory(categoryId);
    setExpandedIds(categoryId === 'all' ? nextArticles.map(article => article.id) : []);
  };

  const toggleArticle = (articleId: number) => {
    setExpandedIds(prev =>
      prev.includes(articleId)
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    );
  };

  const currentArticles = getArticlesByCategory(activeCategory);

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
              onClick={() => handleCategoryChange(cat.id)}
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
                onClick={() => toggleArticle(article.id)}
                className="w-full px-6 py-4 text-left hover:bg-gray-50 transition flex items-center justify-between"
              >
                <h3 className="font-semibold text-gray-900 pr-4">{article.q}</h3>
                <span className={`flex-shrink-0 text-blue-600 transition transform ${
                  expandedIds.includes(article.id) ? 'rotate-180' : ''
                }`}>
                  ▼
                </span>
              </button>
              
              {expandedIds.includes(article.id) && (
                <div className="px-6 py-4 bg-blue-50 border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{article.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
}
