import { forwardRef } from 'react';

const Input = forwardRef(({ 
  label, 
  error, 
  type = 'text', 
  placeholder,
  required = false,
  className = '',
  ...props 
}, ref) => {
  const inputClasses = `
    w-full px-3 py-2 border-2 rounded-lg text-sm transition-all duration-150
    focus:outline-none focus:ring-2 focus:ring-blue-500/20
    ${error 
      ? 'border-red-500 focus:border-red-500' 
      : 'border-gray-200 focus:border-blue-600'
    }
    ${className}
  `;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={inputClasses}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;