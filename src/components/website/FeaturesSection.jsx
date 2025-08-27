const FeaturesSection = ({ 
  title = "Comprehensive School Management", 
  subtitle = "Integrated solutions for students, teachers, parents, and administrators",
  features = null
}) => {
  
  const defaultFeatures = [
    {
      id: 1,
      icon: "📚",
      title: "Academic Excellence",
      description: "JSS & SSS programs with WAEC/NECO preparation and comprehensive curriculum management.",
      gradient: "from-primary-50 to-primary-100",
      iconBg: "bg-primary-600",
      titleColor: "text-primary-800",
      highlights: ["JSS 1-3 Programs", "SSS 1-3 Programs", "WAEC Preparation", "NECO Preparation"]
    },
    {
      id: 2,
      icon: "👥",
      title: "Student Management",
      description: "Complete student lifecycle management from admission to graduation with attendance tracking.",
      gradient: "from-secondary-50 to-secondary-100",
      iconBg: "bg-secondary-600",
      titleColor: "text-secondary-800",
      highlights: ["Enrollment Management", "Attendance Tracking", "Progress Monitoring", "Parent Communication"]
    },
    {
      id: 3,
      icon: "📊",
      title: "Analytics & Reports",
      description: "Real-time insights and comprehensive reporting for informed decision making.",
      gradient: "from-accent-50 to-accent-100",
      iconBg: "bg-accent-600",
      titleColor: "text-accent-800",
      highlights: ["Performance Analytics", "Attendance Reports", "Grade Analytics", "Custom Reports"]
    },
    {
      id: 4,
      icon: "🏫",
      title: "School Administration",
      description: "Streamlined administrative processes for efficient school operations and management.",
      gradient: "from-purple-50 to-purple-100",
      iconBg: "bg-purple-600",
      titleColor: "text-purple-800",
      highlights: ["Staff Management", "Class Scheduling", "Resource Planning", "Communication Hub"]
    },
    {
      id: 5,
      icon: "💳",
      title: "Fee Management",
      description: "Transparent fee structure and payment tracking for Nigerian secondary schools.",
      gradient: "from-emerald-50 to-emerald-100",
      iconBg: "bg-emerald-600",
      titleColor: "text-emerald-800",
      highlights: ["Term-based Billing", "Payment Tracking", "Fee Reminders", "Receipt Generation"]
    },
    {
      id: 6,
      icon: "🌍",
      title: "Nigerian Context",
      description: "Designed specifically for the Nigerian education system with local integration.",
      gradient: "from-green-50 to-green-100",
      iconBg: "bg-green-600",
      titleColor: "text-green-800",
      highlights: ["Local Curriculum", "Nigerian Holidays", "Multi-language Support", "Local Payment Systems"]
    }
  ];

  const displayFeatures = features || defaultFeatures;

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary-100/30 rounded-full -translate-x-32 -translate-y-32"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary-100/30 rounded-full translate-x-40 translate-y-40"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-800 mb-6">
            {title}
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
          
          {/* Decorative line */}
          <div className="flex items-center justify-center mt-8">
            <div className="h-1 w-16 bg-primary-600 rounded-full"></div>
            <div className="h-2 w-2 bg-accent-500 rounded-full mx-4"></div>
            <div className="h-1 w-16 bg-secondary-600 rounded-full"></div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayFeatures.map((feature, index) => (
            <div 
              key={feature.id}
              className={`group relative bg-gradient-to-br ${feature.gradient} p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/50`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Icon */}
              <div className={`relative w-16 h-16 ${feature.iconBg} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-white text-2xl">{feature.icon}</span>
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className={`text-2xl font-bold ${feature.titleColor} mb-4 group-hover:text-opacity-90 transition-colors duration-300`}>
                  {feature.title}
                </h3>
                
                <p className="text-neutral-700 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Feature highlights */}
                <div className="space-y-2">
                  {feature.highlights?.map((highlight, idx) => (
                    <div key={idx} className="flex items-center text-sm text-neutral-600">
                      <span className="w-1.5 h-1.5 bg-accent-500 rounded-full mr-3 flex-shrink-0"></span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Hover indicator */}
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-8 shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Transform Your School Management?
            </h3>
            <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
              Join hundreds of Nigerian secondary schools already using our comprehensive management system.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="px-8 py-4 bg-white text-primary-700 font-semibold rounded-2xl hover:bg-primary-50 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Get Started Today
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-2xl hover:bg-white hover:text-primary-700 transition-all duration-300">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 text-center">
          <p className="text-neutral-500 text-sm mb-6">Trusted by leading Nigerian secondary schools</p>
          <div className="flex flex-wrap justify-center items-center space-x-8 opacity-60">
            {/* Placeholder for school logos */}
            <div className="w-24 h-12 bg-neutral-200 rounded-lg flex items-center justify-center text-neutral-400 text-xs">
              School Logo
            </div>
            <div className="w-24 h-12 bg-neutral-200 rounded-lg flex items-center justify-center text-neutral-400 text-xs">
              School Logo
            </div>
            <div className="w-24 h-12 bg-neutral-200 rounded-lg flex items-center justify-center text-neutral-400 text-xs">
              School Logo
            </div>
            <div className="w-24 h-12 bg-neutral-200 rounded-lg flex items-center justify-center text-neutral-400 text-xs">
              School Logo
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;