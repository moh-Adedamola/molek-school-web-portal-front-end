import ContactInfo from "../components/Contacts/ContactInfo.jsx";
import Header from "../components/Landingpage/Header.jsx";
import DepartmentContacts from "../components/Contacts/DepartmentContacts.jsx";
import VisitInfo from "../components/Contacts/VisitInfo.jsx";
import Footer from "../components/Footer.jsx";

const ContactUs = () => {
    return(
        <>
            <Header />
            <ContactInfo />
            <DepartmentContacts />
            <VisitInfo />
            <Footer />
        </>
    )
}

export default ContactUs