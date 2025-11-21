import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    // TODO: 从MySQL数据库获取船期数据
    const data = {
      schedules: [
        {
          id: 1,
          vesselName: 'NOVA STAR',
          voyage: 'NS3956',
          portFrom: '天津',
          portTo: '加尔各答',
          etd: '2025-12-15',
          eta: '2025-12-30',
          capacity: 35000,
          booked: 27000,
          status: '收货中',
        },
        {
          id: 2,
          vesselName: 'HUASHUN 17',
          voyage: 'HS9792',
          portFrom: '天津',
          portTo: '杰贝阿里',
          etd: '2025-12-20',
          eta: '2026-01-25',
          capacity: 55000,
          booked: 38000,
          status: '收货中',
        },
        {
          id: 3,
          vesselName: 'SEA DRAGON',
          voyage: 'SD2467',
          portFrom: '天津',
          portTo: '德班',
          etd: '2025-12-10',
          eta: '2026-01-20',
          capacity: 52000,
          booked: 49000,
          status: '舱位紧张',
        },
      ],
    };

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Schedule dashboard error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch schedule data' },
      { status: 500 }
    );
  }
}
