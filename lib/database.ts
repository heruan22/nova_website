import mysql, { Pool, RowDataPacket } from 'mysql2/promise';

const globalForDatabase = global as unknown as { __dbPool?: Pool };

function getPool(): Pool {
  if (!globalForDatabase.__dbPool) {
    globalForDatabase.__dbPool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '89757',
      database: process.env.DB_NAME || 'NOVA',
      waitForConnections: true,
      connectionLimit: parseInt(process.env.DB_POOL_LIMIT || '10', 10),
      queueLimit: 0,
    });
  }
  return globalForDatabase.__dbPool!;
}

export async function query<T = RowDataPacket[]>(sql: string, params?: any) {
  const pool = getPool();
  return pool.query<T>(sql, params);
}

export async function getConnection() {
  const pool = getPool();
  return pool.getConnection();
}

export default getPool;
