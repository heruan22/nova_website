'use client';

import { useState, useEffect } from 'react';

export default function SchedulePage() {
  const [schedules, setSchedules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScheduleData();
  }, []);

  const fetchScheduleData = async () => {
    try {
      const response = await fetch('/api/dashboard/schedule');
      const result = await response.json();
      setSchedules(result.schedules || mockSchedules);
    } catch (error) {
      console.error('Failed to fetch schedule data:', error);
      setSchedules(mockSchedules);
    } finally {
      setLoading(false);
    }
  };

  const mockSchedules = [
    {
      id: 1,
      vesselName: 'NOVA STAR',
      voyage: 'NS2025-11',
      portFrom: '天津新港',
      portTo: '海防',
      etd: '2025-11-28',
      eta: '2025-12-05',
      capacity: 35000,
      booked: 33000,
      status: '舱位紧张',
    },
    {
      id: 2,
      vesselName: 'OCEAN PIONEER',
      voyage: 'OP2025-08',
      portFrom: '天津港',
      portTo: '杰贝阿里',
      etd: '2025-12-10',
      eta: '2026-01-15',
      capacity: 55000,
      booked: 35000,
      status: '收货中',
    },
    {
      id: 3,
      vesselName: 'SEA DRAGON',
      voyage: 'SD2025-15',
      portFrom: '天津港',
      portTo: '德班',
      etd: '2025-12-15',
      eta: '2026-01-25',
      capacity: 60000,
      booked: 45000,
      status: '收货中',
    },
    {
      id: 4,
      vesselName: 'GLOBAL CARRIER',
      voyage: 'GC2025-12',
      portFrom: '天津港',
      portTo: '卡亚俄',
      etd: '2025-12-30',
      eta: '2026-02-10',
      capacity: 50000,
      booked: 15000,
      status: '收货中',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-600">加载中...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">船期看板</h1>
          <p className="text-gray-600 mt-1">实时船期信息与舱位管理</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
            筛选
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            新增船期
          </button>
        </div>
      </div>

      {/* 统计概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: '活跃航线', value: '24', icon: '🌐' },
          { label: '本月航次', value: '86', icon: '🚢' },
          { label: '揽货进度', value: '78%', icon: '📊' },
          { label: '即将开航', value: '12', icon: '⏱️' },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{stat.icon}</div>
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 船期列表 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">船名</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">航次</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">起运港</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">目的港</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">开航日期</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">到港日期</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">舱位情况</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">状态</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {schedules.map((schedule) => {
                const bookingRate = (schedule.booked / schedule.capacity) * 100;
                return (
                  <tr key={schedule.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-semibold text-gray-900">{schedule.vesselName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{schedule.voyage}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{schedule.portFrom}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{schedule.portTo}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{schedule.etd}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{schedule.eta}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-100 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                bookingRate > 90 ? 'bg-red-600' :
                                bookingRate > 70 ? 'bg-yellow-600' :
                                'bg-green-600'
                              }`}
                              style={{ width: `${bookingRate}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-semibold text-gray-700">
                            {Math.round(bookingRate)}%
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {schedule.booked.toLocaleString()} / {schedule.capacity.toLocaleString()} 吨
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        schedule.status === '收货中' ? 'bg-green-100 text-green-700' :
                        schedule.status === '舱位紧张' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {schedule.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-blue-600 hover:text-blue-700 font-medium">
                        查看详情
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
