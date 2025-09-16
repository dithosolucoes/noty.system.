
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserRole } from '../types';
import Logo from '../components/shared/Logo';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import { Mail, Lock } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.CLIENT);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, role);
    navigate(role === UserRole.ADMIN ? '/admin' : '/app');
  };

  return (
    <div className="min-h-screen bg-brand-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex justify-center mb-6">
          <Logo />
        </Link>
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-center text-brand-secondary-800">Acesse sua conta</h2>
            <p className="text-center text-sm text-brand-secondary-500 mt-1">Bem-vindo de volta!</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-brand-secondary-700">Tipo de conta</p>
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" onClick={() => setRole(UserRole.CLIENT)} className={`p-3 rounded-md border text-sm transition-all ${role === UserRole.CLIENT ? 'bg-brand-primary-50 border-brand-primary-500 text-brand-primary-700 font-semibold' : 'bg-white border-brand-secondary-300 text-brand-secondary-600 hover:bg-brand-secondary-50'}`}>
                    Sou Cliente
                  </button>
                  <button type="button" onClick={() => setRole(UserRole.ADMIN)} className={`p-3 rounded-md border text-sm transition-all ${role === UserRole.ADMIN ? 'bg-brand-primary-50 border-brand-primary-500 text-brand-primary-700 font-semibold' : 'bg-white border-brand-secondary-300 text-brand-secondary-600 hover:bg-brand-secondary-50'}`}>
                    Sou Admin
                  </button>
                </div>
              </div>
              <Input
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu@email.com"
                icon={<Mail size={16} />}
              />
              <Input
                id="password"
                label="Senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                icon={<Lock size={16} />}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-brand-primary-600 focus:ring-brand-primary-500 border-brand-secondary-300 rounded" />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-brand-secondary-900">
                    Lembrar-me
                  </label>
                </div>
                <div className="text-sm">
                  <Link to="/forgot-password" className="font-medium text-brand-primary-600 hover:text-brand-primary-500">
                    Esqueceu sua senha?
                  </Link>
                </div>
              </div>
              <Button type="submit" className="w-full" size="lg">
                Entrar
              </Button>
            </form>
          </CardContent>
        </Card>
        <p className="mt-6 text-center text-sm text-brand-secondary-500">
          Não tem uma conta?{' '}
          <Link to="/register" className="font-medium text-brand-primary-600 hover:text-brand-primary-500">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
