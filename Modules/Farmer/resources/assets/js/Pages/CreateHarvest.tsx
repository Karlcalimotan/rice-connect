import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function CreateHarvest({ auth }: any) {
    // 1. Added price_per_kg and condition to the form state
    const { data, setData, post, processing, errors, reset } = useForm({
        rice_variety: '',
        number_of_bags: '',
        total_weight: '',
        harvest_date: '',
        price_per_kg: '',
        condition: 'fresh', // Default to Fresh/Wet
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('farmer.harvest.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Post Harvest" />

            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    {/* Header with Neobrutalist style */}
                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-2 h-8 bg-green-600 border border-black"></div>
                        <h2 className="text-3xl font-black uppercase tracking-tighter text-gray-900">
                            Register New Harvest
                        </h2>
                    </div>

                    <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8">
                        <form onSubmit={submit} className="space-y-6">
                            
                            {/* Rice Variety */}
                            <div className="space-y-2">
                                <label className="block text-xs font-black uppercase tracking-widest text-gray-600">Rice Variety (e.g. RC218, Dinorado)</label>
                                <input 
                                    type="text" 
                                    className="w-full border-4 border-black p-3 font-bold focus:ring-0 focus:border-green-600 placeholder-gray-300"
                                    value={data.rice_variety}
                                    onChange={e => setData('rice_variety', e.target.value)}
                                    placeholder="Enter variety..."
                                    required
                                />
                                {errors.rice_variety && <div className="text-red-600 text-xs font-black italic">{errors.rice_variety}</div>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Number of Bags */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-black uppercase tracking-widest text-gray-600">Number of Bags</label>
                                    <input 
                                        type="number" 
                                        className="w-full border-4 border-black p-3 font-bold focus:ring-0 focus:border-green-600"
                                        value={data.number_of_bags}
                                        onChange={e => setData('number_of_bags', e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Total Weight */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-black uppercase tracking-widest text-gray-600">Total Weight (kg)</label>
                                    <input 
                                        type="number" 
                                        step="0.01"
                                        className="w-full border-4 border-black p-3 font-bold focus:ring-0 focus:border-green-600"
                                        value={data.total_weight}
                                        onChange={e => setData('total_weight', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Price Per KG */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-black uppercase tracking-widest text-gray-600">Asking Price Per KG (₱)</label>
                                    <input 
                                        type="number" 
                                        className="w-full border-4 border-black p-3 font-bold focus:ring-0 focus:border-green-600"
                                        value={data.price_per_kg}
                                        onChange={e => setData('price_per_kg', e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Harvest Date */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-black uppercase tracking-widest text-gray-600">Harvest Date</label>
                                    <input 
                                        type="date" 
                                        className="w-full border-4 border-black p-3 font-bold focus:ring-0 focus:border-green-600"
                                        value={data.harvest_date}
                                        onChange={e => setData('harvest_date', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* --- NEW: PALAY CONDITION SELECTION --- */}
                            <div className="space-y-3 pt-4 border-t-2 border-gray-100">
                                <label className="block text-xs font-black uppercase tracking-widest text-gray-600">Palay Condition (Important for Miller)</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button 
                                        type="button"
                                        onClick={() => setData('condition', 'fresh')}
                                        className={`py-4 border-4 border-black font-black uppercase transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] ${
                                            data.condition === 'fresh' ? 'bg-yellow-400 text-black' : 'bg-white text-gray-400 border-gray-200 shadow-none'
                                        }`}
                                    >
                                        🌾 Fresh / Wet
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => setData('condition', 'ready')}
                                        className={`py-4 border-4 border-black font-black uppercase transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] ${
                                            data.condition === 'ready' ? 'bg-green-500 text-black' : 'bg-white text-gray-400 border-gray-200 shadow-none'
                                        }`}
                                    >
                                        ☀️ Ready to Mill
                                    </button>
                                </div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase italic">
                                    {data.condition === 'fresh' 
                                        ? "* Notified as freshly harvested. Requires drying." 
                                        : "* Notified as dried and ready for immediate milling."}
                                </p>
                            </div>

                            <div className="flex items-center justify-end mt-8 pt-6">
                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="w-full bg-black hover:bg-green-600 text-white hover:text-black font-black py-5 px-10 border-4 border-black shadow-[8px_8px_0px_0px_rgba(34,197,94,1)] transition-all active:shadow-none active:translate-x-[4px] active:translate-y-[4px] uppercase tracking-widest"
                                >
                                    {processing ? 'PROCESSING...' : 'PUBLISH HARVEST BATCH'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}