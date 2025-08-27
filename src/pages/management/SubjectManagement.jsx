import { useState, useEffect } from 'react';
import DataTable from '../../components/shared/DataTable';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Card from '../../components/ui/Card';

const SubjectManagement = () => {
  const [subjects, setSubjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editSubject, setEditSubject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    category: '',
    levels: [],
    description: '',
    isCore: true
  });

  // Mock data
  useEffect(() => {
    const mockSubjects = [
      {
        id: 1,
        name: 'Mathematics',
        code: 'MTH',
        category: 'Core Sciences',
        levels: ['JSS 1', 'JSS 2', 'JSS 3', 'SSS 1', 'SSS 2', 'SSS 3'],
        description: 'Basic and advanced mathematics',
        isCore: true,
        teachers: 3
      },
      {
        id: 2,
        name: 'English Language',
        code: 'ENG',
        category: 'Languages',
        levels: ['JSS 1', 'JSS 2', 'JSS 3', 'SSS 1', 'SSS 2', 'SSS 3'],
        description: 'English language and literature',
        isCore: true,
        teachers: 4
      },
      {
        id: 3,
        name: 'Agricultural Science',
        code: 'AGR',
        category: 'Applied Sciences',
        levels: ['JSS 2', 'JSS 3', 'SSS 1', 'SSS 2', 'SSS 3'],
        description: 'Practical and theoretical agriculture',
        isCore: false,
        teachers: 2
      }
    ];
    setSubjects(mockSubjects);
  }, []);

  const columns = [
    {
      key: 'code',
      label: 'Code',
      render: (value) => (
        <span className="font-mono text-primary-600 font-semibold">{value}</span>
      )
    },
    {
      key: 'name',
      label: 'Subject Name',
      render: (value, row) => (
        <div>
          <div className="font-semibold">{value}</div>
          <div className="text-xs text-neutral-600">{row.category}</div>
        </div>
      )
    },
    {
      key: 'isCore',
      label: 'Type',
      render: (value) => (
        <span className={`px-2 py-1 rounded text-xs font-medium ${
          value ? 'bg-accent-100 text-accent-800' : 'bg-secondary-100 text-secondary-800'
        }`}>
          {value ? 'Core' : 'Elective'}
        </span>
      )
    },
    {
      key: 'levels',
      label: 'Levels',
      render: (value) => (
        <div className="text-xs">
          {value.slice(0, 3).join(', ')}
          {value.length > 3 && ` +${value.length - 3} more`}
        </div>
      )
    },
    {
      key: 'teachers',
      label: 'Teachers',
      render: (value) => (
        <span className="text-center font-semibold">{value || 0}</span>
      )
    }
  ];

  const handleAdd = () => {
    setEditSubject(null);
    setFormData({
      name: '',
      code: '',
      category: '',
      levels: [],
      description: '',
      isCore: true
    });
    setShowModal(true);
  };

  const handleEdit = (subject) => {
    setEditSubject(subject);
    setFormData(subject);
    setShowModal(true);
  };

  const handleDelete = (subject) => {
    if (confirm(`Delete ${subject.name}? This will affect all related classes.`)) {
      setSubjects(subjects.filter(s => s.id !== subject.id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editSubject) {
      setSubjects(subjects.map(s => 
        s.id === editSubject.id ? { ...formData, id: editSubject.id, teachers: editSubject.teachers } : s
      ));
    } else {
      setSubjects([...subjects, { ...formData, id: Date.now(), teachers: 0 }]);
    }
    
    setShowModal(false);
  };

  const categories = [
    'Core Sciences',
    'Languages',
    'Social Sciences', 
    'Applied Sciences',
    'Arts & Humanities',
    'Technical/Vocational'
  ];

  const allLevels = ['JSS 1', 'JSS 2', 'JSS 3', 'SSS 1', 'SSS 2', 'SSS 3'];

  const handleLevelChange = (level, checked) => {
    if (checked) {
      setFormData({...formData, levels: [...formData.levels, level]});
    } else {
      setFormData({...formData, levels: formData.levels.filter(l => l !== level)});
    }
  };

  return (
    <div className="p-6 bg-neutral-50 min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary-800">Subject Management</h1>
          <p className="text-neutral-600">Manage curriculum subjects and requirements</p>
        </div>
        <Button variant="primary" onClick={handleAdd}>
          Add New Subject
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card variant="primary" className="text-center">
          <Card.Content>
            <div className="text-2xl font-bold text-primary-600 mb-1">
              {subjects.length}
            </div>
            <div className="text-sm text-neutral-600">Total Subjects</div>
          </Card.Content>
        </Card>
        
        <Card variant="accent" className="text-center">
          <Card.Content>
            <div className="text-2xl font-bold text-accent-600 mb-1">
              {subjects.filter(s => s.isCore).length}
            </div>
            <div className="text-sm text-neutral-600">Core Subjects</div>
          </Card.Content>
        </Card>
        
        <Card variant="secondary" className="text-center">
          <Card.Content>
            <div className="text-2xl font-bold text-secondary-600 mb-1">
              {subjects.filter(s => !s.isCore).length}
            </div>
            <div className="text-sm text-neutral-600">Electives</div>
          </Card.Content>
        </Card>
        
        <Card className="text-center">
          <Card.Content>
            <div className="text-2xl font-bold text-neutral-700 mb-1">
              {subjects.reduce((sum, s) => sum + (s.teachers || 0), 0)}
            </div>
            <div className="text-sm text-neutral-600">Total Teachers</div>
          </Card.Content>
        </Card>
      </div>

      <DataTable
        data={subjects}
        columns={columns}
        title="Nigerian Curriculum Subjects"
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchable={true}
        sortable={true}
      />

      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={editSubject ? 'Edit Subject' : 'Add New Subject'}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Subject Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Subject Code
                </label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="MTH, ENG, etc."
                  maxLength="3"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Category
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Subject Type
                </label>
                <select
                  required
                  value={formData.isCore}
                  onChange={(e) => setFormData({...formData, isCore: e.target.value === 'true'})}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="true">Core Subject</option>
                  <option value="false">Elective</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Applicable Levels
              </label>
              <div className="grid grid-cols-3 gap-2 p-3 border border-neutral-300 rounded-lg">
                {allLevels.map(level => (
                  <label key={level} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.levels.includes(level)}
                      onChange={(e) => handleLevelChange(level, e.target.checked)}
                      className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm">{level}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Description
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                placeholder="Subject description and objectives..."
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
                {editSubject ? 'Update' : 'Add'} Subject
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default SubjectManagement;