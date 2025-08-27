import { useState, useEffect } from 'react';
import DataTable from '../../components/shared/DataTable';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';

const AdminManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editAdmin, setEditAdmin] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'admin',
    department: '',
    employeeId: ''
  });

  // Mock data
  useEffect(() => {
    const mockAdmins = [
      {
        id: 1,
        firstName: 'Dr. Olumide',
        lastName: 'Adebayo',
        email: 'principal@school.com',
        role: 'super_admin',
        department: 'Leadership',
        employeeId: 'ADM001',
        lastLogin: '2024-01-15'
      },
      {
        id: 2,
        firstName: 'Mrs. Grace',
        lastName: 'Okafor',
        email: 'vice.principal@school.com',
        role: 'admin',
        department: 'Academic Affairs',
        employeeId: 'ADM002',
        lastLogin: '2024-01-14'
      }
    ];
    setAdmins(mockAdmins);
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
      label: 'Name',
      render: (value, row) => (
        <div>
          <div className="font-semibold">{row.firstName} {row.lastName}</div>
          <div className="text-xs text-neutral-600">{row.department}</div>
        </div>
      )
    },
    {
      key: 'role',
      label: 'Role',
      render: (value) => (
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          value === 'super_admin' ? 'bg-accent-100 text-accent-800' : 'bg-primary-100 text-primary-800'
        }`}>
          {value === 'super_admin' ? 'Super Admin' : 'Admin'}
        </span>
      )
    },
    {
      key: 'email',
      label: 'Email'
    },
    {
      key: 'lastLogin',
      label: 'Last Login',
      render: (value) => (
        <span className="text-sm text-neutral-600">{value}</span>
      )
    }
  ];

  const handleAdd = () => {
    setEditAdmin(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      role: 'admin',
      department: '',
      employeeId: ''
    });
    setShowModal(true);
  };

  const handleEdit = (admin) => {
    setEditAdmin(admin);
    setFormData(admin);
    setShowModal(true);
  };

  const handleDelete = (admin) => {
    if (confirm(`Delete ${admin.firstName} ${admin.lastName}? This action cannot be undone.`)) {
      setAdmins(admins.filter(a => a.id !== admin.id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editAdmin) {
      setAdmins(admins.map(a => 
        a.id === editAdmin.id ? { ...formData, id: editAdmin.id } : a
      ));
    } else {
      setAdmins([...admins, { ...formData, id: Date.now() }]);
    }
    
    setShowModal(false);
  };

  return (
    <div className="p-6 bg-neutral-50 min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary-800">Admin Management</h1>
          <p className="text-neutral-600">Manage administrative users and permissions</p>
        </div>
        <Button variant="primary" onClick={handleAdd}>
          Add New Admin
        </Button>
      </div>

      <DataTable
        data={admins}
        columns={columns}
        title="Administrative Staff"
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchable={true}
        sortable={true}
      />

      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={editAdmin ? 'Edit Admin' : 'Add New Admin'}
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
                  placeholder="ADM001"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Role Level
                </label>
                <select
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="admin">Admin</option>
                  <option value="super_admin">Super Admin</option>
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

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Department
              </label>
              <select
                required
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select Department</option>
                <option value="Leadership">Leadership</option>
                <option value="Academic Affairs">Academic Affairs</option>
                <option value="Student Affairs">Student Affairs</option>
                <option value="Finance">Finance</option>
                <option value="IT Support">IT Support</option>
                <option value="Human Resources">Human Resources</option>
              </select>
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
                {editAdmin ? 'Update' : 'Add'} Admin
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default AdminManagement;