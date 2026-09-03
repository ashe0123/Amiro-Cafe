'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MenuService } from '@/services/menuService';
import { Category } from '@/types/menu';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { ArrowLeft, Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import AddCategoryModal from '@/components/admin/AddCategoryModal';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    const cats = MenuService.getCategories();
    setCategories(cats);
  };

  const toggleEnabled = (id: string) => {
    const category = categories.find(c => c.id === id);
    if (category) {
      MenuService.updateCategory(id, { isEnabled: !category.isEnabled });
      loadCategories();
      showToast('Category updated', 'success');
    }
  };

  const deleteCategory = (id: string, name: string) => {
    const itemsInCategory = MenuService.getMenuItemsByCategory(id);
    if (itemsInCategory.length > 0) {
      alert(`Cannot delete "${name}" because it contains ${itemsInCategory.length} menu items. Please move or delete those items first.`);
      return;
    }

    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      MenuService.deleteCategory(id);
      loadCategories();
      showToast('Category deleted', 'success');
    }
  };

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
              <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
              <p className="text-gray-600 mt-1">Organize your menu items into categories</p>
            </div>
            <Button variant="primary" onClick={() => setShowAddModal(true)}>
              <Plus className="w-4 h-4" />
              Add Category
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map(category => {
            const itemCount = MenuService.getMenuItemsByCategory(category.id).length;
            return (
              <Card key={category.id}>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {category.icon && (
                        <div className="text-3xl">{category.icon}</div>
                      )}
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{category.name}</h3>
                        {category.nameAm && (
                          <p className="text-sm text-gray-600">{category.nameAm}</p>
                        )}
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      category.isEnabled
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {category.isEnabled ? 'Active' : 'Hidden'}
                    </span>
                  </div>

                  {category.description && (
                    <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {itemCount} {itemCount === 1 ? 'item' : 'items'}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => toggleEnabled(category.id)}
                        variant="outline"
                        size="sm"
                      >
                        {category.isEnabled ? (
                          <><EyeOff className="w-4 h-4" /> Hide</>
                        ) : (
                          <><Eye className="w-4 h-4" /> Show</>
                        )}
                      </Button>
                      <Button
                        onClick={() => deleteCategory(category.id, category.name)}
                        variant="danger"
                        size="sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {categories.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">📂</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No categories found</h3>
            <p className="text-gray-500 mb-4">Create your first category to organize menu items</p>
            <Button variant="primary" onClick={() => setShowAddModal(true)}>
              <Plus className="w-4 h-4" />
              Add Category
            </Button>
          </div>
        )}
      </div>

      <AddCategoryModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSuccess={loadCategories}
      />
    </div>
  );
}
