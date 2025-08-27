import { useState, useEffect } from 'react';
import DataTable from '../../components/shared/DataTable';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Card from '../../components/ui/Card';

const ClassManagement = () => {
  const [classes, setClasses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editClass, setEditClass] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    level: 'JSS',
    classTeacher: '',
    capacity: '',
    room: ''
  });

  // Mock data
  useEffect(() => {
    const mockClasses = [
      {
        id: 1,
        name: 'JSS 1A',
        level: 'JSS 1',
        classTeacher: 'Mrs. Adebayo',
        capacity: 35,
        currentStudents: 32,
        room: 'Block A, Room 101'
      },
      {
        id: 2,
        name: 'SSS 2B',
        level: 'SSS 2',
        classTeacher: 'Mr. Okoro',
        capacity: 40,
        currentStudents: 38,
        room: 'Block B, Room 205'
      }
    ];
    setClasses(mockClasses);
  }, []);

  const columns = [
    {
      key: 'name',
      label: 'Class Name',
      render: (value, row) => (
        <div>
          <div className="font-semibold text-primary-800">{value}</div>
          <div className="text-xs text-neutral-600">{row.room}</div>
        </div>
      )
    },
    {
      key: 'level',
      label: 'Level',
      render: (value) => (
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          value.startsWith('JSS') ? 'bg-secondary-100 text-secondary-800' : 'bg-primary-100 text-primary-800'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'classTeacher',
      label: 'Class Teacher'
    },
    {
      key: 'currentStudents',
      label: 'Students',
      render: (value, row) => (
        <div className="text-center">
          <div className="font-semibold">{value}/{row.capacity}</div>
          <div className={`text-xs ${
            value >= row.capacity ? 'text-accent-600' : 
            value >= row.capacity * 0.8 ? 'text-accent-500' : 'text-secondary-600'
          }`}>
            {((value / row.capacity) * 100).toFixed(0)}% full
          </div>
        </div>
      )
    }
  ];

  const handleAdd = () => {
    setEditClass(null);
    setFormData({
      name: '',
      level: 'JSS',
      classTeacher: '',
      capacity: '',
      room: ''
    });
    setShowModal(true);
  };

  const handleEdit = (classItem) => {
    setEditClass(classItem);
    setFormData(classItem);
    setShowModal(true);
  };

  const handleDelete = (classItem) => {
    if (confirm(`Delete class ${classItem.name}? This will affect ${classItem.currentStudents} students.`)) {
      setClasses(classes.filter(c => c.id !== classItem.id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editClass) {
      setClasses(classes.map(c => 
        c.id === editClass.id ? { ...formData, id: editClass.id, currentStudents: editClass.currentStudents } : c
      ));
    } else {
      setClasses([...classes, { ...formData, id: Date.now(), currentStudents: 0 }]);
    }
    
    setShowModal(false);
  };

  const levels = [
    'JSS 1', 'JSS 2', 'JSS 3',
    'SSS 1', 'SSS 2', 'SSS 3'
  ];

  return (
    <div className="p-6 bg-neutral-50 min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary-800">Class Management</h1>
          <p className="text-neutral-600">Manage classes, capacity, and assignments</p>
        </div>
        <Button variant="primary" onClick={handleAdd}>
          Create New Class
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card variant="primary" className="text-center">
          <Card.Content>
            <div className="text-2xl font-bold text-primary-600 mb-1">
              {classes.length}
            </div>
            <div className="text-sm text-neutral-600">Total Classes</div>
          </Card.Content>
        </Card>
        
        <Card variant="secondary" className="text-center">
          <Card.Content>
            <div className="text-2xl font-bold text-secondary-600 mb-1">
              {classes.reduce((sum, c) => sum + c.currentStudents, 0)}
            </div>
            <div className="text-sm text-neutral-600">Total Students</div>
          </Card.Content>
        </Card>
        
        <Card variant="accent" className="text-center">
          <Card.Content>
            <div className="text-2xl font-bold text-accent-600 mb-1">
              {((classes.reduce((sum, c) => sum + c.currentStudents, 0) / 
                classes.reduce((sum, c) => sum + c.capacity, 0)) * 100).toFixed(0)}%
            </div>
            <div className="text-sm text-neutral-600">Capacity Used</div>
          </Card.Content>
        </Card>
      </div>

      <DataTable
        data={classes}
        columns={columns}
        title="Class Overview"
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchable={true}
        sortable={true}
      />

      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={editClass ? 'Edit Class' : 'Create New Class'}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Class Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="JSS 1A, SSS 3B etc."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Level
                </label>
                <select
                  required
                  value={formData.level}
                  onChange={(e) => setFormData({...formData, level: e.target.value})}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  {levels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Class Teacher
              </label>
              <input
                type="text"
                required
                value={formData.classTeacher}
                onChange={(e) => setFormData({...formData, classTeacher: e.target.value})}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Teacher's full name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Capacity
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  max="50"
                  value={formData.capacity}
                  onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Room Location
                </label>
                <input
                  type="text"
                  required
                  value={formData.room}
                  onChange={(e) => setFormData({...formData, room: e.target.value})}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Block A, Room 101"
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
                {editClass ? 'Update' : 'Create'} Class
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default ClassManagement;