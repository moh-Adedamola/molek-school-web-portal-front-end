import { useState, useEffect } from 'react';
import DataTable from '../../components/shared/DataTable';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';

const ParentManagement = () => {
  const [parents, setParents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editParent, setEditParent] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    occupation: '',
    address: '',
    relationship: 'Father'
  });

  // Mock data
  useEffect(() => {
    const mockParents = [
      {
        id: 1,
        firstName: 'Mrs. Adunni',
        lastName: 'Johnson',
        email: 'adunni.johnson@email.com',
        phone: '08012345678',
        occupation: 'Civil Engineer',
        address: 'Victoria Island, Lagos',
        relationship: 'Mother',
        children: 'Adebayo Johnson (JSS 1A)'
      },
      {
        id: 2,
        firstName: 'Mr. Musa',
        lastName: 'Ibrahim',
        email: 'musa.ibrahim@email.com',
        phone: '08087654321',
        occupation: 'Business Owner',
        address: 'Garki, Abuja',
        relationship: 'Father',
        children: 'Fatima Ibrahim (SSS 2B)'
      }
    ];
    setParents(mockParents);
  }, []);

  const columns = [
    {
      key: 'firstName',
      label: 'Name',
      render: (value, row) => (
        <div>
          <div className="font-semibold">{row.firstName} {row.lastName}</div>
          <div className="text-xs text-neutral-600">{row.relationship}</div>
        </div>
      )
    },
    {
      key: 'children',
      label: 'Child(ren)',
      render: (value) => (
        <span className="text-sm text-primary-700">{value}</span>
      )
    },
    {
      key: 'email',
      label: 'Email'
    },
    {
      key: 'phone',
      label: 'Phone',
      render: (value) => (
        <span className="font-mono text-sm">{value}</span>
      )
    },
    {
      key: 'occupation',
      label: 'Occupation'
    }
  ];

  const handleAdd = () => {
    setEditParent(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      occupation: '',
      address: '',
      relationship: 'Father'
    });
    setShowModal(true);
  };

  const handleEdit = (parent) => {
    setEditParent(parent);
    setFormData(parent);
    setShowModal(true);
  };

  const handleDelete = (parent) => {
    if (confirm(`Delete ${parent.firstName} ${parent.lastName}?`)) {
      setParents(parents.filter(p => p.id !== parent.id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editParent) {
      setParents(parents.map(p => 
        p.id === editParent.id ? { ...formData, id: editParent.id } : p
      ));
    } else {
      setParents([...parents, { ...formData, id: Date.now() }]);
    }
    
    setShowModal(false);
  };

  return (
    <div className="p-6 bg-neutral-50 min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary-800">Parent Management</h1>
          <p className="text-neutral-600">Manage parent/guardian information</p>
        </div>
        <Button variant="primary" onClick={handleAdd}>
          Add New Parent
        </Button>
      </div>

      <DataTable
        data={parents}
        columns={columns}
        title="Parents & Guardians"
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchable={true}
        sortable={true}
      />

      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={editParent ? 'Edit Parent' : 'Add New Parent'}
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
                  Email
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
                  Phone
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
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Relationship
                </label>
                <select
                  required
                  value={formData.relationship}
                  onChange={(e) => setFormData({...formData, relationship: e.target.value})}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Guardian">Guardian</option>
                  <option value="Uncle">Uncle</option>
                  <option value="Aunt">Aunt</option>
                  <option value="Grandparent">Grandparent</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Occupation
                </label>
                <input
                  type="text"
                  required
                  value={formData.occupation}
                  onChange={(e) => setFormData({...formData, occupation: e.target.value})}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Address
              </label>
              <textarea
                required
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Complete address..."
              />
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
                {editParent ? 'Update' : 'Add'} Parent
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default ParentManagement;