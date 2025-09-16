
import React from 'react';
import { Link } from 'react-router-dom';
import Card, { CardHeader } from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { Notification, NotificationStatus } from '../../types';
import { Search, CheckCircle, XCircle, Eye } from 'lucide-react';

const mockPendingNotifications: Notification[] = [
  { id: '2', title: 'Cobrança Extrajudicial', client: {id: 'c1', name: 'João da Silva'}, recipient: { name: 'Empresa XPTO', id: 'r2', document: '', email: '', phone: '', address: '' }, status: NotificationStatus.PENDING, createdAt: '2023-10-25T15:30:00Z', updatedAt: '2023-10-25T15:30:00Z', statusHistory: [], body: '', attachments: [] },
  { id: '5', title: 'Notificação de Quebra de Contrato', client: {id: 'c2', name: 'Advocacia Master'}, recipient: { name: 'Pedro Henrique', id: 'r5', document: '', email: '', phone: '', address: '' }, status: NotificationStatus.PENDING, createdAt: '2023-10-26T11:00:00Z', updatedAt: '2023-10-26T11:00:00Z', statusHistory: [], body: '', attachments: [] },
];

const AdminApprovalsPage: React.FC = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-brand-secondary-800">Fila de Aprovação</h1>
                <p className="text-brand-secondary-500 mt-1">Analise e aprove ou rejeite as notificações pendentes.</p>
            </div>

            <Card>
                <CardHeader>
                    <Input placeholder="Buscar por cliente, título ou destinatário..." icon={<Search size={16}/>} />
                </CardHeader>
                 <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-brand-secondary-600">
                        <thead className="text-xs text-brand-secondary-700 uppercase bg-brand-secondary-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Título</th>
                                <th scope="col" className="px-6 py-3">Cliente</th>
                                <th scope="col" className="px-6 py-3">Data de Criação</th>
                                <th scope="col" className="px-6 py-3 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockPendingNotifications.map((n) => (
                                <tr key={n.id} className="bg-white border-b hover:bg-brand-secondary-50">
                                    <th scope="row" className="px-6 py-4 font-medium text-brand-secondary-900 whitespace-nowrap">{n.title}</th>
                                    <td className="px-6 py-4">{n.client?.name}</td>
                                    <td className="px-6 py-4">{new Date(n.createdAt).toLocaleString()}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <Link to={`/admin/approvals/${n.id}`}>
                                                <Button variant="primary" size="sm"><Eye size={14} className="mr-1"/> Analisar</Button>
                                            </Link>
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

export default AdminApprovalsPage;
