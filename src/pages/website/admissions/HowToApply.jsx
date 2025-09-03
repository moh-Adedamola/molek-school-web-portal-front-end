// File location: src/pages/website/admissions/HowToApply.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, AlertCircle, Clock, MapPin, Phone } from 'lucide-react';
import AdmissionInquiryForm from '../../../components/forms/AdmissionInquiryForm';

const HowToApply = () => {
  const [activeTab, setActiveTab] = useState('jss');

  const applicationSteps = {
    jss: [
      {
        step: 1,
        title: "Download Application Form",
        description: "Download and print the JSS admission form or collect from school office",
        action: "Download Form",
        deadline: "Before March 31st"
      },
      {
        step: 2,
        title: "Complete Application",
        description: "Fill out all sections completely and attach required documents",
        action: "Submit Documents",
        deadline: "By April 15th"
      },
      {
        step: 3,
        title: "Entrance Examination",
        description: "Take the JSS entrance examination covering English, Mathematics, and General Knowledge",
        action: "Exam Date",
        deadline: "April 20th-22nd"
      },
      {
        step: 4,
        title: "Interview Process",
        description: "Attend interview with parents/guardians (shortlisted candidates only)",
        action: "Interview",
        deadline: "May 1st-5th"
      }
    ],
    sss: [
      {
        step: 1,
        title: "Submit JSS Certificate",
        description: "Provide JSS Certificate or BECE results with minimum 5 credits",
        action: "Document Review",
        deadline: "Before March 31st"
      },
      {
        step: 2,
        title: "Choose Stream",
        description: "Select from Science, Arts/Humanities, or Commercial stream",
        action: "Stream Selection",
        deadline: "With Application"
      },
      {
        step: 3,
        title: "Placement Test",
        description: "Take placement test in chosen stream subjects",
        action: "Subject Test",
        deadline: "April 25th-27th"
      },
      {
        step: 4,
        title: "Final Interview",
        description: "Meet with subject teachers and school counselor",
        action: "Assessment",
        deadline: "May 6th-10th"
      }
    ]
  };

  const requiredDocuments = [
    "Completed application form",
    "Birth certificate or age declaration",
    "Previous school report card/transcript",
    "Passport photographs (4 copies)",
    "Medical certificate of fitness",
    "Parent/Guardian valid ID",
    "School fees payment receipt (₦5,000 non-refundable application fee)"
  ];

  const importantNotes = [
    "All applications must be submitted before the deadline",
    "Late applications will not be considered",
    "Entrance examination is mandatory for new students",
    "Results will be communicated within 2 weeks",
    "Admission is subject to availability of space"
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-primary-800 text-white py-16">
        <div className="container-max">
          <h1 className="text-4xl font-bold mb-4">How to Apply</h1>
          <p className="text-primary-100 text-lg">
            Follow these simple steps to join our academic community
          </p>
        </div>
      </div>

      {/* Class Selection Tabs */}
      <section className="bg-white border-b">
        <div className="container-max">
          <div className="flex space-x-8 py-4">
            <button
              onClick={() => setActiveTab('jss')}
              className={`pb-4 px-2 border-b-2 font-semibold transition-colors ${
                activeTab === 'jss' 
                  ? 'border-primary-600 text-primary-600' 
                  : 'border-transparent text-neutral-600 hover:text-neutral-800'
              }`}
            >
              JSS Admission (Junior Secondary)
            </button>
            <button
              onClick={() => setActiveTab('sss')}
              className={`pb-4 px-2 border-b-2 font-semibold transition-colors ${
                activeTab === 'sss' 
                  ? 'border-primary-600 text-primary-600' 
                  : 'border-transparent text-neutral-600 hover:text-neutral-800'
              }`}
            >
              SSS Admission (Senior Secondary)
            </button>
          </div>
        </div>
      </section>

      {/* Application Steps */}
      <section className="section-padding">
        <div className="container-max">
          <h2 className="text-3xl font-bold mb-8 text-neutral-800">
            Application Steps for {activeTab.toUpperCase()}
          </h2>
          
          <div className="space-y-6 mb-12">
            {applicationSteps[activeTab].map((step, index) => (
              <div key={index} className="card-base">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex items-start mb-4 md:mb-0">
                    <div className="w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold mr-4 flex-shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-neutral-600 mb-2">{step.description}</p>
                      <div className="flex items-center text-sm text-accent-700">
                        <Clock className="w-4 h-4 mr-1" />
                        {step.deadline}
                      </div>
                    </div>
                  </div>
                  <div className="md:ml-4">
                    <span className="badge-info">{step.action}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Download Forms */}
          <div className="card-base card-accent mb-12">
            <h3 className="text-xl font-semibold mb-4 text-neutral-800">
              Download Application Forms
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <button className="btn-primary flex items-center justify-center px-6 py-3 rounded-lg">
                <Download className="w-5 h-5 mr-2" />
                JSS Application Form
              </button>
              <button className="btn-secondary flex items-center justify-center px-6 py-3 rounded-lg">
                <Download className="w-5 h-5 mr-2" />
                SSS Application Form
              </button>
            </div>
            <p className="text-sm text-neutral-600 mt-4">
              Forms are also available at the school administrative office during working hours.
            </p>
          </div>
        </div>
      </section>

      {/* Required Documents */}
      <section className="bg-white py-16">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-neutral-800">
                Required Documents
              </h2>
              <div className="space-y-3">
                {requiredDocuments.map((doc, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-neutral-700">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6 text-neutral-800">
                Important Notes
              </h2>
              <div className="space-y-4">
                {importantNotes.map((note, index) => (
                  <div key={index} className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-accent-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-neutral-700">{note}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Fee Information */}
      <section className="bg-accent-50 py-16">
        <div className="container-max">
          <div className="card-base text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-neutral-800">Application Fee</h3>
            <div className="text-4xl font-bold text-accent-700 mb-4">₦5,000</div>
            <p className="text-neutral-600 mb-6">
              Non-refundable application processing fee. Payment can be made at the school 
              bursary office or through bank transfer.
            </p>
            <div className="text-sm text-neutral-500">
              <p><strong>Bank:</strong> First Bank Nigeria</p>
              <p><strong>Account Name:</strong> Nigerian Secondary School</p>
              <p><strong>Account Number:</strong> 1234567890</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container-max">
          <h2 className="text-3xl font-bold text-center mb-12 text-neutral-800">
            Need Help with Your Application?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="font-semibold mb-2">Visit Our Office</h3>
              <p className="text-neutral-600 text-sm">
                123 Education Avenue<br />
                Lagos Island, Lagos State<br />
                Monday - Friday: 8:00 AM - 4:00 PM
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-secondary-600" />
              </div>
              <h3 className="font-semibold mb-2">Call Us</h3>
              <p className="text-neutral-600 text-sm">
                +234 803 123 4567<br />
                +234 806 789 0123<br />
                Available: 8:00 AM - 5:00 PM
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="font-semibold mb-2">Quick Inquiry</h3>
              <p className="text-neutral-600 text-sm">
                Send us a message using<br />
                the form below for<br />
                immediate assistance
              </p>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="max-w-2xl mx-auto">
            <AdmissionInquiryForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowToApply;