import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Card, { CardContent, CardHeader, CardFooter } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import RichTextEditor from '../../components/shared/RichTextEditor';
import FileUpload from '../../components/shared/FileUpload';
import { FileEdit, Save, ArrowLeft } from 'lucide-react';

const EditNotificationPage: React.FC = () => {
  const { id } = useParams();
  // In a real app, you would fetch the notification data based on the id
  const [files, setFiles] = useState<File[]>([]);
  
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
        <div>
          <Link to={`/app/notifications/${id}`} className="flex items-center text-sm text-brand-secondary-600 hover:text-brand-secondary-900 mb-4">
              <ArrowLeft size={16} className="mr-2"/> Voltar para os detalhes
          </Link>
          <h1 className="text-3xl font-bold text-brand-secondary-800">Editar Notificação</h1>
          <p className="text-brand-secondary-500 mt-1">Ajuste os detalhes e reenvie sua notificação para análise.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                 <Card>
                    <CardHeader>
                        <h2 className="font-semibold">Conteúdo da Notificação</h2>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <Input label="Título da Notificação" defaultValue="Último Aviso Amigável" />
                         <RichTextEditor />
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
                    <CardContent>
                        <Input label="Destinatário" defaultValue="Maria Souza" disabled />
                        <p className="text-xs text-brand-secondary-500 mt-2">O destinatário não pode ser alterado após a criação.</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardFooter>
                       <Button className="w-full"><Save size={16} className="mr-2"/>Salvar Alterações</Button>
                    </CardFooter>
                </Card>

            </div>
        </div>
    </div>
  );
};

export default EditNotificationPage;