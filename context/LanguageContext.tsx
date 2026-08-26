'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  isAr: boolean;
  dir: 'rtl' | 'ltr';
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ar: {
    // ---- الأدوات العامة ----
    print_export: 'طباعة / تصدير',
    logout: 'تسجيل الخروج',
    switch_lang: 'English',

    // ---- لوحة المعلم ورائد الفصل ----
    teacher_dashboard: 'لوحة التحكم للمعلم ورائد الفصل',
    teacher_info: 'الأستاذ المعلم - متوسطة ابن سينا بالهيئة الملكية بينبع',
    tab_class_leader: '👑 رائد الفصل ومجلس القيادة',
    tab_club_leader: '🎯 مشرف جماعات النشاط',
    tab_reports: '📝 طلبات وتقارير الفعاليات',
    tab_points: '🎖️ منح نقاط التميز',
    class_roles_title: 'تشكيل مجلس قيادة الفصل',
    select_class: 'اختر الفصل:',
    leader: 'عريف الفصل',
    sub_leader: 'نائب العريف',
    secretary: 'أمين / مقرر الفصل',
    activity_officer: 'مسؤول النشاط والنظام',
    save_structure: 'حفظ وتوثيق تشكيل الفصل 💾',
    club_members_title: 'إدارة أعضاء جماعة / نادي النشاط',
    select_club: 'اختر الجماعة / النادي:',
    add_student: 'إضافة طالب بالجماعة',
    search_student: 'ابحث عن اسم الطالب...',
    student_name: 'اسم الطالب',
    grade_class: 'الصف / الفصل',
    role_in_club: 'الدور في الجماعة',
    action: 'الإجراء',
    remove: 'إزالة',
    create_activity_req: 'رفع طلب إقامة نشاط / برنامج',
    activity_name: 'اسم النشاط',
    field: 'المجال',
    event_date: 'تاريخ التنفيذ',
    submit_req: 'إرسال الطلب لرائد النشاط 📤',
    grant_points_title: 'منح نقاط التميز للطالب 🌟',
    points_count: 'عدد النقاط المستحقة',
    points_reason: 'سبب منح النقاط',
    grant_btn: 'منح نقاط التميز للطالب 🌟',
  },
  en: {
    // ---- General Tools ----
    print_export: 'Print / Export',
    logout: 'Logout',
    switch_lang: 'عربي',

    // ---- Teacher & Advisor Dashboard ----
    teacher_dashboard: 'Teacher & Class Advisor Dashboard',
    teacher_info: 'Teacher Profile - Ibn Sina Middle School at Royal Commission in Yanbu',
    tab_class_leader: '👑 Class Leadership Board',
    tab_club_leader: '🎯 Activity Club Advisor',
    tab_reports: '📝 Activity Requests & Reports',
    tab_points: '🎖️ Grant Merit Points',
    class_roles_title: 'Class Leadership Structure',
    select_class: 'Select Class:',
    leader: 'Class President (Caretaker)',
    sub_leader: 'Vice President',
    secretary: 'Secretary / Reporter',
    activity_officer: 'Activity & Order Officer',
    save_structure: 'Save Leadership Structure 💾',
    club_members_title: 'Manage Club Members',
    select_club: 'Select Club:',
    add_student: 'Add Student to Club',
    search_student: 'Search student name...',
    student_name: 'Student Name',
    grade_class: 'Grade / Class',
    role_in_club: 'Role in Club',
    action: 'Action',
    remove: 'Remove',
    create_activity_req: 'Submit Activity/Program Request',
    activity_name: 'Activity Name',
    field: 'Field / Domain',
    event_date: 'Execution Date',
    submit_req: 'Submit to Activity Leader 📤',
    grant_points_title: 'Grant Student Merit Points 🌟',
    points_count: 'Points Amount',
    points_reason: 'Reason for Granting Points',
    grant_btn: 'Grant Points 🌟',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // ضبط اللغة الافتراضية لتكون العربية تلقائياً عند فتح المعاينة
  const [language, setLanguage] = useState<Language>('ar');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const isAr = language === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, isAr, dir, toggleLanguage, t }}>
      <div dir={dir}>{children}</div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}