'use client';

import Image from 'next/image';
import { useState } from 'react';

interface NavbarProps {
  lang: 'ar' | 'en';
  onToggleLang: () => void;
}

export default function Navbar({ lang, onToggleLang }: NavbarProps) {
  return (
    <header className="bg-[#0B2545] text-[#F4EAD3] px-6 py-4 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* الشعار واسم المدرسة */}
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 bg-white/10 p-1 rounded-xl flex items-center justify-center border border-white/20">
            <Image 
              src="/logo.png" 
              alt="Kaizen Logo" 
              width={48} 
              height={48} 
              className="object-contain"
              priority
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#00B4D8] leading-tight">
              {lang === 'ar' ? 'كايزن' : 'Kaizen'}
            </h1>
            <p className="text-xs text-slate-300">
              {lang === 'ar' ? 'متوسطة ابن سينا' : 'Ibn Sina Middle School'}
            </p>
          </div>
        </div>

        {/* أزرار التحكم واللغة */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleLang}
            className="bg-[#00B4D8] hover:bg-[#00B4D8]/80 text-white text-xs font-bold px-4 py-2 rounded-full transition shadow-sm"
          >
            {lang === 'ar' ? 'English' : 'عربي'}
          </button>
        </div>

      </div>
    </header>
  );
}