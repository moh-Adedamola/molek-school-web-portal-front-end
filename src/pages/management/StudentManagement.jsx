import { useState, useEffect } from 'react';
import DataTable from '../../components/shared/DataTable';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Modal from '../../components/ui/Modal';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    class: '',
    admissionNumber: '',
    dateOfBirth: '',
    guardianName: '',
    guardianPhone: ''
  });

  // Mock data - replace with API call
  useEffect(() => {
    const mockStudents = [
      {
        id: 1,
        firstName: 'Adebayo',
        lastName: 'Johnson',
        class: 'JSS 1A',
        admissionNumber: 'MOL/2024/001',
        dateOfBirth: '2010-05-15',
        guardianName: 'Mrs. Johnson',
        guardianPhone: '08012345678'
      },
      {
        id: 2,
        firstName: 'Fatima',
        lastName: 'Ibrahim',
        class: 'SSS 2B',
        admissionNumber: 'MOL/2023/045',
        dateOfBirth: '2008-08-22',
        guardianName: 'Mr. Ibrahim',
        guardianPhone: '08087654321'
      }
    ];
    setStudents(mockStudents);
  }, []);

  const columns = [
    {
      key: 'admissionNumber',
      label: 'Admission No.',
      render: (value) => (
        <span className="font-mono text-primary-600">{value}</span>
      )
    },
    {
      key: 'firstName',
      label: 'First Name'
    },
    {
      key: 'lastName',
      label: 'Last Name'
    },
    {
      key: 'class',
      label: 'Class',
      render: (value) => (
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          value.startsWith('JSS') ? 'bg-secondary-100 text-secondary-800' : 'bg-primary-100 text-primary-800'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'guardianName',
      label: 'Guardian'
    },
    {
      key: 'guardianPhone',
      label: 'Contact',
      render: (value) => (
        <span className="font-mono text-sm">{value}</span>
      )
    }
  ];

  const handleAdd = () => {
    setEditStudent(null);
    setFormData({
      firstName: '',
      lastName: '',
      class: '',
      admissionNumber: '',
      dateOfBirth: '',
      guardianName: '',
      guardianPhone: ''
    });
    setShowModal(true);
  };

  const handleEdit = (student) => {
    setEditStudent(student);
    setFormData(student);
    setShowModal(true);
  };

  const handleDelete = (student) => {
    if (confirm(`Delete ${student.firstName} ${student.lastName}?`)) {
      setStudents(students.filter(s => s.id !== student.id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editStudent) {
      setStudents(students.map(s => 
        s.id === editStudent.id ? { ...formData, id: editStudent.id } : s
      ));
    } else {
      setStudents([...students, { ...formData, id: Date.now() }]);
    }
    
    setShowModal(false);
  };

  const classes = [
    'JSS 1A', 'JSS 1B', 'JSS 2A', 'JSS 2B', 'JSS 3A', 'JSS 3B',
    'SSS 1A', 'SSS 1B', 'SSS 2A', 'SSS 2B', 'SSS 3A', 'SSS 3B'
  ];

  return (
    <div className="p-6 bg-neutral-50 min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary-800">Student Management</h1>
          <p className="text-neutral-600">Manage student records and information</p>
        </div>
        <Button variant="primary" onClick={handleAdd}>
          Add New Student
        </Button>
      </div>

      <DataTable
        data={students}
        columns={columns}
        title="Student Records"
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchable={true}
        sortable={true}
      />

      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={editStudent ? 'Edit Student' : 'Add New Student'}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Class
                </label>
                <select
                  required
                  value={formData.class}
                  onChange={(e) => setFormData({...formData, class: e.target.value})}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select Class</option>
                  {classes.map(cls => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Admission Number
                </label>
                <input
                  type="text"
                  required
                  value={formData.admissionNumber}
                  onChange={(e) => setFormData({...formData, admissionNumber: e.target.value})}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="MOL/2024/001"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                required
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Guardian Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.guardianName}
                  onChange={(e) => setFormData({...formData, guardianName: e.target.value})}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Guardian Phone
                </label>
                <input
                  type="tel"
                  required
                  value={formData.guardianPhone}
                  onChange={(e) => setFormData({...formData, guardianPhone: e.target.value})}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="08012345678"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                {editStudent ? 'Update' : 'Add'} Student
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default StudentManagement;