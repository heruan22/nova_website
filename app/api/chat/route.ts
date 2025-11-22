import nodemailer from 'nodemailer';

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== 'string') {
      return Response.json(
        { success: false, error: '缺少消息内容' },
        { status: 400 }
      );
    }

    // 检查是否配置了邮件服务
    const smtpConfigured = process.env.SMTP_USER && process.env.SMTP_PASS;

    if (!smtpConfigured) {
      // 如果未配置邮件服务，仅记录日志并返回成功
      console.log('Chat message received (SMTP not configured):', message);
      return Response.json({
        success: true,
        message: '感谢您的咨询，请提供您的联系方式，我们的客服将在工作时间内尽快联系您。您也可直接联系我们的业务人员：\n席经理 15900736092',
      });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const sentAt = new Date();
    const timeZone = process.env.MAIL_TIME_ZONE || 'Asia/Shanghai';
    const formattedTime = sentAt.toLocaleString('zh-CN', {
      hour12: false,
      timeZone,
    });
    const safeMessage = escapeHtml(message);

    const mailSubject = `在线客服新消息 - ${formattedTime}`;
    const mailContent = `收到一条来自在线客服的小部件的新消息：

时间：${formattedTime}

消息内容：
${message}

---
此邮件由华顺船务网站在线客服自动发送`;

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
      subject: mailSubject,
      text: mailContent,
      html: `
        <h2>在线客服新消息</h2>
        <p><strong>时间：</strong>${formattedTime}</p>
        <p><strong>消息内容：</strong></p>
        <pre style="white-space: pre-wrap; font-family: inherit;">${safeMessage}</pre>
        <hr />
        <p>此邮件由华顺船务网站在线客服自动发送</p>
      `,
    });

    return Response.json({
      success: true,
      message: '感谢您的咨询，请提供您的联系方式，我们的客服将在工作时间内尽快联系您。您也可直接联系我们的业务人员：\n席经理 15900736092',
    });
  } catch (error: any) {
    console.error('Live chat error:', error);
    return Response.json(
      {
        success: false,
        error: process.env.NODE_ENV === 'development' ? error.message : '消息发送失败，请稍后再试',
      },
      { status: 500 }
    );
  }
}
