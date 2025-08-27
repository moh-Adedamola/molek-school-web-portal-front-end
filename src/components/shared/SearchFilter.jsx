import { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const SearchFilter = ({ 
  onFilter = () => {},
  onClear = () => {},
  fields = [],
  className = ''
}) => {
  const [filters, setFilters] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);

  const handleInputChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleClear = () => {
    setFilters({});
    onClear();
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    value && value.toString().trim() !== ''
  );

  const renderField = (field) => {
    const value = filters[field.name] || '';

    switch (field.type) {
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
          >
            <option value="">All {field.label}</option>
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'date':
        return (
          <input
            type="date"
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
          />
        );
      
      case 'number':
        return (
          <input
            type="number"
            placeholder={field.placeholder || `Search ${field.label}`}
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
            min={field.min}
            max={field.max}
          />
        );
      
      default: // text
        return (
          <input
            type="text"
            placeholder={field.placeholder || `Search ${field.label}`}
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
          />
        );
    }
  };

  // Separate basic and advanced fields
  const basicFields = fields.filter(field => !field.advanced);
  const advancedFields = fields.filter(field => field.advanced);

  return (
    <Card className={`mb-6 ${className}`}>
      <Card.Header className="bg-primary-50 border-b border-primary-200">
        <div className="flex items-center justify-between">
          <Card.Title className="text-primary-800">Search & Filter</Card.Title>
          {hasActiveFilters && (
            <Button
              size="sm"
              variant="secondary"
              onClick={handleClear}
            >
              Clear All
            </Button>
          )}
        </div>
      </Card.Header>
      
      <Card.Content className="p-4">
        {/* Basic Search Fields */}
        {basicFields.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {basicFields.map(field => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  {field.label}
                </label>
                {renderField(field)}
              </div>
            ))}
          </div>
        )}

        {/* Advanced Filters Toggle */}
        {advancedFields.length > 0 && (
          <div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="mb-4"
            >
              {isExpanded ? 'Hide' : 'Show'} Advanced Filters
            </Button>

            {isExpanded && (
              <div className="border-t border-neutral-200 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {advancedFields.map(field => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        {field.label}
                      </label>
                      {renderField(field)}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="mt-4 pt-4 border-t border-neutral-200">
            <p className="text-sm font-medium text-neutral-700 mb-2">Active Filters:</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(filters)
                .filter(([_, value]) => value && value.toString().trim() !== '')
                .map(([key, value]) => {
                  const field = fields.find(f => f.name === key);
                  return (
                    <span
                      key={key}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-primary-100 text-primary-800"
                    >
                      {field?.label}: {value}
                      <button
                        onClick={() => handleInputChange(key, '')}
                        className="ml-2 text-primary-600 hover:text-primary-800"
                      >
                        ×
                      </button>
                    </span>
                  );
                })}
            </div>
          </div>
        )}
      </Card.Content>
    </Card>
  );
};

export default SearchFilter;