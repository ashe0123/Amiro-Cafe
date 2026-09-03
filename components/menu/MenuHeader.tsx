'use client';

import { BusinessInfo } from '@/types/business';
import { Globe, Info } from 'lucide-react';
import Image from 'next/image';

interface MenuHeaderProps {
  businessInfo: BusinessInfo;
  language: 'en' | 'am';
  onLanguageChange: (lang: 'en' | 'am') => void;
  onInfoClick: () => void;
}

export default function MenuHeader({
  businessInfo,
  language,
  onLanguageChange,
  onInfoClick,
}: MenuHeaderProps) {
  const name = language === 'am' && businessInfo.nameAm ? businessInfo.nameAm : businessInfo.name;
  const description =
    language === 'am' && businessInfo.descriptionAm
      ? businessInfo.descriptionAm
      : businessInfo.description;

  return (
    <div className="relative bg-gradient-to-br from-primary-600 to-primary-700 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-8">
        {/* Top Actions */}
        <div className="flex justify-end gap-2 mb-4">
          <button
            onClick={onInfoClick}
            className="flex items-center gap-2 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg transition-all"
          >
            <Info className="w-4 h-4" />
            <span className="text-sm font-medium">
              {language === 'en' ? 'Info' : 'መረጃ'}
            </span>
          </button>
          <button
            onClick={() => onLanguageChange(language === 'en' ? 'am' : 'en')}
            className="flex items-center gap-2 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg transition-all"
          >
            <Globe className="w-4 h-4" />
            <span className="text-sm font-medium">
              {language === 'en' ? 'አማ' : 'EN'}
            </span>
          </button>
        </div>

        {/* Business Info */}
        <div className="text-center">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl">
              <span className="text-4xl font-bold text-primary-600">
                {businessInfo.name.charAt(0)}
              </span>
            </div>
          </div>

          {/* Name */}
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{name}</h1>

          {/* Description */}
          <p className="text-white/90 max-w-2xl mx-auto mb-4 leading-relaxed">
            {description}
          </p>

          {/* Address & Phone */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/80">
            {businessInfo.address && (
              <div className="flex items-center gap-1.5">
                <span>📍</span>
                <span>{businessInfo.address}</span>
              </div>
            )}
            {businessInfo.phone && (
              <div className="flex items-center gap-1.5">
                <span>📞</span>
                <span>{businessInfo.phone}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
