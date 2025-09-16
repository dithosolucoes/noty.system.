
import React from 'react';
import { NotificationStatus } from '../../types';
import { STATUS_COLORS, STATUS_LABELS } from '../../constants';

interface BadgeProps {
  status: NotificationStatus;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ status, className = '' }) => {
  const colorClasses = STATUS_COLORS[status] || 'bg-gray-100 text-gray-800 border-gray-300';
  const label = STATUS_LABELS[status] || 'Unknown';
  
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClasses} ${className}`}
    >
      {label}
    </span>
  );
};

export default Badge;
