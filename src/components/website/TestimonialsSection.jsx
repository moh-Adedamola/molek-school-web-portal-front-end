import { useState, useEffect } from 'react';

const TestimonialsSection = ({ 
  title = "What Our Community Says", 
  subtitle = "Hear from parents, students, and teachers about their experience with our school management system",
  testimonials = null 
}) => {
  
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const defaultTestimonials = [
    {
      id: 1,
      name: "Mrs. Adunni Okonkwo",
      role: "Parent of JSS 2 Student",
      location: "Lagos, Nigeria",
      quote: "The parent portal has completely transformed how I stay connected with my child's education. I can track attendance, view grades, and communicate with teachers all in one place. Molek School's system is truly world-class!",
      rating: 5,
      image: "/api/placeholder/80/80",
      highlight: "Parent Portal Excellence"
    },
    {
      id: 2,
      name: "Mr. Chinedu Okafor",
      role: "Mathematics Teacher",
      location: "Abuja, FCT",
      quote: "As a teacher, this system has made my work so much easier. Grade entry, attendance marking, and generating reports are now seamless. I can focus more on teaching and less on paperwork.",
      rating: 5,
      image: "/api/placeholder/80/80",
      highlight: "Teacher Efficiency"
    },
    {
      id: 3,
      name: "Fatima Abubakar",
      role: "SSS 3 Student",
      location: "Kano, Nigeria",
      quote: "The student portal helps me stay organized with my assignments and exam preparations. I love being able to check my WAEC preparation progress and connect with my classmates through the platform.",
      rating: 5,
      image: "/api/placeholder/80/80",
      highlight: "Student Engagement"
    },
    {
      id: 4,
      name: "Dr. Samuel Oladele",
      role: "School Principal",
      location: "Ibadan, Oyo State",
      quote: "Since implementing this management system, our administrative efficiency has improved by 300%. The analytics help us make data-driven decisions that benefit our entire school community.",
      rating: 5,
      image: "/api/placeholder/80/80",
      highlight: "Administrative Excellence"
    },
    {
      id: 5,
      name: "Mrs. Grace Emenike",
      role: "Parent of SSS 1 Student",
      location: "Port Harcourt, Rivers",
      quote: "The fee management system is transparent and convenient. I receive notifications before payment deadlines and can track all transactions. It has eliminated the stress of school fee payments.",
      rating: 5,
      image: "/api/placeholder/80/80",
      highlight: "Financial Transparency"
    },
    {
      id: 6,
      name: "Mr. Ibrahim Hassan",
      role: "English Teacher & HOD",
      location: "Kaduna, Nigeria",
      quote: "The curriculum management features align perfectly with Nigerian educational standards. Planning lessons and tracking student progress across JSS and SSS levels has never been this organized.",
      rating: 5,
      image: "/api/placeholder/80/80",
      highlight: "Curriculum Integration"
    }
  ];

  const displayTestimonials = testimonials || defaultTestimonials;

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % displayTestimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [displayTestimonials.length]);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span 
        key={i}
        className={`text-lg ${i < rating ? 'text-accent-500' : 'text-neutral-300'}`}
      >
        ⭐
      </span>
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-secondary-50 to-primary-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-secondary-200/30 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-primary-200/30 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-100/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-800 mb-6">
            {title}
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
          
          {/* Success badge */}
          <div className="inline-flex items-center px-6 py-3 bg-secondary-100 rounded-full text-secondary-800 font-semibold mt-8">
            <span className="w-3 h-3 bg-secondary-500 rounded-full mr-3 animate-pulse"></span>
            98% Satisfaction Rate from Nigerian Schools
          </div>
        </div>

        {/* Main Testimonial Display */}
        <div className="mb-16">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-4xl mx-auto relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-100 rounded-full -translate-y-16 translate-x-16"></div>
            
            {/* Quote icon */}
            <div className="absolute top-6 left-6 w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center">
              <span className="text-2xl text-secondary-600">"</span>
            </div>

            <div className="relative">
              {/* Current testimonial */}
              <div className="text-center mb-8">
                {/* Highlight badge */}
                <div className="inline-flex items-center px-4 py-2 bg-secondary-50 rounded-full text-secondary-700 font-medium text-sm mb-6">
                  <span className="w-2 h-2 bg-secondary-500 rounded-full mr-2"></span>
                  {displayTestimonials[currentTestimonial]?.highlight}
                </div>

                {/* Quote */}
                <blockquote className="text-2xl md:text-3xl text-neutral-700 font-medium leading-relaxed mb-8 italic">
                  "{displayTestimonials[currentTestimonial]?.quote}"
                </blockquote>

                {/* Rating */}
                <div className="flex justify-center mb-6">
                  {renderStars(displayTestimonials[currentTestimonial]?.rating || 5)}
                </div>

                {/* Person info */}
                <div className="flex items-center justify-center space-x-4">
                  <img 
                    src={displayTestimonials[currentTestimonial]?.image} 
                    alt={displayTestimonials[currentTestimonial]?.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-secondary-200"
                  />
                  <div className="text-left">
                    <h4 className="font-bold text-lg text-primary-800">
                      {displayTestimonials[currentTestimonial]?.name}
                    </h4>
                    <p className="text-secondary-600 font-medium">
                      {displayTestimonials[currentTestimonial]?.role}
                    </p>
                    <p className="text-sm text-neutral-500">
                      {displayTestimonials[currentTestimonial]?.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial navigation */}
          <div className="flex justify-center items-center mt-8 space-x-3">
            {displayTestimonials.map((_, index) => (
              <button
                key={index}
                className={`transition-all duration-300 rounded-full ${
                  index === currentTestimonial 
                    ? 'w-12 h-3 bg-secondary-500' 
                    : 'w-3 h-3 bg-secondary-200 hover:bg-secondary-300'
                }`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>
        </div>

        {/* Testimonial Grid - Additional testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayTestimonials.slice(0, 6).map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-neutral-100"
            >
              {/* Header */}
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-secondary-200 mr-4"
                />
                <div>
                  <h4 className="font-semibold text-primary-800">{testimonial.name}</h4>
                  <p className="text-sm text-secondary-600">{testimonial.role}</p>
                  <p className="text-xs text-neutral-500">{testimonial.location}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Quote */}
              <blockquote className="text-neutral-700 italic text-sm leading-relaxed">
                "{testimonial.quote.substring(0, 120)}..."
              </blockquote>

              {/* Highlight tag */}
              <div className="mt-4 pt-4 border-t border-neutral-100">
                <span className="inline-flex items-center px-3 py-1 bg-secondary-50 rounded-full text-xs font-medium text-secondary-700">
                  <span className="w-1.5 h-1.5 bg-secondary-500 rounded-full mr-2"></span>
                  {testimonial.highlight}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Statistics Section */}
        <div className="mt-20">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-8 md:p-12 text-white">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Trusted Across Nigeria
              </h3>
              <p className="text-primary-100 text-lg max-w-2xl mx-auto">
                Our school management system is transforming education across all Nigerian states
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-accent-300">200+</div>
                <div className="text-primary-100 font-medium">Schools Using</div>
                <div className="text-primary-200 text-sm">Our Platform</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-accent-300">50,000+</div>
                <div className="text-primary-100 font-medium">Students Enrolled</div>
                <div className="text-primary-200 text-sm">JSS & SSS Combined</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-accent-300">98%</div>
                <div className="text-primary-100 font-medium">Satisfaction Rate</div>
                <div className="text-primary-200 text-sm">From All Users</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-accent-300">36</div>
                <div className="text-primary-100 font-medium">States Covered</div>
                <div className="text-primary-200 text-sm">Plus FCT Abuja</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-primary-800 mb-4">
              Join Our Growing Community
            </h3>
            <p className="text-lg text-neutral-600 mb-8">
              Be part of the educational transformation happening across Nigerian secondary schools
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button className="px-8 py-4 bg-secondary-600 hover:bg-secondary-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                Get Started Free
              </button>
              <button className="px-8 py-4 border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white font-semibold rounded-2xl transition-all duration-300">
                Schedule Demo Call
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center items-center mt-8 space-x-6 text-sm text-neutral-500">
              <div className="flex items-center">
                <span className="text-secondary-500 mr-2">✓</span>
                No Setup Fees
              </div>
              <div className="flex items-center">
                <span className="text-secondary-500 mr-2">✓</span>
                30-Day Free Trial
              </div>
              <div className="flex items-center">
                <span className="text-secondary-500 mr-2">✓</span>
                Nigerian Support Team
              </div>
              <div className="flex items-center">
                <span className="text-secondary-500 mr-2">✓</span>
                WAEC/NECO Integration
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;