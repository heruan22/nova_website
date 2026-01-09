// 初始化船期表数据库
require('dotenv').config({ path: '.env.local' });
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function initScheduleTable() {
  let connection;
  
  try {
    // 创建数据库连接
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      multipleStatements: true
    });

    console.log('✓ 数据库连接成功');

    // 读取SQL文件
    const sqlFilePath = path.join(__dirname, 'create-schedule-table.sql');
    const sql = fs.readFileSync(sqlFilePath, 'utf8');

    // 执行SQL
    await connection.query(sql);
    
    console.log('✓ 船期表创建成功');
    console.log('✓ 示例数据插入成功');
    console.log('\n表结构:');
    console.log('- id: 主键');
    console.log('- vessel: 船名');
    console.log('- eta: 预计到达时间');
    console.log('- pol: 装货港');
    console.log('- pod: 卸货港');
    console.log('- route: 航线');
    console.log('- created_at: 创建时间');
    console.log('- updated_at: 更新时间');

  } catch (error) {
    console.error('✗ 初始化失败:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n✓ 数据库连接已关闭');
    }
  }
}

initScheduleTable();
