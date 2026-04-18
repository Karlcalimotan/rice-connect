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
            <div className="bg-transparent">
                <div className="max-w-7xl mx-auto">
                    {/* Centered Premium Title */}
                    <div className="flex flex-col items-center justify-center mb-20 text-center pt-8">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-1.5 h-8 bg-emerald-600 rounded-full shadow-[0_0_15px_rgba(5,150,105,0.4)]"></span>
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-800/60">Global Supply</p>
                            <span className="w-1.5 h-8 bg-emerald-600 rounded-full shadow-[0_0_15px_rgba(5,150,105,0.4)]"></span>
                        </div>
                        <h2 className="text-6xl md:text-7xl font-black uppercase tracking-tighter text-emerald-950 leading-none">
                            Rice Marketplace
                        </h2>
                        <div className="mt-6 px-6 py-2 bg-white/40 border border-white/60 rounded-full backdrop-blur-xl shadow-sm">
                            <p className="text-emerald-700 font-black uppercase tracking-[0.2em] text-[10px]">Connected to {available_rice.length} Regional Hubs</p>
                        </div>
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
                                <div key={variety} className="glass-card group flex flex-col p-2">
                                    <div className="bg-white/40 rounded-[2.5rem] p-8 flex-grow border border-white/20 transition-all duration-500 group-hover:bg-white/60">
                                            <div className="flex justify-between items-start mb-6">
                                                <div className="bg-emerald-600 text-white text-[10px] px-3 py-1 rounded-full uppercase font-black tracking-widest shadow-lg shadow-emerald-100">
                                                    Polished Rice
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Supplier</p>
                                                    <p className="text-sm font-black text-gray-900">{item.miller_first_name} {item.miller_last_name}</p>
                                                    <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-tighter">{item.miller_location}</p>
                                                </div>
                                            </div>

                                            <h3 className="text-3xl font-black uppercase text-gray-900 mb-1 tracking-tighter">{variety}</h3>
                                            <div className="flex items-baseline gap-1 mb-6">
                                                <span className="text-4xl font-black text-emerald-600 leading-none">₱{pricePerSack.toLocaleString()}</span>
                                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">/ Sack</span>
                                            </div>

                                            <div className="bg-emerald-50/50 rounded-2xl p-4 mb-8 border border-emerald-100/50">
                                                <div className="flex justify-between text-[10px] font-black uppercase text-emerald-800 mb-2 tracking-widest">
                                                    <span>Stock Available</span>
                                                    <span className="text-emerald-600">{maxSacks} Sacks</span>
                                                </div>
                                                <div className="w-full bg-white/50 h-2 rounded-full overflow-hidden">
                                                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '100%' }}></div>
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Order Configuration</label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max={maxSacks}
                                                    placeholder="0"
                                                    className="input-2026 !text-4xl text-center py-8"
                                                    onChange={(e) => handleSackChange(variety, e.target.value)}
                                                />

                                                {/* Shipping Method Selection */}
                                                <div className="mt-4 p-4 rounded-2xl bg-white/40 border border-white/50">
                                                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-3">Shipping Method</p>
                                                    <div className="flex gap-4">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleShippingChange(variety, 'pickup')}
                                                            className={`flex-1 py-4 text-[10px] font-black uppercase rounded-2xl transition-all duration-500 flex items-center justify-center gap-3 ${currentMethod === 'pickup' ? 'bg-emerald-950 text-white shadow-xl' : 'bg-white/50 text-emerald-950 border border-emerald-100 hover:bg-white'
                                                                }`}
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" strokeWidth="2"/><path d="M9 22V12h6v10" strokeWidth="2"/></svg>
                                                            PICKUP
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleShippingChange(variety, 'delivery')}
                                                            className={`flex-1 py-4 text-[10px] font-black uppercase rounded-2xl transition-all duration-500 flex items-center justify-center gap-3 ${currentMethod === 'delivery' ? 'bg-emerald-950 text-white shadow-xl' : 'bg-white/50 text-emerald-950 border border-emerald-100 hover:bg-white'
                                                                }`}
                                                        >
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeWidth="2"/></svg>
                                                            DELIVERY
                                                        </button>
                                                    </div>
                                                </div>

                                                {selectedSacks > 0 && (
                                                    <div className="bg-emerald-600 rounded-2xl p-6 shadow-xl shadow-emerald-200 text-white">
                                                        <div className="flex justify-between items-center mb-1">
                                                            <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Final Quote</span>
                                                            <span className="text-2xl font-black">₱{totalPrice.toLocaleString()}</span>
                                                        </div>
                                                        <p className="text-[10px] font-bold uppercase tracking-tighter opacity-70">
                                                            {totalWeight}kg • {currentMethod === 'delivery' ? `+₱${millerDeliveryCharge} Shipping Fee` : 'Self-Pickup'}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="p-4 pt-0">
                                            <button
                                                disabled={selectedSacks === 0 || selectedSacks > maxSacks}
                                                className={`btn-2026 w-full !rounded-[1.5rem] py-6 flex items-center justify-center gap-3 ${
                                                    selectedSacks === 0 || selectedSacks > maxSacks ? 'opacity-30 grayscale cursor-not-allowed transform-none shadow-none' : ''
                                                }`}
                                                onClick={() => {
                                                    router.post(route('retailer.order'), {
                                                        rice_variety: variety,
                                                        sacks: selectedSacks,
                                                        shipping_method: currentMethod,
                                                    }, {
                                                        onSuccess: () => alert('Order Placed Successfully!'),
                                                        onError: (errors) => alert(Object.values(errors)[0] || 'Order failed.'),
                                                    });
                                                }}
                                            >
                                                <span>{selectedSacks > 0 ? 'Initialize Secure Order' : 'Specify Batch Volume'}</span>
                                                {selectedSacks > 0 && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeWidth="3"/></svg>}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="col-span-full py-32 glass-card flex flex-col items-center justify-center text-center">
                                <p className="text-emerald-950/10 font-black uppercase tracking-[1em] text-sm mb-8">GLOBAL HUB EMPTY</p>
                                <p className="text-emerald-950/40 font-black uppercase tracking-[0.4em] text-xl">Operational Latency Active</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}