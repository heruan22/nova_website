export default function BrandStory() {
    return (
      <section id="brand" className="py-20">
        <div className="rounded-xl bg-gray-50 p-8 dark:bg-gray-900 md:p-12">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <div className="h-80 overflow-hidden rounded-lg bg-red-100 md:h-full">
                <div className="flex h-full items-center justify-center">
                  <span className="font-medium text-red-800">双汇工厂实景图</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 md:ml-12 md:mt-0 md:w-2/5">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
                品牌故事
              </h2>
              
              <div className="mt-8 space-y-8">
                {/* 品牌历史卡片 */}
                <div className="rounded-lg border-l-4 border-red-700 bg-white p-6 shadow-sm dark:bg-gray-800">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    三十年匠心传承
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    双汇创立于1992年，从河南漯河的一家小型肉联厂起步，逐步发展成为中国最大的肉制品企业。三十年来，我们始终坚持"品质第一"的理念，为亿万家庭提供安全美味的食品。
                  </p>
                </div>
                
                {/* 企业规模卡片 */}
                <div className="rounded-lg border-l-4 border-red-700 bg-white p-6 shadow-sm dark:bg-gray-800">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    行业领先的规模
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    双汇在全国拥有<span className="font-semibold text-red-700">12家</span>现代化生产基地，
                    <span className="font-semibold text-red-700">5000+</span>家专卖店，
                    产品远销<span className="font-semibold text-red-700">30多个</span>国家和地区。
                    年屠宰生猪能力超过2000万头，肉制品年产量超过300万吨。
                  </p>
                </div>
                
                {/* 核心价值观卡片 */}
                <div className="rounded-lg border-l-4 border-red-700 bg-white p-6 shadow-sm dark:bg-gray-800">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    品质铸就信任
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    "诚信立企，德行天下"是双汇的核心价值观。我们建立了从"农场到餐桌"的全产业链质量管控体系，确保每一份产品都安全可靠。双汇不仅是食品生产者，更是健康生活方式的倡导者。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }