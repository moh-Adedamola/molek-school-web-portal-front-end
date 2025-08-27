import { Link } from 'react-router-dom';
import { useState } from 'react';

const StaffDirectory = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  // Mock staff data
  const staffData = [
    // JSS Teachers
    { name: "Mrs. Funmilayo Adebayo", department: "JSS English", subject: "English Language", qualification: "B.A. English, M.Ed.", experience: "8 years" },
    { name: "Mr. Olumide Ogundimu", department: "JSS Mathematics", subject: "Mathematics", qualification: "B.Sc. Mathematics", experience: "6 years" },
    { name: "Mrs. Kemi Okafor", department: "JSS Science", subject: "Basic Science", qualification: "B.Sc. Biology, PGDE", experience: "7 years" },
    { name: "Mr. Tunde Adeyemi", department: "JSS Social Studies", subject: "Social Studies", qualification: "B.A. History", experience: "5 years" },
    
    // SSS Sciences
    { name: "Dr. Ibrahim Hassan", department: "SSS Sciences", subject: "Physics", qualification: "Ph.D. Physics", experience: "12 years" },
    { name: "Mrs. Grace Okoro", department: "SSS Sciences", subject: "Chemistry", qualification: "M.Sc. Chemistry", experience: "9 years" },
    { name: "Mr. David Oludare", department: "SSS Sciences", subject: "Biology", qualification: "B.Sc. Biology, M.Ed.", experience: "10 years" },
    { name: "Mrs. Folake Johnson", department: "SSS Sciences", subject: "Mathematics", qualification: "B.Sc. Mathematics", experience: "11 years" },
    
    // SSS Arts
    { name: "Mr. Chukwudi Eze", department: "SSS Arts", subject: "Literature", qualification: "M.A. Literature", experience: "8 years" },
    { name: "Mrs. Blessing Adamu", department: "SSS Arts", subject: "Government", qualification: "B.Sc. Political Science", experience: "7 years" },
    { name: "Mr. Sunday Okafor", department: "SSS Arts", subject: "History", qualification: "B.A. History, M.A.", experience: "9 years" },
    
    // SSS Commercial
    { name: "Mrs. Amina Yusuf", department: "SSS Commercial", subject: "Economics", qualification: "B.Sc. Economics", experience: "6 years" },
    { name: "Mr. Peter Okonkwo", department: "SSS Commercial", subject: "Accounting", qualification: "B.Sc. Accounting, ACA", experience: "10 years" },
    
    // Support Staff
    { name: "Mrs. Bola Adeyemi", department: "Administration", subject: "School Secretary", qualification: "OND Business Admin", experience: "15 years" },
    { name: "Mr. Joseph Onyeka", department: "Administration", subject: "Bursar", qualification: "B.Sc. Accounting", experience: "12 years" },
    { name: "Mrs. Fatima Mohammed", department: "Administration", subject: "Librarian", qualification: "B.L.I.S", experience: "8 years" }
  ];

  const departments = ['All', 'JSS English', 'JSS Mathematics', 'JSS Science', 'JSS Social Studies', 'SSS Sciences', 'SSS Arts', 'SSS Commercial', 'Administration'];

  const filteredStaff = selectedDepartment === 'All' 
    ? staffData 
    : staffData.filter(staff => staff.department === selectedDepartment);

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-neutral-100 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm">
            <Link to="/" className="text-primary-600 hover:text-primary-800">Home</Link>
            <span className="mx-2 text-neutral-500">/</span>
            <Link to="/about" className="text-primary-600 hover:text-primary-800">About</Link>
            <span className="mx-2 text-neutral-500">/</span>
            <span className="text-neutral-800">Staff Directory</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Staff Directory
          </h1>
          <p className="text-xl text-primary-200 max-w-2xl mx-auto">
            Meet our dedicated team of qualified educators and support staff
          </p>
        </div>
      </section>

      {/* Department Filter */}
      <section className="py-8 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedDepartment === dept
                    ? 'bg-primary-600 text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-primary-50'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Staff Grid */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-800 mb-4">
              Our Teaching Staff
            </h2>
            <p className="text-lg text-neutral-600">
              Qualified educators dedicated to student success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStaff.map((staff, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 border-l-4 border-primary-500">
                {/* Avatar Placeholder */}
                <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-primary-700">👨‍🏫</span>
                </div>
                
                {/* Staff Info */}
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-primary-800 mb-2">
                    {staff.name}
                  </h3>
                  <p className="text-sm font-medium text-secondary-600 mb-3">
                    {staff.subject}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="bg-primary-50 rounded-lg p-2">
                      <p className="text-xs font-semibold text-primary-800">Department</p>
                      <p className="text-xs text-primary-700">{staff.department}</p>
                    </div>
                    
                    <div className="bg-secondary-50 rounded-lg p-2">
                      <p className="text-xs font-semibold text-secondary-800">Qualification</p>
                      <p className="text-xs text-secondary-700">{staff.qualification}</p>
                    </div>
                    
                    <div className="bg-accent-50 rounded-lg p-2">
                      <p className="text-xs font-semibold text-accent-800">Experience</p>
                      <p className="text-xs text-accent-700">{staff.experience}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredStaff.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-neutral-600">No staff found in this department.</p>
            </div>
          )}
        </div>
      </section>

      {/* Staff Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-800 mb-4">
              Our Team at a Glance
            </h2>
            <p className="text-lg text-neutral-600">
              Professional qualifications and experience statistics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 text-center border-2 border-primary-200">
              <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">65</span>
              </div>
              <h3 className="text-2xl font-bold text-primary-600 mb-2">Total Staff</h3>
              <p className="text-sm text-primary-700">Teaching & Support</p>
            </div>

            <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-2xl p-6 text-center border-2 border-secondary-200">
              <div className="w-12 h-12 bg-secondary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">85%</span>
              </div>
              <h3 className="text-2xl font-bold text-secondary-600 mb-2">Degree Holders</h3>
              <p className="text-sm text-secondary-700">Bachelor's & Above</p>
            </div>

            <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-2xl p-6 text-center border-2 border-accent-200">
              <div className="w-12 h-12 bg-accent-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">8</span>
              </div>
              <h3 className="text-2xl font-bold text-accent-600 mb-2">Avg Experience</h3>
              <p className="text-sm text-accent-700">Years in Education</p>
            </div>

            <div className="bg-gradient-to-br from-primary-50 to-secondary-100 rounded-2xl p-6 text-center border-2 border-primary-200">
              <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">15</span>
              </div>
              <h3 className="text-2xl font-bold text-primary-600 mb-2">Departments</h3>
              <p className="text-sm text-primary-700">Subject Areas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Development */}
      <section className="py-16 bg-gradient-to-br from-neutral-50 to-primary-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-primary-800 mb-4">
                Professional Development
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-secondary-800 mb-4">
                  Continuous Learning
                </h3>
                <p className="text-neutral-700 mb-4 leading-relaxed">
                  Our staff engage in regular professional development to stay current with 
                  educational best practices, curriculum updates, and innovative teaching methods.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-neutral-700">
                    <span className="text-secondary-500 mr-2">✓</span>
                    Regular training workshops and seminars
                  </li>
                  <li className="flex items-center text-neutral-700">
                    <span className="text-secondary-500 mr-2">✓</span>
                    WAEC and NECO examination updates
                  </li>
                  <li className="flex items-center text-neutral-700">
                    <span className="text-secondary-500 mr-2">✓</span>
                    Technology integration training
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-accent-800 mb-4">
                  Qualifications & Certifications
                </h3>
                <p className="text-neutral-700 mb-4 leading-relaxed">
                  Our teachers hold relevant qualifications from recognized Nigerian institutions 
                  and many pursue advanced degrees and professional certifications.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center text-neutral-700">
                    <span className="text-accent-500 mr-2">✓</span>
                    Teaching Council of Nigeria (TRCN) registration
                  </li>
                  <li className="flex items-center text-neutral-700">
                    <span className="text-accent-500 mr-2">✓</span>
                    Subject-specific professional bodies
                  </li>
                  <li className="flex items-center text-neutral-700">
                    <span className="text-accent-500 mr-2">✓</span>
                    Ongoing postgraduate studies support
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Join Our Educational Family
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Experience the difference quality teaching makes in your child's education
          </p>
          <div className="space-x-4">
            <Link to="/admissions" className="btn-accent px-8 py-3 rounded-lg font-medium">
              Enroll Your Child
            </Link>
            <Link to="/contact" className="bg-white text-primary-700 px-8 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StaffDirectory;