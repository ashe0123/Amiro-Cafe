'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BusinessService } from '@/services/businessService';
import { MenuService } from '@/services/menuService';
import { demoBusinessInfo, demoCategories, demoMenuItems } from '@/data/demoData';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Initialize with demo data if needed
    BusinessService.initializeWithDemoData(demoBusinessInfo);
    MenuService.initializeWithDemoData(demoCategories, demoMenuItems);

    // Get business info and redirect to menu
    const businessInfo = BusinessService.getBusinessInfo();
    if (businessInfo) {
      router.push(`/menu/${businessInfo.slug}`);
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-green-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-500 mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold text-gray-800">Loading Menu...</h1>
        <p className="text-gray-600 mt-2">አሚሮ ካፌ እና ሬስቶራንት</p>
      </div>
    </div>
  );
}
