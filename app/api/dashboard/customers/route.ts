import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

interface CustomerData {
  id?: number;
  company_name: string;
  contact_person: string;
  phone: string;
  email: string;
  address: string;
  customer_type: string;
  industry: string;
  credit_level: string;
  status: string;
  last_contact_date: string;
  next_followup_date: string;
  notes: string;
}

// GET - 获取客户列表
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const search = searchParams.get('search');

    let query = 'SELECT * FROM customers WHERE 1=1';
    const params: any[] = [];

    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }
    if (type) {
      query += ' AND customer_type = ?';
      params.push(type);
    }
    if (search) {
      query += ' AND (company_name LIKE ? OR contact_person LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY last_contact_date DESC';

    const [rows] = await pool.query<RowDataPacket[]>(query, params);
    return NextResponse.json({ success: true, data: rows });
  } catch (error) {
    console.error('获取客户数据失败:', error);
    return NextResponse.json(
      { success: false, message: '获取数据失败' },
      { status: 500 }
    );
  }
}

// POST - 添加新客户
export async function POST(request: NextRequest) {
  try {
    const body: CustomerData = await request.json();
    const {
      company_name, contact_person, phone, email, address, customer_type,
      industry, credit_level, status, last_contact_date, next_followup_date, notes
    } = body;

    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO customers 
      (company_name, contact_person, phone, email, address, customer_type, industry, credit_level, status, last_contact_date, next_followup_date, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [company_name, contact_person, phone, email, address, customer_type, industry, credit_level, status, last_contact_date, next_followup_date, notes]
    );

    return NextResponse.json({
      success: true,
      message: '添加成功',
      id: result.insertId,
    });
  } catch (error) {
    console.error('添加客户失败:', error);
    return NextResponse.json(
      { success: false, message: '添加失败' },
      { status: 500 }
    );
  }
}

// PUT - 更新客户
export async function PUT(request: NextRequest) {
  try {
    const body: CustomerData = await request.json();
    const {
      id, company_name, contact_person, phone, email, address, customer_type,
      industry, credit_level, status, last_contact_date, next_followup_date, notes
    } = body;

    await pool.query(
      `UPDATE customers SET 
      company_name = ?, contact_person = ?, phone = ?, email = ?, address = ?, customer_type = ?,
      industry = ?, credit_level = ?, status = ?, last_contact_date = ?, next_followup_date = ?, notes = ?
      WHERE id = ?`,
      [company_name, contact_person, phone, email, address, customer_type, industry, credit_level, status, last_contact_date, next_followup_date, notes, id]
    );

    return NextResponse.json({
      success: true,
      message: '更新成功',
    });
  } catch (error) {
    console.error('更新客户失败:', error);
    return NextResponse.json(
      { success: false, message: '更新失败' },
      { status: 500 }
    );
  }
}

// DELETE - 删除客户
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

    await pool.query('DELETE FROM customers WHERE id = ?', [id]);

    return NextResponse.json({
      success: true,
      message: '删除成功',
    });
  } catch (error) {
    console.error('删除客户失败:', error);
    return NextResponse.json(
      { success: false, message: '删除失败' },
      { status: 500 }
    );
  }
}
