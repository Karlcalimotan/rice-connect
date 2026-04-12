import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Marketplace({ auth, available_rice, retailer_municipality_index }: any) {
    const [orderQuantities, setOrderQuantities] = useState<{ [key: string]: number }>({});
    const [shippingMethods, setShippingMethods] = useState<{ [key: string]: string }>({});

    const handleSackChange = (variety: string, value: string) => {
        const qty = parseInt(value);
        setOrderQuantities(prev => ({
            ...prev,
            [variety]: !isNaN(qty) && qty > 0 ? qty : 0
        }));
    };

    const handleShippingChange = (variety: string, method: string) => {
        setShippingMethods(prev => ({ ...prev, [variety]: method }));
    };

    const SACK_WEIGHT = 50; 

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Retailer Marketplace" />
            <div className="p-6 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-2 h-8 bg-blue-600 border border-black"></div>
                        <h2 className="text-3xl font-black uppercase tracking-tighter text-gray-900">
                            Rice Marketplace
                        </h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {available_rice.length > 0 ? (
                            available_rice.map((item: any) => {
                                const variety = item.rice_variety;
                                const selectedSacks = orderQuantities[variety] || 0;
                                const totalWeight = selectedSacks * SACK_WEIGHT;
                                const pricePerSack = Number(item.price_per_sack) || 0;
                                
                                // Specific Municipality Logic
                                const mIndex = item.miller_municipality_index ?? 1;
                                const rIndex = retailer_municipality_index ?? 1;
                                const distanceSteps = Math.abs(mIndex - rIndex);
                                
                                let millerDeliveryCharge = 0;
                                if (distanceSteps === 0) {
                                    millerDeliveryCharge = 0;
                                } else if (distanceSteps === 1) {
                                    millerDeliveryCharge = Number(item.base_delivery_fee) || 150;
                                } else {
                                    millerDeliveryCharge = (Number(item.base_delivery_fee) || 150) + 
                                                         ((distanceSteps - 1) * (Number(item.extra_fee_per_municipality) || 50));
                                }
                                
                                const currentMethod = shippingMethods[variety] || 'pickup';
                                const deliveryFee = currentMethod === 'delivery' ? millerDeliveryCharge : 0;
                                const totalPrice = ((selectedSacks || 0) * (pricePerSack || 0)) + deliveryFee;
                                
                                const maxSacks = Number(item.total_sacks) || 0;

                                return (
                                    <div key={variety} className="group bg-white border-4 border-black shadow-[10px_10px_0px_0px_rgba(29,78,216,1)] flex flex-col transition-all hover:translate-x-[-2px] hover:translate-y-[-2px]">
                                        <div className="p-6 flex-grow">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="bg-blue-700 text-white text-[10px] px-2 py-1 uppercase font-black tracking-widest border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                    Polished Rice
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Supplier</p>
                                                    <p className="text-xs font-bold text-gray-800">{item.miller_first_name} {item.miller_last_name}</p>
                                                    <p className="text-[10px] font-bold text-gray-400">{item.miller_location}</p>
                                                </div>
                                            </div>

                                            <h3 className="text-3xl font-black uppercase text-gray-900 mb-1">{variety}</h3>
                                            <div className="flex items-baseline gap-1 mb-4">
                                                <span className="text-4xl font-black text-green-600">₱{pricePerSack.toLocaleString()}</span>
                                                <span className="text-sm font-bold text-gray-400 uppercase">/ Sack</span>
                                            </div>

                                            <div className="bg-gray-100 border-2 border-black p-3 mb-6">
                                                <div className="flex justify-between text-xs font-black uppercase text-gray-500 mb-1">
                                                    <span>Stock Available</span>
                                                    <span className="text-blue-700">{maxSacks} Sacks</span>
                                                </div>
                                                <div className="w-full bg-gray-300 h-2 border border-black">
                                                    <div className="bg-blue-600 h-full" style={{ width: '100%' }}></div>
                                                </div>
                                            </div>
                                            
                                            <div className="space-y-3">
                                                <label className="block text-xs font-black uppercase tracking-widest text-gray-600">Quantity (Sacks)</label>
                                                <input 
                                                    type="number" 
                                                    min="0"
                                                    max={maxSacks}
                                                    placeholder="0"
                                                    className="w-full border-4 border-black p-3 font-black text-xl focus:ring-0 focus:border-blue-700 placeholder-gray-300"
                                                    onChange={(e) => handleSackChange(variety, e.target.value)}
                                                />
                                                
                                                {/* Shipping Method Selection */}
                                                <div className="mt-4 p-3 border-2 border-black bg-gray-50">
                                                    <p className="text-[10px] font-black uppercase mb-2">Shipping Method</p>
                                                    <div className="flex gap-2">
                                                        <button 
                                                            type="button"
                                                            onClick={() => handleShippingChange(variety, 'pickup')}
                                                            className={`flex-1 py-2 text-[10px] font-black uppercase border-2 border-black transition-all ${
                                                                currentMethod === 'pickup' ? 'bg-black text-white' : 'bg-white text-black'
                                                            }`}
                                                        >
                                                            🏪 Pickup
                                                        </button>
                                                        <button 
                                                            type="button"
                                                            onClick={() => handleShippingChange(variety, 'delivery')}
                                                            className={`flex-1 py-2 text-[10px] font-black uppercase border-2 border-black transition-all ${
                                                                currentMethod === 'delivery' ? 'bg-black text-white' : 'bg-white text-black'
                                                            }`}
                                                        >
                                                            🚚 Delivery (+₱{millerDeliveryCharge})
                                                        </button>
                                                    </div>
                                                </div>

                                                {selectedSacks > 0 && (
                                                    <div className="bg-yellow-100 border-2 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                                        <div className="flex justify-between items-center">
                                                            <span className="text-[10px] font-black uppercase text-yellow-800">Total Price</span>
                                                            <span className="text-xl font-black text-gray-900">₱{totalPrice.toLocaleString()}</span>
                                                        </div>
                                                        <p className="text-[10px] font-bold text-yellow-700 uppercase">
                                                            {totalWeight}kg • {currentMethod === 'delivery' ? `Delivery: ₱${millerDeliveryCharge}` : 'For Pickup'}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="p-6 bg-gray-50 border-t-4 border-black">
                                            <button 
                                                disabled={selectedSacks === 0 || selectedSacks > maxSacks}
                                                className={`w-full font-black py-4 border-4 border-black uppercase transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] flex items-center justify-center gap-2 ${
                                                    selectedSacks > 0 
                                                    ? 'bg-green-500 text-black hover:bg-green-600' 
                                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50'
                                                }`}
                                                onClick={() => {
                                                    router.post(route('retailer.order'), {
                                                        rice_variety: variety,
                                                        sacks: selectedSacks,
                                                        shipping_method: currentMethod,
                                                    }, {
                                                        onSuccess: () => alert('Order Placed!'),
                                                        onError: (errors) => {
                                                            const msg = Object.values(errors).flat().join('\n');
                                                            alert(msg || 'Order failed.');
                                                        },
                                                    });
                                                }}
                                            >
                                                <span>{selectedSacks > 0 ? 'Place Order' : 'Enter Quantity'}</span>
                                                {selectedSacks > 0 && <span className="text-xl">🛒</span>}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="col-span-full py-20 bg-white border-4 border-dashed border-gray-300 text-center">
                                <p className="text-gray-300 text-6xl mb-4">📦</p>
                                <p className="text-gray-400 font-black uppercase tracking-widest text-xl">Marketplace Empty</p>
                                <p className="text-gray-300 font-bold">No rice available. Check back later.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}