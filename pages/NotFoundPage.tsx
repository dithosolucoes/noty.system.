
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-secondary-50 flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-6xl font-extrabold text-brand-primary-600">404</h1>
        <h2 className="text-3xl font-bold text-brand-secondary-800 mt-4">Página não encontrada</h2>
        <p className="text-brand-secondary-500 mt-2 max-w-md">
            Desculpe, não conseguimos encontrar a página que você está procurando. Ela pode ter sido movida ou não existe mais.
        </p>
        <Link to="/" className="mt-8">
            <Button size="lg">Voltar para a Página Inicial</Button>
        </Link>
    </div>
  );
};

export default NotFoundPage;
