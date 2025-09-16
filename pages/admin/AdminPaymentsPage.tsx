
import React, { useState, useMemo } from 'react';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Payment, PaymentStatus } from '../../types';
// FIX: Import the 'Zap' icon from 'lucide-react' to resolve the 'Cannot find name' error.
import { Search, CheckCircle, Clock, XCircle, RefreshCcw, DollarSign, ShoppingBag, Download, ChevronLeft, ChevronRight, Zap } from 'lucide-react';

const mockPayments: Payment[] = [
    { id: 'p1', clientName: 'Advocacia Master', packageName: 'Pacote 500', credits: 500, amount: 800.00, status: 'Completed', date: '2023-10-25', gatewayTxId: 'pi_3Nys...' },
    { id: 'p2', clientName: 'João da Silva', packageName: 'Pacote 100', credits: 100, amount: 180.00, status: 'Completed', date: '2023-10-22', gatewayTxId: 'pi_3Nyr...' },
    { id: 'p3', clientName: 'Imobiliária Segura', packageName: 'Pacote 50', credits: 50, amount: 100.00, status: 'Pending', date: '2023-10-27', gatewayTxId: 'pi_3Nyt...' },
    { id: 'p4', clientName: 'Tech Solutions', packageName: 'Pacote 100', credits: 100, amount: 180.00, status: 'Failed', date: '2023-10-26', gatewayTxId: 'pi_3Nyu...' },
    { id: 'p5', clientName: 'Advocacia Master', packageName: 'Pacote 200', credits: 200, amount: 350.00, status: 'Completed', date: '2023-09-15', gatewayTxId: 'pi_3Nwe...' },
    { id: 'p6', clientName: 'Consultoria Legal', packageName: 'Pacote 50', credits: 50, amount: 100.00, status: 'Refunded', date: '2023-09-10', gatewayTxId: 'pi_3Nwd...' },
    ...Array.from({ length: 25 }, (_, i) => ({
        id: `px${i}`,
        clientName: `Cliente Exemplo ${i + 1}`,
        packageName: i % 2 === 0 ? 'Pacote 50' : 'Pacote 100',
        credits: i % 2 === 0 ? 50 : 100,
        amount: i % 2 === 0 ? 100.00 : 180.00,
        status: (['Completed', 'Pending', 'Failed'] as PaymentStatus[])[i % 3],
        date: `2023-10-${(i % 28) + 1}`,
        gatewayTxId: `pi_mock...${i}`
    }))
];

const StatCard = ({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) => (
    <Card>
        <CardContent className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-brand-secondary-500">{title}</p>
                <p className="text-2xl font-bold text-brand-secondary-800">{value}</p>
            </div>
            <div className="p-3 bg-brand-primary-100 text-brand-primary-600 rounded-lg">{icon}</div>
        </CardContent>
    </Card>
);

const StatusBadge: React.FC<{ status: PaymentStatus }> = ({ status }) => {
    const statusMap = {
        Completed: { icon: <CheckCircle size={14} />, color: 'text-green-700 bg-green-50', label: 'Completo' },
        Pending: { icon: <Clock size={14} />, color: 'text-yellow-700 bg-yellow-50', label: 'Pendente' },
        Failed: { icon: <XCircle size={14} />, color: 'text-red-700 bg-red-50', label: 'Falhou' },
        Refunded: { icon: <RefreshCcw size={14} />, color: 'text-gray-700 bg-gray-100', label: 'Estornado' },
    };
    const { icon, color, label } = statusMap[status];
    return <span className={`inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-full ${color}`}>{icon}{label}</span>;
};

const ITEMS_PER_PAGE = 10;

const AdminPaymentsPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<PaymentStatus | 'all'>('all');
    const [currentPage, setCurrentPage] = useState(1);
    
    const filteredPayments = useMemo(() => {
        return mockPayments.filter(p => {
            const searchMatch = p.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) || p.gatewayTxId?.toLowerCase().includes(searchTerm.toLowerCase());
            const statusMatch = statusFilter === 'all' || p.status === statusFilter;
            return searchMatch && statusMatch;
        });
    }, [searchTerm, statusFilter]);

    const paginatedPayments = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        return filteredPayments.slice(start, end);
    }, [filteredPayments, currentPage]);

    const totalPages = Math.ceil(filteredPayments.length / ITEMS_PER_PAGE);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-brand-secondary-800">Centro de Controle de Pagamentos</h1>
                <p className="text-brand-secondary-500 mt-1">Gerencie e audite todas as transações da plataforma.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Faturamento (mês)" value="R$ 4.850,00" icon={<DollarSign size={24}/>} />
                <StatCard title="Transações (mês)" value="32" icon={<ShoppingBag size={24}/>} />
                <StatCard title="Pacote Mais Vendido" value="Pacote 100" icon={<Zap size={24}/>} />
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row gap-4 justify-between">
                         <Input 
                            placeholder="Buscar por cliente ou ID do gateway..." 
                            icon={<Search size={16}/>} 
                            className="w-full md:w-1/3"
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                        />
                        <div className="flex items-center gap-4">
                            <select 
                                value={statusFilter}
                                onChange={(e) => { setStatusFilter(e.target.value as any); setCurrentPage(1); }}
                                className="block w-full md:w-auto px-3 py-2 border border-brand-secondary-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary-500 focus:border-brand-primary-500 sm:text-sm"
                            >
                                <option value="all">Todos os Status</option>
                                <option value="Completed">Completo</option>
                                <option value="Pending">Pendente</option>
                                <option value="Failed">Falhou</option>
                                <option value="Refunded">Estornado</option>
                            </select>
                            <Button variant="secondary"><Download size={16} className="mr-2"/>Exportar CSV</Button>
                        </div>
                    </div>
                </CardHeader>
                 <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-brand-secondary-600">
                        <thead className="text-xs text-brand-secondary-700 uppercase bg-brand-secondary-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Cliente</th>
                                <th scope="col" className="px-6 py-3">Data</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Pacote</th>
                                <th scope="col" className="px-6 py-3">Valor</th>
                                <th scope="col" className="px-6 py-3">ID Gateway</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedPayments.map((p) => (
                                <tr key={p.id} className="bg-white border-b hover:bg-brand-secondary-50">
                                    <td className="px-6 py-4 font-medium text-brand-secondary-900">{p.clientName}</td>
                                    <td className="px-6 py-4">{new Date(p.date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4"><StatusBadge status={p.status} /></td>
                                    <td className="px-6 py-4">{p.packageName}</td>
                                    <td className="px-6 py-4">R$ {p.amount.toFixed(2)}</td>
                                    <td className="px-6 py-4 font-mono text-xs">{p.gatewayTxId}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                 <CardContent className="flex justify-between items-center">
                    <span className="text-sm text-brand-secondary-600">
                        Mostrando {filteredPayments.length > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0}-
                        {Math.min(currentPage * ITEMS_PER_PAGE, filteredPayments.length)} de {filteredPayments.length} resultados
                    </span>
                    <div className="flex items-center gap-2">
                        <Button variant="secondary" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
                            <ChevronLeft size={16}/> Anterior
                        </Button>
                        <Button variant="secondary" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                            Próximo <ChevronRight size={16}/>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminPaymentsPage;