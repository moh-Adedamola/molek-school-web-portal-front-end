// File: src/components/website/EventCard.jsx

import { Calendar, Clock, MapPin, Users } from 'lucide-react';

const EventCard = ({ event }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getEventStatusStyle = (status) => {
    switch (status) {
      case 'upcoming':
        return 'badge-info';
      case 'ongoing':
        return 'badge-success';
      case 'completed':
        return 'badge-warning';
      default:
        return 'badge-info';
    }
  };

  return (
    <div className="card-base group hover:shadow-lg transition-all duration-300">
      {/* Event Image */}
      {event.image && (
        <div className="w-full h-40 mb-4 overflow-hidden rounded-lg">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      {/* Event Status */}
      <div className="flex justify-between items-start mb-3">
        <div className={`${getEventStatusStyle(event.status)} capitalize`}>
          {event.status}
        </div>
        {event.featured && (
          <div className="badge-error">
            Featured
          </div>
        )}
      </div>

      {/* Event Title */}
      <h3 className="text-lg font-semibold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors">
        {event.title}
      </h3>

      {/* Event Description */}
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {event.description}
      </p>

      {/* Event Details */}
      <div className="space-y-2 text-sm text-gray-600">
        {/* Date and Time */}
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-blue-600" />
          <span>{formatDate(event.date)}</span>
          {event.time && (
            <>
              <Clock className="w-4 h-4 text-blue-600 ml-2" />
              <span>{formatTime(event.time)}</span>
            </>
          )}
        </div>

        {/* Location */}
        {event.location && (
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            <span>{event.location}</span>
          </div>
        )}

        {/* Target Audience */}
        {event.targetAudience && (
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            <span>{event.targetAudience}</span>
          </div>
        )}
      </div>

      {/* Event Tags */}
      {event.tags && event.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {event.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Registration/Learn More Button */}
      {event.registrationRequired && (
        <div className="mt-4">
          <button className="btn-primary w-full text-sm py-2">
            {event.status === 'upcoming' ? 'Register Now' : 'Learn More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default EventCard;