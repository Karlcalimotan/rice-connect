import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function MyPurchases({ auth, orders }: any) {
    const badgeConfig = (status: string): { bg: string; label: string } => {
        switch (status) {
            case 'pending_preparation':
                return { bg: 'bg-yellow-400 text-black', label: '🟡 Preparing' };
            case 'ready_for_pickup':
                return { bg: 'bg-green-400 text-black', label: '🟢 Ready for Pickup' };
            case 'in_transit':
                return { bg: 'bg-blue-500 text-white', label: '🔵 In Transit' };
            case 'delivered':
                return { bg: 'bg-gray-300 text-gray-700', label: '⚪ Delivered' };
            case 'pending_pickup':
                return { bg: 'bg-yellow-300 text-black', label: '🟡 Pending Pickup' };
            default:
                return { bg: 'bg-gray-200 text-gray-600', label: status ? status.replace(/_/g, ' ') : 'Unknown' };
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

                    <div className="space-y-6">
                        {orders.length > 0 ? (
                            orders.map((order: any) => {
                                const badge = badgeConfig(order.status);
                                return (
                                    <div key={order.id} className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                            <div className="flex-1">
                                                <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Order #{order.id}</p>
                                                <h3 className="text-2xl font-black uppercase">{order.rice_variety}</h3>
                                                <p className="text-sm font-bold text-gray-600 italic">
                                                    {order.sacks} Sacks ({order.total_weight}kg)
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Miller: <strong>{order.miller_first_name} {order.miller_last_name}</strong>
                                                </p>
                                            </div>

                                            <div className="text-center md:text-right">
                                                <p className="text-xs font-black uppercase text-gray-400">Total Paid</p>
                                                <p className="text-3xl font-black text-green-600">₱{Number(order.total_price).toLocaleString()}</p>
                                                {Number(order.delivery_fee) > 0 && (
                                                    <p className="text-[10px] text-gray-400 font-bold">incl. ₱{order.delivery_fee} delivery</p>
                                                )}
                                            </div>

                                            <div className="flex flex-col items-center md:items-end gap-2">
                                                <span className={`px-4 py-1.5 border-2 border-black font-black uppercase text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${badge.bg}`}>
                                                    {badge.label}
                                                </span>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase">
                                                    {order.shipping_method === 'delivery' ? '🚚 Delivery' : '🏪 Pickup'}
                                                </p>
                                                <p className="text-[10px] font-bold text-gray-500 uppercase">
                                                    {new Date(order.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
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
