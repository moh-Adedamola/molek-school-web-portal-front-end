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
import { lazy } from 'react';
// The portal loads only when someone opens it, so homepage visitors on slow
// connections don't download the charts, forms and report card code.
const PortalLayout = lazy(() => import('./components/Portal/PortalLayout.jsx'));
const PortalHome = lazy(() => import('./pages/portal/Home.jsx'));
const PortalResults = lazy(() => import('./pages/portal/Results.jsx'));
const MyDetails = lazy(() => import('./pages/portal/MyDetails.jsx'));
const StudentPayment = lazy(() => import('./components/StudentService/Payment.jsx'));
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
                <PortalLayout />
            </ProtectedStudentRoute>
        ),
        children: [
            // Three pages: Home, Results, My details (+ the payments preview)
            {
                index: true,
                element: <PortalHome />,
            },
            {
                path: 'results',
                element: <PortalResults />,
            },
            {
                path: 'details',
                element: <MyDetails />,
            },
            {
                path: 'payment',
                element: <StudentPayment />,
            },
            // Old addresses keep working for anyone with a bookmark
            { path: 'dashboard', element: <Navigate to="/student" replace /> },
            { path: 'grades', element: <Navigate to="/student/results" replace /> },
            { path: 'profile', element: <Navigate to="/student/details" replace /> },
            { path: 'settings', element: <Navigate to="/student/details" replace /> },
            { path: 'payments', element: <Navigate to="/student/payment" replace /> },
        ],
    },

    // Anything else: a real "page not found" instead of a blank screen
    {
        path: '*',
        element: <NotFound />,
    },
];

export default routes;