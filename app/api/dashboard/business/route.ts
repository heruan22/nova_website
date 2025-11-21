import { NextResponse } from 'next/server';
import { getConnection } from '@/lib/db';

// Mock数据 - 当数据库不可用时使用
const mockData = {
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

export async function GET(req: Request) {
  try {
    // 检查数据库配置是否存在
    const dbConfigured = process.env.DB_HOST && process.env.DB_USER && process.env.DB_NAME;

    if (!dbConfigured) {
      console.log('Database not configured, using mock data');
      return NextResponse.json(mockData);
    }

    // 连接MySQL数据库获取真实数据
    const connection = await getConnection();

    try {
      // 获取本月订单统计
      const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
      const [monthOrdersResult] = await connection.execute(
        'SELECT COUNT(*) as count FROM orders WHERE DATE_FORMAT(order_date, "%Y-%m") = ?',
        [currentMonth]
      );
      const monthOrders = (monthOrdersResult as any)[0]?.count || 0;

      // 获取运输中订单数
      const [shippingResult] = await connection.execute(
        'SELECT COUNT(*) as count FROM orders WHERE status = ?',
        ['运输中']
      );
      const shippingOrders = (shippingResult as any)[0]?.count || 0;

      // 获取本月收入
      const [revenueResult] = await connection.execute(
        'SELECT COALESCE(SUM(total_amount), 0) as total FROM orders WHERE DATE_FORMAT(order_date, "%Y-%m") = ? AND status != ?',
        [currentMonth, '已取消']
      );
      const revenue = (revenueResult as any)[0]?.total || 0;

      // 获取客户总数
      const [customersResult] = await connection.execute(
        'SELECT COUNT(*) as count FROM customers'
      );
      const totalCustomers = (customersResult as any)[0]?.count || 0;

      // 获取最近订单
      const [ordersRows] = await connection.execute(
        `SELECT 
          order_number as id, 
          customer_name as customer, 
          cargo_type as cargo, 
          cargo_volume as volume, 
          status, 
          DATE_FORMAT(order_date, "%Y-%m-%d") as date 
        FROM orders 
        ORDER BY order_date DESC 
        LIMIT 5`
      );

      const data = {
        stats: [
          { label: '本月订单', value: monthOrders.toString(), change: '+12%', trend: 'up', icon: '📦' },
          { label: '运输中', value: shippingOrders.toString(), change: '+5%', trend: 'up', icon: '🚢' },
          { label: '本月收入', value: `¥${(revenue / 1000000).toFixed(1)}M`, change: '+18%', trend: 'up', icon: '💰' },
          { label: '客户总数', value: totalCustomers.toString(), change: '+8%', trend: 'up', icon: '👥' },
        ],
        recentOrders: ordersRows,
      };

      return NextResponse.json(data);
    } finally {
      await connection.end();
    }
  } catch (error: any) {
    console.error('Business dashboard error:', error);
    // 数据库连接失败时返回mock数据
    console.log('Falling back to mock data due to database error');
    return NextResponse.json(mockData);
  }
}
