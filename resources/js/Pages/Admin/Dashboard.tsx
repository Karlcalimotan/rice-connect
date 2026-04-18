import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function AdminDashboard({ auth, users, batches, orders }: any) {
    const [activeTab, setActiveTab] = useState<'users' | 'batches' | 'orders'>('users');

    const tabs = [
        { key: 'users', label: 'Users', count: users.length },
        { key: 'batches', label: 'Harvest Batches', count: batches.length },
        { key: 'orders', label: 'Orders', count: orders.length },
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
            <div className="p-6 bg-transparent min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-1.5 h-6 bg-emerald-700 rounded-full shadow-[0_0_15px_rgba(4,120,87,0.4)]"></div>
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-800/60">Observer Instance</p>
                            </div>
                            <h2 className="text-5xl font-black uppercase tracking-tighter text-emerald-950 leading-none">
                                Admin Dashboard
                            </h2>
                        </div>
                        <div className="px-6 py-3 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest leading-none">Global Sync Active</span>
                        </div>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex flex-wrap gap-4 mb-12">
                        {tabs.map(tab => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`px-8 py-5 font-black uppercase text-[10px] tracking-[0.2em] rounded-[2rem] transition-all duration-500 flex items-center gap-4 ${
                                    activeTab === tab.key
                                        ? 'bg-emerald-950 text-white shadow-2xl shadow-emerald-200 -translate-y-1'
                                        : 'bg-white/40 text-emerald-950/60 hover:bg-white/60 border border-white/40'
                                }`}
                            >
                                {tab.label}
                                <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black ${
                                    activeTab === tab.key ? 'bg-emerald-500 text-white' : 'bg-emerald-100 text-emerald-600'
                                }`}>
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Users Table */}
                    {activeTab === 'users' && (
                        <div className="bg-white/40 border border-white/50 rounded-[2.5rem] shadow-2xl overflow-hidden backdrop-saturate-150">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-red-800/10 border-b border-white/20">
                                        <th className="p-6 font-black uppercase text-[10px] tracking-widest text-red-800">ID</th>
                                        <th className="p-6 font-black uppercase text-[10px] tracking-widest text-red-800">Name</th>
                                        <th className="p-6 font-black uppercase text-[10px] tracking-widest text-red-800">Email</th>
                                        <th className="p-6 font-black uppercase text-[10px] tracking-widest text-red-800">Role</th>
                                        <th className="p-6 font-black uppercase text-[10px] tracking-widest text-red-800">Location</th>
                                        <th className="p-6 font-black uppercase text-[10px] tracking-widest text-red-800">Contact</th>
                                        <th className="p-6 font-black uppercase text-[10px] tracking-widest text-red-800">Joined</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10 text-gray-700">
                                    {users.map((user: any) => (
                                        <tr key={user.id} className="hover:bg-white/20 transition-colors">
                                            <td className="p-6 text-xs font-bold opacity-40">#{user.id}</td>
                                            <td className="p-6 font-bold text-sm">{user.first_name} {user.last_name}</td>
                                            <td className="p-6 text-xs">{user.email}</td>
                                            <td className="p-6">
                                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm ${
                                                    user.role === 'admin' ? 'bg-red-500 text-white' :
                                                    user.role === 'farmer' ? 'bg-emerald-500 text-white' :
                                                    user.role === 'miller' ? 'bg-blue-500 text-white' :
                                                    'bg-amber-500 text-white'
                                                }`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="p-6 text-xs">{user.municipality}, {user.province}</td>
                                            <td className="p-6 text-xs">{user.contact}</td>
                                            <td className="p-6 text-[10px] font-bold opacity-60 tracking-tighter">{user.created_at ? new Date(user.created_at).toLocaleDateString() : '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Batches Table */}
                    {activeTab === 'batches' && (
                        <div className="bg-white/40 border border-white/50 rounded-[2.5rem] shadow-2xl overflow-hidden backdrop-saturate-150">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-red-800/10 border-b border-white/20">
                                        <th className="p-4 font-black uppercase text-[10px] tracking-widest text-red-800">ID</th>
                                        <th className="p-4 font-black uppercase text-[10px] tracking-widest text-red-800">Variety</th>
                                        <th className="p-4 font-black uppercase text-[10px] tracking-widest text-red-800">Farmer</th>
                                        <th className="p-4 font-black uppercase text-[10px] tracking-widest text-red-800">Buyer (Miller)</th>
                                        <th className="p-4 font-black uppercase text-[10px] tracking-widest text-red-800">Weight</th>
                                        <th className="p-4 font-black uppercase text-[10px] tracking-widest text-red-800">Sacks</th>
                                        <th className="p-4 font-black uppercase text-[10px] tracking-widest text-red-800">Status</th>
                                        <th className="p-4 font-black uppercase text-[10px] tracking-widest text-red-800">Visibility</th>
                                        <th className="p-4 font-black uppercase text-[10px] tracking-widest text-red-800 text-center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10 text-gray-700">
                                    {batches.map((batch: any) => (
                                        <tr key={batch.id} className={`hover:bg-white/20 transition-colors ${batch.hidden_from_farmer ? 'opacity-40 grayscale' : ''}`}>
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
                        <div className="bg-white/40 border border-white/50 rounded-[2.5rem] shadow-2xl overflow-hidden backdrop-saturate-150">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-red-800/10 border-b border-white/20">
                                        <th className="p-6 font-black uppercase text-[10px] tracking-widest text-red-800">ID</th>
                                        <th className="p-6 font-black uppercase text-[10px] tracking-widest text-red-800">Variety</th>
                                        <th className="p-6 font-black uppercase text-[10px] tracking-widest text-red-800">Retailer</th>
                                        <th className="p-6 font-black uppercase text-[10px] tracking-widest text-red-800">Miller</th>
                                        <th className="p-6 font-black uppercase text-[10px] tracking-widest text-red-800">Sacks</th>
                                        <th className="p-6 font-black uppercase text-[10px] tracking-widest text-red-800">Total</th>
                                        <th className="p-6 font-black uppercase text-[10px] tracking-widest text-red-800">Shipping</th>
                                        <th className="p-6 font-black uppercase text-[10px] tracking-widest text-red-800">Status</th>
                                        <th className="p-6 font-black uppercase text-[10px] tracking-widest text-red-800">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10 text-gray-700">
                                    {orders.map((order: any) => (
                                        <tr key={order.id} className="hover:bg-white/20 transition-colors">
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
