
import React from 'react';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Payment } from '../../types';
import { Zap, CheckCircle } from 'lucide-react';

const mockPayments: Payment[] = [
    { id: 'p1', packageName: 'Pacote 200', credits: 200, amount: 350.00, status: 'Completed', date: '2023-10-15' },
    { id: 'p2', packageName: 'Pacote 50', credits: 50, amount: 100.00, status: 'Completed', date: '2023-09-20' },
];


const PackageCard = ({ credits, price, bestValue }: { credits: number; price: number; bestValue?: boolean }) => (
    <Card className={`text-center flex flex-col ${bestValue ? 'border-brand-primary-500 border-2' : ''}`}>
        {bestValue && <div className="bg-brand-primary-600 text-white text-xs font-bold py-1 rounded-t-lg -mt-px">MAIS POPULAR</div>}
        <CardHeader>
            <h3 className="text-2xl font-bold text-brand-secondary-800">{credits} Créditos</h3>
        </CardHeader>
        <CardContent className="flex-grow">
            <p className="text-4xl font-extrabold text-brand-secondary-900">R$ {price.toFixed(2)}</p>
            <p className="text-brand-secondary-500">R$ {(price/credits).toFixed(2)} por notificação</p>
        </CardContent>
        <div className="p-6">
            <Button className="w-full" size="lg" variant={bestValue ? 'primary' : 'secondary'}><Zap size={16} className="mr-2" /> Comprar Agora</Button>
        </div>
    </Card>
);

const CreditsPage: React.FC = () => {
  return (
    <div className="space-y-8">
        <div>
            <h1 className="text-3xl font-bold text-brand-secondary-800">Créditos</h1>
            <p className="text-brand-secondary-500 mt-1">Compre créditos para enviar suas notificações.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <PackageCard credits={50} price={100} />
            <PackageCard credits={100} price={180} bestValue />
            <PackageCard credits={200} price={350} />
        </div>

        <Card>
            <CardHeader>
                <h2 className="text-lg font-semibold text-brand-secondary-800">Histórico de Compras</h2>
            </CardHeader>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-brand-secondary-600">
                    <thead className="text-xs text-brand-secondary-700 uppercase bg-brand-secondary-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Data</th>
                            <th scope="col" className="px-6 py-3">Pacote</th>
                            <th scope="col" className="px-6 py-3">Créditos</th>
                            <th scope="col" className="px-6 py-3">Valor</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockPayments.map((p) => (
                            <tr key={p.id} className="bg-white border-b hover:bg-brand-secondary-50">
                                <td className="px-6 py-4">{new Date(p.date).toLocaleDateString()}</td>
                                <td className="px-6 py-4 font-medium">{p.packageName}</td>
                                <td className="px-6 py-4">{p.credits}</td>
                                <td className="px-6 py-4">R$ {p.amount.toFixed(2)}</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center text-green-700">
                                        <CheckCircle size={16} className="mr-1.5"/>
                                        {p.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    </div>
  );
};

export default CreditsPage;
