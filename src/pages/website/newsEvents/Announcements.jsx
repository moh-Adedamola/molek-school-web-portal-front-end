// File: src/pages/website/news-events/Announcements.jsx

import { useState } from 'react';
import { AlertCircle, Clock, Search, Filter, Pin, Bell } from 'lucide-react';

const Announcements = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('all');

  // Mock announcements data
  const announcements = [
    {
      id: 1,
      title: 'School Fees Payment Deadline - Term 2',
      content: 'All parents are reminded that the deadline for Term 2 school fees payment is March 30, 2024. Late payments will incur a 5% penalty fee.',
      priority: 'high',
      category: 'Financial',
      publishDate: '2024-03-15T10:00:00Z',
      isPinned: true,
      targetAudience: 'Parents'
    },
    {
      id: 2,
      title: 'Uniform Policy Update',
      content: 'Updated uniform guidelines are now in effect. Students must wear complete school uniform including proper footwear. Violations will result in disciplinary action.',
      priority: 'medium',
      category: 'Policy',
      publishDate: '2024-03-14T08:30:00Z',
      isPinned: true,
      targetAudience: 'Students & Parents'
    },
    {
      id: 3,
      title: 'Mid-Term Break Schedule',
      content: 'Mid-term break will commence on March 25th and resume on April 1st, 2024. All students are expected to return promptly.',
      priority: 'medium',
      category: 'Academic',
      publishDate: '2024-03-10T14:00:00Z',
      isPinned: false,
      targetAudience: 'All'
    },
    {
      id: 4,
      title: 'Library Operating Hours Extended',
      content: 'The school library will now operate from 7:00 AM to 6:00 PM on weekdays to accommodate more study sessions.',
      priority: 'low',
      category: 'Facility',
      publishDate: '2024-03-08T11:00:00Z',
      isPinned: false,
      targetAudience: 'Students'
    }
  ];

  const priorities = [
    { value: 'all', label: 'All Priorities' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  // Filter announcements
  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = selectedPriority === 'all' || announcement.priority === selectedPriority;
    return matchesSearch && matchesPriority;
  });

  // Sort announcements - pinned first, then by date
  const sortedAnnouncements = [...filteredAnnouncements].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.publishDate) - new Date(a.publishDate);
  });

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'high':
        return 'badge-error';
      case 'medium':
        return 'badge-warning';
      case 'low':
        return 'badge-info';
      default:
        return 'badge-info';
    }
  };

  const getPriorityIcon = (priority) => {
    if (priority === 'high') {
      return <AlertCircle className="w-4 h-4" />;
    }
    return <Bell className="w-4 h-4" />;
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
    };
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const publishDate = new Date(dateString);
    const diffInHours = Math.floor((now - publishDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    
    const diffInWeeks = Math.floor(diffInDays / 7);
    return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="hero-gradient text-white py-16">
        <div className="container-max">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Announcements</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Important school announcements, policy updates, and notices for students, parents, and staff.
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
              placeholder="Search announcements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-base pl-10 w-full"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="input-base pl-10 pr-8 min-w-48"
            >
              {priorities.map(priority => (
                <option key={priority.value} value={priority.value}>
                  {priority.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Announcements List */}
        <div className="space-y-4">
          {sortedAnnouncements.map((announcement) => {
            const dateTime = formatDateTime(announcement.publishDate);
            
            return (
              <div 
                key={announcement.id} 
                className={`card-base ${announcement.isPinned ? 'border-l-4 border-l-yellow-400 bg-yellow-50' : ''}`}
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-2">
                      {announcement.isPinned && (
                        <Pin className="w-4 h-4 text-yellow-600 mt-1 flex-shrink-0" />
                      )}
                      <h2 className="text-xl font-semibold text-gray-800 flex-1">
                        {announcement.title}
                      </h2>
                    </div>
                    
                    {/* Meta information */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{getTimeAgo(announcement.publishDate)}</span>
                      </div>
                      <span className="text-gray-300">•</span>
                      <span>{announcement.category}</span>
                      <span className="text-gray-300">•</span>
                      <span>{announcement.targetAudience}</span>
                    </div>
                  </div>

                  {/* Priority Badge */}
                  <div className={`${getPriorityStyle(announcement.priority)} flex items-center gap-1 flex-shrink-0`}>
                    {getPriorityIcon(announcement.priority)}
                    <span className="capitalize">{announcement.priority}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="text-gray-700 leading-relaxed mb-4">
                  {announcement.content}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-3">
                  <span>
                    Published on {dateTime.date} at {dateTime.time}
                  </span>
                  {announcement.isPinned && (
                    <div className="flex items-center gap-1 text-yellow-600">
                      <Pin className="w-3 h-3" />
                      <span>Pinned</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {sortedAnnouncements.length === 0 && (
          <div className="text-center py-16">
            <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No announcements found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search terms or filters.
            </p>
          </div>
        )}

        {/* Information Panel */}
        <div className="mt-12 card-base bg-blue-50 border-blue-200">
          <div className="flex items-start gap-4">
            <div className="text-blue-600 flex-shrink-0">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Stay Updated
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Important announcements are also sent via SMS and email to registered parents and students. 
                Make sure your contact information is up to date.
              </p>
              <button className="btn-outline text-sm">
                Update Contact Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcements;