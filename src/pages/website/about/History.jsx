import { Link } from 'react-router-dom';
import { useWebsiteContent } from '../../../context/WebsiteContentContext';

const History = () => {
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
            <span className="text-neutral-800">History</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our History
          </h1>
          <p className="text-xl text-primary-200 max-w-2xl mx-auto">
            A journey of growth, excellence, and educational transformation since {content.school.established}
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-800 mb-4">
              Milestones & Achievements
            </h2>
            <p className="text-lg text-neutral-600">
              Key moments that shaped {content.school.name} into what we are today
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-primary-400 to-secondary-400"></div>

            {/* Timeline Items */}
            <div className="space-y-12">
              {content.history.milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  {/* Timeline Marker */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-accent-500 rounded-full border-4 border-white shadow-lg z-10"></div>
                  
                  {/* Content Card */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'mr-8' : 'ml-8'}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200 border-l-4 border-accent-500">
                      {/* Year Badge */}
                      <div className="inline-block bg-gradient-to-r from-accent-500 to-accent-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                        {milestone.year}
                      </div>
                      
                      <h3 className="text-xl font-semibold text-primary-800 mb-3">
                        {milestone.event}
                      </h3>
                      
                      <p className="text-neutral-700 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Legacy Section */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary-800 mb-6">
                Our Legacy Continues
              </h2>
              <p className="text-lg text-neutral-700 mb-6 leading-relaxed">
                From humble beginnings with just 50 students, {content.school.name} has grown 
                to become one of Lagos State's premier secondary schools. Our commitment to 
                academic excellence, character development, and innovation has remained unwavering 
                throughout our journey.
              </p>
              <p className="text-lg text-neutral-700 mb-6 leading-relaxed">
                Today, we continue to build on our rich heritage while embracing modern 
                educational practices and technology to prepare our students for the challenges 
                of tomorrow.
              </p>
              
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-secondary-800 mb-4">
                  Looking Forward
                </h3>
                <ul className="space-y-2 text-neutral-700">
                  <li className="flex items-center">
                    <span className="text-secondary-500 mr-2">✓</span>
                    Expanding our STEM programs and facilities
                  </li>
                  <li className="flex items-center">
                    <span className="text-secondary-500 mr-2">✓</span>
                    Enhancing digital learning capabilities
                  </li>
                  <li className="flex items-center">
                    <span className="text-secondary-500 mr-2">✓</span>
                    Strengthening community partnerships
                  </li>
                  <li className="flex items-center">
                    <span className="text-secondary-500 mr-2">✓</span>
                    Maintaining our academic excellence standards
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              {/* Achievement Cards */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-primary-500">
                <h3 className="text-xl font-semibold text-primary-800 mb-2">
                  Academic Excellence
                </h3>
                <p className="text-neutral-700">
                  Consistent 95%+ WAEC pass rates for over a decade
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-secondary-500">
                <h3 className="text-xl font-semibold text-secondary-800 mb-2">
                  Infrastructure Growth
                </h3>
                <p className="text-neutral-700">
                  Modern facilities including science labs, computer center, and library
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-accent-500">
                <h3 className="text-xl font-semibold text-accent-800 mb-2">
                  Recognition & Awards
                </h3>
                <p className="text-neutral-700">
                  Multiple awards for educational excellence and community impact
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Be Part of Our Continuing Story
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join us as we write the next chapter of excellence in Nigerian education
          </p>
          <div className="space-x-4">
            <Link to="/admissions" className="btn-accent px-8 py-3 rounded-lg font-medium">
              Apply Today
            </Link>
            <Link to="/about/leadership" className="bg-white text-primary-700 px-8 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors">
              Meet Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default History;