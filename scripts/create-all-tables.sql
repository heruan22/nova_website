-- 货柜追踪系统数据库表
CREATE TABLE IF NOT EXISTS container_tracking (
  id INT AUTO_INCREMENT PRIMARY KEY,
  container_no VARCHAR(50) NOT NULL COMMENT '货柜号',
  booking_no VARCHAR(50) NOT NULL COMMENT '订舱号',
  customer_name VARCHAR(100) NOT NULL COMMENT '客户名称',
  vessel VARCHAR(100) NOT NULL COMMENT '船名',
  voyage VARCHAR(50) NOT NULL COMMENT '航次',
  pol VARCHAR(100) NOT NULL COMMENT '装货港',
  pod VARCHAR(100) NOT NULL COMMENT '卸货港',
  etd VARCHAR(50) NOT NULL COMMENT '预计离港时间',
  eta VARCHAR(50) NOT NULL COMMENT '预计到港时间',
  status VARCHAR(50) NOT NULL COMMENT '状态',
  current_location VARCHAR(200) NOT NULL COMMENT '当前位置',
  cargo_description TEXT COMMENT '货物描述',
  weight VARCHAR(50) COMMENT '重量',
  last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后更新时间',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_container (container_no),
  INDEX idx_status (status),
  INDEX idx_customer (customer_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='货柜追踪表';

-- 报价管理系统数据库表
CREATE TABLE IF NOT EXISTS quotations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  route_name VARCHAR(100) NOT NULL COMMENT '航线名称',
  pol VARCHAR(100) NOT NULL COMMENT '起运港',
  pod VARCHAR(100) NOT NULL COMMENT '目的港',
  freight_20gp VARCHAR(50) NOT NULL COMMENT '20GP运费',
  freight_40gp VARCHAR(50) NOT NULL COMMENT '40GP运费',
  freight_40hq VARCHAR(50) NOT NULL COMMENT '40HQ运费',
  shipping_line VARCHAR(100) NOT NULL COMMENT '船公司',
  transit_time VARCHAR(50) NOT NULL COMMENT '运输时间',
  validity_start DATE NOT NULL COMMENT '有效期开始',
  validity_end DATE NOT NULL COMMENT '有效期结束',
  remarks TEXT COMMENT '备注',
  status VARCHAR(50) NOT NULL DEFAULT '有效' COMMENT '状态',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_route (pol, pod),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='报价管理表';

-- 客户管理系统数据库表
CREATE TABLE IF NOT EXISTS customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company_name VARCHAR(200) NOT NULL COMMENT '公司名称',
  contact_person VARCHAR(100) NOT NULL COMMENT '联系人',
  phone VARCHAR(50) NOT NULL COMMENT '电话',
  email VARCHAR(100) COMMENT '邮箱',
  address VARCHAR(255) COMMENT '地址',
  customer_type VARCHAR(50) NOT NULL DEFAULT '潜在客户' COMMENT '客户类型',
  industry VARCHAR(100) COMMENT '行业',
  credit_level VARCHAR(10) DEFAULT 'B' COMMENT '信用等级',
  status VARCHAR(50) NOT NULL DEFAULT '活跃' COMMENT '状态',
  last_contact_date DATE COMMENT '最后联系日期',
  next_followup_date DATE COMMENT '下次跟进日期',
  notes TEXT COMMENT '备注',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_company (company_name),
  INDEX idx_status (status),
  INDEX idx_type (customer_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='客户管理表';

-- 插入示例数据
-- 货柜追踪示例数据
INSERT INTO container_tracking (container_no, booking_no, customer_name, vessel, voyage, pol, pod, etd, eta, status, current_location, cargo_description, weight) VALUES
('CSNU1234567', 'BKG2026001', '上海钢铁集团', 'COSCO GALAXY', '2601E', 'SHANGHAI', 'JAKARTA', '2026-01-05', '2026-01-18', '运输中', '马六甲海峡', '热轧卷板', '18吨'),
('MSCU9876543', 'BKG2026002', '宁波化工公司', 'MSC MINA', '2601W', 'NINGBO', 'MUMBAI', '2026-01-07', '2026-01-22', '已到港', 'MUMBAI港口', '化工原料', '22吨'),
('CMAU2345678', 'BKG2026003', '天津机械厂', 'CMA CGM TAGE', '2602N', 'TIANJIN', 'DUBAI', '2026-01-10', '2026-01-28', '已提箱', '天津新港', '机械设备', '25吨'),
('ONEU3456789', 'BKG2026004', '青岛贸易公司', 'ONE APUS', '2601S', 'QINGDAO', 'SINGAPORE', '2026-01-12', '2026-01-20', '清关中', 'SINGAPORE港', '电子产品', '15吨'),
('HLCU4567890', 'BKG2026005', '大连物流', 'HAMBURG EXPRESS', '2601E', 'DALIAN', 'JEDDAH', '2026-01-15', '2026-02-05', '运输中', '印度洋', '钢材', '20吨');

-- 报价管理示例数据
INSERT INTO quotations (route_name, pol, pod, freight_20gp, freight_40gp, freight_40hq, shipping_line, transit_time, validity_start, validity_end, remarks, status) VALUES
('中国-东南亚', 'SHANGHAI', 'JAKARTA', '850', '1200', '1250', 'COSCO', '15天', '2026-01-01', '2026-03-31', '含基本港', '有效'),
('中国-南亚', 'NINGBO', 'MUMBAI', '920', '1350', '1400', 'MSC', '18天', '2026-01-01', '2026-03-31', '不含THC', '有效'),
('中国-中东', 'TIANJIN', 'DUBAI', '1100', '1650', '1700', 'CMA CGM', '22天', '2026-01-01', '2026-02-28', '含目的港费用', '有效'),
('中国-东南亚', 'QINGDAO', 'SINGAPORE', '780', '1100', '1150', 'ONE', '12天', '2026-01-01', '2026-03-31', '快船', '有效'),
('中国-中东', 'DALIAN', 'JEDDAH', '1250', '1850', '1900', 'HAPAG-LLOYD', '25天', '2026-01-01', '2026-01-31', '旺季价格', '即将过期');

-- 客户管理示例数据
INSERT INTO customers (company_name, contact_person, phone, email, address, customer_type, industry, credit_level, status, last_contact_date, next_followup_date, notes) VALUES
('上海钢铁集团有限公司', '张经理', '021-88888888', 'zhang@steel.com', '上海市浦东新区世纪大道100号', '重点客户', '钢铁制造', 'A', '活跃', '2026-01-05', '2026-01-20', '长期合作客户,月均30柜'),
('宁波化工国际贸易', '李总', '0574-87654321', 'li@chemical.com', '宁波市北仑区港口路88号', 'VIP客户', '化工', 'A', '活跃', '2026-01-08', '2026-01-25', 'VIP客户,账期60天'),
('天津机械制造厂', '王主任', '022-66666666', 'wang@machinery.com', '天津市滨海新区开发区200号', '普通客户', '机械制造', 'B', '活跃', '2026-01-10', '2026-02-01', '偶尔有大件运输需求'),
('青岛国际贸易公司', '赵先生', '0532-55555555', 'zhao@trade.com', '青岛市市南区香港中路50号', '重点客户', '国际贸易', 'A', '活跃', '2026-01-12', '2026-01-18', '主要做东南亚线路'),
('大连物流集团', '刘经理', '0411-44444444', 'liu@logistics.com', '大连市中山区人民路300号', '普通客户', '物流', 'B', '暂停', '2025-12-20', '2026-01-30', '近期业务量下降,需重点跟进'),
('广州外贸进出口公司', '陈总', '020-33333333', 'chen@trade.cn', '广州市天河区珠江新城天河路88号', '潜在客户', '外贸', 'B', '活跃', '2026-01-15', '2026-01-22', '新客户,正在洽谈合作'),
('深圳科技电子有限公司', '周女士', '0755-22222222', 'zhou@tech.com', '深圳市南山区科技园南区18号', '普通客户', '电子科技', 'B', '活跃', '2026-01-14', '2026-02-05', '主要运输电子产品');
