// File: src/components/website/HeroSection.jsx
// Main hero section with call-to-action for admissions

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Users, BookOpen } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="hero-gradient text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-transparent"></div>
      </div>

      <div className="relative container-max py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="mb-6">
              <span className="inline-block bg-accent-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                🇳🇬 Proudly Nigerian
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance leading-tight">
              Excellence in
              <span className="text-accent-400 block">
                Secondary Education
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-primary-100 mb-8 max-w-2xl mx-auto lg:mx-0 text-balance leading-relaxed">
              Preparing students for WAEC, NECO, and university success with 
              quality education rooted in Nigerian values and global standards.
            </p>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Link
                to="/admissions"
                className="btn-accent px-8 py-4 rounded-lg text-lg font-semibold flex items-center justify-center space-x-2 hover:transform hover:scale-105 transition-all"
              >
                <span>Apply for Admission</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/about"
                className="btn-outline px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-primary-800 transition-all"
              >
                Learn More About Us
              </Link>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-primary-700">
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold text-accent-400 mb-1">15+</div>
                <div className="text-primary-200 text-sm">Years of Excellence</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold text-accent-400 mb-1">500+</div>
                <div className="text-primary-200 text-sm">Active Students</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl md:text-3xl font-bold text-accent-400 mb-1">95%</div>
                <div className="text-primary-200 text-sm">WAEC Pass Rate</div>
              </div>
            </div>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-secondary-500 p-3 rounded-lg">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">WAEC Excellence</h3>
                  <p className="text-primary-200 text-sm">Outstanding examination results</p>
                </div>
              </div>
              <p className="text-primary-100 text-sm">
                Consistent high performance in WAEC and NECO examinations with 
                dedicated preparation programs.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-accent-500 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Qualified Teachers</h3>
                  <p className="text-primary-200 text-sm">Experienced educators</p>
                </div>
              </div>
              <p className="text-primary-100 text-sm">
                Highly qualified teaching staff committed to academic excellence 
                and character development.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-primary-500 p-3 rounded-lg">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Modern Curriculum</h3>
                  <p className="text-primary-200 text-sm">Updated learning programs</p>
                </div>
              </div>
              <p className="text-primary-100 text-sm">
                Comprehensive curriculum aligned with Nigerian educational standards 
                and global best practices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;