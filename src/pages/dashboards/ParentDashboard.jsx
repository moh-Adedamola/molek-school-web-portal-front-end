import { useState } from 'react';
import { User, BookOpen, Calendar, TrendingUp, AlertCircle, CheckCircle, Clock, MessageSquare } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const ParentDashboard = () => {
  const [selectedChild, setSelectedChild] = useState(0);

  // Mock children data
  const children = [
    {
      id: 1,
      name: 'Adebola Johnson',
      class: 'JSS 2A',
      admissionNumber: 'JSS/2023/0156',
      photo: '/api/placeholder/80/80'
    },
    {
      id: 2,
      name: 'Kemi Johnson', 
      class: 'SSS 1B',
      admissionNumber: 'SSS/2022/0098',
      photo: '/api/placeholder/80/80'
    }
  ];

  const currentChild = children[selectedChild];

  // Mock performance data for current child
  const academicSummary = {
    currentGrade: 'B+',
    position: '5th',
    totalStudents: 35,
    attendance: 94.2,
    subjects: [
      { name: 'Mathematics', grade: 'A-', score: 78, color: 'secondary' },
      { name: 'English Language', grade: 'B+', score: 74, color: 'secondary' },
      { name: 'Basic Science', grade: 'A', score: 82, color: 'secondary' },
      { name: 'Social Studies', grade: 'B', score: 68, color: 'accent' },
      { name: 'French', grade: 'C+', score: 62, color: 'warning' },
      { name: 'Computer Studies', grade: 'A', score: 85, color: 'secondary' }
    ]
  };

  const recentActivities = [
    {
      type: 'grade',
      message: 'Mathematics test result: 78/100 (A-)',
      date: 'Jan 15, 2025',
      status: 'success'
    },
    {
      type: 'attendance',
      message: 'Marked present - Full attendance this week',
      date: 'Jan 15, 2025',
      status: 'success'
    },
    {
      type: 'assignment',
      message: 'English assignment submitted on time',
      date: 'Jan 14, 2025', 
      status: 'info'
    },
    {
      type: 'notice',
      message: 'PTA meeting scheduled for Jan 22, 2025',
      date: 'Jan 12, 2025',
      status: 'info'
    }
  ];

  const upcomingEvents = [
    { date: '22 Jan', event: 'PTA Meeting', type: 'meeting', important: true },
    { date: '25 Jan', event: 'Mid-term Examination', type: 'exam', important: true },
    { date: '28 Jan', event: 'Science Fair Project Due', type: 'assignment', important: false },
    { date: '30 Jan', event: 'Inter-house Sports', type: 'sports', important: false }
  ];

  const feeStatus = {
    term: '2024/2025 - 1st Term',
    totalAmount: 450000,
    paidAmount: 450000,
    balance: 0,
    status: 'paid',
    nextDue: '2nd Term Fee - April 2025'
  };

  const teacherMessages = [
    {
      from: 'Mrs. Adebayo (Mathematics)',
      subject: 'Great improvement in algebra',
      message: 'Adebola has shown excellent progress in algebra this week. Keep up the good work!',
      time: '2 days ago',
      read: false
    },
    {
      from: 'Mr. Okafor (English)',
      subject: 'Reading assignment reminder',
      message: 'Please ensure Adebola completes the assigned reading by Friday.',
      time: '5 days ago',
      read: true
    }
  ];

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'text-secondary-600';
    if (grade.startsWith('B')) return 'text-primary-600';
    if (grade.startsWith('C')) return 'text-accent-600';
    return 'text-red-600';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-secondary-600" />;
      case 'info': return <Clock className="w-4 h-4 text-primary-600" />;
      default: return <AlertCircle className="w-4 h-4 text-accent-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-primary-800">Parent Dashboard</h1>
              <p className="text-neutral-600">Track your child's academic progress</p>
            </div>
            <div className="flex items-center space-x-4">
              {children.length > 1 && (
                <select 
                  value={selectedChild}
                  onChange={(e) => setSelectedChild(parseInt(e.target.value))}
                  className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {children.map((child, index) => (
                    <option key={child.id} value={index}>{child.name}</option>
                  ))}
                </select>
              )}
              <Button variant="primary" size="sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                Contact Teachers
              </Button>
            </div>
          </div>
        </div>

        {/* Current Child Info */}
        <Card className="bg-white mb-8" padding="lg">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-primary-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-primary-800">{currentChild.name}</h2>
              <p className="text-neutral-600">Class: {currentChild.class}</p>
              <p className="text-sm text-neutral-500">Admission No: {currentChild.admissionNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-neutral-600">Current Position</p>
              <p className="text-2xl font-bold text-primary-600">
                {academicSummary.position}
              </p>
              <p className="text-xs text-neutral-500">
                out of {academicSummary.totalStudents} students
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Academic Performance */}
            <Card className="bg-white" padding="lg">
              <Card.Header>
                <div className="flex items-center justify-between">
                  <Card.Title className="text-primary-800">Academic Performance</Card.Title>
                  <div className="text-right">
                    <p className="text-sm text-neutral-600">Overall Grade</p>
                    <p className="text-xl font-bold text-primary-600">{academicSummary.currentGrade}</p>
                  </div>
                </div>
              </Card.Header>
              <Card.Content>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {academicSummary.subjects.map((subject, index) => (
                    <div key={index} className="p-4 rounded-lg border border-neutral-200">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-neutral-800">{subject.name}</h3>
                        <span className={`font-bold ${getGradeColor(subject.grade)}`}>
                          {subject.grade}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-neutral-600">Score:</span>
                        <span className="font-medium">{subject.score}/100</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Content>
            </Card>

            {/* Attendance Summary */}
            <Card className="bg-white" padding="lg">
              <Card.Header>
                <Card.Title className="text-primary-800">Attendance Summary</Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-3xl font-bold text-secondary-600">
                      {academicSummary.attendance}%
                    </p>
                    <p className="text-sm text-neutral-600">This Term</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-neutral-600">Status</p>
                    <p className={`font-medium ${
                      academicSummary.attendance >= 95 ? 'text-secondary-600' :
                      academicSummary.attendance >= 90 ? 'text-accent-600' : 'text-red-600'
                    }`}>
                      {academicSummary.attendance >= 95 ? 'Excellent' :
                       academicSummary.attendance >= 90 ? 'Good' : 'Needs Improvement'}
                    </p>
                  </div>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${
                      academicSummary.attendance >= 95 ? 'bg-secondary-500' :
                      academicSummary.attendance >= 90 ? 'bg-accent-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${academicSummary.attendance}%` }}
                  ></div>
                </div>
              </Card.Content>
            </Card>

            {/* Recent Activities */}
            <Card className="bg-white" padding="lg">
              <Card.Header>
                <Card.Title className="text-primary-800">Recent Activities</Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-neutral-50">
                      {getStatusIcon(activity.status)}
                      <div className="flex-1">
                        <p className="text-sm text-neutral-800">{activity.message}</p>
                        <p className="text-xs text-neutral-500">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Content>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Fee Status */}
            <Card className="bg-white" padding="lg">
              <Card.Header>
                <Card.Title className="text-primary-800">Fee Status</Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="text-center mb-4">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    feeStatus.status === 'paid' ? 'bg-secondary-100 text-secondary-800' :
                    feeStatus.status === 'partial' ? 'bg-accent-100 text-accent-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {feeStatus.status === 'paid' ? 'Fully Paid' :
                     feeStatus.status === 'partial' ? 'Partially Paid' : 'Outstanding'}
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Term:</span>
                    <span className="font-medium">{feeStatus.term}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Total Amount:</span>
                    <span className="font-medium">₦{feeStatus.totalAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Paid:</span>
                    <span className="font-medium text-secondary-600">₦{feeStatus.paidAmount.toLocaleString()}</span>
                  </div>
                  {feeStatus.balance > 0 && (
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Balance:</span>
                      <span className="font-medium text-red-600">₦{feeStatus.balance.toLocaleString()}</span>
                    </div>
                  )}
                  <hr className="border-neutral-200" />
                  <p className="text-xs text-neutral-600">{feeStatus.nextDue}</p>
                </div>
              </Card.Content>
            </Card>

            {/* Upcoming Events */}
            <Card className="bg-white" padding="lg">
              <Card.Header>
                <Card.Title className="text-primary-800">Upcoming Events</Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="space-y-3">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className={`p-3 rounded-lg ${
                      event.important ? 'bg-primary-50 border border-primary-200' : 'bg-neutral-50'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <div className="text-center min-w-[60px]">
                          <p className="text-xs text-neutral-500">JAN</p>
                          <p className="text-lg font-bold text-primary-600">{event.date.split(' ')[0]}</p>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-neutral-800">{event.event}</p>
                          <p className={`text-xs ${
                            event.type === 'exam' ? 'text-primary-600' :
                            event.type === 'meeting' ? 'text-secondary-600' :
                            event.type === 'assignment' ? 'text-accent-600' :
                            'text-neutral-500'
                          }`}>
                            {event.type}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Content>
            </Card>

            {/* Teacher Messages */}
            <Card className="bg-white" padding="lg">
              <Card.Header>
                <Card.Title className="text-primary-800">Teacher Messages</Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="space-y-3">
                  {teacherMessages.map((message, index) => (
                    <div key={index} className={`p-3 rounded-lg border ${
                      !message.read ? 'bg-primary-50 border-primary-200' : 'bg-neutral-50 border-neutral-200'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-neutral-800">{message.from}</p>
                        {!message.read && (
                          <span className="w-2 h-2 bg-primary-600 rounded-full"></span>
                        )}
                      </div>
                      <p className="text-sm text-neutral-700 mb-1">{message.subject}</p>
                      <p className="text-xs text-neutral-500">{message.time}</p>
                    </div>
                  ))}
                </div>
                <Button variant="secondary" size="sm" className="w-full mt-4">
                  View All Messages
                </Button>
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;