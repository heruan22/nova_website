import { NextResponse } from 'next/server';
import { query } from '@/lib/database';

export async function GET() {
  try {
    const [rows] = await query('SELECT * FROM quotation LIMIT 5');
    return NextResponse.json({ success: true, data: rows });
  } catch (error: any) {
    console.error('MYSQ API error:', error);
    return NextResponse.json(
      { success: false, error: (error && error.message) || String(error), code: error?.code },
      { status: 500 }
    );
  }
}
