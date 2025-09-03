const LoadingSpinner = ({ 
  size = 'md', 
  text = 'Loading...', 
  centered = false,
  color = 'blue'
}) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  };

  const colors = {
    blue: 'text-blue-600',
    green: 'text-emerald-600',
    amber: 'text-amber-600',
    gray: 'text-gray-400'
  };

  const spinnerClasses = `animate-spin ${sizes[size]} ${colors[color]}`;
  
  const Spinner = () => (
    <svg className={spinnerClasses} fill="none" viewBox="0 0 24 24">
      <circle 
        className="opacity-25" 
        cx="12" 
        cy="12" 
        r="10" 
        stroke="currentColor" 
        strokeWidth="4"
      />
      <path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  if (centered) {
    return (
      <div className="flex flex-col items-center justify-center min-h-32 space-y-3">
        <Spinner />
        {text && <p className="text-sm text-gray-600">{text}</p>}
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <Spinner />
      {text && <span className="text-sm text-gray-600">{text}</span>}
    </div>
  );
};

export default LoadingSpinner;