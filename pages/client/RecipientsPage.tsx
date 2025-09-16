import React, { useState } from 'react';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Recipient } from '../../types';
import AddEditRecipientModal from '../../components/modals/AddEditRecipientModal';
import { UserPlus, Search, Edit, Trash2 } from 'lucide-react';

const mockRecipients: Recipient[] = [
  { id: 'r1', name: 'Empresa ABC', document: '12.345.678/0001-99', email: 'contato@empresaabc.com', phone: '(11) 2345-6789', address: 'Av. Paulista, 1000' },
  { id: 'r2', name: 'João da Silva', document: '123.456.789-00', email: 'joao.silva@email.com', phone: '(21) 98765-4321', address: 'Rua Copacabana, 500' },
  { id: 'r3', name: 'Maria Souza', document: '987.654.321-00', email: 'maria.souza@email.com', phone: '(31) 91234-5678', address: 'Av. Afonso Pena, 200' },
];

const RecipientsPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRecipient, setSelectedRecipient] = useState<Recipient | undefined>(undefined);

    const handleOpenModal = (recipient?: Recipient) => {
        setSelectedRecipient(recipient);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedRecipient(undefined);
        setIsModalOpen(false);
    };

    const handleSave = (recipient: Recipient) => {
        console.log('Saving recipient:', recipient);
        // Here you would add logic to save to state/API
        handleCloseModal();
    };

    return (
        <>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-brand-secondary-800">Destinatários</h1>
                        <p className="text-brand-secondary-500 mt-1">Gerencie sua lista de contatos para envio.</p>
                    </div>
                    <Button onClick={() => handleOpenModal()}><UserPlus size={16} className="mr-2" />Novo Destinatário</Button>
                </div>

                <Card>
                    <CardHeader>
                        <Input placeholder="Buscar por nome, CPF/CNPJ ou email..." icon={<Search size={16}/>} />
                    </CardHeader>
                     <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-brand-secondary-600">
                            <thead className="text-xs text-brand-secondary-700 uppercase bg-brand-secondary-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Nome / Razão Social</th>
                                    <th scope="col" className="px-6 py-3">CPF / CNPJ</th>
                                    <th scope="col" className="px-6 py-3">Contato</th>
                                    <th scope="col" className="px-6 py-3 text-right">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockRecipients.map((r) => (
                                    <tr key={r.id} className="bg-white border-b hover:bg-brand-secondary-50">
                                        <th scope="row" className="px-6 py-4 font-medium text-brand-secondary-900 whitespace-nowrap">{r.name}</th>
                                        <td className="px-6 py-4">{r.document}</td>
                                        <td className="px-6 py-4">
                                            <div>{r.email}</div>
                                            <div className="text-xs text-brand-secondary-500">{r.phone}</div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                <Button variant="ghost" size="sm" onClick={() => handleOpenModal(r)}><Edit size={16} /></Button>
                                                <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50"><Trash2 size={16} /></Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
            {isModalOpen && (
                <AddEditRecipientModal 
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSave={handleSave}
                    recipient={selectedRecipient}
                />
            )}
        </>
    );
};

export default RecipientsPage;