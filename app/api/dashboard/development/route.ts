import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    // TODO: 从MySQL数据库获取客户开发数据
    const data = {
      stats: {
        totalLeads: 156,
        newThisMonth: 28,
        converted: 42,
        conversionRate: 27,
      },
      leads: [
        {
          id: 1,
          company: '江苏钢铁集团',
          contact: '张经理',
          phone: '138****8888',
          source: '网站咨询',
          stage: '初次接触',
          potential: '高',
          assignedTo: '李明',
          createdAt: '2025-11-18',
        },
        {
          id: 2,
          company: '深圳科技有限公司',
          contact: '王总',
          phone: '139****9999',
          source: '展会',
          stage: '需求确认',
          potential: '中',
          assignedTo: '王芳',
          createdAt: '2025-11-17',
        },
      ],
    };

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Development dashboard error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch development data' },
      { status: 500 }
    );
  }
}
