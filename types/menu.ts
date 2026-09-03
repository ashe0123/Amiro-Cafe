export interface MenuItem {
  id: string;
  name: string;
  nameAm?: string; // Amharic name
  description: string;
  descriptionAm?: string; // Amharic description
  price: number;
  categoryId: string;
  image: string;
  ingredients?: string[];
  ingredientsAm?: string[]; // Amharic ingredients
  allergens?: string[];
  allergensAm?: string[]; // Amharic allergens
  isVegetarian: boolean;
  isSpicy: boolean;
  spiceLevel?: 1 | 2 | 3; // 1=mild, 2=medium, 3=hot
  isPopular: boolean;
  isAvailable: boolean;
  preparationTime?: number; // in minutes
  specialNotes?: string;
  specialNotesAm?: string;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  nameAm?: string;
  description?: string;
  descriptionAm?: string;
  icon?: string;
  displayOrder: number;
  isEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MenuFilters {
  categoryId?: string;
  searchQuery?: string;
  isVegetarian?: boolean;
  isAvailable?: boolean;
  isPopular?: boolean;
}
