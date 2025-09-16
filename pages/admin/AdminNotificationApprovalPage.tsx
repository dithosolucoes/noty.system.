
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Card, { CardContent, CardHeader, CardFooter } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { Notification, NotificationStatus } from '../../types';
import DispatchManager from '../../components/admin/DispatchManager';
import { ArrowLeft, Check, X, Paperclip, User, Building, FileText } from 'lucide-react';

const mockNotificationData: { [key: string]: Notification } = {
  '2': {
    id: '2',
    title: 'Cobrança Extrajudicial',
    client: { id: 'c1', name: 'João da Silva' },
    recipient: {
      id: 'r2',
      name: 'Empresa XPTO',
      document: '98.765.432/0001-11',
      email: 'financeiro@xpto.com',
      phone: '(11) 5555-4444',
      address: 'Rua das Indústrias, 789, São Paulo, SP',
    },
    status: NotificationStatus.PENDING,
    createdAt: '2023-10-25T15:30:00Z',
    updatedAt: '2023-10-25T15:30:00Z',
    body: '<p>Prezados Senhores,</p><p>Vimos por meio desta notificar V. Sa. a respeito de um débito pendente no valor de R$ 1.250,00, referente à nota fiscal NF-123.</p><p>Solicitamos a regularização em até 5 dias úteis.</p>',
    attachments: [{ name: 'NF-123.pdf', url: '#' }, { name: 'boleto.pdf', url: '#' }],
    statusHistory: []
  }
};


const AdminNotificationApprovalPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const [notification, setNotification] = useState<Notification | undefined>(mockNotificationData[id || '']);
  const [rejectionReason, setRejectionReason] = useState('');

  if (!notification) {
    return <div>Notificação não encontrada.</div>
  }

  const handleApprove = () => {
    setNotification(prev => prev ? { ...prev, status: NotificationStatus.APPROVED } : undefined);
  }

  return (
    <div className="space-y-6">
      <div>
        <Link to="/admin/approvals" className="flex items-center text-sm text-brand-secondary-600 hover:text-brand-secondary-900 mb-4">
          <ArrowLeft size={16} className="mr-2"/> Voltar para a fila
        </Link>
        <h1 className="text-3xl font-bold text-brand-secondary-800">Analisar Notificação</h1>
        <p className="text-brand-secondary-500 mt-1">ID da Notificação: {id}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><h2 className="font-semibold text-lg flex items-center"><FileText size={20} className="mr-2"/>Conteúdo da Notificação</h2></CardHeader>
            <CardContent>
              <h3 className="font-bold text-xl mb-4">{notification.title}</h3>
              <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: notification.body }} />
            </CardContent>
          </Card>
          <Card>
            <CardHeader><h2 className="font-semibold text-lg flex items-center"><Paperclip size={20} className="mr-2"/>Anexos</h2></CardHeader>
            <CardContent>
                <ul className="space-y-2">
                    {notification.attachments.map(att => (
                        <li key={att.name}>
                            <a href={att.url} target="_blank" rel="noreferrer" className="flex items-center text-brand-primary-600 hover:underline">
                                <Paperclip size={14} className="mr-2"/>{att.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </CardContent>
          </Card>
          {notification.status === NotificationStatus.APPROVED && <DispatchManager />}
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader><h2 className="font-semibold text-lg">Aprovação</h2></CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-brand-secondary-600">Status:</span>
                    <Badge status={notification.status} />
                </div>
              {notification.status === NotificationStatus.PENDING && (
                <div>
                  <label className="block text-sm font-medium text-brand-secondary-700 mb-1">Motivo da Rejeição (opcional)</label>
                  <textarea
                    rows={3}
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="block w-full p-2 border border-brand-secondary-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary-500 focus:border-brand-primary-500 sm:text-sm"
                    placeholder="Ex: Endereço do destinatário incompleto."
                  />
                </div>
              )}
            </CardContent>
            {notification.status === NotificationStatus.PENDING && (
              <CardFooter className="grid grid-cols-2 gap-2">
                <Button variant="danger"><X size={16} className="mr-2"/>Rejeitar</Button>
                <Button variant="primary" className="bg-green-600 hover:bg-green-700" onClick={handleApprove}><Check size={16} className="mr-2"/>Aprovar</Button>
              </CardFooter>
            )}
          </Card>
          <Card>
            <CardHeader><h2 className="font-semibold text-lg flex items-center"><User size={20} className="mr-2"/>Cliente</h2></CardHeader>
            <CardContent>
                <p className="font-bold text-brand-secondary-800">{notification.client?.name}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><h2 className="font-semibold text-lg flex items-center"><Building size={20} className="mr-2"/>Destinatário</h2></CardHeader>
            <CardContent className="text-sm space-y-1">
                <p className="font-bold text-brand-secondary-800">{notification.recipient.name}</p>
                <p>{notification.recipient.document}</p>
                <p>{notification.recipient.email}</p>
                <p>{notification.recipient.address}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminNotificationApprovalPage;