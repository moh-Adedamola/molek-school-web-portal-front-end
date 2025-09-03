// File: src/pages/website/news-events/EventsCalendar.jsx

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin, Filter } from 'lucide-react';
import EventCard from '../../../components/website/EventCard';

const EventsCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month'); // month, list
  const [selectedEventType, setSelectedEventType] = useState('all');

  // Mock events data
  const events = [
    {
      id: 1,
      title: 'Parent-Teacher Conference',
      description: 'Individual meetings to discuss student progress',
      date: '2024-03-25',
      time: '10:00',
      location: 'Various Classrooms',
      status: 'upcoming',
      type: 'academic',
      targetAudience: 'Parents & Teachers',
      registrationRequired: true
    },
    {
      id: 2,
      title: 'Science Fair Competition',
      description: 'Students showcase innovative science projects',
      date: '2024-03-28',
      time: '09:00',
      location: 'Science Laboratory',
      status: 'upcoming',
      type: 'academic',
      featured: true,
      targetAudience: 'All Students'
    },
    {
      id: 3,
      title: 'Cultural Day Celebration',
      description: 'Celebrate Nigerian heritage and diversity',
      date: '2024-04-01',
      time: '08:00',
      location: 'School Grounds',
      status: 'upcoming',
      type: 'cultural',
      targetAudience: 'Entire School Community'
    }
  ];

  const eventTypes = [
    { value: 'all', label: 'All Events' },
    { value: 'academic', label: 'Academic' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'sports', label: 'Sports' },
    { value: 'administrative', label: 'Administrative' }
  ];

  // Calendar navigation
  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  // Get days in month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  // Get events for a specific date
  const getEventsForDate = (day) => {
    if (!day) return [];
    const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(event => event.date === dateString);
  };

  // Filter events by type
  const filteredEvents = selectedEventType === 'all' 
    ? events 
    : events.filter(event => event.type === selectedEventType);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="hero-gradient text-white py-16">
        <div className="container-max">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Events Calendar</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Stay up-to-date with all school events, important dates, and activities throughout the academic year.
          </p>
        </div>
      </div>

      <div className="container-max py-8">
        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* View Mode Toggle */}
          <div className="flex bg-white rounded-lg border overflow-hidden">
            <button
              onClick={() => setViewMode('month')}
              className={`px-4 py-2 text-sm font-medium ${
                viewMode === 'month' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Calendar className="w-4 h-4 inline mr-2" />
              Calendar
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 text-sm font-medium ${
                viewMode === 'list' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              List View
            </button>
          </div>

          {/* Event Type Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={selectedEventType}
              onChange={(e) => setSelectedEventType(e.target.value)}
              className="input-base pl-10 pr-8 min-w-48"
            >
              {eventTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {viewMode === 'month' ? (
          /* Calendar View */
          <div className="card-base">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b">
              <h2 className="text-2xl font-bold text-gray-800">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigateMonth(-1)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setCurrentDate(new Date())}
                  className="px-4 py-2 text-sm bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                >
                  Today
                </button>
                <button
                  onClick={() => navigateMonth(1)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {/* Day Headers */}
              {dayNames.map(day => (
                <div key={day} className="p-3 text-center font-semibold text-gray-600 bg-gray-50">
                  {day}
                </div>
              ))}
              
              {/* Calendar Days */}
              {getDaysInMonth(currentDate).map((day, index) => {
                const dayEvents = getEventsForDate(day);
                const isToday = day && 
                  currentDate.getMonth() === new Date().getMonth() &&
                  currentDate.getFullYear() === new Date().getFullYear() &&
                  day === new Date().getDate();

                return (
                  <div
                    key={index}
                    className={`min-h-24 p-2 border border-gray-200 ${
                      !day ? 'bg-gray-50' : 'bg-white hover:bg-gray-50'
                    } ${isToday ? 'bg-blue-50 border-blue-300' : ''}`}
                  >
                    {day && (
                      <>
                        <div className={`text-sm font-semibold mb-1 ${
                          isToday ? 'text-blue-600' : 'text-gray-800'
                        }`}>
                          {day}
                        </div>
                        {dayEvents.map(event => (
                          <div
                            key={event.id}
                            className={`text-xs p-1 mb-1 rounded truncate cursor-pointer ${
                              event.type === 'academic' ? 'bg-blue-100 text-blue-700' :
                              event.type === 'cultural' ? 'bg-green-100 text-green-700' :
                              event.type === 'sports' ? 'bg-orange-100 text-orange-700' :
                              'bg-gray-100 text-gray-700'
                            }`}
                            title={event.title}
                          >
                            {event.title}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* List View */
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="mt-8 card-base">
          <h3 className="text-lg font-semibold mb-4">Event Categories</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-100 border-2 border-blue-300 rounded"></div>
              <span className="text-sm text-gray-600">Academic</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 border-2 border-green-300 rounded"></div>
              <span className="text-sm text-gray-600">Cultural</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-100 border-2 border-orange-300 rounded"></div>
              <span className="text-sm text-gray-600">Sports</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-100 border-2 border-gray-300 rounded"></div>
              <span className="text-sm text-gray-600">Administrative</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsCalendar;