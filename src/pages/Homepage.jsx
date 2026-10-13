import usePageTitle from '../hooks/usePageTitle.js';
import Excellence from "../components/Landingpage/Excellence.jsx";
import WhyChooseUs from "../components/Landingpage/WhyChooseUs.jsx";
import LatestNews from "../components/Landingpage/LatestNews.jsx";
// import NewsLetterSubscribe from "../components/Landingpage/NewsLetterSubscribe.jsx";
// import WhatOurCommunitySays from "../components/Landingpage/WhatOurCommunitySays.jsx";
export default function Homepage(){
    usePageTitle(null);
    return(
        <>
            <Excellence />
            <LatestNews />

            <WhyChooseUs />
            {/* <WhatOurCommunitySays /> */}
            {/* <NewsLetterSubscribe /> */}
        </>
    )
}