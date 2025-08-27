// src/components/layout/Breadcrumb.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = ({ customBreadcrumbs = null }) => {
  const location = useLocation();

  // Predefined breadcrumb mappings
  const breadcrumbMap = {
    '/dashboard': 'Dashboard',
    '/dashboard/super-admin': 'Super Admin Dashboard',
    '/dashboard/admin': 'Admin Dashboard', 
    '/dashboard/teacher': 'Teacher Dashboard',
    '/dashboard/parent': 'Parent Dashboard',
    '/management': 'Management',
    '/management/students': 'Student Management',
    '/management/teachers': 'Teacher Management',
    '/management/parents': 'Parent Management',
    '/management/admins': 'Admin Management',
    '/management/classes': 'Class Management',
    '/management/subjects': 'Subject Management',
    '/management/website': 'Website CMS',
    '/academics': 'Academics',
    '/academics/attendance': 'Attendance',
    '/academics/attendance/mark': 'Mark Attendance',
    '/academics/attendance/analytics': 'Attendance Analytics',
    '/academics/attendance/reports': 'Attendance Reports',
    '/academics/grades': 'Grades',
    '/academics/grades/entry': 'Grade Entry',
    '/academics/grades/analytics': 'Grade Analytics',
    '/academics/grades/reports': 'Grade Reports'
  };

  const generateBreadcrumbs = () => {
    // Use custom breadcrumbs if provided
    if (customBreadcrumbs) {
      return customBreadcrumbs;
    }

    const pathnames = location.pathname.split('/').filter(x => x);
    const breadcrumbs = [];

    // Add home/dashboard as first item
    breadcrumbs.push({
      label: 'Dashboard',
      path: '/dashboard',
      icon: <Home className="w-4 h-4" />
    });

    // Build breadcrumbs from path segments
    let currentPath = '';
    pathnames.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Skip the first 'dashboard' segment to avoid duplication
      if (segment === 'dashboard' && index === 0) {
        return;
      }

      const label = breadcrumbMap[currentPath] || 
        segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ');

      breadcrumbs.push({
        label,
        path: currentPath,
        isLast: index === pathnames.length - 1
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on login page or single-level pages
  if (location.pathname === '/login' || breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <ChevronRight className="w-4 h-4 text-gray-400" />
          )}
          
          <div className="flex items-center space-x-1">
            {breadcrumb.icon && (
              <span className="text-gray-400">
                {breadcrumb.icon}
              </span>
            )}
            
            {breadcrumb.isLast ? (
              <span className="font-medium text-gray-900">
                {breadcrumb.label}
              </span>
            ) : (
              <Link
                to={breadcrumb.path}
                className="hover:text-blue-600 transition-colors"
              >
                {breadcrumb.label}
              </Link>
            )}
          </div>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;