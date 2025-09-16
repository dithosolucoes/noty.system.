
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ label, id, icon, ...props }) => {
  const hasIcon = !!icon;
  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-brand-secondary-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {hasIcon && <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-secondary-400">{icon}</div>}
        <input
          id={id}
          className={`block w-full px-3 py-2 border border-brand-secondary-300 rounded-md shadow-sm placeholder-brand-secondary-400 focus:outline-none focus:ring-brand-primary-500 focus:border-brand-primary-500 sm:text-sm ${hasIcon ? 'pl-10' : ''}`}
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;
