import React, { useState, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Card, { CardContent, CardHeader, CardFooter } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import RichTextEditor from '../../components/shared/RichTextEditor';
import FileUpload from '../../components/shared/FileUpload';
import Modal from '../../components/modals/Modal';
import AddEditRecipientModal from '../../components/modals/AddEditRecipientModal';
import { Recipient, NotificationBlueprint } from '../../types';
import { useAuth } from '../../hooks/useAuth';
import { FilePlus, UserPlus, Eye, ArrowLeft, X } from 'lucide-react';

const mockBlueprints: NotificationBlueprint[] = [
    { id: 'blank', title: 'Começar do Zero', category: 'Geral', body: '' },
    { id: 'b1', title: 'Primeiro Aviso de Cobrança', category: 'Cobrança', body: '<p>Prezado(a) {{destinatario.nome}},</p><p>Esta é uma comunicação amigável da {{minha_empresa.nome}} referente a um débito em aberto.</p><p><br></p><p>Atenciosamente,</p><p>{{minha_empresa.nome}}</p><p><img src="{{minha_empresa.logoUrl}}" alt="Logo" width="150" /></p>' },
    { id: 'b2', title: 'Notificação de Dívida Vencida', category: 'Cobrança', body: '<p>Prezado(a) {{destinatario.nome}},</p><p>Notificamos formalmente sobre a dívida vencida no valor de R$ [VALOR], referente a [MOTIVO].</p><p><br></p><p>Atenciosamente,</p><p>{{minha_empresa.nome}}</p>' },
    { id: 'b3', title: 'Aviso de Rescisão de Contrato', category: 'Contratual', body: '<p>Prezado(a) {{destinatario.nome}},</p><p>Por meio desta, notificamos a V.Sa. sobre a rescisão do contrato de [TIPO DE CONTRATO].</p><p><br></p><p>Atenciosamente,</p><p>{{minha_empresa.nome}}</p>' },
    { id: 'c1', title: 'Meu Template de Cobrança Padrão', category: 'Meus Templates', body: '<p>Meu texto customizado...</p>', isCustom: true },
];


const NotificationEditorPage: React.FC = () => {
  const { blueprintId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const blueprint = useMemo(() => mockBlueprints.find(b => b.id === blueprintId), [blueprintId]);

  const [isRecipientModalOpen, setRecipientModalOpen] = useState(false);
  const [isPreviewModalOpen, setPreviewModalOpen] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [selectedRecipient, setSelectedRecipient] = useState<Recipient | null>(null);

  const processTemplate = (templateBody: string, recipientName: string) => {
    let processedBody = templateBody;
    if (user?.company) {
      processedBody = processedBody.replace(/{{minha_empresa.nome}}/g, user.company.name || '');
      processedBody = processedBody.replace(/{{minha_empresa.logoUrl}}/g, user.company.logoUrl || '');
    }
    processedBody = processedBody.replace(/{{destinatario.nome}}/g, recipientName || '[Nome do Destinatário]');
    return processedBody;
  }
  
  const initialBody = useMemo(() => {
    if(!blueprint) return '';
    return processTemplate(blueprint.body, selectedRecipient?.name || '');
  }, [blueprint, user, selectedRecipient]);

  if (!blueprint) {
    return (
        <div className="text-center">
            <h2 className="text-2xl font-bold">Blueprint não encontrado</h2>
            <p className="mt-2">O modelo de notificação que você selecionou não existe.</p>
            <Link to="/app/notifications/new" className="mt-4 inline-block">
                <Button>Voltar para a seleção</Button>
            </Link>
        </div>
    )
  }
  
  const handleSaveRecipient = (recipient: Recipient) => {
    setSelectedRecipient(recipient);
    console.log("Recipient saved:", recipient);
    setRecipientModalOpen(false);
  };
  
  return (
    <>
      <div className="space-y-6 max-w-5xl mx-auto">
          <div>
            <Link to="/app/notifications/new" className="flex items-center text-sm text-brand-secondary-600 hover:text-brand-secondary-900 mb-4">
                <ArrowLeft size={16} className="mr-2"/> Voltar para seleção de blueprints
            </Link>
            <h1 className="text-3xl font-bold text-brand-secondary-800">{blueprint.title}</h1>
            <p className="text-brand-secondary-500 mt-1">Preencha os detalhes restantes para criar e enviar sua notificação.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                   <Card>
                      <CardHeader>
                          <h2 className="font-semibold">Conteúdo da Notificação</h2>
                      </CardHeader>
                      <CardContent className="space-y-4">
                           <Input label="Título da Notificação" placeholder="Ex: Cobrança de mensalidade atrasada" defaultValue={blueprint.title === 'Começar do Zero' ? '' : blueprint.title} />
                           <RichTextEditor initialContent={initialBody} />
                      </CardContent>
                  </Card>

                   <Card>
                      <CardHeader>
                          <h2 className="font-semibold">Anexos</h2>
                      </CardHeader>
                      <CardContent>
                          <FileUpload files={files} setFiles={setFiles} />
                      </CardContent>
                  </Card>
              </div>
              
              <div className="space-y-6">
                  <Card>
                      <CardHeader>
                          <h2 className="font-semibold">Destinatário</h2>
                      </CardHeader>
                      <CardContent className="space-y-4">
                          <select className="block w-full px-3 py-2 border border-brand-secondary-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary-500 focus:border-brand-primary-500 sm:text-sm">
                              <option>Selecionar existente...</option>
                              <option>Empresa ABC</option>
                              <option>João da Silva</option>
                          </select>
                          <Button variant="secondary" className="w-full" onClick={() => setRecipientModalOpen(true)}>
                            <UserPlus size={16} className="mr-2"/>Novo Destinatário
                          </Button>
                      </CardContent>
                  </Card>

                  <Card>
                      <CardHeader>
                          <h2 className="font-semibold">Resumo e Envio</h2>
                      </CardHeader>
                      <CardContent className="text-sm space-y-2">
                          <div className="flex justify-between">
                              <span>Custo da operação:</span>
                              <span className="font-semibold">10 créditos</span>
                          </div>
                           <div className="flex justify-between font-bold text-brand-primary-700 pt-2 border-t">
                              <span>Saldo final:</span>
                              <span>{user?.credits ? user.credits - 10 : 0} créditos</span>
                          </div>
                      </CardContent>
                      <CardFooter className="grid grid-cols-2 gap-2">
                         <Button variant="secondary" onClick={() => setPreviewModalOpen(true)}><Eye size={16} className="mr-2"/>Preview</Button>
                         <Button><FilePlus size={16} className="mr-2"/>Salvar e Enviar</Button>
                      </CardFooter>
                  </Card>
              </div>
          </div>
      </div>
      
      <AddEditRecipientModal 
        isOpen={isRecipientModalOpen}
        onClose={() => setRecipientModalOpen(false)}
        onSave={handleSaveRecipient}
      />

      <Modal isOpen={isPreviewModalOpen} onClose={() => setPreviewModalOpen(false)} title="Preview da Notificação">
          <div className="p-6 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: processTemplate(blueprint.body, selectedRecipient?.name || '') }}>
          </div>
          <div className="p-4 bg-gray-50 text-right">
              <Button variant="secondary" onClick={() => setPreviewModalOpen(false)}>Fechar</Button>
          </div>
      </Modal>
    </>
  );
};

export default NotificationEditorPage;
