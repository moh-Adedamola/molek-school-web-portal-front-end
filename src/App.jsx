// File: src/App.jsx
// Main application component with complete routing structure including role-based dashboards

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { RoleProvider } from './context/RoleContext';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import AuthLayout from './layouts/AuthLayout';
import SuperAdminLayout from './layouts/SuperAdminLayout';
import AdminLayout from './layouts/AdminLayout';
import TeacherLayout from './layouts/TeacherLayout';
import ParentLayout from './layouts/ParentLayout';

// Protected Route Components
import ProtectedRoute from './components/shared/ProtectedRoute';
import RoleBasedRoute from './components/shared/RoleBasedRoute';

// Public Website Pages
import Home from './pages/website/Home';
import AboutUs from './pages/website/about/AboutUs';
import StaffDirectory from './pages/website/about/StaffDirectory';
import Leadership from './pages/website/about/Leadership';
import VisionMission from './pages/website/about/VisionMission';
import History from './pages/website/about/History';
import Academics from './pages/website/academics/Academics';
import Subjects from './pages/website/academics/Subjects';
import AcademicCalendar from './pages/website/academics/AcademicCalendar';
import Curriculum from './pages/website/academics/Curriculum';
import TuitionFees from './pages/website/academics/TuitionFees';
import Requirements from './pages/website/academics/Requirements';
import Admissions from './pages/website/admissions/Admissions';
import HowToApply from './pages/website/admissions/HowToApply';
import NewsEvents from './pages/website/newsEvents/NewsEvents';
import Newsletter from './pages/website/newsEvents/Newsletter';
import EventsCalendar from './pages/website/newsEvents/EventsCalendar';
import Announcements from './pages/website/newsEvents/Announcements';
import Gallery from './pages/website/gallery/Gallery';
import PhotoVideoGallery from './pages/website/gallery/PhotoVideoGallery';
import Contact from './pages/website/contact/Contact';
import ContactInformation from './pages/website/contact/ContactInformation';

// Auth Pages
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import Unauthorized from './pages/auth/Unauthorized';

// Dashboard Pages
import SuperAdminDashboard from './pages/dashboards/SuperAdminDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import TeacherDashboard from './pages/dashboards/TeacherDashboard';
import ParentDashboard from './pages/dashboards/ParentDashboard';

// Super Admin Pages
import UserManagement from './pages/superAdmin/UserManagement';
import SchoolSettings from './pages/superAdmin/SchoolSettings';
import SystemReports from './pages/superAdmin/SystemReports';
import BackupRestore from './pages/superAdmin/BackupRestore';

// Admin Pages
import WebsiteCMS from './pages/admin/WebsiteCMS';
import StudentManagement from './pages/admin/StudentManagement';
import TeacherManagement from './pages/admin/TeacherManagement';
import ParentManagement from './pages/admin/ParentManagement';
import ClassManagement from './pages/admin/ClassManagement';
import SubjectManagement from './pages/admin/SubjectManagement';
import AttendanceReports from './pages/admin/AttendanceReports';
import GradeReports from './pages/admin/GradeReports';
import AcademicAnalytics from './pages/admin/AcademicAnalytics';

// Teacher Pages
import MyStudents from './pages/teacher/MyStudents';
import AttendanceMarking from './pages/teacher/AttendanceMarking';
import GradeEntry from './pages/teacher/GradeEntry';
import StudentProgress from './pages/teacher/StudentProgress';
import IndividualReports from './pages/teacher/IndividualReports';
import SubjectReports from './pages/teacher/SubjectReports';

// Parent Pages
import MyChildren from './pages/parent/MyChildren';
import AttendanceRecords from './pages/parent/AttendanceRecords';
import AcademicReports from './pages/parent/AcademicReports';
import ProgressAnalytics from './pages/parent/ProgressAnalytics';
import ParentCommunication from './pages/parent/ParentCommunication';

