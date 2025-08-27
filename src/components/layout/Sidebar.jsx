// src/components/layout/Sidebar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, GraduationCap } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useAuthContext } from '../../context/authContext';
import { NAVIGATION_ITEMS } from '../../utils/constants';

const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuthContext();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState({});

  const navigationItems = NAVIGATION_ITEMS[user?.role] || [];

  const toggleExpanded = (index) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const isParentActive = (children) => {
    return children?.some(child => isActiveRoute(child.path));
  };

  const renderIcon = (iconName, className = "w-5 h-5") => {
    const IconComponent = LucideIcons[iconName];
    return IconComponent ? <IconComponent className={className} /> : null;
  };

  const renderNavItem = (item, index) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems[index];
    const isActive = hasChildren ? isParentActive(item.children) : isActiveRoute(item.path);

    if (hasChildren) {
      return (
        <div key={index} className="mb-1">
          <button
            onClick={() => toggleExpanded(index)}
            className={`w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-colors ${
              isActive 
                ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-600' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center">
              {renderIcon(item.icon)}
              <span className="ml-3 font-medium">{item.label}</span>
            </div>
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
          
          {isExpanded && (
            <div className="ml-4 mt-2 space-y-1">
              {item.children.map((child, childIndex) => (
                <Link
                  key={childIndex}
                  to={child.path}
                  onClick={onClose}
                  className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors ${
                    isActiveRoute(child.path)
                      ? 'bg-blue-50 text-blue-600 border-l-2 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="w-2 h-2 rounded-full bg-gray-300 mr-3"></div>
                  {child.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={index}
        to={item.path}
        onClick={onClose}
        className={`flex items-center px-4 py-3 rounded-lg transition-colors mb-1 ${
          isActive
            ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-600'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        {renderIcon(item.icon)}
        <span className="ml-3 font-medium">{item.label}</span>
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } w-64`}>
        
        {/* Header */}
        <div className="flex items-center p-6 border-b">
          <div className="bg-blue-600 p-2 rounded-lg">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div className="ml-3">
            <h1 className="text-lg font-semibold text-gray-900">SMS</h1>
            <p className="text-xs text-gray-500">School Management</p>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-b bg-gray-50">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold text-sm">
                {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
              </span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {user?.role?.replace('_', ' ')}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          {navigationItems.map((item, index) => renderNavItem(item, index))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;