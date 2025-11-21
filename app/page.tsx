'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/logistics/Hero';
import AboutPage from '@/components/pages/AboutPage'
import Stats from '@/components/logistics/Stats';
import BusinessPage from '@/components/pages/BusinessPage';
import ProductsPage from '@/components/pages/ProductsPage';
import CasesPage from '@/components/pages/CasesPage';
import WikiPage from '@/components/pages/WikiPage';
import ContactPage from '@/components/pages/ContactPage';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 767) setIsMenuOpen(false);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      
      <main>
        <Hero />
        <AboutPage />
        <Stats />
        <BusinessPage />
        <CasesPage />
        {/* <ProductsPage /> */}
        <WikiPage />
        <ContactPage />
      </main>

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-6">
          {/* 顶部区域 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
            {/* 公司信息 */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-2xl">
                  🚢
                </div>
                <div>
                  <h3 className="text-2xl font-bold">华顺船务</h3>
                  <p className="text-sm text-gray-400">全球物流解决方案专家</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed text-sm">
                专注国际物流18年，服务网络覆盖全球200+个港口，致力于持续为全球客户提供专业化、个性化、全面化的全球物流运输解决方案。
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <span className="text-xl">📱</span>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <span className="text-xl">✉️</span>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                  <span className="text-xl">💬</span>
                </a>
              </div>
            </div>

            {/* 快速导航 */}
            <div>
              <h4 className="text-lg font-bold mb-6 pb-2 border-b-2 border-blue-500">快速导航</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#about" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2">
                    <span className="text-blue-400">→</span> 关于我们
                  </a>
                </li>
                <li>
                  <a href="#business" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2">
                    <span className="text-blue-400">→</span> 主营业务
                  </a>
                </li>
                <li>
                  <a href="#cases" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2">
                    <span className="text-blue-400">→</span> 成功案例
                  </a>
                </li>
                <li>
                  <a href="#wiki" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2">
                    <span className="text-blue-400">→</span> 航贸百科
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-300 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2">
                    <span className="text-blue-400">→</span> 联系我们
                  </a>
                </li>
              </ul>
            </div>

            {/* 联系方式 */}
            <div>
              <h4 className="text-lg font-bold mb-6 pb-2 border-b-2 border-blue-500">联系我们</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 text-xl flex-shrink-0">📞</span>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">客服热线</p>
                    <p className="text-white font-semibold">+86 159 0073 6092</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 text-xl flex-shrink-0">✉️</span>
                  <div className="min-w-0">
                    <p className="text-sm text-gray-400 mb-1">商务邮箱</p>
                    <p className="text-white font-semibold text-sm break-all">chartering@yewstar.com.cn</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 text-xl flex-shrink-0">📍</span>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">公司地址</p>
                    <p className="text-white font-semibold text-sm leading-relaxed">天津市河西区合肥道11号<br/>富力中心A座1807室</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* 分割线 */}
          <div className="border-t border-white/10 my-3"></div>

          {/* 底部区域 */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-1 md:gap-2 text-center md:text-left pb-1">
            <p className="text-gray-400 text-sm">
              © 2019-2025 华顺船务有限公司 版权所有 | 赣ICP备2025054128号
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">隐私政策</a>
              <span>|</span>
              <a href="#" className="hover:text-white transition-colors">服务条款</a>
              <span>|</span>
              <a href="#" className="hover:text-white transition-colors">网站地图</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}