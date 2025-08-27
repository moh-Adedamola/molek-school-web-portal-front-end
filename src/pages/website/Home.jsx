import { Link } from 'react-router-dom';
import { useWebsiteContent } from '../../context/WebsiteContentContext';
import StatsCard from '../../components/shared/StatsCard';
import TestimonialCard from '../../components/shared/TestimonialCard';

const Home = () => {
  const { content } = useWebsiteContent();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary-800">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-800 to-primary-900"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Welcome to {content.school.name}
            </h1>
            <p className="text-xl text-primary-200 mb-8 max-w-3xl mx-auto">
              {content.school.tagline} through JSS & SSS Programs
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/admissions" className="btn-primary px-8 py-4 rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-200">
                Apply Now
              </Link>
              <Link to="/about" className="btn-secondary px-8 py-4 rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-200">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {content.stats.map((stat, index) => (
              <StatsCard 
                key={index}
                label={stat.label}
                value={stat.value}
                color={stat.color}
                icon={["📚", "👨‍🏫", "🏆", "⭐"][index]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-800 mb-4">
              Why Choose Molek School?
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              {content.about.overview}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.about.coreValues.map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">
                    {["🎓", "🤝", "💡", "🌟"][index]}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-primary-800 mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-neutral-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/about" className="btn-primary px-8 py-3 rounded-lg font-medium">
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-800 mb-4">
              What Our Community Says
            </h2>
            <p className="text-lg text-neutral-600">
              Hear from parents, students, and alumni about their experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.testimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={index}
                name={testimonial.name}
                role={testimonial.role}
                content={testimonial.content}
                rating={testimonial.rating}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-secondary-600 to-secondary-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Join Our School Community?
          </h2>
          <p className="text-xl text-secondary-100 mb-8">
            Start your child's journey to academic excellence today
          </p>
          <div className="space-x-4">
            <Link to="/admissions" className="btn-accent px-8 py-3 rounded-lg font-medium">
              Start Application
            </Link>
            <Link to="/contact" className="bg-white text-secondary-700 px-8 py-3 rounded-lg font-medium hover:bg-secondary-50 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;