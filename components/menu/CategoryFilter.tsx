'use client';

import { Category } from '@/types/menu';
import { cn } from '@/lib/utils';

interface CategoryWithCount extends Category {
  count: number;
}

interface CategoryFilterProps {
  categories: CategoryWithCount[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  language: 'en' | 'am';
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  language,
}: CategoryFilterProps) {
  const allCount = categories.reduce((sum, cat) => sum + cat.count, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 pb-4">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {/* All Category */}
        <button
          onClick={() => onSelectCategory('all')}
          className={cn(
            'flex-shrink-0 px-4 py-2 rounded-full font-medium transition-all whitespace-nowrap',
            selectedCategory === 'all'
              ? 'bg-primary-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          )}
        >
          <span>{language === 'en' ? 'All' : 'ሁሉም'}</span>
          <span className="ml-2 text-sm opacity-75">({allCount})</span>
        </button>

        {/* Category Buttons */}
        {categories.map((category) => {
          const name = language === 'am' && category.nameAm ? category.nameAm : category.name;
          
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={cn(
                'flex-shrink-0 px-4 py-2 rounded-full font-medium transition-all whitespace-nowrap',
                selectedCategory === category.id
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              {category.icon && <span className="mr-1.5">{category.icon}</span>}
              <span>{name}</span>
              <span className="ml-2 text-sm opacity-75">({category.count})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
