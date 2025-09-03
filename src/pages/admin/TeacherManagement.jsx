// File: src/pages/admin/TeacherManagement.jsx
import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, BookOpen, Users, Award } from 'lucide-react';

const TeacherManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');

  const teachers = [
    {
      id: 1, name: 'Dr. Adamu Bello', email: 'adamu.bello@nss.edu.ng', 
      department: 'Mathematics', subjects: ['Mathematics', 'Further Mathematics'], 
      classes: ['SSS 2A', 'SSS 3B'], experience: '12 years', status: 'Active'
    },
    {
      id: 2, name: 'Mrs. Folake Adesola', email: 'folake.adesola@nss.edu.ng',
      department: 'English', subjects: ['English Language', 'Literature'], 
      classes: ['JSS 1A', 'JSS 2A'], experience: '8 years', status: 'Active'
    },
    {
      id: 3, name: 'Mr. Emeka Okonkwo', email: 'emeka.okonkwo@nss.edu.ng',
      department: 'Sciences', subjects: ['Physics', 'Chemistry'], 
      classes: ['SSS 1A', 'SSS 2B'], experience: '15 years', status: 'On Leave'
    },
    {
      id: 4, name: 'Miss Aisha Mohammed', email: 'aisha.mohammed@nss.edu.ng',
      department: 'Languages', subjects: ['Hausa', 'Arabic'], 
      classes: ['JSS 1B', 'JSS 3A'], experience: '5 years', status: 'Active'
    }
  ];

  const departments = ['Mathematics', 'English', 'Sciences', 'Languages', 'Social Studies', 'Arts'];

  const filteredTeachers = teachers.filter(teacher => 
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterDepartment === 'all' || teacher.department === filterDepartment)
  );

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    if (status === 'Active') return `${baseClasses} badge-success`;
    if (status === 'On Leave') return `${baseClasses} badge-warning`;
    return `${baseClasses} badge-info`;
  };

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-neutral-800">Teacher Management</h1>
          <p className="text-neutral-600 mt-1">Manage teaching staff and assignments</p>
        </div>
        <button className="btn-primary flex items-center gap-2 px-4 py-2">
          <Plus size={16} />
          Add Teacher
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="card-base text-center">
          <div className="text-2xl font-bold text-primary-600">24</div>
          <div className="text-sm text-neutral-600">Total Teachers</div>
        </div>
        <div className="card-success text-center">
          <div className="text-2xl font-bold text-secondary-700">22</div>
          <div className="text-sm text-neutral-600">Active Teachers</div>
        </div>
        <div className="card-warning text-center">
          <div className="text-2xl font-bold text-accent-700">6</div>
          <div className="text-sm text-neutral-600">Departments</div>
        </div>
        <div className="card-accent text-center">
          <div className="text-2xl font-bold text-primary-700">15</div>
          <div className="text-sm text-neutral-600">Subjects Taught</div>
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
                placeholder="Search teachers by name..."
                className="input-base pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              className="input-base"
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Teachers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTeachers.map((teacher) => (
          <div key={teacher.id} className="card-base hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <Award size={20} className="text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-neutral-800">{teacher.name}</h3>
                  <p className="text-sm text-neutral-600">{teacher.email}</p>
                </div>
              </div>
              <span className={getStatusBadge(teacher.status)}>{teacher.status}</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-neutral-500" />
                <span className="text-sm text-neutral-600">Department: {teacher.department}</span>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Users size={16} className="text-neutral-500" />
                  <span className="text-sm font-medium text-neutral-700">Subjects:</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {teacher.subjects.map((subject, idx) => (
                    <span key={idx} className="bg-secondary-50 text-secondary-700 px-2 py-1 rounded text-xs">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Users size={16} className="text-neutral-500" />
                  <span className="text-sm font-medium text-neutral-700">Classes:</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {teacher.classes.map((cls, idx) => (
                    <span key={idx} className="bg-accent-50 text-accent-700 px-2 py-1 rounded text-xs">
                      {cls}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
                <span className="text-sm text-neutral-600">Experience: {teacher.experience}</span>
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

      {filteredTeachers.length === 0 && (
        <div className="card-base text-center py-12">
          <Award size={48} className="mx-auto text-neutral-400 mb-4" />
          <h3 className="text-lg font-medium text-neutral-800 mb-2">No teachers found</h3>
          <p className="text-neutral-600">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default TeacherManagement;