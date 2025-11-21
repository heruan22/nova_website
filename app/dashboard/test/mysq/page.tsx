import React from 'react';

async function fetchMysq() {
  try {
    const origin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${origin}/api/dashboard/mysq`, { cache: 'no-store' });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error || 'Failed to fetch');
    }
    const json = await res.json();
    return json.data || [];
  } catch (e) {
    console.error('Fetch MYSQ error:', e);
    return [];
  }
}

export default async function MYSQPage() {
  const rows = await fetchMysq();
  const columns = rows.length > 0 ? Object.keys(rows[0]) : [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">MYSQ - quotation（前 5 行）</h1>
      {rows.length === 0 ? (
        <div>
          <p className="mb-4">没有可显示的数据或无法连接数据库。下面显示示例数据，帮助你查看展示效果：</p>
          <div className="overflow-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr>
                  <th className="border px-2 py-1">quotation_id</th>
                  <th className="border px-2 py-1">customer</th>
                  <th className="border px-2 py-1">amount</th>
                  <th className="border px-2 py-1">created_at</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="even:bg-gray-50">
                    <td className="border px-2 py-1">Q{1000 + i}</td>
                    <td className="border px-2 py-1">示例客户 {i}</td>
                    <td className="border px-2 py-1">{(1000 + i) * 1.5}</td>
                    <td className="border px-2 py-1">2025-11-2{i} 12:00</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="overflow-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col} className="border px-2 py-1 text-left">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row: any, idx: number) => (
                <tr key={idx} className="even:bg-gray-50">
                  {columns.map((col) => (
                    <td key={col} className="border px-2 py-1">
                      {String(row[col] ?? '')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
