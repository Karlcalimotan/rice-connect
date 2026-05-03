import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

export default function IncomingPalay({ auth, batches }: any) {
    if (typeof window !== 'undefined') window.router = router;
    return (
        <AuthenticatedLayout 
            auth={auth}
            header={
                <div className="flex items-center gap-2">
                    <div className="w-2 h-8 bg-emerald-600 rounded-full"></div>
                    <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900">Incoming Palay</h2>
                </div>
            }
        >
            <Head title="Incoming Palay" />
            <div className="py-12 bg-transparent min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    {batches.length === 0 ? (
                        <div className="max-w-3xl mx-auto text-center py-24 bg-white/70 backdrop-blur-2xl border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[3rem] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                            <div className="relative inline-block p-10 bg-emerald-50/50 backdrop-blur-md rounded-3xl border-2 border-emerald-100 mb-8 rotate-3 shadow-lg">
                                <span className="text-6xl">🌾</span>
                            </div>
                            <h3 className="text-4xl font-black uppercase tracking-tighter text-gray-900 mb-2 leading-none">No Incoming Palay</h3>
                            <p className="text-xs font-black text-emerald-600 uppercase tracking-[0.5em] opacity-60 text-center">Waiting for Farmer handshakes...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {batches.map((batch: any) => (
                                <div key={batch.id} className="group relative bg-white/70 backdrop-blur-xl rounded-[2.5rem] overflow-hidden p-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/50 hover:shadow-[0_30px_60px_rgba(5,150,105,0.15)] transition-all duration-500">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-emerald-500/10 transition-all"></div>
                                    
                                    <div className="relative mb-6">
                                        <p className="text-[10px] font-black uppercase text-emerald-900/30 tracking-[0.4em] mb-2 leading-none">Negotiation Active</p>
                                        <h3 className="text-3xl font-black uppercase tracking-tighter text-gray-900 leading-none">{batch.rice_variety}</h3>
                                    </div>

                                    <div className="relative bg-emerald-900 text-white rounded-3xl p-6 mb-8 shadow-xl overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 to-emerald-950"></div>
                                        <div className="relative">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400/60 mb-2">Partner Details</p>
                                            <p className="text-xl font-black">{batch.user?.first_name} {batch.user?.last_name}</p>
                                            <p className="text-sm font-bold text-emerald-400">📞 {batch.user?.contact}</p>
                                        </div>
                                    </div>

                                    <div className="relative mb-8">
                                        {batch.status === 'Accepted' && (
                                            <div className="space-y-4">
                                                <div className="bg-emerald-50/50 backdrop-blur-md rounded-2xl p-4 border-2 border-emerald-100 text-center">
                                                    <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest leading-tight">✅ Handshake Complete!<br/>Farmer Accepted Interest</p>
                                                </div>
                                                <button 
                                                    onClick={() => window.location.href = `/miller/transport`}
                                                    className="w-full py-5 bg-gray-900 hover:bg-black text-white font-black rounded-2xl transition-all shadow-xl active:scale-95 uppercase tracking-widest text-xs"
                                                >
                                                    🚀 PROCEED TO TRANSPORT
                                                </button>
                                            </div>
                                        )}
                                        {batch.status === 'Interest Pending' && (
                                            <div className="p-8 bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center">
                                                <span className="text-3xl mb-3 animate-pulse">⏳</span>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center leading-relaxed">
                                                    Waiting for Farmer to<br/>Accept Handshake...
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}