import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function EditHarvest({ batch }: { batch: any }) {
    const { data, setData, patch, processing, errors } = useForm({
        rice_variety: batch.rice_variety || '',
        number_of_bags: batch.number_of_bags || '',
        total_weight: batch.total_weight || '',
        harvest_date: batch.harvest_date || '',
        price_per_kg: batch.price_per_kg || '',
        condition: batch.condition || 'fresh',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('farmer.harvest.update', batch.id));
    };

    return (
        <AuthenticatedLayout auth={null}>
            <Head title="Edit Harvest" />

            <div className="py-12 bg-transparent min-h-screen">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-center mb-16 text-center">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-1.5 h-8 bg-emerald-600 rounded-full shadow-[0_0_15px_rgba(5,150,105,0.4)]"></span>
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-800/60">Data Correction</p>
                            <span className="w-1.5 h-8 bg-emerald-600 rounded-full shadow-[0_0_15px_rgba(5,150,105,0.4)]"></span>
                        </div>
                        <h2 className="text-6xl font-black uppercase tracking-tighter text-emerald-950 leading-none">
                            Update Yield
                        </h2>
                    </div>

                    <div className="glass-card p-12 lg:p-20 relative overflow-hidden">
                        <form onSubmit={submit} className="space-y-12">
                            <div className="space-y-4">
                                <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-emerald-900/40 px-4">Rice Variety</label>
                                <input 
                                    type="text" 
                                    className="input-2026 !text-3xl"
                                    value={data.rice_variety}
                                    onChange={e => setData('rice_variety', e.target.value)}
                                    placeholder="Variety Identifier"
                                    required
                                />
                                {errors.rice_variety && <p className="text-rose-500 text-[10px] font-black uppercase px-4">{errors.rice_variety}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-4">
                                    <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-emerald-900/40 px-4">Total Bags</label>
                                    <input 
                                        type="number" 
                                        className="input-2026"
                                        value={data.number_of_bags}
                                        onChange={e => setData('number_of_bags', e.target.value)}
                                        required
                                    />
                                    {errors.number_of_bags && <p className="text-rose-500 text-[10px] font-black uppercase px-4">{errors.number_of_bags}</p>}
                                </div>
                                <div className="space-y-4">
                                    <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-emerald-900/40 px-4">Total Weight (KG)</label>
                                    <input 
                                        type="number" 
                                        step="0.01"
                                        className="input-2026"
                                        value={data.total_weight}
                                        onChange={e => setData('total_weight', e.target.value)}
                                        required
                                    />
                                    {errors.total_weight && <p className="text-rose-500 text-[10px] font-black uppercase px-4">{errors.total_weight}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-4">
                                    <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-emerald-900/40 px-4">Harvest Date</label>
                                    <input
                                        type="date"
                                        className="input-2026"
                                        value={data.harvest_date}
                                        onChange={e => setData('harvest_date', e.target.value)}
                                        required
                                    />
                                    {errors.harvest_date && <p className="text-rose-500 text-[10px] font-black uppercase px-4">{errors.harvest_date}</p>}
                                </div>
                                <div className="space-y-4">
                                    <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-emerald-900/40 px-4">Asking Price (₱/KG)</label>
                                    <input
                                        type="number"
                                        className="input-2026"
                                        value={data.price_per_kg}
                                        onChange={e => setData('price_per_kg', e.target.value)}
                                        required
                                    />
                                    {errors.price_per_kg && <p className="text-rose-500 text-[10px] font-black uppercase px-4">{errors.price_per_kg}</p>}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-emerald-900/40 px-4">Stock Condition</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setData('condition', 'fresh')}
                                        className={`py-6 px-4 text-xs font-black uppercase rounded-3xl transition-all duration-500 border-2 ${
                                            data.condition === 'fresh' ? 'bg-emerald-950 text-white border-emerald-950 shadow-2xl' : 'bg-white/90 text-emerald-950/40 border-emerald-50 hover:bg-white'
                                        }`}
                                    >
                                        🌾 Fresh Yield
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setData('condition', 'ready')}
                                        className={`py-6 px-4 text-xs font-black uppercase rounded-3xl transition-all duration-500 border-2 ${
                                            data.condition === 'ready' ? 'bg-emerald-950 text-white border-emerald-950 shadow-2xl' : 'bg-white/90 text-emerald-950/40 border-emerald-50 hover:bg-white'
                                        }`}
                                    >
                                        ☀️ Sun-Dried / Ready
                                    </button>
                                </div>
                            </div>

                            <div className="pt-12">
                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="btn-2026 w-full !rounded-[2rem] py-8 text-xl"
                                >
                                    {processing ? 'UPDATING ARCHIVE...' : 'SECURE UPDATES'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}