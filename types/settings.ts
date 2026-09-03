export interface AppSettings {
  version: string;
  lastBackupDate?: string;
  language: 'en' | 'am';
  theme: ThemeConfig;
}

export interface ThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  buttonRadius: 'none' | 'sm' | 'md' | 'lg' | 'full';
  cardRadius: 'none' | 'sm' | 'md' | 'lg';
  cardShadow: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

export interface ExportData {
  version: string;
  exportDate: string;
  businessInfo: any;
  categories: any[];
  menuItems: any[];
  settings: AppSettings;
}

export interface DashboardStats {
  totalMenuItems: number;
  availableItems: number;
  unavailableItems: number;
  totalCategories: number;
  popularItems: number;
  vegetarianItems: number;
  lastUpdateTime: string;
}
