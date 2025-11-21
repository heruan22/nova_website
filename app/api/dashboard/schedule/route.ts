import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    // TODO: 从MySQL数据库获取船期数据
    const data = {
      schedules: [
        {
          id: 1,
          vesselName: 'NOVA STAR',
          voyage: 'NS2025-11',
          portFrom: '天津新港',
          portTo: '新加坡',
          etd: '2025-11-25',
          eta: '2025-12-05',
          capacity: 15000,
          booked: 12500,
          status: '订舱中',
        },
        {
          id: 2,
          vesselName: 'OCEAN PIONEER',
          voyage: 'OP2025-08',
          portFrom: '上海港',
          portTo: '洛杉矶',
          etd: '2025-11-28',
          eta: '2025-12-15',
          capacity: 22000,
          booked: 18000,
          status: '订舱中',
        },
        {
          id: 3,
          vesselName: 'SEA DRAGON',
          voyage: 'SD2025-15',
          portFrom: '宁波港',
          portTo: '汉堡',
          etd: '2025-11-22',
          eta: '2025-12-20',
          capacity: 18000,
          booked: 17200,
          status: '即将截关',
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
