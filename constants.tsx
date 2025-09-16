import React from 'react';
import { LayoutDashboard, FileText, Users, CreditCard, User, Shield, Bell, Users2, DollarSign, Settings, GalleryVerticalEnd } from 'lucide-react';
// FIX: Import `NotificationStatus` to resolve type errors for STATUS_COLORS and STATUS_LABELS.
import { NotificationStatus } from './types';

export const CLIENT_NAV_LINKS = [
  { href: '/app/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { href: '/app/notifications', label: 'Notificações', icon: <FileText size={20} /> },
  { href: '/app/recipients', label: 'Destinatários', icon: <Users size={20} /> },
  { href: '/app/templates', label: 'Meus Templates', icon: <GalleryVerticalEnd size={20} /> },
  { href: '/app/credits', label: 'Créditos', icon: <CreditCard size={20} /> },
  { href: '/app/profile', label: 'Meu Perfil', icon: <User size={20} /> },
];

export const ADMIN_NAV_LINKS = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
  { href: '/admin/approvals', label: 'Aprovações', icon: <Shield size={20} /> },
  { href: '/admin/notifications', label: 'Todas Notificações', icon: <Bell size={20} /> },
  { href: '/admin/clients', label: 'Clientes', icon: <Users2 size={20} /> },
  { href: '/admin/payments', label: 'Pagamentos', icon: <DollarSign size={20} /> },
  { href: '/admin/settings', label: 'Configurações', icon: <Settings size={20} /> },
];

export const STATUS_COLORS: { [key in NotificationStatus]: string } = {
  [NotificationStatus.PENDING]: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  [NotificationStatus.APPROVED]: 'bg-blue-100 text-blue-800 border-blue-300',
  [NotificationStatus.SENT_MAIL]: 'bg-green-100 text-green-800 border-green-300',
  [NotificationStatus.SENT_POST]: 'bg-green-100 text-green-800 border-green-300',
  [NotificationStatus.SENT_WHATSAPP]: 'bg-green-100 text-green-800 border-green-300',
  [NotificationStatus.REJECTED]: 'bg-red-100 text-red-800 border-red-300',
};

export const STATUS_LABELS: { [key in NotificationStatus]: string } = {
    [NotificationStatus.PENDING]: 'Pendente',
    [NotificationStatus.APPROVED]: 'Aprovado',
    [NotificationStatus.SENT_MAIL]: 'Enviado por E-mail',
    [NotificationStatus.SENT_POST]: 'Enviado pelos Correios',
    [NotificationStatus.SENT_WHATSAPP]: 'Enviado por WhatsApp',
    [NotificationStatus.REJECTED]: 'Rejeitado',
};
