'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MenuService } from '@/services/menuService';
import { BusinessService } from '@/services/businessService';
import { DashboardStats } from '@/types/settings';
import { LayoutDashboard, UtensilsCrossed, FolderTree, Settings, QrCode, Download, Upload, RotateCcw } from 'lucide-react';
import Card, { CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { formatDateTime } from '@/lib/utils';
import { demoBusinessInfo, demoCategories, demoMenuItems } from '@/data/demoData';

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    totalMenuItems: 0,
    availableItems: 0,
    unavailableItems: 0,
    totalCategories: 0,
    popularItems: 0,
    vegetarianItems: 0,
    lastUpdateTime: new Date().toISOString(),
  });

  useEffect(() => {
    // Initialize data if needed
    BusinessService.initializeWithDemoData(demoBusinessInfo);
    MenuService.initializeWithDemoData(demoCategories, demoMenuItems);

    loadStats();
  }, []);

  const loadStats = () => {
    const menuItems = MenuService.getMenuItems();
    const categories = MenuService.getCategories();

    setStats({
      totalMenuItems: menuItems.length,
      availableItems: menuItems.filter(item => item.isAvailable).length,
      unavailableItems: menuItems.filter(item => !item.isAvailable).length,
      totalCategories: categories.length,
      popularItems: menuItems.filter(item => item.isPopular).length,
      vegetarianItems: menuItems.filter(item => item.isVegetarian).length,
      lastUpdateTime: new Date().toISOString(),
    });
  };

  const navigationCards = [
    {
      title: 'Menu Items',
      description: 'Manage your menu items, prices, and availability',
      icon: UtensilsCrossed,
      href: '/admin/menu',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Categories',
      description: 'Organize and manage menu categories',
      icon: FolderTree,
      href: '/admin/categories',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'QR Code',
      description: 'Generate and download QR codes',
      icon: QrCode,
      href: '/admin/qr-code',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Settings',
      description: 'Configure business information and theme',
      icon: Settings,
      href: '/admin/settings',
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <LayoutDashboard className="w-8 h-8 text-primary-500" />
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Manage your digital menu system</p>
            </div>
            <Link href="/menu/amiro-cafe-restaurant">
              <Button variant="outline">
                View Menu
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Warning Banner */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Development Notice:</strong> This is a frontend-only management interface using localStorage. 
                For production with multiple users, add proper authentication and a backend database.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Menu Items</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalMenuItems}</p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <UtensilsCrossed className="w-6 h-6 text-primary-600" />
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Available Items</p>
                  <p className="text-3xl font-bold text-green-600 mt-1">{stats.availableItems}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">✓</span>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Unavailable Items</p>
                  <p className="text-3xl font-bold text-red-600 mt-1">{stats.unavailableItems}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">✕</span>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Categories</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalCategories}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <FolderTree className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Popular Items</p>
                  <p className="text-3xl font-bold text-yellow-600 mt-1">{stats.popularItems}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">⭐</span>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Vegetarian Items</p>
                  <p className="text-3xl font-bold text-green-600 mt-1">{stats.vegetarianItems}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🌱</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {navigationCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link key={card.href} href={card.href}>
                <Card hover clickable className="h-full">
                  <CardBody className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 ${card.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-7 h-7 ${card.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{card.title}</h3>
                        <p className="text-gray-600 text-sm">{card.description}</p>
                      </div>
                      <div className="text-gray-400">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardBody className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/admin/data">
                <Button variant="outline" fullWidth className="h-auto py-4">
                  <div className="flex flex-col items-center gap-2">
                    <Download className="w-6 h-6" />
                    <span>Export Data</span>
                  </div>
                </Button>
              </Link>
              <Link href="/admin/data">
                <Button variant="outline" fullWidth className="h-auto py-4">
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="w-6 h-6" />
                    <span>Import Data</span>
                  </div>
                </Button>
              </Link>
              <Link href="/admin/data">
                <Button variant="outline" fullWidth className="h-auto py-4">
                  <div className="flex flex-col items-center gap-2">
                    <RotateCcw className="w-6 h-6" />
                    <span>Reset Demo Data</span>
                  </div>
                </Button>
              </Link>
            </div>
          </CardBody>
        </Card>

        {/* Last Update */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Last updated: {formatDateTime(stats.lastUpdateTime)}
        </div>
      </div>
    </div>
  );
}
