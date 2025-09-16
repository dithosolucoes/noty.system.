
import React from 'react';
import { Link } from 'react-router-dom';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';
import { Notification, NotificationStatus } from '../../types';
import { FilePlus, Filter, Search, Edit, Eye } from 'lucide-react';

const mockNotifications: Notification[] = [
  { id: '1', title: 'Notificação de Dívida Pendente', recipient: { name: 'Empresa ABC', id: 'r1', document: '', email: '', phone: '', address: '' }, status: NotificationStatus.SENT_MAIL, createdAt: '2023-10-26T10:00:00Z', updatedAt: '2023-10-27T11:00:00Z', statusHistory: [], body: '', attachments: [] },
  { id: '2', title: 'Cobrança Extrajudicial', recipient: { name: 'João da Silva', id: 'r2', document: '', email: '', phone: '', address: '' }, status: NotificationStatus.PENDING, createdAt: '2023-10-25T15:30:00Z', updatedAt: '2023-10-25T15:30:00Z', statusHistory: [], body: '', attachments: [] },
  { id: '3', title: 'Último Aviso Amigável', recipient: { name: 'Maria Souza', id: 'r3', document: '', email: '', phone: '', address: '' }, status: NotificationStatus.REJECTED, createdAt: '2023-10-24T09:00:00Z', updatedAt: '2023-10-24T14:00:00Z', statusHistory: [], body: '', attachments: [] },
  { id: '4', title: 'Comunicação Contratual', recipient: { name: 'Tech Solutions Ltda', id: 'r4', document: '', email: '', phone: '', address: '' }, status: NotificationStatus.APPROVED, createdAt: '2023-10-22T11:00:00Z', updatedAt: '2023-10-23T10:00:00Z', statusHistory: [], body: '', attachments: [] },
];

const NotificationsListPage: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-brand-secondary-800">Minhas Notificações</h1>
                    <p className="text-brand-secondary-500 mt-1">Visualize e gerencie todas as suas notificações.</p>
                </div>
                <Link to="/app/notifications/new">
                    <Button><FilePlus size={16} className="mr-2" />Nova Notificação</Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input placeholder="Buscar por título ou destinatário..." icon={<Search size={16}/>} />
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
                                <th scope="col" className="px-6 py-3">Destinatário</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Última Atualização</th>
                                <th scope="col" className="px-6 py-3 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockNotifications.map((n) => (
                                <tr key={n.id} className="bg-white border-b hover:bg-brand-secondary-50">
                                    <th scope="row" className="px-6 py-4 font-medium text-brand-secondary-900 whitespace-nowrap">{n.title}</th>
                                    <td className="px-6 py-4">{n.recipient.name}</td>
                                    <td className="px-6 py-4"><Badge status={n.status} /></td>
                                    <td className="px-6 py-4">{new Date(n.updatedAt).toLocaleString()}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <Link to={`/app/notifications/${n.id}`}>
                                                <Button variant="ghost" size="sm"><Eye size={16} /></Button>
                                            </Link>
                                            {(n.status === NotificationStatus.PENDING || n.status === NotificationStatus.REJECTED) && (
                                                <Link to={`/app/notifications/${n.id}/edit`}>
                                                    <Button variant="ghost" size="sm"><Edit size={16} /></Button>
                                                </Link>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default NotificationsListPage;
