// pages/website/news-events/Announcements.jsx
import { AlertTriangle, Info, CheckCircle, Clock } from 'lucide-react';

const Announcements = () => {
  // Mock announcements data
  const announcements = [
    {
      id: 1,
      title: "School Fee Payment Deadline - Final Notice",
      content: "All outstanding school fees must be paid by December 20th, 2024. Students with unpaid fees will not be allowed to take end-of-term examinations.",
      date: "2024-12-15",
      priority: "urgent",
      department: "Accounts Office",
      type: "payment"
    },
    {
      id: 2,
      title: "WAEC Registration Ongoing",
      content: "SSS3 students should complete their WAEC registration at the school's examination office. Bring recent passport photographs and registration fees.",
      date: "2024-12-12",
      priority: "high",
      department: "Examination Office",
      type: "academic"
    },
    {
      id: 3,
      title: "New School Uniform Guidelines",
      content: "Updated school uniform guidelines are now available. All students must comply with the new dress code starting January 2025.",
      date: "2024-12-10",
      priority: "normal",
      department: "Student Affairs",
      type: "policy"
    },
    {
      id: 4,
      title: "Library Extended Hours",
      content: "The school library will now be open from 7:00 AM to 7:00 PM during examination periods to support student learning.",
      date: "2024-12-08",
      priority: "normal",
      department: "Library Services",
      type: "facility"
    },
    {
      id: 5,
      title: "Parent-Teacher Conference Scheduled",
      content: "A mandatory parent-teacher conference is scheduled for December 22nd, 2024. All parents/guardians are expected to attend.",
      date: "2024-12-06",
      priority: "high",
      department: "Academic Affairs",
      type: "meeting"
    }
  ];

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'urgent': return <AlertTriangle className="text-red-600" size={20} />;
      case 'high': return <Info className="text-accent-600" size={20} />;
      default: return <CheckCircle className="text-primary-600" size={20} />;
    }
  };

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case 'urgent': return 'border-l-red-500 bg-red-50';
      case 'high': return 'border-l-accent-500 bg-accent-50';
      default: return 'border-l-primary-500 bg-primary-50';
    }
  };

  const getTypeColor = (type) => {
    const colors = {
      payment: 'bg-red-100 text-red-800',
      academic: 'bg-primary-100 text-primary-800',
      policy: 'bg-purple-100 text-purple-800',
      facility: 'bg-secondary-100 text-secondary-800',
      meeting: 'bg-accent-100 text-accent-800'
    };
    return colors[type] || 'bg-neutral-100 text-neutral-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50">
      {/* Header */}
      <div className="bg-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Official Announcements</h1>
            <p className="text-xl text-primary-200">
              Important notices and updates from school administration
            </p>
          </div>
        </div>
      </div>

      {/* Priority Legend */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="text-red-600" size={16} />
              <span className="text-red-700 font-medium">Urgent</span>
            </div>
            <div className="flex items-center space-x-2">
              <Info className="text-accent-600" size={16} />
              <span className="text-accent-700 font-medium">High Priority</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="text-primary-600" size={16} />
              <span className="text-primary-700 font-medium">Normal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Announcements List */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-6">
          {announcements.map(announcement => (
            <div 
              key={announcement.id} 
              className={`bg-white rounded-lg shadow-md border-l-4 overflow-hidden ${getPriorityStyles(announcement.priority)}`}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getPriorityIcon(announcement.priority)}
                    <div>
                      <h2 className="text-lg font-semibold text-neutral-800">
                        {announcement.title}
                      </h2>
                      <div className="flex items-center space-x-4 text-sm text-neutral-600 mt-1">
                        <div className="flex items-center space-x-1">
                          <Clock size={14} />
                          <span>{new Date(announcement.date).toLocaleDateString()}</span>
                        </div>
                        <span>•</span>
                        <span>{announcement.department}</span>
                      </div>
                    </div>
                  </div>
                  
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(announcement.type)}`}>
                    {announcement.type}
                  </span>
                </div>

                {/* Content */}
                <div className="text-neutral-700 leading-relaxed">
                  {announcement.content}
                </div>

                {/* Action Button for urgent items */}
                {announcement.priority === 'urgent' && (
                  <div className="mt-4 pt-4 border-t border-neutral-200">
                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Take Action Now
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="btn-primary px-8 py-3 rounded-lg">
            Load Older Announcements
          </button>
        </div>
      </div>
    </div>
  );
};

export default Announcements;