import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function CreateHarvest({ auth }: any) {
    // 1. Added price_per_kg and condition to the form state
    const { data, setData, post, processing, errors, reset } = useForm({
        rice_variety: '',
        harvest_date: '',
        condition: 'fresh', // Default to Fresh/Wet
        location: '', // Manual input
        total_sacks: '', // Estimated count
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
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-3 h-10 bg-green-600 border-2 border-black"></div>
                        <h2 className="text-4xl font-black uppercase tracking-tighter text-gray-900">
                            Post Harvest
                        </h2>
                    </div>

                    <div className="bg-white border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-10">
                        <form onSubmit={submit} className="space-y-8">
                            
                            {/* Rice Variety */}
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">Rice Variety (e.g. RC218, Dinorado)</label>
                                <input 
                                    type="text" 
                                    className="w-full border-4 border-black p-4 font-black text-xl focus:ring-0 focus:border-green-600 placeholder-gray-200"
                                    value={data.rice_variety}
                                    onChange={e => setData('rice_variety', e.target.value)}
                                    placeholder="Enter variety..."
                                    required
                                />
                                {errors.rice_variety && <div className="text-red-600 text-[10px] font-black italic uppercase tracking-widest">{errors.rice_variety}</div>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Harvest Date */}
                                <div className="space-y-2">
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">Harvest Date</label>
                                    <div className="relative">
                                        <input 
                                            type="date" 
                                            className="w-full border-4 border-black p-4 font-black text-xl focus:ring-0 focus:border-green-600"
                                            value={data.harvest_date}
                                            onChange={e => setData('harvest_date', e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Manual Pickup Location */}
                                <div className="space-y-2">
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">Pickup Location / Landmark</label>
                                    <input 
                                        type="text" 
                                        className="w-full border-4 border-black p-4 font-black text-xl focus:ring-0 focus:border-green-600 placeholder-gray-200"
                                        value={data.location}
                                        onChange={e => setData('location', e.target.value)}
                                        placeholder="e.g. Purok 3, Near Chapel..."
                                        required
                                    />
                                    {errors.location && <div className="text-red-600 text-[10px] font-black italic uppercase tracking-widest">{errors.location}</div>}
                                </div>
                            </div>

                            {/* Estimated Sacks */}
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">Estimated Total Sacks</label>
                                <div className="flex items-center gap-4">
                                    <input 
                                        type="number" 
                                        min="1"
                                        className="w-full md:w-1/3 border-4 border-black p-4 font-black text-2xl focus:ring-0 focus:border-green-600 placeholder-gray-200"
                                        value={data.total_sacks}
                                        onChange={e => setData('total_sacks', e.target.value)}
                                        placeholder="0"
                                        required
                                    />
                                    <div className="bg-black text-white px-6 py-4 font-black uppercase tracking-widest text-sm border-2 border-black">
                                        Sacks
                                    </div>
                                </div>
                                <p className="text-[10px] text-gray-400 font-bold italic tracking-wider">* This helps the Miller/Driver plan for the right truck size.</p>
                                {errors.total_sacks && <div className="text-red-600 text-[10px] font-black italic uppercase tracking-widest">{errors.total_sacks}</div>}
                            </div>

                            {/* --- PALAY CONDITION SELECTION --- */}
                            <div className="space-y-3 pt-6 border-t-2 border-gray-100">
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">Palay Condition (Important for Miller)</label>
                                <div className="grid grid-cols-2 gap-6">
                                    <button 
                                        type="button"
                                        onClick={() => setData('condition', 'fresh')}
                                        className={`py-5 border-4 border-black font-black uppercase transition-all flex items-center justify-center gap-2 ${
                                            data.condition === 'fresh' 
                                            ? 'bg-yellow-400 text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]' 
                                            : 'bg-white text-gray-300 border-gray-100 shadow-none'
                                        }`}
                                    >
                                        <span className={data.condition === 'fresh' ? 'opacity-100' : 'opacity-30'}>🌾</span> Fresh / Wet
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => setData('condition', 'ready')}
                                        className={`py-5 border-4 border-black font-black uppercase transition-all flex items-center justify-center gap-2 ${
                                            data.condition === 'ready' 
                                            ? 'bg-green-500 text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]' 
                                            : 'bg-white text-gray-300 border-gray-100 shadow-none'
                                        }`}
                                    >
                                        <span className={data.condition === 'ready' ? 'opacity-100' : 'opacity-30'}>☀️</span> Ready to Mill
                                    </button>
                                </div>
                                <p className="text-[10px] font-black uppercase text-gray-400 italic tracking-widest mt-2">
                                    {data.condition === 'fresh' 
                                        ? "* Notified as freshly harvested. Requires drying." 
                                        : "* Notified as dried and ready for immediate milling."}
                                </p>
                            </div>

                            <div className="pt-10">
                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="w-full bg-black text-white font-black py-6 px-10 border-b-[8px] border-green-500 hover:bg-gray-900 transition-all uppercase tracking-[0.3em] text-xl active:border-b-0 active:translate-y-2"
                                >
                                    {processing ? 'PROCESSING...' : 'POST HARVEST'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}