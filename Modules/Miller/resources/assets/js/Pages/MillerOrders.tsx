import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

export default function MillerOrders({ auth, orders }: any) {
    const statusColor = (status: string) => {
        switch (status) {
            case 'pending_preparation': return 'bg-yellow-400 text-black';
            case 'ready_for_pickup': return 'bg-green-400 text-black';
            case 'in_transit': return 'bg-blue-400 text-white';
            case 'delivered': return 'bg-gray-300 text-gray-700';
            default: return 'bg-gray-200 text-gray-600';
        }
    };

    const handleReadyForPickup = (orderId: number) => {
        if (confirm('Mark this order as Ready for Pickup?')) {
            router.post(route('miller.order.ready', orderId), {}, { preserveScroll: true });
        }
    };

    const handleDispatch = (orderId: number) => {
        if (confirm('Dispatch this order for delivery?')) {
            router.post(route('miller.order.dispatch', orderId), {}, { preserveScroll: true });
        }
    };

    const handleMarkDelivered = (orderId: number) => {
        if (confirm('Mark this order as completed / delivered?')) {
            router.post(route('miller.order.delivered', orderId), {}, { preserveScroll: true });
        }
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Customer Orders" />
            <div className="p-6 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-2 h-8 bg-purple-600 border border-black"></div>
                        <h2 className="text-3xl font-black uppercase tracking-tighter text-gray-900">
                            📋 Customer Orders
                        </h2>
                    </div>

                    {orders.length > 0 ? (
                        <div className="bg-white border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b-4 border-black bg-gray-100">
                                        <th className="p-4 font-black uppercase text-[10px] tracking-widest">Order</th>
                                        <th className="p-4 font-black uppercase text-[10px] tracking-widest">Retailer</th>
                                        <th className="p-4 font-black uppercase text-[10px] tracking-widest">Variety</th>
                                        <th className="p-4 font-black uppercase text-[10px] tracking-widest text-center">Sacks</th>
                                        <th className="p-4 font-black uppercase text-[10px] tracking-widest text-center">Total</th>
                                        <th className="p-4 font-black uppercase text-[10px] tracking-widest text-center">Shipping</th>
                                        <th className="p-4 font-black uppercase text-[10px] tracking-widest text-center">Status</th>
                                        <th className="p-4 font-black uppercase text-[10px] tracking-widest text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order: any) => (
                                        <tr key={order.id} className="border-b-2 border-gray-100 hover:bg-gray-50 transition-colors">
                                            <td className="p-4 text-xs font-black text-gray-400">#{order.id}</td>
                                            <td className="p-4">
                                                <p className="font-bold text-sm">{order.retailer_first_name} {order.retailer_last_name}</p>
                                            </td>
                                            <td className="p-4 font-black uppercase text-sm">{order.rice_variety}</td>
                                            <td className="p-4 text-center font-bold">{order.sacks}</td>
                                            <td className="p-4 text-center font-black text-green-600">₱{Number(order.total_price).toLocaleString()}</td>
                                            <td className="p-4 text-center text-xs font-bold uppercase">{order.shipping_method}</td>
                                            <td className="p-4 text-center">
                                                <span className={`px-3 py-1 border-2 border-black text-[10px] font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${statusColor(order.status)}`}>
                                                    {(order.status || '').replace(/_/g, ' ')}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex gap-2 justify-center flex-wrap">
                                                    {/* Step 1: Mark as Ready for Pickup (for all pending orders) */}
                                                    {(order.status === 'pending_preparation' || order.status === 'pending_pickup') && (
                                                        <button
                                                            onClick={() => handleReadyForPickup(order.id)}
                                                            className="px-3 py-1.5 bg-green-500 text-black text-[10px] font-black uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-green-600 active:shadow-none active:translate-x-[1px] active:translate-y-[1px]"
                                                        >
                                                            ✅ Ready for Pickup
                                                        </button>
                                                    )}
                                                    {/* Step 2a: Dispatch for DELIVERY orders */}
                                                    {order.status === 'ready_for_pickup' && order.shipping_method === 'delivery' && (
                                                        <button
                                                            onClick={() => handleDispatch(order.id)}
                                                            className="px-3 py-1.5 bg-blue-500 text-white text-[10px] font-black uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-blue-600 active:shadow-none active:translate-x-[1px] active:translate-y-[1px]"
                                                        >
                                                            🚚 Dispatch Delivery
                                                        </button>
                                                    )}
                                                    {/* Step 2b: Mark Delivered for PICKUP orders (retailer picked it up) */}
                                                    {order.status === 'ready_for_pickup' && order.shipping_method === 'pickup' && (
                                                        <button
                                                            onClick={() => handleMarkDelivered(order.id)}
                                                            className="px-3 py-1.5 bg-gray-700 text-white text-[10px] font-black uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-800 active:shadow-none active:translate-x-[1px] active:translate-y-[1px]"
                                                        >
                                                            📦 Mark as Picked Up
                                                        </button>
                                                    )}
                                                    {/* Step 3: Mark Delivered for DELIVERY in-transit orders */}
                                                    {order.status === 'in_transit' && (
                                                        <button
                                                            onClick={() => handleMarkDelivered(order.id)}
                                                            className="px-3 py-1.5 bg-gray-700 text-white text-[10px] font-black uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-800 active:shadow-none active:translate-x-[1px] active:translate-y-[1px]"
                                                        >
                                                            ✅ Mark Delivered
                                                        </button>
                                                    )}
                                                    {order.status === 'delivered' && (
                                                        <span className="text-xs text-gray-400 font-bold italic">Completed</span>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="py-20 bg-white border-4 border-dashed border-gray-300 text-center">
                            <p className="text-gray-300 text-6xl mb-4">📋</p>
                            <p className="text-gray-400 font-black uppercase tracking-widest text-xl">No Orders Yet</p>
                            <p className="text-gray-300 font-bold">List your rice for sale and wait for retailer orders.</p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
