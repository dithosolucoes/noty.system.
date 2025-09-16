
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { User, CreditCard, LogOut, Bell, Menu } from 'lucide-react';

interface HeaderProps {
    onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-sm border-b border-brand-secondary-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Menu button for mobile */}
          <div className="lg:hidden">
             <button onClick={onMenuClick} className="text-brand-secondary-600 hover:text-brand-secondary-900">
                 <Menu size={24} />
             </button>
          </div>
          <div className="flex-1"></div>
          <div className="flex items-center space-x-4">
            {user?.role === 'CLIENT' && user.credits !== undefined && (
              <div className="flex items-center text-sm font-medium text-brand-secondary-700">
                <CreditCard className="w-5 h-5 mr-2 text-brand-primary-600" />
                <span>{user.credits} Créditos</span>
              </div>
            )}

            <button className="p-2 rounded-full text-brand-secondary-500 hover:bg-brand-secondary-100 hover:text-brand-secondary-700">
              <Bell size={20} />
            </button>
            
            <div className="relative group">
              <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-brand-secondary-100">
                 <div className="w-8 h-8 rounded-full bg-brand-primary-600 text-white flex items-center justify-center font-bold">
                    {user?.name.charAt(0)}
                 </div>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white border border-brand-secondary-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 invisible group-hover:visible">
                  <div className="py-1">
                      <div className="px-4 py-2 border-b border-brand-secondary-200">
                        <p className="text-sm font-semibold text-brand-secondary-800 truncate">{user?.name}</p>
                        <p className="text-xs text-brand-secondary-500 truncate">{user?.email}</p>
                      </div>
                      <a href="#/app/profile" className="flex items-center px-4 py-2 text-sm text-brand-secondary-700 hover:bg-brand-secondary-100">
                        <User size={16} className="mr-2"/> Meu Perfil
                      </a>
                      <button onClick={handleLogout} className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                        <LogOut size={16} className="mr-2"/> Sair
                      </button>
                  </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
