import { useState, useEffect } from 'react';
import DataTable from '../../components/shared/DataTable';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Modal from '../../components/ui/Modal';

const TeacherManagement = () => {
  const [teachers, setTeachers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editTeacher, setEditTeacher] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    employeeId: '',
    qualification: ''
  });

  // Mock data
  useEffect(() => {
    const mockTeachers = [
      {
        id: 1,
        firstName: 'Dr. Aminat',
        lastName: 'Oladele',
        email: 'aminat.oladele@school.com',
        phone: '08012345678',
        subject: 'Mathematics',
        employeeId: 'TCH001',
        qualification: 'PhD Mathematics'
      },
      {
        id: 2,
        firstName: 'Mr. Chukwuma',
        lastName: 'Okoro',
        email: 'chukwuma.okoro@school.com',
        phone: '08087654321',
        subject: 'English Language',
        employeeId: 'TCH002',
        qualification: 'M.Ed English'
      }
    ];
    setTeachers(mockTeachers);
  }, []);

  const columns = [
    {
      key: 'employeeId',
      label: 'Employee ID',
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
      key: 'subject',
      label: 'Subject',
      render: (value) => (
        <span className="px-2 py-1 bg-secondary-100 text-secondary-800 rounded text-xs font-medium">
          {value}
        </span>
      )
    },
    {
      key: 'qualification',
      label: 'Qualification'
    },
    {
      key: 'email',
      label: 'Email'
    }
  ];

  const handleAdd = () => {
    setEditTeacher(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      employeeId: '',
      qualification: ''
    });
    setShowModal(true);
  };

  const handleEdit = (teacher) => {
    setEditTeacher(teacher);
    setFormData(teacher);
    setShowModal(true);
  };

  const handleDelete = (teacher) => {
    if (confirm(`Delete ${teacher.firstName} ${teacher.lastName}?`)) {
      setTeachers(teachers.filter(t => t.id !== teacher.id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editTeacher) {
      setTeachers(teachers.map(t => 
        t.id === editTeacher.id ? { ...formData, id: editTeacher.id } : t
      ));
    } else {
      setTeachers([...teachers, { ...formData, id: Date.now() }]);
    }
    
    setShowModal(false);
  };

  const subjects = [
    'Mathematics', 'English Language', 'Physics', 'Chemistry', 'Biology',
    'Geography', 'History', 'Economics', 'Government', 'Literature',
    'Further Mathematics', 'Agricultural Science', 'Computer Studies'
  ];

  return (
    <div className="p-6 bg-neutral-50 min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary-800">Teacher Management</h1>
          <p className="text-neutral-600">Manage teaching staff and assignments</p>
        </div>
        <Button variant="primary" onClick={handleAdd}>
          Add New Teacher
        </Button>
      </div>

      <DataTable
        data={teachers}
        columns={columns}
        title="Teaching Staff"
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchable={true}
        sortable={true}
      />

      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={editTeacher ? 'Edit Teacher' : 'Add New Teacher'}
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
                  Employee ID
                </label>
                <input
                  type="text"
                  required
                  value={formData.employeeId}
                  onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="TCH001"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Primary Subject
                </label>
                <select
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select Subject</option>
                  {subjects.map(subject => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="08012345678"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Qualification
                </label>
                <input
                  type="text"
                  required
                  value={formData.qualification}
                  onChange={(e) => setFormData({...formData, qualification: e.target.value})}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="B.Ed, M.Ed, PhD etc."
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
                {editTeacher ? 'Update' : 'Add'} Teacher
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default TeacherManagement;