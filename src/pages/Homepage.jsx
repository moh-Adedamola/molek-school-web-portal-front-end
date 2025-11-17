import Header from '../components/Landingpage/Header.jsx'
import Excellence from "../components/Landingpage/Excellence.jsx";
import WhyChooseUs from "../components/Landingpage/WhyChooseUs.jsx";
import Footer from "../components/Footer.jsx";
import LatestNews from "../components/Landingpage/LatestNews.jsx";
// import NewsLetterSubscribe from "../components/Landingpage/NewsLetterSubscribe.jsx";
// import WhatOurCommunitySays from "../components/Landingpage/WhatOurCommunitySays.jsx";
export default function Homepage(){
    return(
        <>
            <Header />
            <Excellence />
            <LatestNews />

            <WhyChooseUs />
            {/* <WhatOurCommunitySays /> */}
            {/* <NewsLetterSubscribe /> */}
            <Footer />
        </>
    )
}