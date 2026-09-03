'use client';

import { MenuItem } from '@/types/menu';
import { formatPrice } from '@/lib/utils';
import Card from '@/components/ui/Card';
import { Flame, Leaf, Star, Clock } from 'lucide-react';

interface MenuItemCardProps {
  item: MenuItem;
  currency: string;
  language: 'en' | 'am';
  onClick: () => void;
}

export default function MenuItemCard({ item, currency, language, onClick }: MenuItemCardProps) {
  const name = language === 'am' && item.nameAm ? item.nameAm : item.name;
  const description = language === 'am' && item.descriptionAm ? item.descriptionAm : item.description;

  return (
    <Card hover clickable onClick={onClick} className="h-full flex flex-col">
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
        {item.image ? (
          <img
            src={item.image}
            alt={name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = '/images/placeholder.jpg';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl">🍽️</span>
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          {item.isPopular && (
            <span className="bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
              <Star className="w-3 h-3 fill-current" />
              {language === 'en' ? 'Popular' : 'ተወዳጅ'}
            </span>
          )}
          {item.isVegetarian && (
            <span className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
              <Leaf className="w-3 h-3" />
              {language === 'en' ? 'Veg' : 'ጾም'}
            </span>
          )}
          {item.isSpicy && (
            <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
              <Flame className="w-3 h-3" />
              {language === 'en' ? 'Spicy' : 'ቡኪ'}
            </span>
          )}
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-2 right-2">
          <div className="bg-white text-primary-600 font-bold px-3 py-1.5 rounded-full shadow-lg">
            {formatPrice(item.price, currency)}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-gray-900 mb-1.5 line-clamp-1">
          {name}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3 flex-1">
          {description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          {item.preparationTime && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="w-3.5 h-3.5" />
              <span>{item.preparationTime} {language === 'en' ? 'min' : 'ደቂቃ'}</span>
            </div>
          )}
          <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
            {language === 'en' ? 'View Details →' : 'ዝርዝር ይመልከቱ →'}
          </button>
        </div>
      </div>
    </Card>
  );
}
