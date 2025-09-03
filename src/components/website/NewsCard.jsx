// File: src/components/website/NewsCard.jsx

import { Calendar, User, ArrowRight } from 'lucide-react';

const NewsCard = ({ article }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="card-base group cursor-pointer hover:shadow-lg transition-all duration-300">
      {/* Image */}
      {article.image && (
        <div className="w-full h-48 mb-4 overflow-hidden rounded-lg">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      {/* Category Badge */}
      {article.category && (
        <div className="badge-info mb-3">
          {article.category}
        </div>
      )}

      {/* Title */}
      <h3 className="text-xl font-semibold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">
        {article.title}
      </h3>

      {/* Excerpt */}
      <p className="text-gray-600 mb-4 line-clamp-3">
        {article.excerpt}
      </p>

      {/* Meta Information */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(article.publishDate)}</span>
        </div>
        {article.author && (
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{article.author}</span>
          </div>
        )}
      </div>

      {/* Read More */}
      <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
        <span>Read More</span>
        <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  );
};

export default NewsCard;