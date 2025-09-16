import React, { Fragment } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true"></div>
      
      <div className={`relative bg-white rounded-xl shadow-xl w-full ${sizeClasses[size]}`}>
        <div className="flex items-start justify-between p-4 border-b border-brand-secondary-200">
          <h3 className="text-lg font-semibold text-brand-secondary-800" id="modal-title">
            {title}
          </h3>
          <button
            type="button"
            className="text-brand-secondary-400 bg-transparent hover:bg-brand-secondary-200 hover:text-brand-secondary-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
            onClick={onClose}
          >
            <X size={20} />
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        
        <div>
            {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;