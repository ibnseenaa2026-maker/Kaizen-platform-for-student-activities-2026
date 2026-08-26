'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LandingPage() {
  const [isAr, setIsAr] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#07111E] text-white font-sans flex flex-col justify-between selection:bg-amber-400 selection:text-[#07111E] text-right rtl overflow-x-hidden">
      
      {/* 🔝 الشريط العلوي الاحترافي مع شعار بخلفية بيضاء ناصعة */}
      <header className={`px-6 py-4 flex justify-between items-center sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0B192C]/95 backdrop-blur-md border-b border-white/10 shadow-2xl' : 'bg-transparent'
      }`}>
        <div className="flex items-center gap-3.5">
          {/* إطار أبيض ناصع لإبراز الشعار بوضوح تام */}
          <div className="w-12 h-12 rounded-2xl bg-white p-1.5 shadow-lg shadow-amber-500/10 flex items-center justify-center flex-shrink-0 border-2 border-amber-400">
            <img src="/logo.png" alt="شعار منصة كايزن" className="w-full h-full object-contain" />
          </div>
          <div>
            <span className="text-[10px] text-amber-400 font-black tracking-widest uppercase block">
              {isAr ? 'الهيئة الملكية للجبيل وينبع' : 'Royal Commission for Jubail and Yanbu'}
            </span>
            <h1 className="text-sm font-black text-white tracking-wide">
              {isAr ? 'متوسطة ابن سينا — منصة كايزن' : 'Ibn Sina Intermediate — Kaizen'}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* زر تبديل اللغة */}
          <button
            onClick={() => setIsAr(!isAr)}
            type="button"
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-2xl font-black text-xs transition border border-white/10 shadow-inner flex items-center gap-1.5"
          >
            🌐 {isAr ? 'English' : 'عربي'}
          </button>

          {/* زر انتقال واحد فقط لبوابة تسجيل الدخول */}
          <Link
            href="/login"
            className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-[#07111E] font-black px-6 py-2.5 rounded-2xl text-xs shadow-xl shadow-amber-500/20 transition-all transform hover:scale-105 flex items-center gap-2"
          >
            🚀 {isAr ? 'بوابة التسجيل ودخول النظام' : 'Login Portal'}
          </Link>
        </div>
      </header>

      {/* 📰 شريط الأخبار والفعاليات الحية */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-[#07111E] font-black text-sm md:text-base py-3 px-6 overflow-hidden whitespace-nowrap shadow-xl flex items-center gap-4 relative z-40 border-y border-amber-300/30">
        <span className="bg-[#07111E] text-amber-400 px-4 py-1.5 rounded-xl text-xs flex-shrink-0 shadow-md">
          {isAr ? '📢 لوحة الأخبار الحية:' : '📢 Live News:'}
        </span>
        <div className="inline-block animate-marquee tracking-wide">
          {isAr 
            ? '🏆 تكريم الطلاب المتميزين في مسابقة الهيئة الملكية للإلقاء والارتجال | 🏃‍♂️ انطلاق فعالية "ينبع تركض" الرياضية بمشاركة طلاب متوسطة ابن سينا | ⛺ نجاح برامج الكشافة المدرسية للترم الدراسي الحالي بنهج التميز المستمر.'
            : '🏆 Honoring outstanding students in RC Public Speaking | 🏃‍♂️ "Yanbu Runs" athletic event launched with Ibn Sina students | ⛺ School scout programs success.'
          }
        </div>
      </div>

      {/* 🎯 قسم البطل (Hero Section) مع بطاقة إبداعية محفزة للطلاب بدل المؤشرات */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* إضاءات خلفية هندسية */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          <div className="lg:col-span-7 space-y-8 text-right">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-amber-500/10 border border-cyan-500/30 px-4 py-2 rounded-full text-xs font-black text-cyan-300 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              ✨ {isAr ? 'التطوير المستمر نحو التميز الأكاديمي والمهاري' : 'Continuous Improvement towards Excellence'}
            </div>

            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.2] text-white">
              {isAr ? 'بناء جيل واعد مبتكر عبر ' : 'Building a Promising Generation via '} 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-cyan-400 underline decoration-cyan-500/50 decoration-4 underline-offset-8">
                {isAr ? 'منصة كايزن' : 'Kaizen Platform'}
              </span>
            </h2>

            <p className="text-gray-300 text-base md:text-lg font-bold leading-relaxed max-w-2xl">
              {isAr 
                ? 'منظومة رقمية متكاملة ومتقدمة لتوثيق وإدارة الأنشطة الفردية والجماعية بمتوسطة ابن سينا بالهيئة الملكية بينبع الصناعية.'
                : 'An integrated digital system to manage individual and group activities at Ibn Sina Intermediate School.'
              }
            </p>

            <div className="pt-2">
              <Link
                href="/login"
                className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-[#07111E] font-black px-10 py-4 rounded-3xl text-base shadow-2xl shadow-amber-500/30 transition-all transform hover:scale-105 inline-block border border-amber-300/40"
              >
                🔑 {isAr ? 'الانتقال لبوابة تسجيل الدخول' : 'Go to Login Portal'}
              </Link>
            </div>
          </div>

          {/* 🌟 بطاقة إبداعية محفزة وجذابة للطلاب (بدل مؤشرات الأداء الجافة) */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-cyan-400 to-emerald-400 rounded-[35px] blur-xl opacity-30 animate-pulse"></div>
            <div className="relative bg-[#0B192C]/90 backdrop-blur-xl border border-white/15 rounded-[30px] p-8 space-y-6 shadow-2xl text-center">
              
              {/* شعار وسام التميز الداخلي */}
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 mx-auto rounded-3xl p-1 shadow-xl flex items-center justify-center transform hover:rotate-6 transition-transform">
                <div className="w-full h-full bg-[#07111E] rounded-[22px] flex items-center justify-center text-3xl">
                  🏆
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-black text-amber-400">
                  {isAr ? 'منصة المبدعين والمبتكرين' : 'Creators & Innovators Platform'}
                </h3>
                <p className="text-xs text-gray-300 font-bold leading-relaxed">
                  {isAr 
                    ? 'اكتشف شغفك، شارك في الأنشطة الصفية واللاصفية، واصنع بصمتك الخاصة في لوحة شرف متوسطة ابن سينا!'
                    : 'Discover your passion and make your mark in Ibn Sina honor board!'
                  }
                </p>
              </div>

              {/* أيقونات الأنشطة الحماسية للطلاب */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="bg-white/5 border border-white/10 p-3 rounded-2xl flex flex-col items-center gap-1.5 hover:bg-white/10 transition">
                  <span className="text-2xl">🏅</span>
                  <span className="text-[11px] font-black text-amber-300">{isAr ? 'مسابقات' : 'Competitions'}</span>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-2xl flex flex-col items-center gap-1.5 hover:bg-white/10 transition">
                  <span className="text-2xl">⛺</span>
                  <span className="text-[11px] font-black text-cyan-300">{isAr ? 'الكشافة' : 'Scouts'}</span>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-2xl flex flex-col items-center gap-1.5 hover:bg-white/10 transition">
                  <span className="text-2xl">⚽</span>
                  <span className="text-[11px] font-black text-emerald-300">{isAr ? 'رياضة' : 'Sports'}</span>
                </div>
              </div>

              <div className="bg-amber-400/10 border border-amber-400/30 py-2.5 px-4 rounded-2xl text-[11px] font-black text-amber-300">
                ✨ {isAr ? 'معاً نصنع التميز بروح الفريق الواحد' : 'Together we achieve excellence'}
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 📌 الرؤية والرسالة والأهداف */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        
        <div className="bg-[#0B192C]/80 backdrop-blur-md border border-white/10 p-8 rounded-[30px] space-y-4 shadow-xl hover:border-amber-400/50 transition-all duration-300 group">
          <div className="w-16 h-16 rounded-2xl bg-amber-400/10 text-amber-400 border border-amber-400/30 flex items-center justify-center text-3xl font-black group-hover:scale-110 transition-transform shadow-lg">
            🔭
          </div>
          <h3 className="text-xl font-black text-white">
            {isAr ? 'رؤيتنا' : 'Our Vision'}
          </h3>
          <p className="text-sm text-gray-300 font-bold leading-relaxed">
            {isAr 
              ? 'الريادة والتميز في صناعة بيئة مدرسية تفاعلية تحفز الإبداع وتنمي مهارات القيادة والأنشطة الطلابية وفق معايير الجودة الشاملة.'
              : 'Leadership and excellence in creating an interactive school environment that stimulates creativity and develops leadership.'
            }
          </p>
        </div>

        <div className="bg-[#0B192C]/80 backdrop-blur-md border border-white/10 p-8 rounded-[30px] space-y-4 shadow-xl hover:border-cyan-400/50 transition-all duration-300 group">
          <div className="w-16 h-16 rounded-2xl bg-cyan-400/10 text-cyan-400 border border-cyan-400/30 flex items-center justify-center text-3xl font-black group-hover:scale-110 transition-transform shadow-lg">
            🎯
          </div>
          <h3 className="text-xl font-black text-white">
            {isAr ? 'رسالتنا' : 'Our Mission'}
          </h3>
          <p className="text-sm text-gray-300 font-bold leading-relaxed">
            {isAr 
              ? 'توفير منصة تقنية ذكية تدعم رائد النشاط والمعلمين في متابعة ورصد إنجازات الطلاب وتفعيل الأنشطة الصفية واللاصفية بكفاءة عالية.'
              : 'Providing a smart technical platform supporting activity leaders and teachers in tracking student achievements.'
            }
          </p>
        </div>

        <div className="bg-[#0B192C]/80 backdrop-blur-md border border-white/10 p-8 rounded-[30px] space-y-4 shadow-xl hover:border-emerald-400/50 transition-all duration-300 group">
          <div className="w-16 h-16 rounded-2xl bg-emerald-400/10 text-emerald-400 border border-emerald-400/30 flex items-center justify-center text-3xl font-black group-hover:scale-110 transition-transform shadow-lg">
            ⭐
          </div>
          <h3 className="text-xl font-black text-white">
            {isAr ? 'أهدافنا' : 'Our Goals'}
          </h3>
          <p className="text-sm text-gray-300 font-bold leading-relaxed">
            {isAr 
              ? 'أتمتة الأنشطة الطلابية، تعزيز المشاركة المجتمعية والرياضية، وتكريم الطلاب المتميزين والمبدعين باستمرار.'
              : 'Automating student activities, enhancing community and sports participation, and honoring outstanding students.'
            }
          </p>
        </div>

      </section>

      {/* Footer */}
      <footer className="bg-[#0B192C] py-8 px-6 text-center text-xs text-gray-400 font-bold border-t border-white/10">
        <p>
          {isAr 
            ? 'جميع الحقوق محفوظة © 2026 — متوسطة ابن سينا بالهيئة الملكية بينبع الصناعية'
            : 'All rights reserved © 2026 — Ibn Sina Intermediate School, Royal Commission in Yanbu'
          }
        </p>
      </footer>
    </div>
  );
}