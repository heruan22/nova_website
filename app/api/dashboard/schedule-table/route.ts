import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

interface ScheduleData {
  id?: number;
  vessel: string;
  eta: string;
  pol: string;
  pod: string;
  route: string;
}

// GET - 获取所有船期数据
export async function GET() {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT * FROM schedule_table ORDER BY eta ASC'
    );
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error('获取船期数据失败:', error);
    return NextResponse.json(
      { success: false, message: '获取数据失败' },
      { status: 500 }
    );
  }
}

// POST - 添加新船期
export async function POST(request: NextRequest) {
  try {
    const body: ScheduleData = await request.json();
    const { vessel, eta, pol, pod, route } = body;

    if (!vessel || !eta || !pol || !pod || !route) {
      return NextResponse.json(
        { success: false, message: '所有字段都是必填的' },
        { status: 400 }
      );
    }

    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO schedule_table (vessel, eta, pol, pod, route) VALUES (?, ?, ?, ?, ?)',
      [vessel, eta, pol, pod, route]
    );

    return NextResponse.json({
      success: true,
      message: '添加成功',
      id: result.insertId,
    });
  } catch (error) {
    console.error('添加船期失败:', error);
    return NextResponse.json(
      { success: false, message: '添加失败' },
      { status: 500 }
    );
  }
}

// PUT - 更新船期
export async function PUT(request: NextRequest) {
  try {
    const body: ScheduleData = await request.json();
    const { id, vessel, eta, pol, pod, route } = body;

    if (!id || !vessel || !eta || !pol || !pod || !route) {
      return NextResponse.json(
        { success: false, message: '所有字段都是必填的' },
        { status: 400 }
      );
    }

    await pool.query(
      'UPDATE schedule_table SET vessel = ?, eta = ?, pol = ?, pod = ?, route = ? WHERE id = ?',
      [vessel, eta, pol, pod, route, id]
    );

    return NextResponse.json({
      success: true,
      message: '更新成功',
    });
  } catch (error) {
    console.error('更新船期失败:', error);
    return NextResponse.json(
      { success: false, message: '更新失败' },
      { status: 500 }
    );
  }
}

// DELETE - 删除船期
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

    await pool.query('DELETE FROM schedule_table WHERE id = ?', [id]);

    return NextResponse.json({
      success: true,
      message: '删除成功',
    });
  } catch (error) {
    console.error('删除船期失败:', error);
    return NextResponse.json(
      { success: false, message: '删除失败' },
      { status: 500 }
    );
  }
}
