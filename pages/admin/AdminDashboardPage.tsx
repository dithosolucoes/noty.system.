
import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Shield, Clock, Users, DollarSign } from 'lucide-react';

const notificationsByStatusData = [
  { name: 'Pendente', count: 15, fill: '#f59e0b' },
  { name: 'Aprovado', count: 8, fill: '#3b82f6' },
  { name: 'Enviado', count: 45, fill: '#22c55e' },
  { name: 'Rejeitado', count: 3, fill: '#ef4444' },
];

const submissionsPerDayData = [
  { name: 'Seg', submissions: 12 },
  { name: 'Ter', submissions: 19 },
  { name: 'Qua', submissions: 15 },
  { name: 'Qui', submissions: 25 },
  { name: 'Sex', submissions: 21 },
  { name: 'Sáb', submissions: 8 },
  { name: 'Dom', submissions: 5 },
];

const StatCard = ({ title, value, icon, ctaLink, ctaText }: { title: string; value: string; icon: React.ReactNode; ctaLink?: string; ctaText?: string }) => (
    <Card>
        <CardContent>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-brand-secondary-500">{title}</p>
                    <p className="text-3xl font-bold text-brand-secondary-800">{value}</p>
                </div>
                <div className="p-3 bg-brand-primary-100 text-brand-primary-600 rounded-lg">
                    {icon}
                </div>
            </div>
            {ctaLink && ctaText && (
                <div className="mt-4">
                    <Link to={ctaLink}>
                         <Button variant="secondary" size="sm" className="w-full">{ctaText}</Button>
                    </Link>
                </div>
            )}
        </CardContent>
    </Card>
);


const AdminDashboardPage: React.FC = () => {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-brand-secondary-800">Dashboard Administrativo</h1>
                <p className="text-brand-secondary-500 mt-1">Visão geral da plataforma.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Pendentes de Aprovação" value="15" icon={<Shield size={24}/>} ctaLink="/admin/approvals" ctaText="Ir para Aprovações"/>
                <StatCard title="Tempo Médio Aprovação" value="8h 24m" icon={<Clock size={24}/>}/>
                <StatCard title="Clientes Ativos" value="78" icon={<Users size={24}/>}/>
                <StatCard title="Faturamento (mês)" value="R$ 4.850" icon={<DollarSign size={24}/>}/>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                 <Card>
                    <CardHeader>
                        <h2 className="font-semibold text-lg">Notificações por Status</h2>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={notificationsByStatusData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" name="Quantidade" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <h2 className="font-semibold text-lg">Envios por Dia (Última Semana)</h2>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                           <LineChart data={submissionsPerDayData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="submissions" name="Envios" stroke="#1580e5" strokeWidth={2} />
                           </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
