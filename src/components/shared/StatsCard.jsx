// File: src/components/shared/StatsCard.jsx
import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const StatsCard = ({ 
  title, 
  value, 
  unit = '', 
  trend, 
  trendValue, 
  icon, 
  color = 'primary',
  description,
  size = 'default'
}) => {
  const colorClasses = {
    primary: {
      bg: 'bg-primary-50',
      text: 'text-primary-600',
      icon: 'text-primary-600'
    },
    secondary: {
      bg: 'bg-secondary-50',
      text: 'text-secondary-600',
      icon: 'text-secondary-600'
    },
    accent: {
      bg: 'bg-accent-50',
      text: 'text-accent-600',
      icon: 'text-accent-600'
    },
    success: {
      bg: 'bg-secondary-50',
      text: 'text-secondary-600',
      icon: 'text-secondary-600'
    },
    warning: {
      bg: 'bg-accent-50',
      text: 'text-accent-600',
      icon: 'text-accent-600'
    }
  };

  const trendColors = {
    up: 'text-secondary-600',
    down: 'text-red-600',
    neutral: 'text-neutral-500'
  };

  const TrendIcon = {
    up: TrendingUp,
    down: TrendingDown,
    neutral: Minus
  }[trend] || Minus;

  const sizeClasses = {
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8'
  };

  return (
    <div className={`card-base ${sizeClasses[size]} transition-all duration-200 hover:shadow-md`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            {icon && (
              <div className={`${colorClasses[color].bg} p-2 rounded-lg`}>
                <div className={`w-5 h-5 ${colorClasses[color].icon}`}>
                  {icon}
                </div>
              </div>
            )}
            <h3 className={`font-medium ${size === 'sm' ? 'text-sm' : 'text-base'} text-neutral-700`}>
              {title}
            </h3>
          </div>
          
          <div className={`${colorClasses[color].text} font-bold mb-1 ${
            size === 'sm' ? 'text-2xl' : size === 'lg' ? 'text-4xl' : 'text-3xl'
          }`}>
            {value}
            {unit && <span className="text-sm font-normal ml-1">{unit}</span>}
          </div>

          {description && (
            <p className={`text-neutral-600 ${size === 'sm' ? 'text-xs' : 'text-sm'} mb-2`}>
              {description}
            </p>
          )}

          {trend && trendValue && (
            <div className="flex items-center gap-1">
              <TrendIcon className={`w-4 h-4 ${trendColors[trend]}`} />
              <span className={`text-sm font-medium ${trendColors[trend]}`}>
                {trendValue}
              </span>
              <span className="text-xs text-neutral-500">vs last period</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;