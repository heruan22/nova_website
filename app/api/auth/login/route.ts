import { NextResponse } from 'next/server';

// 简单的用户验证（生产环境应该从数据库查询）
const USERS = [
  { id: 1, username: 'novamax', password: 'cris1688', name: '管理员', role: 'admin' },
  { id: 2, username: 'nova003', password: 'nova003nova', name: '普通用户', role: 'user' },
];

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    // 验证必填字段
    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: '用户名和密码不能为空' },
        { status: 400 }
      );
    }

    // 查找用户
    const user = USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { success: false, error: '用户名或密码错误' },
        { status: 401 }
      );
    }

    // 生成简单的token（生产环境应使用JWT）
    const token = Buffer.from(`${user.id}:${Date.now()}`).toString('base64');

    // 返回用户信息（不包含密码）
    const { password: _, ...userInfo } = user;

    return NextResponse.json({
      success: true,
      token,
      user: userInfo,
      message: '登录成功',
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      {
        success: false,
        error: process.env.NODE_ENV === 'development' ? error.message : '服务器错误',
      },
      { status: 500 }
    );
  }
}
