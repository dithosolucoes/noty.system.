import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import Button from '../ui/Button';
import Input from '../ui/Input';
import RichTextEditor from '../shared/RichTextEditor';
import { NotificationBlueprint } from '../../types';

interface TemplateEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (template: NotificationBlueprint) => void;
  template?: NotificationBlueprint;
}

const TemplateEditorModal: React.FC<TemplateEditorModalProps> = ({ isOpen, onClose, onSave, template }) => {
  const [formData, setFormData] = useState({
    id: template?.id || '',
    title: template?.title || '',
    category: template?.category || 'Geral',
    body: template?.body || '',
  });

  useEffect(() => {
    if (template) {
      setFormData(template);
    } else {
      setFormData({ id: '', title: '', category: 'Geral', body: '' });
    }
  }, [template, isOpen]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as NotificationBlueprint);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={template ? 'Editar Template' : 'Novo Template'} size="xl">
      <form onSubmit={handleSubmit}>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Título do Template" name="title" value={formData.title} onChange={handleChange} required />
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-brand-secondary-700 mb-1">Categoria</label>
              <select id="category" name="category" value={formData.category} onChange={handleChange} className="block w-full px-3 py-2 border border-brand-secondary-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary-500 focus:border-brand-primary-500 sm:text-sm">
                <option>Geral</option>
                <option>Cobrança</option>
                <option>Contratual</option>
                <option>Comunicação</option>
              </select>
            </div>
          </div>
          <RichTextEditor initialContent={formData.body} />
           <div className="text-xs text-brand-secondary-500 bg-brand-secondary-50 p-3 rounded-md">
                <p className="font-semibold">Dica: Use variáveis para preenchimento automático!</p>
                {/* FIX: Replaced double curly braces `{{...}}` with single curly braces `{...}` for rendering strings in JSX. The double-brace syntax is invalid for rendering children elements. */}
                <p><code>{`{{destinatario.nome}}`}</code> - Nome do destinatário.</p>
                <p><code>{`{{minha_empresa.nome}}`}</code> - Nome da sua empresa.</p>
                <p><code>{`{{minha_empresa.logoUrl}}`}</code> - Logo da sua empresa.</p>
            </div>
        </div>
        <div className="flex items-center justify-end p-4 space-x-2 bg-brand-secondary-50 border-t border-brand-secondary-200 rounded-b-xl">
          <Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button type="submit">{template ? 'Salvar Alterações' : 'Criar Template'}</Button>
        </div>
      </form>
    </Modal>
  );
};

export default TemplateEditorModal;