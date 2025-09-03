// File: src/layouts/PublicLayout.jsx
// Main layout wrapper for public website pages

import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      {/* Header with navigation */}
      <Header />
      
      {/* Main content area */}
      <main className="flex-1">
        <Outlet />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PublicLayout;