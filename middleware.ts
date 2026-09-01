import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // السماح بمرور جميع الطلبات لجميع مسارات المنصة واللوحات بسلاسة
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * استثناء ملفات النظام والصور لتسريع الأداء
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};