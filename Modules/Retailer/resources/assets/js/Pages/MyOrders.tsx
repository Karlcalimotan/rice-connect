import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function MyOrders({ auth, orders }: any) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="My Orders" />
            <div className="p-6 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-2 h-8 bg-green-600 border border-black"></div>
                        <h2 className="text-3xl font-black uppercase tracking-tighter text-gray-900">
                            My Purchase History
                        </h2>
                    </div>

                    <div className="space-y-6">
                        {orders.length > 0 ? (
                            orders.map((order: any) => (
                                <div key={order.id} className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Order ID: #{order.id}</p>
                                        <h3 className="text-2xl font-black uppercase">{order.rice_variety}</h3>
                                        <p className="text-sm font-bold text-gray-600 italic">{order.sacks} Sacks ({order.total_weight}kg)</p>
                                    </div>

                                    <div className="text-center md:text-right">
                                        <p className="text-xs font-black uppercase text-gray-400">Total Paid</p>
                                        <p className="text-3xl font-black text-green-600">₱{Number(order.total_price).toLocaleString()}</p>
                                    </div>

                                    <div className="flex flex-col items-center md:items-end gap-2">
                                        <span className={`px-4 py-1 border-2 border-black font-black uppercase text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                                            order.status === 'pending_pickup' ? 'bg-yellow-400' : 'bg-blue-400'
                                        }`}>
                                            {order.status.replace('_', ' ')}
                                        </span>
                                        <p className="text-[10px] font-bold text-gray-500 uppercase">{new Date(order.created_at).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-20 bg-white border-4 border-dashed border-gray-300 text-center">
                                <p className="text-gray-400 font-black uppercase tracking-widest text-xl">No Orders Found</p>
                                <p className="text-gray-300 font-bold">You haven't purchased any rice yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}