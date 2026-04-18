import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';

export default function HarvestIndex({ auth, batches }: { auth: any, batches: any[] }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this harvest batch?')) {
            destroy(route('farmer.harvest.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="My Harvest Log" />
            
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-1.5 h-6 bg-emerald-600 rounded-full shadow-[0_0_15px_rgba(5,150,105,0.4)]"></div>
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-700">Storage & Yield</p>
                            </div>
                            <h2 className="text-5xl font-black uppercase tracking-tighter text-emerald-950 leading-none">
                                My Harvest Log
                            </h2>
                        </div>
                        <Link 
                            href={route('farmer.harvest.create')}
                            className="btn-2026"
                        >
                            + Post New Batch
                        </Link>
                    </div>

                    <div className="glass-card shadow-2xl p-2 overflow-hidden">
                        <table className="w-full text-left border-separate border-spacing-y-2">
                            <thead>
                                <tr className="bg-emerald-950/90 text-white overflow-hidden rounded-[2rem]">
                                    <th className="p-8 font-black uppercase text-[10px] tracking-[0.2em] rounded-l-[1.5rem]">Variety & Type</th>
                                    <th className="p-8 font-black uppercase text-[10px] tracking-[0.2em] text-center">Batch Vol</th>
                                    <th className="p-8 font-black uppercase text-[10px] tracking-[0.2em] text-center">Scale Weight</th>
                                    <th className="p-8 font-black uppercase text-[10px] tracking-[0.2em] text-center">Log Date</th>
                                    <th className="p-8 font-black uppercase text-[10px] tracking-[0.2em] text-center">Logistics</th>
                                    <th className="p-8 font-black uppercase text-[10px] tracking-[0.2em] text-center">Status</th>
                                    <th className="p-8 font-black uppercase text-[10px] tracking-[0.2em] text-center rounded-r-[1.5rem]">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {batches.length > 0 ? (
                                    batches.map((batch) => (
                                        <tr key={batch.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="p-6">
                                                <div className="flex flex-col gap-2">
                                                    <span className="text-xl font-black uppercase text-gray-900 tracking-tighter">{batch.rice_variety}</span>
                                                    <div className={`w-fit text-[10px] px-4 py-1.5 uppercase font-black flex items-center gap-2 rounded-full border border-emerald-950/20 ${
                                                        batch.condition === 'fresh' ? 'bg-amber-100 text-amber-900 border-amber-200' : 'bg-emerald-100 text-emerald-900 border-emerald-200'
                                                    }`}>
                                                        {batch.condition === 'fresh' ? 'FIELD FRESH' : 'READY TO MILL'}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6 text-center">
                                                <div className="flex flex-col items-center">
                                                    <span className="text-xl font-black text-gray-900 leading-none">{batch.total_sacks ?? batch.number_of_bags ?? '--'}</span>
                                                    <span className="text-[10px] font-black uppercase text-gray-400 mt-1 tracking-widest italic">Est. Sacks</span>
                                                </div>
                                            </td>
                                            <td className="p-6 text-center font-black text-lg text-gray-300 italic tracking-tighter">
                                                {batch.actual_weight_kg > 0 ? (
                                                    <span className="text-gray-900 not-italic">{batch.actual_weight_kg}</span>
                                                ) : (
                                                    'TBD'
                                                )}
                                            </td>
                                            <td className="p-6 text-center text-sm font-bold text-gray-500 font-mono">
                                                {batch.harvest_date}
                                            </td>
                                            <td className="p-6">
                                                <div className="flex justify-center">
                                                    {batch.delivery_status === 'Pending' && (
                                                        <span className="text-[10px] font-black uppercase bg-yellow-100 text-yellow-800 border-2 border-yellow-400 px-3 py-1.5 whitespace-nowrap">
                                                            Waiting for Driver Weight
                                                        </span>
                                                    )}
                                                    {batch.delivery_status === 'In Transit' && (
                                                        <span className="text-[10px] font-black uppercase bg-blue-50 text-blue-600 border-2 border-blue-400 px-3 py-1.5">
                                                            Heading to Mill
                                                        </span>
                                                    )}
                                                    {batch.delivery_status === 'Received' && (
                                                        <span className="text-[10px] font-black uppercase bg-emerald-950 text-white px-5 py-2 rounded-full shadow-lg shadow-emerald-200">
                                                            LOGISTIC SECURED
                                                        </span>
                                                    )}
                                                    {!batch.delivery_status && (
                                                        <span className="text-[10px] text-gray-300 uppercase font-black italic">--</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-6 text-center">
                                                <div className="flex flex-col items-center gap-3">
                                                    {/* BASIC STATUS BADGE */}
                                                    <span className={`px-4 py-1.5 border-4 border-black text-[10px] font-black uppercase ${
                                                        batch.status === 'available' ? 'bg-white text-black' : 
                                                        batch.status === 'interest_received' ? 'bg-orange-400 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' :
                                                        ['Accepted', 'payment_pending', 'payment_authorized'].includes(batch.status) ? 'bg-green-500 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' :
                                                        'bg-blue-600 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                                                    }`}>
                                                        {batch.status === 'available' ? 'Available' : 
                                                         batch.status === 'interest_received' ? `${batch.interests?.length || 0} INTEREST RECEIVED` : 
                                                         batch.status === 'payment_pending' ? 'Awaiting Miller Auth' :
                                                         batch.status === 'payment_authorized' ? 'Payment Authorized' :
                                                         batch.status === 'received' ? 'Received by Miller' :
                                                         batch.status === 'Accepted' ? 'Handshake Accepted' : 'Processed'}
                                                    </span>

                                                    {/* INTERESTED MILLERS LIST (2026 Handshake Phase) */}
                                                    {batch.status === 'interest_received' && batch.interests?.length > 0 && (
                                                        <div className="mt-4 w-72 glass-card p-4 space-y-3">
                                                            <div className="flex items-center gap-2 mb-3 px-1">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></div>
                                                                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-emerald-800/60">Interest Signal</p>
                                                            </div>
                                                            <div className="space-y-2 divide-y divide-emerald-100/30">
                                                                {batch.interests.map((interest: any) => (
                                                                    <div key={interest.id} className="flex items-center justify-between py-3 gap-4 group/item">
                                                                        <div className="flex flex-col items-start overflow-hidden">
                                                                            <span className="text-[11px] font-black uppercase text-emerald-950 tracking-tight group-hover/item:text-emerald-600 transition-colors">
                                                                                {interest.miller?.first_name} {interest.miller?.last_name}
                                                                            </span>
                                                                            <div className="flex items-center gap-1 opacity-40">
                                                                                <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeWidth="2"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2"/></svg>
                                                                                <span className="text-[8px] font-bold uppercase tracking-tighter">{interest.miller?.municipality} Hub</span>
                                                                            </div>
                                                                        </div>
                                                                        <button 
                                                                            onClick={() => router.post(route('farmer.accept', batch.id), { miller_id: interest.miller_id })}
                                                                            className="px-4 py-2 bg-emerald-950 text-white text-[9px] font-black uppercase rounded-full hover:bg-emerald-500 transition-all duration-300 shadow-md hover:shadow-emerald-200"
                                                                        >
                                                                            Accept
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                                                                     {/* ACCEPTED MILLER INFO */}
                                                    {batch.status === 'Accepted' && batch.accepted_miller && (
                                                        <div className="mt-2 flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full text-[9px] font-black uppercase italic text-emerald-700">
                                                            ACQUIRED BY {batch.accepted_miller.first_name} {batch.accepted_miller.last_name}
                                                        </div>
                                                    )}
                                                    
                                                    {/* DIGITAL RECEIPT (2026 GLASS STYLE) */}
                                                    {['payment_authorized', 'in_transit', 'received', 'milled', 'sold'].includes(batch.status?.toLowerCase()) && (
                                                        <div className="mt-4 w-72 bg-white/60 border border-white/40 p-6 rounded-[2rem] shadow-xl text-left backdrop-blur-xl group hover:bg-emerald-950 transition-all duration-500">
                                                            <div className="flex items-center gap-3 border-b border-emerald-100 pb-4 mb-5 group-hover:border-white/20">
                                                                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 group-hover:text-emerald-400">Yield Certificate</p>
                                                            </div>
                                                            <div className="space-y-4">
                                                                <div>
                                                                    <p className="text-[8px] font-black uppercase text-gray-400 group-hover:text-white/40">Acquired By:</p>
                                                                    <p className="text-[12px] font-black uppercase text-emerald-950 group-hover:text-white">{batch.accepted_miller?.first_name} {batch.accepted_miller?.last_name || 'Miller'}</p>
                                                                </div>
                                                                <div className="flex justify-between border-t border-emerald-100 pt-3 group-hover:border-white/20">
                                                                    <div>
                                                                        <p className="text-[8px] font-black uppercase text-gray-400 group-hover:text-white/40">Net Vol:</p>
                                                                        <p className="text-[14px] font-black text-emerald-950 group-hover:text-white">{batch.actual_weight_kg} kg</p>
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <p className="text-[8px] font-black uppercase text-gray-400 group-hover:text-white/40">Settlement:</p>
                                                                        <p className="text-[18px] font-black text-emerald-600 group-hover:text-emerald-400">₱{((batch.actual_weight_kg || 0) * (batch.suggested_price_per_kg || 0)).toLocaleString()}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="mt-5 bg-emerald-600 text-white text-[8px] font-black uppercase py-2.5 px-3 rounded-xl text-center tracking-[0.2em] group-hover:bg-white group-hover:text-emerald-950">
                                                                {batch.status === 'payment_authorized' ? 'Settlement Ready' : 'Processed'}
                                                            </div>
                                                        </div>                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <div className="flex items-center justify-center gap-4">
                                                    {batch.status === 'unsold' && (
                                                        <Link 
                                                            href={route('farmer.harvest.edit', batch.id)}
                                                            className="px-5 py-2.5 bg-white/60 text-emerald-950 text-[10px] font-black uppercase rounded-xl border border-white/80 shadow-lg hover:bg-white transition-all duration-300"
                                                        >
                                                            Edit Record
                                                        </Link>
                                                    )}
                                                    <button 
                                                        onClick={() => handleDelete(batch.id)}
                                                        className="px-5 py-2.5 bg-rose-50 text-rose-700 text-[10px] font-black uppercase rounded-xl border border-rose-200 shadow-sm hover:bg-rose-100 transition-all duration-300"
                                                    >
                                                        Purge Batch
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="p-40 text-center">
                                            <div className="inline-block px-12 py-8 bg-white/40 rounded-[3.5rem] border border-white/60 mb-8 opacity-40 text-sm font-black uppercase tracking-[1em]">PLATFORM EMPTY</div>
                                            <p className="text-emerald-950/40 font-black uppercase tracking-[0.5em] text-xl">System Awaiting Input</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
        </AuthenticatedLayout>
    );
}