// File: src/pages/admin/SubjectManagement.jsx
import React, { useState } from 'react';
import { Plus, Edit, Trash2, BookOpen, User, Users, Clock } from 'lucide-react';

const SubjectManagement = () => {
  const [filterLevel, setFilterLevel] = useState('all');

  const subjects = [
    {
      id: 1, name: 'Mathematics', level: 'JSS & SSS', code: 'MTH',
      teachers: ['Dr. Adamu Bello', 'Mrs. Grace Nkem'], 
      classes: 8, periods: 6, status: 'Active'
    },
    {
      id: 2, name: 'English Language', level: 'JSS & SSS', code: 'ENG',
      teachers: ['Mrs. Folake Adesola', 'Mr. David Okon'], 
      classes: 12, periods: 5, status: 'Active'
    },
    {
      id: 3, name: 'Physics', level: 'SSS Only', code: 'PHY',
      teachers: ['Mr. Emeka Okonkwo'], 
      classes: 6, periods: 4, status: 'Active'
    },
    {
      id: 4, name: 'Chemistry', level: 'SSS Only', code: 'CHE',
      teachers: ['Mr. Emeka Okonkwo', 'Dr. Sarah Okoro'], 
      classes: 6, periods: 4, status: 'Active'
    },
    {
      id: 5, name: 'Biology', level: 'JSS & SSS', code: 'BIO',
      teachers: ['Miss Joy Adamu'], 
      classes: 10, periods: 4, status: 'Active'
    },
    {
      id: 6, name: 'Hausa Language', level: 'JSS & SSS', code: 'HAU',
      teachers: ['Miss Aisha Mohammed'], 
      classes: 8, periods: 3, status: 'Active'
    }
  ];

  const filteredSubjects = subjects.filter(subject => 
    filterLevel === 'all' || 
    (filterLevel === 'JSS' && subject.level.includes('JSS')) ||
    (filterLevel === 'SSS' && subject.level.includes('SSS'))
  );

  const getLevelBadge = (level) => {
    if (level.includes('JSS & SSS')) return 'bg-primary-50 text-primary-700';
    if (level === 'JSS Only') return 'bg-secondary-50 text-secondary-700';
    return 'bg-accent-50 text-accent-700';
  };

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-neutral-800">Subject Management</h1>
          <p className="text-neutral-600 mt-1">Manage subjects and teacher assignments</p>
        </div>
        <button className="btn-primary flex items-center gap-2 px-4 py-2">
          <Plus size={16} />
          Add Subject
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="card-base text-center">
          <div className="text-2xl font-bold text-primary-600">{subjects.length}</div>
          <div className="text-sm text-neutral-600">Total Subjects</div>
        </div>
        <div className="card-success text-center">
          <div className="text-2xl font-bold text-secondary-700">15</div>
          <div className="text-sm text-neutral-600">Assigned Teachers</div>
        </div>
        <div className="card-warning text-center">
          <div className="text-2xl font-bold text-accent-700">50</div>
          <div className="text-sm text-neutral-600">Total Classes</div>
        </div>
        <div className="card-accent text-center">
          <div className="text-2xl font-bold text-primary-700">26</div>
          <div className="text-sm text-neutral-600">Weekly Periods</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilterLevel('all')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filterLevel === 'all' ? 'btn-primary' : 'btn-ghost'
          }`}
        >
          All Subjects
        </button>
        <button
          onClick={() => setFilterLevel('JSS')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filterLevel === 'JSS' ? 'btn-primary' : 'btn-ghost'
          }`}
        >
          JSS Subjects
        </button>
        <button
          onClick={() => setFilterLevel('SSS')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            filterLevel === 'SSS' ? 'btn-primary' : 'btn-ghost'
          }`}
        >
          SSS Subjects
        </button>
      </div>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredSubjects.map((subject) => (
          <div key={subject.id} className="card-base hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <BookOpen size={20} className="text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-neutral-800">{subject.name}</h3>
                  <p className="text-sm text-neutral-600">Code: {subject.code}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelBadge(subject.level)}`}>
                {subject.level}
              </span>
            </div>

            <div className="space-y-4">
              {/* Teachers */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <User size={16} className="text-neutral-500" />
                  <span className="text-sm font-medium text-neutral-700">
                    Teachers ({subject.teachers.length})
                  </span>
                </div>
                <div className="space-y-1">
                  {subject.teachers.map((teacher, idx) => (
                    <div key={idx} className="text-sm text-neutral-600 bg-neutral-50 p-2 rounded">
                      {teacher}
                    </div>
                  ))}
                </div>
              </div>

              {/* Subject Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-neutral-500" />
                  <div>
                    <p className="text-sm font-medium text-neutral-700">{subject.classes}</p>
                    <p className="text-xs text-neutral-600">Classes</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-neutral-500" />
                  <div>
                    <p className="text-sm font-medium text-neutral-700">{subject.periods}</p>
                    <p className="text-xs text-neutral-600">Periods/Week</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t border-neutral-200">
                <button className="flex-1 btn-outline text-sm py-2 flex items-center justify-center gap-1">
                  <Edit size={14} />
                  Edit
                </button>
                <button className="flex-1 btn-secondary text-sm py-2">
                  Assign Teachers
                </button>
                <button className="text-red-600 hover:text-red-700 p-2">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSubjects.length === 0 && (
        <div className="card-base text-center py-12">
          <BookOpen size={48} className="mx-auto text-neutral-400 mb-4" />
          <h3 className="text-lg font-medium text-neutral-800 mb-2">No subjects found</h3>
          <p className="text-neutral-600">Try adjusting your filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default SubjectManagement;