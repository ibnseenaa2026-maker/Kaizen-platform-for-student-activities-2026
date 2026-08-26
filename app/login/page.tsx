'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [isAr, setIsAr] = useState(true);
  
  // 👥 قائمة المستفيدين بمسارات مفردة ودقيقة
  const beneficiaries = [
    { nameAr: '🎓 لوحة طالب المدرسة', nameEn: '🎓 School Student Dashboard', path: '/dashboard/student' },
    { nameAr: '🛡️ لوحة المسؤول العام (Super Admin)', nameEn: '🛡️ Super Admin Dashboard', path: '/dashboard/admin-supervisor' },
    { nameAr: '🏫 لوحة مدير المدرسة (أ. نايف بن علي العتيبي)', nameEn: '🏫 Principal (Mr. Naif Al-Otaibi)', path: '/dashboard/principal' },
    { nameAr: '🌟 لوحة رائد النشاط الطلابي (أ. يوسف بن محمد السقاف)', nameEn: '🌟 Activity Leader (Mr. Yousef Al-Saqqaf)', path: '/dashboard/activity-leader' },
    { nameAr: '👨‍🏫 لوحة المعلم ومشرف النادي', nameEn: '👨‍🏫 Teacher & Club Supervisor', path: '/dashboard/teacher' },
    { nameAr: '👨‍👦 لوحة أولياء الأمور', nameEn: '👨‍👦 Parents Dashboard', path: '/dashboard/parents' },
  ];

  const [selectedRole, setSelectedRole] = useState(beneficiaries[0].path);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      alert(isAr ? 'الرجاء إدخال اسم المستخدم وكلمة المرور!' : 'Please enter username and password!');
      return;
    }
    router.push(selectedRole);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 font-sans bg-[#F4EAD3]/20 overflow-hidden text-right rtl">
      
      {/* شريط علوي صغير للغة والعودة */}
      <div className="absolute top-6 right-6 left-6 z-20 flex justify-between items-center max-w-5xl mx-auto">
        <Link 
          href="/"
          className="bg-white hover:bg-gray-100 text-[#0B2545] px-4 py-2 rounded-2xl text-xs font-black border border-gray-300 shadow-sm transition flex items-center gap-1.5"
        >
          🏠 {isAr ? 'الرئيسية التعريفية' : 'Home Page'}
        </Link>

        <button
          onClick={() => setIsAr(!isAr)}
          type="button"
          className="bg-white hover:bg-gray-100 text-[#0B2545] px-4 py-2 rounded-2xl text-xs font-black border border-gray-300 shadow-sm transition"
        >
          🌐 {isAr ? 'English' : 'عربي'}
        </button>
      </div>

      {/* بطاقة الدخول */}
      <div className="relative z-10 max-w-md w-full bg-white border border-gray-200 rounded-3xl p-8 shadow-2xl space-y-6 text-[#0B2545] mt-12">
        
        <div className="text-center space-y-3">
          <div className="w-24 h-24 rounded-3xl bg-white p-2 mx-auto border-2 border-amber-400 shadow-lg flex items-center justify-center">
            <img src="/logo.png" alt="شعار منصة كايزن" className="w-full h-full object-contain" />
          </div>
          <div>
            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">
              {isAr ? 'الهيئة الملكية للجبيل وينبع' : 'Royal Commission for Jubail and Yanbu'}
            </span>
            <h1 className="text-xl font-black text-[#0B2545] mt-0.5">
              {isAr ? 'منصة كايزن — متوسطة ابن سينا' : 'Kaizen Platform — Ibn Sina'}
            </h1>
          </div>
          <p className="text-xs text-amber-800 font-bold bg-amber-50 py-2 px-3 rounded-xl border border-amber-200 leading-relaxed">
            {isAr ? '✨ "التميز ليس استثناءً، بل هو عادة مستمرة بنهج الكايزن"' : '✨ "Excellence is not an exception, but a continuous habit"'}
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-xs font-bold">
          <div className="space-y-1">
            <label className="text-gray-700 block">
              {isAr ? 'اختر نوع المستفيد (صلاحية اللوحة):' : 'Select User Role:'}
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-2xl p-3.5 text-[#0B2545] font-black focus:ring-2 focus:ring-[#00B4D8] outline-none shadow-sm"
            >
              {beneficiaries.map((b, i) => (
                <option key={i} value={b.path} className="py-2">
                  {isAr ? b.nameAr : b.nameEn}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-gray-700 block">
              {isAr ? 'اسم المستخدم (Username):' : 'Username:'}
            </label>
            <input
              type="text"
              placeholder={isAr ? 'أدخل اسم المستخدم أو البريد' : 'Enter username or email'}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-2xl p-3.5 text-[#0B2545] focus:ring-2 focus:ring-[#00B4D8] outline-none shadow-sm"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-gray-700 block">
              {isAr ? 'كلمة المرور (Password):' : 'Password:'}
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-2xl p-3.5 text-[#0B2545] focus:ring-2 focus:ring-[#00B4D8] outline-none shadow-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#0B2545] hover:bg-[#134074] text-white font-black p-4 rounded-2xl text-sm shadow-lg transition transform hover:-translate-y-0.5 mt-3"
          >
            {isAr ? '🔓 دخول النظام بالصلاحية المحددة' : '🔓 Login to System'}
          </button>
        </form>

        <div className="text-center pt-1 border-t border-gray-100">
          <p className="text-[11px] text-gray-500 font-bold">
            {isAr ? 'نظام إدارة الأنشطة والتميز الطلابي — الإصدار 2026' : 'Student Activities Management System — 2026'}
          </p>
        </div>

      </div>
    </div>
  );
}