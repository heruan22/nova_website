import { NextResponse } from 'next/server';
import mysql, { RowDataPacket } from 'mysql2/promise';

type DashboardStats = Array<{
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'flat';
  icon: string;
}>;

type RecentOrder = {
  id: string;
  customer: string;
  cargo: string;
  volume: string;
  status: string;
  date: string;
};

const MILLION = 1000000;

const globalForMysql = global as unknown as {
  dashboardPool?: mysql.Pool;
};

const dashboardPool =
  globalForMysql.dashboardPool ||
  mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '89757',
    database: process.env.DB_NAME || 'huashun',
    waitForConnections: true,
    connectionLimit: parseInt(process.env.DB_POOL_LIMIT || '10', 10),
    queueLimit: 0,
  });

if (!globalForMysql.dashboardPool) {
  globalForMysql.dashboardPool = dashboardPool;
}

const fallbackData = {
  stats: [
    { label: '本月订单', value: '156', change: '+12%', trend: 'up' as const, icon: '📦' },
    { label: '运输中', value: '89', change: '+5%', trend: 'up' as const, icon: '🚢' },
    { label: '本月收入', value: '¥2.8M', change: '+18%', trend: 'up' as const, icon: '💰' },
    { label: '客户总数', value: '342', change: '+8%', trend: 'up' as const, icon: '👥' },
  ],
  recentOrders: [
    { id: 'ORD-2025-001', customer: '上海钢铁有限公司', cargo: '热轧卷板', volume: '500吨', status: '运输中', date: '2025-11-18' },
    { id: 'ORD-2025-002', customer: '宁波化工集团', cargo: '化工吨包', volume: '280吨', status: '已装船', date: '2025-11-19' },
    { id: 'ORD-2025-003', customer: '天津机械厂', cargo: '工程车辆', volume: '12台', status: '待装船', date: '2025-11-20' },
    { id: 'ORD-2025-004', customer: '青岛贸易公司', cargo: '钢材型材', volume: '350吨', status: '运输中', date: '2025-11-17' },
    { id: 'ORD-2025-005', customer: '大连物流', cargo: '集装箱货物', volume: '45FEU', status: '已完成', date: '2025-11-15' },
  ] as RecentOrder[],
};

function formatCurrency(value: number | string | null | undefined) {
  const amount = Number(value) || 0;
  if (amount >= MILLION) {
    return `¥${(amount / MILLION).toFixed(1)}M`;
  }
  if (amount >= 10000) {
    return `¥${(amount / 10000).toFixed(1)}万`;
  }
  return `¥${amount.toFixed(0)}`;
}

export async function GET() {
  const dbConfigured = process.env.DB_HOST && process.env.DB_USER && process.env.DB_NAME;

  if (!dbConfigured) {
    console.log('Database not configured, using fallback data');
    return NextResponse.json(fallbackData);
  }

  try {
    const [orderAggRows] = await dashboardPool.query<RowDataPacket[]>(
      `SELECT
         SUM(CASE WHEN DATE_FORMAT(order_date, '%Y-%m') = DATE_FORMAT(CURDATE(), '%Y-%m') THEN 1 ELSE 0 END) AS monthly_orders,
         SUM(CASE WHEN status = '运输中' THEN 1 ELSE 0 END) AS in_transit,
         SUM(CASE WHEN DATE_FORMAT(order_date, '%Y-%m') = DATE_FORMAT(CURDATE(), '%Y-%m') THEN IFNULL(total_amount, 0) ELSE 0 END) AS monthly_revenue
       FROM orders`
    );

    const orderAgg = orderAggRows?.[0] || {
      monthly_orders: 0,
      in_transit: 0,
      monthly_revenue: 0,
    };

    const [customerCountRows] = await dashboardPool.query<RowDataPacket[]>(
      `SELECT COUNT(*) AS total_customers FROM customers`
    );
    const totalCustomers = customerCountRows?.[0]?.total_customers ?? 0;

    const stats: DashboardStats = [
      {
        label: '本月订单',
        value: String(orderAgg.monthly_orders ?? 0),
        change: '+12%',
        trend: 'up',
        icon: '📦',
      },
      {
        label: '运输中',
        value: String(orderAgg.in_transit ?? 0),
        change: '+5%',
        trend: 'up',
        icon: '🚢',
      },
      {
        label: '本月收入',
        value: formatCurrency(orderAgg.monthly_revenue),
        change: '+18%',
        trend: 'up',
        icon: '💰',
      },
      {
        label: '客户总数',
        value: String(totalCustomers),
        change: '+8%',
        trend: 'up',
        icon: '👥',
      },
    ];

    const [recentOrderRows] = await dashboardPool.query<RowDataPacket[]>(
      `SELECT
         order_number AS id,
         customer_name AS customer,
         cargo_type AS cargo,
         IFNULL(cargo_volume, '-') AS volume,
         status,
         DATE_FORMAT(order_date, '%Y-%m-%d') AS date
       FROM orders
       ORDER BY order_date DESC
       LIMIT 5`
    );

    const recentOrders: RecentOrder[] = Array.isArray(recentOrderRows)
      ? recentOrderRows.map(row => ({
          id: String(row.id ?? ''),
          customer: String(row.customer ?? '-'),
          cargo: String(row.cargo ?? '-'),
          volume: String(row.volume ?? '-'),
          status: String(row.status ?? '-'),
          date: String(row.date ?? '-'),
        }))
      : [];

    return NextResponse.json({
      stats,
      recentOrders,
    });
  } catch (error: any) {
    console.error('Business dashboard error:', error);
    console.log('Falling back to mock data due to database error');
    return NextResponse.json(fallbackData);
  }
}
