/**
 * Business Service
 * 
 * Manages business information and settings.
 * Currently uses localStorage for storage.
 * 
 * Future Enhancement:
 * Replace localStorage with API endpoints:
 * - GET /api/business
 * - PUT /api/business
 * - GET /api/settings
 * - PUT /api/settings
 */

import { BusinessInfo, ThemeSettings } from '@/types/business';
import { AppSettings } from '@/types/settings';
import { StorageService, STORAGE_KEYS } from './storageService';

export class BusinessService {
  /**
   * Get business information
   */
  static getBusinessInfo(): BusinessInfo | null {
    return StorageService.load<BusinessInfo>(STORAGE_KEYS.BUSINESS_INFO);
  }

  /**
   * Update business information
   */
  static updateBusinessInfo(updates: Partial<BusinessInfo>): BusinessInfo | null {
    const current = this.getBusinessInfo();
    if (!current) return null;

    const updated: BusinessInfo = {
      ...current,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    StorageService.save(STORAGE_KEYS.BUSINESS_INFO, updated);
    return updated;
  }

  /**
   * Set business information (full replacement)
   */
  static setBusinessInfo(businessInfo: BusinessInfo): void {
    StorageService.save(STORAGE_KEYS.BUSINESS_INFO, businessInfo);
  }

  /**
   * Get app settings
   */
  static getSettings(): AppSettings {
    const settings = StorageService.load<AppSettings>(STORAGE_KEYS.SETTINGS);
    
    // Return default settings if none exist
    if (!settings) {
      return this.getDefaultSettings();
    }
    
    return settings;
  }

  /**
   * Update app settings
   */
  static updateSettings(updates: Partial<AppSettings>): AppSettings {
    const current = this.getSettings();
    const updated: AppSettings = {
      ...current,
      ...updates,
    };

    StorageService.save(STORAGE_KEYS.SETTINGS, updated);
    return updated;
  }

  /**
   * Update theme settings
   */
  static updateTheme(themeUpdates: Partial<ThemeSettings>): void {
    const settings = this.getSettings();
    const updatedSettings: AppSettings = {
      ...settings,
      theme: {
        ...settings.theme,
        ...themeUpdates,
      },
    };

    StorageService.save(STORAGE_KEYS.SETTINGS, updatedSettings);
  }

  /**
   * Get default settings
   */
  private static getDefaultSettings(): AppSettings {
    return {
      version: '1.0.0',
      language: 'en',
      theme: {
        primaryColor: '#f59e0b',
        secondaryColor: '#22c55e',
        accentColor: '#3b82f6',
        fontFamily: 'Inter',
        buttonRadius: 'md',
        cardRadius: 'lg',
        cardShadow: 'md',
      },
    };
  }

  /**
   * Initialize with demo business data if empty
   */
  static initializeWithDemoData(demoBusinessInfo: BusinessInfo): void {
    const existing = this.getBusinessInfo();
    if (!existing) {
      StorageService.save(STORAGE_KEYS.BUSINESS_INFO, demoBusinessInfo);
    }

    // Always ensure settings exist
    const existingSettings = StorageService.load<AppSettings>(STORAGE_KEYS.SETTINGS);
    if (!existingSettings) {
      StorageService.save(STORAGE_KEYS.SETTINGS, this.getDefaultSettings());
    }
  }

  /**
   * Reset to demo data
   */
  static resetToDemoData(demoBusinessInfo: BusinessInfo): void {
    StorageService.save(STORAGE_KEYS.BUSINESS_INFO, demoBusinessInfo);
    StorageService.save(STORAGE_KEYS.SETTINGS, this.getDefaultSettings());
  }

  /**
   * Get public menu URL
   */
  static getMenuUrl(baseUrl: string): string {
    const businessInfo = this.getBusinessInfo();
    if (!businessInfo) return baseUrl;
    return `${baseUrl}/menu/${businessInfo.slug}`;
  }
}
