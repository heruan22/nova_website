'use client';

import { useEffect, useState } from 'react';

type TestRow = Record<string, any>;

type ApiResponse = {
  success: boolean;
  data?: TestRow[];
  error?: string;
};

export default function TestPage() {
  const [rows, setRows] = useState<TestRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const response = await fetch('/api/dashboard/test');
        const result: ApiResponse = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.error || '获取测试数据失败');
        }

        setRows(result.data || []);
      } catch (err: any) {
        setError(err?.message || '获取测试数据失败');
      } finally {
        setLoading(false);
      }
    };

    fetchTestData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">测试页面</h1>
          <p className="text-gray-600 mt-1">展示数据库 huashun.orders 表的最近三条记录</p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/dashboard/test/mysq"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            查看 MYSQ
          </a>
          <button
            onClick={() => location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            重新加载
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">数据预览</h3>
        </div>
        <div className="p-6">
          {loading ? (
            <div className="text-gray-600">加载中...</div>
          ) : error ? (
            <div className="text-red-600">{error}</div>
          ) : rows.length === 0 ? (
            <div className="text-gray-600">表中没有数据。</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-700">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                  <tr>
                    {Object.keys(rows[0]).map((key) => (
                      <th key={key} className="px-4 py-3 border-b border-gray-200">
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-gray-50">
                      {Object.entries(row).map(([key, value]) => (
                        <td key={key} className="px-4 py-3">
                          {formatCellValue(value)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function formatCellValue(value: any) {
  if (value === null || value === undefined) {
    return '—';
  }

  if (value instanceof Date) {
    return value.toLocaleString();
  }

  if (typeof value === 'object') {
    try {
      return JSON.stringify(value);
    } catch (error) {
      return String(value);
    }
  }

  return String(value);
}
