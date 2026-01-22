import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI YouTube 封面產生器',
  description: '使用 AI 自動生成風格一致的 YouTube 封面圖',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  );
}
