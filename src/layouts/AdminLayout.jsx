// File: src/layouts/AdminLayout.jsx
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/layout/AdminSidebar';
import DashboardHeader from '../components/layout/DashboardHeader';

const AdminLayout = () => {
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
        <AdminSidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 lg:ml-0">
        <DashboardHeader 
          title="School Administration"
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          userRole="Admin"
        />
        
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;