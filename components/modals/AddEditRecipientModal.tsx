import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Recipient } from '../../types';

interface AddEditRecipientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (recipient: Recipient) => void;
  recipient?: Recipient;
}

const AddEditRecipientModal: React.FC<AddEditRecipientModalProps> = ({ isOpen, onClose, onSave, recipient }) => {
  const [formData, setFormData] = useState({
    id: recipient?.id || Date.now().toString(),
    name: recipient?.name || '',
    document: recipient?.document || '',
    email: recipient?.email || '',
    phone: recipient?.phone || '',
    address: recipient?.address || '',
  });

  useEffect(() => {
    if (recipient) {
      setFormData({
        id: recipient.id,
        name: recipient.name,
        document: recipient.document,
        email: recipient.email,
        phone: recipient.phone,
        address: recipient.address,
      });
    } else {
      setFormData({
        id: Date.now().toString(),
        name: '', document: '', email: '', phone: '', address: ''
      });
    }
  }, [recipient, isOpen]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={recipient ? 'Editar Destinatário' : 'Novo Destinatário'}>
      <form onSubmit={handleSubmit}>
        <div className="p-6 space-y-4">
          <Input label="Nome / Razão Social" name="name" value={formData.name} onChange={handleChange} required />
          <Input label="CPF / CNPJ" name="document" value={formData.document} onChange={handleChange} required />
          <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required />
          <Input label="Telefone" name="phone" value={formData.phone} onChange={handleChange} required />
          <Input label="Endereço Completo" name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div className="flex items-center justify-end p-4 space-x-2 bg-brand-secondary-50 border-t border-brand-secondary-200 rounded-b-xl">
          <Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button type="submit">{recipient ? 'Salvar Alterações' : 'Adicionar'}</Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddEditRecipientModal;