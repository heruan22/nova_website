import type { Metadata } from 'next';
import './globals.css';
import { ContactProvider } from '@/components/ContactContext';
import ContactModal from '@/components/ContactModal';
import LiveChat from '@/components/LiveChat';

export const metadata: Metadata = {
  title: '华顺船务，全球散杂货运输专家',
  description: '专业的国际物流与供应链服务提供商',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <ContactProvider>
          {children}
          <ContactModal />
          <LiveChat />
        </ContactProvider>
      </body>
    </html>
  );
}
