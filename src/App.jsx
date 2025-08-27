import React from 'react'; // ADD THIS LINE
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context Providers
import { WebsiteContentProvider } from './context/WebsiteContentContext';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';

// Layouts
import WebsiteLayout from './layouts/WebsiteLayout';
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';

// Auth Components
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';

// Protected Route Components
import ProtectedRoute from './components/shared/ProtectedRoute';
import RoleBasedRoute from './components/shared/RoleBasedRoute';

// Website Pages - Home
import Home from './pages/website/Home';

// Website Pages - About Section
import AboutUs from './pages/website/about/AboutUs';
import StaffDirectory from './pages/website/about/StaffDirectory';
import Leadership from './pages/website/about/Leadership';
import VisionMission from './pages/website/about/VisionMission';
import History from './pages/website/about/History';

// Website Pages - Academics Section
import Academics from './pages/website/academics/Academics';
import AcademicCalendar from './pages/website/academics/AcademicCalendar';
import Subjects from './pages/website/academics/Subjects';
import Curriculum from './pages/website/academics/Curriculum';

// Website Pages - Admissions Section
import Admissions from './pages/website/admissions/Admissions';
import Requirements from './pages/website/admissions/Requirements';
import HowToApply from './pages/website/admissions/HowToApply';
import TuitionFees from './pages/website/admissions/TuitionFees';

// Website Pages - News & Events Section
import NewsEvents from './pages/website/newsEvents/NewsEvents';
import Newsletter from './pages/website/newsEvents/Newsletter';
import EventsCalendar from './pages/website/newsEvents/EventsCalendar';
import Announcements from './pages/website/newsEvents/Announcements';

// Website Pages - Gallery Section
import Gallery from './pages/website/gallery/Gallery';
import PhotoVideoGallery from './pages/website/gallery/PhotoVideoGallery';

// Website Pages - Contact Section
import Contact from './pages/website/contact/Contact';
import ContactInformation from './pages/website/contact/ContactInformation';

// Dashboard Pages
import SuperAdminDashboard from './pages/dashboards/SuperAdminDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import TeacherDashboard from './pages/dashboards/TeacherDashboard';
import ParentDashboard from './pages/dashboards/ParentDashboard';

// Management Pages
import AdminManagement from './pages/management/AdminManagement';
import StudentManagement from './pages/management/StudentManagement';
import TeacherManagement from './pages/management/TeacherManagement';
import ParentManagement from './pages/management/ParentManagement';
import ClassManagement from './pages/management/ClassManagement';
import SubjectManagement from './pages/management/SubjectManagement';
import WebsiteCMS from './pages/management/WebsiteCMS';

// Academic Pages
import AttendanceMarking from './pages/academics/AttendanceMarking';
import AttendanceAnalytics from './pages/academics/AttendanceAnalytics';
import AttendanceReports from './pages/academics/AttendanceReports';
import GradeEntry from './pages/academics/GradeEntry';
import GradeAnalytics from './pages/academics/GradeAnalytics';
import GradeReports from './pages/academics/GradeReports';

// Hooks
import useAuth from './hooks/useAuth';

// Dashboard Redirect Component - FIXED
const DashboardRedirect = () => {
  const { user, loading } = useAuth();
  
  // Show loading state while authentication is being checked
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }
  
  // Redirect based on user role - CORRECTED PATHS
  switch (user.role) {
    case 'super_admin':
      return <Navigate to="/portal" replace />;
    case 'admin':
      return <Navigate to="/portal/admin" replace />;
    case 'teacher':
      return <Navigate to="/portal/teacher" replace />;
    case 'parent':
      return <Navigate to="/portal/parent" replace />;
    default:
      // If role is not recognized, redirect to home
      return <Navigate to="/" replace />;
  }
};

