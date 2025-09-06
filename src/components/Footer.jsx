import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-blue-900 text-white pt-12 pb-6 px-6 md:px-12 lg:px-24">
            {/* School Info */}
            <div className="mb-10 animate-fade-in">
                <h2 className="text-2xl font-bold">Molek Schools</h2>
                <p className="text-sm mt-2 text-gray-200">Excellence in Education</p>
                <p className="mt-4 max-w-xl text-gray-300">
                    Committed to providing quality secondary education following the Nigerian curriculum with focus on academic excellence, character development, and preparation for WAEC and NECO examinations.
                </p>
            </div>

            {/* Link Sections */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-sm text-gray-200 animate-fade-in">
                {/* Quick Links */}
                <div>
                    <h3 className="text-white font-semibold mb-2">Quick Links</h3>
                    <ul className="space-y-1">
                        <li><a href="/about" className="hover:text-green-400">About Us</a></li>
                        <li><a href="#academics" className="hover:text-green-400">Academics</a></li>
                        <li><a href="#admissions" className="hover:text-green-400">Admissions</a></li>
                        <li><a href="#news" className="hover:text-green-400">News & Events</a></li>
                        <li><a href="#gallery" className="hover:text-green-400">Gallery</a></li>
                        <li><a href="#contact" className="hover:text-green-400">Contact</a></li>
                    </ul>
                </div>

                {/* Academic Programs */}
                <div>
                    <h3 className="text-white font-semibold mb-2">Academic Programs</h3>
                    <ul className="space-y-1">
                        <li>JSS 1-3 Programs</li>
                        <li>SSS 1-3 Programs</li>
                        <li>WAEC Preparation</li>
                        <li>NECO Preparation</li>
                        <li>Academic Calendar</li>
                        <li>Tuition Fees</li>
                    </ul>
                </div>

                {/* Important Links */}
                <div>
                    <h3 className="text-white font-semibold mb-2">Important Links</h3>
                    <ul className="space-y-1">
                        <li>Admission Process</li>
                        <li>Staff Directory</li>
                        <li>School Handbook</li>
                        <li>Parent Portal</li>
                        <li>Teacher Portal</li>
                        <li>Emergency Contacts</li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-white font-semibold mb-2">Contact</h3>
                    <ul className="space-y-1">
                        <li>📞 +234 803 123 4567</li>
                        <li>📧 info@molekschools.edu.ng</li>
                        <li>📍 10 Haliru Mohammed Street, Ofatedo, Osogbo, Osun State</li>
                    </ul>

                    {/* Social Media Icons */}
                    <div className="mt-4 flex gap-4 text-white text-xl">
                        <a href="https://facebook.com/molekschools" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                            <FaFacebookF />
                        </a>
                        <a href="https://linkedin.com/company/molekschools" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
                            <FaLinkedinIn />
                        </a>
                        <a href="https://instagram.com/molekschools" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">
                            <FaInstagram />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-10 border-t border-gray-700 pt-4 text-xs text-gray-400 flex flex-col md:flex-row justify-between items-center animate-fade-in">
                <p>© 2025 Nigerian Secondary School. All rights reserved.</p>
                <div className="flex gap-4 mt-2 md:mt-0">
                    <a href="#" className="hover:text-orange-400">Privacy Policy</a>
                    <a href="#" className="hover:text-orange-400">Terms of Service</a>
                    <a href="#" className="hover:text-orange-400">Accessibility</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
