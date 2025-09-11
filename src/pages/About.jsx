import Footer from "../components/Footer.jsx";
import Header from "../components/Landingpage/Header.jsx";
import AboutSchool from "../components/About/AboutSchool.jsx";
import GuidingPrinciples from "../components/About/GuidingPrinciples.jsx";
import SchoolHistory from "../components/About/SchoolHistory.jsx";
import StaffQualityWelfare from "../components/About/StaffQualityWelfare.jsx";

const About = () => {
    return(
        <>
            <Header />
            <AboutSchool />
            <GuidingPrinciples />
            <SchoolHistory />
            <StaffQualityWelfare />
            <Footer />
        </>

    )
}

export default About