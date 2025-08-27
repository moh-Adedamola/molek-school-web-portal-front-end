import { Link } from 'react-router-dom';
import { useWebsiteContent } from '../../../context/WebsiteContentContext';

const Leadership = () => {
  const { content } = useWebsiteContent();

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
            <span className="text-neutral-800">Leadership</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Leadership Team
          </h1>
          <p className="text-xl text-primary-200 max-w-2xl mx-auto">
            Meet the dedicated leaders guiding {content.school.name} towards excellence
          </p>
        </div>
      </section>

      {/* Leadership Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-800 mb-4">
              Our Leadership
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Experienced educators and administrators committed to student success
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {content.leadership.map((leader, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden border border-neutral-200">
                {/* Profile Image Placeholder */}
                <div className="bg-gradient-to-br from-primary-100 to-secondary-100 h-64 flex items-center justify-center">
                  <div className="w-32 h-32 bg-primary-200 rounded-full flex items-center justify-center">
                    <span className="text-4xl text-primary-700">👨‍💼</span>
                  </div>
                </div>
                
                {/* Profile Info */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-primary-800 mb-2">
                    {leader.name}
                  </h3>
                  <p className="text-lg font-semibold text-secondary-600 mb-3">
                    {leader.position}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="bg-primary-50 rounded-lg p-3">
                      <h4 className="text-sm font-semibold text-primary-800 mb-1">
                        Qualification
                      </h4>
                      <p className="text-sm text-primary-700">
                        {leader.qualification}
                      </p>
                    </div>
                    
                    <div className="bg-secondary-50 rounded-lg p-3">
                      <h4 className="text-sm font-semibold text-secondary-800 mb-1">
                        Experience
                      </h4>
                      <p className="text-sm text-secondary-700">
                        {leader.experience} in educational leadership
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Message */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-primary-800 mb-4">
                Message from Leadership
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"></div>
            </div>
            
            <div className="prose prose-lg max-w-none text-center">
              <p className="text-xl text-neutral-700 leading-relaxed mb-6">
                "At {content.school.name}, we believe that every student has the potential for greatness. 
                Our leadership team is committed to creating an environment where academic excellence, 
                character development, and innovation thrive together."
              </p>
              
              <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                "We work tirelessly to ensure that our JSS and SSS programs not only prepare students 
                for WAEC and NECO examinations but also equip them with the skills and values needed 
                to succeed in an ever-changing world. Our door is always open to students, parents, 
                and the community as we work together towards educational excellence."
              </p>
              
              <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-6 text-white">
                <p className="text-lg font-semibold">
                  Together, we are shaping the leaders of tomorrow.
                </p>
                <p className="text-sm mt-2 opacity-90">
                  - The Leadership Team, {content.school.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Principles */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-800 mb-4">
              Our Leadership Principles
            </h2>
            <p className="text-lg text-neutral-600">
              The core principles that guide our leadership approach
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Servant Leadership", description: "Leading by serving our students, staff, and community", icon: "🤝" },
              { title: "Transparency", description: "Open communication and accountability in all our actions", icon: "🔍" },
              { title: "Innovation", description: "Embracing change and continuous improvement in education", icon: "💡" },
              { title: "Excellence", description: "Setting high standards and achieving outstanding results", icon: "⭐" }
            ].map((principle, index) => (
              <div key={index} className="bg-gradient-to-br from-neutral-50 to-primary-50 rounded-2xl p-6 text-center border border-primary-200 hover:shadow-lg transition-shadow duration-200">
                <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">{principle.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-primary-800 mb-3">
                  {principle.title}
                </h3>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-secondary-600 to-accent-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Experience Leadership Excellence
          </h2>
          <p className="text-xl text-secondary-100 mb-8">
            Join a school where strong leadership drives exceptional results
          </p>
          <div className="space-x-4">
            <Link to="/admissions" className="bg-white text-secondary-700 px-8 py-3 rounded-lg font-medium hover:bg-secondary-50 transition-colors">
              Apply Now
            </Link>
            <Link to="/about/staff" className="btn-accent px-8 py-3 rounded-lg font-medium">
              Meet Our Staff
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Leadership;