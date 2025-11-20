import About from './pages/About';
import Homepage from "./pages/Homepage.jsx";
import Academics from "./pages/Academics.jsx";
import ContactUs from "./pages/ContactUs.jsx";
import Admissions from './pages/Admissions.jsx';
import News from "./pages/News.jsx"
import Gallery from "./pages/Gallery.jsx";
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
        path: '/news',
        element: <News />,
    },
    {
        path: '/gallery',
        element: <Gallery />,
    }

];

export default routes;