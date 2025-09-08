import About from './pages/About';
import Homepage from "./pages/Homepage.jsx";
import Academics from "./pages/Academics.jsx"
import ContactUs from "./pages/ContactUs.jsx";


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
        path: '/academics',
        element: <Academics />,
    },
    {
        path: '/contact',
        element: <ContactUs />,
    }

];

export default routes;
