'use client';

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-gradient-to-r from-blue-900 to-blue-800">
      {/* Background image */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1519914592046-b0d6ba7c51c1?q=80&w=2000&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <h1 className="text-5xl font-bold md:text-7xl mb-6">
          全球物流解决方案专家
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl">
          致力于为全球客户提供专业化、个性化、一站式的全球物流运输解决方案
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <button className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-lg font-semibold transition">
            立即咨询
          </button>
          <button className="border-2 border-white hover:bg-white hover:text-blue-900 px-8 py-3 rounded-lg font-semibold transition">
            了解服务
          </button>
        </div>
      </div>
    </section>
  );
}
