import React from 'react';
import Card, { CardContent, CardHeader } from '../../ui/Card';
import Button from '../../ui/Button';
import { EmailTemplate } from '../../../types';
import { Edit } from 'lucide-react';

const mockTemplates: EmailTemplate[] = [
    { id: 'tmpl1', name: 'Boas-vindas', subject: 'Bem-vindo à Noty!', updatedAt: '2023-10-01' },
    { id: 'tmpl2', name: 'Recuperação de Senha', subject: 'Redefina sua senha', updatedAt: '2023-10-01' },
    { id: 'tmpl3', name: 'Notificação Aprovada', subject: 'Sua notificação foi aprovada', updatedAt: '2023-10-15' },
    { id: 'tmpl4', name: 'Notificação Rejeitada', subject: 'Ação necessária: sua notificação foi rejeitada', updatedAt: '2023-10-20' },
];

const EmailSettings = () => {
    return (
        <Card>
            <CardHeader>
                <h2 className="text-lg font-semibold">Templates de E-mail</h2>
                <p className="text-sm text-brand-secondary-500">Personalize os e-mails transacionais enviados pela plataforma.</p>
            </CardHeader>
             <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-brand-secondary-600">
                    <thead className="text-xs text-brand-secondary-700 uppercase bg-brand-secondary-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Nome do Template</th>
                            <th scope="col" className="px-6 py-3">Assunto</th>
                            <th scope="col" className="px-6 py-3">Última Atualização</th>
                            <th scope="col" className="px-6 py-3 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockTemplates.map((t) => (
                            <tr key={t.id} className="bg-white border-b hover:bg-brand-secondary-50">
                                <th scope="row" className="px-6 py-4 font-medium text-brand-secondary-900 whitespace-nowrap">{t.name}</th>
                                <td className="px-6 py-4">{t.subject}</td>
                                <td className="px-6 py-4">{new Date(t.updatedAt).toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-right">
                                    <Button variant="ghost" size="sm"><Edit size={16} /> Editar</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default EmailSettings;
