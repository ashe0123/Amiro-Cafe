'use client';

import { BusinessInfo } from '@/types/business';
import Modal from '@/components/ui/Modal';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, MessageCircle, Send } from 'lucide-react';
import Button from '@/components/ui/Button';

interface BusinessInfoSectionProps {
  businessInfo: BusinessInfo;
  language: 'en' | 'am';
  onClose: () => void;
}

export default function BusinessInfoSection({ businessInfo, language, onClose }: BusinessInfoSectionProps) {
  const name = language === 'am' && businessInfo.nameAm ? businessInfo.nameAm : businessInfo.name;
  const description = language === 'am' && businessInfo.descriptionAm ? businessInfo.descriptionAm : businessInfo.description;
  const address = language === 'am' && businessInfo.addressAm ? businessInfo.addressAm : businessInfo.address;

  return (
    <Modal isOpen={true} onClose={onClose} size="lg" title={language === 'en' ? 'About Us' : 'ስለ እኛ'}>
      <div className="space-y-6">
        {/* Business Info */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{name}</h2>
          <p className="text-gray-700 leading-relaxed">{description}</p>
        </div>

        {/* Contact Information */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">
            {language === 'en' ? 'Contact Information' : 'የመገኛ አድራሻ'}
          </h3>
          
          {businessInfo.address && (
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-gray-700">{address}</p>
                {businessInfo.city && <p className="text-gray-600 text-sm">{businessInfo.city}</p>}
              </div>
            </div>
          )}

          {businessInfo.phone && (
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary-500 flex-shrink-0" />
              <a href={`tel:${businessInfo.phone}`} className="text-gray-700 hover:text-primary-600">
                {businessInfo.phone}
              </a>
            </div>
          )}

          {businessInfo.email && (
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary-500 flex-shrink-0" />
              <a href={`mailto:${businessInfo.email}`} className="text-gray-700 hover:text-primary-600">
                {businessInfo.email}
              </a>
            </div>
          )}
        </div>

        {/* Opening Hours */}
        {businessInfo.openingHours && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary-500" />
              {language === 'en' ? 'Opening Hours' : 'የስራ ሰዓት'}
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
              {Object.entries(businessInfo.openingHours).map(([day, hours]) => (
                <div key={day} className="flex justify-between">
                  <span className="text-gray-700 capitalize font-medium">{day}</span>
                  <span className="text-gray-600">{hours}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          {businessInfo.phone && (
            <Button
              onClick={() => window.location.href = `tel:${businessInfo.phone}`}
              variant="primary"
              className="w-full"
            >
              <Phone className="w-4 h-4" />
              {language === 'en' ? 'Call Us' : 'ይደውሉልን'}
            </Button>
          )}
          
          {businessInfo.socialMedia?.whatsapp && (
            <Button
              onClick={() => window.open(`https://wa.me/${businessInfo.socialMedia?.whatsapp}`, '_blank')}
              variant="secondary"
              className="w-full"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </Button>
          )}

          {businessInfo.googleMapsUrl && (
            <Button
              onClick={() => window.open(businessInfo.googleMapsUrl, '_blank')}
              variant="outline"
              className="w-full"
            >
              <MapPin className="w-4 h-4" />
              {language === 'en' ? 'Directions' : 'አቅጣጫ'}
            </Button>
          )}

          {businessInfo.email && (
            <Button
              onClick={() => window.location.href = `mailto:${businessInfo.email}`}
              variant="outline"
              className="w-full"
            >
              <Mail className="w-4 h-4" />
              {language === 'en' ? 'Email' : 'ኢሜል'}
            </Button>
          )}
        </div>

        {/* Social Media */}
        {businessInfo.socialMedia && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              {language === 'en' ? 'Follow Us' : 'ይከተሉን'}
            </h3>
            <div className="flex gap-3">
              {businessInfo.socialMedia.facebook && (
                <a
                  href={businessInfo.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {businessInfo.socialMedia.instagram && (
                <a
                  href={businessInfo.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white rounded-full hover:opacity-90 transition-opacity"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {businessInfo.socialMedia.telegram && (
                <a
                  href={businessInfo.socialMedia.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
