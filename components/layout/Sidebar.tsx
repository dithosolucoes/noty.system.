
import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../shared/Logo';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  navLinks: NavItem[];
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ navLinks, isOpen }) => {
  return (
    <aside className={`fixed lg:relative lg:translate-x-0 inset-y-0 left-0 z-40 w-64 bg-white border-r border-brand-secondary-200 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center h-16 px-6 border-b border-brand-secondary-200">
          <Logo />
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              end
              className={({ isActive }) =>
                `flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors duration-150 ${
                  isActive
                    ? 'bg-brand-primary-50 text-brand-primary-600'
                    : 'text-brand-secondary-600 hover:text-brand-secondary-900 hover:bg-brand-secondary-100'
                }`
              }
            >
              <span className="mr-3">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
