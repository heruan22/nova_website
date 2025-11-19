'use client';

import { useState } from 'react';

export default function BusinessPage() {
  const [selectedService, setSelectedService] = useState('break-bulk');

  const services = [
    { 
      id: 'break-bulk', 
      icon: '📦', 
      title: '件杂货班轮运输', 
      titleEn: 'Break Bulk Transportation',
      description: '我司深耕国际散杂货海洋运输业务近二十年，依托于天津港，辐射国内各大港口，凭借多年积累的丰富经验和专业的业务团队，可为国内外众多工业制造及设备供应的客户提供量身定制的全程物流运输方案。'
    },
    { 
      id: 'bulk-cargo', 
      icon: '🚢', 
      title: '散货运输', 
      titleEn: 'Bulk Cargo Transportation',
      description: '我司与国际大小船东及多家知名经纪公司建立了稳固良好的合作关系，主要承运化肥、精矿、煤炭、水泥、锰矿、石油焦等大宗纯散货物，可为广大货主提供包船及包舱的多样化选择。'
    },
    { 
      id: 'roro', 
      icon: '🚗', 
      title: '滚装运输', 
      titleEn: 'RO-RO Transportation',
      description: '我司与多家国内外知名滚装船东有着长期合作关系，可为客户提供专业的整车物流服务，涵盖码头接货、拆镜、验车打尺、绑扎垫料、到门运输等一条龙物流服务。'
    },
    { 
      id: 'container', 
      icon: '📦', 
      title: '集装箱运输', 
      titleEn: 'Container Shipping Service',
      description: '我司拥有丰富的集装箱船东资源，可为客户提供海运订舱、特种柜、拖车报关、装箱加固、包装仓储等集装箱服务。凭借丰富的代理网络，能为客户实现门到门的全面服务。'
    },
    { 
      id: 'port', 
      icon: '⚓', 
      title: '港口服务', 
      titleEn: 'Comprehensive Port Service',
      description: '我司与天津港、京唐港、鲅鱼圈、连云港、上海港、张家港、东莞港等港口有着长期合作关系，能为客户提供港内卸车、打捆加固、换贴标签、苫盖堆存、仓储倒短、报关报检、装船前检验、绑扎垫料、出具完船监装报告等全面港口服务。'
    },
    { 
      id: 'project', 
      icon: '🏗️', 
      title: '项目物流', 
      titleEn: 'Project Logistics',
      description: '我司可为客户提供大型项目物流解决方案，擅长处理重大件设备、工业设备、工程项目、生产线等复杂货物的运输。提供从方案设计、运输执行到现场安装的全程服务。我们拥有专业的项目物流团队和丰富的大型项目运输经验，能够为客户提供端到端的项目物流解决方案。从前期的现场勘察、运输方案设计，到运输过程中的全程监控，再到目的地的卸货和设备安装，我们都能提供专业的服务。'
    }
  ];

  return (
    <section id="business" className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">主营业务</h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            我们擅长运输诸如钢材、化工吨包、胶合板、工程车辆、机械设备、重大件等货物
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {services.map((service) => (
            <div 
              key={service.id} 
              onClick={() => setSelectedService(service.id)}
              className={`cursor-pointer rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                selectedService === service.id 
                  ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white' 
                  : 'bg-gradient-to-br from-blue-50 to-gray-50'
              }`}
            >
              <div className="text-center">
                <div className="text-5xl mb-3">{service.icon}</div>
                <h3 className={`text-base font-bold mb-2 ${selectedService === service.id ? 'text-white' : 'text-gray-900'}`}>
                  {service.title}
                </h3>
                <p className={`text-xs ${selectedService === service.id ? 'text-blue-100' : 'text-gray-600'}`}>
                  {service.titleEn}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 服务详情展示区 */}
        <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-2xl p-8 md:p-12 mb-12 shadow-xl">
          {services.filter(s => s.id === selectedService).map((service) => (
            <div key={service.id}>
              <div className="text-center mb-8">
                <div className="text-7xl mb-4">{service.icon}</div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-lg text-gray-600 mb-6">{service.titleEn}</p>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <p className="text-gray-700 text-lg leading-relaxed text-justify">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
}
