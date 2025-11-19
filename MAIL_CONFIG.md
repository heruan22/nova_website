# 邮件配置指南

## 当前状态
- ✅ 开发服务器运行在 http://localhost:3000
- ✅ `/api/contact` 接口已启用
- ✅ 在线客服组件已集成
- ⚠️ 邮件服务需要配置

## 配置方式

### 方式 1：使用 Gmail（推荐用于测试）

1. **启用两步认证**
   - 访问 https://myaccount.google.com/security
   - 设置两步认证

2. **生成应用专用密码**
   - 访问 https://myaccount.google.com/apppasswords
   - 选择"邮件"和"Windows 电脑"
   - 复制生成的 16 位密码

3. **编辑 `.env.local`**
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=overseaedc@gmail.com
   SMTP_PASS=chla arwy haeh gvrz
   ADMIN_EMAIL=overseaedc@gmail.com
   ```

4. **重启开发服务器**
   ```bash
   pkill -f 'next dev'
   npm run dev
   ```

### 方式 2：使用企业邮箱（腾讯/阿里等）

**腾讯企业邮箱：**
```
SMTP_HOST=smtp.exmail.qq.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@company.qq.com
SMTP_PASS=your-password
ADMIN_EMAIL=your-email@company.qq.com
```

**阿里企业邮箱：**
```
SMTP_HOST=smtp.mxhichina.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@company.com
SMTP_PASS=your-password
ADMIN_EMAIL=your-email@company.com
```

### 方式 3：使用 SendGrid / Mailgun（生产推荐）

需要修改 `/app/api/contact/route.ts` 使用对应的 API，但当前实现是 SMTP 方式。

## 功能验证

配置完成后，可以：
1. 访问 http://localhost:3000
2. 点击"在线客服"按钮
3. 在聊天框输入消息，会自动回复：
   ```
   感谢您的咨询，请提供您的联系方式，我们的客服将在工作时间内尽快联系您。
   
   您也可直接联系我们的业务人员：(15900736092)
   ```
4. 填写"在线咨询"表单并提交，客户信息会发送到 `ADMIN_EMAIL` 配置的邮箱

## 测试 API

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "张三",
    "email": "zhangsan@example.com",
    "phone": "13800138000",
    "company": "物流公司",
    "subject": "海运咨询",
    "message": "咨询国际海运服务"
  }'
```

配置完成后会返回：
```json
{"success": true, "message": "咨询已提交，我们会尽快与您联系"}
```

## 故障排查

如果邮件发送失败，检查：
1. 凭据是否正确（特别是 Gmail 的应用专用密码）
2. SMTP 服务器地址和端口是否正确
3. 防火墙/网络连接是否允许 SMTP 端口
4. 查看开发服务器日志中的错误信息
