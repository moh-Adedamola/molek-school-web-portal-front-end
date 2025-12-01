import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { 
  MapPinIcon, 
  EnvelopeIcon, 
  PhoneIcon,
  AcademicCapIcon,
  HomeIcon,
  NewspaperIcon,
  PhotoIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'About Us', href: '/about', icon: AcademicCapIcon },
    { name: 'Admissions', href: '/admissions', icon: UserGroupIcon },
    { name: 'News & Events', href: '/news', icon: NewspaperIcon },
    { name: 'Gallery', href: '/gallery', icon: PhotoIcon },
  ];

  const socialLinks = [
    { 
      name: 'Facebook', 
      href: 'https://facebook.com/molekschools', 
      icon: FaFacebookF,
      color: '#1877F2' 
    },
    { 
      name: 'Twitter', 
      href: 'https://twitter.com/molekschools', 
      icon: FaTwitter,
      color: '#1DA1F2' 
    },
    { 
      name: 'Instagram', 
      href: 'https://instagram.com/molekschools', 
      icon: FaInstagram,
      color: '#E4405F' 
    },
    { 
      name: 'YouTube', 
      href: 'https://youtube.com/@molekschools', 
      icon: FaYoutube,
      color: '#FF0000' 
    },
  ];

  return (
    <footer className="relative bg-[#103d8d] text-white overflow-hidden">
      {/* Gradient Overlay Layer */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: 'linear-gradient(135deg, #1F3B6B 0%, #2563EB 50%, #103d8d 100%)'
        }}
      />
      
      {/* Decorative Background Blurs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-500/20 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            
            {/* Column 1: About School + Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/30 bg-white">
                  <img src="/logo.webp" alt="MOLEK Schools" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">MOLEK Schools</h2>
                  <p className="text-blue-200 text-xs">Excellence in Islamic Education</p>
                </div>
              </div>
              
              <p className="text-gray-200 text-sm leading-relaxed mb-4">
                Committed to providing quality holistic education from Creche to Senior Secondary, 
                combining Islamic values with academic excellence since 2007.
              </p>

              {/* Social Media */}
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.name}
                  >
                    <social.icon className="text-lg text-white group-hover:hidden transition-all" />
                    <social.icon 
                      className="text-lg hidden group-hover:block transition-all"
                      style={{ color: social.color }}
                    />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Column 2: Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <div className="w-1 h-5 bg-[#3B82F6] rounded-full" />
                Quick Links
              </h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="flex items-center gap-2 text-gray-200 hover:text-white transition-colors text-sm group"
                    >
                      <div className="p-1.5 rounded-lg bg-white/20 group-hover:bg-[#3B82F6] transition-colors">
                        <link.icon className="w-4 h-4" />
                      </div>
                      <span>{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Column 3 & 4: Contact Info (spans 2 columns) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <div className="w-1 h-5 bg-[#3B82F6] rounded-full" />
                Contact Us
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-200">
                  <div className="p-2 rounded-lg bg-white/20 mt-0.5 flex-shrink-0">
                    <MapPinIcon className="w-4 h-4 text-[#3B82F6]" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-white mb-0.5">Address</p>
                    <p>10 Haliru Muhammed Street, Off Old Osogbo-Ede Road, Ofatedo, Osun State</p>
                    <p className="text-xs text-gray-300 mt-1">P.O.Box 3302, Osogbo</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-gray-200">
                  <div className="p-2 rounded-lg bg-white/20 flex-shrink-0">
                    <EnvelopeIcon className="w-4 h-4 text-[#3B82F6]" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-white mb-0.5">Email</p>
                    <a href="mailto:info@molekschool.com" className="hover:text-[#3B82F6] transition-colors">
                      info@molekschool.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3 text-gray-200">
                  <div className="p-2 rounded-lg bg-white/20 flex-shrink-0">
                    <PhoneIcon className="w-4 h-4 text-[#3B82F6]" />
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-white mb-0.5">Phone</p>
                    <p>+234 706 627 7945</p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="border-t border-white/20 pt-6"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
              <div className="text-gray-200 text-center md:text-left">
                <p>© {new Date().getFullYear()} MOLEK Schools. All rights reserved. | Founded 2007</p>
              </div>
              <div className="flex flex-wrap justify-center gap-6 text-gray-200 text-sm">
                <a href="/privacy" className="hover:text-[#3B82F6] transition-colors">
                  Privacy Policy
                </a>
                <span className="text-gray-400">•</span>
                <a href="/terms" className="hover:text-[#3B82F6] transition-colors">
                  Terms of Service
                </a>
                <span className="text-gray-400">•</span>
                <a href="/accessibility" className="hover:text-[#3B82F6] transition-colors">
                  Accessibility
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Decorative Bottom Accent Bar */}
        <div className="h-1 bg-gradient-to-r from-[#3B82F6] via-[#E85D5D] to-[#3B82F6]" />
      </div>
    </footer>
  );
};

export default Footer;