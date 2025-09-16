import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { CreditPackage } from '../../types';

interface AddEditPackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (pkg: CreditPackage) => void;
  creditPackage?: CreditPackage;
}

const AddEditPackageModal: React.FC<AddEditPackageModalProps> = ({ isOpen, onClose, onSave, creditPackage }) => {
  const [formData, setFormData] = useState({
    id: creditPackage?.id || '',
    name: creditPackage?.name || '',
    credits: creditPackage?.credits || 0,
    price: creditPackage?.price || 0,
    popular: creditPackage?.popular || false,
  });

  useEffect(() => {
    if (creditPackage) {
      setFormData(creditPackage);
    } else {
      setFormData({ id: '', name: '', credits: 0, price: 0, popular: false });
    }
  }, [creditPackage, isOpen]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
        ...prev, 
        [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) : value 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={creditPackage ? 'Editar Pacote' : 'Novo Pacote de Crédito'}>
      <form onSubmit={handleSubmit}>
        <div className="p-6 space-y-4">
          <Input label="Nome do Pacote" name="name" value={formData.name} onChange={handleChange} required />
          <Input label="Quantidade de Créditos" name="credits" type="number" value={formData.credits} onChange={handleChange} required />
          <Input label="Preço (R$)" name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required />
           <div className="flex items-center">
                <input id="popular" name="popular" type="checkbox" checked={formData.popular} onChange={handleChange} className="h-4 w-4 text-brand-primary-600 focus:ring-brand-primary-500 border-brand-secondary-300 rounded" />
                <label htmlFor="popular" className="ml-2 block text-sm text-brand-secondary-900">
                    Marcar como "Mais Popular"
                </label>
            </div>
        </div>
        <div className="flex items-center justify-end p-4 space-x-2 bg-brand-secondary-50 border-t border-brand-secondary-200 rounded-b-xl">
          <Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button type="submit">{creditPackage ? 'Salvar Alterações' : 'Adicionar Pacote'}</Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddEditPackageModal;