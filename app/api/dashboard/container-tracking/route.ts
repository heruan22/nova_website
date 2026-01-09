import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

interface ContainerData {
  id?: number;
  container_no: string;
  booking_no: string;
  customer_name: string;
  vessel: string;
  voyage: string;
  pol: string;
  pod: string;
  etd: string;
  eta: string;
  status: string;
  current_location: string;
  cargo_description: string;
  weight: string;
  last_update: string;
}

// GET - 获取所有货柜追踪数据
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const containerNo = searchParams.get('container_no');
    const status = searchParams.get('status');

    let query = 'SELECT * FROM container_tracking';
    const params: any[] = [];

    if (containerNo) {
      query += ' WHERE container_no LIKE ?';
      params.push(`%${containerNo}%`);
    } else if (status) {
      query += ' WHERE status = ?';
      params.push(status);
    }

    query += ' ORDER BY last_update DESC';

    const [rows] = await pool.query<RowDataPacket[]>(query, params);
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error('获取货柜数据失败:', error);
    return NextResponse.json(
      { success: false, message: '获取数据失败' },
      { status: 500 }
    );
  }
}

// POST - 添加新货柜
export async function POST(request: NextRequest) {
  try {
    const body: ContainerData = await request.json();
    const {
      container_no, booking_no, customer_name, vessel, voyage,
      pol, pod, etd, eta, status, current_location, cargo_description, weight
    } = body;

    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO container_tracking 
      (container_no, booking_no, customer_name, vessel, voyage, pol, pod, etd, eta, status, current_location, cargo_description, weight)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [container_no, booking_no, customer_name, vessel, voyage, pol, pod, etd, eta, status, current_location, cargo_description, weight]
    );

    return NextResponse.json({
      success: true,
      message: '添加成功',
      id: result.insertId,
    });
  } catch (error) {
    console.error('添加货柜失败:', error);
    return NextResponse.json(
      { success: false, message: '添加失败' },
      { status: 500 }
    );
  }
}

// PUT - 更新货柜信息
export async function PUT(request: NextRequest) {
  try {
    const body: ContainerData = await request.json();
    const { id, status, current_location, eta } = body;

    await pool.query(
      'UPDATE container_tracking SET status = ?, current_location = ?, eta = ?, last_update = NOW() WHERE id = ?',
      [status, current_location, eta, id]
    );

    return NextResponse.json({
      success: true,
      message: '更新成功',
    });
  } catch (error) {
    console.error('更新货柜失败:', error);
    return NextResponse.json(
      { success: false, message: '更新失败' },
      { status: 500 }
    );
  }
}

// DELETE - 删除货柜
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

    await pool.query('DELETE FROM container_tracking WHERE id = ?', [id]);

    return NextResponse.json({
      success: true,
      message: '删除成功',
    });
  } catch (error) {
    console.error('删除货柜失败:', error);
    return NextResponse.json(
      { success: false, message: '删除失败' },
      { status: 500 }
    );
  }
}
