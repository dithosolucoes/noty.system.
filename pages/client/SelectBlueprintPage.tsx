import React from 'react';
import { Link } from 'react-router-dom';
import Card, { CardContent } from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import { NotificationBlueprint } from '../../types';
import { FileText, Search, PlusCircle } from 'lucide-react';

const mockBlueprints: NotificationBlueprint[] = [
    { id: 'blank', title: 'Começar do Zero', category: 'Geral', body: '' },
    { id: 'b1', title: 'Primeiro Aviso de Cobrança', category: 'Cobrança', body: '<p>Prezado(a) {{destinatario.nome}},</p><p>Esta é uma comunicação amigável da {{minha_empresa.nome}} referente a um débito em aberto.</p><p><br></p><p>Atenciosamente,</p><p>{{minha_empresa.nome}}</p><p>{{minha_empresa.logo}}</p>' },
    { id: 'b2', title: 'Notificação de Dívida Vencida', category: 'Cobrança', body: '<p>Prezado(a) {{destinatario.nome}},</p><p>Notificamos formalmente sobre a dívida vencida no valor de R$ [VALOR], referente a [MOTIVO].</p><p><br></p><p>Atenciosamente,</p><p>{{minha_empresa.nome}}</p>' },
    { id: 'b3', title: 'Aviso de Rescisão de Contrato', category: 'Contratual', body: '<p>Prezado(a) {{destinatario.nome}},</p><p>Por meio desta, notificamos a V.Sa. sobre a rescisão do contrato de [TIPO DE CONTRATO].</p><p><br></p><p>Atenciosamente,</p><p>{{minha_empresa.nome}}</p>' },
    { id: 'c1', title: 'Meu Template de Cobrança Padrão', category: 'Meus Templates', body: '<p>Meu texto customizado...</p>', isCustom: true },
];

const SelectBlueprintPage: React.FC = () => {
    const categories = [...new Set(mockBlueprints.map(b => b.category))];
    
    return (
        <div className="space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-brand-secondary-800">Criar Nova Notificação</h1>
                <p className="text-brand-secondary-500 mt-1 max-w-2xl mx-auto">Comece selecionando um blueprint. Eles contêm textos pré-definidos com variáveis que serão preenchidas automaticamente.</p>
            </div>
            
            <div className="max-w-xl mx-auto">
                <Input placeholder="Buscar blueprint..." icon={<Search size={16}/>} />
            </div>

            <div className="space-y-8">
                {categories.map(category => (
                    <div key={category}>
                        <h2 className="text-lg font-semibold text-brand-secondary-800 mb-3">{category}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                             {mockBlueprints.filter(b => b.category === category).map(bp => (
                                <Link to={`/app/notifications/new/from-blueprint/${bp.id}`} key={bp.id}>
                                    <Card className="hover:border-brand-primary-500 hover:shadow-lg transition-all h-full">
                                        <CardContent className="flex flex-col items-center text-center p-6">
                                            <div className={`p-3 rounded-full mb-3 ${bp.isCustom ? 'bg-green-100 text-green-600' : 'bg-brand-primary-100 text-brand-primary-600'}`}>
                                                <FileText size={24}/>
                                            </div>
                                            <p className="font-semibold text-brand-secondary-900">{bp.title}</p>
                                        </CardContent>
                                    </Card>
                                </Link>
                             ))}
                             {category === 'Meus Templates' && (
                                <Link to="/app/templates">
                                     <Card className="border-dashed hover:border-brand-primary-500 hover:text-brand-primary-600 hover:shadow-lg transition-all h-full text-brand-secondary-500">
                                        <CardContent className="flex flex-col items-center justify-center text-center p-6">
                                            <PlusCircle size={24} className="mb-3"/>
                                            <p className="font-semibold">Criar Novo Template</p>
                                        </CardContent>
                                    </Card>
                                </Link>
                             )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SelectBlueprintPage;
