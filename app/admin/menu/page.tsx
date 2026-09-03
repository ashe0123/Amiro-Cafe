'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MenuService } from '@/services/menuService';
import { MenuItem, Category } from '@/types/menu';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { ArrowLeft, Plus, Edit, Trash2, Power, PowerOff } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import AddMenuItemModal from '@/components/admin/AddMenuItemModal';

export default function MenuManagementPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const items = MenuService.getMenuItems();
    const cats = MenuService.getCategories();
    setMenuItems(items);
    setCategories(cats);
  };

  const toggleAvailability = (id: string) => {
    MenuService.toggleAvailability(id);
    loadData();
    showToast('Item availability updated', 'success');
  };

  const deleteItem = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      MenuService.deleteMenuItem(id);
      loadData();
      showToast('Menu item deleted', 'success');
    }
  };

  const filteredItems = selectedCategory === 'all'
    ? menuItems
    : menuItems.filter(item => item.categoryId === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link href="/admin">
            <Button variant="ghost" size="sm" className="mb-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Menu Items</h1>
              <p className="text-gray-600 mt-1">Manage your menu items and pricing</p>
            </div>
            <Button variant="primary" onClick={() => setShowAddModal(true)}>
              <Plus className="w-4 h-4" />
              Add Item
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All ({menuItems.length})
          </button>
          {categories.map(cat => {
            const count = menuItems.filter(item => item.categoryId === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Items List */}
        <div className="space-y-4">
          {filteredItems.map(item => {
            const category = categories.find(c => c.id === item.categoryId);
            return (
              <Card key={item.id}>
                <div className="p-4 flex items-center gap-4">
                  {/* Image */}
                  <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl">
                        🍽️
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-gray-900 truncate">{item.name}</h3>
                      {item.isPopular && <span className="text-yellow-500">⭐</span>}
                      {item.isVegetarian && <span className="text-green-500">🌱</span>}
                      {item.isSpicy && <span className="text-red-500">🌶️</span>}
                    </div>
                    <p className="text-sm text-gray-600 mb-1 truncate">{item.description}</p>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span className="font-medium">{formatPrice(item.price, 'ETB')}</span>
                      {category && <span>• {category.name}</span>}
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        item.isAvailable
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {item.isAvailable ? 'Available' : 'Unavailable'}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button
                      onClick={() => toggleAvailability(item.id)}
                      variant={item.isAvailable ? 'outline' : 'secondary'}
                      size="sm"
                      title={item.isAvailable ? 'Mark unavailable' : 'Mark available'}
                    >
                      {item.isAvailable ? (
                        <PowerOff className="w-4 h-4" />
                      ) : (
                        <Power className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      onClick={() => deleteItem(item.id, item.name)}
                      variant="danger"
                      size="sm"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}

          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">🍽️</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No menu items found</h3>
              <p className="text-gray-500 mb-4">Start by adding your first menu item</p>
              <Button variant="primary" onClick={() => setShowAddModal(true)}>
                <Plus className="w-4 h-4" />
                Add Menu Item
              </Button>
            </div>
          )}
        </div>
      </div>

      <AddMenuItemModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        categories={categories}
        onSuccess={loadData}
      />
    </div>
  );
}
