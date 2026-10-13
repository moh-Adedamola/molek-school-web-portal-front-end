import About from './pages/About';
import Homepage from "./pages/Homepage.jsx";
import Academics from "./pages/Academics.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Admissions from './pages/Admissions.jsx';
import News from "./pages/News.jsx"
import NewsDetail from "./pages/NewsDetail.jsx";
import Gallery from "./pages/Gallery.jsx";
import Privacy from "./pages/Privacy.jsx";
import Terms from "./pages/Terms.jsx";
import Accessibility from "./pages/Accessibility.jsx";
import NotFound from "./pages/NotFound.jsx";
import { Navigate } from "react-router-dom";

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
        path: '/news/:id',
        element: <NewsDetail />,
    },
    {
        path: '/gallery',
        element: <Gallery />,
    },
    {
        path: '/privacy',
        element: <Privacy />,
    },
    {
        path: '/terms',
        element: <Terms />,
    },
    {
        path: '/accessibility',
        element: <Accessibility />,
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
                index: true,
                element: <Navigate to="dashboard" replace />,
            },
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

    // Anything else: a real "page not found" instead of a blank screen
    {
        path: '*',
        element: <NotFound />,
    },
];

export default routes;