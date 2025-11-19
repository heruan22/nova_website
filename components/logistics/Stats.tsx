'use client';

export default function Stats() {
  const stats = [
    { number: '18', label: '18年稳步发展' },
    { number: '500000+', label: '年出口量（计费吨）' },
    { number: '1000+', label: '全球合作伙伴' },
    { number: '7*24', label: '小时快速响应' },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-12 rounded-2xl shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <p className="text-4xl font-bold mb-2">{stat.number}</p>
                <p className="text-blue-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
