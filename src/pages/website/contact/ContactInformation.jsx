// pages/website/contact/ContactInformation.jsx
import { Phone, Mail, MapPin, Clock, Users, Building, Globe, MessageCircle } from 'lucide-react';

const ContactInformation = () => {
  const mainContacts = [
    {
      department: "Principal's Office",
      name: "Dr. Adebayo Olatunde",
      position: "Principal",
      phone: "+234 806 123 4560",
      email: "principal@molekschool.edu.ng",
      office: "Administration Block, Ground Floor",
      hours: "Mon-Fri: 8:00 AM - 4:00 PM"
    },
    {
      department: "Vice Principal (Academic)",
      name: "Mrs. Funmi Adeyemi",
      position: "Vice Principal",
      phone: "+234 806 123 4561",
      email: "vp.academic@molekschool.edu.ng",
      office: "Administration Block, First Floor",
      hours: "Mon-Fri: 7:30 AM - 4:30 PM"
    },
    {
      department: "Vice Principal (Administration)",
      name: "Mr. Chukwuma Okoro",
      position: "Vice Principal",
      phone: "+234 806 123 4562",
      email: "vp.admin@molekschool.edu.ng",
      office: "Administration Block, First Floor",
      hours: "Mon-Fri: 7:30 AM - 4:30 PM"
    }
  ];

  const departmentContacts = [
    {
      icon: <Users className="text-primary-600" size={20} />,
      department: "Admissions Office",
      contact: "Mrs. Blessing Ogunde",
      phone: "+234 806 123 4563",
      email: "admissions@molekschool.edu.ng",
      location: "Reception Area",
      services: ["New student registration", "Transfer processes", "School tours", "Application inquiries"]
    },
    {
      icon: <Building className="text-secondary-600" size={20} />,
      department: "Accounts Office",
      contact: "Mr. Emmanuel Okafor",
      phone: "+234 806 123 4564",
      email: "accounts@molekschool.edu.ng",
      location: "Administration Block",
      services: ["Fee payments", "Financial inquiries", "Payment plans", "Receipts and records"]
    },
    {
      icon: <Globe className="text-accent-600" size={20} />,
      department: "Academic Affairs",
      contact: "Dr. Kemi Adesola",
      phone: "+234 806 123 4565",
      email: "academic@molekschool.edu.ng",
      location: "Academic Block",
      services: ["Student records", "Examination matters", "Academic counseling", "Curriculum inquiries"]
    },
    {
      icon: <MessageCircle className="text-purple-600" size={20} />,
      department: "Student Affairs",
      contact: "Mr. Tunde Alabi",
      phone: "+234 806 123 4566",
      email: "students@molekschool.edu.ng",
      location: "Student Center",
      services: ["Disciplinary matters", "Counseling services", "Extracurricular activities", "Student welfare"]
    }
  ];

  const emergencyContacts = [
    {
      title: "Medical Emergency",
      contact: "School Nurse - Mrs. Hauwa Ibrahim",
      phone: "+234 806 123 4567",
      available: "Mon-Fri: 7:00 AM - 5:00 PM"
    },
    {
      title: "Security Emergency",
      contact: "Head of Security - Mr. James Okon",
      phone: "+234 806 123 4568",
      available: "24/7 On-call"
    },
    {
      title: "After Hours Emergency",
      contact: "Duty Administrator",
      phone: "+234 806 123 4569",
      available: "Evenings, Weekends, Holidays"
    }
  ];

  const facilityInfo = {
    address: "123 Education Avenue, GRA Phase 2, Lagos State, Nigeria",
    coordinates: "6.5244° N, 3.3792° E",
    nearbyLandmarks: [
      "Lagos State Secretariat (2km)",
      "National Theatre (5km)",
      "Tafawa Balewa Square (3km)",
      "Lagos Island (8km)"
    ],
    publicTransport: [
      "BRT Bus Stop: Marina (1km)",
      "Taxi/Uber readily available",
      "Staff parking available on-site",
      "Student drop-off zone designated"
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50">
      {/* Header */}
      <div className="bg-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Contact Information</h1>
            <p className="text-xl text-primary-200 max-w-3xl mx-auto">
              Complete directory of school contacts, departments, and emergency information
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* Main Leadership Contacts */}
        <section>
          <h2 className="text-2xl font-bold text-neutral-800 mb-6">School Leadership</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {mainContacts.map((contact, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="text-primary-600" size={24} />
                  </div>
                  <h3 className="font-semibold text-lg text-neutral-800">{contact.name}</h3>
                  <p className="text-sm text-neutral-600">{contact.position}</p>
                  <p className="text-xs text-primary-600 font-medium">{contact.department}</p>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2">
                    <Phone size={14} className="text-neutral-500" />
                    <span>{contact.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail size={14} className="text-neutral-500" />
                    <span className="text-xs">{contact.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin size={14} className="text-neutral-500" />
                    <span className="text-xs">{contact.office}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock size={14} className="text-neutral-500" />
                    <span className="text-xs">{contact.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Department Contacts */}
        <section>
          <h2 className="text-2xl font-bold text-neutral-800 mb-6">Department Contacts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {departmentContacts.map((dept, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-3 mb-4">
                  {dept.icon}
                  <h3 className="font-semibold text-lg text-neutral-800">{dept.department}</h3>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div>
                    <p className="font-medium text-neutral-700">{dept.contact}</p>
                    <p className="text-sm text-neutral-600">{dept.location}</p>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Phone size={14} className="text-neutral-500" />
                      <span>{dept.phone}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Mail size={14} className="text-neutral-500" />
                      <span className="text-xs">{dept.email}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-neutral-700 mb-2">Services:</p>
                  <ul className="text-xs text-neutral-600 space-y-1">
                    {dept.services.map((service, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <span className="w-1 h-1 bg-primary-600 rounded-full"></span>
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Emergency Contacts */}
        <section>
          <h2 className="text-2xl font-bold text-neutral-800 mb-6">Emergency Contacts</h2>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Phone className="text-red-600" size={20} />
              <h3 className="font-semibold text-red-800">Emergency Numbers</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {emergencyContacts.map((emergency, index) => (
                <div key={index} className="bg-white rounded-lg p-4">
                  <h4 className="font-medium text-neutral-800 mb-2">{emergency.title}</h4>
                  <p className="text-sm text-neutral-700 mb-1">{emergency.contact}</p>
                  <p className="text-sm font-semibold text-red-600 mb-1">{emergency.phone}</p>
                  <p className="text-xs text-neutral-600">{emergency.available}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location & Access Information */}
        <section>
          <h2 className="text-2xl font-bold text-neutral-800 mb-6">Location & Access</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Address & Coordinates */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-2 mb-4">
                <MapPin className="text-primary-600" size={20} />
                <h3 className="font-semibold text-neutral-800">School Address</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-neutral-700 mb-2">{facilityInfo.address}</p>
                  <p className="text-sm text-neutral-600">Coordinates: {facilityInfo.coordinates}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-neutral-700 mb-2">Nearby Landmarks:</h4>
                  <ul className="text-sm text-neutral-600 space-y-1">
                    {facilityInfo.nearbyLandmarks.map((landmark, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <span className="w-1 h-1 bg-primary-600 rounded-full"></span>
                        <span>{landmark}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Transportation */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Building className="text-secondary-600" size={20} />
                <h3 className="font-semibold text-neutral-800">Transportation</h3>
              </div>
              
              <div>
                <h4 className="font-medium text-neutral-700 mb-2">Getting Here:</h4>
                <ul className="text-sm text-neutral-600 space-y-1">
                  {facilityInfo.publicTransport.map((transport, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <span className="w-1 h-1 bg-secondary-600 rounded-full"></span>
                      <span>{transport}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Office Hours */}
        <section>
          <div className="bg-gradient-to-r from-accent-50 to-primary-50 rounded-lg p-6">
            <div className="text-center">
              <Clock className="mx-auto text-accent-600 mb-3" size={32} />
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">General Office Hours</h3>
              <div className="text-neutral-700 space-y-1">
                <p><strong>Monday - Friday:</strong> 7:00 AM - 4:00 PM</p>
                <p><strong>Saturday:</strong> 8:00 AM - 12:00 PM</p>
                <p><strong>Sunday:</strong> Closed</p>
              </div>
              <p className="text-sm text-neutral-600 mt-3">
                For emergencies outside office hours, please contact our emergency line
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactInformation;