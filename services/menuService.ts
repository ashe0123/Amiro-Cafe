/**
 * Menu Service
 * 
 * Manages menu items and categories.
 * Currently uses localStorage for storage.
 * 
 * Future Enhancement:
 * Replace localStorage calls with API endpoints:
 * - GET /api/menu-items
 * - POST /api/menu-items
 * - PUT /api/menu-items/:id
 * - DELETE /api/menu-items/:id
 */

import { MenuItem, Category, MenuFilters } from '@/types/menu';
import { StorageService, STORAGE_KEYS } from './storageService';

export class MenuService {
  /**
   * Get all menu items
   */
  static getMenuItems(): MenuItem[] {
    const items = StorageService.load<MenuItem[]>(STORAGE_KEYS.MENU_ITEMS);
    return items || [];
  }

  /**
   * Get menu item by ID
   */
  static getMenuItemById(id: string): MenuItem | null {
    const items = this.getMenuItems();
    return items.find(item => item.id === id) || null;
  }

  /**
   * Get filtered menu items
   */
  static getFilteredMenuItems(filters: MenuFilters): MenuItem[] {
    let items = this.getMenuItems();

    // Filter by category
    if (filters.categoryId) {
      items = items.filter(item => item.categoryId === filters.categoryId);
    }

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      items = items.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.nameAm?.toLowerCase().includes(query) ||
        item.descriptionAm?.toLowerCase().includes(query) ||
        item.ingredients?.some(ing => ing.toLowerCase().includes(query))
      );
    }

    // Filter by vegetarian
    if (filters.isVegetarian !== undefined) {
      items = items.filter(item => item.isVegetarian === filters.isVegetarian);
    }

    // Filter by availability
    if (filters.isAvailable !== undefined) {
      items = items.filter(item => item.isAvailable === filters.isAvailable);
    }

    // Filter by popular
    if (filters.isPopular !== undefined) {
      items = items.filter(item => item.isPopular === filters.isPopular);
    }

    // Sort by display order
    return items.sort((a, b) => a.displayOrder - b.displayOrder);
  }

  /**
   * Add new menu item
   */
  static addMenuItem(item: Omit<MenuItem, 'id' | 'createdAt' | 'updatedAt'>): MenuItem {
    const items = this.getMenuItems();
    const newItem: MenuItem = {
      ...item,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    items.push(newItem);
    StorageService.save(STORAGE_KEYS.MENU_ITEMS, items);
    
    return newItem;
  }

  /**
   * Update menu item
   */
  static updateMenuItem(id: string, updates: Partial<MenuItem>): MenuItem | null {
    const items = this.getMenuItems();
    const index = items.findIndex(item => item.id === id);
    
    if (index === -1) return null;
    
    items[index] = {
      ...items[index],
      ...updates,
      id, // Ensure ID doesn't change
      updatedAt: new Date().toISOString(),
    };
    
    StorageService.save(STORAGE_KEYS.MENU_ITEMS, items);
    return items[index];
  }

  /**
   * Delete menu item
   */
  static deleteMenuItem(id: string): boolean {
    const items = this.getMenuItems();
    const filteredItems = items.filter(item => item.id !== id);
    
    if (filteredItems.length === items.length) return false;
    
    StorageService.save(STORAGE_KEYS.MENU_ITEMS, filteredItems);
    return true;
  }

  /**
   * Toggle item availability
   */
  static toggleAvailability(id: string): MenuItem | null {
    const item = this.getMenuItemById(id);
    if (!item) return null;
    
    return this.updateMenuItem(id, { isAvailable: !item.isAvailable });
  }

  /**
   * Get all categories
   */
  static getCategories(): Category[] {
    const categories = StorageService.load<Category[]>(STORAGE_KEYS.CATEGORIES);
    return (categories || []).sort((a, b) => a.displayOrder - b.displayOrder);
  }

  /**
   * Get enabled categories only
   */
  static getEnabledCategories(): Category[] {
    return this.getCategories().filter(cat => cat.isEnabled);
  }

  /**
   * Get category by ID
   */
  static getCategoryById(id: string): Category | null {
    const categories = this.getCategories();
    return categories.find(cat => cat.id === id) || null;
  }

  /**
   * Add new category
   */
  static addCategory(category: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>): Category {
    const categories = this.getCategories();
    const newCategory: Category = {
      ...category,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    categories.push(newCategory);
    StorageService.save(STORAGE_KEYS.CATEGORIES, categories);
    
    return newCategory;
  }

  /**
   * Update category
   */
  static updateCategory(id: string, updates: Partial<Category>): Category | null {
    const categories = this.getCategories();
    const index = categories.findIndex(cat => cat.id === id);
    
    if (index === -1) return null;
    
    categories[index] = {
      ...categories[index],
      ...updates,
      id,
      updatedAt: new Date().toISOString(),
    };
    
    StorageService.save(STORAGE_KEYS.CATEGORIES, categories);
    return categories[index];
  }

  /**
   * Delete category
   */
  static deleteCategory(id: string): boolean {
    const categories = this.getCategories();
    const filteredCategories = categories.filter(cat => cat.id !== id);
    
    if (filteredCategories.length === categories.length) return false;
    
    StorageService.save(STORAGE_KEYS.CATEGORIES, filteredCategories);
    return true;
  }

  /**
   * Get menu items by category
   */
  static getMenuItemsByCategory(categoryId: string): MenuItem[] {
    return this.getFilteredMenuItems({ categoryId });
  }

  /**
   * Get popular menu items
   */
  static getPopularItems(limit?: number): MenuItem[] {
    const items = this.getMenuItems().filter(item => item.isPopular && item.isAvailable);
    const sorted = items.sort((a, b) => a.displayOrder - b.displayOrder);
    return limit ? sorted.slice(0, limit) : sorted;
  }

  /**
   * Generate unique ID
   */
  private static generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Initialize with demo data if empty
   */
  static initializeWithDemoData(demoCategories: Category[], demoItems: MenuItem[]): void {
    const existingCategories = this.getCategories();
    const existingItems = this.getMenuItems();

    if (existingCategories.length === 0) {
      StorageService.save(STORAGE_KEYS.CATEGORIES, demoCategories);
    }

    if (existingItems.length === 0) {
      StorageService.save(STORAGE_KEYS.MENU_ITEMS, demoItems);
    }
  }
}
