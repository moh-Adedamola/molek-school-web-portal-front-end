// File location: src/pages/website/admissions/Admissions.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, FileText, Users, Calendar, CheckCircle } from 'lucide-react';

const Admissions = () => {
  const admissionSteps = [
    {
      step: 1,
      title: "Application Form",
      description: "Complete and submit the online admission form with required documents",
      icon: FileText
    },
    {
      step: 2,
      title: "Entrance Examination",
      description: "Sit for the school entrance examination (for JSS 1 and SSS 1)",
      icon: GraduationCap
    },
    {
      step: 3,
      title: "Interview",
      description: "Attend an interview session with parents/guardians",
      icon: Users
    },
    {
      step: 4,
      title: "Admission Decision",
      description: "Receive admission decision and complete enrollment process",
      icon: CheckCircle
    }
  ];

  const requirements = [
    "Birth Certificate or Age Declaration",
    "Previous School Report Card",
    "Medical Certificate",
    "Passport Photographs (4 copies)",
    "Parent/Guardian ID Card"
  ];

  const admissionDates = [
    { period: "Application Period", date: "January - March" },
    { period: "Entrance Exam", date: "April" },
    { period: "Interviews", date: "May" },
    { period: "Admission Results", date: "June" },
    { period: "School Resumption", date: "September" }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <div className="hero-gradient text-white">
        <div className="container-max section-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
              Join Our Academic Community
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-neutral-200">
              We welcome students who are ready to excel academically and contribute positively to our school community.
            </p>
            <Link 
              to="/admissions/how-to-apply" 
              className="btn-accent inline-flex items-center px-8 py-3 rounded-lg font-semibold"
            >
              Start Application
            </Link>
          </div>
        </div>
      </div>

      {/* Admission Process Steps */}
      <section className="section-padding">
        <div className="container-max">
          <h2 className="text-3xl font-bold text-center mb-12 text-neutral-800">
            Admission Process
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {admissionSteps.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="card-base text-center">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-3 text-neutral-800">
                    {item.title}
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="bg-white py-16">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-8 text-neutral-800">
                Admission Requirements
              </h2>
              <div className="space-y-4">
                {requirements.map((requirement, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-secondary-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-neutral-700">{requirement}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-8 text-neutral-800">
                Important Dates
              </h3>
              <div className="space-y-4">
                {admissionDates.map((item, index) => (
                  <div key={index} className="card-base border-l-4 border-accent-600">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-neutral-800">{item.period}</span>
                      <span className="text-accent-700 font-medium">{item.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Class Information */}
      <section className="section-padding bg-neutral-50">
        <div className="container-max">
          <h2 className="text-3xl font-bold text-center mb-12 text-neutral-800">
            Available Classes
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card-base card-accent">
              <h3 className="text-xl font-bold mb-4 text-primary-800">
                Junior Secondary School (JSS 1-3)
              </h3>
              <p className="text-neutral-600 mb-4">
                Foundation years covering core subjects including Mathematics, English Language, 
                Basic Science, Social Studies, and more.
              </p>
              <div className="text-sm text-neutral-500">
                <p><strong>Age Range:</strong> 10-13 years</p>
                <p><strong>Duration:</strong> 3 years</p>
              </div>
            </div>
            
            <div className="card-base card-success">
              <h3 className="text-xl font-bold mb-4 text-secondary-800">
                Senior Secondary School (SSS 1-3)
              </h3>
              <p className="text-neutral-600 mb-4">
                Specialized education with focus on Science, Arts, or Commercial streams 
                preparing students for WAEC and NECO examinations.
              </p>
              <div className="text-sm text-neutral-500">
                <p><strong>Age Range:</strong> 13-16 years</p>
                <p><strong>Duration:</strong> 3 years</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary-800 text-white py-16">
        <div className="container-max text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Take the first step towards academic excellence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/admissions/how-to-apply" 
              className="btn-accent px-8 py-3 rounded-lg font-semibold"
            >
              How to Apply
            </Link>
            <Link 
              to="/contact" 
              className="btn-outline border-white text-white hover:bg-white hover:text-primary-800 px-8 py-3 rounded-lg font-semibold"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admissions;