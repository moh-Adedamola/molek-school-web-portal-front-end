import usePageTitle from '../hooks/usePageTitle.js';
import Galleries from "../components/Landingpage/Galleries.jsx";

const News = () => {
    usePageTitle('Gallery');
    return(
        <>
            <Galleries />
        </>
    )
}

export default News;