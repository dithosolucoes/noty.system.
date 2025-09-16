import React, { useState } from 'react';
import Card, { CardContent, CardHeader } from '../../ui/Card';
import Button from '../../ui/Button';
import AddEditPackageModal from '../../modals/AddEditPackageModal';
import { CreditPackage } from '../../../types';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

const mockPackages: CreditPackage[] = [
    { id: 'pkg1', name: 'Pacote 50', credits: 50, price: 100.00, popular: false },
    { id: 'pkg2', name: 'Pacote 100', credits: 100, price: 180.00, popular: true },
    { id: 'pkg3', name: 'Pacote 200', credits: 200, price: 350.00, popular: false },
];

const CreditPackagesSettings = () => {
    const [packages, setPackages] = useState(mockPackages);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState<CreditPackage | undefined>(undefined);

    const handleOpenModal = (pkg?: CreditPackage) => {
        setSelectedPackage(pkg);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedPackage(undefined);
        setIsModalOpen(false);
    };

    const handleSave = (pkg: CreditPackage) => {
        if (selectedPackage) {
            setPackages(prev => prev.map(p => p.id === pkg.id ? pkg : p));
        } else {
            setPackages(prev => [...prev, { ...pkg, id: `pkg${Date.now()}` }]);
        }
        handleCloseModal();
    };

    return (
        <>
            <Card>
                <CardHeader className="flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-semibold">Pacotes de Crédito</h2>
                        <p className="text-sm text-brand-secondary-500">Gerencie os pacotes de créditos disponíveis para compra.</p>
                    </div>
                    <Button onClick={() => handleOpenModal()}><PlusCircle size={16} className="mr-2"/> Adicionar Pacote</Button>
                </CardHeader>
                <CardContent>
                    <div className="divide-y divide-brand-secondary-200">
                        {packages.map(pkg => (
                            <div key={pkg.id} className="py-4 flex items-center justify-between">
                                <div>
                                    <p className="font-semibold text-brand-secondary-800">{pkg.name} {pkg.popular && <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full ml-2">Popular</span>}</p>
                                    <p className="text-sm text-brand-secondary-500">
                                        {pkg.credits} créditos por R$ {pkg.price.toFixed(2)}
                                    </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Button variant="ghost" size="sm" onClick={() => handleOpenModal(pkg)}><Edit size={16}/></Button>
                                    <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50"><Trash2 size={16}/></Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
            {isModalOpen && (
                <AddEditPackageModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSave={handleSave}
                    creditPackage={selectedPackage}
                />
            )}
        </>
    );
};

export default CreditPackagesSettings;
