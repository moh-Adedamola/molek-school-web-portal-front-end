// File: src/pages/admin/ClassManagement.jsx
import React, { useState } from 'react';
import { Plus, Edit, Users, User, BookOpen } from 'lucide-react';

const ClassManagement = () => {
  const [selectedLevel, setSelectedLevel] = useState('JSS');

  const classes = {
    JSS: [
      { name: 'JSS 1A', students: 35, classTeacher: 'Mrs. Folake Adesola', capacity: 40 },
      { name: 'JSS 1B', students: 32, classTeacher: 'Mr. David Okon', capacity: 40 },
      { name: 'JSS 2A', students: 38, classTeacher: 'Miss Aisha Mohammed', capacity: 40 },
      { name: 'JSS 2B', students: 30, classTeacher: 'Mr. John Ekpo', capacity: 40 },
      { name: 'JSS 3A', students: 40, classTeacher: 'Mrs. Grace Nkem', capacity: 40 },
      { name: 'JSS 3B', students: 37, classTeacher: 'Mr. Peter Eze', capacity: 40 }
    ],
    SSS: [
      { name: 'SSS 1A', students: 28, classTeacher: 'Dr. Adamu Bello', capacity: 35 },
      { name: 'SSS 1B', students: 25, classTeacher: 'Mrs. Sarah Okoro', capacity: 35 },
      { name: 'SSS 2A', students: 30, classTeacher: 'Mr. Emeka Okonkwo', capacity: 35 },
      { name: 'SSS 2B', students: 26, classTeacher: 'Miss Joy Adamu', capacity: 35 },
      { name: 'SSS 3A', students: 22, classTeacher: 'Mr. Ahmed Musa', capacity: 35 },
      { name: 'SSS 3B', students: 24, classTeacher: 'Mrs. Comfort Agu', capacity: 35 }
    ]
  };

  const getCapacityStatus = (students, capacity) => {
    const percentage = (students / capacity) * 100;
    if (percentage >= 95) return 'text-red-600 bg-red-50';
    if (percentage >= 85) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  const totalStudents = Object.values(classes).flat().reduce((sum, cls) => sum + cls.students, 0);
  const totalCapacity = Object.values(classes).flat().reduce((sum, cls) => sum + cls.capacity, 0);

  return (
    <div className="p-4 lg:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-neutral-800">Class Management</h1>
          <p className="text-neutral-600 mt-1">Organize classes and teacher assignments</p>
        </div>
        <button className="btn-primary flex items-center gap-2 px-4 py-2">
          <Plus size={16} />
          Create Class
        </button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="card-base text-center">
          <div className="text-2xl font-bold text-primary-600">12</div>
          <div className="text-sm text-neutral-600">Total Classes</div>
        </div>
        <div className="card-success text-center">
          <div className="text-2xl font-bold text-secondary-700">{totalStudents}</div>
          <div className="text-sm text-neutral-600">Total Students</div>
        </div>
        <div className="card-warning text-center">
          <div className="text-2xl font-bold text-accent-700">{totalCapacity}</div>
          <div className="text-sm text-neutral-600">Total Capacity</div>
        </div>
        <div className="card-accent text-center">
          <div className="text-2xl font-bold text-primary-700">{Math.round((totalStudents/totalCapacity) * 100)}%</div>
          <div className="text-sm text-neutral-600">Utilization</div>
        </div>
      </div>

      {/* Level Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedLevel('JSS')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            selectedLevel === 'JSS' 
              ? 'btn-primary' 
              : 'btn-ghost'
          }`}
        >
          Junior Secondary (JSS)
        </button>
        <button
          onClick={() => setSelectedLevel('SSS')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            selectedLevel === 'SSS' 
              ? 'btn-primary' 
              : 'btn-ghost'
          }`}
        >
          Senior Secondary (SSS)
        </button>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes[selectedLevel].map((classInfo, index) => (
          <div key={index} className="card-base hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                  <BookOpen size={20} className="text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-neutral-800">{classInfo.name}</h3>
                  <p className="text-sm text-neutral-600">{selectedLevel === 'JSS' ? 'Junior Secondary' : 'Senior Secondary'}</p>
                </div>
              </div>
              <button className="text-neutral-400 hover:text-primary-600 p-1">
                <Edit size={16} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Class Teacher */}
              <div className="flex items-center gap-2">
                <User size={16} className="text-neutral-500" />
                <div>
                  <p className="text-sm font-medium text-neutral-700">Class Teacher</p>
                  <p className="text-sm text-neutral-600">{classInfo.classTeacher}</p>
                </div>
              </div>

              {/* Student Count */}
              <div className="flex items-center gap-2">
                <Users size={16} className="text-neutral-500" />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-neutral-700">Students</span>
                    <span className={`text-sm px-2 py-1 rounded ${getCapacityStatus(classInfo.students, classInfo.capacity)}`}>
                      {classInfo.students}/{classInfo.capacity}
                    </span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all ${
                        (classInfo.students / classInfo.capacity) >= 0.95 ? 'bg-red-500' :
                        (classInfo.students / classInfo.capacity) >= 0.85 ? 'bg-yellow-500' : 
                        'bg-green-500'
                      }`}
                      style={{ width: `${(classInfo.students / classInfo.capacity) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2 border-t border-neutral-200">
                <button className="flex-1 btn-outline text-sm py-2">
                  View Students
                </button>
                <button className="flex-1 btn-secondary text-sm py-2">
                  Manage
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassManagement;