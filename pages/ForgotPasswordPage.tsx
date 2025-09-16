
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/shared/Logo';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import { Mail } from 'lucide-react';

const ForgotPasswordPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex justify-center mb-6">
          <Logo />
        </Link>
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-center text-brand-secondary-800">Recuperar Senha</h2>
            <p className="text-center text-sm text-brand-secondary-500 mt-1">
              Insira seu e-mail e enviaremos um link para redefinir sua senha.
            </p>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <Input
                id="email"
                label="Email"
                type="email"
                required
                placeholder="seu@email.com"
                icon={<Mail size={16} />}
              />
              <Button type="submit" className="w-full" size="lg">
                Enviar link de recuperação
              </Button>
            </form>
          </CardContent>
        </Card>
        <p className="mt-6 text-center text-sm text-brand-secondary-500">
          Lembrou sua senha?{' '}
          <Link to="/login" className="font-medium text-brand-primary-600 hover:text-brand-primary-500">
            Acesse aqui
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
