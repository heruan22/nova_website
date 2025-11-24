'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState('business');

  useEffect(() => {
    // 检查登录状态
    const token = localStorage.getItem('auth_token');
    const userInfo = localStorage.getItem('user_info');

    // 开发模式下方便调试：自动注入一个假的管理员账户到 localStorage
    // 这样可以立即访问驾驶舱页面而不需要手动登录
    try {
      const isDev = process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost';
      if (isDev) {
        const mockUser = { id: 1, name: '管理员', role: 'admin' };
        const mockToken = btoa(`${mockUser.id}:${Date.now()}`);
        localStorage.setItem('auth_token', mockToken);
        localStorage.setItem('user_info', JSON.stringify(mockUser));
        setUser(mockUser);
        return;
      }
    } catch (e) {
      // ignore
    }

    if (!token || !userInfo) {
      router.push('/login');
      return;
    }

    setUser(JSON.parse(userInfo));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_info');
    router.push('/login');
  };

  const menuItems = [
    { id: 'business', name: '业务看板', icon: '📊', href: '/dashboard' },
    { id: 'schedule', name: '船期看板', icon: '🚢', href: '/dashboard/schedule' },
    { id: 'profit-calculator', name: '利润计算器', icon: '💰', href: '/dashboard/profit-calculator' },
    { id: 'test', name: '测试', icon: '🧪', href: '/dashboard/test' },
    // { id: 'development', name: '客户开发', icon: '👥', href: '/dashboard/development' },
    // { id: 'pool', name: '客户池子', icon: '💼', href: '/dashboard/pool' },
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xl">🚢</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">华顺船务</h1>
                  <p className="text-xs text-gray-500">管理驾驶舱</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">当前用户：</span>
                <span className="text-sm font-semibold text-gray-900">{user.name}</span>
                <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                  {user.role === 'admin' ? '管理员' : '普通用户'}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
              >
                退出登录
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* 侧边栏 */}
        <aside className="hidden md:flex md:flex-col w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-4rem)]">
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  currentPage === item.id
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setCurrentPage(item.id)}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.name}</span>
              </a>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-200">
            <a
              href="/"
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition"
            >
              <span>🏠</span>
              <span>返回首页</span>
            </a>
          </div>
        </aside>

        {/* 主内容区 */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
