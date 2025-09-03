// File: src/pages/website/news-events/NewsEvents.jsx

import { useState, useEffect } from 'react';
import { Search, Filter, Calendar, Newspaper } from 'lucide-react';
import NewsCard from '../../../components/website/NewsCard';
import EventCard from '../../../components/website/EventCard';

const NewsEvents = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newsData, setNewsData] = useState([]);
  const [eventsData, setEventsData] = useState([]);

  // Mock data - replace with API calls
  useEffect(() => {
    setNewsData([
      {
        id: 1,
        title: 'Annual Inter-House Sports Competition 2024',
        excerpt: 'Students showcase athletic talents in our biggest sporting event of the year.',
        category: 'Sports',
        author: 'Sports Department',
        publishDate: '2024-03-15',
        image: '/images/news/sports-competition.jpg'
      },
      {
        id: 2,
        title: 'WAEC Results 2023: 95% Success Rate',
        excerpt: 'Our students achieve outstanding results in West African Examinations.',
        category: 'Academics',
        author: 'Admin Office',
        publishDate: '2024-03-10',
        image: '/images/news/waec-results.jpg'
      },
      {
        id: 3,
        title: 'New Science Laboratory Inauguration',
        excerpt: 'State-of-the-art laboratory facility to enhance practical learning.',
        category: 'Infrastructure',
        author: 'Principal',
        publishDate: '2024-03-08',
        image: '/images/news/science-lab.jpg'
      }
    ]);

    setEventsData([
      {
        id: 1,
        title: 'Parent-Teacher Conference',
        description: 'Discuss student progress with teachers.',
        date: '2024-03-25',
        time: '10:00',
        location: 'School Hall',
        status: 'upcoming',
        targetAudience: 'Parents & Teachers',
        registrationRequired: true,
        tags: ['academic', 'parents']
      },
      {
        id: 2,
        title: 'Cultural Day Celebration',
        description: 'Celebrate Nigerian heritage and diversity.',
        date: '2024-04-01',
        time: '09:00',
        location: 'School Grounds',
        status: 'upcoming',
        featured: true,
        targetAudience: 'All Students',
        registrationRequired: false,
        tags: ['cultural', 'celebration']
      }
    ]);
  }, []);

  const tabs = [
    { id: 'all', label: 'All', icon: null },
    { id: 'news', label: 'News', icon: Newspaper },
    { id: 'events', label: 'Events', icon: Calendar }
  ];

  const categories = [
    'All', 'Academics', 'Sports', 'Cultural', 'Infrastructure', 'Announcements'
  ];

  const filteredData = () => {
    let data = [];
    
    if (activeTab === 'all') {
      data = [...newsData, ...eventsData];
    } else if (activeTab === 'news') {
      data = newsData;
    } else if (activeTab === 'events') {
      data = eventsData;
    }

    // Filter by search term
    if (searchTerm) {
      data = data.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.excerpt && item.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      data = data.filter(item => 
        item.category?.toLowerCase() === selectedCategory.toLowerCase() ||
        item.tags?.some(tag => tag.toLowerCase() === selectedCategory.toLowerCase())
      );
    }

    return data;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="hero-gradient text-white py-16">
        <div className="container-max">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            News & Events
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Stay updated with the latest happenings, achievements, and upcoming events at our school.
          </p>
        </div>
      </div>

      <div className="container-max py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 font-medium rounded-t-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />}
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search news and events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-base pl-10 w-full"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-base pl-10 pr-8 min-w-48"
            >
              {categories.map((category) => (
                <option key={category} value={category.toLowerCase()}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData().map((item) => (
            <div key={`${item.id}-${activeTab}`}>
              {item.excerpt ? (
                <NewsCard article={item} />
              ) : (
                <EventCard event={item} />
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredData().length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Newspaper className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No {activeTab === 'all' ? 'content' : activeTab} found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search terms or filters.
            </p>
          </div>
        )}

        {/* Quick Links */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-base text-center">
            <div className="text-blue-600 mb-4">
              <Newspaper className="w-8 h-8 mx-auto" />
            </div>
            <h3 className="font-semibold mb-2">Newsletter Archive</h3>
            <p className="text-gray-600 text-sm mb-4">
              Access past newsletters and publications
            </p>
            <button className="btn-outline text-sm">View Archive</button>
          </div>

          <div className="card-base text-center">
            <div className="text-green-600 mb-4">
              <Calendar className="w-8 h-8 mx-auto" />
            </div>
            <h3 className="font-semibold mb-2">Events Calendar</h3>
            <p className="text-gray-600 text-sm mb-4">
              View upcoming events and important dates
            </p>
            <button className="btn-outline text-sm">View Calendar</button>
          </div>

          <div className="card-base text-center">
            <div className="text-orange-600 mb-4">
              <Filter className="w-8 h-8 mx-auto" />
            </div>
            <h3 className="font-semibold mb-2">Announcements</h3>
            <p className="text-gray-600 text-sm mb-4">
              Important school announcements and notices
            </p>
            <button className="btn-outline text-sm">View All</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsEvents;