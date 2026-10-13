import usePageTitle from '../hooks/usePageTitle.js';
import AboutSchool from "../components/About/AboutSchool.jsx";
import GuidingPrinciples from "../components/About/GuidingPrinciples.jsx";
import SchoolHistory from "../components/About/SchoolHistory.jsx";
import StaffQualityWelfare from "../components/About/StaffQualityWelfare.jsx";

const About = () => {
    usePageTitle('About Us');
    return(
        <>
            <AboutSchool />
            <GuidingPrinciples />
            <SchoolHistory />
            <StaffQualityWelfare />
        </>

    )
}

export default About