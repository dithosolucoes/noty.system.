import React, { useState } from 'react';
import Card, { CardContent } from '../../components/ui/Card';
import { CreditCard, Mail, Users, Settings } from 'lucide-react';
import CreditPackagesSettings from '../../components/admin/settings/CreditPackagesSettings';
import EmailSettings from '../../components/admin/settings/EmailSettings';
import TeamSettings from '../../components/admin/settings/TeamSettings';
import GeneralSettings from '../../components/admin/settings/GeneralSettings';


const TabButton = ({ active, onClick, children, icon }: { active: boolean, onClick: () => void, children: React.ReactNode, icon: React.ReactNode }) => (
    <button
        onClick={onClick}
        className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            active
                ? 'bg-brand-primary-50 text-brand-primary-600'
                : 'text-brand-secondary-600 hover:bg-brand-secondary-100'
        }`}
    >
        {icon}
        <span className="ml-2">{children}</span>
    </button>
);


const AdminSettingsPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('credits');

    const renderContent = () => {
        switch (activeTab) {
            case 'credits':
                return <CreditPackagesSettings />;
            case 'emails':
                return <EmailSettings />;
            case 'team':
                return <TeamSettings />;
            case 'general':
                return <GeneralSettings />;
            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-brand-secondary-800">Configurações</h1>
                <p className="text-brand-secondary-500 mt-1">Gerencie as configurações gerais da plataforma.</p>
            </div>

            <div className="flex flex-wrap gap-2 border-b border-brand-secondary-200 pb-2">
                <TabButton active={activeTab === 'credits'} onClick={() => setActiveTab('credits')} icon={<CreditCard size={16}/>}>
                    Créditos
                </TabButton>
                <TabButton active={activeTab === 'emails'} onClick={() => setActiveTab('emails')} icon={<Mail size={16}/>}>
                    E-mails
                </TabButton>
                 <TabButton active={activeTab === 'team'} onClick={() => setActiveTab('team')} icon={<Users size={16}/>}>
                    Equipe
                </TabButton>
                 <TabButton active={activeTab === 'general'} onClick={() => setActiveTab('general')} icon={<Settings size={16}/>}>
                    Geral
                </TabButton>
            </div>

            <div>
                {renderContent()}
            </div>
        </div>
    );
};

export default AdminSettingsPage;
