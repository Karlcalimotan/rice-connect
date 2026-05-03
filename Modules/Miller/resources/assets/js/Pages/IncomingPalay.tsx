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
                                
                                {batch.status === 'Accepted' && (
                                    <div className="mt-4 flex flex-col items-center text-center">
                                        <div className="px-3 py-1 bg-green-100 border-2 border-green-300 mb-2">
                                            <p className="text-[10px] font-black text-green-700 uppercase tracking-widest italic animate-bounce">✅ Handshake Complete! Farmer Accepted Interest</p>
                                        </div>
                                        <div className="p-3 bg-yellow-50 border-2 border-black w-full mb-2">
                                            <p className="text-[10px] font-black uppercase text-yellow-800">Coordination Hub</p>
                                            <p className="font-bold text-sm">Coordinate with: {batch.user?.contact}</p>
                                        </div>
                                        <button 
                                            onClick={() => window.location.href = `/miller/transport`}
                                            className="w-full py-3 bg-black text-white font-black uppercase hover:bg-green-600 transition-colors border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                        >
                                            🚀 GO TO TRANSPORT TAB TO ASSIGN DRIVER
                                        </button>
                                    </div>
                                )}
                                {batch.status === 'Interest Pending' && (
                                    <div className="mt-4 p-4 bg-gray-50 border-4 border-dashed border-gray-300 flex flex-col items-center">
                                        <span className="text-2xl mb-2">⏳</span>
                                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest text-center animate-pulse">Waiting for Farmer to Accept handshake...</p>
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