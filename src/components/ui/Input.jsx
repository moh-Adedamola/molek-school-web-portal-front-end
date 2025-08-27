import { forwardRef } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

const Input = forwardRef(({
  label,
  error,
  success,
  hint,
  type = 'text',
  size = 'md',
  className = '',
  disabled = false,
  required = false,
  ...props
}, ref) => {
  const baseClasses = 'w-full rounded-lg border-2 transition-colors duration-200 focus:outline-none focus:ring-0 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-4 py-3 text-base',
  };

  const getStateClasses = () => {
    if (error) return 'border-red-500 focus:border-red-600 bg-red-50';
    if (success) return 'border-secondary-500 focus:border-secondary-600 bg-secondary-50';
    return 'border-neutral-300 focus:border-primary-600 bg-white hover:border-neutral-400';
  };

  const inputClasses = `${baseClasses} ${sizes[size]} ${getStateClasses()} ${className}`;

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-neutral-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <input
          ref={ref}
          type={type}
          className={inputClasses}
          disabled={disabled}
          {...props}
        />
        
        {error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <AlertCircle className="h-5 w-5 text-red-500" />
          </div>
        )}
        
        {success && !error && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <CheckCircle className="h-5 w-5 text-secondary-500" />
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-600 flex items-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          {error}
        </p>
      )}
      
      {success && !error && (
        <p className="text-sm text-secondary-600 flex items-center">
          <CheckCircle className="h-4 w-4 mr-1" />
          {success}
        </p>
      )}
      
      {hint && !error && !success && (
        <p className="text-sm text-neutral-500">{hint}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;