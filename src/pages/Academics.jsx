import AcademicOverview from "../components/Academics/AcademicOverview.jsx";
import SubjectsList from "../components/Academics/SubjectsList.jsx";
import Header from "../components/Landingpage/Header.jsx";
import Footer from "../components/Footer.jsx";

const Academics = () => {
    return(
        <>
            <Header />
            <AcademicOverview />
            <SubjectsList />
            <Footer />
        </>
    )
}

export default Academics