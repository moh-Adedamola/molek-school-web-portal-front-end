// components/shared/NewsCard.jsx
import { Calendar, User, Eye } from 'lucide-react';

const NewsCard = ({ 
  title, 
  summary, 
  date, 
  author, 
  category,
  image,
  views = 0,
  priority = 'normal' // normal, high, urgent
}) => {
  const priorityColors = {
    normal: 'border-neutral-200',
    high: 'border-accent-400',
    urgent: 'border-red-400'
  };

  const categoryColors = {
    academic: 'bg-primary-100 text-primary-800',
    sports: 'bg-secondary-100 text-secondary-800',
    event: 'bg-accent-100 text-accent-800',
    announcement: 'bg-purple-100 text-purple-800'
  };

  return (
    <div className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden border-l-4 ${priorityColors[priority]}`}>
      {image && (
        <div className="aspect-video bg-neutral-100 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[category] || categoryColors.announcement}`}>
            {category}
          </span>
          {priority !== 'normal' && (
            <span className={`px-2 py-1 rounded text-xs font-bold ${
              priority === 'urgent' ? 'bg-red-100 text-red-800' : 'bg-accent-100 text-accent-800'
            }`}>
              {priority.toUpperCase()}
            </span>
          )}
        </div>

        <h3 className="text-lg font-semibold text-neutral-800 mb-2 line-clamp-2 hover:text-primary-600 cursor-pointer">
          {title}
        </h3>
        
        <p className="text-neutral-600 text-sm mb-4 line-clamp-3">
          {summary}
        </p>

        <div className="flex items-center justify-between text-xs text-neutral-500">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar size={14} />
              <span>{date}</span>
            </div>
            <div className="flex items-center space-x-1">
              <User size={14} />
              <span>{author}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Eye size={14} />
            <span>{views} views</span>
          </div>
        </div>

        <div className="mt-4">
          <button className="text-primary-600 hover:text-primary-800 text-sm font-medium">
            Read More →
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;