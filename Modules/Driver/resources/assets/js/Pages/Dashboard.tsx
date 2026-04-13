import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import DeliveryStatusStepper from '@/Components/DeliveryStatusStepper';
import React from 'react';

export default function Dashboard({ auth, palayAssignments, riceAssignments, history }: any) {
    const { data: pickupData, setData: setPickupData, post: postPickup } = useForm({
        actual_weight_kg: '',
        suggested_price_per_kg: '',
    });

    const handleLogPickup = (id: number) => {
        postPickup(route('driver.palay.pickup', id));
    };

    const handleArrive = (id: number) => {
        router.post(route('driver.rice.arrive', id));
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Driver Dashboard" />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-3 h-10 bg-blue-600 border-2 border-black"></div>
                        <h2 className="text-4xl font-black uppercase tracking-tighter text-gray-900">
                            Road Ops Dashboard
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* CURRENT ASSIGNMENTS: Palay (Picking up) */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-black uppercase text-orange-600">Palay Pickups</h3>
                            
                            {palayAssignments.length === 0 ? (
                                <div className="p-8 border-4 border-dashed border-gray-300 text-center text-gray-400 font-bold uppercase">No pending palay pickups.</div>
                            ) : (
                                palayAssignments.map((batch: any) => (
                                    <div key={batch.id} className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(234,179,8,1)]">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h4 className="text-xl font-black uppercase">{batch.rice_variety}</h4>
                                                <p className="text-xs font-bold text-gray-500 uppercase italic">Farmer: {batch.user?.first_name} {batch.user?.last_name}</p>
                                                <p className="text-[10px] font-black italic">📞 {batch.user?.contact}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className="bg-gray-100 text-[10px] font-black px-2 py-1 border-2 border-black uppercase text-gray-600">Palay</span>
                                            </div>
                                        </div>

                                        <DeliveryStatusStepper status={batch.delivery_status} type="palay" />

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
                                                    className="w-full bg-black text-white font-black py-3 uppercase hover:bg-yellow-500 hover:text-black transition-colors"
                                                >
                                                    Start In-Transit
                                                </button>
                                            </div>
                                        )}

                                        {batch.delivery_status === 'In Transit' && (
                                            <div className="mt-6 p-4 bg-blue-50 border-4 border-black border-dashed flex flex-col items-center">
                                                <p className="font-black uppercase text-blue-800 tracking-widest text-xs">Heading to Miller station...</p>
                                                <p className="text-[10px] font-bold text-blue-400 mt-1">Miller: {batch.buyer?.first_name} {batch.buyer?.last_name}</p>
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
                                <div className="p-8 border-4 border-dashed border-gray-300 text-center text-gray-400 font-bold uppercase">No active rice deliveries.</div>
                            ) : (
                                riceAssignments.map((order: any) => (
                                    <div key={order.id} className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(37,99,235,1)]">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h4 className="text-xl font-black uppercase">{order.rice_variety}</h4>
                                                <p className="text-xs font-bold text-gray-500 uppercase italic">Retailer: {order.retailer?.first_name} {order.retailer?.last_name}</p>
                                                <p className="text-[10px] font-black italic">📞 {order.retailer?.contact}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className="bg-blue-100 text-[10px] font-black px-2 py-1 border-2 border-black uppercase text-blue-700">Rice</span>
                                            </div>
                                        </div>

                                        <DeliveryStatusStepper status={order.delivery_status} type="rice" />

                                        {order.delivery_status === 'Pending' && (
                                            <div className="mt-6">
                                                <div className="p-4 border-4 border-black bg-gray-100 mb-4">
                                                    <p className="text-xs font-bold">Pick up from: <span className="font-black uppercase">{order.miller?.first_name} {order.miller?.last_name}</span></p>
                                                </div>
                                                <button 
                                                    onClick={() => router.post(route('miller.order.dispatch', order.id))} // Re-using dispatch route if available
                                                    className="w-full bg-black text-white font-black py-4 uppercase hover:bg-blue-600 transition-colors"
                                                >
                                                    Confirm Loading & Start Trip
                                                </button>
                                            </div>
                                        )}

                                        {order.delivery_status === 'In Transit' && (
                                            <div className="mt-6">
                                                <button 
                                                    onClick={() => handleArrive(order.id)}
                                                    className="w-full bg-blue-600 text-white font-black py-4 uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black transition-colors"
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
                    <div className="mt-16">
                        <h3 className="text-xl font-black uppercase mb-6 tracking-widest text-gray-400">Assignment History</h3>
                        <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-gray-100 border-b-4 border-black">
                                    <tr>
                                        <th className="p-4 text-[10px] font-black uppercase">Type</th>
                                        <th className="p-4 text-[10px] font-black uppercase">Commodity</th>
                                        <th className="p-4 text-[10px] font-black uppercase text-center">Weight</th>
                                        <th className="p-4 text-[10px] font-black uppercase text-center">Status</th>
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
            </div>
        </AuthenticatedLayout>
    );
}

// Fixed import for router in buttons
import { router } from '@inertiajs/react';
