'use client';

import Link from 'next/link';

interface DashboardHeaderProps {
  title: string;
  roleName: string;
}

export default function DashboardHeader({ title, roleName }: DashboardHeaderProps) {
  return (
    <header className="bg-[#0B2545] text-white px-6 py-3 rounded-2xl shadow-md mb-8 flex justify-between items-center">
      
      {/* الشعار واسم اللوحة */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard/super-admin" className="w-10 h-10 bg-white rounded-xl p-1 flex items-center justify-center hover:opacity-90 transition">
          <img 
            src="/لوقو_التطبيق_page-0001-removebg-preview.png" 
            alt="شعار كايزن" 
            className="w-full h-full object-contain"
          />
        </Link>
        <div>
          <h1 className="text-base font-bold text-[#00B4D8]">{title}</h1>
          <p className="text-[10px] text-gray-300">{roleName} • متوسطة ابن سينا</p>
        </div>
      </div>

      {/* أزرار العودة والتنقل */}
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/super-admin"
          className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 border border-white/10"
        >
          <span>🏠</span>
          <span className="hidden sm:inline">القائمة الرئيسية</span>
        </Link>

        <Link
          href="/login"
          className="bg-red-500/20 hover:bg-red-500/30 text-red-200 text-xs font-bold px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 border border-red-500/30"
        >
          <span>🚪</span>
          <span className="hidden sm:inline">خروج</span>
        </Link>
      </div>

    </header>
  );
}