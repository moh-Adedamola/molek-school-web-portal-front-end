// File: src/pages/admin/ParentManagement.jsx
import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, User, Users, Phone, Mail } from 'lucide-react';

const ParentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const parents = [
    {
      id: 1, name: 'Mrs. Adebayo Olumide', email: 'adebayo@email.com', 
      phone: '08123456789', occupation: 'Engineer', 
      children: [{ name: 'Adebayo Olumide', class: 'JSS 1A' }], 
      status: 'Active', registeredDate: '2024-01-15'
    },
    {
      id: 2, name: 'Mr. Okafor Chinedu', email: 'okafor@email.com',
      phone: '08123456790', occupation: 'Doctor', 
      children: [
        { name: 'Chioma Okafor', class: 'JSS 2B' },
        { name: 'Kelechi Okafor', class: 'SSS 1A' }
      ], 
      status: 'Active', registeredDate: '2024-02-10'
    },
    {
      id: 3, name: 'Mrs. Musa Fatima', email: 'musa@email.com',
      phone: '08123456791', occupation: 'Teacher', 
      children: [{ name: 'Ibrahim Musa', class: 'SSS 1A' }], 
      status: 'Inactive', registeredDate: '2023-11-20'
    },
    {
      id: 4, name: 'Dr. Akpan Grace', email: 'akpan@email.com',
      phone: '08123456792', occupation: 'Lawyer', 
      children: [{ name: 'Blessing Akpan', class: 'SSS 3B' }], 
      status: 'Active', registeredDate: '2024-03-05'
    }
  ];

  const filteredParents = parents.filter(parent => 
    parent.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterStatus === 'all' || parent.status === filterStatus)
  );

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    if (status === 'Active') return `${baseClasses} badge-success`;
    if (status === 'Inactive') return `${baseClasses} badge-error`;
    return `${baseClasses} badge-info`;
  };

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-neutral-800">Parent Management</h1>
          <p className="text-neutral-600 mt-1">Manage parent accounts and relationships</p>
        </div>
        <button className="btn-primary flex items-center gap-2 px-4 py-2">
          <Plus size={16} />
          Add Parent
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="card-base text-center">
          <div className="text-2xl font-bold text-primary-600">156</div>
          <div className="text-sm text-neutral-600">Total Parents</div>
        </div>
        <div className="card-success text-center">
          <div className="text-2xl font-bold text-secondary-700">142</div>
          <div className="text-sm text-neutral-600">Active Parents</div>
        </div>
        <div className="card-warning text-center">
          <div className="text-2xl font-bold text-accent-700">18</div>
          <div className="text-sm text-neutral-600">New This Term</div>
        </div>
        <div className="card-accent text-center">
          <div className="text-2xl font-bold text-primary-700">89</div>
          <div className="text-sm text-neutral-600">Multi-Child Parents</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card-base mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
              <input
                type="text"
                placeholder="Search parents by name..."
                className="input-base pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              className="input-base"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Parents Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredParents.map((parent) => (
          <div key={parent.id} className="card-base hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <User size={20} className="text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-800">{parent.name}</h3>
                  <p className="text-sm text-neutral-600">{parent.occupation}</p>
                </div>
              </div>
              <span className={getStatusBadge(parent.status)}>{parent.status}</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-neutral-500" />
                <span className="text-sm text-neutral-600">{parent.email}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone size={16} className="text-neutral-500" />
                <span className="text-sm text-neutral-600">{parent.phone}</span>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Users size={16} className="text-neutral-500" />
                  <span className="text-sm font-medium text-neutral-700">
                    Children ({parent.children.length}):
                  </span>
                </div>
                <div className="space-y-1">
                  {parent.children.map((child, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-neutral-50 p-2 rounded text-sm">
                      <span className="font-medium text-neutral-700">{child.name}</span>
                      <span className="text-neutral-600">{child.class}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
                <span className="text-sm text-neutral-600">Joined: {parent.registeredDate}</span>
                <div className="flex gap-2">
                  <button className="text-primary-600 hover:text-primary-700 p-2">
                    <Edit size={16} />
                  </button>
                  <button className="text-red-600 hover:text-red-700 p-2">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredParents.length === 0 && (
        <div className="card-base text-center py-12">
          <Users size={48} className="mx-auto text-neutral-400 mb-4" />
          <h3 className="text-lg font-medium text-neutral-800 mb-2">No parents found</h3>
          <p className="text-neutral-600">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default ParentManagement;