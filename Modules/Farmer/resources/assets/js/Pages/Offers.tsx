import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import React from 'react';

export default function Offers({ auth, offers }: any) {
    const handleAccept = (id: number) => {
        router.post(route('farmer.accept', id));
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Handshake Offers" />
            <div className="p-8 bg-gray-50 min-h-screen">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-2 h-10 bg-yellow-400 border-2 border-black"></div>
                        <h2 className="text-3xl font-black uppercase tracking-tighter">Mill Handshake Offers</h2>
                    </div>

                    {offers.length === 0 ? (
                        <div className="bg-white border-4 border-dashed border-gray-300 p-12 text-center text-gray-400 font-bold uppercase">
                            No active offers or interests from millers.
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {offers.map((batch: any) => (
                                <div key={batch.id} className="border-4 border-black p-6 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-gray-400">Palay Variety</p>
                                            <h3 className="font-black text-3xl uppercase leading-none">{batch.rice_variety}</h3>
                                        </div>
                                        <span className="px-3 py-1 bg-yellow-400 border-2 border-black text-[10px] font-black uppercase tracking-widest animate-pulse">
                                            Handshake Pending
                                        </span>
                                    </div>

                                    <div className="bg-gray-50 border-2 border-black p-4 mb-6">
                                        <p className="text-xs uppercase font-bold text-gray-500 mb-2">Interested Miller:</p>
                                        <div className="flex justify-between items-end">
                                            <div>
                                                <p className="font-black text-xl text-green-700">{batch.buyer?.first_name} {batch.buyer?.last_name}</p>
                                                <p className="text-xs font-bold">📍 {batch.buyer?.municipality}, {batch.buyer?.province}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] font-black uppercase">Batch Weight</p>
                                                <p className="font-black text-lg">{batch.total_weight} kg</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <button 
                                            onClick={() => handleAccept(batch.id)}
                                            className="flex-1 bg-green-500 text-black font-black py-4 border-4 border-black hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] uppercase"
                                        >
                                            🤝 Accept Handshake
                                        </button>
                                        <button 
                                            className="flex-1 bg-white text-gray-400 font-black py-4 border-4 border-black hover:bg-red-500 hover:text-white transition-all uppercase"
                                        >
                                            Decline
                                        </button>
                                    </div>
                                    <p className="mt-4 text-[9px] font-bold text-gray-400 uppercase italic">Note: Accepting this means you allow the miller to assign a driver to your location.</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}