import { NextResponse } from 'next/server';

// Mock数据 - 生产环境应该从MySQL数据库获取
export async function GET(req: Request) {
  try {
    // TODO: 连接MySQL数据库获取真实数据
    // const connection = await mysql.createConnection({
    //   host: process.env.DB_HOST,
    //   user: process.env.DB_USER,
    //   password: process.env.DB_PASSWORD,
    //   database: process.env.DB_NAME,
    // });

    const data = {
      stats: [
        { label: '本月订单', value: '156', change: '+12%', trend: 'up', icon: '📦' },
        { label: '运输中', value: '89', change: '+5%', trend: 'up', icon: '🚢' },
        { label: '本月收入', value: '¥2.8M', change: '+18%', trend: 'up', icon: '💰' },
        { label: '客户总数', value: '342', change: '+8%', trend: 'up', icon: '👥' },
      ],
      recentOrders: [
        { id: 'ORD-2025-001', customer: '上海钢铁有限公司', cargo: '热轧卷板', volume: '500吨', status: '运输中', date: '2025-11-18' },
        { id: 'ORD-2025-002', customer: '宁波化工集团', cargo: '化工吨包', volume: '280吨', status: '已装船', date: '2025-11-19' },
        { id: 'ORD-2025-003', customer: '天津机械厂', cargo: '工程车辆', volume: '12台', status: '待装船', date: '2025-11-20' },
        { id: 'ORD-2025-004', customer: '青岛贸易公司', cargo: '钢材型材', volume: '350吨', status: '运输中', date: '2025-11-17' },
        { id: 'ORD-2025-005', customer: '大连物流', cargo: '集装箱货物', volume: '45FEU', status: '已完成', date: '2025-11-15' },
      ],
    };

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Business dashboard error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch business data' },
      { status: 500 }
    );
  }
}
