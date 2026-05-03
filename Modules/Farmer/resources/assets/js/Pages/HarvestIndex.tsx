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
            
            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-8 bg-green-600 border border-black"></div>
                            <h2 className="text-3xl font-black uppercase tracking-tighter text-gray-900">
                                My Harvest Log
                            </h2>
                        </div>
                        <Link 
                            href={route('farmer.harvest.create')}
                            className="bg-black text-white px-6 py-3 font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(34,197,94,1)] hover:bg-green-600 hover:text-black transition-all active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                        >
                            + Post Harvest
                        </Link>
                    </div>

                    <div className="bg-white border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b-4 border-black bg-white">
                                    <th className="p-6 font-black uppercase text-[10px] tracking-[0.2em] text-gray-500">Variety & Condition</th>
                                    <th className="p-6 font-black uppercase text-[10px] tracking-[0.2em] text-gray-500 text-center">Bags</th>
                                    <th className="p-6 font-black uppercase text-[10px] tracking-[0.2em] text-gray-500 text-center">Weight (kg)</th>
                                    <th className="p-6 font-black uppercase text-[10px] tracking-[0.2em] text-gray-500 text-center">Harvest Date</th>
                                    <th className="p-6 font-black uppercase text-[10px] tracking-[0.2em] text-gray-500 text-center">Harvest Tracking</th>
                                    <th className="p-6 font-black uppercase text-[10px] tracking-[0.2em] text-gray-500 text-center">Status</th>
                                    <th className="p-6 font-black uppercase text-[10px] tracking-[0.2em] text-gray-500 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y-2 divide-gray-100">
                                {batches.length > 0 ? (
                                    batches.map((batch) => (
                                        <tr key={batch.id} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="p-6">
                                                <div className="flex flex-col gap-2">
                                                    <span className="text-xl font-black uppercase text-gray-900 tracking-tighter">{batch.rice_variety}</span>
                                                    <div className={`w-fit text-[10px] px-3 py-1 uppercase font-black flex items-center gap-1.5 border-2 border-black ${
                                                        batch.condition === 'fresh' ? 'bg-yellow-400 text-black' : 'bg-green-500 text-white'
                                                    }`}>
                                                        <span>{batch.condition === 'fresh' ? '🌾' : '☀️'}</span>
                                                        {batch.condition === 'fresh' ? 'Fresh / Wet' : 'Ready to Mill'}
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
                                                        <span className="text-[10px] font-black uppercase bg-green-600 text-white border-2 border-black px-3 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                            ✅ Arrived at Miller
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

                                                    {/* INTERESTED MILLERS LIST (Handshake Phase) */}
                                                    {batch.status === 'interest_received' && batch.interests?.length > 0 && (
                                                        <div className="mt-4 w-64 p-3 bg-yellow-50 border-4 border-black divide-y-2 divide-black">
                                                            <p className="text-[10px] font-black uppercase text-gray-400 mb-2 border-b-2 border-black pb-1">Interested Millers</p>
                                                            {batch.interests.map((interest: any) => (
                                                                <div key={interest.id} className="flex items-center justify-between py-2 gap-2">
                                                                    <div className="flex flex-col items-start overflow-hidden">
                                                                        <span className="text-[11px] font-black uppercase truncate w-full">
                                                                            {interest.miller?.first_name} {interest.miller?.last_name}
                                                                        </span>
                                                                        <span className="text-[9px] text-gray-500">{interest.miller?.municipality}</span>
                                                                    </div>
                                                                    <button 
                                                                        onClick={() => router.post(route('farmer.accept', batch.id), { miller_id: interest.miller_id })}
                                                                        className="flex-shrink-0 px-2 py-1 bg-black text-white text-[9px] font-black uppercase hover:bg-green-600 transition-colors"
                                                                    >
                                                                        Accept
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}

                                                    {/* ACCEPTED MILLER INFO */}
                                                    {batch.status === 'Accepted' && batch.accepted_miller && (
                                                        <div className="mt-2 flex items-center gap-2 px-3 py-1 bg-green-100 border-2 border-green-600 text-[10px] font-black uppercase italic text-green-800">
                                                            🤝 {batch.accepted_miller.first_name} {batch.accepted_miller.last_name}
                                                        </div>
                                                    )}

                                                    {/* DIGITAL RECEIPT (Phase 3 Finalized) */}
                                                    {['payment_authorized', 'in_transit', 'received', 'milled', 'sold'].includes(batch.status?.toLowerCase()) && (
                                                        <div className="mt-4 w-64 bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(34,197,94,1)] text-left">
                                                            <div className="flex items-center gap-2 border-b-2 border-black pb-2 mb-2">
                                                                <span className="text-lg">🧾</span>
                                                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Digital Receipt</p>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <div>
                                                                    <p className="text-[8px] font-black uppercase text-gray-400">Sold To:</p>
                                                                    <p className="text-[11px] font-black uppercase">{batch.accepted_miller?.first_name} {batch.accepted_miller?.last_name || 'Accepted Miller'}</p>
                                                                </div>
                                                                <div className="flex justify-between border-t-2 border-black border-dashed pt-2">
                                                                    <div>
                                                                        <p className="text-[8px] font-black uppercase text-gray-400">Weight:</p>
                                                                        <p className="text-[12px] font-black">{batch.actual_weight_kg} kg</p>
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <p className="text-[8px] font-black uppercase text-gray-400">Total Amount:</p>
                                                                        <p className="text-[14px] font-black text-green-600">₱{((batch.actual_weight_kg || 0) * (batch.suggested_price_per_kg || 0)).toLocaleString()}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="mt-3 bg-black text-white text-[8px] font-black uppercase py-1 px-2 text-center tracking-widest">
                                                                {batch.status === 'payment_authorized' ? 'Payment Authorized' : 'Handover Complete'}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-6">
                                                <div className="flex items-center justify-center gap-3">
                                                    {batch.status === 'unsold' && (
                                                        <Link 
                                                            href={route('farmer.harvest.edit', batch.id)}
                                                            className="px-4 py-2 bg-white text-black text-[10px] font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-50 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
                                                        >
                                                            Edit
                                                        </Link>
                                                    )}
                                                    <button 
                                                        onClick={() => handleDelete(batch.id)}
                                                        className="px-4 py-2 bg-red-600 text-white text-[10px] font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-red-700 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="p-32 text-center">
                                            <div className="inline-block p-6 bg-gray-50 border-2 border-black border-dashed mb-4">🚜</div>
                                            <p className="text-gray-300 font-black uppercase tracking-[0.3em] text-xl">No Harvest Records Found</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}