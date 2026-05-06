import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useMemo, useState } from 'react';

// --- Reusable Components ---
const Card = ({ title, children, className = "", subtitle = "" }: { title: string, children: React.ReactNode, className?: string, subtitle?: string }) => (
    <div className={`bg-white rounded-[1.25rem] p-6 shadow-[0_4px_20px_rgba(37,99,235,0.05)] border border-blue-50 flex flex-col ${className}`}>
        <div className="mb-4">
            <h3 className="text-gray-800 text-sm font-bold capitalize tracking-wide leading-tight">{title}</h3>
            {subtitle && <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest mt-1 opacity-70">{subtitle}</p>}
        </div>
        <div className="flex-1 w-full relative">
            {children}
        </div>
    </div>
);

const AreaChart = ({ data, color = "#3b82f6", unit = "" }: { data: any[], color?: string, unit?: string }) => {
    return (
        <div className="w-full h-full relative flex flex-col justify-end">
            <div className="flex-1 w-full relative flex items-end">
                <svg viewBox="0 0 200 60" className="w-full h-40" preserveAspectRatio="none">
                    <path 
                        d="M0,60 L0,40 C20,40 30,50 50,45 C70,40 80,50 100,50 C120,50 130,30 150,20 C170,10 180,35 200,30 L200,60 Z" 
                        fill="rgba(186, 230, 253, 0.4)" 
                    />
                    <path 
                        d="M0,40 C20,40 30,50 50,45 C70,40 80,50 100,50 C120,50 130,30 150,20 C170,10 180,35 200,30" 
                        fill="none" 
                        stroke={color} 
                        strokeWidth="1.5" 
                    />
                </svg>
            </div>
            {unit && <div className="absolute top-0 right-0 text-[10px] font-bold text-gray-400 uppercase tracking-widest">{unit}</div>}
        </div>
    );
};

const BarChart = ({ data, unit = "" }: { data: any[], unit?: string }) => {
    const values = data?.length > 0 ? data : [40, 60, 40, 50, 70, 40, 60, 40, 80, 50, 60];
    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex items-end gap-2 w-full h-32 mt-4">
                {values.map((val, idx) => (
                    <div key={idx} className="flex-1 flex items-end h-full">
                        <div 
                            className={`w-full rounded-sm transition-all duration-300 ${idx % 3 === 0 ? 'bg-blue-400' : 'bg-[#e0f2fe] hover:bg-blue-200'}`} 
                            style={{ height: `${val}%` }} 
                        />
                    </div>
                ))}
            </div>
            {unit && <div className="absolute top-0 right-0 text-[10px] font-bold text-gray-400 uppercase tracking-widest">{unit}</div>}
        </div>
    );
};

const CircularProgress = ({ value, label }: { value: number, label: string }) => {
    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;
    return (
        <div className="flex flex-col items-center gap-2">
            <div className="relative flex flex-col items-center justify-center">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 50 50">
                    <circle cx="25" cy="25" r={radius} fill="none" stroke="#eff6ff" strokeWidth="4" />
                    <circle 
                        cx="25" cy="25" r={radius} 
                        fill="none" stroke="#3b82f6" 
                        strokeWidth="4" 
                        strokeDasharray={circumference} 
                        strokeDashoffset={offset} 
                        strokeLinecap="round" 
                    />
                </svg>
                <div className="absolute flex items-center justify-center text-[11px] font-bold text-blue-600">
                    {value}%
                </div>
            </div>
            <span className="text-[8px] text-gray-500 uppercase font-black tracking-tighter text-center leading-none max-w-[50px]">
                {label}
            </span>
        </div>
    );
};

