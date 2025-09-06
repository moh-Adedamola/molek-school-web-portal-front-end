import About from './pages/About';
import Homepage from "./pages/Homepage.jsx";


const routes = [
    {
        path: '/',
        element: <Homepage />,
    },
    {
        path: '/about',
        element: <About/>,
    }

];

export default routes;
