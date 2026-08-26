'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function Header() {
  const { t, toggleLanguage, isAr } = useLanguage();

  return (
    <header className="bg-[#0B2545] text-white p-4 flex justify-between items-center">
      <div>
        <h1 className="font-bold">{t('platformName')}</h1>
        <p className="text-xs text-gray-300">{t('schoolName')}</p>
      </div>

      <button 
        onClick={toggleLanguage}
        className="bg-white/10 hover:bg-white/20 text-xs px-3 py-1.5 rounded-full font-bold transition"
      >
        🌐 {t('changeLang')}
      </button>
    </header>
  );
}