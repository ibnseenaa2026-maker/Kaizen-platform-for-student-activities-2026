import type { Metadata } from 'next';
import './globals.css';
// 1. استيراد الموفر (LanguageProvider) من سياق اللغة الذي أنشأته
import { LanguageProvider } from '@/context/LanguageContext';

export const metadata: Metadata = {
  title: 'منصة متوسطة ابن سينا',
  description: 'منصة الأنشطة والفعاليات والخدمات التعليمية - الهيئة الملكية بينبع',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar">
      <body>
        {/* 2. قم بإحاطة وتغليف (children) بـ LanguageProvider */}
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}