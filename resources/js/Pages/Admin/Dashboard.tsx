import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function AdminDashboard({ auth, users, batches, orders }: any) {
    const [activeTab, setActiveTab] = useState<'users' | 'batches' | 'orders'>('users');

    const tabs = [
        { key: 'users', label: '👥 Users', count: users.length },
        { key: 'batches', label: '🌾 Harvest Batches', count: batches.length },
        { key: 'orders', label: '📦 Orders', count: orders.length },
    ] as const;

    const statusColor = (status: string) => {
        const map: Record<string, string> = {
            unsold: 'bg-gray-200 text-gray-700',
            pending: 'bg-orange-400 text-black',
            sold: 'bg-blue-500 text-white',
            in_transit: 'bg-indigo-400 text-white',
            delivered: 'bg-gray-400 text-white',
            processing: 'bg-yellow-400 text-black',
            processed: 'bg-emerald-400 text-black',
            for_sale: 'bg-green-500 text-white',
            pending_preparation: 'bg-yellow-400 text-black',
            ready_for_pickup: 'bg-green-400 text-black',
            pending_pickup: 'bg-yellow-300 text-black',
        };
        return map[status] || 'bg-gray-200 text-gray-600';
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Admin Dashboard" />
            <div className="p-6 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-2 h-10 bg-red-600 border border-black"></div>
                        <div>
                            <h2 className="text-3xl font-black uppercase tracking-tighter text-gray-900">
                                Admin Dashboard
                            </h2>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                Observer Mode — Read Only
                            </p>
                        </div>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex gap-2 mb-6">
                        {tabs.map(tab => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`px-5 py-3 font-black uppercase text-xs border-4 border-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] ${
                                    activeTab === tab.key
                                        ? 'bg-black text-white'
                                        : 'bg-white text-black hover:bg-gray-100'
                                }`}
                            >
                                {tab.label}
                                <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-[10px] border border-black">
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Users Table */}
                    {activeTab === 'users' && (
                        <div className="bg-white border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b-4 border-black bg-gray-100">
                                        <th className="p-3 font-black uppercase text-[10px] tracking-widest">ID</th>
                                        <th className="p-3 font-black uppercase text-[10px] tracking-widest">Name</th>
                                        <th className="p-3 font-black uppercase text-[10px] tracking-widest">Email</th>
                                        <th className="p-3 font-black uppercase text-[10px] tracking-widest">Role</th>
                                        <th className="p-3 font-black uppercase text-[10px] tracking-widest">Location</th>
                                        <th className="p-3 font-black uppercase text-[10px] tracking-widest">Contact</th>
                                        <th className="p-3 font-black uppercase text-[10px] tracking-widest">Joined</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user: any) => (
                                        <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="p-3 text-xs font-bold text-gray-400">#{user.id}</td>
                                            <td className="p-3 font-bold text-sm">{user.first_name} {user.last_name}</td>
                                            <td className="p-3 text-xs text-gray-600">{user.email}</td>
                                            <td className="p-3">
                                                <span className={`px-2 py-0.5 border-2 border-black text-[10px] font-black uppercase shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${
                                                    user.role === 'admin' ? 'bg-red-400' :
                                                    user.role === 'farmer' ? 'bg-green-400' :
                                                    user.role === 'miller' ? 'bg-blue-400' :
                                                    'bg-yellow-400'
                                                }`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="p-3 text-xs text-gray-600">{user.municipality}, {user.province}</td>
                                            <td className="p-3 text-xs text-gray-600">{user.contact}</td>
                                            <td className="p-3 text-[10px] text-gray-400">{user.created_at ? new Date(user.created_at).toLocaleDateString() : '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Batches Table */}
                    {activeTab === 'batches' && (
                        <div className="bg-white border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b-4 border-black bg-gray-100">
                                        <th className="p-3 font-black uppercase text-[10px] tracking-widest">ID</th>
                                        <th className="p-3 font-black uppercase text-[10px] tracking-widest">Variety</th>
                                        <th className="p-3 font-black uppercase text-[10px] tracking-widest">Farmer</th>
                                        <th className="p-3 font-black uppercase text-[10px] tracking-widest">Buyer (Miller)</th>
                                        <th className="p-3 font-black uppercase text-[10px] tracking-widest">Weight</th>
                                        <th className="p-3 font-black uppercase text-[10px] tracking-widest">Sacks</th>
                                        <th className="p-3 font-black uppercase text-[10px] tracking-widest">Status</th>
                                        <th className="p-3 font-black uppercase text-[10px] tracking-widest">Visibility</th>
                                        <th className="p-3 font-black uppercase text-[10px] tracking-widest text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {batches.map((batch: any) => (
                                        <tr key={batch.id} className={`border-b border-gray-100 hover:bg-gray-50 ${batch.hidden_from_farmer ? 'opacity-50' : ''}`}>
                                            <td className="p-3 text-xs font-bold text-gray-400">#{batch.id}</td>
                                            <td className="p-3 font-bold text-sm uppercase">{batch.rice_variety}</td>
                                            <td className="p-3 text-xs">{batch.farmer_first_name} {batch.farmer_last_name}</td>
                                            <td className="p-3 text-xs">{batch.buyer_first_name ? `${batch.buyer_first_name} ${batch.buyer_last_name}` : '—'}</td>
                                            <td className="p-3 text-xs font-bold">{batch.total_weight}kg</td>
                                            <td className="p-3 text-xs font-bold">{batch.total_sacks}</td>
                                            <td className="p-3">
                                                <span className={`px-2 py-0.5 border border-black text-[10px] font-black uppercase ${statusColor(batch.status)}`}>
                                                    {(batch.status || '').replace(/_/g, ' ')}
                                                </span>
                                            </td>
                                            <td className="p-3">
                                                {batch.hidden_from_farmer ? (
                                                    <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-black uppercase border border-red-300">
                                                        Hidden
                                                    </span>
                                                ) : (
                                                    <span className="px-2 py-0.5 bg-green-100 text-green-600 text-[10px] font-black uppercase border border-green-300">
                                                        Visible
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-3 text-center">
                                                <button
                                                    onClick={() => {
                                                        const hiddenAt = batch.hidden_at ? new Date(batch.hidden_at) : null;
                                                        const isHiddenAndOld = hiddenAt && (new Date().getTime() - hiddenAt.getTime()) / (1000 * 3600 * 24) >= 30;
                                                        
                                                        if (!batch.hidden_from_farmer || !isHiddenAndOld) {
                                                            alert('Condition not met: Record must be hidden by the Farmer for at least 30 days.');
                                                            return;
                                                        }

                                                        const isProcessed = ['milled', 'processed', 'completed'].includes(batch.status);
                                                        if (!isProcessed) {
                                                            alert('Condition not met: Status must be processed/milled (moved to Finished Stock).');
                                                            return;
                                                        }
                                                        if (confirm('Permanently delete this record?')) {
                                                            router.delete(route('admin.harvest.destroy', batch.id), {
                                                                preserveScroll: true,
                                                                onError: (errors) => alert(errors.error || 'Failed to delete'),
                                                                onSuccess: () => alert('Record permanently deleted.')
                                                            });
                                                        }
                                                    }}
                                                    className="px-2 py-1 bg-red-600 text-white text-[10px] font-black uppercase border border-black hover:bg-red-700"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Orders Table */}
                    {activeTab === 'orders' && (
                        <div className="bg-white border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b-4 border-black bg-gray-100">
                                        <th className="p-3 font-black uppercase text-[10px] tracking-widest">ID</th>
                                        <th className="p-3 font-black uppercase text-[10px] tracking-widest">Variety</th>
                                        <th className="p-3 font-black uppercase text-[10px] tracking-widest">Retailer</th>
                                        <th className="p-3 font-black uppercase text-[10px] tracking-widest">Miller</th>
                                        <th className="p-3 font-black uppercase text-[10px] tracking-widest">Sacks</th>
                                        <th className="p-3 font-black uppercase text-[10px] tracking-widest">Total</th>
                                        <th className="p-3 font-black uppercase text-[10px] tracking-widest">Shipping</th>
                                        <th className="p-3 font-black uppercase text-[10px] tracking-widest">Status</th>
                                        <th className="p-3 font-black uppercase text-[10px] tracking-widest">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order: any) => (
                                        <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="p-3 text-xs font-bold text-gray-400">#{order.id}</td>
                                            <td className="p-3 font-bold text-sm uppercase">{order.rice_variety}</td>
                                            <td className="p-3 text-xs">{order.retailer_first_name} {order.retailer_last_name}</td>
                                            <td className="p-3 text-xs">{order.miller_first_name} {order.miller_last_name}</td>
                                            <td className="p-3 text-xs font-bold">{order.sacks}</td>
                                            <td className="p-3 text-sm font-black text-green-600">₱{Number(order.total_price).toLocaleString()}</td>
                                            <td className="p-3 text-[10px] font-bold uppercase">{order.shipping_method}{order.delivery_fee > 0 ? ` (+₱${order.delivery_fee})` : ''}</td>
                                            <td className="p-3">
                                                <span className={`px-2 py-0.5 border border-black text-[10px] font-black uppercase ${statusColor(order.status)}`}>
                                                    {(order.status || '').replace(/_/g, ' ')}
                                                </span>
                                            </td>
                                            <td className="p-3 text-[10px] text-gray-400">{order.created_at ? new Date(order.created_at).toLocaleDateString() : '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
