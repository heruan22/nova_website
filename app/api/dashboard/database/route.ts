import { NextResponse } from 'next/server';
import { query } from '@/lib/database';

export async function GET() {
  try {
    try {
      const [rows] = await query('SELECT * FROM quotation LIMIT 5');
      return NextResponse.json({ success: true, data: rows });
    } catch (err: any) {
      const isNoSuchTable = err && (err.code === 'ER_NO_SUCH_TABLE' || String(err.message).includes("doesn't exist") || String(err.message).includes('does not exist'));
      if (isNoSuchTable) {
        try {
          const [rows] = await query('SELECT * FROM novamax.quotation LIMIT 5');
          return NextResponse.json({ success: true, data: rows });
        } catch (err2: any) {
          console.error('Fallback query error:', err2);
          if (process.env.NODE_ENV === 'development') console.error(err2.stack);
          return NextResponse.json({ success: false, error: (err2 && err2.message) || String(err2), code: err2?.code, errno: err2?.errno, sqlMessage: err2?.sqlMessage }, { status: 500 });
        }
      }
      throw err;
    }
  } catch (error: any) {
    console.error('Dashboard database error:', error);
    if (process.env.NODE_ENV === 'development') {
      console.error(error.stack);
    }
    return NextResponse.json({ success: false, error: (error && error.message) || String(error), name: error?.name, code: error?.code, errno: error?.errno, sqlMessage: error?.sqlMessage, sqlState: error?.sqlState, stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined }, { status: 500 });
  }
}
