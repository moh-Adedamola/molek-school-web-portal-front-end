import { useState, useEffect } from 'react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const WebsiteCMS = () => {
  const [activeTab, setActiveTab] = useState('hero');
  const [contentData, setContentData] = useState({
    hero: {
      title: 'Welcome to Molek School',
      subtitle: 'Excellence in Education, Character Building, and Academic Achievement',
      buttons: ['Explore Programs', 'Apply Now', 'Virtual Tour']
    },
    about: {
      name: 'Molek School',
      tagline: 'Nurturing Tomorrow\'s Leaders',
      location: 'Lagos, Nigeria',
      established: '1985'
    },
    news: [
      {
        id: 1,
        title: 'New Science Laboratory Opens',
        excerpt: 'State-of-the-art equipment for better learning',
        date: '2024-01-15',
        status: 'published'
      }
    ],
    events: [
      {
        id: 1,
        title: 'Inter-House Sports Competition',
        date: '2024-02-20',
        description: 'Annual sports event for all students'
      }
    ]
  });

  const [formData, setFormData] = useState({});
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    setFormData(contentData[activeTab] || {});
  }, [activeTab, contentData]);

  const handleSave = (e) => {
    e.preventDefault();
    setContentData({
      ...contentData,
      [activeTab]: formData
    });
    alert('Content saved successfully!');
  };

  const tabs = [
    { key: 'hero', label: 'Hero Section', icon: '🏠' },
    { key: 'about', label: 'About Info', icon: 'ℹ️' },
    { key: 'news', label: 'News Articles', icon: '📰' },
    { key: 'events', label: 'Events', icon: '📅' }
  ];

  const renderHeroEditor = () => (
    <form onSubmit={handleSave} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">
          Main Title
        </label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">
          Subtitle
        </label>
        <textarea
          value={formData.subtitle || ''}
          onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
          rows={3}
          className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">
          Action Buttons (one per line)
        </label>
        <textarea
          value={formData.buttons?.join('\n') || ''}
          onChange={(e) => setFormData({...formData, buttons: e.target.value.split('\n').filter(b => b.trim())})}
          rows={3}
          className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          placeholder="Explore Programs&#10;Apply Now&#10;Virtual Tour"
        />
      </div>
      
      <Button type="submit" variant="primary">Save Hero Content</Button>
    </form>
  );

  const renderAboutEditor = () => (
    <form onSubmit={handleSave} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            School Name
          </label>
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Location
          </label>
          <input
            type="text"
            value={formData.location || ''}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">
          School Tagline
        </label>
        <input
          type="text"
          value={formData.tagline || ''}
          onChange={(e) => setFormData({...formData, tagline: e.target.value})}
          className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">
          Established Year
        </label>
        <input
          type="number"
          value={formData.established || ''}
          onChange={(e) => setFormData({...formData, established: e.target.value})}
          className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
        />
      </div>
      
      <Button type="submit" variant="primary">Save About Info</Button>
    </form>
  );

  const renderNewsEditor = () => {
    const [newArticle, setNewArticle] = useState({
      title: '',
      excerpt: '',
      content: '',
      date: new Date().toISOString().split('T')[0]
    });

    const handleAddArticle = () => {
      const article = {
        ...newArticle,
        id: Date.now(),
        status: 'published'
      };
      setContentData({
        ...contentData,
        news: [...(contentData.news || []), article]
      });
      setNewArticle({ title: '', excerpt: '', content: '', date: new Date().toISOString().split('T')[0] });
    };

    const handleDeleteArticle = (id) => {
      setContentData({
        ...contentData,
        news: contentData.news.filter(article => article.id !== id)
      });
    };

    return (
      <div className="space-y-6">
        {/* Add New Article */}
        <Card variant="accent">
          <Card.Header>
            <Card.Title>Add New Article</Card.Title>
          </Card.Header>
          <Card.Content className="space-y-4">
            <input
              type="text"
              placeholder="Article title..."
              value={newArticle.title}
              onChange={(e) => setNewArticle({...newArticle, title: e.target.value})}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
            <input
              type="text"
              placeholder="Brief excerpt..."
              value={newArticle.excerpt}
              onChange={(e) => setNewArticle({...newArticle, excerpt: e.target.value})}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
            <input
              type="date"
              value={newArticle.date}
              onChange={(e) => setNewArticle({...newArticle, date: e.target.value})}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
            <Button 
              onClick={handleAddArticle} 
              variant="primary"
              disabled={!newArticle.title.trim()}
            >
              Add Article
            </Button>
          </Card.Content>
        </Card>

        {/* Existing Articles */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-primary-800">Published Articles</h3>
          {contentData.news?.map(article => (
            <Card key={article.id}>
              <Card.Content>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-primary-800">{article.title}</h4>
                    <p className="text-sm text-neutral-600 mt-1">{article.excerpt}</p>
                    <p className="text-xs text-neutral-500 mt-2">{article.date}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDeleteArticle(article.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Content>
            </Card>
          )) || <p className="text-neutral-500">No articles yet.</p>}
        </div>
      </div>
    );
  };

  const renderEventsEditor = () => {
    const [newEvent, setNewEvent] = useState({
      title: '',
      date: '',
      description: ''
    });

    const handleAddEvent = () => {
      const event = {
        ...newEvent,
        id: Date.now()
      };
      setContentData({
        ...contentData,
        events: [...(contentData.events || []), event]
      });
      setNewEvent({ title: '', date: '', description: '' });
    };

    const handleDeleteEvent = (id) => {
      setContentData({
        ...contentData,
        events: contentData.events.filter(event => event.id !== id)
      });
    };

    return (
      <div className="space-y-6">
        {/* Add New Event */}
        <Card variant="secondary">
          <Card.Header>
            <Card.Title>Add New Event</Card.Title>
          </Card.Header>
          <Card.Content className="space-y-4">
            <input
              type="text"
              placeholder="Event title..."
              value={newEvent.title}
              onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
            <input
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
            <textarea
              placeholder="Event description..."
              value={newEvent.description}
              onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
              rows={3}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
            <Button 
              onClick={handleAddEvent} 
              variant="primary"
              disabled={!newEvent.title.trim()}
            >
              Add Event
            </Button>
          </Card.Content>
        </Card>

        {/* Existing Events */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-primary-800">Upcoming Events</h3>
          {contentData.events?.map(event => (
            <Card key={event.id}>
              <Card.Content>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold text-primary-800">{event.title}</h4>
                    <p className="text-sm text-secondary-600 mt-1">{event.date}</p>
                    <p className="text-sm text-neutral-600 mt-2">{event.description}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDeleteEvent(event.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Content>
            </Card>
          )) || <p className="text-neutral-500">No events scheduled.</p>}
        </div>
      </div>
    );
  };

  const renderEditor = () => {
    switch (activeTab) {
      case 'hero': return renderHeroEditor();
      case 'about': return renderAboutEditor();
      case 'news': return renderNewsEditor();
      case 'events': return renderEventsEditor();
      default: return <div>Select a section to edit</div>;
    }
  };

  return (
    <div className="p-6 bg-neutral-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary-800">Website Content Management</h1>
        <p className="text-neutral-600">Update website content, news, and events</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation Tabs */}
        <div className="lg:col-span-1">
          <Card>
            <Card.Header>
              <Card.Title>Content Sections</Card.Title>
            </Card.Header>
            <Card.Content>
              <nav className="space-y-2">
                {tabs.map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.key
                        ? 'bg-primary-100 text-primary-800'
                        : 'text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </Card.Content>
          </Card>
        </div>

        {/* Content Editor */}
        <div className="lg:col-span-3">
          <Card>
            <Card.Header>
              <Card.Title>
                {tabs.find(tab => tab.key === activeTab)?.label} Editor
              </Card.Title>
            </Card.Header>
            <Card.Content>
              {renderEditor()}
            </Card.Content>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WebsiteCMS;