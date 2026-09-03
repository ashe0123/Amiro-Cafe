'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BusinessService } from '@/services/businessService';
import { BusinessInfo } from '@/types/business';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card, { CardBody, CardHeader } from '@/components/ui/Card';
import { ArrowLeft, Save, Building2, Phone, Mail, MapPin, Globe2 } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export default function SettingsPage() {
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo | null>(null);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const business = BusinessService.getBusinessInfo();
    setBusinessInfo(business);
  }, []);

  const handleSave = () => {
    if (!businessInfo) return;

    setSaving(true);
    BusinessService.updateBusinessInfo(businessInfo);
    
    setTimeout(() => {
      setSaving(false);
      showToast('Settings saved successfully', 'success');
    }, 500);
  };

  const updateField = (field: keyof BusinessInfo, value: any) => {
    if (!businessInfo) return;
    setBusinessInfo({ ...businessInfo, [field]: value });
  };

  if (!businessInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link href="/admin">
            <Button variant="ghost" size="sm" className="mb-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600 mt-1">Configure your business information</p>
            </div>
            <Button onClick={handleSave} variant="primary" disabled={saving}>
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Business Information */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary-500" />
              Business Information
            </h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Business Name (English)"
                value={businessInfo.name}
                onChange={(e) => updateField('name', e.target.value)}
                required
              />
              <Input
                label="Business Name (Amharic)"
                value={businessInfo.nameAm || ''}
                onChange={(e) => updateField('nameAm', e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Description (English)
              </label>
              <textarea
                value={businessInfo.description}
                onChange={(e) => updateField('description', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Description (Amharic)
              </label>
              <textarea
                value={businessInfo.descriptionAm || ''}
                onChange={(e) => updateField('descriptionAm', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                rows={3}
              />
            </div>
          </CardBody>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary-500" />
              Contact Information
            </h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Phone Number"
                type="tel"
                value={businessInfo.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="+251-911-123456"
              />
              <Input
                label="Email Address"
                type="email"
                value={businessInfo.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="info@example.com"
              />
            </div>

            <Input
              label="Address (English)"
              value={businessInfo.address}
              onChange={(e) => updateField('address', e.target.value)}
              placeholder="Bole Road, Atlas Area"
            />

            <Input
              label="Address (Amharic)"
              value={businessInfo.addressAm || ''}
              onChange={(e) => updateField('addressAm', e.target.value)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="City"
                value={businessInfo.city}
                onChange={(e) => updateField('city', e.target.value)}
              />
              <Input
                label="Country"
                value={businessInfo.country}
                onChange={(e) => updateField('country', e.target.value)}
              />
            </div>

            <Input
              label="Google Maps URL"
              value={businessInfo.googleMapsUrl || ''}
              onChange={(e) => updateField('googleMapsUrl', e.target.value)}
              placeholder="https://maps.google.com/?q=Your+Location"
            />
          </CardBody>
        </Card>

        {/* Social Media */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Globe2 className="w-5 h-5 text-primary-500" />
              Social Media
            </h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <Input
              label="Facebook URL"
              value={businessInfo.socialMedia?.facebook || ''}
              onChange={(e) => updateField('socialMedia', { ...businessInfo.socialMedia, facebook: e.target.value })}
              placeholder="https://facebook.com/yourpage"
            />
            <Input
              label="Instagram URL"
              value={businessInfo.socialMedia?.instagram || ''}
              onChange={(e) => updateField('socialMedia', { ...businessInfo.socialMedia, instagram: e.target.value })}
              placeholder="https://instagram.com/yourpage"
            />
            <Input
              label="Telegram URL"
              value={businessInfo.socialMedia?.telegram || ''}
              onChange={(e) => updateField('socialMedia', { ...businessInfo.socialMedia, telegram: e.target.value })}
              placeholder="https://t.me/yourpage"
            />
            <Input
              label="WhatsApp Number"
              value={businessInfo.socialMedia?.whatsapp || ''}
              onChange={(e) => updateField('socialMedia', { ...businessInfo.socialMedia, whatsapp: e.target.value })}
              placeholder="+251911123456"
              helperText="Include country code, no spaces or special characters"
            />
          </CardBody>
        </Card>

        {/* Currency Settings */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold text-gray-900">Currency Settings</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Currency Code"
                value={businessInfo.currency}
                onChange={(e) => updateField('currency', e.target.value)}
                placeholder="ETB"
              />
              <Input
                label="Currency Symbol"
                value={businessInfo.currencySymbol}
                onChange={(e) => updateField('currencySymbol', e.target.value)}
                placeholder="ብር"
              />
            </div>
          </CardBody>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} variant="primary" size="lg" disabled={saving}>
            <Save className="w-5 h-5" />
            {saving ? 'Saving Changes...' : 'Save All Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
}
