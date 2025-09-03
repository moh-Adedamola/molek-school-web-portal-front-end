// File: src/pages/admin/StudentManagement.jsx
import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Filter, Download, Users } from 'lucide-react';

const StudentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);

  const students = [
    {
      id: 1, name: 'Adebayo Olumide', class: 'JSS 1A', admissionNo: 'NSS001', 
      parent: 'Mrs. Adebayo', phone: '08123456789', status: 'Active'
    },
    {
      id: 2, name: 'Chioma Okafor', class: 'JSS 2B', admissionNo: 'NSS002', 
      parent: 'Mr. Okafor', phone: '08123456790', status: 'Active'
    },
    {
      id: 3, name: 'Ibrahim Musa', class: 'SSS 1A', admissionNo: 'NSS003', 
      parent: 'Mrs. Musa', phone: '08123456791', status: 'Suspended'
    },
    {
      id: 4, name: 'Blessing Akpan', class: 'SSS 3B', admissionNo: 'NSS004', 
      parent: 'Dr. Akpan', phone: '08123456792', status: 'Active'
    }
  ];

  const classes = ['JSS 1A', 'JSS 1B', 'JSS 2A', 'JSS 2B', 'JSS 3A', 'JSS 3B', 
                  'SSS 1A', 'SSS 1B', 'SSS 2A', 'SSS 2B', 'SSS 3A', 'SSS 3B'];

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterClass === 'all' || student.class === filterClass)
  );

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    if (status === 'Active') return `${baseClasses} badge-success`;
    if (status === 'Suspended') return `${baseClasses} badge-error`;
    return `${baseClasses} badge-info`;
  };

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-neutral-800">Student Management</h1>
          <p className="text-neutral-600 mt-1">Manage student records and information</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="btn-primary flex items-center gap-2 px-4 py-2"
        >
          <Plus size={16} />
          Add Student
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="card-base text-center">
          <div className="text-2xl font-bold text-primary-600">320</div>
          <div className="text-sm text-neutral-600">Total Students</div>
        </div>
        <div className="card-success text-center">
          <div className="text-2xl font-bold text-secondary-700">298</div>
          <div className="text-sm text-neutral-600">Active Students</div>
        </div>
        <div className="card-warning text-center">
          <div className="text-2xl font-bold text-accent-700">22</div>
          <div className="text-sm text-neutral-600">New This Term</div>
        </div>
        <div className="card-accent text-center">
          <div className="text-2xl font-bold text-primary-700">12</div>
          <div className="text-sm text-neutral-600">Classes</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card-base mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
              <input
                type="text"
                placeholder="Search students by name..."
                className="input-base pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <select
              className="input-base"
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
            >
              <option value="all">All Classes</option>
              {classes.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
            <button className="btn-outline flex items-center gap-2 px-3 py-2">
              <Filter size={16} />
              Filters
            </button>
            <button className="btn-secondary flex items-center gap-2 px-3 py-2">
              <Download size={16} />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="card-base overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="table-header">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">Admission No.</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Student Name</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Class</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Parent/Guardian</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Contact</th>
                <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr key={student.id} className={index % 2 === 0 ? 'table-row-even' : 'table-row-odd'}>
                  <td className="px-4 py-3 text-sm font-medium text-neutral-900">{student.admissionNo}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                        <Users size={16} className="text-primary-600" />
                      </div>
                      <span className="font-medium text-neutral-900">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-neutral-600">{student.class}</td>
                  <td className="px-4 py-3 text-sm text-neutral-600">{student.parent}</td>
                  <td className="px-4 py-3 text-sm text-neutral-600">{student.phone}</td>
                  <td className="px-4 py-3">
                    <span className={getStatusBadge(student.status)}>{student.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button className="text-primary-600 hover:text-primary-700 p-1">
                        <Edit size={16} />
                      </button>
                      <button className="text-red-600 hover:text-red-700 p-1">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-8">
            <Users size={48} className="mx-auto text-neutral-400 mb-2" />
            <p className="text-neutral-500">No students found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
        <p className="text-sm text-neutral-600">Showing 4 of 320 students</p>
        <div className="flex gap-2">
          <button className="btn-outline px-3 py-2">Previous</button>
          <button className="btn-primary px-3 py-2">1</button>
          <button className="btn-outline px-3 py-2">2</button>
          <button className="btn-outline px-3 py-2">3</button>
          <button className="btn-outline px-3 py-2">Next</button>
        </div>
      </div>
    </div>
  );
};

export default StudentManagement;