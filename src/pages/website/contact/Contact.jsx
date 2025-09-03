// File location: src/pages/website/contact/Contact.jsx

import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react';
import ContactForm from '../../../components/forms/ContactForm';

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "School Address",
      details: [
        "123 Education Avenue",
        "Lagos Island, Lagos State",
        "Nigeria"
      ],
      color: "primary"
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      details: [
        "+234 803 123 4567 (Main Office)",
        "+234 806 789 0123 (Admissions)",
        "+234 809 456 7890 (Emergency)"
      ],
      color: "secondary"
    },
    {
      icon: Mail,
      title: "Email Addresses",
      details: [
        "info@nigeriansecondarschool.edu.ng",
        "admissions@nss.edu.ng",
        "principal@nss.edu.ng"
      ],
      color: "accent"
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: [
        "Monday - Friday: 8:00 AM - 5:00 PM",
        "Saturday: 9:00 AM - 2:00 PM",
        "Sunday: Closed"
      ],
      color: "primary"
    }
  ];

  const departments = [
    { name: "Principal's Office", phone: "+234 803 123 4567", email: "principal@nss.edu.ng" },
    { name: "Vice Principal Academic", phone: "+234 806 789 0123", email: "vpacademic@nss.edu.ng" },
    { name: "Vice Principal Administration", phone: "+234 809 456 7890", email: "vpadmin@nss.edu.ng" },
    { name: "Admissions Office", phone: "+234 803 654 3210", email: "admissions@nss.edu.ng" },
    { name: "Accounts/Bursary", phone: "+234 806 321 0987", email: "accounts@nss.edu.ng" },
    { name: "Student Affairs", phone: "+234 809 876 5432", email: "students@nss.edu.ng" }
  ];

  const ColorIcon = ({ icon: Icon, color }) => {
    const colorClasses = {
      primary: "bg-primary-100 text-primary-600",
      secondary: "bg-secondary-100 text-secondary-600",
      accent: "bg-accent-100 text-accent-600"
    };
    
    return (
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClasses[color]}`}>
        <Icon className="w-6 h-6" />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="hero-gradient text-white">
        <div className="container-max section-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              We're here to help with any questions about our school, admissions process, or academic programs.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Contact Info */}
      <section className="py-16">
        <div className="container-max">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactInfo.map((info, index) => (
              <div key={index} className="card-base text-center">
                <ColorIcon icon={info.icon} color={info.color} />
                <h3 className="text-lg font-semibold mt-4 mb-3 text-neutral-800">
                  {info.title}
                </h3>
                <div className="space-y-1">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-sm text-neutral-600">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="pb-16">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="flex items-center mb-6">
                <MessageSquare className="w-6 h-6 text-primary-600 mr-3" />
                <h2 className="text-3xl font-bold text-neutral-800">Send us a Message</h2>
              </div>
              <p className="text-neutral-600 mb-8">
                Have a question or need more information? Fill out the form below and we'll get back to you within 24 hours.
              </p>
              <ContactForm />
            </div>

            {/* Map Placeholder & Directions */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-neutral-800">Find Us</h2>
              
              {/* Map Placeholder */}
              <div className="bg-neutral-200 rounded-lg h-64 mb-6 flex items-center justify-center">
                <div className="text-center text-neutral-500">
                  <MapPin className="w-12 h-12 mx-auto mb-2" />
                  <p>Interactive Map</p>
                  <p className="text-sm">123 Education Avenue, Lagos Island</p>
                </div>
              </div>

              {/* Directions */}
              <div className="card-base">
                <h3 className="text-xl font-semibold mb-4 text-neutral-800">Getting Here</h3>
                <div className="space-y-3 text-sm text-neutral-600">
                  <div>
                    <strong className="text-neutral-800">By Bus:</strong>
                    <p>Take BRT to Lagos Island Terminal, then board a local bus to Education Avenue.</p>
                  </div>
                  <div>
                    <strong className="text-neutral-800">By Car:</strong>
                    <p>From Victoria Island, take Eko Bridge to Lagos Island. The school is 5 minutes from the bridge.</p>
                  </div>
                  <div>
                    <strong className="text-neutral-800">Landmarks:</strong>
                    <p>Opposite National Museum, near Tafawa Balewa Square.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Department Contacts */}
      <section className="bg-white py-16">
        <div className="container-max">
          <h2 className="text-3xl font-bold text-center mb-12 text-neutral-800">
            Department Contacts
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departments.map((dept, index) => (
              <div key={index} className="card-base">
                <h3 className="font-semibold text-lg mb-3 text-neutral-800">
                  {dept.name}
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-neutral-600">
                    <Phone className="w-4 h-4 mr-2" />
                    <a href={`tel:${dept.phone}`} className="hover:text-primary-600">
                      {dept.phone}
                    </a>
                  </div>
                  <div className="flex items-center text-neutral-600">
                    <Mail className="w-4 h-4 mr-2" />
                    <a href={`mailto:${dept.email}`} className="hover:text-primary-600">
                      {dept.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="bg-error/10 py-12">
        <div className="container-max">
          <div className="card-base border-l-4 border-error max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-bold mb-4 text-error">Emergency Contact</h3>
            <p className="text-neutral-600 mb-4">
              For urgent matters outside office hours, please contact our emergency line:
            </p>
            <div className="text-2xl font-bold text-error">+234 809 456 7890</div>
            <p className="text-sm text-neutral-500 mt-2">Available 24/7 for student emergencies</p>
          </div>
        </div>
      </section>

      {/* School Hours Notice */}
      <section className="bg-primary-800 text-white py-12">
        <div className="container-max text-center">
          <h3 className="text-2xl font-bold mb-4">Visit During School Hours</h3>
          <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
            We welcome visitors during our office hours. For the safety and security of our students, 
            all visitors must report to the main office upon arrival.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-white/10 rounded-lg px-6 py-3">
              <strong>Weekdays:</strong> 8:00 AM - 5:00 PM
            </div>
            <div className="bg-white/10 rounded-lg px-6 py-3">
              <strong>Saturdays:</strong> 9:00 AM - 2:00 PM
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;