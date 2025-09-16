import React, { useState } from 'react';
import Modal from './Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface InviteAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InviteAdminModal: React.FC<InviteAdminModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Approver');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Inviting ${email} as ${role}`);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Convidar Novo Administrador">
      <form onSubmit={handleSubmit}>
        <div className="p-6 space-y-4">
          <Input 
            label="Email" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="email@exemplo.com"
            required 
          />
          <div>
            <label className="block text-sm font-medium text-brand-secondary-700 mb-1">Cargo</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              className="block w-full px-3 py-2 border border-brand-secondary-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary-500 focus:border-brand-primary-500 sm:text-sm"
            >
              <option value="Approver">Aprovador</option>
              <option value="Admin">Administrador</option>
            </select>
          </div>
        </div>
        <div className="flex items-center justify-end p-4 space-x-2 bg-brand-secondary-50 border-t border-brand-secondary-200 rounded-b-xl">
          <Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button type="submit">Enviar Convite</Button>
        </div>
      </form>
    </Modal>
  );
};

export default InviteAdminModal;