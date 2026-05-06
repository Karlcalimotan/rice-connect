import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import DeliveryStatusStepper from '@/Components/DeliveryStatusStepper';
import React from 'react';

export default function Dashboard({ auth, palayAssignments, riceAssignments, history }: any) {
    const { data: pickupData, setData: setPickupData, post: postPickup } = useForm({
        actual_weight_kg: '',
        suggested_price_per_kg: '',
    });

    const [selectedBatch, setSelectedBatch] = React.useState<any>(null);

    const handleLogPickup = (id: number) => {
        postPickup(route('driver.palay.pickup', id));
    };

    const handleArrive = (id: number) => {
        router.post(route('driver.rice.arrive', { id }));
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Driver Dashboard" />

            <div className="py-12 bg-transparent min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-3 h-10 bg-emerald-600 rounded-full shadow-[0_0_15px_rgba(5,150,105,0.4)]"></div>
                        <h2 className="text-5xl font-black uppercase tracking-tighter text-emerald-950 leading-none">
                            Road Ops Dashboard
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* CURRENT ASSIGNMENTS: Palay (Picking up) */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-black uppercase text-orange-600">Palay Pickups</h3>
                            
                            {palayAssignments.length === 0 ? (
                                <div className="glass-card p-12 text-center flex flex-col items-center justify-center border-dashed border-2 border-emerald-900/10">
                                    <span className="text-4xl mb-4 opacity-50">🌾</span>
                                    <p className="text-emerald-950/40 font-black uppercase tracking-widest text-[10px]">No pending palay pickups.</p>
                                </div>
                            ) : (
                                palayAssignments.map((batch: any) => (
                                    <div key={batch.id} className="glass-card group relative p-8">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-emerald-500/10 transition-all"></div>
                                        
                                        <div className="relative flex justify-between items-start mb-6">
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                                                    <h4 className="text-2xl font-black uppercase tracking-tighter text-gray-900 leading-none">{batch.rice_variety}</h4>
                                                </div>
                                                <div className="mb-4 bg-yellow-400 border-[3px] border-black inline-block px-4 py-1.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                                    <span className="text-xs font-black uppercase tracking-widest italic">📦 EST. {batch.total_sacks ?? batch.number_of_bags} SACKS</span>
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                                                        <span className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center text-[8px]">👤</span>
                                                        Farmer: <span className="text-gray-900">{batch.user?.first_name} {batch.user?.last_name}</span>
                                                    </p>
                                                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                                                        <span className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center text-[8px]">📞</span>
                                                        Contact: <span className="text-blue-600">{batch.user?.contact}</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="bg-black text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em]">Palay Supply</span>
                                            </div>
                                        </div>

                                        <DeliveryStatusStepper status={batch.delivery_status} type="palay" />

                                        {batch.delivery_status === 'Payment Pending' && (
                                            <div className="mt-6 p-6 bg-gray-100 border-4 border-black border-dashed flex flex-col items-center">
                                                <div className="text-3xl mb-2">⏳</div>
                                                <p className="font-black uppercase text-gray-500 tracking-widest text-[10px] text-center">
                                                    Weight Logged. Waiting for Miller to authorize the payment...
                                                </p>
                                                <p className="mt-2 text-[8px] font-bold text-gray-400 uppercase italic">Miller: {batch.buyer?.first_name}</p>
                                            </div>
                                        )}

                                        {batch.delivery_status === 'Payment Authorized' && (
                                            <div className="mt-6 p-5 bg-green-50 border-4 border-black shadow-[8px_8px_0px_0px_rgba(34,197,94,1)]">
                                                <div className="flex items-center gap-2 mb-4 text-green-600">
                                                    <span className="text-xl">✅</span>
                                                    <p className="font-black uppercase tracking-tighter text-sm">Payment Authorized by Miller</p>
                                                </div>
                                                
                                                <div className="bg-white border-2 border-black p-4 mb-5">
                                                    <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Total to Handover to Farmer:</p>
                                                    <p className="text-2xl font-black text-gray-900">₱{((batch.actual_weight_kg || 0) * (batch.suggested_price_per_kg || 0)).toLocaleString()}</p>
                                                    <p className="text-[9px] font-bold text-gray-400 mt-1 uppercase italic">* {batch.actual_weight_kg}kg x ₱{batch.suggested_price_per_kg}/kg</p>
                                                </div>

                                                <button 
                                                    onClick={() => router.post(route('driver.palay.finalize', batch.id))}
                                                    className="btn-2026 w-full text-center !py-4"
                                                >
                                                    Finalize Pickup & Pay Farmer
                                                </button>
                                            </div>
                                        )}

                                        {batch.delivery_status === 'Pending' && (
                                            <div className="mt-6 p-4 bg-yellow-50 border-4 border-black border-dashed">
                                                <p className="text-xs font-black uppercase mb-3">Phase 2: Log Warehouse Weight</p>
                                                <div className="grid grid-cols-2 gap-4 mb-4">
                                                    <div>
                                                        <label className="block text-[10px] font-black uppercase mb-1">Actual Weight (kg)</label>
                                                        <input 
                                                            type="number" 
                                                            className="w-full border-4 border-black p-2 font-black text-sm"
                                                            value={pickupData.actual_weight_kg}
                                                            onChange={e => setPickupData('actual_weight_kg', e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-[10px] font-black uppercase mb-1">Suggested Price (₱/kg)</label>
                                                        <input 
                                                            type="number" 
                                                            className="w-full border-4 border-black p-2 font-black text-sm"
                                                            value={pickupData.suggested_price_per_kg}
                                                            onChange={e => setPickupData('suggested_price_per_kg', e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <button 
                                                    onClick={() => handleLogPickup(batch.id)}
                                                    className="btn-2026 w-full text-center !bg-yellow-600 hover:!bg-yellow-700 !py-4"
                                                >
                                                    Start In-Transit
                                                </button>
                                            </div>
                                        )}

                                        {batch.delivery_status === 'In Transit' && (
                                            <div className="mt-6">
                                                <button 
                                                    onClick={() => setSelectedBatch(batch)}
                                                    className="btn-2026 w-full text-center !bg-blue-600 hover:!bg-blue-700 !py-4"
                                                >
                                                    Mark as Arrived at Miller
                                                </button>
                                                <div className="mt-3 flex items-center justify-center gap-2">
                                                    <span className="text-lg">🚚</span>
                                                    <p className="font-black uppercase text-blue-800 tracking-widest text-[10px]">Heading to Miller station...</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>

                        {/* CURRENT ASSIGNMENTS: Rice (Delivering) */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-black uppercase text-blue-600">Rice Deliveries</h3>
                            
                            {riceAssignments.length === 0 ? (
                                <div className="glass-card p-12 text-center flex flex-col items-center justify-center border-dashed border-2 border-emerald-900/10">
                                    <span className="text-4xl mb-4 opacity-50">📦</span>
                                    <p className="text-emerald-950/40 font-black uppercase tracking-widest text-[10px]">No active rice deliveries.</p>
                                </div>
                            ) : (
                                riceAssignments.map((order: any) => (
                                    <div key={order.id} className="glass-card group relative p-8">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-blue-500/10 transition-all"></div>

                                        <div className="relative flex justify-between items-start mb-6">
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                                    <h4 className="text-2xl font-black uppercase tracking-tighter text-gray-900 leading-none">{order.rice_variety}</h4>
                                                </div>
                                                <div className="space-y-1 mt-4">
                                                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                                                        <span className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center text-[8px]">🏬</span>
                                                        Retailer: <span className="text-gray-900">{order.retailer?.first_name} {order.retailer?.last_name}</span>
                                                    </p>
                                                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                                                        <span className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center text-[8px]">📞</span>
                                                        Contact: <span className="text-blue-600">{order.retailer?.contact}</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="bg-blue-600 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em]">Retailer Order</span>
                                            </div>
                                        </div>

                                        <DeliveryStatusStepper status={order.delivery_status} type="rice" />

                                        {order.delivery_status === 'Pending' && (
                                            <div className="mt-6">
                                                <div className="p-4 border-4 border-black bg-gray-100 mb-4">
                                                    <p className="text-xs font-bold">Pick up from: <span className="font-black uppercase">{order.miller?.first_name} {order.miller?.last_name}</span></p>
                                                    <p className="text-[10px] font-black italic mt-1 text-gray-500">Note: Miller must dispatch once you start the trip.</p>
                                                </div>
                                                <button 
                                                    onClick={() => router.post(route('driver.rice.start_trip', { id: order.id }))} 
                                                    className="btn-2026 w-full text-center !bg-blue-600 hover:!bg-blue-700 !py-4"
                                                >
                                                    Confirm Loading & Start Trip
                                                </button>
                                            </div>
                                        )}

                                        {order.delivery_status === 'In Transit' && (
                                            <div className="mt-6">
                                                <button 
                                                    onClick={() => handleArrive(order.id)}
                                                    className="btn-2026 w-full text-center !bg-blue-600 hover:!bg-blue-700 !py-4"
                                                >
                                                    Mark as Delivered
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* RECENT HISTORY */}
                    <div className="mt-20">
                        <h3 className="text-[10px] font-black uppercase mb-8 tracking-[0.3em] text-emerald-600">Assignment History</h3>
                        <div className="glass-card overflow-hidden shadow-2xl">
                            <table className="w-full text-left">
                                <thead className="bg-emerald-700/80 backdrop-blur-md">
                                    <tr>
                                        <th className="p-6 text-[10px] font-black uppercase tracking-widest text-emerald-50">Type</th>
                                        <th className="p-6 text-[10px] font-black uppercase tracking-widest text-emerald-50">Commodity</th>
                                        <th className="p-6 text-[10px] font-black uppercase tracking-widest text-emerald-50 text-center">Weight</th>
                                        <th className="p-6 text-[10px] font-black uppercase tracking-widest text-emerald-50 text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.palay.map((h: any) => (
                                        <tr key={'p'+h.id} className="border-b-2 border-gray-100">
                                            <td className="p-4 font-black text-xs uppercase text-orange-600">Palay</td>
                                            <td className="p-4 font-bold text-sm uppercase">{h.rice_variety}</td>
                                            <td className="p-4 text-center font-bold">{h.actual_weight_kg} kg</td>
                                            <td className="p-4 text-center">
                                                <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-1 uppercase">Completed</span>
                                            </td>
                                        </tr>
                                    ))}
                                    {history.rice.map((h: any) => (
                                        <tr key={'r'+h.id} className="border-b-2 border-gray-100">
                                            <td className="p-4 font-black text-xs uppercase text-blue-600">Rice</td>
                                            <td className="p-4 font-bold text-sm uppercase">{h.rice_variety}</td>
                                            <td className="p-4 text-center font-bold">{h.total_weight} kg</td>
                                            <td className="p-4 text-center">
                                                <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-1 uppercase">Completed</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* ARRIVAL VERIFICATION MODAL */}
                {selectedBatch && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
                        <div className="bg-white border-8 border-black w-full max-w-xl shadow-[20px_20px_0px_0px_rgba(37,99,235,1)] p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-3xl font-black uppercase tracking-tighter text-gray-900 leading-none">Finalize Arrival</h3>
                                <button onClick={() => setSelectedBatch(null)} className="text-2xl font-black hover:text-red-600 transition-colors">✕</button>
                            </div>

                            <div className="space-y-6 mb-8">
                                <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] border-b-4 border-gray-100 pb-2">Logistics Proofing</p>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-gray-50 p-4 border-4 border-black">
                                        <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Est. Sacks</label>
                                        <p className="text-2xl font-black">{selectedBatch.total_sacks ?? selectedBatch.number_of_bags}</p>
                                    </div>
                                    <div className="bg-yellow-50 p-4 border-4 border-black">
                                        <label className="block text-[10px] font-black uppercase text-yellow-600 mb-1">Actual Weight</label>
                                        <p className="text-2xl font-black">{selectedBatch.actual_weight_kg} kg</p>
                                    </div>
                                </div>

                                <div className="bg-blue-600 text-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
                                    <p className="text-[10px] font-black uppercase tracking-widest mb-1">Handover Payment Total:</p>
                                    <p className="text-4xl font-black italic underline decoration-white decoration-4 underline-offset-4">
                                        ₱{((selectedBatch.actual_weight_kg || 0) * (selectedBatch.suggested_price_per_kg || 0)).toLocaleString()}
                                    </p>
                                    <p className="text-[10px] font-bold mt-2 opacity-80 italic tracking-widest uppercase">* {selectedBatch.actual_weight_kg}kg @ ₱{selectedBatch.suggested_price_per_kg}/kg</p>
                                </div>

                                <div className="flex items-start gap-3 bg-red-50 p-4 border-4 border-black border-dashed">
                                    <div className="mt-1">
                                        <input type="checkbox" id="confirm-arrival" className="w-6 h-6 border-4 border-black text-blue-600 focus:ring-0 cursor-pointer" />
                                    </div>
                                    <label htmlFor="confirm-arrival" className="text-[11px] font-black uppercase leading-tight cursor-pointer">
                                        I confirm that I have arrived at the Miller station and the weights recorded above are accurate for this delivery.
                                    </label>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <button 
                                    onClick={() => setSelectedBatch(null)}
                                    className="bg-white text-black font-black py-4 uppercase border-4 border-black hover:bg-gray-100 transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
                                >
                                    Cancel / Edit
                                </button>
                                <button 
                                    onClick={() => {
                                        router.post(route('driver.palay.arrive', selectedBatch.id));
                                        setSelectedBatch(null);
                                    }}
                                    className="bg-black text-white font-black py-4 uppercase border-4 border-black hover:bg-green-600 hover:text-black transition-all shadow-[8px_8px_0px_0px_rgba(34,197,94,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
                                >
                                    Confirm Arrival
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
