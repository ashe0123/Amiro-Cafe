'use client';

import { MenuItem } from '@/types/menu';
import { formatPrice, getSpiceLevelEmoji } from '@/lib/utils';
import Modal from '@/components/ui/Modal';
import { Flame, Leaf, Star, Clock, AlertCircle } from 'lucide-react';

interface MenuItemModalProps {
  item: MenuItem;
  currency: string;
  language: 'en' | 'am';
  onClose: () => void;
}

export default function MenuItemModal({ item, currency, language, onClose }: MenuItemModalProps) {
  const name = language === 'am' && item.nameAm ? item.nameAm : item.name;
  const description = language === 'am' && item.descriptionAm ? item.descriptionAm : item.description;
  const ingredients = language === 'am' && item.ingredientsAm ? item.ingredientsAm : item.ingredients;
  const allergens = language === 'am' && item.allergensAm ? item.allergensAm : item.allergens;
  const specialNotes = language === 'am' && item.specialNotesAm ? item.specialNotesAm : item.specialNotes;

  return (
    <Modal isOpen={true} onClose={onClose} size="lg">
      <div className="max-h-[80vh] overflow-y-auto">
        {/* Image */}
        <div className="relative h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl overflow-hidden -mx-6 -mt-4 mb-4">
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
              <span className="text-8xl">🍽️</span>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {item.isPopular && (
              <span className="bg-yellow-500 text-white text-sm font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                <Star className="w-4 h-4 fill-current" />
                {language === 'en' ? 'Popular' : 'ተወዳጅ'}
              </span>
            )}
            {item.isVegetarian && (
              <span className="bg-green-500 text-white text-sm font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                <Leaf className="w-4 h-4" />
                {language === 'en' ? 'Vegetarian' : 'ጾም'}
              </span>
            )}
            {item.isSpicy && (
              <span className="bg-red-500 text-white text-sm font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                <Flame className="w-4 h-4" />
                {language === 'en' ? 'Spicy' : 'ቡኪ'} {getSpiceLevelEmoji(item.spiceLevel)}
              </span>
            )}
          </div>
        </div>

        {/* Title and Price */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{name}</h2>
            {item.preparationTime && (
              <div className="flex items-center gap-1.5 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>
                  {language === 'en' ? 'Prep time:' : 'የመዘጋጀት ጊዜ:'} {item.preparationTime}{' '}
                  {language === 'en' ? 'minutes' : 'ደቂቃዎች'}
                </span>
              </div>
            )}
          </div>
          <div className="text-3xl font-bold text-primary-600">
            {formatPrice(item.price, currency)}
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {language === 'en' ? 'Description' : 'መግለጫ'}
          </h3>
          <p className="text-gray-700 leading-relaxed">{description}</p>
        </div>

        {/* Ingredients */}
        {ingredients && ingredients.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {language === 'en' ? 'Ingredients' : 'ግብአቶች'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {ingredients.map((ingredient, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Allergens */}
        {allergens && allergens.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              {language === 'en' ? 'Allergens' : 'አለርጂዎች'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {allergens.map((allergen, index) => (
                <span
                  key={index}
                  className="bg-red-50 text-red-700 border border-red-200 px-3 py-1.5 rounded-full text-sm font-medium"
                >
                  {allergen}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Special Notes */}
        {specialNotes && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-900 text-sm leading-relaxed">
              <strong>{language === 'en' ? 'Note:' : 'ማስታወሻ:'}</strong> {specialNotes}
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
}
