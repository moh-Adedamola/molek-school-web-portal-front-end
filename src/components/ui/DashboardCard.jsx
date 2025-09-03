const DashboardCard = ({ 
  title, 
  value, 
  subtitle,
  icon: Icon,
  trend = null,
  role = 'admin',
  className = '',
  onClick
}) => {
  const roleStyles = {
    'super-admin': 'bg-gradient-to-br from-blue-800 to-blue-900 text-white',
    admin: 'bg-gradient-to-br from-blue-700 to-blue-800 text-white',
    teacher: 'bg-gradient-to-br from-emerald-600 to-emerald-700 text-white',
    parent: 'bg-gradient-to-br from-blue-600 to-blue-700 text-white'
  };

  const cardStyle = roleStyles[role] || roleStyles.admin;

  const getTrendColor = () => {
    if (!trend) return '';
    return trend.isPositive ? 'text-green-200' : 'text-red-200';
  };

  return (
    <div 
      className={`${cardStyle} rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-150 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-sm font-medium opacity-90 mb-2">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
          {subtitle && <p className="text-sm opacity-75 mt-1">{subtitle}</p>}
          
          {trend && (
            <div className={`flex items-center mt-2 text-xs ${getTrendColor()}`}>
              <span>{trend.value}</span>
              <span className="ml-1">{trend.period}</span>
            </div>
          )}
        </div>
        
        {Icon && (
          <div className="flex-shrink-0 ml-4">
            <div className="p-3 bg-white/20 rounded-lg">
              <Icon size={24} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCard;