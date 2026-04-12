import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

const iloiloNeighbors: { [key: string]: string[] } = {
    "Passi City": ["San Enrique", "Dueñas", "Dumarao", "Calinog", "Mina", "Bingawan"],
    "San Enrique": ["Passi City", "Dueñas", "Banate", "Barotac Nuevo"],
    "Dueñas": ["Passi City", "San Enrique", "Dingle", "Pototan"],
    "Calinog": ["Passi City", "Bingawan", "Lambunao"],
    "Bingawan": ["Calinog", "Passi City"],
    "Lambunao": ["Calinog", "Janiuay", "Badiangan", "Maasin"],
    "Badiangan": ["Lambunao", "Janiuay", "Mina", "Pototan"],
    "Janiuay": ["Lambunao", "Badiangan", "Maasin", "Mina"],
    "Maasin": ["Janiuay", "Lambunao", "Alimodian", "Cabatuan"],
    "Pototan": ["Dueñas", "Dingle", "Barotac Nuevo", "Mina", "Badiangan", "New Lucena", "Zarraga"],
    "Dingle": ["Dueñas", "Pototan", "Barotac Nuevo", "Anilao"],
    "Mina": ["Pototan", "Badiangan", "Janiuay", "Cabatuan"],
    "Cabatuan": ["Mina", "Maasin", "Janiuay", "New Lucena", "Santa Barbara", "Alimodian"],
    "New Lucena": ["Cabatuan", "Pototan", "Santa Barbara", "Zarraga"],
    "Santa Barbara": ["Cabatuan", "New Lucena", "Pavia", "Zarraga", "San Miguel", "Alimodian"],
    "Zarraga": ["New Lucena", "Pototan", "Santa Barbara", "Leganes", "Dumangas", "Barotac Nuevo"],
    "Pavia": ["Santa Barbara", "San Miguel", "Iloilo City", "Leganes"],
    "Leganes": ["Pavia", "Iloilo City", "Zarraga", "Dumangas"],
    "Iloilo City": ["Pavia", "Leganes", "Oton", "San Miguel"],
    "Oton": ["Iloilo City", "San Miguel", "Tigbauan"],
    "San Miguel": ["Oton", "Iloilo City", "Pavia", "Santa Barbara", "Alimodian", "Leon"],
    "Alimodian": ["San Miguel", "Santa Barbara", "Cabatuan", "Maasin", "Leon"],
    "Leon": ["San Miguel", "Alimodian", "Tigbauan", "Tubungan"],
    "Tigbauan": ["Oton", "Leon", "Guimbal", "Tubungan"],
    "Guimbal": ["Tigbauan", "Tubungan", "Igbaras", "Miagao"],
    "Tubungan": ["Leon", "Tigbauan", "Guimbal", "Igbaras"],
    "Igbaras": ["Guimbal", "Tubungan", "Miagao"],
    "Miagao": ["Guimbal", "Igbaras", "San Joaquin"],
    "San Joaquin": ["Miagao"],
    "Dumangas": ["Zarraga", "Leganes", "Barotac Nuevo"],
    "Barotac Nuevo": ["Zarraga", "Pototan", "Dingle", "Anilao", "Banate", "Dumangas", "San Enrique"],
    "Anilao": ["Barotac Nuevo", "Dingle", "Banate"],
    "Banate": ["Anilao", "Barotac Nuevo", "San Enrique", "Barotac Viejo"],
    "Barotac Viejo": ["Banate", "San Rafael", "Ajuy"],
    "San Rafael": ["Barotac Viejo", "Lemery"],
    "Ajuy": ["Barotac Viejo", "Lemery", "Sara", "Concepcion"],
    "Sara": ["Ajuy", "Lemery", "San Dionisio", "Concepcion"],
    "Lemery": ["Sara", "Ajuy", "San Rafael"],
    "Concepcion": ["Ajuy", "Sara"],
    "San Dionisio": ["Sara", "Batad"],
    "Batad": ["San Dionisio", "Balasan", "Estancia"],
    "Balasan": ["Batad", "Estancia", "Carles"],
    "Estancia": ["Batad", "Balasan", "Carles"],
    "Carles": ["Balasan", "Estancia"]
};

