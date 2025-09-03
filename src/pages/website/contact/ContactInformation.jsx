// File location: src/pages/website/contact/ContactInformation.jsx

import React from 'react';
import { MapPin, Phone, Mail, Clock, Users, Building2, Shield, Bus } from 'lucide-react';

const ContactInformation = () => {
  const officeLocations = [
    {
      name: "Main Administrative Office",
      address: "Ground Floor, Administrative Block",
      hours: "Monday - Friday: 8:00 AM - 5:00 PM",
      contact: "+234 803 123 4567",
      services: ["General Inquiries", "Student Registration", "Document Collection"]
    },
    {
      name: "Principal's Office",
      address: "First Floor, Administrative Block",
      hours: "Monday - Friday: 9:00 AM - 4:00 PM",
      contact: "+234 803 123 4567 ext. 101",
      services: ["Academic Meetings", "Disciplinary Matters", "Parent Conferences"]
    },
    {
      name: "Admissions Office",
      address: "Ground Floor, Administrative Block",
      hours: "Monday - Saturday: 8:00 AM - 4:00 PM",
      contact: "+234 806 789 0123",
      services: ["New Admissions", "Transfer Students", "Entrance Exams"]
    },
    {
      name: "Accounts/Bursary Office",
      address: "Ground Floor, Administrative Block",
      hours: "Monday - Friday: 8:00 AM - 3:00 PM",
      contact: "+234 809 456 7890",
      services: ["School Fees", "Financial Aid", "Payment Issues"]
    }
  ];

  const keyPersonnel = [
    {
      position: "Principal",
      name: "Dr. Adebayo Johnson",
      email: "principal@nss.edu.ng",
      phone: "+234 803 123 4567",
      office: "Principal's Office, First Floor"
    },
    {
      position: "Vice Principal (Academic)",
      name: "Mrs. Funmilayo Okafor",
      email: "vpacademic@nss.edu.ng",
      phone: "+234 806 789 0123",
      office: "VP Academic Office, First Floor"
    },
    {
      position: "Vice Principal (Administration)",
      name: "Mr. Ibrahim Yakubu",
      email: "vpadmin@nss.edu.ng",
      phone: "+234 809 456 7890",
      office: "VP Admin Office, First Floor"
    },
    {
      position: "Admissions Coordinator",
      name: "Mrs. Grace Okoro",
      email: "admissions@nss.edu.ng",
      phone: "+234 803 654 3210",
      office: "Admissions Office, Ground Floor"
    }
  ];

  const emergencyContacts = [
    {
      type: "Medical Emergency",
      contact: "+234 809 456 7890",
      description: "School nurse and medical emergency response team",
      hours: "During school hours"
    },
    {
      type: "Security Emergency",
      contact: "+234 803 987 6543",
      description: "School security and safety incidents",
      hours: "24/7"
    },
    {
      type: "Student Crisis Line",
      contact: "+234 806 111 2222",
      description: "Student counseling and crisis support",
      hours: "24/7"
    }
  ];

  const facilityServices = [
    {
      name: "Library",
      icon: Building2,
      contact: "+234 803 123 4567 ext. 201",
      hours: "Mon-Fri: 8AM-6PM, Sat: 9AM-2PM",
      location: "Academic Block, Second Floor"
    },
    {
      name: "Laboratory Services",
      icon: Building2,
      contact: "+234 803 123 4567 ext. 301",
      hours: "Mon-Fri: 8AM-5PM",
      location: "Science Block"
    },
    {
      name: "Guidance Counseling",
      icon: Users,
      contact: "+234 806 333 4444",
      hours: "Mon-Fri: 8AM-4PM",
      location: "Student Affairs Building"
    },
    {
      name: "Transportation",
      icon: Bus,
      contact: "+234 809 777 8888",
      hours: "Mon-Fri: 6AM-6PM",
      location: "Transport Coordinator Office"
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-primary-800 text-white py-16">
        <div className="container-max">
          <h1 className="text-4xl font-bold mb-4">Contact Information</h1>
          <p className="text-primary-100 text-lg">
            Comprehensive contact details for all school departments and services
          </p>
        </div>
      </div>

      {/* Main Contact Info */}
      <section className="py-16">
        <div className="container-max">
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-8 text-neutral-800">School Address</h2>
              <div className="card-base">
                <div className="flex items-start mb-6">
                  <MapPin className="w-6 h-6 text-primary-600 mt-1 mr-4" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Nigerian Secondary School</h3>
                    <div className="text-neutral-600 space-y-1">
                      <p>123 Education Avenue</p>
                      <p>Lagos Island, Lagos State</p>
                      <p>Nigeria</p>
                      <p className="mt-3 font-medium">Postal Code: 101001</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-neutral-200">
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-secondary-600 mt-1 mr-3" />
                    <div>
                      <p className="font-medium">Main Line</p>
                      <p className="text-neutral-600">+234 803 123 4567</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 text-accent-600 mt-1 mr-3" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-neutral-600">info@nss.edu.ng</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-8 text-neutral-800">Office Hours</h2>
              <div className="space-y-4">
                <div className="card-base">
                  <div className="flex items-center mb-3">
                    <Clock className="w-5 h-5 text-primary-600 mr-3" />
                    <h3 className="font-semibold">Regular Hours</h3>
                  </div>
                  <div className="space-y-2 text-sm text-neutral-600">
                    <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
                    <p>Saturday: 9:00 AM - 2:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
                
                <div className="card-base border-l-4 border-accent-600">
                  <h3 className="font-semibold mb-2">Lunch Break</h3>
                  <p className="text-sm text-neutral-600">1:00 PM - 2:00 PM (Limited services)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="bg-white py-16">
        <div className="container-max">
          <h2 className="text-3xl font-bold mb-12 text-center text-neutral-800">
            Office Locations & Services
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {officeLocations.map((office, index) => (
              <div key={index} className="card-base">
                <div className="flex items-start mb-4">
                  <Building2 className="w-6 h-6 text-primary-600 mt-1 mr-3" />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 text-neutral-800">
                      {office.name}
                    </h3>
                    <p className="text-neutral-600 mb-2">{office.address}</p>
                    <div className="flex items-center text-sm text-neutral-500 mb-3">
                      <Clock className="w-4 h-4 mr-2" />
                      {office.hours}
                    </div>
                    <div className="flex items-center text-sm text-neutral-500 mb-4">
                      <Phone className="w-4 h-4 mr-2" />
                      {office.contact}
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-neutral-800">Services:</h4>
                  <div className="flex flex-wrap gap-2">
                    {office.services.map((service, idx) => (
                      <span key={idx} className="badge-info text-xs">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Personnel */}
      <section className="py-16">
        <div className="container-max">
          <h2 className="text-3xl font-bold mb-12 text-center text-neutral-800">
            Key Personnel
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {keyPersonnel.map((person, index) => (
              <div key={index} className="card-base">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-neutral-800 mb-1">
                      {person.name}
                    </h3>
                    <p className="text-primary-600 font-medium mb-3">{person.position}</p>
                    <div className="space-y-2 text-sm text-neutral-600">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        <a href={`mailto:${person.email}`} className="hover:text-primary-600">
                          {person.email}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        <a href={`tel:${person.phone}`} className="hover:text-primary-600">
                          {person.phone}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{person.office}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility Services */}
      <section className="bg-white py-16">
        <div className="container-max">
          <h2 className="text-3xl font-bold mb-12 text-center text-neutral-800">
            Facility Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilityServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="card-base text-center">
                  <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-secondary-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-neutral-800">
                    {service.name}
                  </h3>
                  <p className="text-sm text-neutral-600 mb-2">{service.location}</p>
                  <p className="text-sm text-neutral-500 mb-2">{service.hours}</p>
                  <p className="text-sm text-primary-600">{service.contact}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="bg-error/5 py-16">
        <div className="container-max">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-error" />
            </div>
            <h2 className="text-3xl font-bold text-neutral-800 mb-4">
              Emergency Contacts
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              For urgent situations requiring immediate assistance during or after school hours
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {emergencyContacts.map((emergency, index) => (
              <div key={index} className="card-base border-l-4 border-error">
                <h3 className="text-lg font-semibold mb-2 text-error">
                  {emergency.type}
                </h3>
                <div className="text-2xl font-bold text-neutral-800 mb-2">
                  {emergency.contact}
                </div>
                <p className="text-sm text-neutral-600 mb-2">
                  {emergency.description}
                </p>
                <div className="text-sm text-neutral-500">
                  <strong>Available:</strong> {emergency.hours}
                </div>
              </div>
            ))}
          </div>
          
          <div className="card-base max-w-2xl mx-auto mt-8 text-center">
            <h3 className="text-lg font-semibold mb-4 text-neutral-800">
              General Emergency Protocol
            </h3>
            <p className="text-sm text-neutral-600 mb-4">
              For life-threatening emergencies, call <strong>199</strong> (Police) or <strong>199</strong> (Ambulance) first, 
              then contact the school emergency line.
            </p>
            <div className="text-primary-600 font-medium">
              School Emergency Hotline: +234 809 456 7890
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactInformation;