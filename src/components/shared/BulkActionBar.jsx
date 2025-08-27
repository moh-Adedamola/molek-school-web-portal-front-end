import { useState } from 'react';
import Button from '../ui/Button';
import Card from '../ui/Card';

const BulkActionBar = ({ 
  selectedItems = [],
  totalItems = 0,
  actions = [],
  onSelectAll = () => {},
  onClearSelection = () => {},
  className = ''
}) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const isAllSelected = selectedItems.length === totalItems && totalItems > 0;
  const hasSelection = selectedItems.length > 0;

  const handleSelectAll = () => {
    if (isAllSelected) {
      onClearSelection();
    } else {
      onSelectAll();
    }
  };

  const handleActionClick = (action) => {
    if (action.requiresConfirm) {
      setPendingAction(action);
      setShowConfirm(true);
    } else {
      action.handler(selectedItems);
    }
  };

  const handleConfirm = () => {
    if (pendingAction) {
      pendingAction.handler(selectedItems);
      setPendingAction(null);
      setShowConfirm(false);
    }
  };

  const handleCancel = () => {
    setPendingAction(null);
    setShowConfirm(false);
  };

  if (!hasSelection && !showConfirm) {
    return null;
  }

  return (
    <>
      {/* Bulk Action Bar */}
      <Card className={`mb-4 ${className}`}>
        <div className="flex items-center justify-between p-4 bg-primary-50 border border-primary-200">
          {/* Selection Info */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={handleSelectAll}
                className="w-4 h-4 text-primary-600 border-primary-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm font-medium text-primary-800">
                {isAllSelected ? 'All' : selectedItems.length} of {totalItems} selected
              </span>
            </div>
            
            {hasSelection && (
              <Button
                size="sm"
                variant="secondary"
                onClick={onClearSelection}
              >
                Clear Selection
              </Button>
            )}
          </div>

          {/* Action Buttons */}
          {hasSelection && actions.length > 0 && (
            <div className="flex items-center space-x-2">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  size="sm"
                  variant={action.variant || 'primary'}
                  onClick={() => handleActionClick(action)}
                  disabled={action.disabled}
                  className={action.className}
                >
                  {action.icon && <span className="mr-1">{action.icon}</span>}
                  {action.label}
                  {selectedItems.length > 0 && ` (${selectedItems.length})`}
                </Button>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Confirmation Modal */}
      {showConfirm && pendingAction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="max-w-md w-full mx-4">
            <Card.Header className="bg-accent-50 border-b border-accent-200">
              <Card.Title className="text-accent-800 flex items-center">
                {pendingAction.confirmIcon && (
                  <span className="mr-2">{pendingAction.confirmIcon}</span>
                )}
                {pendingAction.confirmTitle || 'Confirm Action'}
              </Card.Title>
            </Card.Header>
            
            <Card.Content className="p-6">
              <p className="text-neutral-700 mb-4">
                {pendingAction.confirmMessage || 
                 `Are you sure you want to ${pendingAction.label.toLowerCase()} ${selectedItems.length} item${selectedItems.length !== 1 ? 's' : ''}?`}
              </p>
              
              {pendingAction.details && (
                <div className="bg-neutral-50 p-3 rounded-lg mb-4">
                  <p className="text-sm text-neutral-600">{pendingAction.details}</p>
                </div>
              )}
              
              <div className="text-sm text-neutral-600">
                Selected items: {selectedItems.length}
              </div>
            </Card.Content>
            
            <Card.Footer className="flex justify-end space-x-3 p-4 border-t border-neutral-200">
              <Button
                variant="secondary"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                variant={pendingAction.variant || 'primary'}
                onClick={handleConfirm}
              >
                {pendingAction.confirmButtonText || 'Confirm'}
              </Button>
            </Card.Footer>
          </Card>
        </div>
      )}
    </>
  );
};

export default BulkActionBar;