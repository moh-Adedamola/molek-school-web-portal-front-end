import { Link } from 'react-router-dom';
import { useWebsiteContent } from '../../../context/WebsiteContentContext';

const VisionMission = () => {
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
            <span className="text-neutral-800">Vision & Mission</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Vision & Mission
          </h1>
          <p className="text-xl text-primary-200 max-w-2xl mx-auto">
            Our guiding principles and commitment to educational excellence
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Vision Card */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-8 border-l-4 border-primary-500 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mr-4">
                  <span className="text-3xl text-white">👁️</span>
                </div>
                <h2 className="text-3xl font-bold text-primary-800">Our Vision</h2>
              </div>
              <p className="text-lg text-primary-800 leading-relaxed font-medium">
                {content.about.vision}
              </p>
            </div>

            {/* Mission Card */}
            <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-2xl p-8 border-l-4 border-secondary-500 shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-secondary-600 rounded-2xl flex items-center justify-center mr-4">
                  <span className="text-3xl text-white">🎯</span>
                </div>
                <h2 className="text-3xl font-bold text-secondary-800">Our Mission</h2>
              </div>
              <p className="text-lg text-secondary-800 leading-relaxed font-medium">
                {content.about.mission}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gradient-to-br from-neutral-50 to-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-800 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              The principles that guide everything we do at {content.school.name}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.about.coreValues.map((value, index) => {
              const colors = [
                { bg: "bg-primary-50", border: "border-primary-200", text: "text-primary-800", icon: "bg-primary-600" },
                { bg: "bg-secondary-50", border: "border-secondary-200", text: "text-secondary-800", icon: "bg-secondary-600" },
                { bg: "bg-accent-50", border: "border-accent-200", text: "text-accent-800", icon: "bg-accent-600" },
                { bg: "bg-primary-50", border: "border-primary-200", text: "text-primary-800", icon: "bg-primary-600" }
              ];
              const colorClass = colors[index % colors.length];
              const icons = ["🎓", "🤝", "💡", "🌟"];

              return (
                <div 
                  key={index} 
                  className={`${colorClass.bg} ${colorClass.border} border-2 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-200`}
                >
                  <div className={`w-16 h-16 ${colorClass.icon} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <span className="text-2xl text-white">{icons[index]}</span>
                  </div>
                  <h3 className={`text-xl font-semibold ${colorClass.text} mb-3`}>
                    {value.title}
                  </h3>
                  <p className="text-neutral-700 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* School Motto Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-12 text-white">
            <h2 className="text-2xl font-semibold mb-4">Our School Motto</h2>
            <p className="text-4xl md:text-5xl font-bold italic mb-6">
              "{content.school.motto}"
            </p>
            <p className="text-xl text-primary-100">
              These three pillars form the foundation of education at {content.school.name}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-accent-100 to-accent-200">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-accent-800 mb-4">
            Ready to Be Part of Our Vision?
          </h2>
          <p className="text-xl text-accent-700 mb-8">
            Join us in shaping the future of Nigerian secondary education
          </p>
          <div className="space-x-4">
            <Link to="/admissions" className="btn-primary px-8 py-3 rounded-lg font-medium">
              Apply Now
            </Link>
            <Link to="/about" className="btn-secondary px-8 py-3 rounded-lg font-medium">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VisionMission;