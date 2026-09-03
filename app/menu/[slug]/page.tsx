'use client';

import { use, useEffect, useState } from 'react';
import { Search, Phone, MapPin, Globe, Info } from 'lucide-react';
import { BusinessService } from '@/services/businessService';
import { MenuService } from '@/services/menuService';
import { BusinessInfo } from '@/types/business';
import { MenuItem, Category } from '@/types/menu';
import MenuHeader from '@/components/menu/MenuHeader';
import CategoryFilter from '@/components/menu/CategoryFilter';
import MenuItemCard from '@/components/menu/MenuItemCard';
import MenuItemModal from '@/components/menu/MenuItemModal';
import BusinessInfoSection from '@/components/menu/BusinessInfoSection';
import { demoBusinessInfo, demoCategories, demoMenuItems } from '@/data/demoData';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function MenuPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [language, setLanguage] = useState<'en' | 'am'>('en');
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    // Initialize with demo data
    BusinessService.initializeWithDemoData(demoBusinessInfo);
    MenuService.initializeWithDemoData(demoCategories, demoMenuItems);

    // Load data
    const business = BusinessService.getBusinessInfo();
    const cats = MenuService.getEnabledCategories();
    const items = MenuService.getMenuItems();

    setBusinessInfo(business);
    setCategories(cats);
    setMenuItems(items);
    setFilteredItems(items.filter(item => item.isAvailable));
    
    // Set language from business info
    if (business?.defaultLanguage) {
      setLanguage(business.defaultLanguage);
    }
  }, []);

  useEffect(() => {
    let filtered = menuItems.filter(item => item.isAvailable);

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.categoryId === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.nameAm?.toLowerCase().includes(query) ||
        item.descriptionAm?.toLowerCase().includes(query) ||
        item.ingredients?.some(ing => ing.toLowerCase().includes(query))
      );
    }

    setFilteredItems(filtered);
  }, [selectedCategory, searchQuery, menuItems]);

  if (!businessInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading menu...</p>
        </div>
      </div>
    );
  }

  const categoryCount = categories.map(cat => ({
    ...cat,
    count: menuItems.filter(item => item.categoryId === cat.id && item.isAvailable).length,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Header */}
      <MenuHeader
        businessInfo={businessInfo}
        language={language}
        onLanguageChange={setLanguage}
        onInfoClick={() => setShowInfo(true)}
      />

      {/* Search Bar */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={language === 'en' ? "Search menu..." : "ምግብ ይፈልጉ..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Category Filter */}
        <CategoryFilter
          categories={categoryCount}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          language={language}
        />
      </div>

      {/* Menu Items */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                currency={businessInfo.currency}
                language={language}
                onClick={() => setSelectedItem(item)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {language === 'en' ? 'No items found' : 'ምንም ምግብ አልተገኘም'}
            </h3>
            <p className="text-gray-500">
              {language === 'en'
                ? 'Try adjusting your search or filter'
                : 'ፍለጋዎን ወይም ማጣሪያዎን ለመቀየር ይሞክሩ'}
            </p>
          </div>
        )}
      </div>

      {/* Quick Contact Actions */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-30 no-print">
        <button
          onClick={() => setShowInfo(true)}
          className="bg-primary-500 text-white p-4 rounded-full shadow-lg hover:bg-primary-600 transition-all hover:scale-110"
        >
          <Info className="w-6 h-6" />
        </button>
        {businessInfo.phone && (
          <a
            href={`tel:${businessInfo.phone}`}
            className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all hover:scale-110"
          >
            <Phone className="w-6 h-6" />
          </a>
        )}
        {businessInfo.googleMapsUrl && (
          <a
            href={businessInfo.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 transition-all hover:scale-110"
          >
            <MapPin className="w-6 h-6" />
          </a>
        )}
      </div>

      {/* Menu Item Detail Modal */}
      {selectedItem && (
        <MenuItemModal
          item={selectedItem}
          currency={businessInfo.currency}
          language={language}
          onClose={() => setSelectedItem(null)}
        />
      )}

      {/* Business Info Modal */}
      {showInfo && (
        <BusinessInfoSection
          businessInfo={businessInfo}
          language={language}
          onClose={() => setShowInfo(false)}
        />
      )}
    </div>
  );
}
