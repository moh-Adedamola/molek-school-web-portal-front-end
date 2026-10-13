import Homepage from "./pages/Homepage.jsx";
import NotFound from "./pages/NotFound.jsx";
import PublicLayout from "./components/Landingpage/PublicLayout.jsx";
import { Navigate } from "react-router-dom";

// Student Portal Imports
import { lazy } from 'react';
// Homepage and 404 load immediately; every other page loads when it is opened,
// so a first visit downloads only what the homepage needs.
const About = lazy(() => import('./pages/About'));
const Academics = lazy(() => import('./pages/Academics.jsx'));
const ContactUs = lazy(() => import('./pages/ContactUs.jsx'));
const Admissions = lazy(() => import('./pages/Admissions.jsx'));
const News = lazy(() => import('./pages/News.jsx'));
const NewsDetail = lazy(() => import('./pages/NewsDetail.jsx'));
const Gallery = lazy(() => import('./pages/Gallery.jsx'));
const Privacy = lazy(() => import('./pages/Privacy.jsx'));
const Terms = lazy(() => import('./pages/Terms.jsx'));
const Accessibility = lazy(() => import('./pages/Accessibility.jsx'));
const StudentLogin = lazy(() => import('./pages/StudentLogin.jsx'));
// The portal loads only when someone opens it, so homepage visitors on slow
// connections don't download the charts, forms and report card code.
const PortalLayout = lazy(() => import('./components/Portal/PortalLayout.jsx'));
const PortalHome = lazy(() => import('./pages/portal/Home.jsx'));
const PortalResults = lazy(() => import('./pages/portal/Results.jsx'));
const MyDetails = lazy(() => import('./pages/portal/MyDetails.jsx'));
const StudentPayment = lazy(() => import('./components/StudentService/Payment.jsx'));
import ProtectedStudentRoute from './components/ProtectedRoute.jsx';

const routes = [
    // Every public page shares one header and footer (PublicLayout)
    {
        path: '/',
        element: <PublicLayout />,
        children: [
            { index: true, element: <Homepage /> },
            { path: 'about', element: <About /> },
            { path: 'admissions', element: <Admissions /> },
            { path: 'academics', element: <Academics /> },
            { path: 'contact', element: <ContactUs /> },
            { path: 'news', element: <News /> },
            { path: 'news/:id', element: <NewsDetail /> },
            { path: 'gallery', element: <Gallery /> },
            { path: 'privacy', element: <Privacy /> },
            { path: 'terms', element: <Terms /> },
            { path: 'accessibility', element: <Accessibility /> },
            { path: '*', element: <NotFound /> },
        ],
    },

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

];

export default routes;