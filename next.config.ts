import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // إعادة التوجيه الذكية لتوحيد مسار لوحة ولي الأمر ومنع خطأ الرابط
  async redirects() {
    return [
      {
        source: '/dashboard/parents',
        destination: '/dashboard/parent',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;