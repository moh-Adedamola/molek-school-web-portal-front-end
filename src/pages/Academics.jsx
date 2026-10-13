import usePageTitle from '../hooks/usePageTitle.js';
import AcademicOverview from "../components/Academics/AcademicOverview.jsx";
import SubjectsList from "../components/Academics/SubjectsList.jsx";

const Academics = () => {
    usePageTitle('Academics');
    return(
        <>
            <AcademicOverview />
            <SubjectsList />
        </>
    )
}

export default Academics