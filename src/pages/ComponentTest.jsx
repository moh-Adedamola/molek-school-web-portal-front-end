import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, Search, Plus, Edit, Trash2 } from 'lucide-react';

// UI Components (these would normally be imported from your components/ui folder)
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  disabled = false,
  type = 'button',
  className = '',
  onClick,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };
  
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
};

const Input = ({
  label,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error,
  helperText,
  required = false,
  disabled = false,
  className = '',
  inputClassName = '',
  id,
  name,
  ...props
}) => {
  const inputId = id || name;
  
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label 
          htmlFor={inputId} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`
          block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
          ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'}
          ${inputClassName}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

const Card = ({ 
  children, 
  className = '', 
  header, 
  title, 
  subtitle,
  footer,
  padding = true,
  shadow = true 
}) => {
  return (
    <div className={`
      bg-white rounded-lg border border-gray-200 
      ${shadow ? 'shadow-sm' : ''} 
      ${className}
    `}>
      {(header || title || subtitle) && (
        <div className={`border-b border-gray-200 ${padding ? 'px-6 py-4' : ''}`}>
          {header || (
            <div>
              {title && <h3 className="text-lg font-medium text-gray-900">{title}</h3>}
              {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
            </div>
          )}
        </div>
      )}
      
      <div className={padding ? 'px-6 py-4' : ''}>
        {children}
      </div>
      
      {footer && (
        <div className={`border-t border-gray-200 ${padding ? 'px-6 py-4' : ''}`}>
          {footer}
        </div>
      )}
    </div>
  );
};

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'md',
  closeOnBackdrop = true 
}) => {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl'
  };

  React.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={closeOnBackdrop ? onClose : undefined}
      />
      
      <div className="flex min-h-full items-center justify-center p-4">
        <div className={`
          relative bg-white rounded-lg shadow-xl w-full ${sizes[size]}
          transform transition-all
        `}>
          {title && (
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">{title}</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ×
              </button>
            </div>
          )}
          
          <div className="px-6 py-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const Table = ({ 
  columns, 
  data, 
  sortable = false,
  sortColumn,
  sortDirection,
  onSort,
  className = '',
  emptyMessage = 'No data available'
}) => {
  const handleSort = (columnKey) => {
    if (!sortable || !onSort) return;
    
    if (sortColumn === columnKey) {
      const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
      onSort(columnKey, newDirection);
    } else {
      onSort(columnKey, 'asc');
    }
  };

  const getSortIcon = (columnKey) => {
    if (sortColumn !== columnKey) return null;
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`
                  px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
                  ${sortable && column.sortable !== false ? 'cursor-pointer hover:bg-gray-100' : ''}
                `}
                onClick={() => column.sortable !== false && handleSort(column.key)}
              >
                <div className="flex items-center">
                  {column.title}
                  {sortable && column.sortable !== false && (
                    <span className="ml-1">{getSortIcon(column.key)}</span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-500">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 whitespace-nowrap">
                    {column.render ? 
                      column.render(row[column.key], row, rowIndex) : 
                      <div className="text-sm text-gray-900">{row[column.key]}</div>
                    }
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md',
  className = '' 
}) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-blue-100 text-blue-800',
    secondary: 'bg-emerald-100 text-emerald-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-indigo-100 text-indigo-800'
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base'
  };

  return (
    <span className={`
      inline-flex items-center font-medium rounded-full
      ${variants[variant]} ${sizes[size]} ${className}
    `}>
      {children}
    </span>
  );
};

const LoadingSpinner = ({ 
  size = 'md', 
  color = 'blue',
  text = '',
  className = '' 
}) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const colors = {
    blue: 'text-blue-600',
    emerald: 'text-emerald-600',
    gray: 'text-gray-600',
    white: 'text-white'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="flex flex-col items-center space-y-2">
        <svg
          className={`animate-spin ${sizes[size]} ${colors[color]}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
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
        {text && <p className="text-sm text-gray-600">{text}</p>}
      </div>
    </div>
  );
};

