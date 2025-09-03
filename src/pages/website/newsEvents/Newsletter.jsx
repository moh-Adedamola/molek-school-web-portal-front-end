// File: src/pages/website/news-events/Newsletter.jsx

import { useState } from 'react';
import { Download, Eye, Search, Calendar, FileText } from 'lucide-react';

const Newsletter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('2024');

  // Mock newsletter data
  const newsletters = [
    {
      id: 1,
      title: 'March 2024 Newsletter',
      description: 'Academic achievements, sports updates, and upcoming events',
      publishDate: '2024-03-01',
      downloadUrl: '/documents/newsletter-march-2024.pdf',
      thumbnail: '/images/newsletters/march-2024-thumb.jpg',
      pages: 12,
      fileSize: '2.4 MB'
    },
    {
      id: 2,
      title: 'February 2024 Newsletter',
      description: 'New term updates, staff introductions, and parent feedback',
      publishDate: '2024-02-01',
      downloadUrl: '/documents/newsletter-feb-2024.pdf',
      thumbnail: '/images/newsletters/feb-2024-thumb.jpg',
      pages: 10,
      fileSize: '1.8 MB'
    },
    {
      id: 3,
      title: 'January 2024 Newsletter',
      description: 'New year greetings, academic calendar, and enrollment updates',
      publishDate: '2024-01-15',
      downloadUrl: '/documents/newsletter-jan-2024.pdf',
      thumbnail: '/images/newsletters/jan-2024-thumb.jpg',
      pages: 8,
      fileSize: '1.5 MB'
    }
  ];

  const availableYears = ['2024', '2023', '2022', '2021'];

  const filteredNewsletters = newsletters.filter(newsletter => {
    const matchesSearch = newsletter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         newsletter.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = newsletter.publishDate.startsWith(selectedYear);
    return matchesSearch && matchesYear;
  });

  const handleDownload = (newsletter) => {
    // In a real app, this would trigger the download
    console.log(`Downloading ${newsletter.title}`);
  };

  const handlePreview = (newsletter) => {
    // In a real app, this would open a preview modal
    console.log(`Previewing ${newsletter.title}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="hero-gradient text-white py-16">
        <div className="container-max">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Newsletter Archive</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Access past newsletters featuring school updates, achievements, and important announcements.
          </p>
        </div>
      </div>

      <div className="container-max py-8">
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search newsletters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-base pl-10 w-full"
            />
          </div>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="input-base min-w-32"
          >
            {availableYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        {/* Newsletter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredNewsletters.map((newsletter) => (
            <div key={newsletter.id} className="card-base group">
              {/* Thumbnail */}
              <div className="w-full h-48 bg-gray-100 rounded-lg mb-4 overflow-hidden">
                {newsletter.thumbnail ? (
                  <img
                    src={newsletter.thumbnail}
                    alt={newsletter.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FileText className="w-16 h-16 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                {newsletter.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4">
                {newsletter.description}
              </p>

              {/* Meta Info */}
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>
                    {new Date(newsletter.publishDate).toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <span>{newsletter.pages} pages</span>
                <span>{newsletter.fileSize}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handlePreview(newsletter)}
                  className="btn-outline flex-1 text-sm py-2 flex items-center justify-center gap-1"
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </button>
                <button
                  onClick={() => handleDownload(newsletter)}
                  className="btn-primary flex-1 text-sm py-2 flex items-center justify-center gap-1"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredNewsletters.length === 0 && (
          <div className="text-center py-16">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No newsletters found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search terms or select a different year.
            </p>
          </div>
        )}

        {/* Subscription Section */}
        <div className="card-base bg-blue-50 border-blue-200">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Stay informed about school activities, academic achievements, and important updates. 
              Get our monthly newsletter delivered directly to your email.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="input-base flex-1"
              />
              <button className="btn-primary whitespace-nowrap">
                Subscribe Now
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;