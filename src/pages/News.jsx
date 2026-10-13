import usePageTitle from '../hooks/usePageTitle.js';
import NewsAndEvents from "../components/Landingpage/NewsAndEvents.jsx";

const News = () => {
    usePageTitle('News & Events');
    return(
        <>
            <NewsAndEvents />
        </>
    )
}

export default News;