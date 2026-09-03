'use client';

import { useState } from 'react';
import { MenuService } from '@/services/menuService';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddCategoryModal({ isOpen, onClose, onSuccess }: AddCategoryModalProps) {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    nameAm: '',
    description: '',
    descriptionAm: '',
    icon: '',
    isEnabled: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name) {
      showToast('Please enter a category name', 'error');
      return;
    }

    try {
      MenuService.addCategory({
        name: formData.name,
        nameAm: formData.nameAm,
        description: formData.description,
        descriptionAm: formData.descriptionAm,
        icon: formData.icon,
        isEnabled: formData.isEnabled,
        displayOrder: Date.now(),
      });

      showToast('Category added successfully!', 'success');
      onSuccess();
      onClose();
      
      // Reset form
      setFormData({
        name: '',
        nameAm: '',
        description: '',
        descriptionAm: '',
        icon: '',
        isEnabled: true,
      });
    } catch (error) {
      showToast('Error adding category', 'error');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Category" size="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Name (English)"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            placeholder="e.g., Desserts"
          />
          <Input
            label="Name (Amharic)"
            value={formData.nameAm}
            onChange={(e) => setFormData({ ...formData, nameAm: e.target.value })}
            placeholder="e.g., ጣፋጮች"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Description (English)
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 placeholder-gray-400"
            rows={2}
            placeholder="Brief description"
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
            rows={2}
          />
        </div>

        <Input
          label="Icon (Emoji)"
          value={formData.icon}
          onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
          placeholder="e.g., 🍰"
          maxLength={2}
          helperText="Enter an emoji to represent this category"
        />

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isEnabled}
            onChange={(e) => setFormData({ ...formData, isEnabled: e.target.checked })}
            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <span className="text-sm font-medium text-gray-700">Enable category</span>
        </label>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Add Category
          </Button>
        </div>
      </form>
    </Modal>
  );
}
