import React, { useState } from 'react';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import TemplateEditorModal from '../../components/modals/TemplateEditorModal';
import { NotificationBlueprint } from '../../types';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

const mockCustomTemplates: NotificationBlueprint[] = [
    { id: 'c1', title: 'Meu Template de Cobrança Padrão', category: 'Cobrança', body: '<p>Template customizado de cobrança...</p>', isCustom: true },
    { id: 'c2', title: 'Notificação de Manutenção', category: 'Comunicação', body: '<p>Template de manutenção...</p>', isCustom: true },
];

const MyTemplatesPage: React.FC = () => {
    const [templates, setTemplates] = useState(mockCustomTemplates);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<NotificationBlueprint | undefined>(undefined);

    const handleOpenModal = (template?: NotificationBlueprint) => {
        setSelectedTemplate(template);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedTemplate(undefined);
        setIsModalOpen(false);
    };

    const handleSave = (template: NotificationBlueprint) => {
        if (selectedTemplate) {
            setTemplates(prev => prev.map(t => t.id === template.id ? template : t));
        } else {
            setTemplates(prev => [...prev, { ...template, id: `c${Date.now()}`, isCustom: true }]);
        }
        handleCloseModal();
    };
    
    return (
        <>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-brand-secondary-800">Meus Templates</h1>
                        <p className="text-brand-secondary-500 mt-1">Crie e gerencie seus próprios blueprints para agilizar o envio.</p>
                    </div>
                    <Button onClick={() => handleOpenModal()}><PlusCircle size={16} className="mr-2" />Novo Template</Button>
                </div>

                <Card>
                    <CardHeader>
                        <h2 className="text-lg font-semibold">Templates Salvos</h2>
                    </CardHeader>
                    <CardContent>
                        <div className="divide-y divide-brand-secondary-200">
                            {templates.map(template => (
                                <div key={template.id} className="py-4 flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold text-brand-secondary-800">{template.title}</p>
                                        <p className="text-sm text-brand-secondary-500">
                                            Categoria: {template.category}
                                        </p>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Button variant="ghost" size="sm" onClick={() => handleOpenModal(template)}><Edit size={16}/></Button>
                                        <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50"><Trash2 size={16}/></Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {templates.length === 0 && (
                            <div className="text-center py-12">
                                <h3 className="text-lg font-medium text-brand-secondary-800">Nenhum template customizado</h3>
                                <p className="text-sm text-brand-secondary-500 mt-1">Clique em "Novo Template" para criar seu primeiro.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
            {isModalOpen && (
                <TemplateEditorModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSave={handleSave}
                    template={selectedTemplate}
                />
            )}
        </>
    );
};

export default MyTemplatesPage;
