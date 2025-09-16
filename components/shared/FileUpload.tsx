import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Paperclip, UploadCloud, X, FileText } from 'lucide-react';

interface FileUploadProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const FileUpload: React.FC<FileUploadProps> = ({ files, setFiles }) => {

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
  }, [setFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const removeFile = (fileToRemove: File) => {
    setFiles(prevFiles => prevFiles.filter(file => file !== fileToRemove));
  };

  return (
    <div className="space-y-4">
        <div 
            {...getRootProps()} 
            className={`border-2 border-dashed border-brand-secondary-300 rounded-lg p-6 text-center cursor-pointer transition-colors ${isDragActive ? 'bg-brand-primary-50 border-brand-primary-400' : 'bg-white hover:bg-brand-secondary-50'}`}
        >
            <input {...getInputProps()} />
            <UploadCloud className="mx-auto h-12 w-12 text-brand-secondary-400" />
            <p className="mt-2 text-sm text-brand-secondary-600">
                <span className="font-semibold text-brand-primary-600">Clique para enviar</span> ou arraste e solte
            </p>
            <p className="text-xs text-brand-secondary-500">PDF, JPG, PNG até 10MB</p>
        </div>

        {files.length > 0 && (
            <div className="space-y-2">
                <h4 className="text-sm font-medium text-brand-secondary-800">Arquivos Anexados:</h4>
                <ul className="divide-y divide-brand-secondary-200 border border-brand-secondary-200 rounded-md">
                    {files.map((file, index) => (
                        <li key={index} className="px-3 py-2 flex items-center justify-between text-sm">
                            <div className="flex items-center flex-1 min-w-0">
                                <FileText size={16} className="text-brand-secondary-500 mr-2 flex-shrink-0" />
                                <span className="truncate">{file.name}</span>
                            </div>
                            <button onClick={() => removeFile(file)} className="p-1 rounded-full hover:bg-red-100 text-red-500">
                                <X size={14} />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </div>
  );
};


export default FileUpload;