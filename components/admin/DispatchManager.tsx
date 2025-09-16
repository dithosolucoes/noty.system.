import React, { useState } from 'react';
import Card, { CardContent, CardHeader } from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Send, Hash, MessageSquare, Save } from 'lucide-react';

const DispatchManager = () => {
    const [trackingCode, setTrackingCode] = useState('');

    return (
        <Card>
            <CardHeader>
                <h2 className="font-semibold text-lg flex items-center"><Send size={20} className="mr-2"/>Gerenciar Disparos</h2>
            </CardHeader>
            <CardContent className="space-y-4 divide-y divide-brand-secondary-200">
                <div className="pt-4 first:pt-0">
                    <h3 className="font-medium text-brand-secondary-800">Correios</h3>
                    <div className="flex items-end space-x-2 mt-2">
                        <div className="flex-grow">
                             <Input 
                                label="Código de Rastreio" 
                                value={trackingCode}
                                onChange={(e) => setTrackingCode(e.target.value)}
                                icon={<Hash size={16}/>}
                                placeholder="PX123456789BR"
                            />
                        </div>
                        <Button size="md"><Save size={16} className="mr-2"/>Registrar</Button>
                    </div>
                </div>
                 <div className="pt-4 first:pt-0">
                    <h3 className="font-medium text-brand-secondary-800">WhatsApp</h3>
                    <p className="text-sm text-brand-secondary-500 mt-1">Confirme o envio manual da notificação por WhatsApp.</p>
                     <div className="flex items-center space-x-2 mt-2">
                        <Button variant="secondary" size="md"><MessageSquare size={16} className="mr-2"/>Confirmar Envio Manual</Button>
                    </div>
                </div>
                 <div className="pt-4 first:pt-0">
                    <h3 className="font-medium text-brand-secondary-800">E-mail</h3>
                    <p className="text-sm text-brand-secondary-500 mt-1">O e-mail foi disparado automaticamente no momento da aprovação.</p>
                </div>
            </CardContent>
        </Card>
    );
};

export default DispatchManager;
