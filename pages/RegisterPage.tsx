
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/shared/Logo';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import { User, Mail, Lock } from 'lucide-react';

const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-brand-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex justify-center mb-6">
          <Logo />
        </Link>
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-center text-brand-secondary-800">Crie sua conta</h2>
            <p className="text-center text-sm text-brand-secondary-500 mt-1">Comece a usar a Noty hoje mesmo.</p>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <Input
                id="name"
                label="Nome completo"
                type="text"
                required
                placeholder="Seu nome"
                icon={<User size={16}/>}
              />
              <Input
                id="email"
                label="Email"
                type="email"
                required
                placeholder="seu@email.com"
                icon={<Mail size={16}/>}
              />
              <Input
                id="password"
                label="Senha"
                type="password"
                required
                placeholder="••••••••"
                icon={<Lock size={16}/>}
              />
              <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="terms" name="terms" type="checkbox" className="h-4 w-4 text-brand-primary-600 focus:ring-brand-primary-500 border-brand-secondary-300 rounded" />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="text-brand-secondary-600">
                      Eu concordo com os <a href="#" className="font-medium text-brand-primary-600 hover:underline">Termos de Serviço</a> e <a href="#" className="font-medium text-brand-primary-600 hover:underline">Política de Privacidade</a>.
                    </label>
                  </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Criar conta
              </Button>
            </form>
          </CardContent>
        </Card>
        <p className="mt-6 text-center text-sm text-brand-secondary-500">
          Já tem uma conta?{' '}
          <Link to="/login" className="font-medium text-brand-primary-600 hover:text-brand-primary-500">
            Acesse aqui
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
