import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({
  size = 'md',
  color = 'primary',
  overlay = false,
  text,
  className = '',
}) => {
  const sizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  const colors = {
    primary: 'text-primary-600',
    secondary: 'text-secondary-600',
    accent: 'text-accent-600',
    neutral: 'text-neutral-600',
    white: 'text-white',
  };

  const spinnerClasses = `${sizes[size]} ${colors[color]} animate-spin ${className}`;

  const spinner = (
    <div className="flex flex-col items-center justify-center space-y-2">
      <Loader2 className={spinnerClasses} />
      {text && (
        <p className="text-sm text-neutral-600 animate-pulse">{text}</p>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }

  return spinner;
};

// Inline spinner for buttons and small components
const InlineSpinner = ({ size = 'sm', color = 'current', className = '' }) => {
  const sizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
  };

  return (
    <Loader2 className={`${sizes[size]} text-${color} animate-spin ${className}`} />
  );
};

// Page loading spinner
const PageLoader = ({ text = 'Loading...', className = '' }) => (
  <div className={`flex items-center justify-center min-h-[400px] ${className}`}>
    <LoadingSpinner size="lg" text={text} />
  </div>
);

// Card loading skeleton
const CardLoader = ({ className = '' }) => (
  <div className={`animate-pulse ${className}`}>
    <div className="bg-neutral-200 rounded-lg p-6 space-y-4">
      <div className="h-4 bg-neutral-300 rounded w-3/4"></div>
      <div className="space-y-2">
        <div className="h-3 bg-neutral-300 rounded"></div>
        <div className="h-3 bg-neutral-300 rounded w-5/6"></div>
      </div>
    </div>
  </div>
);

// Table loading skeleton
const TableLoader = ({ rows = 5, cols = 4, className = '' }) => (
  <div className={`animate-pulse ${className}`}>
    <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-primary-100 px-6 py-4 border-b border-neutral-200">
        <div className="flex space-x-4">
          {Array.from({ length: cols }, (_, i) => (
            <div key={i} className="h-4 bg-primary-200 rounded flex-1"></div>
          ))}
        </div>
      </div>
      
      {/* Rows */}
      <div className="divide-y divide-neutral-200">
        {Array.from({ length: rows }, (_, rowIndex) => (
          <div key={rowIndex} className="px-6 py-4">
            <div className="flex space-x-4">
              {Array.from({ length: cols }, (_, colIndex) => (
                <div key={colIndex} className="h-3 bg-neutral-200 rounded flex-1"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

LoadingSpinner.Inline = InlineSpinner;
LoadingSpinner.Page = PageLoader;
LoadingSpinner.Card = CardLoader;
LoadingSpinner.Table = TableLoader;

export default LoadingSpinner;