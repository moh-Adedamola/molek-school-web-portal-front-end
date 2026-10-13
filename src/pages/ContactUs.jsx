import usePageTitle from '../hooks/usePageTitle.js';
import ContactInfo from "../components/Contacts/ContactInfo.jsx";
import VisitInfo from "../components/Contacts/VisitInfo.jsx";

const ContactUs = () => {
    usePageTitle('Contact');
    return(
        <>
            <ContactInfo />
            <VisitInfo />
        </>
    )
}

export default ContactUs