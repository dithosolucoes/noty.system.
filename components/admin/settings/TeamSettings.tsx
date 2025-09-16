import React, { useState } from 'react';
import Card, { CardHeader } from '../../ui/Card';
import Button from '../../ui/Button';
import InviteAdminModal from '../../modals/InviteAdminModal';
import { AdminTeamMember } from '../../../types';
import { UserPlus, MoreVertical } from 'lucide-react';

const mockTeam: AdminTeamMember[] = [
    { id: 'adm1', name: 'Maria Administradora', email: 'admin@noty.com', role: 'Admin', joinedAt: '2023-01-15' },
    { id: 'adm2', name: 'Carlos Revisor', email: 'carlos@noty.com', role: 'Approver', joinedAt: '2023-05-20' },
];

const TeamSettings = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <Card>
                <CardHeader className="flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-semibold">Equipe</h2>
                        <p className="text-sm text-brand-secondary-500">Gerencie os usuários administrativos da plataforma.</p>
                    </div>
                    <Button onClick={() => setIsModalOpen(true)}>
                        <UserPlus size={16} className="mr-2"/> Convidar Admin
                    </Button>
                </CardHeader>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-brand-secondary-600">
                        <thead className="text-xs text-brand-secondary-700 uppercase bg-brand-secondary-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Nome</th>
                                <th scope="col" className="px-6 py-3">Email</th>
                                <th scope="col" className="px-6 py-3">Cargo</th>
                                <th scope="col" className="px-6 py-3">Desde</th>
                                <th scope="col" className="px-6 py-3"><span className="sr-only">Ações</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockTeam.map((t) => (
                                <tr key={t.id} className="bg-white border-b hover:bg-brand-secondary-50">
                                    <th scope="row" className="px-6 py-4 font-medium text-brand-secondary-900 whitespace-nowrap">{t.name}</th>
                                    <td className="px-6 py-4">{t.email}</td>
                                    <td className="px-6 py-4">{t.role}</td>
                                    <td className="px-6 py-4">{new Date(t.joinedAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-right">
                                        <Button variant="ghost" size="sm"><MoreVertical size={16} /></Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
            <InviteAdminModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default TeamSettings;