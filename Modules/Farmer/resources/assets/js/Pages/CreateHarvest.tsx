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

            <div className="py-12 bg-transparent min-h-screen">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    {/* Header with 2026 style */}
                    <div className="glass-header">
                        <div className="glass-header-icon"></div>
                        <h2 className="text-5xl font-black uppercase tracking-tighter text-emerald-950 leading-none">
                            Post Harvest
                        </h2>
                    </div>

                    <div className="glass-card p-12 relative overflow-hidden">
                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>

                        <form onSubmit={submit} className="relative space-y-12">
                            {/* Rice Variety */}
                            <div className="space-y-4">
                                <label className="label-2026">Scientific Variety & Type</label>
                                <input 
                                    type="text" 
                                    className="input-2026 !text-2xl"
                                    value={data.rice_variety}
                                    onChange={e => setData('rice_variety', e.target.value)}
                                    placeholder="e.g. Premium Dinorado"
                                    required
                                />
                                {errors.rice_variety && <div className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-2 ml-4">{errors.rice_variety}</div>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {/* Harvest Date */}
                                <div className="space-y-4">
                                    <label className="label-2026">Extraction Date</label>
                                    <input 
                                        type="date" 
                                        className="input-2026"
                                        value={data.harvest_date}
                                        onChange={e => setData('harvest_date', e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Manual Pickup Location */}
                                <div className="space-y-4">
                                    <label className="label-2026">Logistics Point</label>
                                    <input 
                                        type="text" 
                                        className="input-2026"
                                        value={data.location}
                                        onChange={e => setData('location', e.target.value)}
                                        placeholder="Purok / Landmark"
                                        required
                                    />
                                    {errors.location && <div className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-2 ml-4">{errors.location}</div>}
                                </div>
                            </div>

                            {/* Estimated Sacks */}
                            <div className="space-y-6">
                                <label className="label-2026">Yield Volume Authorization</label>
                                <div className="flex items-center gap-6">
                                    <div className="flex-1">
                                        <input 
                                            type="number" 
                                            min="1"
                                            className="input-2026 text-center !text-3xl py-8"
                                            value={data.total_sacks}
                                            onChange={e => setData('total_sacks', e.target.value)}
                                            placeholder="00"
                                            required
                                        />
                                    </div>
                                    <div className="bg-emerald-950 text-white px-10 py-8 font-black uppercase tracking-[0.3em] text-[11px] rounded-[2rem] shadow-xl">
                                        Unit: Sacks
                                    </div>
                                </div>
                                <p className="text-[10px] text-emerald-950/40 font-black uppercase italic tracking-widest ml-4">
                                    * Protocol: Volume determines logistical dispatch size.
                                </p>
                                {errors.total_sacks && <div className="text-rose-500 text-[10px] font-black uppercase tracking-widest mt-2 ml-4">{errors.total_sacks}</div>}
                            </div>

                            {/* --- PALAY CONDITION SELECTION --- */}
                            <div className="space-y-6 pt-10 border-t border-emerald-950/5">
                                <label className="label-2026">Atmospheric Condition</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <button 
                                        type="button"
                                        onClick={() => setData('condition', 'fresh')}
                                        className={`group relative py-8 rounded-[2rem] font-black uppercase transition-all duration-500 flex items-center justify-center gap-4 overflow-hidden ${
                                            data.condition === 'fresh' 
                                            ? 'bg-amber-100 text-amber-900 border border-amber-200 shadow-xl scale-[1.02]' 
                                            : 'bg-white/40 text-emerald-950/20 border border-white/60 hover:bg-white/60 shadow-none'
                                        }`}
                                    >
                                        <div className={`w-2 h-2 rounded-full absolute top-4 right-4 ${data.condition === 'fresh' ? 'bg-amber-500 animate-pulse' : 'bg-transparent'}`}></div>
                                        <span className={`text-xl ${data.condition === 'fresh' ? 'opacity-100' : 'opacity-20'}`}>
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.364 17.636l-.707.707M6.364 6.364l.707.707m11.314 11.314l.707.707" strokeWidth="2.5"/></svg>
                                        </span> 
                                        FRESH / WET PALAY
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => setData('condition', 'ready')}
                                        className={`group relative py-8 rounded-[2rem] font-black uppercase transition-all duration-500 flex items-center justify-center gap-4 overflow-hidden ${
                                            data.condition === 'ready' 
                                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-200 shadow-xl scale-[1.02]' 
                                            : 'bg-white/40 text-emerald-950/20 border border-white/60 hover:bg-white/60 shadow-none'
                                        }`}
                                    >
                                        <div className={`w-2 h-2 rounded-full absolute top-4 right-4 ${data.condition === 'ready' ? 'bg-emerald-500 animate-pulse' : 'bg-transparent'}`}></div>
                                        <span className={`text-xl ${data.condition === 'ready' ? 'opacity-100' : 'opacity-20'}`}>
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeWidth="2.5"/></svg>
                                        </span> 
                                        READY TO MILL
                                    </button>
                                </div>
                                <p className="text-[10px] font-black uppercase text-emerald-900/40 italic tracking-widest mt-4 ml-4">
                                    {data.condition === 'fresh' 
                                        ? "SIGNAL: Requires high-temperature solar processing." 
                                        : "SIGNAL: Qualified for immediate industrial milling."}
                                </p>
                            </div>

                            <div className="pt-12">
                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="btn-2026 w-full !text-lg py-8 shadow-[0_25px_60px_-15px_rgba(6,78,59,0.4)]"
                                >
                                    {processing ? 'EXECUTING...' : 'ENVELOPE DISPATCH: POST HARVEST'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}