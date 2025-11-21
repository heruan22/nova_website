import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    // TODO: 从MySQL数据库获取客户池数据
    const data = {
      stats: {
        total: 342,
        active: 156,
        inactive: 98,
        vip: 88,
      },
      customers: [
        {
          id: 1,
          company: '上海钢铁集团',
          contact: '张总',
          phone: '138****8888',
          email: 'zhang@example.com',
          category: 'VIP',
          industry: '钢铁贸易',
          lastOrder: '2025-11-15',
          totalOrders: 45,
          totalRevenue: '¥5.8M',
          status: '活跃',
          assignedTo: '李明',
        },
        {
          id: 2,
          company: '宁波化工有限公司',
          contact: '王经理',
          phone: '139****9999',
          email: 'wang@example.com',
          category: 'A类',
          industry: '化工',
          lastOrder: '2025-11-18',
          totalOrders: 32,
          totalRevenue: '¥3.2M',
          status: '活跃',
          assignedTo: '王芳',
        },
      ],
    };

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Pool dashboard error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch pool data' },
      { status: 500 }
    );
  }
}