// Main Test Component
const ComponentTestPage = () => {
  // State for interactive testing
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: ''
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalSize, setModalSize] = useState('md');
  const [showSpinner, setShowSpinner] = useState(false);
  const [errors, setErrors] = useState({});
  
  // Table state
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  // Sample table data
  const sampleStudents = [
    { id: 1, name: 'John Doe', class: 'JSS1A', status: 'Active', grade: 'A' },
    { id: 2, name: 'Jane Smith', class: 'JSS1B', status: 'Active', grade: 'B+' },
    { id: 3, name: 'Bob Johnson', class: 'JSS2A', status: 'Inactive', grade: 'A-' },
    { id: 4, name: 'Alice Brown', class: 'JSS2B', status: 'Active', grade: 'B' }
  ];

  const tableColumns = [
    { key: 'name', title: 'Student Name' },
    { key: 'class', title: 'Class' },
    { 
      key: 'status', 
      title: 'Status',
      render: (value) => (
        <Badge 
          variant={value === 'Active' ? 'success' : 'danger'} 
          size="sm"
        >
          {value}
        </Badge>
      )
    },
    { key: 'grade', title: 'Grade' },
    {
      key: 'actions',
      title: 'Actions',
      sortable: false,
      render: () => (
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" onClick={() => alert('Edit clicked')}>
            <Edit size={14} className="mr-1" />
            Edit
          </Button>
          <Button size="sm" variant="danger" onClick={() => alert('Delete clicked')}>
            <Trash2 size={14} />
          </Button>
        </div>
      )
    }
  ];

  // Event handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    // Simulate form validation
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.role) newErrors.role = 'Role is required';
    
    setTimeout(() => {
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
      } else {
        alert('Form submitted successfully!');
        setFormData({ name: '', email: '', role: '' });
      }
      setLoading(false);
    }, 2000);
  };

  const handleSort = (column, direction) => {
    setSortColumn(column);
    setSortDirection(direction);
    console.log(`Sorting by ${column} in ${direction} order`);
  };

  const toggleSpinner = () => {
    setShowSpinner(true);
    setTimeout(() => setShowSpinner(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          School Management System - UI Components Test
        </h1>

        {/* Button Component Tests */}
        <Card title="Button Component" subtitle="Test all button variants and states" className="mb-8">
          <div className="space-y-6">
            {/* Button Variants */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Variants</h4>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
            </div>

            {/* Button Sizes */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Sizes</h4>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            {/* Button States */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">States</h4>
              <div className="flex flex-wrap gap-3">
                <Button loading={loading} onClick={handleSubmit}>
                  {loading ? 'Submitting...' : 'Submit Form'}
                </Button>
                <Button disabled>Disabled</Button>
                <Button variant="primary" onClick={() => alert('Clicked!')}>
                  <Plus size={16} className="mr-2" />
                  With Icon
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Input Component Tests */}
        <Card title="Input Component" subtitle="Test form inputs with validation" className="mb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Input
                label="Student Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter student name"
                error={errors.name}
                required
              />
              <Input
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="student@school.com"
                error={errors.email}
                required
              />
              <Input
                label="Role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                placeholder="Select role"
                helperText="Choose from: Student, Teacher, Parent, Admin"
                error={errors.role}
              />
            </div>
            <div className="space-y-4">
              <Input
                label="Phone Number"
                type="tel"
                placeholder="+234 xxx xxx xxxx"
                helperText="Optional contact information"
              />
              <Input
                label="Date of Birth"
                type="date"
              />
              <Input
                label="Disabled Field"
                value="This field is disabled"
                disabled
              />
            </div>
          </div>
        </Card>

        {/* Badge Component Tests */}
        <Card title="Badge Component" subtitle="Status indicators and labels" className="mb-8">
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Variants</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Default</Badge>
                <Badge variant="primary">Primary</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="danger">Danger</Badge>
                <Badge variant="info">Info</Badge>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Sizes & Real Examples</h4>
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="success" size="sm">Active</Badge>
                <Badge variant="warning" size="md">Pending</Badge>
                <Badge variant="danger" size="lg">Suspended</Badge>
                <Badge variant="primary" size="md">Teacher</Badge>
                <Badge variant="secondary" size="md">Parent</Badge>
                <Badge variant="info" size="sm">JSS1A</Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Table Component Tests */}
        <Card title="Table Component" subtitle="Data display with sorting capabilities" className="mb-8">
          <Table
            columns={tableColumns}
            data={sampleStudents}
            sortable
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            onSort={handleSort}
            className="mb-4"
          />
          <div className="text-sm text-gray-600">
            Click on column headers to test sorting functionality
          </div>
        </Card>

        {/* Modal Component Tests */}
        <Card title="Modal Component" subtitle="Dialog windows and overlays" className="mb-8">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => { setModalSize('sm'); setShowModal(true); }}>
                Small Modal
              </Button>
              <Button onClick={() => { setModalSize('md'); setShowModal(true); }}>
                Medium Modal
              </Button>
              <Button onClick={() => { setModalSize('lg'); setShowModal(true); }}>
                Large Modal
              </Button>
              <Button onClick={() => { setModalSize('xl'); setShowModal(true); }}>
                Extra Large Modal
              </Button>
            </div>
            <p className="text-sm text-gray-600">
              Test modal functionality: backdrop clicks, escape key, and different sizes
            </p>
          </div>
        </Card>

        {/* LoadingSpinner Component Tests */}
        <Card title="Loading Spinner" subtitle="Loading states and indicators" className="mb-8">
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Sizes & Colors</h4>
              <div className="flex flex-wrap items-center gap-6">
                <div className="text-center">
                  <LoadingSpinner size="sm" />
                  <p className="text-xs mt-1">Small</p>
                </div>
                <div className="text-center">
                  <LoadingSpinner size="md" />
                  <p className="text-xs mt-1">Medium</p>
                </div>
                <div className="text-center">
                  <LoadingSpinner size="lg" color="emerald" />
                  <p className="text-xs mt-1">Large</p>
                </div>
                <div className="text-center">
                  <LoadingSpinner size="xl" color="gray" text="Loading..." />
                  <p className="text-xs mt-1">Extra Large with Text</p>
                </div>
              </div>
            </div>
            
            <div>
              <Button onClick={toggleSpinner} disabled={showSpinner}>
                {showSpinner ? 'Loading...' : 'Test Loading (3s)'}
              </Button>
              {showSpinner && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <LoadingSpinner text="Processing your request..." />
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Integration Test */}
        <Card 
          title="Integration Test" 
          subtitle="Components working together"
          footer={
            <div className="flex justify-between items-center">
              <Badge variant="info">All components integrated</Badge>
              <Button variant="secondary" size="sm">
                <Search size={16} className="mr-1" />
                Search
              </Button>
            </div>
          }
        >
          <p className="text-gray-600 mb-4">
            This card demonstrates how all components work together in a real application scenario.
            Form inputs with validation, buttons with different states, badges for status display,
            and interactive elements.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="success">✓ Responsive Design</Badge>
            <Badge variant="success">✓ Accessibility</Badge>
            <Badge variant="success">✓ Interactive States</Badge>
            <Badge variant="success">✓ Consistent Styling</Badge>
          </div>
        </Card>
      </div>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={`${modalSize.toUpperCase()} Modal Example`}
        size={modalSize}
      >
        <div className="space-y-4">
          <p>This is a {modalSize} modal demonstrating the Modal component functionality.</p>
          
          <div className="space-y-3">
            <Input label="Sample Input" placeholder="Type something..." />
            <div className="flex gap-2">
              <Badge variant="primary">Modal Content</Badge>
              <Badge variant="secondary">Interactive</Badge>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="ghost" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowModal(false)}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ComponentTestPage;