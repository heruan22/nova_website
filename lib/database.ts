import mysql, { Pool, RowDataPacket, PoolOptions } from 'mysql2/promise';

const globalForDatabase = globalThis as unknown as { __dbPool?: Pool };

function getPool(): Pool {
  if (!globalForDatabase.__dbPool) {
    const config: PoolOptions = {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'novamax',
      waitForConnections: true,
      connectionLimit: parseInt(process.env.DB_POOL_LIMIT || '10', 10),
      queueLimit: 0,
    };
    globalForDatabase.__dbPool = mysql.createPool(config);
  }
  return globalForDatabase.__dbPool!;
}

export async function query<T extends RowDataPacket[] = RowDataPacket[]>(sql: string, params?: any[]): Promise<T> {
  try {
    const pool = getPool();
    const [rows] = await pool.execute<T>(sql, params);
    return rows;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

export async function getConnection() {
  try {
    const pool = getPool();
    return await pool.getConnection();
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}

// 添加关闭连接池的函数（在应用关闭时调用）
export async function closePool(): Promise<void> {
  if (globalForDatabase.__dbPool) {
    await globalForDatabase.__dbPool.end();
    globalForDatabase.__dbPool = undefined;
  }
}

export default getPool;
