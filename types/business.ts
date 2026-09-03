export interface BusinessInfo {
  id: string;
  name: string;
  nameAm?: string;
  slug: string; // URL-friendly identifier
  logo: string;
  coverImage: string;
  description: string;
  descriptionAm?: string;
  phone: string;
  email: string;
  address: string;
  addressAm?: string;
  city: string;
  country: string;
  openingHours: OpeningHours;
  openingHoursAm?: string;
  currency: string;
  currencySymbol: string;
  googleMapsUrl?: string;
  socialMedia: SocialMedia;
  defaultLanguage: 'en' | 'am';
  createdAt: string;
  updatedAt: string;
}

export interface OpeningHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface SocialMedia {
  facebook?: string;
  instagram?: string;
  telegram?: string;
  whatsapp?: string;
  twitter?: string;
}

export interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  buttonStyle: 'rounded' | 'square' | 'pill';
  cardStyle: 'flat' | 'elevated' | 'outlined';
}
