import { NextResponse } from 'next/server';
import mysql, { RowDataPacket } from 'mysql2/promise';

const globalForMysql = global as unknown as {
  testPool?: mysql.Pool;
};

const testPool =
  globalForMysql.testPool ||
  mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '89757',
    database: process.env.DB_NAME || 'freedom',
    waitForConnections: true,
    connectionLimit: parseInt(process.env.DB_POOL_LIMIT || '10', 10),
    queueLimit: 0,
  });

if (!globalForMysql.testPool) {
  globalForMysql.testPool = testPool;
}

export async function GET() {
  try {
    const [rows] = await testPool.query<RowDataPacket[]>(
      'SELECT * FROM orders ORDER BY order_date DESC LIMIT 3'
    );

    return NextResponse.json({
      success: true,
      data: rows,
    });
  } catch (error: any) {
    console.error('Test dashboard error:', error);
    return NextResponse.json(
      {
        success: false,
        error: process.env.NODE_ENV === 'development' ? error.message : '获取测试数据失败',
      },
      { status: 500 }
    );
  }
}
