import About from './pages/About';
import Homepage from "./pages/Homepage.jsx";
import Academics from "./pages/Academics.jsx"


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
    }

];

export default routes;
