/**
 * Storage Service
 * 
 * Frontend-only storage using localStorage.
 * This is NOT a secure database and is intended for demo/local use only.
 * 
 * For production with multiple users, replace this with:
 * - REST API calls to a backend server
 * - Database (PostgreSQL, MySQL, MongoDB, Supabase, etc.)
 * - Proper authentication and authorization
 */

const STORAGE_KEYS = {
  BUSINESS_INFO: 'amiro_business_info',
  CATEGORIES: 'amiro_categories',
  MENU_ITEMS: 'amiro_menu_items',
  SETTINGS: 'amiro_settings',
  LAST_SYNC: 'amiro_last_sync',
} as const;

export class StorageService {
  private static isClient = typeof window !== 'undefined';

  /**
   * Save data to localStorage
   */
  static save<T>(key: string, data: T): void {
    if (!this.isClient) return;
    
    try {
      const serialized = JSON.stringify(data);
      localStorage.setItem(key, serialized);
      this.updateLastSync();
    } catch (error) {
      console.error(`Error saving to localStorage (key: ${key}):`, error);
    }
  }

  /**
   * Load data from localStorage
   */
  static load<T>(key: string): T | null {
    if (!this.isClient) return null;
    
    try {
      const serialized = localStorage.getItem(key);
      if (serialized === null) return null;
      return JSON.parse(serialized) as T;
    } catch (error) {
      console.error(`Error loading from localStorage (key: ${key}):`, error);
      return null;
    }
  }

  /**
   * Remove data from localStorage
   */
  static remove(key: string): void {
    if (!this.isClient) return;
    
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from localStorage (key: ${key}):`, error);
    }
  }

  /**
   * Clear all app data from localStorage
   */
  static clearAll(): void {
    if (!this.isClient) return;
    
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  /**
   * Check if data exists in localStorage
   */
  static exists(key: string): boolean {
    if (!this.isClient) return false;
    return localStorage.getItem(key) !== null;
  }

  /**
   * Update last sync timestamp
   */
  private static updateLastSync(): void {
    if (!this.isClient) return;
    
    try {
      localStorage.setItem(STORAGE_KEYS.LAST_SYNC, new Date().toISOString());
    } catch (error) {
      console.error('Error updating last sync time:', error);
    }
  }

  /**
   * Get last sync timestamp
   */
  static getLastSync(): string | null {
    if (!this.isClient) return null;
    return localStorage.getItem(STORAGE_KEYS.LAST_SYNC);
  }

  /**
   * Export all data as JSON
   */
  static exportAll(): string {
    if (!this.isClient) return '{}';
    
    const exportData = {
      version: '1.0.0',
      exportDate: new Date().toISOString(),
      businessInfo: this.load(STORAGE_KEYS.BUSINESS_INFO),
      categories: this.load(STORAGE_KEYS.CATEGORIES),
      menuItems: this.load(STORAGE_KEYS.MENU_ITEMS),
      settings: this.load(STORAGE_KEYS.SETTINGS),
    };
    
    return JSON.stringify(exportData, null, 2);
  }

  /**
   * Import data from JSON
   */
  static importAll(jsonData: string): boolean {
    if (!this.isClient) return false;
    
    try {
      const data = JSON.parse(jsonData);
      
      // Validate data structure
      if (!data.version || !data.exportDate) {
        throw new Error('Invalid export file format');
      }
      
      // Import each piece of data
      if (data.businessInfo) {
        this.save(STORAGE_KEYS.BUSINESS_INFO, data.businessInfo);
      }
      if (data.categories) {
        this.save(STORAGE_KEYS.CATEGORIES, data.categories);
      }
      if (data.menuItems) {
        this.save(STORAGE_KEYS.MENU_ITEMS, data.menuItems);
      }
      if (data.settings) {
        this.save(STORAGE_KEYS.SETTINGS, data.settings);
      }
      
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }
}

export { STORAGE_KEYS };