// NORMALIZATION HELPER TO MATCH NAMES FLEXIBLY
function normalizeMuni(name: any): string {
    const s = (name || "").toString().toLowerCase()
        .replace(" city", "")
        .replace(" municipality", "")
        .trim();
    
    // Find matching key in neighbors
    return Object.keys(iloiloNeighbors).find(key => {
        const k = key.toLowerCase()
            .replace(" city", "")
            .replace(" municipality", "")
            .trim();
        return k === s;
    }) || s;
}

// BFS BFS SHORT-PATH DISTANCE CALCULATOR
function calculateDistance(startMuni: any, endMuni: any): number {
    const start = normalizeMuni(startMuni);
    const end = normalizeMuni(endMuni);

    // 1. Safety Guard: If either is null/empty, or missing from graph, return default jump
    if (!start || !end || !iloiloNeighbors[start] || !iloiloNeighbors[end]) {
        return 1; // Default to 1 jump to result in ₱150 base fee
    }

    // 2. Same location check
    if (start === end) return 0;

    let queue: [string, number][] = [[start, 0]];
    let visited = new Set([start]);

    while (queue.length > 0) {
        let node = queue.shift();
        if (!node) break;
        let [current, dist] = node;
        
        if (current === end) return dist;

        // Safety: ensure current exists in graph
        if (!iloiloNeighbors[current]) continue;

        const neighbors = iloiloNeighbors[current] || [];
        for (let neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push([neighbor, dist + 1]);
            }
        }
    }

    return 1; // Fallback if no path found
}

export default function Marketplace({ auth, available_rice, retailer_municipality }: any) {
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
            <div className="bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    {/* Centered Premium Title */}
                    <div className="flex flex-col items-center justify-center mb-12 text-center pt-4">
                        <div className="w-20 h-2 bg-blue-600 border-2 border-black mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"></div>
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-gray-900 drop-shadow-[4px_4px_0px_rgba(29,78,216,0.1)]">
                            Rice Marketplace
                        </h2>
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-2">Connect with local millers</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {available_rice.length > 0 ? (
                            available_rice.map((item: any) => {
                                const variety = item.rice_variety;
                                const selectedSacks = orderQuantities[variety] || 0;
                                const totalWeight = selectedSacks * SACK_WEIGHT;
                                const pricePerSack = Number(item.price_per_sack) || 0;

                                // NEW DYNAMIC DISTANCE LOGIC (BFS)
                                const millerMuni = item.miller_location || "Iloilo City";
                                const retailerMuni = retailer_municipality || "Iloilo City";

                                const jumps = calculateDistance(millerMuni, retailerMuni);

                                let millerDeliveryCharge = 0;
                                if (jumps === 0) {
                                    millerDeliveryCharge = 0;
                                } else {
                                    const base = Number(item.base_delivery_fee) || 150;
                                    const extra = Number(item.extra_fee_per_municipality) || 50;
                                    // Step-Based: Increases at 2, 4, 6 jumps
                                    millerDeliveryCharge = base + Math.floor(jumps / 2) * extra;
                                }

                                const currentMethod = shippingMethods[variety] || 'pickup';
                                // FINAL FAIL-SAFE: Force numeric 0 if math fails
                                const deliveryFee = Number(currentMethod === 'delivery' ? millerDeliveryCharge : 0) || 0;
                                const totalPrice = (((selectedSacks || 0) * (pricePerSack || 0)) + deliveryFee) || 0;

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
                                                            className={`flex-1 py-2 text-[10px] font-black uppercase border-2 border-black transition-all ${currentMethod === 'pickup' ? 'bg-black text-white' : 'bg-white text-black'
                                                                }`}
                                                        >
                                                            🏪 Pickup
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleShippingChange(variety, 'delivery')}
                                                            className={`flex-1 py-2 text-[10px] font-black uppercase border-2 border-black transition-all ${currentMethod === 'delivery' ? 'bg-black text-white' : 'bg-white text-black'
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
                                                            {totalWeight}kg • {currentMethod === 'delivery' ? `Delivery: ₱${millerDeliveryCharge} (${jumps} jumps from ${millerMuni} to ${retailerMuni})` : 'For Pickup'}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="p-6 bg-gray-50 border-t-4 border-black">
                                            <button
                                                disabled={selectedSacks === 0 || selectedSacks > maxSacks}
                                                className={`w-full font-black py-4 border-4 border-black uppercase transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] flex items-center justify-center gap-2 ${selectedSacks > 0
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