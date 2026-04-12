import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';

interface BatchDetail {
    id: number;
    status: string;
    total_weight: number;
    unpacked_weight_kg: number | null;
    total_sacks: number;
    drying_status: string | null;
    condition: string;
    farmer_name: string;
}

interface VarietyGroup {
    rice_variety: string;
    total_unpacked_weight_kg: number;
    total_sacks: number;
    total_weight: number;
    batch_count: number;
    batches: BatchDetail[];
}

export default function Inventory({ auth, inventory }: { auth: any; inventory: VarietyGroup[] }) {

    const handleMillRice = (batchId: number) => {
        const sacks = window.prompt("Enter total 50kg Sacks Produced:");
        if (sacks === null) return;
        const leftover = window.prompt("Enter total Leftover KG (Loose Rice):", "0");
        if (leftover === null) return;

        const sackCount = parseInt(sacks);
        const leftoverCount = parseFloat(leftover);

        if (!isNaN(sackCount) && !isNaN(leftoverCount)) {
            router.patch(route('miller.mill_to_rice', batchId), { sacks: sackCount, leftover_kg: leftoverCount }, {
                onSuccess: () => alert("Palay milled efficiently! Check Finished Rice stock."),
            });
        } else {
            alert("Please enter valid numbers.");
        }
    };
    // Queue actions
    const handleAction = (routeName: string, batchId: number) => {
        router.patch(route(routeName, batchId), {}, { preserveScroll: true });
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Miller Inventory" />
            <div className="p-6 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-2 h-8 bg-blue-600 border border-black"></div>
                        <h2 className="text-3xl font-black uppercase tracking-tighter text-gray-900">
                            📦 My Inventory
                        </h2>
                    </div>

                    {inventory.length > 0 ? (
                        <div className="space-y-8">
                            {inventory.map((group: VarietyGroup) => (
                                <div key={group.rice_variety} className="bg-white border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                                    {/* Variety Header */}
                                    <div className="p-6 border-b-4 border-black bg-gray-50">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-2xl font-black uppercase text-gray-900">{group.rice_variety}</h3>
                                                <p className="text-xs font-bold text-gray-400 uppercase mt-1">
                                                    {group.batch_count} batch{group.batch_count > 1 ? 'es' : ''}
                                                </p>
                                            </div>
                                            <div className="flex gap-6 text-center">
                                                <div className="bg-white border-2 border-black p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                                    <p className="text-[10px] font-black uppercase text-gray-400">Total Weight</p>
                                                    <p className="text-2xl font-black text-blue-600">{group.total_weight}<span className="text-xs text-gray-400 ml-1">kg</span></p>
                                                </div>
                                                <div className="bg-white border-2 border-black p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                                    <p className="text-[10px] font-black uppercase text-gray-400">Unpacked</p>
                                                    <p className="text-2xl font-black text-orange-500">{group.total_unpacked_weight_kg || 0}<span className="text-xs text-gray-400 ml-1">kg</span></p>
                                                </div>
                                                <div className="bg-white border-2 border-black p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                                    <p className="text-[10px] font-black uppercase text-gray-400">Sacks</p>
                                                    <p className="text-2xl font-black text-green-600">{group.total_sacks}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Individual Batches */}
                                    <div className="divide-y-2 divide-gray-100">
                                        {group.batches.map((batch: BatchDetail) => (
                                            <div key={batch.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                                <div className="flex items-center gap-4">
                                                    <span className="text-xs font-black text-gray-300">#{batch.id}</span>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-700">{batch.farmer_name}</p>
                                                        <p className="text-xs text-gray-400">
                                                            {batch.total_weight}kg raw
                                                            {batch.unpacked_weight_kg != null && ` • ${batch.unpacked_weight_kg}kg unpacked`}
                                                            {batch.total_sacks > 0 && ` • ${batch.total_sacks} sacks`}
                                                        </p>
                                                    </div>
                                                    <span className={`px-2 py-0.5 border border-black text-[10px] font-black uppercase ${
                                                        batch.status === 'sold' ? 'bg-blue-200' :
                                                        batch.status === 'processing' ? 'bg-yellow-200' :
                                                        batch.status === 'processed' ? 'bg-green-200' :
                                                        batch.status === 'for_sale' ? 'bg-emerald-300' :
                                                        'bg-gray-200'
                                                    }`}>
                                                        {batch.status.replace(/_/g, ' ')}
                                                    </span>
                                                    {batch.drying_status && (
                                                        <span className="px-2 py-0.5 bg-orange-100 border border-orange-300 text-[10px] font-bold uppercase text-orange-700">
                                                            {batch.drying_status.replace(/_/g, ' ')}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex gap-2">
                                                    {/* Queue actions based on status */}
                                                    {batch.status === 'received' && batch.condition === 'fresh' && batch.drying_status !== 'drying' && batch.drying_status !== 'ready_to_process' && (
                                                        <button onClick={() => handleAction('miller.start_drying', batch.id)}
                                                            className="px-3 py-1 bg-yellow-400 text-black text-[10px] font-black uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                            Start Drying
                                                        </button>
                                                    )}
                                                    {batch.drying_status === 'drying' && (
                                                        <button onClick={() => handleAction('miller.ready_to_process', batch.id)}
                                                            className="px-3 py-1 bg-orange-400 text-black text-[10px] font-black uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                            Mark Dry
                                                        </button>
                                                    )}
                                                    {batch.status === 'received' && (batch.condition === 'ready' || batch.drying_status === 'ready_to_process') && (
                                                        <button onClick={() => handleAction('miller.start_processing', batch.id)}
                                                            className="px-3 py-1 bg-green-500 text-white text-[10px] font-black uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                            Start Processing
                                                        </button>
                                                    )}
                                                    {batch.status === 'processing' && (
                                                        <button onClick={() => handleMillRice(batch.id)}
                                                            className="px-3 py-1 bg-green-500 text-black text-[10px] font-black uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                                            ⚙️ Mill to Rice
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 bg-white border-4 border-dashed border-gray-300 text-center">
                            <p className="text-gray-300 text-6xl mb-4">🚜</p>
                            <p className="text-gray-400 font-black uppercase tracking-widest text-xl">Warehouse Empty</p>
                            <p className="text-gray-300 font-bold">Buy palay from farmers to begin milling.</p>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}