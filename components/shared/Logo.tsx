
import React from 'react';

interface LogoProps {
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`text-2xl font-bold ${className}`}>
        <span className="text-brand-primary-600">Noty</span><span className="text-brand-secondary-800">.</span>
    </div>
  );
};

export default Logo;
