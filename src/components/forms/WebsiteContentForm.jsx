// File: src/components/forms/WebsiteContentForm.jsx
import React, { useState } from 'react';
import { Save, X, FileText, Image, Link, Eye } from 'lucide-react';

const WebsiteContentForm = ({ content = null, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    section: content?.section || '',
    title: content?.title || '',
    subtitle: content?.subtitle || '',
    content: content?.content || '',
    imageUrl: content?.imageUrl || '',
    linkText: content?.linkText || '',
    linkUrl: content?.linkUrl || '',
    isPublished: content?.isPublished ?? true,
    displayOrder: content?.displayOrder || 1
  });

  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState('content');

  const sections = [
    { id: 'home-hero', name: 'Homepage Hero Section' },
    { id: 'home-about', name: 'Homepage About Preview' },
    { id: 'home-features', name: 'Homepage Features' },
    { id: 'about-main', name: 'About Us Main Content' },
    { id: 'about-vision', name: 'Vision & Mission' },
    { id: 'about-history', name: 'School History' },
    { id: 'academics-overview', name: 'Academics Overview' },
    { id: 'academics-curriculum', name: 'Curriculum Details' },
    { id: 'admissions-process', name: 'Admission Process' },
    { id: 'admissions-requirements', name: 'Admission Requirements' },
    { id: 'contact-info', name: 'Contact Information' },
    { id: 'news-announcement', name: 'News & Announcements' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.section) newErrors.section = 'Please select a section';
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.content.trim()) newErrors.content = 'Content is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const previewContent = () => {
    return (
      <div className="p-4 border border-neutral-200 rounded-lg bg-neutral-50">
        <h3 className="text-lg font-semibold text-neutral-800 mb-2">{formData.title}</h3>
        {formData.subtitle && (
          <p className="text-neutral-600 mb-3">{formData.subtitle}</p>
        )}
        {formData.imageUrl && (
          <div className="mb-3">
            <img 
              src={formData.imageUrl} 
              alt="Content preview" 
              className="w-full h-32 object-cover rounded"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTVlN2ViIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzZiNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
              }}
            />
          </div>
        )}
        <div className="prose max-w-none">
          {formData.content.split('\n').map((paragraph, idx) => (
            <p key={idx} className="mb-2">{paragraph}</p>
          ))}
        </div>
        {formData.linkText && formData.linkUrl && (
          <div className="mt-3">
            <a href={formData.linkUrl} className="text-primary-600 hover:text-primary-700 underline">
              {formData.linkText}
            </a>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="card-base">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-neutral-800">
            {content ? 'Edit Website Content' : 'Add Website Content'}
          </h2>
          <button onClick={onCancel} className="text-neutral-400 hover:text-neutral-600">
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-neutral-200 mb-6">
          <button
            onClick={() => setActiveTab('content')}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'content' 
                ? 'border-primary-600 text-primary-600' 
                : 'border-transparent text-neutral-600 hover:text-neutral-800'
            }`}
          >
            <FileText size={16} className="inline mr-2" />
            Content
          </button>
          <button
            onClick={() => setActiveTab('media')}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'media' 
                ? 'border-primary-600 text-primary-600' 
                : 'border-transparent text-neutral-600 hover:text-neutral-800'
            }`}
          >
            <Image size={16} className="inline mr-2" />
            Media & Links
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'preview' 
                ? 'border-primary-600 text-primary-600' 
                : 'border-transparent text-neutral-600 hover:text-neutral-800'
            }`}
          >
            <Eye size={16} className="inline mr-2" />
            Preview
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Content Tab */}
          {activeTab === 'content' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Website Section *
                </label>
                <select
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  className={`input-base w-full ${errors.section ? 'input-error' : ''}`}
                >
                  <option value="">Select a section</option>
                  {sections.map(section => (
                    <option key={section.id} value={section.id}>{section.name}</option>
                  ))}
                </select>
                {errors.section && <p className="text-sm text-red-600 mt-1">{errors.section}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`input-base w-full ${errors.title ? 'input-error' : ''}`}
                    placeholder="Enter content title"
                  />
                  {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Subtitle (Optional)
                  </label>
                  <input
                    type="text"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleChange}
                    className="input-base w-full"
                    placeholder="Enter subtitle if needed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Content *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows="12"
                  className={`input-base w-full resize-none ${errors.content ? 'input-error' : ''}`}
                  placeholder="Enter your content here. Use line breaks for paragraphs."
                />
                {errors.content && <p className="text-sm text-red-600 mt-1">{errors.content}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Display Order
                  </label>
                  <input
                    type="number"
                    name="displayOrder"
                    value={formData.displayOrder}
                    onChange={handleChange}
                    className="input-base w-full"
                    min="1"
                  />
                </div>

                <div className="flex items-center mt-8">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="isPublished"
                      checked={formData.isPublished}
                      onChange={handleChange}
                      className="rounded border-neutral-300"
                    />
                    <span className="text-sm font-medium text-neutral-700">Published</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Media & Links Tab */}
          {activeTab === 'media' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Image URL (Optional)
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="input-base w-full"
                  placeholder="https://example.com/image.jpg"
                />
                <p className="text-sm text-neutral-500 mt-1">Enter a complete URL for the image</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Link Text (Optional)
                  </label>
                  <input
                    type="text"
                    name="linkText"
                    value={formData.linkText}
                    onChange={handleChange}
                    className="input-base w-full"
                    placeholder="e.g., Learn More, Read Full Article"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Link URL (Optional)
                  </label>
                  <input
                    type="url"
                    name="linkUrl"
                    value={formData.linkUrl}
                    onChange={handleChange}
                    className="input-base w-full"
                    placeholder="https://example.com/page"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Preview Tab */}
          {activeTab === 'preview' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-neutral-800">Content Preview</h3>
              {formData.title || formData.content ? (
                previewContent()
              ) : (
                <div className="p-8 text-center border border-neutral-200 rounded-lg bg-neutral-50">
                  <FileText size={48} className="mx-auto text-neutral-400 mb-2" />
                  <p className="text-neutral-500">Fill in content to see preview</p>
                </div>
              )}
            </div>
          )}

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-neutral-200">
            <button
              type="submit"
              className="btn-primary flex items-center justify-center gap-2 px-6 py-2"
            >
              <Save size={16} />
              {content ? 'Update Content' : 'Save Content'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="btn-outline flex items-center justify-center gap-2 px-6 py-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WebsiteContentForm;