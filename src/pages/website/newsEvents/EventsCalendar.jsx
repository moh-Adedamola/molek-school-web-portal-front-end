// pages/website/news-events/EventsCalendar.jsx
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin } from 'lucide-react';

const EventsCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Mock events data
  const events = [
    {
      id: 1,
      title: "Inter-House Sports",
      date: "2024-12-18",
      time: "8:00 AM",
      location: "School Sports Complex",
      type: "sports",
      description: "Annual inter-house sports competition"
    },
    {
      id: 2,
      title: "WAEC Registration Deadline",
      date: "2024-12-20",
      time: "5:00 PM",
      location: "Examination Office",
      type: "academic",
      description: "Final day for WAEC registration"
    },
    {
      id: 3,
      title: "Prize Giving Day",
      date: "2024-12-22",
      time: "10:00 AM",
      location: "School Hall",
      type: "ceremony",
      description: "Awards and recognition ceremony"
    },
    {
      id: 4,
      title: "End of Term Examinations",
      date: "2025-01-15",
      time: "8:00 AM",
      location: "All Classrooms",
      type: "academic",
      description: "First term examinations begin"
    },
    {
      id: 5,
      title: "Parent-Teacher Conference",
      date: "2025-01-20",
      time: "2:00 PM",
      location: "School Premises",
      type: "meeting",
      description: "Discussion of student progress"
    }
  ];

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getEventTypeColor = (type) => {
    const colors = {
      sports: 'bg-secondary-100 text-secondary-800 border-secondary-300',
      academic: 'bg-primary-100 text-primary-800 border-primary-300',
      ceremony: 'bg-accent-100 text-accent-800 border-accent-300',
      meeting: 'bg-purple-100 text-purple-800 border-purple-300'
    };
    return colors[type] || 'bg-neutral-100 text-neutral-800 border-neutral-300';
  };

  const isEventDate = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return events.some(event => event.date === dateString);
  };

  const getEventsForDate = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const today = new Date();
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const hasEvents = isEventDate(date);
      const isToday = date.toDateString() === today.toDateString();
      
      days.push(
        <div 
          key={day} 
          className={`p-2 min-h-[80px] border border-neutral-200 ${
            isToday ? 'bg-primary-100 border-primary-300' : hasEvents ? 'bg-accent-50' : 'bg-white'
          }`}
        >
          <div className={`text-sm font-medium mb-1 ${isToday ? 'text-primary-800' : 'text-neutral-800'}`}>
            {day}
          </div>
          {hasEvents && (
            <div className="space-y-1">
              {getEventsForDate(date).slice(0, 2).map(event => (
                <div key={event.id} className="text-xs bg-primary-600 text-white px-1 py-0.5 rounded truncate">
                  {event.title}
                </div>
              ))}
              {getEventsForDate(date).length > 2 && (
                <div className="text-xs text-primary-600">+{getEventsForDate(date).length - 2} more</div>
              )}
            </div>
          )}
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50">
      {/* Header */}
      <div className="bg-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Events Calendar</h1>
            <p className="text-xl text-primary-200">
              Stay informed about upcoming school events and important dates
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Calendar Header */}
              <div className="bg-primary-600 text-white p-4 flex items-center justify-between">
                <button 
                  onClick={() => navigateMonth(-1)}
                  className="p-2 hover:bg-primary-700 rounded"
                >
                  <ChevronLeft size={20} />
                </button>
                <h2 className="text-xl font-semibold">
                  {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <button 
                  onClick={() => navigateMonth(1)}
                  className="p-2 hover:bg-primary-700 rounded"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-0">
                {/* Day Headers */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="p-3 bg-neutral-100 text-center font-medium text-sm text-neutral-600 border-b border-neutral-200">
                    {day}
                  </div>
                ))}
                {/* Calendar Days */}
                {renderCalendar()}
              </div>
            </div>
          </div>

          {/* Upcoming Events List */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-neutral-800">Upcoming Events</h3>
            
            <div className="space-y-4">
              {events.slice(0, 5).map(event => (
                <div key={event.id} className={`p-4 rounded-lg border ${getEventTypeColor(event.type)}`}>
                  <h4 className="font-semibold mb-2">{event.title}</h4>
                  
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center space-x-2">
                      <Calendar size={14} />
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock size={14} />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin size={14} />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm mt-2 text-neutral-600">
                    {event.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Event Legend */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h4 className="font-semibold mb-3 text-neutral-800">Event Types</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-secondary-500 rounded"></div>
                  <span>Sports</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary-500 rounded"></div>
                  <span>Academic</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-accent-500 rounded"></div>
                  <span>Ceremony</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded"></div>
                  <span>Meeting</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsCalendar;