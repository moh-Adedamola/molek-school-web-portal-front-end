import { Link } from 'react-router-dom';
import { Facebook, GraduationCap, House, Image, Mail, MapPin, Newspaper, Phone, Users } from 'lucide-react';

const quickLinks = [
    { name: 'Home', href: '/', icon: House },
    { name: 'About Us', href: '/about', icon: GraduationCap },
    { name: 'Admissions', href: '/admissions', icon: Users },
    { name: 'News & Events', href: '/news', icon: Newspaper },
    { name: 'Gallery', href: '/gallery', icon: Image },
];

const link = 'underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-white rounded';

const Footer = () => (
    <footer className="bg-[#103d8d] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-8">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <img src="/logo-160.webp" alt="" width="126" height="160" loading="lazy" className="h-14 w-auto object-contain bg-white rounded-lg p-1" />
                        <div>
                            <h2 className="text-xl font-bold">MOLEK Schools</h2>
                            <p className="text-blue-100 text-sm">Excellence in Islamic Education</p>
                        </div>
                    </div>
                    <p className="text-blue-50 leading-relaxed mb-4">
                        Committed to providing quality holistic education from Creche to Senior Secondary,
                        combining Islamic values with academic excellence since 2007.
                    </p>
                    <a href="https://facebook.com/molekschools" target="_blank" rel="noopener noreferrer" aria-label="MOLEK Schools on Facebook"
                        className={`inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#103d8d] ${link}`}>
                        <Facebook aria-hidden="true" className="h-5 w-5" />
                    </a>
                </div>

                <nav aria-label="Quick links">
                    <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                    <ul className="space-y-3">
                        {quickLinks.map(({ name, href, icon: Icon }) => (
                            <li key={name}>
                                <Link to={href} className={`inline-flex items-center gap-2 text-blue-50 ${link}`}>
                                    <Icon aria-hidden="true" className="h-4 w-4 text-[#F9D89C]" /> {name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="lg:col-span-2">
                    <h3 className="text-lg font-bold mb-4">Contact Us</h3>
                    <ul className="space-y-4 text-blue-50">
                        <li className="flex items-start gap-3">
                            <MapPin aria-hidden="true" className="mt-1 h-5 w-5 flex-shrink-0 text-[#F9D89C]" />
                            <div>
                                <p className="font-semibold text-white">Address</p>
                                <p>10 Haliru Muhammed Street, Off Old Osogbo-Ede Road, Ofatedo, Osun State</p>
                                <p className="text-sm text-blue-100 mt-1">P.O.Box 3302, Osogbo</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <Mail aria-hidden="true" className="mt-1 h-5 w-5 flex-shrink-0 text-[#F9D89C]" />
                            <div>
                                <p className="font-semibold text-white">Email</p>
                                <a href="mailto:info@molekschools.com" className={link}>info@molekschools.com</a>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <Phone aria-hidden="true" className="mt-1 h-5 w-5 flex-shrink-0 text-[#F9D89C]" />
                            <div>
                                <p className="font-semibold text-white">Phone</p>
                                <a href="tel:+2347066277945" className={link}>+234 706 627 7945</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-white/25 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-blue-50">
                <p className="text-center md:text-left">© {new Date().getFullYear()} MOLEK Schools. All rights reserved. | Founded 2007</p>
                <nav aria-label="Legal" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                    <Link to="/privacy" className={link}>Privacy Policy</Link>
                    <span aria-hidden="true" className="text-blue-200">•</span>
                    <Link to="/terms" className={link}>Terms of Service</Link>
                    <span aria-hidden="true" className="text-blue-200">•</span>
                    <Link to="/accessibility" className={link}>Accessibility</Link>
                </nav>
            </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-[#3B82F6] via-[#E85D5D] to-[#3B82F6]" aria-hidden="true" />
    </footer>
);

export default Footer;
