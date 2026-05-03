import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

export default function IncomingPalay({ auth, batches }: any) {
    if (typeof window !== 'undefined') window.router = router;
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Incoming Palay" />
            <div className="p-6">
                <h2 className="text-2xl font-black uppercase mb-6">Incoming Palay</h2>
                
                {batches.length === 0 ? (
                    <p className="p-4 bg-gray-100 border-2 border-dashed border-gray-400">No incoming harvests yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {batches.map((batch: any) => (
                            <div key={batch.id} className="border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
                                <h3 className="font-bold text-xl uppercase tracking-tighter">{batch.rice_variety}</h3>
                                <p className="text-sm font-bold text-gray-400 uppercase">Weight: {batch.total_weight} kg</p>
                                <hr className="my-2 border-black" />
                                <p className="font-bold text-green-700">Farmer: {batch.user?.first_name} {batch.user?.last_name}</p>
                                <p className="font-bold text-blue-700">📞 Contact: {batch.user?.contact}</p>
                                
                                {batch.status === 'sold' && (
                                    <div className="mt-4 flex flex-col items-center text-center">
                                        <div className="px-3 py-1 bg-green-100 border border-green-300 mb-2">
                                            <p className="text-[10px] font-black text-green-700 uppercase tracking-widest italic">✅ Farmer Accepted - Ready for Coordination</p>
                                        </div>
                                        <button 
                                            onClick={() => window.router && window.router.patch(route('miller.contact_farmer', batch.id))}
                                            className="w-full py-2 bg-blue-500 text-white font-bold uppercase hover:bg-blue-600 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                        >
                                            Contact Farmer
                                        </button>
                                    </div>
                                )}
                                {batch.status === 'in_transit' && (
                                    <button 
                                        onClick={() => window.router && window.router.patch(route('miller.mark_received', batch.id))}
                                        className="mt-4 w-full py-2 bg-black text-white font-bold uppercase hover:bg-gray-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                    >
                                        📥 Mark Received
                                    </button>
                                )}
                                {batch.status === 'pending' && (
                                    <div className="mt-4 p-3 bg-gray-50 border-2 border-dashed border-gray-300 flex flex-col items-center">
                                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest text-center animate-pulse">⏳ Interest Recorded: Waiting for Farmer Acceptance</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}