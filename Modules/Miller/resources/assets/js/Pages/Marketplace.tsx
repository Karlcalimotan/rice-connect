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

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    {/* GRID SYSTEM */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {batches.map((batch) => (
                            <div key={batch.id} className="group bg-white overflow-hidden border-4 border-black rounded-none shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[14px_14px_0px_0px_rgba(0,0,0,1)] transition-all relative">
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] mb-1">Rice Variety</p>
                                            <h3 className="text-3xl font-black uppercase text-blue-600 leading-none">{batch.rice_variety}</h3>
                                        </div>
                                        
                                        {/* SYNCED: Condition Badge */}
                                        <div className={`border-2 border-black px-3 py-1 -mr-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                                            batch.condition === 'fresh' ? 'bg-yellow-400' : 'bg-green-500'
                                        }`}>
                                            <span className={`text-xs font-black uppercase italic ${
                                                batch.condition === 'fresh' ? 'text-black' : 'text-white'
                                            }`}>
                                                {batch.condition === 'fresh' ? '🌾 Fresh' : '☀️ Ready'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-4 mb-8 bg-gray-50 p-4 border-2 border-black border-dashed">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-500 uppercase text-[10px] font-black">Quantity</span>
                                            <span className="font-black text-xl text-gray-900">{batch.number_of_bags} <span className="text-xs font-bold text-gray-500">BAGS</span></span>
                                        </div>
                                        <div className="flex justify-between items-center border-t border-gray-200 pt-2">
                                            <span className="text-gray-500 uppercase text-[10px] font-black">Total Weight</span>
                                            <span className="font-black text-xl text-gray-900">{batch.total_weight} <span className="text-xs font-bold text-gray-500">KG</span></span>
                                        </div>
                                    </div>

                                    <div className="space-y-2 mb-8 px-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 bg-black rounded-full flex-shrink-0 border border-white"></div>
                                            <span className="text-xs font-black uppercase text-gray-400">Farmer:</span>
                                            <span className="font-bold text-sm text-gray-800">{batch.user?.first_name} {batch.user?.last_name}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 bg-blue-500 rounded-full flex-shrink-0 border border-white"></div>
                                            <span className="text-xs font-black uppercase text-gray-400">Origin:</span>
                                            <span className="font-bold text-sm text-gray-800">{batch.user?.municipality}, {batch.user?.province}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 bg-yellow-400 rounded-full flex-shrink-0 border border-white"></div>
                                            <span className="text-xs font-black uppercase text-gray-400">Harvest:</span>
                                            <span className="font-bold text-sm text-gray-800">
                                                {new Date(batch.harvest_date).toLocaleDateString(undefined, {month: 'long', day: 'numeric', year: 'numeric'})}
                                            </span>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => handleInquiry(batch.id)}
                                        disabled={processing}
                                        className="w-full bg-yellow-400 hover:bg-black hover:text-yellow-400 text-black font-black py-4 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all uppercase tracking-tighter text-xl flex items-center justify-center gap-2 group disabled:opacity-50"
                                    >
                                        {processing ? '...' : (
                                            <>
                                                <span>I AM INTERESTED</span>
                                                <span className="group-hover:translate-x-2 transition-transform">→</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {batches.length === 0 && (
                        <div className="text-center py-24 bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)]">
                            <div className="inline-block p-6 bg-gray-100 border-2 border-black mb-4">🚜</div>
                            <p className="text-gray-400 font-black uppercase tracking-[0.3em] text-xl">Market is currently empty</p>
                            <p className="text-gray-300 font-bold mt-2">Check back later for new farmer harvests.</p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}