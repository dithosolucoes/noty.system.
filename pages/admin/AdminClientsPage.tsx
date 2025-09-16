
import React from 'react';
import Card, { CardHeader } from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { User, UserRole } from '../../types';
import { Search, KeyRound } from 'lucide-react';

const mockClients: User[] = [
    { id: 'c1', name: 'João da Silva', email: 'joao.silva@email.com', role: UserRole.CLIENT, credits: 150 },
    { id: 'c2', name: 'Advocacia Master', email: 'contato@advmaster.com', role: UserRole.CLIENT, credits: 500 },
    { id: 'c3', name: 'Imobiliária Segura', email: 'admin@imobsegura.com.br', role: UserRole.CLIENT, credits: 25 },
];

const AdminClientsPage: React.FC = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-brand-secondary-800">Clientes</h1>
                <p className="text-brand-secondary-500 mt-1">Gerencie os clientes da plataforma.</p>
            </div>
             <Card>
                <CardHeader>
                    <Input placeholder="Buscar por nome ou email do cliente..." icon={<Search size={16}/>} />
                </CardHeader>
                 <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-brand-secondary-600">
                        <thead className="text-xs text-brand-secondary-700 uppercase bg-brand-secondary-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Nome</th>
                                <th scope="col" className="px-6 py-3">Email</th>
                                <th scope="col" className="px-6 py-3">Créditos</th>
                                <th scope="col" className="px-6 py-3 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockClients.map((c) => (
                                <tr key={c.id} className="bg-white border-b hover:bg-brand-secondary-50">
                                    <th scope="row" className="px-6 py-4 font-medium text-brand-secondary-900 whitespace-nowrap">{c.name}</th>
                                    <td className="px-6 py-4">{c.email}</td>
                                    <td className="px-6 py-4">{c.credits}</td>
                                    <td className="px-6 py-4 text-right">
                                        <Button variant="secondary" size="sm"><KeyRound size={14} className="mr-1"/> Resetar Senha</Button>
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

export default AdminClientsPage;
