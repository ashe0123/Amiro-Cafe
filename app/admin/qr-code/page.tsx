'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BusinessService } from '@/services/businessService';
import { BusinessInfo } from '@/types/business';
import Button from '@/components/ui/Button';
import Card, { CardBody } from '@/components/ui/Card';
import { ArrowLeft, Download, Printer, QrCode as QrIcon } from 'lucide-react';

export default function QRCodePage() {
  const [businessInfo, setBusinessInfo] = useState<BusinessInfo | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [menuUrl, setMenuUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const business = BusinessService.getBusinessInfo();
    setBusinessInfo(business);

    if (business) {
      const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
      const url = `${baseUrl}/menu/${business.slug}`;
      setMenuUrl(url);
      generateQRCode(url);
    }
  }, []);

  const generateQRCode = async (url: string) => {
    try {
      setIsLoading(true);
      const QRCode = (await import('qrcode')).default;
      
      const qrDataUrl = await QRCode.toDataURL(url, {
        width: 400,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
        errorCorrectionLevel: 'H',
      });
      
      setQrCodeUrl(qrDataUrl);
      setIsLoading(false);
    } catch (error) {
      console.error('Error generating QR code:', error);
      setIsLoading(false);
    }
  };

  const downloadQRCode = () => {
    if (qrCodeUrl && businessInfo) {
      const link = document.createElement('a');
      link.download = `${businessInfo.slug}-qr-code.png`;
      link.href = qrCodeUrl;
      link.click();
    }
  };

  const printQRCode = () => {
    window.print();
  };

  if (!businessInfo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200 no-print">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link href="/admin">
            <Button variant="ghost" size="sm" className="mb-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <QrIcon className="w-8 h-8 text-primary-500" />
            QR Code Generator
          </h1>
          <p className="text-gray-600 mt-1">Generate and download QR codes for your menu</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardBody className="p-8">
              <div className="text-center">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Your Menu QR Code</h2>
                
                <div className="bg-white border-4 border-gray-200 rounded-2xl p-8 inline-block">
                  {isLoading ? (
                    <div className="w-[400px] h-[400px] flex items-center justify-center">
                      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-500"></div>
                    </div>
                  ) : qrCodeUrl ? (
                    <img 
                      src={qrCodeUrl} 
                      alt="Menu QR Code" 
                      className="w-[400px] h-[400px]"
                    />
                  ) : (
                    <div className="w-[400px] h-[400px] flex items-center justify-center text-gray-400">
                      <p>Failed to generate QR code</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Scan to view menu</p>
                  <p className="text-xs text-gray-500 break-all">{menuUrl}</p>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button onClick={downloadQRCode} variant="primary" fullWidth disabled={!qrCodeUrl || isLoading}>
                    <Download className="w-4 h-4" />
                    {isLoading ? 'Generating...' : 'Download PNG'}
                  </Button>
                  <Button onClick={printQRCode} variant="outline" fullWidth disabled={!qrCodeUrl || isLoading}>
                    <Printer className="w-4 h-4" />
                    Print
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Print Preview</h2>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-white">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl text-white font-bold">
                      {businessInfo.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {businessInfo.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {businessInfo.address}
                  </p>
                </div>

                {qrCodeUrl && !isLoading && (
                  <div className="my-6">
                    <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48 mx-auto" />
                  </div>
                )}

                <div className="text-lg font-semibold text-gray-800 mb-2">
                  Scan to View Our Menu
                </div>
                <div className="text-sm text-gray-600">
                  {businessInfo.phone && <p>{businessInfo.phone}</p>}
                  {businessInfo.email && <p>{businessInfo.email}</p>}
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>Tip:</strong> Print this QR code and place it on tables, menus, or at your entrance 
                  for customers to easily access your digital menu.
                </p>
              </div>
            </CardBody>
          </Card>
        </div>

        <Card className="mt-8 no-print">
          <CardBody className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">How to Use Your QR Code</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Download or Print</h3>
                  <p className="text-gray-600 text-sm">
                    Download the QR code as a PNG image or print it directly from this page.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Display at Your Location</h3>
                  <p className="text-gray-600 text-sm">
                    Place the QR code on tables, at the entrance, on menus, or anywhere customers can easily see it.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Customers Scan & View Menu</h3>
                  <p className="text-gray-600 text-sm">
                    Customers scan the QR code with their phone camera to view your digital menu instantly.
                  </p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <style jsx global>{`
        @media print {
          @page {
            margin: 2cm;
          }
          
          body * {
            visibility: hidden;
          }
          
          .print-area, .print-area * {
            visibility: visible;
          }
          
          .print-area {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }
      `}</style>

      <div className="print-area hidden print:block">
        <div className="text-center p-8">
          <div className="mb-6">
            <div className="w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-5xl text-white font-bold">
                {businessInfo.name.charAt(0)}
              </span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {businessInfo.name}
            </h1>
            <p className="text-gray-700 text-lg">
              {businessInfo.address}
            </p>
          </div>

          {qrCodeUrl && (
            <div className="my-8">
              <img src={qrCodeUrl} alt="QR Code" className="w-96 h-96 mx-auto" />
            </div>
          )}

          <div className="text-2xl font-bold text-gray-800 mb-4">
            Scan to View Our Menu
          </div>
          <div className="text-lg text-gray-700">
            {businessInfo.phone && <p className="mb-1">{businessInfo.phone}</p>}
            {businessInfo.email && <p>{businessInfo.email}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
