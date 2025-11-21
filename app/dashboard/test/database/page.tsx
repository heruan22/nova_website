import React from 'react';

async function fetchQuotations() {
  try {
    const res = await fetch('/api/dashboard/database', { cache: 'no-store' });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error || 'Failed to fetch');
    }
    const json = await res.json();
    return json.data || [];
  } catch (e) {
    console.error('Fetch quotations error:', e);
    return [];
  }
}

export default async function DatabasePage() {
  const rows = await fetchQuotations();

  const columns = rows.length > 0 ? Object.keys(rows[0]) : [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">数据库（quotation）</h1>
      {rows.length === 0 ? (
        <p>没有可显示的数据或无法连接数据库。</p>
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
