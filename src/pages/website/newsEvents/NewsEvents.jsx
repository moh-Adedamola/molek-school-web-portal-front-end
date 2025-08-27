// pages/website/news-events/NewsEvents.jsx
import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import NewsCard from '../../../components/shared/NewsCard';

const NewsEvents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock news data - replace with API call
  const newsItems = [
    {
      id: 1,
      title: "Inter-House Sports Competition 2024",
      summary: "Join us for our annual inter-house sports competition featuring athletics, football, and basketball competitions.",
      date: "Dec 15, 2024",
      author: "Sports Department",
      category: "sports",
      image: "/api/placeholder/400/250",
      views: 245,
      priority: "high"
    },
    {
      id: 2,
      title: "WAEC Registration Deadline Extended",
      summary: "The deadline for WAEC registration has been extended to January 15th, 2025. All SSS3 students must complete registration.",
      date: "Dec 12, 2024",
      author: "Academic Office",
      category: "academic",
      views: 189,
      priority: "urgent"
    },
    {
      id: 3,
      title: "Prize Giving Day 2024",
      summary: "Celebrating academic excellence and outstanding achievements of our students throughout the academic year.",
      date: "Dec 10, 2024",
      author: "Principal's Office",
      category: "event",
      image: "/api/placeholder/400/250",
      views: 156,
      priority: "normal"
    },
    {
      id: 4,
      title: "New Computer Laboratory Opening",
      summary: "State-of-the-art computer laboratory with 40 workstations now open for student use.",
      date: "Dec 8, 2024",
      author: "ICT Department",
      category: "announcement",
      views: 98,
      priority: "normal"
    }
  ];

  const categories = [
    { value: 'all', label: 'All News' },
    { value: 'academic', label: 'Academic' },
    { value: 'sports', label: 'Sports' },
    { value: 'event', label: 'Events' },
    { value: 'announcement', label: 'Announcements' }
  ];

  const filteredNews = newsItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50">
      {/* Header Section */}
      <div className="bg-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">News & Events</h1>
            <p className="text-xl text-primary-200 max-w-2xl mx-auto">
              Stay updated with the latest news, events, and announcements from our school community
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
              <input
                type="text"
                placeholder="Search news and events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-neutral-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map(item => (
              <NewsCard key={item.id} {...item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-neutral-600 text-lg">No news found matching your search criteria.</p>
          </div>
        )}
      </div>

      {/* Load More Button */}
      <div className="text-center pb-12">
        <button className="btn-primary px-8 py-3 rounded-lg">
          Load More News
        </button>
      </div>
    </div>
  );
};

export default NewsEvents;