import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import DeliveryStatusStepper from '@/Components/DeliveryStatusStepper';

export default function MyPurchases({ auth, orders }: any) {
    if (typeof window !== 'undefined') window.router = router;

    const badgeConfig = (status: string, delivery_status: string): { bg: string; label: string } => {
        if (delivery_status === 'Completed') return { bg: 'bg-green-600 text-white', label: '✅ Order Completed' };
        
        switch (status) {
            case 'pending_preparation':
                return { bg: 'bg-yellow-400 text-black', label: '🟡 Preparing' };
            case 'ready_for_pickup':
                return { bg: 'bg-green-400 text-black', label: '🟢 Ready for Pickup' };
            case 'in_transit':
                return { bg: 'bg-blue-500 text-white', label: '🔵 In Transit' };
            case 'delivered':
                return { bg: 'bg-gray-300 text-gray-700', label: '⚪ Delivered' };
            default:
                return { bg: 'bg-gray-200 text-gray-600', label: status ? status.replace(/_/g, ' ') : 'Unknown' };
        }
    };

    const handleConfirm = (id: number) => {
        if (confirm('Are you sure you have received the order? This will mark the transaction as completed.')) {
            window.router.patch(route('retailer.order.confirm_received', id));
        }
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="My Purchases" />
            <div className="p-6 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-2 h-8 bg-green-600 border border-black"></div>
                        <h2 className="text-3xl font-black uppercase tracking-tighter text-gray-900">My Purchases</h2>
                    </div>

                    <div className="space-y-8">
                        {orders.length > 0 ? (
                            orders.map((order: any) => {
                                const badge = badgeConfig(order.status, order.delivery_status);
                                return (
                                    <div key={order.id} className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
                                        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-8">
                                            <div className="flex-1">
                                                <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Order #{order.id}</p>
                                                <h3 className="text-3xl font-black uppercase leading-none">{order.rice_variety}</h3>
                                                <p className="text-lg font-bold text-gray-600 italic mt-1">
                                                    {order.sacks} Sacks ({order.total_weight}kg)
                                                </p>
                                                <div className="mt-4 p-3 bg-gray-100 border-2 border-black inline-block">
                                                    <p className="text-[10px] font-black uppercase text-gray-500">Milling Station</p>
                                                    <p className="font-bold">{order.miller_first_name} {order.miller_last_name}</p>
                                                </div>
                                            </div>

                                            <div className="text-left lg:text-right min-w-[200px]">
                                                <p className="text-[10px] font-black uppercase text-gray-400">Total Investment</p>
                                                <p className="text-4xl font-black text-green-600">₱{Number(order.total_price).toLocaleString()}</p>
                                                {Number(order.delivery_fee) > 0 && (
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Includes ₱{order.delivery_fee} Logistics Fee</p>
                                                )}
                                                
                                                <div className="mt-4 flex flex-col items-start lg:items-end gap-2">
                                                    <span className={`px-4 py-2 border-2 border-black font-black uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${badge.bg}`}>
                                                        {badge.label}
                                                    </span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] font-black uppercase bg-black text-white px-2 py-0.5">
                                                            {order.shipping_method === 'delivery' ? '🚚 Delivery' : '🏪 Pickup'}
                                                        </span>
                                                        <span className="text-[10px] font-bold text-gray-400">
                                                            {new Date(order.created_at).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border-t-4 border-black pt-6">
                                            <p className="text-[10px] font-black uppercase text-gray-400 mb-4 tracking-widest">Delivery Tracking</p>
                                            <DeliveryStatusStepper status={order.delivery_status || 'Pending'} type="rice" />
                                            
                                            {order.delivery_status === 'In Transit' && (
                                                <div className="mt-8 flex justify-center">
                                                    <button 
                                                        onClick={() => handleConfirm(order.id)}
                                                        className="bg-black text-white font-black py-4 px-12 border-4 border-black shadow-[4px_4px_0px_0px_rgba(34,197,94,1)] hover:bg-green-600 hover:text-black transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-none uppercase tracking-widest"
                                                    >
                                                        Confirm & Sign Receipt
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="py-20 bg-white border-4 border-dashed border-gray-300 text-center">
                                <p className="text-gray-300 text-6xl mb-4">🛒</p>
                                <p className="text-gray-400 font-black uppercase tracking-widest text-xl">No Purchases Found</p>
                                <p className="text-gray-300 font-bold">You haven't purchased any rice yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
