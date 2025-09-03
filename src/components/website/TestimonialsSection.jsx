// File: src/components/website/TestimonialsSection.jsx
// Parent and student testimonials with responsive carousel design

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Mrs. Adebayo Olumide',
      role: 'Parent - SSS 3 Student',
      location: 'Lagos',
      content: 'My daughter has excelled beyond our expectations. The teachers are dedicated and the WAEC preparation is exceptional. She scored distinctions in 7 subjects!',
      rating: 5,
      avatar: 'AO',
      category: 'parent'
    },
    {
      name: 'Chioma Okwu',
      role: 'Alumni - Class of 2023',
      location: 'University of Lagos',
      content: 'The foundation I received here prepared me perfectly for university. The teachers went above and beyond to ensure we understood every concept.',
      rating: 5,
      avatar: 'CO',
      category: 'student'
    },
    {
      name: 'Mr. Emeka Nwosu',
      role: 'Parent - JSS 2 Student',
      location: 'Abuja',
      content: 'The holistic approach to education here is remarkable. My son is not only academically strong but also developing great character and leadership skills.',
      rating: 5,
      avatar: 'EN',
      category: 'parent'
    },
    {
      name: 'Fatima Ibrahim',
      role: 'Current Student - SSS 2',
      location: 'Science Class',
      content: 'I love the science laboratories and the way our teachers make complex topics easy to understand. I am confident about my WAEC exams.',
      rating: 5,
      avatar: 'FI',
      category: 'student'
    },
    {
      name: 'Mrs. Grace Okafor',
      role: 'Parent - Twin Students',
      location: 'Port Harcourt',
      content: 'Both my children attend this school and they are thriving. The individual attention and care each student receives is outstanding.',
      rating: 5,
      avatar: 'GO',
      category: 'parent'
    },
    {
      name: 'David Adamu',
      role: 'Alumni - Class of 2022',
      location: 'Ahmadu Bello University',
      content: 'The career guidance and university preparation I received was invaluable. I secured admission to study Medicine thanks to my strong foundation.',
      rating: 5,
      avatar: 'DA',
      category: 'student'
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const getCategoryColor = (category) => {
    return category === 'parent' 
      ? 'bg-accent-50 border-accent-200 text-accent-700'
      : 'bg-secondary-50 border-secondary-200 text-secondary-700';
  };

  return (
    <section className="section-padding bg-neutral-50">
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-secondary-50 px-4 py-2 rounded-full mb-4">
            <Quote className="h-4 w-4 text-secondary-600" />
            <span className="text-secondary-700 font-medium text-sm">Testimonials</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 mb-6 text-balance">
            What Our Community Says
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto text-balance">
            Hear from parents, students, and alumni about their experiences and 
            success stories at our school.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial Display */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {testimonials[currentIndex].avatar}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                {/* Rating Stars */}
                <div className="flex items-center mb-4">
                  {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-accent-500 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg md:text-xl text-neutral-700 leading-relaxed mb-6 italic">
                  "{testimonials[currentIndex].content}"
                </blockquote>

                {/* Author Info */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h4 className="font-semibold text-neutral-800 text-lg">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-neutral-600 text-sm">
                      {testimonials[currentIndex].role}
                    </p>
                    <p className="text-neutral-500 text-sm">
                      {testimonials[currentIndex].location}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(testimonials[currentIndex].category)}`}>
                    {testimonials[currentIndex].category === 'parent' ? 'Parent' : 'Student/Alumni'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center space-x-4">
            {/* Previous Button */}
            <button
              onClick={prevTestimonial}
              className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all hover:bg-primary-50 group"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5 text-neutral-600 group-hover:text-primary-600" />
            </button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-primary-600 w-8'
                      : 'bg-neutral-300 hover:bg-neutral-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextTestimonial}
              className="p-3 bg-white rounded-full shadow-md hover:shadow-lg transition-all hover:bg-primary-50 group"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5 text-neutral-600 group-hover:text-primary-600" />
            </button>
          </div>
        </div>

        {/* Quick Stats from Testimonials */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl font-bold text-secondary-600 mb-2">98%</div>
            <div className="text-neutral-600 font-medium">Parent Satisfaction</div>
            <div className="text-neutral-500 text-sm mt-1">Based on annual surveys</div>
          </div>
          <div className="text-center bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl font-bold text-primary-600 mb-2">85%</div>
            <div className="text-neutral-600 font-medium">University Admission</div>
            <div className="text-neutral-500 text-sm mt-1">Within first year of graduation</div>
          </div>
          <div className="text-center bg-white rounded-xl p-6 shadow-sm">
            <div className="text-3xl font-bold text-accent-600 mb-2">15+</div>
            <div className="text-neutral-600 font-medium">Years of Trust</div>
            <div className="text-neutral-500 text-sm mt-1">Serving Nigerian families</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;