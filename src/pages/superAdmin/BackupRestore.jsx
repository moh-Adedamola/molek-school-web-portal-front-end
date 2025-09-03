// File: pages/super-admin/BackupRestore.jsx
import React, { useState } from 'react';
import { Download, Upload, Shield, Clock, Database, AlertTriangle, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

const BackupRestore = () => {
  const [backups, setBackups] = useState([
    {
      id: 1,
      name: 'Full System Backup - Sep 2024',
      type: 'full',
      size: '2.4 GB',
      date: '2024-09-02 03:00 AM',
      status: 'completed',
      duration: '45 minutes',
      description: 'Complete system backup including all user data, academic records, and system settings'
    },
    {
      id: 2,
      name: 'Academic Data Backup - Aug 2024',
      type: 'academic',
      size: '850 MB',
      date: '2024-08-28 02:30 AM',
      status: 'completed',
      duration: '18 minutes',
      description: 'Student records, grades, attendance, and academic calendar data'
    },
    {
      id: 3,
      name: 'User Data Backup - Aug 2024',
      type: 'users',
      size: '124 MB',
      date: '2024-08-25 02:00 AM',
      status: 'completed',
      duration: '8 minutes',
      description: 'User accounts, roles, permissions, and authentication data'
    },
    {
      id: 4,
      name: 'System Settings Backup - Aug 2024',
      type: 'settings',
      size: '45 MB',
      date: '2024-08-20 01:45 AM',
      status: 'failed',
      duration: '2 minutes',
      description: 'School configuration, system preferences, and customization settings'
    }
  ]);

  const [backupInProgress, setBackupInProgress] = useState(false);
  const [restoreInProgress, setRestoreInProgress] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState(null);
  const [backupType, setBackupType] = useState('full');

  const backupTypes = [
    { id: 'full', label: 'Full System Backup', description: 'Complete system backup (recommended)', icon: Database },
    { id: 'academic', label: 'Academic Data Only', description: 'Student records, grades, attendance', icon: Shield },
    { id: 'users', label: 'User Data Only', description: 'User accounts and permissions', icon: CheckCircle },
    { id: 'settings', label: 'System Settings Only', description: 'Configuration and preferences', icon: RefreshCw }
  ];

  const handleCreateBackup = async () => {
    setBackupInProgress(true);
    
    // Simulate backup creation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const newBackup = {
      id: backups.length + 1,
      name: `${backupTypes.find(t => t.id === backupType).label} - ${new Date().toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}`,
      type: backupType,
      size: backupType === 'full' ? '2.6 GB' : backupType === 'academic' ? '920 MB' : backupType === 'users' ? '135 MB' : '48 MB',
      date: new Date().toLocaleString('en-GB'),
      status: 'completed',
      duration: backupType === 'full' ? '52 minutes' : backupType === 'academic' ? '22 minutes' : backupType === 'users' ? '12 minutes' : '5 minutes',
      description: backupTypes.find(t => t.id === backupType).description
    };

    setBackups([newBackup, ...backups]);
    setBackupInProgress(false);
  };

  const handleRestoreBackup = async (backup) => {
    setSelectedBackup(backup);
    setRestoreInProgress(true);
    
    // Simulate restore process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Restoring backup:', backup);
    setRestoreInProgress(false);
    setSelectedBackup(null);
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: 'text-green-600 bg-green-100',
      failed: 'text-red-600 bg-red-100',
      running: 'text-yellow-600 bg-yellow-100'
    };
    return colors[status] || 'text-gray-600 bg-gray-100';
  };

  const getStatusIcon = (status) => {
    const icons = {
      completed: CheckCircle,
      failed: XCircle,
      running: RefreshCw
    };
    return icons[status] || Clock;
  };

  const getTypeColor = (type) => {
    const colors = {
      full: 'text-blue-600 bg-blue-100',
      academic: 'text-green-600 bg-green-100',
      users: 'text-purple-600 bg-purple-100',
      settings: 'text-yellow-600 bg-yellow-100'
    };
    return colors[type] || 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Backup & Restore</h1>
        <p className="text-gray-600">Manage system backups and data restoration</p>
      </div>

      {/* Warning Banner */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-yellow-800 mb-1">Important Backup Guidelines</h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Always test restore procedures in a staging environment first</li>
              <li>• Schedule backups during low-usage periods (typically 2-4 AM)</li>
              <li>• Verify backup integrity before deleting old backups</li>
              <li>• Maintain at least 3 backup copies following the 3-2-1 rule</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Create Backup Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Backup</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          {backupTypes.map((type) => {
            const Icon = type.icon;
            return (
              <div
                key={type.id}
                onClick={() => setBackupType(type.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  backupType === type.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Icon className={`w-5 h-5 ${backupType === type.id ? 'text-blue-600' : 'text-gray-600'}`} />
                  <h3 className={`font-medium ${backupType === type.id ? 'text-blue-900' : 'text-gray-900'}`}>
                    {type.label}
                  </h3>
                </div>
                <p className={`text-sm ${backupType === type.id ? 'text-blue-700' : 'text-gray-600'}`}>
                  {type.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <p>Next automatic backup: <span className="font-medium">Tonight at 2:00 AM</span></p>
          </div>
          <button
            onClick={handleCreateBackup}
            disabled={backupInProgress}
            className="btn-primary flex items-center gap-2 px-6 py-2 rounded-lg font-medium disabled:opacity-50"
          >
            {backupInProgress ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Creating Backup...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Create Backup Now
              </>
            )}
          </button>
        </div>
      </div>

      {/* Backup History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Backup History</h2>
          <p className="text-gray-600 mt-1">View and manage existing backups</p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-600">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Backup Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {backups.map((backup, index) => {
                const StatusIcon = getStatusIcon(backup.status);
                return (
                  <tr key={backup.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{backup.name}</div>
                        <div className="text-sm text-gray-500">{backup.date}</div>
                        <div className="text-xs text-gray-400 mt-1">Duration: {backup.duration}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${getTypeColor(backup.type)}`}>
                        {backup.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <StatusIcon className={`w-4 h-4 ${backup.status === 'completed' ? 'text-green-600' : backup.status === 'failed' ? 'text-red-600' : 'text-yellow-600'}`} />
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${getStatusColor(backup.status)}`}>
                          {backup.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {backup.size}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => console.log('Download backup:', backup.id)}
                          className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Download Backup"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleRestoreBackup(backup)}
                          disabled={backup.status !== 'completed' || restoreInProgress}
                          className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Restore from Backup"
                        >
                          <Upload className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => console.log('Delete backup:', backup.id)}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Backup"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {backups.length === 0 && (
          <div className="text-center py-12">
            <Database className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <div className="text-gray-500 mb-2">No backups found</div>
            <button
              onClick={handleCreateBackup}
              className="text-blue-600 hover:text-blue-700"
            >
              Create your first backup
            </button>
          </div>
        )}
      </div>

      {/* Restore Progress Modal */}
      {restoreInProgress && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="text-center">
              <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Restoring Backup</h3>
              <p className="text-gray-600 mb-4">
                Restoring from: {selectedBackup?.name}
              </p>
              <div className="bg-gray-200 rounded-full h-2 mb-4">
                <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '65%' }}></div>
              </div>
              <p className="text-sm text-gray-500">This may take several minutes. Please do not close this window.</p>
            </div>
          </div>
        </div>
      )}

      {/* Backup Schedule Info */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-800 mb-1">Automated Backup Schedule</h3>
            <div className="text-sm text-blue-700 space-y-1">
              <p>• <strong>Daily:</strong> Academic data backup at 2:00 AM</p>
              <p>• <strong>Weekly:</strong> Full system backup every Sunday at 1:00 AM</p>
              <p>• <strong>Monthly:</strong> Complete archive backup on the 1st of each month</p>
              <p>• <strong>Retention:</strong> Daily backups kept for 30 days, weekly for 3 months, monthly for 1 year</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackupRestore;