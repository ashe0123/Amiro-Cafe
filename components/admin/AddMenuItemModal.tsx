'use client';

import { useState } from 'react';
import { MenuService } from '@/services/menuService';
import { Category } from '@/types/menu';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';

interface AddMenuItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onSuccess: () => void;
}

export default function AddMenuItemModal({ isOpen, onClose, categories, onSuccess }: AddMenuItemModalProps) {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    nameAm: '',
    description: '',
    descriptionAm: '',
    price: '',
    categoryId: categories[0]?.id || '',
    image: '',
    isVegetarian: false,
    isSpicy: false,
    isPopular: false,
    isAvailable: true,
    preparationTime: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.price || !formData.categoryId) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    try {
      MenuService.addMenuItem({
        name: formData.name,
        nameAm: formData.nameAm,
        description: formData.description,
        descriptionAm: formData.descriptionAm,
        price: parseFloat(formData.price),
        categoryId: formData.categoryId,
        image: formData.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop',
        isVegetarian: formData.isVegetarian,
        isSpicy: formData.isSpicy,
        isPopular: formData.isPopular,
        isAvailable: formData.isAvailable,
        preparationTime: formData.preparationTime ? parseInt(formData.preparationTime) : undefined,
        displayOrder: Date.now(),
      });

      showToast('Menu item added successfully!', 'success');
      onSuccess();
      onClose();
      
      // Reset form
      setFormData({
        name: '',
        nameAm: '',
        description: '',
        descriptionAm: '',
        price: '',
        categoryId: categories[0]?.id || '',
        image: '',
        isVegetarian: false,
        isSpicy: false,
        isPopular: false,
        isAvailable: true,
        preparationTime: '',
      });
    } catch (error) {
      showToast('Error adding menu item', 'error');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Menu Item" size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Name (English)"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            placeholder="e.g., Margherita Pizza"
          />
          <Input
            label="Name (Amharic)"
            value={formData.nameAm}
            onChange={(e) => setFormData({ ...formData, nameAm: e.target.value })}
            placeholder="e.g., ማርገሪታ ፒዛ"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Description (English) <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 placeholder-gray-400"
            rows={3}
            required
            placeholder="Brief description of the item"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Description (Amharic)
          </label>
          <textarea
            value={formData.descriptionAm}
            onChange={(e) => setFormData({ ...formData, descriptionAm: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 placeholder-gray-400"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Price (ETB)"
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
            placeholder="e.g., 250"
            min="0"
            step="0.01"
          />
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 bg-white"
              required
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Image URL"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="https://example.com/image.jpg"
          />
          
          <Input
            label="Preparation Time (minutes)"
            type="number"
            value={formData.preparationTime}
            onChange={(e) => setFormData({ ...formData, preparationTime: e.target.value })}
            placeholder="e.g., 15"
            min="0"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isVegetarian}
              onChange={(e) => setFormData({ ...formData, isVegetarian: e.target.checked })}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <span className="text-sm font-medium text-gray-700">Vegetarian</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isSpicy}
              onChange={(e) => setFormData({ ...formData, isSpicy: e.target.checked })}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <span className="text-sm font-medium text-gray-700">Spicy</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isPopular}
              onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <span className="text-sm font-medium text-gray-700">Popular</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.isAvailable}
              onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <span className="text-sm font-medium text-gray-700">Available</span>
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Add Menu Item
          </Button>
        </div>
      </form>
    </Modal>
  );
}
