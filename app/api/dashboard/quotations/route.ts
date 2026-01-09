import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

interface QuotationData {
  id?: number;
  route_name: string;
  pol: string;
  pod: string;
  freight_20gp: string;
  freight_40gp: string;
  freight_40hq: string;
  shipping_line: string;
  transit_time: string;
  validity_start: string;
  validity_end: string;
  remarks: string;
  status: string;
}

// GET - 获取所有报价
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const pol = searchParams.get('pol');
    const pod = searchParams.get('pod');

    let query = 'SELECT * FROM quotations WHERE 1=1';
    const params: any[] = [];

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }
    if (pol) {
      query += ' AND pol LIKE ?';
      params.push(`%${pol}%`);
    }
    if (pod) {
      query += ' AND pod LIKE ?';
      params.push(`%${pod}%`);
    }

    query += ' ORDER BY validity_end DESC';

    const [rows] = await pool.query<RowDataPacket[]>(query, params);
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error('获取报价失败:', error);
    return NextResponse.json(
      { success: false, message: '获取数据失败' },
      { status: 500 }
    );
  }
}

// POST - 添加新报价
export async function POST(request: NextRequest) {
  try {
    const body: QuotationData = await request.json();
    const {
      route_name, pol, pod, freight_20gp, freight_40gp, freight_40hq,
      shipping_line, transit_time, validity_start, validity_end, remarks, status
    } = body;

    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO quotations 
      (route_name, pol, pod, freight_20gp, freight_40gp, freight_40hq, shipping_line, transit_time, validity_start, validity_end, remarks, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [route_name, pol, pod, freight_20gp, freight_40gp, freight_40hq, shipping_line, transit_time, validity_start, validity_end, remarks, status]
    );

    return NextResponse.json({
      success: true,
      message: '添加成功',
      id: result.insertId,
    });
  } catch (error) {
    console.error('添加报价失败:', error);
    return NextResponse.json(
      { success: false, message: '添加失败' },
      { status: 500 }
    );
  }
}

// PUT - 更新报价
export async function PUT(request: NextRequest) {
  try {
    const body: QuotationData = await request.json();
    const {
      id, route_name, pol, pod, freight_20gp, freight_40gp, freight_40hq,
      shipping_line, transit_time, validity_start, validity_end, remarks, status
    } = body;

    await pool.query(
      `UPDATE quotations SET 
      route_name = ?, pol = ?, pod = ?, freight_20gp = ?, freight_40gp = ?, freight_40hq = ?,
      shipping_line = ?, transit_time = ?, validity_start = ?, validity_end = ?, remarks = ?, status = ?
      WHERE id = ?`,
      [route_name, pol, pod, freight_20gp, freight_40gp, freight_40hq, shipping_line, transit_time, validity_start, validity_end, remarks, status, id]
    );

    return NextResponse.json({
      success: true,
      message: '更新成功',
    });
  } catch (error) {
    console.error('更新报价失败:', error);
    return NextResponse.json(
      { success: false, message: '更新失败' },
      { status: 500 }
    );
  }
}

// DELETE - 删除报价
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: '缺少ID参数' },
        { status: 400 }
      );
    }

    await pool.query('DELETE FROM quotations WHERE id = ?', [id]);

    return NextResponse.json({
      success: true,
      message: '删除成功',
    });
  } catch (error) {
    console.error('删除报价失败:', error);
    return NextResponse.json(
      { success: false, message: '删除失败' },
      { status: 500 }
    );
  }
}
