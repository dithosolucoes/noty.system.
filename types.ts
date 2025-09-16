export enum UserRole {
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN',
}

export enum NotificationStatus {
  PENDING = 'PENDENTE',
  APPROVED = 'APROVADO_AGUARDANDO_CORREIOS',
  SENT_MAIL = 'ENVIADO_EMAIL',
  SENT_POST = 'ENVIADO_CORREIOS',
  SENT_WHATSAPP = 'ENVIADO_WHATSAPP',
  REJECTED = 'REJEITADO', // Added for clarity in UI
}

export interface CompanyProfile {
  name: string;
  document: string; // CNPJ
  address: string;
  logoUrl: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  credits?: number;
  company?: CompanyProfile;
}

export interface Recipient {
  id:string;
  name: string;
  document: string; // CPF/CNPJ
  email: string;
  phone: string;
  address: string;
}

export interface StatusHistory {
  at: string;
  from: NotificationStatus | null;
  to: NotificationStatus;
  by: string; // user id
  notes?: string;
}

export interface Notification {
  id: string;
  title: string;
  recipient: Recipient;
  status: NotificationStatus;
  statusHistory: StatusHistory[];
  createdAt: string;
  updatedAt: string;
  body: string;
  attachments: { name: string; url: string }[];
  trackingCode?: string;
  client?: { id: string, name: string };
}

export type PaymentStatus = 'Completed' | 'Pending' | 'Failed' | 'Refunded';

export interface Payment {
  id: string;
  packageName: string;
  credits: number;
  amount: number;
  status: PaymentStatus;
  date: string;
  clientName?: string;
  gatewayTxId?: string;
}

export interface CreditPackage {
    id: string;
    name: string;
    credits: number;
    price: number;
    popular: boolean;
}

export interface EmailTemplate {
    id: string;
    name: string;
    subject: string;
    updatedAt: string;
}

export interface AdminTeamMember {
    id: string;
    name: string;
    email: string;
    role: 'Admin' | 'Approver'; // Example roles
    joinedAt: string;
}

export interface NotificationBlueprint {
  id: string;
  title: string;
  category: string;
  body: string;
  isCustom?: boolean;
}
