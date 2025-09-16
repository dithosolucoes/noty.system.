import React, { useState, useEffect } from 'react';
import { Bold, Italic, List, ListOrdered } from 'lucide-react';

interface RichTextEditorProps {
    initialContent?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ initialContent = '' }) => {
    const [content, setContent] = useState(initialContent);

    useEffect(() => {
        setContent(initialContent);
    }, [initialContent]);

    // This is a simplified representation. A real implementation would use a library like Tiptap/Quill
    // and manage the HTML content more robustly.
    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    }

    return (
        <div>
            <label className="block text-sm font-medium text-brand-secondary-700 mb-1">Corpo do Texto</label>
            <div className="border border-brand-secondary-300 rounded-md shadow-sm focus-within:ring-brand-primary-500 focus-within:border-brand-primary-500">
                <div className="p-2 border-b border-brand-secondary-200 flex items-center space-x-1">
                    <button type="button" className="p-1.5 rounded hover:bg-brand-secondary-100 text-brand-secondary-600"><Bold size={16} /></button>
                    <button type="button" className="p-1.5 rounded hover:bg-brand-secondary-100 text-brand-secondary-600"><Italic size={16} /></button>
                    <button type="button" className="p-1.5 rounded hover:bg-brand-secondary-100 text-brand-secondary-600"><List size={16} /></button>
                    <button type="button" className="p-1.5 rounded hover:bg-brand-secondary-100 text-brand-secondary-600"><ListOrdered size={16} /></button>
                </div>
                <div className="prose prose-sm max-w-none p-3 min-h-[200px]" dangerouslySetInnerHTML={{ __html: content }}></div>
                {/* For demonstration, we'll use a hidden textarea to show how state would be managed. */}
                <textarea
                    value={content}
                    onChange={handleTextChange}
                    rows={10}
                    className="block w-full p-3 border-0 focus:ring-0 sm:text-sm sr-only"
                    placeholder="Digite o texto da sua notificação aqui..."
                />
            </div>
        </div>
    );
};

export default RichTextEditor;
