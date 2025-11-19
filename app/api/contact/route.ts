import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, phone, company, subject, message } = await req.json();

    // 验证必填字段
    if (!name || !email || !phone || !message) {
      return Response.json(
        { success: false, error: '缺少必填信息' },
        { status: 400 }
      );
    }

    // 配置邮件发送器（根据环境变量）
    // 使用 Gmail 或其他 SMTP 服务
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 邮件内容
    const mailContent = `
新的在线咨询提交：

姓名：${name}
邮箱：${email}
电话：${phone}
公司：${company || '未提供'}
主题：${subject || '未分类'}

咨询内容：
${message}

---
此邮件由华顺物流网站自动生成
    `.trim();

    // 发送邮件到管理员邮箱
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
      subject: `新咨询：${subject || '在线咨询'} - ${name}`,
      text: mailContent,
      html: `
        <h2>新的在线咨询提交</h2>
        <table style="border-collapse: collapse; width: 100%;">
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>姓名：</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${name}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>邮箱：</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${email}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>电话：</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${phone}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>公司：</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${company || '未提供'}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>主题：</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${subject || '未分类'}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>咨询内容：</strong></td><td style="padding: 8px; border: 1px solid #ddd;"><pre>${message}</pre></td></tr>
        </table>
        <hr />
        <p>此邮件由华顺物流网站自动生成</p>
      `,
    });

    // 返回成功响应
    return Response.json({
      success: true,
      message: '咨询已提交，我们会尽快与您联系',
    });
  } catch (error: any) {
    console.error('Contact form error:', error);
    return Response.json(
      {
        success: false,
        error: process.env.NODE_ENV === 'development' ? error.message : '服务暂时不可用，请稍后重试',
      },
      { status: 500 }
    );
  }
}
