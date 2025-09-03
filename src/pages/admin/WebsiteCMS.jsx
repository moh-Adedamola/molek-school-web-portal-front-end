// File: src/pages/admin/WebsiteCMS.jsx
import React, { useState } from 'react';
import { Edit, Plus, Trash2, Eye, Save } from 'lucide-react';

const WebsiteCMS = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [editingContent, setEditingContent] = useState(null);

  const contentSections = [
    { id: 'home', name: 'Homepage', lastModified: '2024-09-01' },
    { id: 'about', name: 'About Us', lastModified: '2024-08-28' },
    { id: 'academics', name: 'Academics', lastModified: '2024-08-25' },
    { id: 'news', name: 'News & Events', lastModified: '2024-09-02' },
    { id: 'contact', name: 'Contact Info', lastModified: '2024-08-20' }
  ];

  const handleEdit = (sectionId) => {
    setEditingContent(sectionId);
  };

  const handleSave = () => {
    setEditingContent(null);
    // API call to save content
  };

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl font-bold text-neutral-800">Website Content Management</h1>
        <p className="text-neutral-600 mt-1">Manage your school website content</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Content Sections */}
        <div className="lg:col-span-1">
          <div className="card-base">
            <h2 className="text-lg font-semibold text-neutral-800 mb-4">Content Sections</h2>
            <div className="space-y-2">
              {contentSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    activeSection === section.id 
                      ? 'bg-primary-50 border-l-4 border-primary-600 text-primary-700' 
                      : 'hover:bg-neutral-50'
                  }`}
                >
                  <div className="font-medium">{section.name}</div>
                  <div className="text-sm text-neutral-500">Modified: {section.lastModified}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          <div className="card-base">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
              <h2 className="text-xl font-semibold text-neutral-800 capitalize">
                {contentSections.find(s => s.id === activeSection)?.name} Content
              </h2>
              <div className="flex flex-wrap gap-2">
                <button className="btn-ghost flex items-center gap-2 px-3 py-2">
                  <Eye size={16} />
                  Preview
                </button>
                <button 
                  onClick={() => handleEdit(activeSection)}
                  className="btn-primary flex items-center gap-2 px-4 py-2"
                >
                  <Edit size={16} />
                  Edit
                </button>
              </div>
            </div>

            {/* Content Editor */}
            {editingContent === activeSection ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Section Title
                  </label>
                  <input 
                    type="text"
                    className="input-base w-full"
                    defaultValue="Welcome to Nigerian Secondary School"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Content
                  </label>
                  <textarea 
                    rows="10"
                    className="input-base w-full resize-none"
                    defaultValue="Your school content here..."
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={handleSave}
                    className="btn-primary flex items-center gap-2 px-4 py-2"
                  >
                    <Save size={16} />
                    Save Changes
                  </button>
                  <button 
                    onClick={() => setEditingContent(null)}
                    className="btn-outline flex items-center gap-2 px-4 py-2"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="prose max-w-none">
                <h3>Welcome to Nigerian Secondary School</h3>
                <p>We are dedicated to providing excellent education in the heart of Nigeria. Our comprehensive programs from JSS 1 to SSS 3 prepare students for success in their academic journey and beyond.</p>
                <p>Click "Edit" to modify this content.</p>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="card-success">
              <div className="text-2xl font-bold text-secondary-700">12</div>
              <div className="text-sm text-neutral-600">Pages Published</div>
            </div>
            <div className="card-warning">
              <div className="text-2xl font-bold text-accent-700">3</div>
              <div className="text-sm text-neutral-600">Pending Updates</div>
            </div>
            <div className="card-accent">
              <div className="text-2xl font-bold text-primary-700">156</div>
              <div className="text-sm text-neutral-600">Page Views Today</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteCMS;