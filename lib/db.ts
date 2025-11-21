import mysql from 'mysql2/promise';

/**
 * 创建MySQL数据库连接
 * Create MySQL database connection
 * 从环境变量读取数据库配置
 * Read database configuration from environment variables
 */
export async function getConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    return connection;
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}

/**
 * 创建MySQL连接池（推荐用于生产环境）
 * Create MySQL connection pool (recommended for production)
 */
export function createPool() {
  return mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
}
