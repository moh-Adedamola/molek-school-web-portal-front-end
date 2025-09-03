// File: src/components/layout/DashboardHeader.jsx
import { useState } from 'react';
import { 
  Menu, 
  Bell, 
  User, 
  LogOut, 
  Settings,
  ChevronDown
} from 'lucide-react';

const DashboardHeader = ({ title, onMenuClick, userRole }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    // Logout logic will be implemented in Phase 5
    console.log('Logout clicked');
  };

  return (
    <header className="bg-white border-b border-neutral-200 px-4 py-3 lg:px-6">
      <div className="flex items-center justify-between">
        {/* Left section - Menu and Title */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <Menu className="h-5 w-5 text-neutral-600" />
          </button>
          
          <div>
            <h1 className="text-xl lg:text-2xl font-semibold text-neutral-800">
              {title}
            </h1>
            <p className="text-sm text-neutral-500 hidden sm:block">
              Academic Year 2024/2025 • Current Term: 2nd Term
            </p>
          </div>
        </div>

        {/* Right section - Notifications and Profile */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="p-2 rounded-lg hover:bg-neutral-100 transition-colors relative">
            <Bell className="h-5 w-5 text-neutral-600" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-accent-600 rounded-full"></span>
          </button>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-neutral-100 transition-colors"
            >
              <div className="h-8 w-8 bg-primary-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-neutral-800">John Doe</p>
                <p className="text-xs text-neutral-500">{userRole}</p>
              </div>
              <ChevronDown className="h-4 w-4 text-neutral-500" />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 py-1 z-50">
                <button className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50">
                  <Settings className="h-4 w-4" />
                  <span>Profile Settings</span>
                </button>
                <hr className="my-1 border-neutral-200" />
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile academic year info */}
      <div className="sm:hidden mt-2">
        <p className="text-xs text-neutral-500">
          Academic Year 2024/2025 • 2nd Term
        </p>
      </div>
    </header>
  );
};

export default DashboardHeader;