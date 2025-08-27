import { Calendar, Clock, MapPin, Users, Tag, ChevronRight, Star } from 'lucide-react';

const EventCard = ({ 
  event = {
    title: "Inter-House Sports Competition",
    date: "2024-03-15",
    time: "9:00 AM",
    location: "School Sports Complex",
    category: "Sports",
    description: "Annual inter-house sports competition featuring athletics, football, and other exciting sports.",
    attendees: 245,
    status: "upcoming", // "upcoming", "ongoing", "completed", "cancelled"
    image: null,
    organizer: "Sports Department",
    featured: false
  },
  onClick,
  variant = "default" // "default", "compact", "featured", "list"
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-NG', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      upcoming: "bg-accent-100 text-accent-800 border-accent-200",
      ongoing: "bg-green-100 text-green-800 border-green-200",
      completed: "bg-neutral-100 text-neutral-600 border-neutral-200",
      cancelled: "bg-red-100 text-red-800 border-red-200"
    };
    return colors[status] || colors.upcoming;
  };

  const getCategoryColor = (category) => {
    const colors = {
      Academic: "bg-primary-50 text-primary-700",
      Sports: "bg-secondary-50 text-secondary-700",
      Cultural: "bg-purple-50 text-purple-700",
      Assembly: "bg-blue-50 text-blue-700",
      Examination: "bg-orange-50 text-orange-700",
      Meeting: "bg-indigo-50 text-indigo-700",
      Celebration: "bg-pink-50 text-pink-700"
    };
    return colors[category] || colors.Academic;
  };

  if (variant === "compact") {
    return (
      <div 
        className="bg-white rounded-lg border border-neutral-200 hover:border-accent-300 p-4 transition-all duration-300 hover:shadow-md cursor-pointer group"
        onClick={onClick}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent-100 rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-accent-600" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-neutral-800 truncate group-hover:text-accent-800 transition-colors duration-200">
                {event.title}
              </h4>
              <p className="text-xs text-neutral-500">{formatDate(event.date)}</p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-neutral-400 group-hover:text-accent-600 transition-colors duration-200 flex-shrink-0" />
        </div>
        
        <div className="flex items-center justify-between">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
            {event.category}
          </span>
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(event.status)}`}>
            {event.status}
          </span>
        </div>
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div 
        className="bg-white rounded-lg border border-neutral-200 hover:border-accent-300 p-4 transition-all duration-300 hover:shadow-md cursor-pointer group"
        onClick={onClick}
      >
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Calendar className="h-6 w-6 text-accent-600" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-semibold text-neutral-800 truncate group-hover:text-accent-800 transition-colors duration-200">
                {event.title}
              </h4>
              {event.featured && (
                <Star className="h-4 w-4 text-accent-500 fill-current flex-shrink-0" />
              )}
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-neutral-500 mb-2">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {event.time}
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {event.location}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                  {event.category}
                </span>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(event.status)}`}>
                  {event.status}
                </span>
              </div>
              <ChevronRight className="h-5 w-5 text-neutral-400 group-hover:text-accent-600 transition-colors duration-200" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "featured") {
    return (
      <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-2xl border border-accent-200 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group">
        {event.image && (
          <div className="h-48 bg-gradient-to-r from-accent-400 to-accent-600 relative overflow-hidden">
            <img 
              src={event.image} 
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/20"></div>
            {event.featured && (
              <div className="absolute top-4 right-4 bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <Star className="h-4 w-4 mr-1 fill-current" />
                Featured
              </div>
            )}
            <div className="absolute top-4 left-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border bg-white/90 backdrop-blur-sm ${getStatusColor(event.status)}`}>
                {event.status}
              </span>
            </div>
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-accent-900 mb-2 group-hover:text-accent-800 transition-colors duration-200">
                {event.title}
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                {event.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white/50 rounded-lg p-3">
              <div className="flex items-center mb-1">
                <Calendar className="h-4 w-4 text-accent-600 mr-2" />
                <span className="text-sm font-medium text-neutral-700">Date</span>
              </div>
              <p className="text-sm font-semibold text-accent-800">{formatDate(event.date)}</p>
            </div>
            <div className="bg-white/50 rounded-lg p-3">
              <div className="flex items-center mb-1">
                <Clock className="h-4 w-4 text-accent-600 mr-2" />
                <span className="text-sm font-medium text-neutral-700">Time</span>
              </div>
              <p className="text-sm font-semibold text-accent-800">{event.time}</p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-accent-200">
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-neutral-600">
                <MapPin className="h-4 w-4 mr-1" />
                {event.location}
              </div>
              <div className="flex items-center text-sm text-neutral-600">
                <Users className="h-4 w-4 mr-1" />
                {event.attendees} attending
              </div>
            </div>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(event.category)}`}>
              <Tag className="h-3 w-3 mr-1" />
              {event.category}
            </span>
          </div>

          <button 
            onClick={onClick}
            className="w-full mt-6 bg-accent-600 hover:bg-accent-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 group-hover:shadow-lg"
          >
            <span>View Event Details</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div 
      className="bg-white rounded-xl border border-neutral-200 hover:border-accent-300 overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer group"
      onClick={onClick}
    >
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center group-hover:bg-accent-200 transition-colors duration-200">
              <Calendar className="h-6 w-6 text-accent-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-neutral-800 group-hover:text-accent-800 transition-colors duration-200">
                {event.title}
              </h3>
              <p className="text-sm text-neutral-500">{event.organizer}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {event.featured && (
              <Star className="h-5 w-5 text-accent-500 fill-current" />
            )}
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(event.status)}`}>
              {event.status}
            </span>
          </div>
        </div>

        <p className="text-neutral-600 mb-4 text-sm leading-relaxed">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm text-neutral-600">
            <Calendar className="h-4 w-4 mr-3 text-accent-600" />
            <span className="font-medium">{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center text-sm text-neutral-600">
            <Clock className="h-4 w-4 mr-3 text-accent-600" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-sm text-neutral-600">
            <MapPin className="h-4 w-4 mr-3 text-accent-600" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-sm text-neutral-600">
            <Users className="h-4 w-4 mr-3 text-accent-600" />
            <span>{event.attendees} people attending</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-100">
        <div className="flex items-center justify-between">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(event.category)}`}>
            <Tag className="h-3 w-3 mr-1" />
            {event.category}
          </span>
          
          <div className="flex items-center space-x-2 text-sm text-accent-600 font-medium group-hover:text-accent-700 transition-colors duration-200">
            <span>View Details</span>
            <ChevronRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;