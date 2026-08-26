'use client';

import { useRouter } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
}

export default function DashboardHeader({ title, subtitle }: DashboardHeaderProps) {
  const router = useRouter();
  const { dir, toggleLanguage, isAr } = useLanguage();

  const handleLogout = () => {
    localStorage.removeItem('kaizen_authenticated');
    localStorage.removeItem('kaizen_user_role');
    router.push('/login');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="bg-[#0B2545] text-white p-4 lg:p-6 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-center gap-4 mb-8 print:hidden">
      
      {/* 1. الشعار واسم اللوحة */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center p-1.5 shadow-lg shrink-0 border-2 border-[#00B4D8] overflow-hidden">
          <img 
            src={encodeURI('/لوقو_التطبيق_page-0001-removebg-preview.png')} 
            alt="شعار منصة كايزن" 
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <h1 className="text-lg lg:text-xl font-black">{title}</h1>
          {subtitle && <p className="text-xs text-gray-300 font-medium">{subtitle}</p>}
        </div>
      </div>

      {/* 2. الأدوات المشتركة (الطباعة - اللغة - الخروج) */}
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {/* زر الطباعة والتصدير */}
        <button
          onClick={handlePrint}
          type="button"
          className="bg-white/10 hover:bg-white/20 text-white text-xs px-3.5 py-2 rounded-xl border border-white/20 font-bold transition flex items-center gap-1.5"
          title={isAr ? 'طباعة / تصدير PDF' : 'Print / Export PDF'}
        >
          🖨️ <span>{isAr ? 'طباعة / تصدير' : 'Print / Export'}</span>
        </button>

        {/* زر تبديل اللغة */}
        <button
          onClick={toggleLanguage}
          type="button"
          className="bg-white/10 hover:bg-white/20 text-white text-xs px-3.5 py-2 rounded-xl border border-white/20 font-bold transition flex items-center gap-1.5"
        >
          🌐 <span>{isAr ? 'English' : 'العربية'}</span>
        </button>

        {/* زر تسجيل الخروج */}
        <button
          onClick={handleLogout}
          type="button"
          className="bg-red-500/80 hover:bg-red-600 text-white text-xs px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 shadow-sm"
        >
          🚪 <span>{isAr ? 'خروج' : 'Logout'}</span>
        </button>
      </div>
    </header>
  );
}