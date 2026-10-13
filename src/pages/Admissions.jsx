import usePageTitle from '../hooks/usePageTitle.js';
import AdmissionRequirements from "../components/Admissions/AdmissionRequirements.jsx";

const Admissions = () => {
    usePageTitle('Admissions');
    return(
        <>
            <AdmissionRequirements />
        </>
    )
}

export default Admissions