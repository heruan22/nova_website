import { NextResponse } from 'next/server';
import mysql, { RowDataPacket } from 'mysql2/promise';

type DashboardStatsItem = {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'flat';
  icon: string;
};
type RecentOrder = {
  id: string;
  customer: string;
  cargo: string;
  volume: string;
  status: string;
  date: string;
};

const MILLION = 1000000;

const globalForMysql = global as unknown as { dashboardPool?: mysql.Pool };
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
if (!globalForMysql.dashboardPool) globalForMysql.dashboardPool = dashboardPool;

function formatCurrency(value: number | string | null | undefined) {
  const amount = Number(value) || 0;
  if (amount >= MILLION) return `¥${(amount / MILLION).toFixed(1)}M`;
  if (amount >= 10000) return `¥${(amount / 10000).toFixed(1)}万`;
  return `¥${amount.toFixed(0)}`;
}

const fallbackData: { stats: DashboardStatsItem[]; recentOrders: RecentOrder[] } = {
  stats: [
    { label: '本月订单', value: '0', change: '+0%', trend: 'flat', icon: '📦' },
    { label: '运输中', value: '0', change: '+0%', trend: 'flat', icon: '🚢' },
    { label: '本月收入', value: '¥0', change: '+0%', trend: 'flat', icon: '💰' },
    { label: '客户总数', value: '0', change: '+0%', trend: 'flat', icon: '👥' },
  ],
  recentOrders: [],
};

export async function GET() {
  const dbConfigured = process.env.DB_HOST && process.env.DB_USER && process.env.DB_NAME;
  if (!dbConfigured) {
    console.log('[Business] DB not configured, returning fallback');
    return NextResponse.json(fallbackData);
  }
  try {
    const [aggRows] = await dashboardPool.query<RowDataPacket[]>(
      `SELECT
         SUM(CASE WHEN DATE_FORMAT(order_date, '%Y-%m') = DATE_FORMAT(CURDATE(), '%Y-%m') THEN 1 ELSE 0 END) AS monthly_orders,
         SUM(CASE WHEN status = '运输中' THEN 1 ELSE 0 END) AS in_transit,
         SUM(CASE WHEN DATE_FORMAT(order_date, '%Y-%m') = DATE_FORMAT(CURDATE(), '%Y-%m') THEN IFNULL(total_amount, 0) ELSE 0 END) AS monthly_revenue
       FROM orders`
    );
    const agg = aggRows?.[0] || { monthly_orders: 0, in_transit: 0, monthly_revenue: 0 };
    const [custRows] = await dashboardPool.query<RowDataPacket[]>(`SELECT COUNT(*) AS total_customers FROM customers`);
    const totalCustomers = custRows?.[0]?.total_customers ?? 0;
    const stats: DashboardStatsItem[] = [
      { label: '本月订单', value: String(agg.monthly_orders || 0), change: '+0%', trend: 'up', icon: '📦' },
      { label: '运输中', value: String(agg.in_transit || 0), change: '+0%', trend: 'up', icon: '🚢' },
      { label: '本月收入', value: formatCurrency(agg.monthly_revenue), change: '+0%', trend: 'up', icon: '💰' },
      { label: '客户总数', value: String(totalCustomers), change: '+0%', trend: 'up', icon: '👥' },
    ];
    const [recentRows] = await dashboardPool.query<RowDataPacket[]>(
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
    const recentOrders: RecentOrder[] = Array.isArray(recentRows)
      ? recentRows.map(r => ({
          id: String(r.id ?? ''),
          customer: String(r.customer ?? '-'),
          cargo: String(r.cargo ?? '-'),
          volume: String(r.volume ?? '-'),
          status: String(r.status ?? '-'),
          date: String(r.date ?? '-'),
        }))
      : [];
    return NextResponse.json({ stats, recentOrders });
  } catch (err: any) {
    console.error('[Business] query failed:', err);
    return NextResponse.json(fallbackData);
  }
}