function App() {
  return (
    <AuthProvider>
      <RoleProvider>
        <ThemeProvider>
          <NotificationProvider>
            <Router>
              <div className="min-h-screen bg-neutral-50">
                <Routes>
                  {/* Public Website Routes */}
                  <Route path="/" element={<PublicLayout />}>
                    <Route index element={<Home />} />
                    
                    {/* About Us Routes */}
                    <Route path="about" element={<AboutUs />} />
                    <Route path="about/staff" element={<StaffDirectory />} />
                    <Route path="about/leadership" element={<Leadership />} />
                    <Route path="about/vision-mission" element={<VisionMission />} />
                    <Route path="about/history" element={<History />} />
                    
                    {/* Academics Routes */}
                    <Route path="academics" element={<Academics />} />
                    <Route path="academics/subjects" element={<Subjects />} />
                    <Route path="academics/calendar" element={<AcademicCalendar />} />
                    <Route path="academics/curriculum" element={<Curriculum />} />
                    <Route path="academics/fees" element={<TuitionFees />} />
                    <Route path="academics/requirements" element={<Requirements />} />
                    
                    {/* Admissions Routes */}
                    <Route path="admissions" element={<Admissions />} />
                    <Route path="admissions/how-to-apply" element={<HowToApply />} />
                    
                    {/* News & Events Routes */}
                    <Route path="news-events" element={<NewsEvents />} />
                    <Route path="news-events/newsletter" element={<Newsletter />} />
                    <Route path="news-events/calendar" element={<EventsCalendar />} />
                    <Route path="news-events/announcements" element={<Announcements />} />
                    
                    {/* Gallery Routes */}
                    <Route path="gallery" element={<Gallery />} />
                    <Route path="gallery/photos-videos" element={<PhotoVideoGallery />} />
                    
                    {/* Contact Routes */}
                    <Route path="contact" element={<Contact />} />
                    <Route path="contact/information" element={<ContactInformation />} />
                  </Route>

                  {/* Authentication Routes */}
                  <Route path="/auth" element={<AuthLayout />}>
                    <Route path="login" element={<Login />} />
                    <Route path="forgot-password" element={<ForgotPassword />} />
                    <Route path="unauthorized" element={<Unauthorized />} />
                  </Route>

                  {/* Super Admin Dashboard Routes */}
                  <Route path="/super-admin" element={
                    <ProtectedRoute>
                      <RoleBasedRoute allowedRoles={['super_admin']}>
                        <SuperAdminLayout />
                      </RoleBasedRoute>
                    </ProtectedRoute>
                  }>
                    <Route index element={<SuperAdminDashboard />} />
                    <Route path="users" element={<UserManagement />} />
                    <Route path="settings" element={<SchoolSettings />} />
                    <Route path="reports" element={<SystemReports />} />
                    <Route path="backup" element={<BackupRestore />} />
                  </Route>

                  {/* Admin Dashboard Routes */}
                  <Route path="/admin" element={
                    <ProtectedRoute>
                      <RoleBasedRoute allowedRoles={['admin']}>
                        <AdminLayout />
                      </RoleBasedRoute>
                    </ProtectedRoute>
                  }>
                    <Route index element={<AdminDashboard />} />
                    <Route path="website-cms" element={<WebsiteCMS />} />
                    <Route path="students" element={<StudentManagement />} />
                    <Route path="teachers" element={<TeacherManagement />} />
                    <Route path="parents" element={<ParentManagement />} />
                    <Route path="classes" element={<ClassManagement />} />
                    <Route path="subjects" element={<SubjectManagement />} />
                    <Route path="attendance-reports" element={<AttendanceReports />} />
                    <Route path="grade-reports" element={<GradeReports />} />
                    <Route path="analytics" element={<AcademicAnalytics />} />
                  </Route>

                  {/* Teacher Dashboard Routes */}
                  <Route path="/teacher" element={
                    <ProtectedRoute>
                      <RoleBasedRoute allowedRoles={['teacher']}>
                        <TeacherLayout />
                      </RoleBasedRoute>
                    </ProtectedRoute>
                  }>
                    <Route index element={<TeacherDashboard />} />
                    <Route path="students" element={<MyStudents />} />
                    <Route path="attendance" element={<AttendanceMarking />} />
                    <Route path="grades" element={<GradeEntry />} />
                    <Route path="progress" element={<StudentProgress />} />
                    <Route path="individual-reports" element={<IndividualReports />} />
                    <Route path="subject-reports" element={<SubjectReports />} />
                  </Route>

                  {/* Parent Dashboard Routes */}
                  <Route path="/parent" element={
                    <ProtectedRoute>
                      <RoleBasedRoute allowedRoles={['parent']}>
                        <ParentLayout />
                      </RoleBasedRoute>
                    </ProtectedRoute>
                  }>
                    <Route index element={<ParentDashboard />} />
                    <Route path="children" element={<MyChildren />} />
                    <Route path="attendance" element={<AttendanceRecords />} />
                    <Route path="reports" element={<AcademicReports />} />
                    <Route path="progress" element={<ProgressAnalytics />} />
                    <Route path="communication" element={<ParentCommunication />} />
                  </Route>

                  {/* Catch-all route for 404 */}
                  <Route path="*" element={
                    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
                      <div className="text-center">
                        <h1 className="text-6xl font-bold text-primary-600 mb-4">404</h1>
                        <p className="text-neutral-600 mb-6 text-lg">Page not found</p>
                        <p className="text-neutral-500 mb-8">
                          The page you're looking for doesn't exist or has been moved.
                        </p>
                        <a href="/" className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors duration-200">
                          Return Home
                        </a>
                      </div>
                    </div>
                  } />
                </Routes>

                {/* Global Toast Notifications */}
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={true}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  className="text-sm"
                  toastClassName="bg-white shadow-lg border border-neutral-200 rounded-lg"
                  bodyClassName="text-neutral-800 p-4"
                  progressClassName="bg-primary-500"
                />
              </div>
            </Router>
          </NotificationProvider>
        </ThemeProvider>
      </RoleProvider>
    </AuthProvider>
  );
}

export default App;