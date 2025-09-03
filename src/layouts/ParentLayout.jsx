// File: src/layouts/ParentLayout.jsx
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import ParentSidebar from '../components/layout/ParentSidebar';
import DashboardHeader from '../components/layout/DashboardHeader';

const ParentLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <ParentSidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 lg:ml-0">
        <DashboardHeader 
          title="Parent Portal"
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          userRole="Parent"
        />
        
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ParentLayout;