// Error Boundary Component for better error handling
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Application error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-4">Please refresh the page or contact support</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <WebsiteContentProvider>
          <ThemeProvider>
            <NotificationProvider>
              <Router>
                <div className="App min-h-screen bg-gray-50">
                  <Routes>
                    {/* Website Routes */}
                    <Route path="/" element={<WebsiteLayout />}>
                      <Route index element={<Home />} />
                      
                      {/* About Section - Complete Implementation */}
                      <Route path="about" element={<AboutUs />} />
                      <Route path="about/staff" element={<StaffDirectory />} />
                      <Route path="about/leadership" element={<Leadership />} />
                      <Route path="about/vision-mission" element={<VisionMission />} />
                      <Route path="about/history" element={<History />} />
                      
                      {/* Academics Section - Complete Implementation */}
                      <Route path="academics" element={<Academics />} />
                      <Route path="academics/calendar" element={<AcademicCalendar />} />
                      <Route path="academics/subjects" element={<Subjects />} />
                      <Route path="academics/curriculum" element={<Curriculum />} />
                      
                      {/* Admissions Section - Complete Implementation */}
                      <Route path="admissions" element={<Admissions />} />
                      <Route path="admissions/requirements" element={<Requirements />} />
                      <Route path="admissions/how-to-apply" element={<HowToApply />} />
                      <Route path="admissions/fees" element={<TuitionFees />} />
                      
                      {/* News & Events Section - Complete Implementation */}
                      <Route path="news-events" element={<NewsEvents />} />
                      <Route path="news-events/newsletter" element={<Newsletter />} />
                      <Route path="news-events/calendar" element={<EventsCalendar />} />
                      <Route path="news-events/announcements" element={<Announcements />} />
                      
                      {/* Gallery Section - Complete Implementation */}
                      <Route path="gallery" element={<Gallery />} />
                      <Route path="gallery/photos" element={<PhotoVideoGallery />} />
                      <Route path="gallery/videos" element={<PhotoVideoGallery />} />
                      
                      {/* Contact Section - Complete Implementation */}
                      <Route path="contact" element={<Contact />} />
                      <Route path="contact/information" element={<ContactInformation />} />
                    </Route>

                    {/* Dashboard Redirect Route - FIXED */}
                    <Route path="/dashboard" element={<DashboardRedirect />} />
                    <Route path="/portal" element={<DashboardRedirect />} />

                    {/* Dashboard Routes - Complete Implementation with Role-Based Access */}
                    <Route path="/portal/*" element={
                      <ProtectedRoute>
                        <DashboardLayout />
                      </ProtectedRoute>
                    }>
                      {/* Super Admin Dashboard - FIXED INDEX ROUTE */}
                      <Route index element={
                        <RoleBasedRoute allowedRoles={['super_admin']}>
                          <SuperAdminDashboard />
                        </RoleBasedRoute>
                      } />
                      
                      {/* Admin Dashboard and Management */}
                      <Route path="admin" element={
                        <RoleBasedRoute allowedRoles={['admin', 'super_admin']}>
                          <AdminDashboard />
                        </RoleBasedRoute>
                      } />
                      
                      <Route path="admin/users" element={
                        <RoleBasedRoute allowedRoles={['admin', 'super_admin']}>
                          <AdminManagement />
                        </RoleBasedRoute>
                      } />
                      
                      <Route path="admin/students" element={
                        <RoleBasedRoute allowedRoles={['admin', 'super_admin']}>
                          <StudentManagement />
                        </RoleBasedRoute>
                      } />
                      
                      <Route path="admin/teachers" element={
                        <RoleBasedRoute allowedRoles={['admin', 'super_admin']}>
                          <TeacherManagement />
                        </RoleBasedRoute>
                      } />
                      
                      <Route path="admin/parents" element={
                        <RoleBasedRoute allowedRoles={['admin', 'super_admin']}>
                          <ParentManagement />
                        </RoleBasedRoute>
                      } />
                      
                      <Route path="admin/classes" element={
                        <RoleBasedRoute allowedRoles={['admin', 'super_admin']}>
                          <ClassManagement />
                        </RoleBasedRoute>
                      } />
                      
                      <Route path="admin/subjects" element={
                        <RoleBasedRoute allowedRoles={['admin', 'super_admin']}>
                          <SubjectManagement />
                        </RoleBasedRoute>
                      } />
                      
                      <Route path="admin/website" element={
                        <RoleBasedRoute allowedRoles={['admin', 'super_admin']}>
                          <WebsiteCMS />
                        </RoleBasedRoute>
                      } />
                      
                      {/* Teacher Dashboard and Academic Features */}
                      <Route path="teacher" element={
                        <RoleBasedRoute allowedRoles={['teacher', 'admin', 'super_admin']}>
                          <TeacherDashboard />
                        </RoleBasedRoute>
                      } />
                      
                      <Route path="teacher/attendance" element={
                        <RoleBasedRoute allowedRoles={['teacher', 'admin', 'super_admin']}>
                          <AttendanceMarking />
                        </RoleBasedRoute>
                      } />
                      
                      <Route path="teacher/attendance/analytics" element={
                        <RoleBasedRoute allowedRoles={['teacher', 'admin', 'super_admin']}>
                          <AttendanceAnalytics />
                        </RoleBasedRoute>
                      } />
                      
                      <Route path="teacher/attendance/reports" element={
                        <RoleBasedRoute allowedRoles={['teacher', 'admin', 'super_admin']}>
                          <AttendanceReports />
                        </RoleBasedRoute>
                      } />
                      
                      <Route path="teacher/grades" element={
                        <RoleBasedRoute allowedRoles={['teacher', 'admin', 'super_admin']}>
                          <GradeEntry />
                        </RoleBasedRoute>
                      } />
                      
                      <Route path="teacher/grades/analytics" element={
                        <RoleBasedRoute allowedRoles={['teacher', 'admin', 'super_admin']}>
                          <GradeAnalytics />
                        </RoleBasedRoute>
                      } />
                      
                      <Route path="teacher/grades/reports" element={
                        <RoleBasedRoute allowedRoles={['teacher', 'admin', 'super_admin']}>
                          <GradeReports />
                        </RoleBasedRoute>
                      } />
                      
                      {/* Parent Dashboard */}
                      <Route path="parent" element={
                        <RoleBasedRoute allowedRoles={['parent', 'admin', 'super_admin']}>
                          <ParentDashboard />
                        </RoleBasedRoute>
                      } />
                      
                      {/* Academic Management (Admin/Teacher Access) */}
                      <Route path="academics/attendance" element={
                        <RoleBasedRoute allowedRoles={['teacher', 'admin', 'super_admin']}>
                          <AttendanceMarking />
                        </RoleBasedRoute>
                      } />
                      
                      <Route path="academics/grades" element={
                        <RoleBasedRoute allowedRoles={['teacher', 'admin', 'super_admin']}>
                          <GradeEntry />
                        </RoleBasedRoute>
                      } />

                      {/* Fallback route for unmatched portal paths */}
                      <Route path="*" element={<DashboardRedirect />} />
                    </Route>

                    {/* Auth Routes */}
                    <Route path="/auth/*" element={<AuthLayout />}>
                      <Route path="login" element={<Login />} />
                      <Route path="forgot-password" element={<ForgotPassword />} />
                      {/* Redirect any other auth paths to login */}
                      <Route path="*" element={<Navigate to="/auth/login" replace />} />
                    </Route>

                    {/* Catch-all route - redirect to home */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>

                  <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    className="toast-container"
                    toastClassName="toast-custom"
                    bodyClassName="toast-body"
                    toastStyle={{
                      backgroundColor: '#ffffff',
                      color: '#1f2937',
                      borderLeft: '4px solid #2563eb',
                      borderRadius: '12px',
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                      fontSize: '14px',
                      lineHeight: '1.4',
                    }}
                    progressStyle={{
                      backgroundColor: '#2563eb',
                    }}
                  />
                </div>
              </Router>
            </NotificationProvider>
          </ThemeProvider>
        </WebsiteContentProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;