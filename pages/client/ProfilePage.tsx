import React, { useState } from 'react';
import Card, { CardContent, CardHeader, CardFooter } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../hooks/useAuth';
import { UploadCloud } from 'lucide-react';

const TabButton = ({ active, onClick, children }: { active: boolean, onClick: () => void, children: React.ReactNode }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 transition-colors ${
            active
                ? 'border-brand-primary-600 text-brand-primary-600'
                : 'border-transparent text-brand-secondary-500 hover:text-brand-secondary-700 hover:border-brand-secondary-300'
        }`}
    >
        {children}
    </button>
);

const PersonalInfoTab = () => {
    const { user } = useAuth();
    return (
        <Card>
            <CardHeader>
                <h2 className="font-semibold text-lg">Informações Pessoais</h2>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <Input label="Nome Completo" defaultValue={user?.name} />
                 <Input label="Email" type="email" defaultValue={user?.email} disabled />
                 <Input label="Telefone" placeholder="(00) 00000-0000" />
            </CardContent>
            <CardFooter className="text-right">
                <Button>Salvar Alterações</Button>
            </CardFooter>
        </Card>
    );
}

const CompanyInfoTab = () => {
    const { user } = useAuth();
    return (
        <Card>
            <CardHeader>
                <h2 className="font-semibold text-lg">Minha Empresa</h2>
                <p className="text-sm text-brand-secondary-500 mt-1">Esses dados serão usados para preencher suas notificações automaticamente.</p>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Nome da Empresa / Razão Social" defaultValue={user?.company?.name} />
                    <Input label="CNPJ" defaultValue={user?.company?.document} />
                </div>
                <Input label="Endereço Completo da Empresa" defaultValue={user?.company?.address} />
                <div>
                    <label className="block text-sm font-medium text-brand-secondary-700 mb-1">Logo da Empresa</label>
                    <div className="flex items-center gap-4">
                        {user?.company?.logoUrl && <img src={user.company.logoUrl} alt="Logo" className="w-16 h-16 rounded-md object-contain bg-brand-secondary-100 p-1" />}
                        <div className="flex-1 border-2 border-dashed border-brand-secondary-300 rounded-lg p-6 text-center cursor-pointer hover:bg-brand-secondary-50">
                            <UploadCloud className="mx-auto h-8 w-8 text-brand-secondary-400" />
                            <p className="mt-1 text-sm text-brand-secondary-600">Arraste um arquivo ou <span className="font-semibold text-brand-primary-600">clique para enviar</span></p>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="text-right">
                <Button>Salvar Informações da Empresa</Button>
            </CardFooter>
        </Card>
    );
}


const ProfilePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('personal');

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold text-brand-secondary-800">Meu Perfil</h1>
                <p className="text-brand-secondary-500 mt-1">Gerencie suas informações pessoais e da sua empresa.</p>
            </div>
            
            <div className="border-b border-brand-secondary-200">
                <nav className="-mb-px flex space-x-4" aria-label="Tabs">
                    <TabButton active={activeTab === 'personal'} onClick={() => setActiveTab('personal')}>Informações Pessoais</TabButton>
                    <TabButton active={activeTab === 'company'} onClick={() => setActiveTab('company')}>Minha Empresa</Button>
                </nav>
            </div>

            <div>
                {activeTab === 'personal' && <PersonalInfoTab />}
                {activeTab === 'company' && <CompanyInfoTab />}
            </div>
        </div>
    );
};

export default ProfilePage;
