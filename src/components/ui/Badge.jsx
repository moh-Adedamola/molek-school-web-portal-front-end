const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  className = '' 
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full transition-colors';
  
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    
    // Role-specific badges
    'super-admin': 'bg-purple-100 text-purple-800',
    admin: 'bg-blue-100 text-blue-800',
    teacher: 'bg-emerald-100 text-emerald-800',
    parent: 'bg-indigo-100 text-indigo-800',
    
    // Attendance status
    present: 'bg-green-100 text-green-800',
    absent: 'bg-red-100 text-red-800',
    late: 'bg-yellow-100 text-yellow-800',
    
    // Grade performance
    excellent: 'bg-green-100 text-green-800',
    good: 'bg-blue-100 text-blue-800',
    average: 'bg-yellow-100 text-yellow-800',
    poor: 'bg-red-100 text-red-800',
    
    // Payment status
    paid: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    overdue: 'bg-red-100 text-red-800'
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm'
  };

  const variantClasses = variants[variant] || variants.default;
  const sizeClasses = sizes[size];

  return (
    <span className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;