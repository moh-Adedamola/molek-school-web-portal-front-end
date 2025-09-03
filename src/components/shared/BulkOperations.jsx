// File: components/shared/BulkOperations.jsx
import React, { useState } from 'react';
import { Users, Mail, Download, Trash2, UserCheck, UserX, AlertTriangle, X } from 'lucide-react';

const BulkOperations = ({ 
  selectedItems, 
  onClose, 
  onExecute,
  itemType = 'users' // users, students, teachers, etc.
}) => {
  const [selectedAction, setSelectedAction] = useState('');
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [executionInProgress, setExecutionInProgress] = useState(false);
  const [customMessage, setCustomMessage] = useState('');

  const bulkActions = [
    {
      id: 'activate',
      label: 'Activate Accounts',
      description: 'Enable selected user accounts',
      icon: UserCheck,
      color: 'green',
      requiresConfirmation: false
    },
    {
      id: 'deactivate',
      label: 'Deactivate Accounts',
      description: 'Temporarily disable selected user accounts',
      icon: UserX,
      color: 'yellow',
      requiresConfirmation: true
    },
    {
      id: 'delete',
      label: 'Delete Accounts',
      description: 'Permanently remove selected user accounts',
      icon: Trash2,
      color: 'red',
      requiresConfirmation: true,
      dangerous: true
    },
    {
      id: 'export',
      label: 'Export Data',
      description: 'Download selected user data as CSV',
      icon: Download,
      color: 'blue',
      requiresConfirmation: false
    },
    {
      id: 'email',
      label: 'Send Email',
      description: 'Send bulk email to selected users',
      icon: Mail,
      color: 'purple',
      requiresConfirmation: false,
      requiresMessage: true
    }
  ];

  const emailTemplates = [
    {
      id: 'welcome',
      name: 'Welcome Message',
      subject: 'Welcome to Our School Management System',
      body: 'Dear {{name}},\n\nWelcome to our school management system. Your account has been created successfully.\n\nBest regards,\nSchool Administration'
    },
    {
      id: 'reminder',
      name: 'Account Reminder',
      subject: 'Account Access Reminder',
      body: 'Dear {{name}},\n\nThis is a reminder about your account access to our school management system.\n\nBest regards,\nSchool Administration'
    },
    {
      id: 'custom',
      name: 'Custom Message',
      subject: '',
      body: ''
    }
  ];

  const [emailTemplate, setEmailTemplate] = useState('welcome');
  const [emailSubject, setEmailSubject] = useState(emailTemplates[0].subject);
  const [emailBody, setEmailBody] = useState(emailTemplates[0].body);

  const handleActionSelect = (actionId) => {
    setSelectedAction(actionId);
    const action = bulkActions.find(a => a.id === actionId);
    
    if (action?.requiresConfirmation) {
      setConfirmationOpen(true);
    } else if (action?.requiresMessage) {
      // For email action, show the email composition interface
      return;
    } else {
      executeAction(actionId);
    }
  };

  const executeAction = async (actionId = selectedAction) => {
    setExecutionInProgress(true);
    
    try {
      let actionData = {
        action: actionId,
        items: selectedItems
      };

      // Add additional data for specific actions
      if (actionId === 'email') {
        actionData.emailData = {
          subject: emailSubject,
          body: emailBody,
          template: emailTemplate
        };
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      await onExecute(actionData);
      onClose();
    } catch (error) {
      console.error('Bulk operation failed:', error);
    } finally {
      setExecutionInProgress(false);
      setConfirmationOpen(false);
    }
  };

  const handleTemplateChange = (templateId) => {
    setEmailTemplate(templateId);
    const template = emailTemplates.find(t => t.id === templateId);
    if (template) {
      setEmailSubject(template.subject);
      setEmailBody(template.body);
    }
  };

  const getActionColor = (color) => {
    const colors = {
      green: 'border-green-200 bg-green-50 hover:bg-green-100',
      yellow: 'border-yellow-200 bg-yellow-50 hover:bg-yellow-100',
      red: 'border-red-200 bg-red-50 hover:bg-red-100',
      blue: 'border-blue-200 bg-blue-50 hover:bg-blue-100',
      purple: 'border-purple-200 bg-purple-50 hover:bg-purple-100'
    };
    return colors[color] || 'border-gray-200 bg-gray-50 hover:bg-gray-100';
  };

  const getIconColor = (color) => {
    const colors = {
      green: 'text-green-600',
      yellow: 'text-yellow-600',
      red: 'text-red-600',
      blue: 'text-blue-600',
      purple: 'text-purple-600'
    };
    return colors[color] || 'text-gray-600';
  };

  const getButtonColor = (color) => {
    const colors = {
      green: 'bg-green-600 hover:bg-green-700 text-white',
      yellow: 'bg-yellow-600 hover:bg-yellow-700 text-white',
      red: 'bg-red-600 hover:bg-red-700 text-white',
      blue: 'bg-blue-600 hover:bg-blue-700 text-white',
      purple: 'bg-purple-600 hover:bg-purple-700 text-white'
    };
    return colors[color] || 'bg-gray-600 hover:bg-gray-700 text-white';
  };

  if (selectedItems.length === 0) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-blue-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Bulk Operations</h2>
              <p className="text-gray-600">
                {selectedItems.length} {itemType} selected for bulk action
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-160px)]">
          {!selectedAction ? (
            // Action Selection
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Choose an action to perform on the selected {itemType}:
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bulkActions.map(action => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.id}
                      onClick={() => handleActionSelect(action.id)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${getActionColor(action.color)}`}
                    >
                      <div className="flex items-start gap-3">
                        <Icon className={`w-6 h-6 ${getIconColor(action.color)} flex-shrink-0 mt-0.5`} />
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">
                            {action.label}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {action.description}
                          </p>
                          {action.dangerous && (
                            <div className="flex items-center gap-1 mt-2">
                              <AlertTriangle className="w-4 h-4 text-red-500" />
                              <span className="text-xs text-red-600 font-medium">
                                This action cannot be undone
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : selectedAction === 'email' ? (
            // Email Composition
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Compose Email</h3>
                <button
                  onClick={() => setSelectedAction('')}
                  className="text-blue-600 hover:text-blue-700 text-sm"
                >
                  ← Back to actions
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Template
                </label>
                <select
                  value={emailTemplate}
                  onChange={(e) => handleTemplateChange(e.target.value)}
                  className="input-base w-full"
                >
                  {emailTemplates.map(template => (
                    <option key={template.id} value={template.id}>
                      {template.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="input-base w-full"
                  placeholder="Email subject"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message Body
                </label>
                <textarea
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  className="input-base w-full h-40 resize-none"
                  placeholder="Email message body"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use {`name`} to personalize messages with recipient names
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2">Recipients ({selectedItems.length})</h4>
                <p className="text-sm text-blue-700">
                  This email will be sent to all selected {itemType}. Make sure to review the message before sending.
                </p>
              </div>
            </div>
          ) : null}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={() => selectedAction ? setSelectedAction('') : onClose()}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {selectedAction ? 'Back' : 'Cancel'}
          </button>
          
          {selectedAction && (
            <button
              onClick={() => executeAction()}
              disabled={executionInProgress || (selectedAction === 'email' && (!emailSubject || !emailBody))}
              className={`px-6 py-2 rounded-lg font-medium disabled:opacity-50 transition-colors ${
                getButtonColor(bulkActions.find(a => a.id === selectedAction)?.color)
              }`}
            >
              {executionInProgress ? (
                'Processing...'
              ) : (
                `Execute ${bulkActions.find(a => a.id === selectedAction)?.label}`
              )}
            </button>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmationOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="text-center">
              <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Action</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to {bulkActions.find(a => a.id === selectedAction)?.label.toLowerCase()} for {selectedItems.length} {itemType}?
                {bulkActions.find(a => a.id === selectedAction)?.dangerous && (
                  <span className="block mt-2 text-red-600 font-medium">
                    This action cannot be undone.
                  </span>
                )}
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setConfirmationOpen(false)}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => executeAction()}
                  disabled={executionInProgress}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    getButtonColor(bulkActions.find(a => a.id === selectedAction)?.color)
                  }`}
                >
                  {executionInProgress ? 'Processing...' : 'Confirm'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkOperations;