// File: pages/super-admin/SchoolSettings.jsx
import React, { useState } from 'react';
import { Save, Upload, Image, Calendar, MapPin, Phone, Mail, Globe } from 'lucide-react';

const SchoolSettings = () => {
  const [settings, setSettings] = useState({
    // Basic Information
    schoolName: 'Federal Government College Lagos',
    schoolType: 'secondary',
    address: '123 Education Avenue, Victoria Island, Lagos',
    city: 'Lagos',
    state: 'Lagos',
    country: 'Nigeria',
    postalCode: '101001',
    phone: '+234 1 234 5678',
    email: 'info@fgclagos.edu.ng',
    website: 'https://fgclagos.edu.ng',
    
    // Academic Settings
    academicYear: '2024/2025',
    currentTerm: 'First Term',
    totalTerms: 3,
    classLevels: ['JSS 1', 'JSS 2', 'JSS 3', 'SSS 1', 'SSS 2', 'SSS 3'],
    gradingSystem: 'percentage',
    passingGrade: 50,
    
    // System Settings
    currency: 'NGN',
    timezone: 'Africa/Lagos',
    dateFormat: 'DD/MM/YYYY',
    language: 'English',
    
    // Notification Settings
    emailNotifications: true,
    smsNotifications: true,
    parentPortalEnabled: true,
    onlinePayments: true,
  });

  const [activeTab, setActiveTab] = useState('basic');
  const [saving, setSaving] = useState(false);

  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Saving settings:', settings);
    setSaving(false);
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: Globe },
    { id: 'academic', label: 'Academic', icon: Calendar },
    { id: 'system', label: 'System', icon: Phone },
    { id: 'notifications', label: 'Notifications', icon: Mail },
  ];

  const renderBasicInfo = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          School Name *
        </label>
        <input
          type="text"
          value={settings.schoolName}
          onChange={(e) => handleInputChange('schoolName', e.target.value)}
          className="input-base w-full"
          placeholder="Enter school name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          School Type
        </label>
        <select
          value={settings.schoolType}
          onChange={(e) => handleInputChange('schoolType', e.target.value)}
          className="input-base w-full"
        >
          <option value="primary">Primary School</option>
          <option value="secondary">Secondary School</option>
          <option value="mixed">Primary & Secondary</option>
        </select>
      </div>

      <div className="lg:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Address *
        </label>
        <textarea
          value={settings.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
          className="input-base w-full h-24 resize-none"
          placeholder="Enter complete address"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          City *
        </label>
        <input
          type="text"
          value={settings.city}
          onChange={(e) => handleInputChange('city', e.target.value)}
          className="input-base w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          State *
        </label>
        <select
          value={settings.state}
          onChange={(e) => handleInputChange('state', e.target.value)}
          className="input-base w-full"
        >
          <option value="">Select State</option>
          <option value="Lagos">Lagos</option>
          <option value="Abuja">FCT Abuja</option>
          <option value="Kano">Kano</option>
          <option value="Rivers">Rivers</option>
          <option value="Oyo">Oyo</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Phone *
        </label>
        <input
          type="tel"
          value={settings.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          className="input-base w-full"
          placeholder="+234 XXX XXX XXXX"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email *
        </label>
        <input
          type="email"
          value={settings.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className="input-base w-full"
          placeholder="school@example.com"
        />
      </div>
    </div>
  );

  const renderAcademicSettings = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Academic Year
        </label>
        <input
          type="text"
          value={settings.academicYear}
          onChange={(e) => handleInputChange('academicYear', e.target.value)}
          className="input-base w-full"
          placeholder="2024/2025"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Current Term
        </label>
        <select
          value={settings.currentTerm}
          onChange={(e) => handleInputChange('currentTerm', e.target.value)}
          className="input-base w-full"
        >
          <option value="First Term">First Term</option>
          <option value="Second Term">Second Term</option>
          <option value="Third Term">Third Term</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Total Terms per Year
        </label>
        <select
          value={settings.totalTerms}
          onChange={(e) => handleInputChange('totalTerms', parseInt(e.target.value))}
          className="input-base w-full"
        >
          <option value={2}>2 Terms</option>
          <option value={3}>3 Terms</option>
          <option value={4}>4 Terms</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Grading System
        </label>
        <select
          value={settings.gradingSystem}
          onChange={(e) => handleInputChange('gradingSystem', e.target.value)}
          className="input-base w-full"
        >
          <option value="percentage">Percentage (0-100%)</option>
          <option value="letter">Letter Grades (A-F)</option>
          <option value="points">Points (1-5)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Passing Grade
        </label>
        <input
          type="number"
          value={settings.passingGrade}
          onChange={(e) => handleInputChange('passingGrade', parseInt(e.target.value))}
          className="input-base w-full"
          min="0"
          max="100"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Currency
        </label>
        <select
          value={settings.currency}
          onChange={(e) => handleInputChange('currency', e.target.value)}
          className="input-base w-full"
        >
          <option value="NGN">Nigerian Naira (₦)</option>
          <option value="USD">US Dollar ($)</option>
          <option value="GBP">British Pound (£)</option>
        </select>
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Timezone
        </label>
        <select
          value={settings.timezone}
          onChange={(e) => handleInputChange('timezone', e.target.value)}
          className="input-base w-full"
        >
          <option value="Africa/Lagos">Africa/Lagos (WAT)</option>
          <option value="Africa/Abuja">Africa/Abuja (WAT)</option>
          <option value="UTC">UTC</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Date Format
        </label>
        <select
          value={settings.dateFormat}
          onChange={(e) => handleInputChange('dateFormat', e.target.value)}
          className="input-base w-full"
        >
          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Primary Language
        </label>
        <select
          value={settings.language}
          onChange={(e) => handleInputChange('language', e.target.value)}
          className="input-base w-full"
        >
          <option value="English">English</option>
          <option value="Hausa">Hausa</option>
          <option value="Igbo">Igbo</option>
          <option value="Yoruba">Yoruba</option>
        </select>
      </div>

      <div className="lg:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-4">
          School Logo
        </label>
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
            <Image className="w-8 h-8 text-gray-400" />
          </div>
          <button className="btn-outline flex items-center gap-2 px-4 py-2 rounded-lg">
            <Upload className="w-4 h-4" />
            Upload Logo
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Recommended: 200x200px, PNG or JPG format
        </p>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Communication</h3>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Email Notifications</h4>
              <p className="text-sm text-gray-500">Send notifications via email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleInputChange('emailNotifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">SMS Notifications</h4>
              <p className="text-sm text-gray-500">Send notifications via SMS</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.smsNotifications}
                onChange={(e) => handleInputChange('smsNotifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Features</h3>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Parent Portal</h4>
              <p className="text-sm text-gray-500">Enable parent access to student data</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.parentPortalEnabled}
                onChange={(e) => handleInputChange('parentPortalEnabled', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Online Payments</h4>
              <p className="text-sm text-gray-500">Accept school fee payments online</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.onlinePayments}
                onChange={(e) => handleInputChange('onlinePayments', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">School Settings</h1>
        <p className="text-gray-600">Configure system-wide school settings and preferences</p>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {activeTab === 'basic' && renderBasicInfo()}
        {activeTab === 'academic' && renderAcademicSettings()}
        {activeTab === 'system' && renderSystemSettings()}
        {activeTab === 'notifications' && renderNotifications()}

        {/* Save Button */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-primary flex items-center gap-2 px-6 py-2 rounded-lg font-medium disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolSettings;