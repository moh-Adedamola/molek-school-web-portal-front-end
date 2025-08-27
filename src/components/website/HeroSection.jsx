import { useState, useEffect } from 'react';

const HeroSection = ({ 
  title = "Welcome to Molek School",
  subtitle = "Nurturing Excellence in Nigerian Secondary Education through JSS & SSS Programs",
  showButtons = true,
  backgroundImage = null,
  height = "full" // "full", "large", "medium"
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Hero slides for rotating content
  const heroSlides = [
    {
      title: "Welcome to Molek School",
      subtitle: "Nurturing Excellence in Nigerian Secondary Education through JSS & SSS Programs",
      highlight: "Academic Excellence"
    },
    {
      title: "Preparing Students for Success",
      subtitle: "WAEC & NECO Preparation with Comprehensive JSS and SSS Curriculum",
      highlight: "Exam Preparation"
    },
    {
      title: "Building Future Leaders",
      subtitle: "Character Development and Academic Excellence in the Heart of Nigeria",
      highlight: "Leadership Development"
    }
  ];

  useEffect(() => {
    if (heroSlides.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [heroSlides.length]);

  const heightClasses = {
    full: "min-h-screen",
    large: "min-h-[80vh]",
    medium: "min-h-[60vh]"
  };

  const currentContent = heroSlides[currentSlide] || {
    title,
    subtitle,
    highlight: "Excellence"
  };

  return (
    <div className={`relative overflow-hidden bg-primary-800 ${heightClasses[height]}`}>
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-800 via-primary-900 to-secondary-800"></div>
      
      {/* Optional background image */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        ></div>
      )}

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-300/5 rounded-full blur-2xl animate-ping"></div>
      </div>

      {/* Main content */}
      <div className="relative flex items-center justify-center min-h-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          {/* Highlight badge */}
          <div className="inline-flex items-center px-4 py-2 bg-accent-500/20 backdrop-blur-sm rounded-full text-accent-200 text-sm font-medium mb-6 border border-accent-400/30">
            <span className="w-2 h-2 bg-accent-400 rounded-full mr-2 animate-pulse"></span>
            {currentContent.highlight}
          </div>

          {/* Main heading with animation */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="block transition-all duration-700 ease-in-out">
              {currentContent.title}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-primary-200 mb-12 max-w-4xl mx-auto leading-relaxed">
            {currentContent.subtitle}
          </p>

          {/* Action buttons */}
          {showButtons && (
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
              <button className="group relative inline-flex items-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <span className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center">
                  📚 Student Portal
                  <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>

              <button className="group relative inline-flex items-center px-8 py-4 bg-secondary-600 hover:bg-secondary-700 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <span className="absolute inset-0 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center">
                  👨‍🏫 Teacher Portal
                  <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>

              <button className="group relative inline-flex items-center px-8 py-4 bg-accent-600 hover:bg-accent-700 text-white font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <span className="absolute inset-0 bg-gradient-to-r from-accent-500 to-accent-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center">
                  ⚙️ Admin Portal
                  <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
            </div>
          )}

          {/* Statistics/highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">1000+</div>
              <div className="text-sm text-primary-200">Students</div>
            </div>
            <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">50+</div>
              <div className="text-sm text-primary-200">Teachers</div>
            </div>
            <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">15+</div>
              <div className="text-sm text-primary-200">Years</div>
            </div>
            <div className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">95%</div>
              <div className="text-sm text-primary-200">WAEC Pass Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      {heroSlides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-accent-400 w-8' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      )}

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;