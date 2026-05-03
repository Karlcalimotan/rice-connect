import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';

export default function Marketplace({ auth, batches, miller_town }: { auth: any, batches: any[], miller_town?: string }) {
    const { post, processing } = useForm();

    const handleInquiry = (id: number) => {
        router.patch(route('miller.interest', id));
    };

    return (
        <AuthenticatedLayout 
            auth={auth} // FIXED: Passing the full auth object
            header={
                <div className="flex items-center gap-2">
                    <div className="w-2 h-8 bg-yellow-400 border border-black"></div>
                    <h2 className="text-2xl font-black uppercase tracking-tight text-gray-900">
                        {miller_town ? `Palay Market: ${miller_town}` : 'Palay Marketplace'}
                    </h2>
                </div>
            }
        >
            <Head title="Palay Marketplace" />

            <div className="py-12 bg-transparent min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* GRID SYSTEM */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {batches.map((batch) => (
                            <div key={batch.id} className="group relative bg-white/70 backdrop-blur-xl rounded-[2.5rem] overflow-hidden p-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/50 hover:shadow-[0_30px_60px_rgba(5,150,105,0.15)] transition-all duration-500">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-emerald-500/10 transition-all"></div>
                                
                                <div className="relative flex justify-between items-start mb-6">
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-emerald-900/30 tracking-[0.4em] mb-2 leading-none">Palay Batch</p>
                                        <h3 className="text-3xl font-black uppercase tracking-tighter text-gray-900 leading-none">{batch.rice_variety}</h3>
                                    </div>
                                    <div className={`px-4 py-1.5 rounded-full border-2 border-black font-black text-[10px] uppercase tracking-widest shadow-sm ${
                                        batch.condition === 'fresh' ? 'bg-yellow-400 text-black' : 'bg-emerald-500 text-white'
                                    }`}>
                                        {batch.condition === 'fresh' ? '🌾 Fresh' : '☀️ Ready'}
                                    </div>
                                </div>

                                <div className="relative bg-emerald-900 text-white rounded-3xl p-6 mb-8 shadow-xl overflow-hidden group/inner">
                                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 to-emerald-950"></div>
                                    <div className="relative flex justify-between items-end">
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400/60 mb-2">Inventory Estimate</p>
                                            <p className="text-3xl font-black">{batch.total_sacks > 0 ? `${batch.total_sacks} Sacks` : 'TBD'}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400/60 mb-1">Status</p>
                                            <span className="text-xs font-black uppercase italic text-emerald-300">{batch.status}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative space-y-4 mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-black text-gray-400 border border-gray-200">
                                            {batch.user?.first_name[0]}
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest leading-none mb-1">Farmer Partner</p>
                                            <p className="text-sm font-black text-gray-900">{batch.user?.first_name} {batch.user?.last_name}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 border border-blue-100">
                                            📍
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest leading-none mb-1">Pickup Zone</p>
                                            <p className="text-sm font-black text-gray-900 leading-tight">
                                                {batch.location || `${batch.user?.municipality}, ${batch.user?.province}`}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* INTEREST ACTION */}
                                <div className="relative">
                                    {batch.interests?.some(i => i.miller_id === auth.user.id) ? (
                                        <div className="w-full bg-emerald-950 text-emerald-400 font-black py-5 rounded-2xl border-2 border-emerald-800 text-center uppercase tracking-widest text-xs flex flex-col gap-1 shadow-inner">
                                            <span>Interest Sent</span>
                                            <span className="text-[8px] text-emerald-600 tracking-[0.4em]">Awaiting Approval</span>
                                        </div>
                                    ) : (
                                        <button 
                                            onClick={() => handleInquiry(batch.id)}
                                            disabled={processing}
                                            className="w-full bg-gray-900 hover:bg-black text-white font-black py-5 rounded-2xl transition-all shadow-[0_15px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:-translate-y-1 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 group/btn uppercase tracking-widest text-xs"
                                        >
                                            {processing ? '...' : (
                                                <>
                                                    <span>Signal Interest</span>
                                                    <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {batches.length === 0 && (
                        <div className="max-w-3xl mx-auto text-center py-24 bg-white/70 backdrop-blur-2xl border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[3rem] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                            <div className="relative inline-block p-10 bg-emerald-50/50 backdrop-blur-md rounded-3xl border-2 border-emerald-100 mb-8 rotate-3 shadow-lg">
                                <span className="text-6xl">🚜</span>
                            </div>
                            <h3 className="text-4xl font-black uppercase tracking-tighter text-gray-900 mb-2 leading-none">Market is Empty</h3>
                            <p className="text-xs font-black text-emerald-600 uppercase tracking-[0.5em] opacity-60">Check back later for new harvests</p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}