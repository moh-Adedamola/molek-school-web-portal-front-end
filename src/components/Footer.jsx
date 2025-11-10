import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-[#1F3B6B] text-white pt-12 pb-6 px-6 md:px-12 lg:px-24">
            {/* Main Content: School Info + Contact Info side by side */}
            <div className="flex flex-col md:flex-row justify-between gap-10 mb-10 animate-fade-in">
                {/* School Info */}
                <div className="md:w-1/2">
                    <h2 className="text-2xl font-bold  text-blue-300">Molek Schools</h2>
                    <p className="mt-4 max-w-xl text-gray-300">
                        Committed to providing quality holistic education from Creche to Senior Secondary, 
                        combining Islamic values with academic excellence. Preparing students for success 
                        in WAEC, NECO, and beyond since 2007.
                    </p>
                </div>

                {/* Contact Info */}
                <div className="md:w-1/2">
                    <h3 className=" text-blue-300 font-semibold mb-2">Contact Us</h3>
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
                            <span>info@molekschool.com</span>
                        </li>
                    </ul>

                    {/* Social Media Icons */}
                    <div className="mt-4 flex gap-4 text-white text-xl">
                        <a 
                            href="https://facebook.com/molekschools" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="hover:text-[#3B82F6] transition-colors w-10 h-10 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-opacity-20"
                        >
                            <FaFacebookF />
                        </a>
                        <a 
                            href="https://twitter.com/molekschools" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="hover:text-[#3B82F6] transition-colors w-10 h-10 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-opacity-20"
                        >
                            <FaTwitter />
                        </a>
                        <a 
                            href="https://instagram.com/molekschools" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="hover:text-[#3B82F6] transition-colors w-10 h-10 bg-white bg-opacity-10 rounded-full flex items-center justify-center hover:bg-opacity-20"
                        >
                            <FaInstagram />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700 pt-4 text-xs text-gray-400 flex flex-col md:flex-row justify-between items-center animate-fade-in">
                <p>© {new Date().getFullYear()} MOLEK Schools. All rights reserved. | Founded 2007</p>
                <div className="flex gap-4 mt-2 md:mt-0">
                    <a href="#" className="hover:text-[#3B82F6] transition">Privacy Policy</a>
                    <a href="#" className="hover:text-[#3B82F6] transition">Terms of Service</a>
                    <a href="#" className="hover:text-[#3B82F6] transition">Accessibility</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;