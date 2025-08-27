import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  variant = 'default',
  hover = false,
  padding = 'default',
  ...props 
}) => {
  const baseClasses = 'bg-white rounded-xl border border-gray-200 transition-all duration-200';
  
  const variants = {
    default: 'shadow-card',
    accent: 'shadow-card border-l-4 border-l-primary-600',
    success: 'shadow-card border-l-4 border-l-secondary-600',
    warning: 'shadow-card border-l-4 border-l-accent-600',
    flat: 'shadow-none',
  };
  
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
  };
  
  const hoverClasses = hover ? 'hover:shadow-card-hover hover:-translate-y-1' : '';
  const variantClasses = variants[variant] || variants.default;
  const paddingClass = paddingClasses[padding] || paddingClasses.default;
  
  return (
    <div 
      className={`${baseClasses} ${variantClasses} ${hoverClasses} ${paddingClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Card sub-components for better organization
const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`mb-4 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`} {...props}>
    {children}
  </h3>
);

const CardContent = ({ children, className = '', ...props }) => (
  <div className={`text-gray-600 ${className}`} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`mt-4 pt-4 border-t border-gray-100 ${className}`} {...props}>
    {children}
  </div>
);

// Export components
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;