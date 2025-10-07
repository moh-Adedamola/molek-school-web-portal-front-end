import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-blue-900 text-white pt-12 pb-6 px-6 md:px-12 lg:px-24">
            {/* School Info */}
            <div className="mb-10 animate-fade-in">
                <h2 className="text-2xl font-bold">Molek Schools</h2>
                <p className="text-sm mt-2 text-gray-200">Building GOD-FEARING Future Leaders</p>
                <p className="mt-4 max-w-xl text-gray-300">
                    Committed to providing quality holistic education from Creche to Senior Secondary, 
                    combining Islamic values with academic excellence. Preparing students for success 
                    in WAEC, NECO, and beyond since 2007.
                </p>
            </div>

            {/* Link Sections */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-sm text-gray-200 animate-fade-in">
                {/* Quick Links */}
                <div>
                    <h3 className="text-white font-semibold mb-2">Quick Links</h3>
                    <ul className="space-y-1">
                        <li><a href="/about" className="hover:text-green-400">About Us</a></li>
                        <li><a href="/academics" className="hover:text-green-400">Academics</a></li>
                        <li><a href="/admissions" className="hover:text-green-400">Admissions</a></li>
                        <li><a href="#news" className="hover:text-green-400">News & Events</a></li>
                        <li><a href="#gallery" className="hover:text-green-400">Gallery</a></li>
                        <li><a href="/contact" className="hover:text-green-400">Contact</a></li>
                    </ul>
                </div>

                 {/* Our Sections */}
                <div>
                    <h3 className="text-white font-semibold mb-2">Our Sections</h3>
                    <ul className="space-y-1">
                        <li>Creche (Day Care)</li>
                        <li>Nursery & Kindergarten</li>
                        <li>Primary (Stage 1-5)</li>
                        <li>Junior Secondary (JSS 1-3)</li>
                        <li>Senior Secondary (SSS 1-3)</li>
                        <li>Vocational/Skill Acquisition</li>
                    </ul>
                </div>

                {/* Academic Excellence */}
                <div>
                    <h3 className="text-white font-semibold mb-2">Academic Programs</h3>
                    <ul className="space-y-1">
                        <li>WAEC Preparation</li>
                        <li>NECO/BECE Preparation</li>
                        <li>Arabic Studies</li>
                        <li>Islamic Studies</li>
                        <li>Quran Memorization</li>
                        <li>Montessori-Inspired Learning</li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-white font-semibold mb-2">Contact Us</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                            <span>📍</span>
                            <span>10 Haliru Muhammed Street, Off Old Osogbo-Ede Road, Ofatedo, Osun State</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span>📮</span>
                            <span>P.O.Box 3302, Osogbo</span>
                        </li>
                        
                        <li className="flex items-start gap-2">
                            <span>📧</span>
                            <span>info@molekschools.com</span>
                        </li>
                    </ul>

                    {/* Social Media Icons */}
                    <div className="mt-4 flex gap-4 text-white text-xl">
                        <a href="https://facebook.com/molekschools" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                            <FaFacebookF />
                        </a>
                        <a href="https://twitter.com/molekschools" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 transition">
                            <FaTwitter />
                        </a>
                        <a href="https://instagram.com/molekschools" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">
                            <FaInstagram />
                        </a>
                    </div>
                </div>
            </div>
            {/* Bottom Bar */}
            <div className="mt-10 border-t border-gray-700 pt-4 text-xs text-gray-400 flex flex-col md:flex-row justify-between items-center animate-fade-in">
                <p>© {new Date().getFullYear()} MOLEK Schools. All rights reserved. | Founded 2007</p>
                <div className="flex gap-4 mt-2 md:mt-0">
                    <a href="#" className="hover:text-green-400 transition">Privacy Policy</a>
                    <a href="#" className="hover:text-green-400 transition">Terms of Service</a>
                    <a href="#" className="hover:text-green-400 transition">Accessibility</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
