# MySQL数据库配置

## 数据库连接配置

在 `.env.local` 文件中添加以下配置:

```env
# MySQL数据库配置
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=nova_logistics

# 认证密钥（用于JWT token）
JWT_SECRET=your-secret-key-change-this-in-production
```

## 安装MySQL依赖

```bash
npm install mysql2
```

## 数据库表结构

### 1. 用户表 (users)
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  role ENUM('admin', 'user') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 2. 订单表 (orders)
```sql
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  customer_id INT NOT NULL,
  customer_name VARCHAR(200) NOT NULL,
  cargo_type VARCHAR(100) NOT NULL,
  cargo_volume VARCHAR(100),
  status ENUM('待装船', '已装船', '运输中', '已完成', '已取消') DEFAULT '待装船',
  origin_port VARCHAR(100),
  destination_port VARCHAR(100),
  order_date DATE NOT NULL,
  shipment_date DATE,
  arrival_date DATE,
  total_amount DECIMAL(15, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);
```

### 3. 客户表 (customers)
```sql
CREATE TABLE customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company_name VARCHAR(200) NOT NULL,
  contact_person VARCHAR(100),
  phone VARCHAR(20),
  email VARCHAR(100),
  category ENUM('VIP', 'A类', 'B类', 'C类') DEFAULT 'C类',
  industry VARCHAR(100),
  address TEXT,
  status ENUM('活跃', '沉睡', '流失') DEFAULT '活跃',
  total_orders INT DEFAULT 0,
  total_revenue DECIMAL(15, 2) DEFAULT 0,
  last_order_date DATE,
  assigned_to VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 4. 船期表 (schedules)
```sql
CREATE TABLE schedules (
  id INT AUTO_INCREMENT PRIMARY KEY,
  vessel_name VARCHAR(100) NOT NULL,
  voyage_number VARCHAR(50) NOT NULL,
  port_from VARCHAR(100) NOT NULL,
  port_to VARCHAR(100) NOT NULL,
  etd DATE NOT NULL COMMENT '预计离港时间',
  eta DATE NOT NULL COMMENT '预计到港时间',
  capacity INT NOT NULL COMMENT '总舱位（吨）',
  booked INT DEFAULT 0 COMMENT '已订舱位（吨）',
  status ENUM('订舱中', '即将截关', '已截关', '已开航', '已到港') DEFAULT '订舱中',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 5. 客户线索表 (leads)
```sql
CREATE TABLE leads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company_name VARCHAR(200) NOT NULL,
  contact_person VARCHAR(100),
  phone VARCHAR(20),
  email VARCHAR(100),
  source VARCHAR(50) COMMENT '线索来源',
  stage ENUM('初次接触', '需求确认', '方案报价', '商务谈判', '签约成功', '已流失') DEFAULT '初次接触',
  potential ENUM('高', '中', '低') DEFAULT '中',
  assigned_to VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 示例数据插入

```sql
-- 插入测试用户
INSERT INTO users (username, password, name, role) VALUES
('admin', 'password', '管理员', 'admin'),
('demo', 'demo123', '演示用户', 'user');

-- 插入测试客户
INSERT INTO customers (company_name, contact_person, phone, email, category, industry, status, assigned_to) VALUES
('上海钢铁集团', '张总', '13800138000', 'zhang@example.com', 'VIP', '钢铁贸易', '活跃', '李明'),
('宁波化工有限公司', '王经理', '13900139000', 'wang@example.com', 'A类', '化工', '活跃', '王芳');

-- 插入测试订单
INSERT INTO orders (order_number, customer_id, customer_name, cargo_type, cargo_volume, status, order_date) VALUES
('ORD-2025-001', 1, '上海钢铁集团', '热轧卷板', '500吨', '运输中', '2025-11-18'),
('ORD-2025-002', 2, '宁波化工集团', '化工吨包', '280吨', '已装船', '2025-11-19');

-- 插入测试船期
INSERT INTO schedules (vessel_name, voyage_number, port_from, port_to, etd, eta, capacity, booked, status) VALUES
('NOVA STAR', 'NS2025-11', '天津新港', '新加坡', '2025-11-25', '2025-12-05', 15000, 12500, '订舱中'),
('OCEAN PIONEER', 'OP2025-08', '上海港', '洛杉矶', '2025-11-28', '2025-12-15', 22000, 18000, '订舱中');

-- 插入测试线索
INSERT INTO leads (company_name, contact_person, phone, source, stage, potential, assigned_to) VALUES
('江苏钢铁集团', '张经理', '13800138888', '网站咨询', '初次接触', '高', '李明'),
('深圳科技有限公司', '王总', '13900139999', '展会', '需求确认', '中', '王芳');
```

## 连接数据库示例代码

在API路由中使用MySQL:

```typescript
import mysql from 'mysql2/promise';

async function getConnection() {
  return await mysql.createConnection({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
}

// 使用示例
export async function GET(req: Request) {
  const connection = await getConnection();
  const [rows] = await connection.execute(
    'SELECT * FROM orders WHERE status = ? LIMIT 10',
    ['运输中']
  );
  await connection.end();
  return NextResponse.json({ data: rows });
}
```

## 注意事项

1. **安全性**: 
   - 生产环境必须使用加密的密码存储（bcrypt）
   - 使用JWT进行身份验证
   - 启用SQL注入防护

2. **性能优化**:
   - 为常用查询字段添加索引
   - 使用连接池而不是单独连接
   - 考虑使用Redis缓存热点数据

3. **部署建议**:
   - 使用环境变量管理敏感信息
   - 定期备份数据库
   - 监控数据库性能指标
