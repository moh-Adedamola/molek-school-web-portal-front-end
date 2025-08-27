import { Link } from 'react-router-dom';
import { useWebsiteContent } from '../../../context/WebsiteContentContext';
import StatsCard from '../../../components/shared/StatsCard';

const AboutUs = () => {
  const { content } = useWebsiteContent();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About {content.school.name}
          </h1>
          <p className="text-xl text-primary-200 max-w-3xl mx-auto">
            Discover our commitment to educational excellence and character development
          </p>
        </div>
      </section>

      {/* School Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary-800 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-neutral-700 mb-6 leading-relaxed">
                {content.about.overview}
              </p>
              <div className="bg-primary-50 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-semibold text-primary-800 mb-3">
                  School Motto
                </h3>
                <p className="text-2xl font-bold text-primary-600 italic">
                  "{content.school.motto}"
                </p>
              </div>
              <div className="flex items-center space-x-6 text-sm text-neutral-600">
                <div>
                  <span className="font-semibold">Established:</span> {content.school.established}
                </div>
                <div>
                  <span className="font-semibold">Location:</span> {content.school.location}
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-secondary-50 to-accent-50 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-secondary-800 mb-6 text-center">
                Our Achievements
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {content.stats.map((stat, index) => (
                  <StatsCard 
                    key={index}
                    label={stat.label}
                    value={stat.value}
                    color={stat.color}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Cards */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary-800 mb-12 text-center">
            Learn More About Us
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/about/vision-mission" className="group">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 border-l-4 border-primary-500 group-hover:border-primary-600">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-semibold text-primary-800 mb-2 group-hover:text-primary-600">
                  Vision & Mission
                </h3>
                <p className="text-neutral-600 text-sm">
                  Discover our vision for the future and mission to excel
                </p>
              </div>
            </Link>

            <Link to="/about/leadership" className="group">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 border-l-4 border-secondary-500 group-hover:border-secondary-600">
                <div className="w-12 h-12 bg-secondary-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-secondary-200 transition-colors">
                  <span className="text-2xl">👥</span>
                </div>
                <h3 className="text-xl font-semibold text-secondary-800 mb-2 group-hover:text-secondary-600">
                  Leadership Team
                </h3>
                <p className="text-neutral-600 text-sm">
                  Meet our dedicated leadership and management team
                </p>
              </div>
            </Link>

            <Link to="/about/staff" className="group">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 border-l-4 border-accent-500 group-hover:border-accent-600">
                <div className="w-12 h-12 bg-accent-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent-200 transition-colors">
                  <span className="text-2xl">👨‍🏫</span>
                </div>
                <h3 className="text-xl font-semibold text-accent-800 mb-2 group-hover:text-accent-600">
                  Staff Directory
                </h3>
                <p className="text-neutral-600 text-sm">
                  Browse our qualified and experienced teaching staff
                </p>
              </div>
            </Link>

            <Link to="/about/history" className="group">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 border-l-4 border-primary-500 group-hover:border-primary-600">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="text-xl font-semibold text-primary-800 mb-2 group-hover:text-primary-600">
                  Our History
                </h3>
                <p className="text-neutral-600 text-sm">
                  Journey through our milestones and achievements
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Experience Excellence in Education
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join our community of learners and discover your potential
          </p>
          <div className="space-x-4">
            <Link to="/admissions" className="btn-accent px-8 py-3 rounded-lg font-medium">
              Apply Today
            </Link>
            <Link to="/contact" className="bg-white text-primary-700 px-8 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors">
              Visit Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;