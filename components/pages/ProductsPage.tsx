'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('钢材产品');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const products = [
    // 钢材产品
    { 
      image: '/images/products/hot-rolled-coil.jpg',
      name: 'Hot Rolled Coil',
      nameZh: '热轧卷',
      category: '钢材产品'
    },
    { 
      image: '/images/products/steel-plate.jpg',
      name: 'Hot Rolled Steel Plate',
      nameZh: '热轧钢板',
      category: '钢材产品'
    },
    { 
      image: '/images/products/galvanized-coil.jpg',
      name: 'Galvanized Steel Coil',
      nameZh: '镀锌钢卷',
      category: '钢材产品'
    },
    { 
      image: '/images/products/wire-rod.jpeg',
      name: 'Wire Rod',
      nameZh: '线材',
      category: '钢材产品'
    },
    { 
      image: '/images/products/彩涂卷.jpg',
      name: 'Stainless Steel',
      nameZh: '彩涂卷',
      category: '钢材产品'
    },
    { 
      image: '/images/products/steel-pipe.jpg',
      name: 'Steel Pipe',
      nameZh: '钢管',
      category: '钢材产品'
    },
    
    // 化工吨包
    { 
      image: '/images/products/semi-coke.jpg',
      name: 'Chemical Raw Materials',
      nameZh: '化工原料',
      category: '化工吨包'
    },
    { 
      image: '/images/products/plastic-pellets.jpg',
      name: 'Plastic Pellets',
      nameZh: '塑料粒子',
      category: '化工吨包'
    },
    { 
      image: '/images/products/fertilizer.jpg',
      name: 'Fertilizer',
      nameZh: '化肥',
      category: '化工吨包'
    },
    { 
      image: '/images/products/resin.jpg',
      name: 'Resin',
      nameZh: '树脂',
      category: '化工吨包'
    },
    { 
      image: '/images/products/rubber.jpg',
      name: 'Rubber Products',
      nameZh: '橡胶制品',
      category: '化工吨包'
    },
    { 
      image: '/images/products/additives.jpg',
      name: 'Additives',
      nameZh: '添加剂',
      category: '化工吨包'
    },
    
    // 车辆机械
    { 
      image: '/images/products/dump-truck.jpg',
      name: 'Dump Truck',
      nameZh: '自卸车',
      category: '车辆机械'
    },
    { 
      image: '/images/products/excavator.jpg',
      name: 'Excavator',
      nameZh: '挖掘机',
      category: '车辆机械'
    },
    { 
      image: '/images/products/crane.jpg',
      name: 'Crane',
      nameZh: '起重机',
      category: '车辆机械'
    },
    { 
      image: '/images/products/loader.jpg',
      name: 'Loader',
      nameZh: '装载机',
      category: '车辆机械'
    },
    { 
      image: '/images/products/forklift.jpg',
      name: 'Forklift',
      nameZh: '叉车',
      category: '车辆机械'
    },
    { 
      image: '/images/products/tractor.jpg',
      name: 'Tractor',
      nameZh: '拖拉机',
      category: '车辆机械'
    },
    
    // 工业设备
    { 
      image: '/images/products/machine-tools.jpg',
      name: 'Machine Tools',
      nameZh: '机床设备',
      category: '工业设备'
    },
    { 
      image: '/images/products/generator.jpg',
      name: 'Generator',
      nameZh: '发电机组',
      category: '工业设备'
    },
    { 
      image: '/images/products/refrigeration.jpg',
      name: 'Refrigeration Equipment',
      nameZh: '制冷设备',
      category: '工业设备'
    },
    { 
      image: '/images/products/production-line.jpg',
      name: 'Production Line',
      nameZh: '生产线',
      category: '工业设备'
    },
    { 
      image: '/images/products/transformer.jpg',
      name: 'Transformer',
      nameZh: '变压器',
      category: '工业设备'
    },
    { 
      image: '/images/products/pump.jpg',
      name: 'Industrial Pump',
      nameZh: '工业泵',
      category: '工业设备'
    },
    
    // 大宗散货
    { 
      image: '/images/products/coal.jpg',
      name: 'Coal',
      nameZh: '煤炭',
      category: '大宗散货'
    },
    { 
      image: '/images/products/ore.jpg',
      name: 'Iron Ore',
      nameZh: '矿石',
      category: '大宗散货'
    },
    { 
      image: '/images/products/grain.jpg',
      name: 'Grain',
      nameZh: '粮食',
      category: '大宗散货'
    },
    { 
      image: '/images/products/semi-coke.jpg',
      name: 'Semi Coke',
      nameZh: '半焦',
      category: '大宗散货'
    },
    { 
      image: '/images/products/petroleum-coke.jpg',
      name: 'Petroleum Coke',
      nameZh: '石油焦',
      category: '大宗散货'
    },
    { 
      image: '/images/products/sand.jpg',
      name: 'Sand & Gravel',
      nameZh: '砂石',
      category: '大宗散货'
    },
  ];

  // 定义分类顺序
  const categories = ['钢材产品', '化工吨包', '车辆机械', '工业设备', '大宗散货'];

  // 根据选中的分类筛选产品
  const filteredProducts = products.filter(p => p.category === selectedCategory);

  // 打开产品详情模态框
  const openProductModal = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // 关闭模态框
  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  return (
    <section id="products" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 标题区域 */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">主要产品</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 mx-auto mb-6"></div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            点击分类查看详细产品信息
          </p>
        </div>

        {/* 分类选项卡 */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-xl scale-110'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md hover:shadow-lg'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 产品展示区域 - 圆形图片 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={index}
              className="group flex flex-col items-center cursor-pointer"
              onClick={() => openProductModal(product)}
            >
              {/* 圆形图片容器 */}
              <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 border-4 border-white group-hover:border-blue-400">
                <Image
                  src={product.image}
                  alt={product.nameZh}
                  fill
                  className="object-cover"
                  sizes="128px"
                />
                {/* 悬停遮罩 */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 to-cyan-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">查看详情</span>
                </div>
              </div>

              {/* 产品名称 */}
              <div className="text-center">
                <h3 className="text-base font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {product.nameZh}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {product.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 空状态提示 */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">该分类暂无产品</p>
          </div>
        )}

        {/* 底部CTA */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 rounded-2xl p-12 text-center text-white shadow-2xl">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">需要了解更多产品信息？</h3>
            <p className="text-blue-100 text-lg mb-8">
              我们的专业团队随时为您提供详细的产品咨询和运输方案
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                立即咨询
              </button>
              <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300">
                获取报价
              </button>
            </div>
          </div>
        </div>

        {/* 产品详情模态框 - 仅显示图片 */}
        {isModalOpen && selectedProduct && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={closeModal}
          >
            {/* 关闭按钮 */}
            <button
              onClick={closeModal}
              className="absolute top-8 right-8 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* 完整图片 */}
            <div 
              className="relative max-w-5xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.nameZh}
                width={1200}
                height={800}
                className="object-contain max-h-[85vh] w-auto mx-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
