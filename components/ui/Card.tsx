
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

const Card: React.FC<CardProps> = ({ children, className = '', as: Component = 'div' }) => {
  return (
    <Component className={`bg-white border border-brand-secondary-200 rounded-xl shadow-sm ${className}`}>
      {children}
    </Component>
  );
};

export const CardHeader: React.FC<CardProps> = ({ children, className = '' }) => {
  return <div className={`p-4 sm:p-6 border-b border-brand-secondary-200 ${className}`}>{children}</div>;
};

export const CardContent: React.FC<CardProps> = ({ children, className = '' }) => {
  return <div className={`p-4 sm:p-6 ${className}`}>{children}</div>;
};

export const CardFooter: React.FC<CardProps> = ({ children, className = '' }) => {
    return <div className={`p-4 sm:p-6 bg-brand-secondary-50 border-t border-brand-secondary-200 rounded-b-xl ${className}`}>{children}</div>;
};

export default Card;
