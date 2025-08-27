import { useState, useEffect } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const FilterPanel = ({ 
  isOpen = false,
  onClose = () => {},
  onApply = () => {},
  onReset = () => {},
  filters = [],
  title = "Advanced Filters",
  className = ''
}) => {
  const [filterValues, setFilterValues] = useState({});
  const [hasChanges, setHasChanges] = useState(false);

  // Initialize filter values
  useEffect(() => {
    const initialValues = {};
    filters.forEach(filter => {
      initialValues[filter.key] = filter.defaultValue || '';
    });
    setFilterValues(initialValues);
  }, [filters]);

  const handleValueChange = (key, value) => {
    setFilterValues(prev => ({
      ...prev,
      [key]: value
    }));
    setHasChanges(true);
  };

  const handleApply = () => {
    onApply(filterValues);
    setHasChanges(false);
    onClose();
  };

  const handleReset = () => {
    const resetValues = {};
    filters.forEach(filter => {
      resetValues[filter.key] = '';
    });
    setFilterValues(resetValues);
    onReset();
    setHasChanges(false);
  };

  const renderFilterInput = (filter) => {
    const value = filterValues[filter.key] || '';

    switch (filter.type) {
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleValueChange(filter.key, e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">{filter.placeholder || `Select ${filter.label}`}</option>
            {filter.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'multiselect':
        const selectedValues = Array.isArray(value) ? value : [];
        return (
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {filter.options?.map(option => (
              <label key={option.value} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedValues.includes(option.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      handleValueChange(filter.key, [...selectedValues, option.value]);
                    } else {
                      handleValueChange(filter.key, selectedValues.filter(v => v !== option.value));
                    }
                  }}
                  className="mr-2 text-primary-600"
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        );

      case 'range':
        const [min, max] = Array.isArray(value) ? value : ['', ''];
        return (
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={min}
              onChange={(e) => handleValueChange(filter.key, [e.target.value, max])}
              className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              min={filter.min}
              max={filter.max}
            />
            <input
              type="number"
              placeholder="Max"
              value={max}
              onChange={(e) => handleValueChange(filter.key, [min, e.target.value])}
              className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              min={filter.min}
              max={filter.max}
            />
          </div>
        );

      case 'date-range':
        const [startDate, endDate] = Array.isArray(value) ? value : ['', ''];
        return (
          <div className="flex space-x-2">
            <input
              type="date"
              value={startDate}
              onChange={(e) => handleValueChange(filter.key, [e.target.value, endDate])}
              className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => handleValueChange(filter.key, [startDate, e.target.value])}
              className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        );

      case 'boolean':
        return (
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name={filter.key}
                value="true"
                checked={value === 'true'}
                onChange={(e) => handleValueChange(filter.key, e.target.value)}
                className="mr-2 text-primary-600"
              />
              <span className="text-sm">Yes</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name={filter.key}
                value="false"
                checked={value === 'false'}
                onChange={(e) => handleValueChange(filter.key, e.target.value)}
                className="mr-2 text-primary-600"
              />
              <span className="text-sm">No</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name={filter.key}
                value=""
                checked={value === ''}
                onChange={(e) => handleValueChange(filter.key, e.target.value)}
                className="mr-2 text-primary-600"
              />
              <span className="text-sm">Any</span>
            </label>
          </div>
        );

      default: // text
        return (
          <input
            type="text"
            placeholder={filter.placeholder || `Enter ${filter.label}`}
            value={value}
            onChange={(e) => handleValueChange(filter.key, e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className={`w-full max-w-2xl max-h-full overflow-auto ${className}`}>
        <Card.Header className="bg-primary-600 text-white sticky top-0">
          <div className="flex items-center justify-between">
            <Card.Title className="text-white">{title}</Card.Title>
            <Button
              variant="secondary"
              size="sm"
              onClick={onClose}
              className="bg-white text-primary-600 hover:bg-neutral-100"
            >
              Close
            </Button>
          </div>
        </Card.Header>

        <Card.Content className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filters.map(filter => (
              <div key={filter.key} className="space-y-2">
                <label className="block text-sm font-medium text-neutral-700">
                  {filter.label}
                  {filter.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {renderFilterInput(filter)}
                {filter.helpText && (
                  <p className="text-xs text-neutral-500">{filter.helpText}</p>
                )}
              </div>
            ))}
          </div>

          {/* Active Filters Preview */}
          <div className="mt-6 pt-4 border-t border-neutral-200">
            <h4 className="text-sm font-medium text-neutral-700 mb-2">Active Filters:</h4>
            <div className="flex flex-wrap gap-2">
              {Object.entries(filterValues)
                .filter(([_, value]) => {
                  if (Array.isArray(value)) {
                    return value.some(v => v && v.toString().trim() !== '');
                  }
                  return value && value.toString().trim() !== '';
                })
                .map(([key, value]) => {
                  const filter = filters.find(f => f.key === key);
                  let displayValue = value;
                  
                  if (Array.isArray(value)) {
                    displayValue = value.filter(v => v).join(', ');
                  }
                  
                  return (
                    <span
                      key={key}
                      className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-primary-100 text-primary-800"
                    >
                      {filter?.label}: {displayValue}
                    </span>
                  );
                })}
              {Object.values(filterValues).every(v => 
                Array.isArray(v) ? v.length === 0 : !v || v.toString().trim() === ''
              ) && (
                <span className="text-sm text-neutral-500">No filters applied</span>
              )}
            </div>
          </div>
        </Card.Content>

        <Card.Footer className="bg-neutral-50 px-6 py-4 flex justify-between items-center sticky bottom-0">
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={!hasChanges && Object.values(filterValues).every(v => 
              Array.isArray(v) ? v.length === 0 : !v || v.toString().trim() === ''
            )}
          >
            Reset All
          </Button>
          <div className="space-x-3">
            <Button
              variant="secondary"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleApply}
              disabled={!hasChanges}
            >
              Apply Filters
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default FilterPanel;