const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h2 className="text-xl font-bold text-gray-800 tracking-tight">{title}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-200 rounded-full">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>
                <div className="p-8 max-h-[60vh] overflow-y-auto no-scrollbar">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default function Analytics({ stats, role }: { stats: any; role: string }) {
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);

    // Translation Layer: detect role and activity
    const USI = useMemo(() => {
        const base = {
            walletTitle: 'Wallet Balance',
            walletBtn: 'View All Transactions',
            workloadTitle: 'Workload Volume',
            taskTitle: 'Task Completion',
            prodTitle: 'Recent Productivity',
            activityTitle: 'Step-by-Step Activity',
            healthTitle: 'System Health',
            healthMsg: 'System is running smoothly.',
            historyTitle: 'Transaction History',
            noHistory: 'No transactions found yet. Your harvest or sales history will appear here once your first order is processed.'
        };

        switch (role) {
            case 'farmer':
                return {
                    ...base,
                    subtitle: "How much I've grown.",
                    unit: 'Kg',
                    areaLabel: 'Harvest Progress (Kg)',
                    rings: ['Capacity Used', 'Progress Made', 'Goal Reached']
                };
            case 'miller':
                return {
                    ...base,
                    subtitle: "How much I've processed.",
                    unit: 'Sacks',
                    areaLabel: 'Milling Output (Sacks)',
                    rings: ['Machine Load', 'Batch Progress', 'Space Left']
                };
            case 'retailer':
                return {
                    ...base,
                    subtitle: "How much I've sold.",
                    unit: 'Sacks',
                    areaLabel: 'Sales Volume (Sacks)',
                    rings: ['Stock Level', 'Fulfillment', 'Sales Goal']
                };
            default:
                return {
                    ...base,
                    subtitle: "System Overview.",
                    unit: 'Nodes',
                    areaLabel: 'Network Flow',
                    rings: ['Node Health', 'Uptime', 'Sync Status']
                };
        }
    }, [role]);

    // Role-Aware History Content
    const historyData = useMemo(() => {
        if (role === 'farmer') return [
            { date: '2026-05-01', variety: 'Jasmine', weight: '1,200kg', amount: '₱ 24,000', status: 'PAID', type: 'success' },
            { date: '2026-05-03', variety: 'Dinorado', weight: '800kg', amount: '₱ 18,500', status: 'PROCESSING', type: 'orange' },
        ];
        if (role === 'miller') return [
            { date: '2026-05-02', farmer: 'Mark Johnson', sacks: '45 Sacks', fee: '₱ 4,500', recovery: '72%', status: 'DONE', type: 'success' },
            { date: '2026-05-04', farmer: 'Ana Reyes', sacks: '30 Sacks', fee: '₱ 3,000', recovery: '74%', status: 'ACTIVE', type: 'orange' },
        ];
        if (role === 'retailer') return [
            { date: '2026-05-02', variety: 'Sinandomeng', received: '50 Sacks', revenue: '₱ 62,500', status: 'RECEIVED', type: 'success' },
            { date: '2026-05-05', variety: 'Premium Jasmine', received: '20 Sacks', revenue: '₱ 35,000', status: 'ON THE ROAD', type: 'orange' },
        ];
        return [];
    }, [role]);

    return (
        <AuthenticatedLayout header="Fulfillment Ecosystem">
            <Head title="Operator Dashboard" />

            <div className="min-h-full font-sans pb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    
                    {/* Workload Volume Card */}
                    <Card title={USI.workloadTitle} subtitle={USI.subtitle} className="lg:col-span-2 min-h-[240px]">
                        <AreaChart data={[]} unit={USI.unit} />
                    </Card>

                    {/* Wallet Balance Card */}
                    <Card title={USI.walletTitle} className="min-h-[240px] flex flex-col justify-center">
                        <div className="flex items-start gap-2 mt-6">
                            <span className="text-3xl font-light text-blue-400">₱</span>
                            <span className="text-5xl font-light text-blue-500 tracking-tight">
                                {role === 'farmer' ? '42,500' : role === 'miller' ? '128,000' : '85,400'}
                            </span>
                        </div>
                        <div className="mt-auto pt-6 flex justify-end">
                            <button 
                                onClick={() => setIsHistoryOpen(true)}
                                className="bg-[#064e3b] text-white text-[10px] uppercase font-bold px-5 py-2 rounded-full hover:bg-emerald-900 transition-all shadow-lg active:scale-95"
                            >
                                {USI.walletBtn}
                            </button>
                        </div>
                    </Card>

                    {/* Recent Productivity */}
                    <Card title={USI.prodTitle} className="min-h-[200px]">
                        <BarChart data={[]} unit={USI.unit} />
                    </Card>

                    {/* Task Completion */}
                    <Card title={USI.taskTitle} className="min-h-[200px]">
                        <div className="flex justify-around items-center h-full pt-4">
                            {USI.rings.map((label, idx) => (
                                <CircularProgress key={idx} value={[80, 75, 50][idx]} label={label} />
                            ))}
                        </div>
                    </Card>

                    {/* Step-by-Step Activity */}
                    <Card title={USI.activityTitle} className="min-h-[200px]">
                        <div className="flex flex-col gap-3 mt-2">
                            {[
                                { name: 'Update', mod: 'SCHEDULED', text: 'New Order Arrived', color: 'blue' },
                                { name: 'Process', mod: 'ON THE ROAD', text: 'Batch moving to Mill', color: 'orange' },
                                { name: 'Verify', mod: 'PAID', text: 'Payment Received', color: 'green' },
                            ].map((msg, i) => (
                                <div key={i} className="flex justify-between items-center text-[10px] font-bold border-b border-blue-50 pb-2">
                                    <span className="text-blue-600 w-1/4">{msg.name}</span>
                                    <span className={`w-1/4 text-[8px] px-2 py-0.5 rounded-full text-white text-center font-black ${msg.color === 'green' ? 'bg-emerald-500' : msg.color === 'orange' ? 'bg-orange-400' : 'bg-blue-500'}`}>
                                        {msg.mod}
                                    </span>
                                    <span className="text-gray-500 w-1/2 text-right truncate">{msg.text}</span>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* BOTTOM ROW */}
                    <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* User Guide / System Health */}
                        <Card title={USI.healthTitle}>
                            <div className="flex items-center gap-4 py-4 px-6 bg-emerald-50 border border-emerald-100 rounded-2xl">
                                <div className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                                </div>
                                <p className="text-sm font-bold text-emerald-900">{USI.healthMsg}</p>
                            </div>
                            <p className="mt-4 text-[11px] text-gray-400 leading-relaxed font-medium">
                                This panel monitors the core connection between your warehouse and the regional marketplace. No action is required from your side.
                            </p>
                        </Card>

                        <Card title="Current Priority Varieties">
                            <div className="flex items-end gap-3 h-32 pt-4">
                                {[30, 45, 25, 60].map((v, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                        <div className="w-full bg-blue-50 rounded-lg relative overflow-hidden" style={{ height: '100%' }}>
                                            <div className="absolute bottom-0 w-full bg-blue-500 transition-all duration-1000" style={{ height: `${v}%` }}></div>
                                        </div>
                                        <span className="text-[8px] text-gray-400 uppercase font-black">{['Jasmine', 'Dinorado', 'Sinan', 'Angel'][i]}</span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                </div>
            </div>

            {/* Role-Aware History Modal */}
            <Modal isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} title={USI.historyTitle}>
                {historyData.length === 0 ? (
                    <div className="text-center py-10 px-6">
                        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-10 h-10 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <p className="text-gray-500 font-medium leading-relaxed">{USI.noHistory}</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[10px] text-gray-400 uppercase tracking-widest border-b border-gray-100">
                                    <th className="pb-4 font-black">Date</th>
                                    {role === 'farmer' && <th className="pb-4 font-black">Variety</th>}
                                    {role === 'farmer' && <th className="pb-4 font-black">Weight</th>}
                                    {role === 'miller' && <th className="pb-4 font-black">Farmer</th>}
                                    {role === 'miller' && <th className="pb-4 font-black">Volume</th>}
                                    {role === 'retailer' && <th className="pb-4 font-black">Variety</th>}
                                    {role === 'retailer' && <th className="pb-4 font-black">Stock</th>}
                                    <th className="pb-4 font-black">Value</th>
                                    <th className="pb-4 font-black text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {historyData.map((row, idx) => (
                                    <tr key={idx} className="text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                                        <td className="py-4 whitespace-nowrap">{row.date}</td>
                                        {role === 'farmer' && <td className="py-4">{row.variety}</td>}
                                        {role === 'farmer' && <td className="py-4">{row.weight}</td>}
                                        {role === 'miller' && <td className="py-4">{row.farmer}</td>}
                                        {role === 'miller' && <td className="py-4">{row.sacks}</td>}
                                        {role === 'retailer' && <td className="py-4">{row.variety}</td>}
                                        {role === 'retailer' && <td className="py-4">{row.received}</td>}
                                        <td className="py-4 text-blue-600 font-black">{row.amount || row.fee || row.revenue}</td>
                                        <td className="py-4 text-right">
                                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider text-white ${row.type === 'success' ? 'bg-emerald-500' : 'bg-orange-400'}`}>
                                                {row.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Modal>
        </AuthenticatedLayout>
    );
}
