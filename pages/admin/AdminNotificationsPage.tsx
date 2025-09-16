
import React from 'react';
import Card, { CardHeader } from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';
import { Notification, NotificationStatus } from '../../types';
import { Search } from 'lucide-react';

const mockAllNotifications: Notification[] = [
    { id: '1', client: {id: 'c3', name: 'Imobiliária Segura'}, title: 'Notificação de Dívida Pendente', recipient: { name: 'Empresa ABC', id: 'r1', document: '', email: '', phone: '', address: '' }, status: NotificationStatus.SENT_MAIL, createdAt: '2023-10-26T10:00:00Z', updatedAt: '2023-10-27T11:00:00Z', statusHistory: [], body: '', attachments: [] },
    { id: '2', client: {id: 'c1', name: 'João da Silva'}, title: 'Cobrança Extrajudicial', recipient: { name: 'Empresa XPTO', id: 'r2', document: '', email: '', phone: '', address: '' }, status: NotificationStatus.PENDING, createdAt: '2023-10-25T15:30:00Z', updatedAt: '2023-10-25T15:30:00Z', statusHistory: [], body: '', attachments: [] },
    { id: '3', client: {id: 'c1', name: 'João da Silva'}, title: 'Último Aviso Amigável', recipient: { name: 'Maria Souza', id: 'r3', document: '', email: '', phone: '', address: '' }, status: NotificationStatus.REJECTED, createdAt: '2023-10-24T09:00:00Z', updatedAt: '2023-10-24T14:00:00Z', statusHistory: [], body: '', attachments: [] },
    { id: '4', client: {id: 'c2', name: 'Advocacia Master'}, title: 'Comunicação Contratual', recipient: { name: 'Tech Solutions Ltda', id: 'r4', document: '', email: '', phone: '', address: '' }, status: NotificationStatus.APPROVED, createdAt: '2023-10-22T11:00:00Z', updatedAt: '2023-10-23T10:00:00Z', statusHistory: [], body: '', attachments: [] },
];

const AdminNotificationsPage: React.FC = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-brand-secondary-800">Todas as Notificações</h1>
                <p className="text-brand-secondary-500 mt-1">Visualize todas as notificações da plataforma.</p>
            </div>
            <Card>
                <CardHeader>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input placeholder="Buscar por título, cliente, etc..." icon={<Search size={16}/>} />
                         <select className="block w-full px-3 py-2 border border-brand-secondary-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary-500 focus:border-brand-primary-500 sm:text-sm">
                            <option>Todos os Status</option>
                            <option>Pendente</option>
                            <option>Aprovado</option>
                            <option>Enviado</option>
                            <option>Rejeitado</option>
                        </select>
                         <Input type="date" />
                    </div>
                </CardHeader>
                 <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-brand-secondary-600">
                        <thead className="text-xs text-brand-secondary-700 uppercase bg-brand-secondary-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Título</th>
                                <th scope="col" className="px-6 py-3">Cliente</th>
                                <th scope="col" className="px-6 py-3">Destinatário</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Última Atualização</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockAllNotifications.map((n) => (
                                <tr key={n.id} className="bg-white border-b hover:bg-brand-secondary-50">
                                    <th scope="row" className="px-6 py-4 font-medium text-brand-secondary-900 whitespace-nowrap">{n.title}</th>
                                    <td className="px-6 py-4">{n.client?.name}</td>
                                    <td className="px-6 py-4">{n.recipient.name}</td>
                                    <td className="px-6 py-4"><Badge status={n.status} /></td>
                                    <td className="px-6 py-4">{new Date(n.updatedAt).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default AdminNotificationsPage;
