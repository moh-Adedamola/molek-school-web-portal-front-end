// File: src/components/dashboards/CommonWidgets.jsx
import { TrendingUp, TrendingDown, Calendar, Users } from 'lucide-react';

// Base stat card widget used across all dashboards
export const StatCard = ({ title, value, change, icon: Icon, color = 'primary' }) => {
  const colorClasses = {
    primary: 'text-primary-600 bg-primary-50',
    secondary: 'text-secondary-600 bg-secondary-50',
    accent: 'text-accent-600 bg-accent-50',
    success: 'text-secondary-600 bg-secondary-50',
    warning: 'text-accent-600 bg-accent-50',
    error: 'text-red-600 bg-red-50'
  };

  const isPositive = change >= 0;

  return (
    <div className="card-base">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-neutral-600">{title}</p>
          <p className="text-2xl font-bold text-neutral-900 mt-1">{value}</p>
          {change !== undefined && (
            <div className={`flex items-center mt-2 text-sm ${
              isPositive ? 'text-secondary-600' : 'text-red-600'
            }`}>
              {isPositive ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              <span>{Math.abs(change)}% from last term</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

// Quick action card for dashboards
export const QuickActionCard = ({ title, description, action, icon: Icon, color = 'primary' }) => {
  const colorClasses = {
    primary: 'text-primary-600 bg-primary-50 hover:bg-primary-100',
    secondary: 'text-secondary-600 bg-secondary-50 hover:bg-secondary-100',
    accent: 'text-accent-600 bg-accent-50 hover:bg-accent-100'
  };

  return (
    <div className="card-base hover:shadow-lg transition-all duration-200 cursor-pointer" onClick={action}>
      <div className="flex items-start space-x-4">
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-neutral-900">{title}</h3>
          <p className="text-sm text-neutral-600 mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
};

// Recent activity widget
export const RecentActivityWidget = ({ activities = [] }) => {
  return (
    <div className="card-base">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-neutral-900">Recent Activity</h3>
        <Calendar className="h-5 w-5 text-neutral-400" />
      </div>
      
      <div className="space-y-3">
        {activities.length > 0 ? (
          activities.slice(0, 5).map((activity, index) => (
            <div key={index} className="flex items-start space-x-3 pb-3 border-b border-neutral-100 last:border-b-0">
              <div className="h-2 w-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <p className="text-sm text-neutral-800">{activity.message}</p>
                <p className="text-xs text-neutral-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-neutral-500 text-center py-4">No recent activities</p>
        )}
      </div>
    </div>
  );
};

// Progress bar widget
export const ProgressWidget = ({ title, current, total, color = 'primary' }) => {
  const percentage = Math.round((current / total) * 100);
  
  const colorClasses = {
    primary: 'bg-primary-600',
    secondary: 'bg-secondary-600',
    accent: 'bg-accent-600'
  };

  return (
    <div className="card-base">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium text-neutral-800">{title}</h4>
        <span className="text-sm text-neutral-600">{current}/{total}</span>
      </div>
      
      <div className="w-full bg-neutral-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${colorClasses[color]}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      
      <p className="text-xs text-neutral-500 mt-2">{percentage}% completed</p>
    </div>
  );
};