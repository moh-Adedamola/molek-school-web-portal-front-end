import About from './pages/About';
import Homepage from "./pages/Homepage.jsx";
import Academics from "./pages/Academics.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Admissions from './pages/Admissions.jsx';
import Dashboard from "./components/Dashboard/Dashboard.jsx";


const routes = [
    {
        path: '/',
        element: <Homepage />,
    },
    {
        path: '/about',
        element: <About/>,
    },
     {
        path: '/admissions',
        element: <Admissions/>,
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
        path:'/dashboard',
        element: <Dashboard />,
    }

];

export default routes;
