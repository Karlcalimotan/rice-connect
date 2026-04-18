import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import DeliveryStatusStepper from '@/Components/DeliveryStatusStepper';
import React, { useEffect } from 'react';

export default function MyPurchases({ auth, orders }: any) {
    if (typeof window !== 'undefined') window.router = router;

    const badgeConfig = (status: string, delivery_status: string): { bg: string; label: string } => {
        if (delivery_status === 'Confirmed Received') return { bg: 'bg-green-600 text-white', label: '✅ Order Completed' };
        if (delivery_status === 'Delivered') return { bg: 'bg-yellow-400 text-black', label: '🚚 Arrived / Handover' };
        
        switch (status) {
            case 'pending_preparation':
                return { bg: 'bg-yellow-400 text-black', label: '🟡 Preparing' };
            case 'ready_for_pickup':
                return { bg: 'bg-green-400 text-black', label: '🟢 Ready for Pickup' };
            case 'in_transit':
                return { bg: 'bg-blue-500 text-white', label: '🔵 In Transit' };
            default:
                return { bg: 'bg-gray-200 text-gray-600', label: status ? status.replace(/_/g, ' ') : 'Unknown' };
        }
    };

    const handleConfirm = (id: number) => {
        if (confirm('Are you sure you have received the order? This will mark the transaction as completed and verify the quality.')) {
            window.router.patch(route('retailer.order.confirm_received', id));
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            router.reload({ only: ['orders'], preserveScroll: true });
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="My Purchases" />
            <div className="p-6 bg-transparent min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <div className="glass-header">
                        <div className="glass-header-icon"></div>
                        <h2 className="text-5xl font-black uppercase tracking-tighter text-emerald-950 leading-none">
                            My Purchases
                        </h2>
                    </div>

                    <div className="space-y-12">
                        {orders.length > 0 ? (
                            orders.map((order: any) => {
                                const badge = badgeConfig(order.status, order.delivery_status);
                                return (
                                    <div key={order.id} className="glass-card p-10 relative overflow-hidden group hover:scale-[1.01] transition-transform duration-700">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl"></div>

                                        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-10">
                                            <div className="flex-1 space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <span className="px-3 py-1 rounded-lg bg-emerald-950 text-white text-[9px] font-black uppercase tracking-widest">
                                                        Batch #{order.id}
                                                    </span>
                                                    <span className="text-[10px] font-bold text-emerald-950/40 uppercase tracking-tighter">
                                                        Logged {new Date(order.created_at).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <h3 className="text-5xl font-black uppercase tracking-tighter text-emerald-950 leading-tight">
                                                    {order.rice_variety}
                                                </h3>
                                                <div className="flex items-baseline gap-2">
                                                    <span className="text-2xl font-black text-emerald-700">{order.sacks}</span>
                                                    <span className="text-xs font-black uppercase text-emerald-950/40 tracking-widest">Sacks Protocol Yield</span>
                                                </div>
                                                
                                                <div className="mt-8 flex items-center gap-4 p-4 rounded-2xl bg-white/40 border border-white/60 w-fit">
                                                    <div className="w-10 h-10 rounded-xl bg-emerald-950 flex items-center justify-center text-white">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" strokeWidth="2"/></svg>
                                                    </div>
                                                    <div>
                                                        <p className="text-[9px] font-black uppercase text-emerald-950/40 tracking-[0.2em]">Origin Miller Hub</p>
                                                        <p className="font-extrabold text-emerald-950">{order.miller_first_name} {order.miller_last_name}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="text-left lg:text-right min-w-[280px] space-y-6">
                                                <div>
                                                    <p className="text-[10px] font-black uppercase text-emerald-950/40 tracking-widest mb-1">Financial Settlement</p>
                                                    <p className="text-6xl font-black text-emerald-600 tracking-tighter leading-none">₱{Number(order.total_price).toLocaleString()}</p>
                                                    {Number(order.delivery_fee) > 0 && (
                                                        <p className="text-[10px] text-emerald-500 font-black uppercase mt-2 tracking-widest">Incl. ₱{order.delivery_fee} Logistics Fee</p>
                                                    )}
                                                </div>
                                                
                                                <div className="flex flex-col items-start lg:items-end gap-3 pt-4 border-t border-emerald-950/5">
                                                    <div className={`px-5 py-2.5 rounded-full font-black uppercase text-[10px] tracking-widest shadow-lg ${badge.bg}`}>
                                                        {badge.label}
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-[9px] font-black uppercase ring-1 ring-emerald-950/10 px-3 py-1 rounded-lg text-emerald-950">
                                                            PROTOCOL: {order.shipping_method === 'delivery' ? 'DOORSTEP DELIVERY' : 'WAREHOUSE PICKUP'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-10 border-t border-emerald-950/5">
                                            <div className="flex justify-between items-center mb-10">
                                                <p className="text-[10px] font-black uppercase text-emerald-950/40 tracking-[0.4em]">Real-Time Logistics Sequence</p>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></div>
                                                    <span className="text-[9px] font-black uppercase text-emerald-400">Hub Link Stable</span>
                                                </div>
                                            </div>
                                            
                                            <DeliveryStatusStepper status={order.delivery_status || 'Pending'} type="rice" />
                                            
                                            {order.delivery_status === 'Delivered' ? (
                                                <div className="mt-12 flex justify-center">
                                                    <button 
                                                        onClick={() => handleConfirm(order.id)}
                                                        className="btn-2026 !px-16 !py-7 scale-105 shadow-[0_30px_60px_-15px_rgba(6,78,59,0.5)]"
                                                    >
                                                        Finalize: Confirm Acquisition
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="mt-12">
                                                    <div className="bg-emerald-50/50 p-6 rounded-[2rem] border border-emerald-100 flex items-center gap-5">
                                                        <div className="w-12 h-12 rounded-2xl bg-white shadow-xl flex items-center justify-center text-emerald-600">
                                                            <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2.5"/></svg>
                                                        </div>
                                                        <p className="font-extrabold uppercase text-emerald-950/50 text-xs tracking-widest">
                                                            {order.delivery_status === 'In Transit' ? "Status: Dispatch courier is currently inbound." : "Status: Awaiting warehouse dispatch protocol."}
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="py-40 glass-card text-center relative overflow-hidden">
                                <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center overflow-hidden">
                                    <p className="text-[30rem] font-black uppercase leading-none select-none">Void</p>
                                </div>
                                <div className="relative">
                                    <div className="w-24 h-24 bg-emerald-500/5 rounded-full flex items-center justify-center mx-auto mb-10 border border-emerald-500/10">
                                        <svg className="w-10 h-10 text-emerald-950/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z" strokeWidth="2"/></svg>
                                    </div>
                                    <p className="text-emerald-950 font-black uppercase tracking-[1em] text-sm mb-6 opacity-30">Archive Empty</p>
                                    <p className="text-emerald-950/40 font-black uppercase tracking-[0.4em] text-xl">No Purchases Found In Sequence</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
