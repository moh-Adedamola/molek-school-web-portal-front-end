import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ 
  items = [], 
  separator = <ChevronRight className="w-4 h-4" />,
  showHome = true,
  className = '',
}) => {
  const allItems = showHome 
    ? [{ label: 'Home', href: '/', icon: Home }, ...items]
    : items;

  return (
    <nav className={`flex ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          const Icon = item.icon;

          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <span className="text-neutral-400 mx-2">
                  {separator}
                </span>
              )}
              
              {isLast ? (
                <span className="flex items-center text-neutral-600 font-medium">
                  {Icon && <Icon className="w-4 h-4 mr-1" />}
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.href}
                  className="flex items-center text-primary-600 hover:text-primary-800 transition-colors duration-200"
                >
                  {Icon && <Icon className="w-4 h-4 mr-1" />}
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

// Simple breadcrumb for quick usage
const SimpleBreadcrumb = ({ current, parent, className = '' }) => {
  const items = parent ? [parent, { label: current }] : [{ label: current }];
  
  return <Breadcrumb items={items} className={className} />;
};

// Academic breadcrumb for school sections
const AcademicBreadcrumb = ({ section, subsection, className = '' }) => {
  const items = [
    { label: 'Academics', href: '/academics' },
  ];

  if (section) {
    items.push({ label: section, href: `/academics/${section.toLowerCase().replace(/\s+/g, '-')}` });
  }

  if (subsection) {
    items.push({ label: subsection });
  }

  return <Breadcrumb items={items} className={className} />;
};

// Dashboard breadcrumb for admin panels
const DashboardBreadcrumb = ({ section, subsection, className = '' }) => {
  const items = [
    { label: 'Dashboard', href: '/dashboard' },
  ];

  if (section) {
    items.push({ label: section, href: `/dashboard/${section.toLowerCase().replace(/\s+/g, '-')}` });
  }

  if (subsection) {
    items.push({ label: subsection });
  }

  return <Breadcrumb items={items} className={className} />;
};

Breadcrumb.Simple = SimpleBreadcrumb;
Breadcrumb.Academic = AcademicBreadcrumb;
Breadcrumb.Dashboard = DashboardBreadcrumb;

export default Breadcrumb;