import React from 'react';
import Card, { CardContent, CardHeader, CardFooter } from '../../ui/Card';
import Button from '../../ui/Button';
import Input from '../../ui/Input';

const GeneralSettings = () => {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <h2 className="text-lg font-semibold">Informações da Empresa</h2>
                    <p className="text-sm text-brand-secondary-500">Esses dados podem ser usados em faturas e e-mails.</p>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <Input label="Nome da Empresa" defaultValue="Noty" />
                     <Input label="CNPJ" placeholder="00.000.000/0000-00" />
                     <Input label="Endereço" placeholder="Rua, Número, Cidade, Estado" />
                     <Input label="Email de Contato" type="email" placeholder="contato@suaempresa.com" />
                </CardContent>
                <CardFooter className="text-right">
                    <Button>Salvar Informações</Button>
                </CardFooter>
            </Card>

             <Card>
                <CardHeader>
                    <h2 className="text-lg font-semibold">Chaves de API</h2>
                    <p className="text-sm text-brand-secondary-500">Gerencie as integrações com serviços de terceiros.</p>
                </CardHeader>
                <CardContent className="space-y-4">
                     <Input label="Gateway de Pagamento (Chave Pública)" type="password" placeholder="pk_live_..." />
                     <Input label="Serviço de E-mail (Chave Secreta)" type="password" placeholder="••••••••••••••••" />
                </CardContent>
                 <CardFooter className="text-right">
                    <Button>Salvar Chaves</Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default GeneralSettings;
