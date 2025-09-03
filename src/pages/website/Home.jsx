// File: src/pages/website/Home.jsx
// Complete homepage with hero, features, testimonials, and news sections

import React from 'react';
import HeroSection from '../../components/website/HeroSection';
import FeaturesSection from '../../components/website/FeaturesSection';
import TestimonialsSection from '../../components/website/TestimonialsSection';
import NewsSection from '../../components/website/NewsSection';
import QuickLinksSection from '../../components/website/QuickLinksSection';

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <NewsSection />
      <QuickLinksSection />
    </div>
  );
};

export default Home;