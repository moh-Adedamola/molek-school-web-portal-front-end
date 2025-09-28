import About from './pages/About';
import Homepage from "./pages/Homepage.jsx";
import Academics from "./pages/Academics.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Admissions from './pages/Admissions.jsx';
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Payment from "./components/Dashboard/Payment.jsx";
import Layout from "./components/Dashboard/Layout.jsx";
import Grade from "./components/Dashboard/Grade.jsx";
import Settings from "./components/Dashboard/Settings.jsx"
// import ProtectedRoute from "./components/ProtectedRoute.jsx";

const routes = [
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
        path: '/dashboard',
        // element: <ProtectedRoute element={<Layout />} />,
        element: <Layout />,
        children: [
            { index: true, element: <Dashboard /> },
            { path: 'payment', element: <Payment /> },
            { path: 'grades', element: <Grade />},
            {path: 'settings', element: <Settings />}
        ],
    },

];

export default routes;