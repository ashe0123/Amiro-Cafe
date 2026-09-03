'use client';

import { useState } from 'react';
import Link from 'next/link';
import { StorageService } from '@/services/storageService';
import { BusinessService } from '@/services/businessService';
import { MenuService } from '@/services/menuService';
import { demoBusinessInfo, demoCategories, demoMenuItems } from '@/data/demoData';
import Button from '@/components/ui/Button';
import Card, { CardBody } from '@/components/ui/Card';
import { ArrowLeft, Download, Upload, RotateCcw, AlertTriangle } from 'lucide-react';
import { downloadJSON, readFileAsText } from '@/lib/utils';

export default function DataManagementPage() {
  const [importing, setImporting] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleExport = () => {
    const data = StorageService.exportAll();
    const filename = `amiro-menu-backup-${new Date().toISOString().split('T')[0]}.json`;
    downloadJSON(JSON.parse(data), filename);
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setImporting(true);
      const jsonText = await readFileAsText(file);
      const success = StorageService.importAll(jsonText);

      if (success) {
        alert('Data imported successfully! The page will reload.');
        window.location.reload();
      } else {
        alert('Error: Invalid backup file format');
      }
    } catch (error) {
      console.error('Import error:', error);
      alert('Error importing file. Please check the file format.');
    } finally {
      setImporting(false);
    }
  };

  const handleReset = () => {
    // Reset to demo data
    BusinessService.resetToDemoData(demoBusinessInfo);
    MenuService.initializeWithDemoData(demoCategories, demoMenuItems);
    
    alert('Data reset to demo successfully! The page will reload.');
    window.location.reload();
  };

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
          <h1 className="text-3xl font-bold text-gray-900">Data Management</h1>
          <p className="text-gray-600 mt-1">Export, import, and manage your menu data</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Export Section */}
        <Card className="mb-6">
          <CardBody className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Download className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Export Data</h2>
                <p className="text-gray-600 mb-4">
                  Download all your menu data, categories, and business information as a JSON file. 
                  This creates a backup that you can import later.
                </p>
                <Button onClick={handleExport} variant="primary">
                  <Download className="w-4 h-4" />
                  Export All Data
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Import Section */}
        <Card className="mb-6">
          <CardBody className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Upload className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Import Data</h2>
                <p className="text-gray-600 mb-4">
                  Upload a previously exported JSON file to restore your menu data. 
                  This will replace all current data.
                </p>
                <div className="flex items-center gap-3">
                  <input
                    id="import-file"
                    type="file"
                    accept=".json"
                    onChange={handleImport}
                    className="hidden"
                    disabled={importing}
                  />
                  <label htmlFor="import-file" className="cursor-pointer">
                    <span
                      className={`inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-500 shadow-md hover:shadow-lg text-base px-4 py-2 gap-2 ${
                        importing ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <Upload className="w-4 h-4" />
                      {importing ? 'Importing...' : 'Choose File to Import'}
                    </span>
                  </label>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Only JSON files exported from this system are supported
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Reset Section */}
        <Card>
          <CardBody className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <RotateCcw className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Reset to Demo Data</h2>
                <p className="text-gray-600 mb-4">
                  Restore the original demo data for Amiro Cafe and Restaurant. 
                  This will delete all your current data and cannot be undone.
                </p>
                
                {!showResetConfirm ? (
                  <Button onClick={() => setShowResetConfirm(true)} variant="danger">
                    <AlertTriangle className="w-4 h-4" />
                    Reset to Demo Data
                  </Button>
                ) : (
                  <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <p className="font-semibold text-red-900">
                        Are you sure? This cannot be undone!
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Button onClick={handleReset} variant="danger" size="sm">
                        Yes, Reset Data
                      </Button>
                      <Button onClick={() => setShowResetConfirm(false)} variant="outline" size="sm">
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Info Card */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-2">💡 Best Practices</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Export your data regularly to create backups</li>
            <li>• Store backup files in a safe location (cloud storage, email, etc.)</li>
            <li>• Test imports with a backup file to ensure everything works</li>
            <li>• Before resetting, export your current data if you want to keep it</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
