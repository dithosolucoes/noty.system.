
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Notification, NotificationStatus, StatusHistory, Recipient } from '../../types';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { ArrowLeft, Download, Paperclip, Mail, Phone, MapPin } from 'lucide-react';

const mockNotification: Notification = {
  id: '3',
  title: 'Último Aviso Amigável',
  recipient: {
    id: 'r3',
    name: 'Maria Souza',
    document: '123.456.789-00',
    email: 'maria.souza@example.com',
    phone: '(11) 98765-4321',
    address: 'Rua das Flores, 123, São Paulo, SP'
  },
  status: NotificationStatus.REJECTED,
  createdAt: '2023-10-24T09:00:00Z',
  updatedAt: '2023-10-24T14:00:00Z',
  body: '<p>Prezada Maria, este é um aviso referente ao débito em aberto...</p>',
  attachments: [{ name: 'contrato.pdf', url: '#' }, { name: 'fatura.pdf', url: '#' }],
  statusHistory: [
    { at: '2023-10-24T09:00:00Z', from: null, to: NotificationStatus.PENDING, by: 'client-001' },
    { at: '2023-10-24T14:00:00Z', from: NotificationStatus.PENDING, to: NotificationStatus.REJECTED, by: 'admin-001', notes: 'Documento do destinatário ilegível no anexo.' }
  ]
};

const TimelineItem = ({ item, isLast }: { item: StatusHistory; isLast: boolean }) => (
    <li>
        <div className="relative pb-8">
            {!isLast && <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-brand-secondary-200" aria-hidden="true"></span>}
            <div className="relative flex space-x-3">
                <div>
                    <span className="h-8 w-8 rounded-full bg-brand-secondary-200 flex items-center justify-center ring-8 ring-white">
                        <Paperclip className="h-5 w-5 text-brand-secondary-500" />
                    </span>
                </div>
                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                    <div>
                        <p className="text-sm text-brand-secondary-500">Status alterado para <Badge status={item.to} /></p>
                        {item.notes && (
                            <div className="mt-2 p-3 bg-yellow-50 rounded-md text-sm text-yellow-800">
                                <strong>Motivo da Rejeição:</strong> {item.notes}
                            </div>
                        )}
                    </div>
                    <div className="text-right text-sm whitespace-nowrap text-brand-secondary-500">
                        <time dateTime={item.at}>{new Date(item.at).toLocaleString()}</time>
                    </div>
                </div>
            </div>
        </div>
    </li>
);

const NotificationDetailPage: React.FC = () => {
    const { id } = useParams(); // In a real app, fetch notification by id

    return (
        <div className="space-y-6">
            <div>
                <Link to="/app/notifications" className="flex items-center text-sm text-brand-secondary-600 hover:text-brand-secondary-900 mb-4">
                    <ArrowLeft size={16} className="mr-2"/> Voltar para a lista
                </Link>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-brand-secondary-800">{mockNotification.title}</h1>
                        <p className="text-brand-secondary-500 mt-1">Detalhes da notificação ID: {id}</p>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center space-x-2">
                        <span className="text-sm font-medium text-brand-secondary-600">Status:</span>
                        <Badge status={mockNotification.status} />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader><h2 className="font-semibold text-lg">Linha do Tempo</h2></CardHeader>
                        <CardContent>
                            <ul>
                                {mockNotification.statusHistory.map((item, index) => (
                                    <TimelineItem key={index} item={item} isLast={index === mockNotification.statusHistory.length - 1} />
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                             <h2 className="font-semibold text-lg">Ações</h2>
                        </CardHeader>
                        <CardContent className="space-y-3">
                             <Button variant="primary" className="w-full"><Download size={16} className="mr-2"/>Baixar PDF</Button>
                             {mockNotification.status === NotificationStatus.REJECTED &&
                                <Link to={`/app/notifications/${id}/edit`} className="w-full block">
                                    <Button variant="secondary" className="w-full">Editar Notificação</Button>
                                </Link>
                             }
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                             <h2 className="font-semibold text-lg">Destinatário</h2>
                        </CardHeader>
                        <CardContent className="text-sm space-y-3">
                            <p className="font-bold text-brand-secondary-800">{mockNotification.recipient.name}</p>
                             <p className="flex items-start"><Mail size={14} className="mr-2 mt-1 text-brand-secondary-400"/><span className="flex-1">{mockNotification.recipient.email}</span></p>
                            <p className="flex items-start"><Phone size={14} className="mr-2 mt-1 text-brand-secondary-400"/><span className="flex-1">{mockNotification.recipient.phone}</span></p>
                            <p className="flex items-start"><MapPin size={14} className="mr-2 mt-1 text-brand-secondary-400"/><span className="flex-1">{mockNotification.recipient.address}</span></p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default NotificationDetailPage;
