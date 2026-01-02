import About from './pages/About';
import Homepage from "./pages/Homepage.jsx";
import Academics from "./pages/Academics.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Admissions from './pages/Admissions.jsx';
import News from "./pages/News.jsx"
import Gallery from "./pages/Gallery.jsx";

// Student Portal Imports
import StudentLogin from './pages/StudentLogin.jsx';
import StudentLayout from './components/StudentService/Layout.jsx';
import StudentDashboard from './components/StudentService/Dashboard.jsx';
import StudentGrade from './components/StudentService/Grade.jsx';
import StudentPayment from './components/StudentService/Payment.jsx';
import StudentSettings from './components/StudentService/Settings.jsx';
import StudentProfile from './components/StudentService/StudentProfile.jsx';
import ProtectedStudentRoute from './components/ProtectedRoute.jsx';

const routes = [
    // ============================================
    // PUBLIC ROUTES (Main Website)
    // ============================================
    {
        path: '/',
        element: <Homepage />,
    },
    {
        path: '/about',
        element: <About />,
    },
    {
        path: '/admissions',
        element: <Admissions />,
    },
    {
        path: '/academics',
        element: <Academics />,
    },
    {
        path: '/contact',
        element: <ContactUs />,
    },
    {
        path: '/news',
        element: <News />,
    },
    {
        path: '/gallery',
        element: <Gallery />,
    },

    // ============================================
    // STUDENT PORTAL ROUTES
    // ============================================
    {
        path: '/student/login',
        element: <StudentLogin />,
    },
    {
        path: '/student',
        element: (
            <ProtectedStudentRoute>
                <StudentLayout />
            </ProtectedStudentRoute>
        ),
        children: [
            {
                path: 'dashboard',
                element: <StudentDashboard />,
            },
            {
                path: 'grades',
                element: <StudentGrade />,
            },
            {
                path: 'payment',
                element: <StudentPayment />,
            },
            {
                path: 'settings',
                element: <StudentSettings />,
            },
            {
                path: 'profile',
                element: <StudentProfile />,
            },
        ],
    },
];

export default routes;