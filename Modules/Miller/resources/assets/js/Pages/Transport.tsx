import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import DeliveryStatusStepper from '@/Components/DeliveryStatusStepper';
import FleetManagement from '../Components/FleetManagement';
import React from 'react';

export default function Transport({ auth, inbound, outbound, allDrivers, myFleet }: any) {
    const { data: palayData, setData: setPalayData, post: postPalay } = useForm({
        actual_weight_kg: '',
        suggested_price_per_kg: '',
    });

    const { data: finalizeData, setData: setFinalizeData, post: postFinalize } = useForm({
        final_price_per_kg: '',
    });

    const { data: driverAssignment, setData: setDriverAssignment } = useForm({
        driver_id: '',
        type: ''
    });

    const { data: pickupScheduling, setData: setPickupScheduling, post: postPickupSchedule } = useForm({
        scheduled_pickup_date: '',
    });

    const { data: deliveryScheduling, setData: setDeliveryScheduling, post: postDeliverySchedule } = useForm({
        scheduled_delivery_date: '',
    });

    const handleConfirmPickup = (id: number) => {
        postPalay(route('miller.palay.confirm_pickup', id));
    };

    const handleFinalizeTransaction = (id: number) => {
        postFinalize(route('miller.palay.finalize', id));
    };

    const handleAssignDriver = (id: number, type: 'palay' | 'rice') => {
        if (!driverAssignment.driver_id) {
            alert('Please select a driver first.');
            return;
        }
        router.post(route('miller.transport.assign_driver', id), {
            driver_id: driverAssignment.driver_id,
            type: type
        });
    };

    const handleDispatch = (id: number) => {
        router.post(route('miller.order.dispatch', id));
    };

    const handleSchedulePickup = (id: number) => {
        postPickupSchedule(route('miller.palay.schedule_pickup', id), {
            onSuccess: () => setPickupScheduling('scheduled_pickup_date', ''),
        });
    };

    const handleScheduleDelivery = (id: number) => {
        postDeliverySchedule(route('miller.order.schedule_delivery', id), {
            onSuccess: () => setDeliveryScheduling('scheduled_delivery_date', ''),
        });
    };

    React.useEffect(() => {
        const interval = setInterval(() => {
            router.reload({ only: ['inbound', 'outbound'], preserveScroll: true });
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Logistics & Transport" />

            <div className="py-12 bg-transparent min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-3 h-10 bg-black border-2 border-green-500"></div>
                        <h2 className="text-5xl font-black uppercase tracking-tighter text-emerald-950 leading-none">
                            Transport Hub
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* INBOUND: Palay Picking */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-2xl font-black uppercase text-green-700">Inbound: Palay Picking</h3>
                                <span className="bg-green-100 text-green-800 text-xs font-black px-2 py-1 border-2 border-black uppercase">Farmer ➔ Miller</span>
                            </div>

                            {inbound.length === 0 ? (
                                <div className="glass-card p-12 text-center flex flex-col items-center justify-center border-dashed border-2 border-emerald-900/10">
                                    <span className="text-4xl mb-4 opacity-50">🌾</span>
                                    <p className="text-emerald-950/40 font-black uppercase tracking-widest text-[10px]">No inbound logistics active.</p>
                                </div>
                            ) : (
                                inbound.map((batch: any) => (
                                    <div key={batch.id} className="glass-card group relative p-8">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-emerald-500/10 transition-all"></div>
                                        
                                        <div className="relative flex justify-between items-start mb-6">
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
                                                    <h4 className="text-2xl font-black uppercase tracking-tighter text-gray-900 leading-none">{batch.rice_variety}</h4>
                                                </div>
                                                <div className="space-y-1 mt-4">
                                                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                                                        <span className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center text-[8px]">🚜</span>
                                                        Farmer: <span className="text-gray-900">{batch.user?.first_name} {batch.user?.last_name}</span>
                                                    </p>
                                                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                                                        <span className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center text-[8px]">📍</span>
                                                        Origin: <span className="text-gray-900">{batch.user?.municipality || 'Unknown'}</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right flex flex-col items-end gap-2">
                                                <span className="bg-orange-600 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em]">Inbound Palay</span>
                                                {batch.scheduled_pickup_date && (
                                                    <span className={`text-[8px] font-black px-2 py-1 border rounded uppercase tracking-wider ${
                                                        batch.schedule_is_read 
                                                        ? 'bg-gray-100 text-gray-500 border-gray-300' 
                                                        : 'bg-rose-100 text-rose-800 border-rose-300 animate-pulse'
                                                    }`}>
                                                        {batch.schedule_is_read ? '✓ Scheduled: ' : '📅 Scheduled: '}
                                                        {new Date(batch.scheduled_pickup_date).toLocaleDateString()}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <DeliveryStatusStepper status={batch.delivery_status || 'Pending'} type="palay" />

                                        {batch.delivery_status === 'Payment Pending' && (
                                            <div className="mt-6 p-4 glass-card !bg-yellow-400/20 border-4 border-black">
                                                <p className="text-xs font-black uppercase mb-3 text-yellow-700 underline decoration-black decoration-4 offset-4">Authorization Required</p>
                                                <div className="flex justify-between items-end mb-6 bg-white/40 backdrop-blur-sm p-4 border-2 border-black">
                                                    <div>
                                                        <p className="text-[10px] font-black uppercase text-gray-500">Driver Logged:</p>
                                                        <p className="text-lg font-black">{batch.actual_weight_kg} kg @ ₱{batch.suggested_price_per_kg}/kg</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-[10px] font-black uppercase text-gray-500">Total to Pay Farmer:</p>
                                                        <p className="text-lg font-black text-green-600">₱{((batch.actual_weight_kg || 0) * (batch.suggested_price_per_kg || 0)).toLocaleString()}</p>
                                                    </div>
                                                </div>
                                                <button 
                                                    onClick={() => router.post(route('miller.palay.authorize', batch.id))}
                                                    className="btn-2026 w-full text-center !py-4"
                                                >
                                                    Authorize Payment & Start Transit
                                                </button>
                                                <p className="mt-4 text-[9px] font-black text-gray-400 uppercase text-center italic">
                                                    * Clicking this sends the "Go Signal" to Driver: {batch.driver?.first_name}
                                                </p>
                                            </div>
                                        )}

                                        {batch.delivery_status === 'Payment Authorized' && (
                                            <div className="mt-6 p-5 glass-card !bg-green-400/20 border-4 border-black border-dashed flex flex-col items-center">
                                                <span className="text-2xl mb-2">💳</span>
                                                <p className="text-[10px] font-black text-green-700 uppercase tracking-widest text-center">
                                                    Payment Authorized! Waiting for Driver to finalize pickup and start transit.
                                                </p>
                                            </div>
                                        )}

                                        {batch.delivery_status === 'Pending' && (
                                            <div className="mt-6 space-y-4">
                                                {/* Inbound Scheduling Picker */}
                                                <div className="p-4 glass-card !bg-emerald-50 border-2 border-black">
                                                    <label className="block text-[10px] font-black uppercase mb-1 text-emerald-900">🗓️ Schedule Inbound Pickup</label>
                                                    <div className="flex gap-2">
                                                        <input 
                                                            type="date" 
                                                            className="flex-1 border-2 border-black p-2 font-black text-xs rounded-lg"
                                                            value={pickupScheduling.scheduled_pickup_date}
                                                            onChange={e => setPickupScheduling('scheduled_pickup_date', e.target.value)}
                                                        />
                                                        <button 
                                                            onClick={() => handleSchedulePickup(batch.id)}
                                                            className="bg-black text-white px-4 py-2 font-black text-[10px] uppercase rounded-lg hover:bg-emerald-600 transition-colors"
                                                        >
                                                            Set
                                                        </button>
                                                    </div>
                                                    {batch.scheduled_pickup_date && (
                                                        <p className="mt-2 text-[10px] font-black text-emerald-600 uppercase">
                                                            Current Schedule: {new Date(batch.scheduled_pickup_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                                        </p>
                                                    )}
                                                </div>

                                                {!batch.driver_id ? (
                                                    <div className="p-4 glass-card !bg-white/30 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                                        <label className="block text-[10px] font-black uppercase mb-1">Assign Truck (My Fleet)</label>
                                                        <div className="flex gap-2">
                                                            <select 
                                                                className="flex-1 border-4 border-black p-2 font-black text-sm"
                                                                onChange={e => setDriverAssignment('driver_id', e.target.value)}
                                                            >
                                                                <option value="">Select Official Driver...</option>
                                                                {myFleet?.map((d: any) => (
                                                                    <option key={d.id} value={d.id}>{d.first_name} {d.last_name} ({d.vehicle_type})</option>
                                                                ))}
                                                                <option value={auth.user.id}>Self (Miller)</option>
                                                            </select>
                                                            <button 
                                                                onClick={() => handleAssignDriver(batch.id, 'palay')}
                                                                className="btn-2026 !px-6 !py-2"
                                                            >
                                                                Assign
                                                            </button>
                                                        </div>
                                                        <p className="mt-2 text-[9px] font-bold text-gray-400 uppercase italic">Only verified drivers appear here.</p>
                                                    </div>
                                                ) : (
                                                    <div className="p-4 glass-card !bg-yellow-400/20 border-4 border-black border-dashed">
                                                        <p className="text-xs font-black uppercase mb-3 text-yellow-700 underline decoration-black decoration-4 offset-4">Phase 2: Driver Verification</p>
                                                        {batch.driver_id === auth.user.id ? (
                                                            <>
                                                                <div className="grid grid-cols-2 gap-4 mb-4">
                                                                    <div>
                                                                        <label className="block text-[10px] font-black uppercase mb-1">Actual Weight (kg)</label>
                                                                        <input 
                                                                            type="number" 
                                                                            className="w-full border-4 border-black p-2 font-black text-sm"
                                                                            value={palayData.actual_weight_kg}
                                                                            onChange={e => setPalayData('actual_weight_kg', e.target.value)}
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <label className="block text-[10px] font-black uppercase mb-1">Suggested Price (₱/kg)</label>
                                                                        <input 
                                                                            type="number" 
                                                                            className="w-full border-4 border-black p-2 font-black text-sm"
                                                                            value={palayData.suggested_price_per_kg}
                                                                            onChange={e => setPalayData('suggested_price_per_kg', e.target.value)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <button 
                                                                    onClick={() => handleConfirmPickup(batch.id)}
                                                                    className="btn-2026 w-full text-center !bg-green-600 hover:!bg-green-700 !py-4"
                                                                >
                                                                    Log Weight & Start Transit
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <div className="flex flex-col items-center py-4">
                                                                <span className="text-3xl animate-bounce mb-2">🚚</span>
                                                                <p className="text-[10px] font-black text-yellow-800 uppercase tracking-widest text-center">
                                                                    Waiting for Assigned Driver to weigh Palay at farm...
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {batch.delivery_status === 'In Transit' && (
                                            <div className="mt-6 p-4 glass-card !bg-blue-400/20 border-4 border-black border-dashed flex flex-col items-center">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="text-2xl animate-pulse">🚚</span>
                                                    <p className="font-black uppercase text-blue-800 tracking-widest text-xs">In Transit to Station</p>
                                                </div>
                                                <p className="text-[9px] font-bold text-blue-400 text-center uppercase">
                                                    Waiting for Driver {batch.driver?.first_name} to confirm arrival at your facility.
                                                </p>
                                            </div>
                                        )}

                                        {(batch.delivery_status === 'Received' && !batch.final_price_per_kg) && (
                                            <div className="mt-6 p-4 glass-card !bg-green-400/20 border-4 border-black border-dashed">
                                                <div className="flex justify-between items-end mb-4">
                                                    <div>
                                                        <p className="text-[10px] font-black uppercase text-gray-500">Driver Logged:</p>
                                                        <p className="text-lg font-black">{batch.actual_weight_kg} kg @ ₱{batch.suggested_price_per_kg}/kg</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-[10px] font-black uppercase text-gray-500">Authorized Total:</p>
                                                        <p className="text-lg font-black text-green-600">₱{((batch.actual_weight_kg || 0) * (batch.suggested_price_per_kg || 0)).toLocaleString()}</p>
                                                    </div>
                                                </div>
                                                <p className="text-xs font-black uppercase mb-3 border-t-2 border-black pt-3">Phase 4: Miller Quality Check & Final Price</p>
                                                <div className="mb-4">
                                                    <label className="block text-[10px] font-black uppercase mb-1">Final Price (₱/kg)</label>
                                                    <input 
                                                        type="number" 
                                                        className="w-full border-4 border-black p-2 font-black text-sm focus:ring-0 focus:border-green-600"
                                                        value={finalizeData.final_price_per_kg}
                                                        onChange={e => setFinalizeData('final_price_per_kg', e.target.value)}
                                                        placeholder="Enter final value after physical inspection..."
                                                    />
                                                </div>
                                                <button 
                                                    onClick={() => handleFinalizeTransaction(batch.id)}
                                                    className="w-full bg-black text-white font-black py-4 uppercase hover:bg-green-600 hover:text-black transition-all border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none translate-y-[-2px]"
                                                >
                                                    Finalize & Store in Inventory
                                                </button>
                                            </div>
                                        )}

                                        {(batch.final_price_per_kg) && (
                                            <div className="mt-4 p-4 glass-card !bg-white/30 border-2 border-black border-dashed flex items-center justify-between">
                                                <div>
                                                    <p className="text-[10px] font-black uppercase text-gray-500">Final Transaction:</p>
                                                    <p className="font-black">₱{((batch.actual_weight_kg || 0) * (batch.final_price_per_kg || 0)).toLocaleString()}</p>
                                                </div>
                                                <span className="text-xs font-black bg-black text-white px-3 py-1 uppercase">Received & Processed</span>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>

                        {/* OUTBOUND: Rice Delivery */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-2xl font-black uppercase text-blue-700">Outbound: Rice Delivery</h3>
                                <span className="bg-blue-100 text-blue-800 text-xs font-black px-2 py-1 border-2 border-black uppercase">Miller ➔ Retailer</span>
                            </div>

                            {outbound.length === 0 ? (
                                <div className="glass-card p-12 text-center flex flex-col items-center justify-center border-dashed border-2 border-emerald-900/10">
                                    <span className="text-4xl mb-4 opacity-50">📦</span>
                                    <p className="text-emerald-950/40 font-black uppercase tracking-widest text-[10px]">No outbound deliveries.</p>
                                </div>
                            ) : (
                                outbound.map((order: any) => (
                                    <div key={order.id} className="glass-card group relative p-8">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-blue-500/10 transition-all"></div>

                                        <div className="relative flex justify-between items-start mb-6">
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                                                    <h4 className="text-2xl font-black uppercase tracking-tighter text-gray-900 leading-none">{order.rice_variety}</h4>
                                                </div>
                                                <div className="space-y-1 mt-4">
                                                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                                                        <span className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center text-[8px]">🏬</span>
                                                        Retailer: <span className="text-gray-900">{order.retailer?.first_name} {order.retailer?.last_name}</span>
                                                    </p>
                                                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                                                        <span className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center text-[8px]">📍</span>
                                                        To: <span className="text-gray-900">{order.retailer?.municipality || 'Unknown'}</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right flex flex-col items-end gap-2">
                                                <span className="bg-blue-600 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-[0.2em]">Outbound Rice</span>
                                                {order.scheduled_delivery_date && (
                                                    <span className={`text-[8px] font-black px-2 py-1 border rounded uppercase tracking-wider ${
                                                        order.schedule_is_read 
                                                        ? 'bg-gray-100 text-gray-500 border-gray-300' 
                                                        : 'bg-rose-100 text-rose-800 border-rose-300 animate-pulse'
                                                    }`}>
                                                        {order.schedule_is_read ? '✓ Scheduled: ' : '📅 Scheduled: '}
                                                        {new Date(order.scheduled_delivery_date).toLocaleDateString()}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <DeliveryStatusStepper status={order.delivery_status || 'Pending'} type="rice" />

                                        {order.delivery_status === 'Pending' && (
                                            <div className="mt-6 space-y-4">
                                                {/* Outbound Scheduling Picker */}
                                                <div className="p-4 glass-card !bg-blue-50 border-2 border-black">
                                                    <label className="block text-[10px] font-black uppercase mb-1 text-blue-900">🗓️ Schedule Outbound Delivery</label>
                                                    <div className="flex gap-2">
                                                        <input 
                                                            type="date" 
                                                            className="flex-1 border-2 border-black p-2 font-black text-xs rounded-lg"
                                                            value={deliveryScheduling.scheduled_delivery_date}
                                                            onChange={e => setDeliveryScheduling('scheduled_delivery_date', e.target.value)}
                                                        />
                                                        <button 
                                                            onClick={() => handleScheduleDelivery(order.id)}
                                                            className="bg-black text-white px-4 py-2 font-black text-[10px] uppercase rounded-lg hover:bg-blue-600 transition-colors"
                                                        >
                                                            Set
                                                        </button>
                                                    </div>
                                                    {order.scheduled_delivery_date && (
                                                        <p className="mt-2 text-[10px] font-black text-blue-600 uppercase">
                                                            Current Schedule: {new Date(order.scheduled_delivery_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                                        </p>
                                                    )}
                                                </div>

                                                {!order.driver_id ? (
                                                    <div className="p-4 glass-card !bg-white/30 border-4 border-black">
                                                        <label className="block text-[10px] font-black uppercase mb-1">Assign Truck (My Fleet)</label>
                                                        <div className="flex gap-2">
                                                            <select 
                                                                className="flex-1 border-4 border-black p-2 font-black text-sm"
                                                                onChange={e => setDriverAssignment('driver_id', e.target.value)}
                                                            >
                                                                <option value="">Select Official Driver...</option>
                                                                {myFleet?.map((d: any) => (
                                                                    <option key={d.id} value={d.id}>{d.first_name} {d.last_name} ({d.vehicle_type})</option>
                                                                ))}
                                                                <option value={auth.user.id}>Self (Miller)</option>
                                                            </select>
                                                            <button 
                                                                onClick={() => handleAssignDriver(order.id, 'rice')}
                                                                className="btn-2026 !px-6 !py-2"
                                                            >
                                                                Assign
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                     <div className="space-y-4">
                                                         {order.delivery_status === 'Pending' && (
                                                             <div className="glass-card !bg-yellow-400/20 border-4 border-black p-3 animate-pulse flex items-center justify-center gap-2">
                                                                 <span className="text-lg">⏳</span>
                                                                 <p className="text-xs font-black uppercase text-yellow-800">Waiting for Driver to start trip...</p>
                                                             </div>
                                                         )}
                                                         <button 
                                                             onClick={() => handleDispatch(order.id)}
                                                             disabled={order.delivery_status !== 'In Transit' || order.status === 'dispatched'}
                                                             className={`btn-2026 w-full text-center !py-4 ${
                                                                 (order.delivery_status === 'In Transit' && order.status !== 'dispatched')
                                                                 ? '!bg-blue-600 hover:!bg-blue-700'
                                                                 : '!bg-gray-400 !text-gray-200 cursor-not-allowed shadow-none'
                                                             }`}
                                                         >
                                                             🚚 {order.status === 'dispatched' ? 'Already Dispatched' : (order.delivery_status === 'In Transit' ? 'Dispatch for Delivery' : 'Locked: Driver Must Start')}
                                                         </button>
                                                     </div>
                                                 )}
                                            </div>
                                        )}

                                        {order.delivery_status === 'In Transit' && (
                                            <div className="mt-6 p-4 glass-card !bg-blue-400/20 border-4 border-black border-dashed flex items-center justify-center animate-pulse">
                                                <p className="font-black uppercase text-blue-800 tracking-widest text-sm">🚚 In Transit to Retailer</p>
                                            </div>
                                        )}

                                        {order.delivery_status === 'Received' && (
                                            <div className="mt-6 p-4 glass-card !bg-green-400/20 border-4 border-black border-dashed flex items-center justify-between">
                                                <p className="font-black uppercase text-sm">Waiting for Retailer Signature</p>
                                            </div>
                                        )}
                                        
                                        {order.delivery_status === 'Completed' && (
                                            <div className="mt-6 p-4 bg-green-600 text-white font-black uppercase text-center border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                                ✅ Delivery Successful
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* FLEET MANAGEMENT SECTION */}
                    <FleetManagement allDrivers={allDrivers} myFleet={myFleet} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
