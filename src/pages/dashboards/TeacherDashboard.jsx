import { useState } from 'react';
import { BookOpen, Users, Calendar, CheckSquare, AlertCircle, Clock, TrendingUp, FileText } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const TeacherDashboard = () => {
  const [selectedClass, setSelectedClass] = useState('JSS 2A');

  // Mock teacher data
  const teacherInfo = {
    name: 'Mrs. Adebayo Funmilayo',
    employeeId: 'TCH-2024-089',
    department: 'Mathematics',
    classesAssigned: ['JSS 2A', 'JSS 2B', 'SSS 1C']
  };

  const todaySchedule = [
    { time: '8:00 AM', subject: 'Mathematics', class: 'JSS 2A', status: 'completed' },
    { time: '9:30 AM', subject: 'Mathematics', class: 'JSS 2B', status: 'completed' },
    { time: '11:00 AM', subject: 'Mathematics', class: 'SSS 1C', status: 'current' },
    { time: '2:00 PM', subject: 'Remedial Class', class: 'JSS 2A', status: 'upcoming' },
    { time: '3:30 PM', subject: 'Mathematics Club', class: 'All Levels', status: 'upcoming' }
  ];

  const classStats = [
    {
      class: 'JSS 2A',
      students: 35,
      attendance: 94,
      averageGrade: 'B+',
      assignments: { pending: 3, graded: 12 }
    },
    {
      class: 'JSS 2B', 
      students: 38,
      attendance: 91,
      averageGrade: 'B',
      assignments: { pending: 5, graded: 10 }
    },
    {
      class: 'SSS 1C',
      students: 32,
      attendance: 96,
      averageGrade: 'A-',
      assignments: { pending: 2, graded: 15 }
    }
  ];

  const recentActivities = [
    {
      type: 'grade',
      message: 'Graded JSS 2A Mathematics Quiz - 28 students',
      time: '1 hour ago',
      status: 'success'
    },
    {
      type: 'attendance',
      message: 'Attendance marked for JSS 2B - 2 absences',
      time: '3 hours ago',
      status: 'info'
    },
    {
      type: 'assignment',
      message: 'New assignment created: Algebra Practice',
      time: '5 hours ago',
      status: 'success'
    },
    {
      type: 'alert',
      message: 'Low performance alert for 3 students in SSS 1C',
      time: '1 day ago',
      status: 'warning'
    }
  ];

  const quickActions = [
    { label: 'Mark Attendance', action: 'attendance', color: 'primary', icon: CheckSquare },
    { label: 'Enter Grades', action: 'grades', color: 'secondary', icon: BookOpen },
    { label: 'Create Assignment', action: 'assignment', color: 'accent', icon: FileText },
    { label: 'View Reports', action: 'reports', color: 'success', icon: TrendingUp }
  ];

  const upcomingTasks = [
    { task: 'Submit JSS 2A test scores', due: 'Today, 5:00 PM', priority: 'high' },
    { task: 'Parent conference - Adebisi John', due: 'Tomorrow, 10:00 AM', priority: 'medium' },
    { task: 'Prepare SSS 1C lesson plan', due: 'Jan 20, 2025', priority: 'medium' },
    { task: 'Grade JSS 2B assignments', due: 'Jan 22, 2025', priority: 'low' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-secondary-600 bg-secondary-100';
      case 'current': return 'text-primary-600 bg-primary-100';
      case 'upcoming': return 'text-neutral-600 bg-neutral-100';
      default: return 'text-neutral-600 bg-neutral-100';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-4 border-red-500 bg-red-50';
      case 'medium': return 'border-l-4 border-accent-500 bg-accent-50';
      case 'low': return 'border-l-4 border-secondary-500 bg-secondary-50';
      default: return 'border-l-4 border-neutral-500 bg-neutral-50';
    }
  };

  const handleQuickAction = (action) => {
    console.log(`Navigate to ${action}`);
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-primary-800">Teacher Dashboard</h1>
              <p className="text-neutral-600">Welcome back, {teacherInfo.name}</p>
              <p className="text-sm text-neutral-500">
                Employee ID: {teacherInfo.employeeId} | Department: {teacherInfo.department}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <select 
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {teacherInfo.classesAssigned.map(className => (
                  <option key={className} value={className}>{className}</option>
                ))}
              </select>
              <Button variant="primary" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                View Schedule
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Schedule */}
            <Card className="bg-white" padding="lg">
              <Card.Header>
                <Card.Title className="text-primary-800">Today's Schedule</Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="space-y-3">
                  {todaySchedule.map((lesson, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-neutral-50">
                      <div className="flex items-center space-x-4">
                        <div className="text-center min-w-[80px]">
                          <p className="text-sm font-medium text-neutral-800">{lesson.time}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-neutral-800">{lesson.subject}</p>
                          <p className="text-xs text-neutral-500">{lesson.class}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(lesson.status)}`}>
                        {lesson.status}
                      </span>
                    </div>
                  ))}
                </div>
              </Card.Content>
            </Card>

            {/* Class Statistics */}
            <Card className="bg-white" padding="lg">
              <Card.Header>
                <Card.Title className="text-primary-800">My Classes Overview</Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {classStats.map((classInfo, index) => (
                    <div key={index} className="p-4 rounded-lg border border-neutral-200 bg-white">
                      <h3 className="font-semibold text-primary-800 mb-3">{classInfo.class}</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-neutral-600">Students:</span>
                          <span className="font-medium">{classInfo.students}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-600">Attendance:</span>
                          <span className={`font-medium ${
                            classInfo.attendance >= 95 ? 'text-secondary-600' :
                            classInfo.attendance >= 90 ? 'text-accent-600' : 'text-red-600'
                          }`}>
                            {classInfo.attendance}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-600">Avg. Grade:</span>
                          <span className="font-medium text-primary-600">{classInfo.averageGrade}</span>
                        </div>
                        <div className="flex justify-between pt-2">
                          <span className="text-neutral-600">Pending:</span>
                          <span className="text-accent-600 font-medium">{classInfo.assignments.pending}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Content>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white" padding="lg">
              <Card.Header>
                <Card.Title className="text-primary-800">Quick Actions</Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {quickActions.map((action, index) => {
                    const IconComponent = action.icon;
                    return (
                      <Button
                        key={index}
                        variant={action.color}
                        size="sm"
                        onClick={() => handleQuickAction(action.action)}
                        className="flex flex-col items-center p-4 h-auto"
                      >
                        <IconComponent className="w-5 h-5 mb-2" />
                        <span className="text-xs">{action.label}</span>
                      </Button>
                    );
                  })}
                </div>
              </Card.Content>
            </Card>
          </div>

          {/* Sidebar - Right Side */}
          <div className="space-y-6">
            {/* Recent Activities */}
            <Card className="bg-white" padding="lg">
              <Card.Header>
                <Card.Title className="text-primary-800">Recent Activities</Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`p-2 rounded-full ${
                        activity.status === 'success' ? 'bg-secondary-100 text-secondary-600' :
                        activity.status === 'warning' ? 'bg-accent-100 text-accent-600' :
                        'bg-primary-100 text-primary-600'
                      }`}>
                        {activity.status === 'success' ? <CheckSquare className="w-3 h-3" /> :
                         activity.status === 'warning' ? <AlertCircle className="w-3 h-3" /> :
                         <Clock className="w-3 h-3" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-neutral-800">{activity.message}</p>
                        <p className="text-xs text-neutral-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Content>
            </Card>

            {/* Upcoming Tasks */}
            <Card className="bg-white" padding="lg">
              <Card.Header>
                <Card.Title className="text-primary-800">Upcoming Tasks</Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="space-y-3">
                  {upcomingTasks.map((task, index) => (
                    <div key={index} className={`p-3 rounded-lg ${getPriorityColor(task.priority)}`}>
                      <p className="text-sm font-medium text-neutral-800">{task.task}</p>
                      <p className="text-xs text-neutral-600 mt-1">Due: {task.due}</p>
                    </div>
                  ))}
                </div>
              </Card.Content>
            </Card>

            {/* Performance Summary */}
            <Card className="bg-white" padding="lg">
              <Card.Header>
                <Card.Title className="text-primary-800">This Month</Card.Title>
              </Card.Header>
              <Card.Content>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-secondary-600">93.5%</p>
                    <p className="text-xs text-neutral-600">Average Attendance</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary-600">47</p>
                    <p className="text-xs text-neutral-600">Assignments Graded</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-accent-600">12</p>
                    <p className="text-xs text-neutral-600">Parent Meetings</p>
                  </div>
                </div>
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;