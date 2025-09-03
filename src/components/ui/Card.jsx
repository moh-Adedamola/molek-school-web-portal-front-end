const Card = ({ 
  children, 
  className = '', 
  accent = 'none',
  hover = true,
  ...props 
}) => {
  const baseClasses = 'bg-white rounded-xl border border-gray-200 p-6 transition-all duration-150';
  
  const hoverClasses = hover ? 'hover:shadow-lg hover:shadow-gray-100' : '';
  
  const accentClasses = {
    none: '',
    primary: 'border-l-4 border-l-blue-700',
    secondary: 'border-l-4 border-l-emerald-600',
    accent: 'border-l-4 border-l-amber-600',
    success: 'border-l-4 border-l-green-600',
    warning: 'border-l-4 border-l-yellow-600',
    error: 'border-l-4 border-l-red-600'
  };

  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${accentClasses[accent]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;