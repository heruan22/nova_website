const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function run() {
  try {
    const cfg = {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || undefined,
      connectionLimit: parseInt(process.env.DB_POOL_LIMIT || '5', 10),
    };

    console.log('Using DB config:', { host: cfg.host, port: cfg.port, user: cfg.user, database: cfg.database });

    const pool = mysql.createPool(cfg);

    // Try querying the configured database first
    try {
      const [rows] = await pool.query('SELECT * FROM quotation LIMIT 5');
      console.log('Query result from configured DB:', rows);
      await pool.end();
      return;
    } catch (err) {
      console.error('Error querying configured DB:', err && err.message);
      // Try fallback to novamax.quotation if database differs
      try {
        const [rows2] = await pool.query('SELECT * FROM novamax.quotation LIMIT 5');
        console.log('Fallback query result from novamax.quotation:', rows2);
        await pool.end();
        return;
      } catch (err2) {
        console.error('Fallback query error:', err2 && err2.message);
        console.error('Full error:', err2);
        await pool.end();
        process.exit(2);
      }
    }
  } catch (error) {
    console.error('Connection error:', error && error.message);
    console.error(error);
    process.exit(1);
  }
}

run();
