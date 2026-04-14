import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

interface FinishedRiceStock {
    id: number;
    rice_variety: string;
    total_weight: number;
    total_sacks: number;
    unpacked_weight_kg: number;
    price_per_sack: number | null;
    low_stock_threshold: number;
}

export default function ProcessedInventory({ auth, inventory }: { auth: any; inventory: FinishedRiceStock[] }) {
    
    const handleListForSale = (id: number) => {
        const price = window.prompt("Enter Selling Price per SACK (₱):");
        if (price === null) return;
        
        const priceVal = parseFloat(price);
        
        if (!isNaN(priceVal) && priceVal > 0) {
            router.post(route('miller.list_for_sale', id), {
                price_per_sack: priceVal,
            });
        } else {
            alert("Please enter a valid numeric amount.");
        }
    };

    const handleUpdateThreshold = (id: number, current: number) => {
        const threshold = window.prompt("Enter new Low Stock Threshold:", String(current));
        
        if (threshold !== null) {
            const thresholdVal = parseInt(threshold);
            if (!isNaN(thresholdVal) && thresholdVal >= 0) {
                router.patch(route('miller.update_threshold', id), {
                    low_stock_threshold: thresholdVal
                });
            } else {
                alert("Please enter a valid number.");
            }
        }
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Processed Rice" />
            <div className="p-6 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-2 h-8 bg-green-600 border border-black"></div>
                        <h2 className="text-3xl font-black uppercase tracking-tighter text-green-700">
                            Finished Rice Stock
                        </h2>
                    </div>
                
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {inventory.length > 0 ? (
                            inventory.map((item: any) => (
                                <div key={item.id} className="border-4 border-black p-6 bg-white shadow-[8px_8px_0px_0px_rgba(0,128,0,1)] transition-all hover:translate-x-[-2px] hover:translate-y-[-2px]">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="bg-green-600 text-white text-[10px] inline-block px-2 py-1 uppercase font-black border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                            {item.status === 'for_sale' ? 'Listed for Sale' : 'Ready to List'}
                                        </div>
                                        <span className="text-xs font-black text-gray-400">#{item.id}</span>
                                    </div>
                                    <h3 className="text-2xl font-black uppercase mb-2">{item.rice_variety} <span className="text-sm text-gray-400">(Polished)</span></h3>
                                    
                                    <div className="bg-gray-50 border-2 border-black p-3 space-y-2 mb-4">
                                        <div className="flex justify-between">
                                            <span className="text-[10px] font-black uppercase text-gray-400">Net Weight</span>
                                            <span className="font-bold">{item.total_weight} kg</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-[10px] font-black uppercase text-gray-400">Unpacked</span>
                                            <span className="font-bold text-orange-500">{item.unpacked_weight_kg ?? 0} kg</span>
                                        </div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-[10px] font-black uppercase text-gray-400">Sacks</span>
                                            <div className="flex items-center gap-2">
                                                {item.total_sacks <= item.low_stock_threshold ? (
                                                    <span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-black uppercase border border-red-300 animate-pulse">
                                                        ⚠️ LOW STOCK
                                                    </span>
                                                ) : (
                                                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-black uppercase border border-green-300">
                                                        ✅ GOOD
                                                    </span>
                                                )}
                                                <span className="font-bold text-green-600 text-lg">{item.total_sacks}</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center border-t border-gray-200 pt-2">
                                            <span className="text-[10px] font-black uppercase text-gray-400">Alert Threshold</span>
                                            <button 
                                                onClick={() => handleUpdateThreshold(item.id, item.low_stock_threshold)}
                                                className="text-[10px] font-bold text-blue-600 hover:text-blue-800 underline uppercase"
                                            >
                                                Edit: {item.low_stock_threshold}
                                            </button>
                                        </div>
                                        {item.price_per_sack && (
                                            <>
                                                <div className="flex justify-between border-t border-gray-200 pt-2">
                                                    <span className="text-[10px] font-black uppercase text-gray-400">Price/Sack</span>
                                                    <span className="font-black text-green-600">₱{Number(item.price_per_sack).toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-[10px] font-black uppercase text-gray-400">Delivery Fee</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-black text-blue-600">₱{(Number(item.actual_delivery_fee) || 150).toLocaleString()}</span>
                                                        <a 
                                                            href={route('miller.shipping_settings')}
                                                            className="text-[9px] font-bold text-gray-400 hover:text-blue-600 transition-colors uppercase flex items-center gap-1"
                                                        >
                                                            <span>⚙️</span> Edit
                                                        </a>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    <p className="text-xs font-bold text-gray-500 mb-4">
                                        Loose Grains: <strong>{item.unpacked_weight_kg}kg</strong>
                                    </p>
                                    
                                    {!item.price_per_sack ? (
                                        <button 
                                            onClick={() => handleListForSale(item.id)}
                                            className="w-full bg-yellow-400 text-black font-black py-3 border-4 border-black hover:bg-yellow-500 uppercase transition-all active:translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none"
                                        >
                                            💰 Set Price & List for Sale
                                        </button>
                                    ) : (
                                        <div className="flex gap-2">
                                            <div className="w-full bg-green-100 text-green-800 font-black py-3 border-4 border-green-300 uppercase text-center text-[10px]">
                                                ✅ Listed
                                            </div>
                                            <button 
                                                onClick={() => handleListForSale(item.id)}
                                                className="w-full bg-yellow-400 text-black font-black py-3 border-4 border-black hover:bg-yellow-500 uppercase transition-all active:translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none text-[10px]"
                                            >
                                                ✏️ Update Price
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 border-4 border-dashed border-gray-300 text-center text-gray-400 font-bold uppercase bg-white">
                                No finished rice in stock. Go to your inventory to start milling!
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}