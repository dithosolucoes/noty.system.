
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { NotificationStatus, Notification } from '../../types';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { AlertCircle, CheckCircle, Clock, FilePlus } from 'lucide-react';

const mockNotifications: Notification[] = [
    { id: '1', title: 'Notificação de Dívida Pendente', recipient: { name: 'Empresa ABC', document: '', email: '', phone: '', address: '', id: 'r1' }, status: NotificationStatus.SENT_MAIL, createdAt: '2023-10-26T10:00:00Z', updatedAt: '2023-10-27T11:00:00Z', statusHistory: [], body: '', attachments: [] },
    { id: '2', title: 'Cobrança Extrajudicial', recipient: { name: 'João da Silva', document: '', email: '', phone: '', address: '', id: 'r2' }, status: NotificationStatus.PENDING, createdAt: '2023-10-25T15:30:00Z', updatedAt: '2023-10-25T15:30:00Z', statusHistory: [], body: '', attachments: [] },
    { id: '3', title: 'Último Aviso Amigável', recipient: { name: 'Maria Souza', document: '', email: '', phone: '', address: '', id: 'r3' }, status: NotificationStatus.REJECTED, createdAt: '2023-10-24T09:00:00Z', updatedAt: '2023-10-24T14:00:00Z', statusHistory: [], body: '', attachments: [] },
];

const Alert = ({ icon, title, children, colorClass }: { icon: React.ReactNode, title: string, children: React.ReactNode, colorClass: string }) => (
    <div className={`p-4 rounded-lg border ${colorClass}`}>
        <div className="flex">
            <div className="flex-shrink-0">{icon}</div>
            <div className="ml-3">
                <h3 className="text-sm font-medium">{title}</h3>
                <div className="mt-2 text-sm">{children}</div>
            </div>
        </div>
    </div>
)

const ClientDashboardPage: React.FC = () => {
    const { user } = useAuth();

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-brand-secondary-800">Dashboard</h1>
                <p className="text-brand-secondary-500 mt-1">Bem-vindo(a) de volta, {user?.name}!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <Card>
                    <CardContent className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-brand-secondary-500">Saldo de Créditos</p>
                            <p className="text-3xl font-bold text-brand-secondary-800">{user?.credits}</p>
                        </div>
                        <Link to="/app/credits">
                             <Button>Comprar Créditos</Button>
                        </Link>
                    </CardContent>
                </Card>
                 <Card>
                    <CardContent>
                        <p className="text-sm font-medium text-brand-secondary-500">Notificações Pendentes</p>
                        <p className="text-3xl font-bold text-brand-secondary-800">1</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardContent>
                         <p className="text-sm font-medium text-brand-secondary-500">Enviadas este Mês</p>
                        <p className="text-3xl font-bold text-brand-secondary-800">12</p>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-4">
                 <Alert icon={<AlertCircle className="h-5 w-5 text-red-400" />} title="Notificação Rejeitada" colorClass="bg-red-50 border-red-200 text-red-800">
                    <p>Sua notificação "Último Aviso Amigável" foi rejeitada. <Link to="/app/notifications/3" className="font-semibold underline">Clique aqui para ver o motivo e editar</Link>.</p>
                </Alert>
                <Alert icon={<CheckCircle className="h-5 w-5 text-green-400" />} title="Rastreio Disponível" colorClass="bg-green-50 border-green-200 text-green-800">
                    <p>O código de rastreio para a notificação "Notificação de Dívida Pendente" já está disponível. <a href="#" className="font-semibold underline">Acompanhar entrega</a>.</p>
                </Alert>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-lg font-semibold text-brand-secondary-800">Notificações Recentes</h2>
                            <p className="text-sm text-brand-secondary-500">Acompanhe o andamento das suas últimas solicitações.</p>
                        </div>
                        <Link to="/app/notifications/new">
                            <Button variant="primary" size="sm"><FilePlus size={16} className="mr-2"/>Nova Notificação</Button>
                        </Link>
                    </div>
                </CardHeader>
                <CardContent>
                    <ul className="divide-y divide-brand-secondary-200">
                        {mockNotifications.map(n => (
                            <li key={n.id} className="py-4 flex items-center justify-between">
                                <div>
                                    <Link to={`/app/notifications/${n.id}`} className="font-semibold text-brand-primary-700 hover:underline">{n.title}</Link>
                                    <p className="text-sm text-brand-secondary-500">Para: {n.recipient.name} &middot; <time dateTime={n.updatedAt}>{new Date(n.updatedAt).toLocaleDateString()}</time></p>
                                </div>
                                <Badge status={n.status} />
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

        </div>
    );
};

export default ClientDashboardPage;
