
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/shared/Logo';
import Button from '../components/ui/Button';
import { ShieldCheck, Zap, Clock } from 'lucide-react';

// NOTE: three.js and related libraries are not available in this environment.
// A static but visually appealing background will be created instead.
const ThreeCanvasPlaceholder = () => (
    <div className="absolute inset-0 z-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(circle at center, #13477a 0%, #020617 70%)',
    }}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%20fill-rule%3D%22evenodd%22%3E%3Cpath%20d%3D%22M0%2040L40%200H20L0%2020M40%2040V20L20%2040%22/%3E%3C/g%3E%3C/svg%3E')]" />
    </div>
);


const FeatureCard = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
    <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
        <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-brand-primary-600 text-white mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-brand-secondary-300">{children}</p>
    </div>
);

const LandingPage: React.FC = () => {
    return (
        <div className="min-h-screen bg-brand-secondary-950 text-white font-sans overflow-x-hidden">
            <ThreeCanvasPlaceholder />

            <header className="relative z-10 flex justify-between items-center p-6 lg:px-12">
                <Logo className="text-white" />
                <nav className="flex items-center space-x-4">
                    <Link to="/login" className="text-sm font-semibold hover:text-brand-primary-400 transition-colors">Entrar</Link>
                    <Link to="/register">
                        <Button variant="primary" size="sm">Começar Agora</Button>
                    </Link>
                </nav>
            </header>

            <main className="relative z-10">
                <section className="text-center py-20 lg:py-32 px-4">
                    <h1 className="text-4xl lg:text-6xl font-extrabold mb-4 leading-tight">
                        Notificações Extrajudiciais, <br />
                        <span className="text-brand-primary-500">Simplificadas e Seguras.</span>
                    </h1>
                    <p className="text-lg lg:text-xl text-brand-secondary-300 max-w-3xl mx-auto mb-8">
                        Crie, gerencie e envie notificações com validade jurídica através de múltiplos canais. Tudo em uma plataforma robusta e intuitiva.
                    </p>
                    <Link to="/register">
                        <Button variant="primary" size="lg">Crie sua Conta Grátis</Button>
                    </Link>
                </section>

                <section className="py-20 lg:py-24 px-4">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl font-bold text-center mb-12">Por que escolher a Noty?</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <FeatureCard icon={<ShieldCheck size={24} />} title="Validade Jurídica">
                                Rastreabilidade completa com trilha de auditoria e carimbo de tempo para máxima segurança probatória.
                            </FeatureCard>
                            <FeatureCard icon={<Zap size={24} />} title="Agilidade Total">
                                Envie notificações por Correios, E-mail e WhatsApp a partir de um único lugar. Acelere seus processos.
                            </FeatureCard>
                            <FeatureCard icon={<Clock size={24} />} title="Acompanhamento Real-Time">
                                Monitore o status de cada notificação em tempo real, desde a criação até a entrega final ao destinatário.
                            </FeatureCard>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="relative z-10 text-center py-8 px-4 border-t border-white/10">
                <p className="text-brand-secondary-400">&copy; {new Date().getFullYear()} Noty. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
