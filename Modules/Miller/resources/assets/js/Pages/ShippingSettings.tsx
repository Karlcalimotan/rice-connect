import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

interface Municipality {
    id: number;
    name: string;
}

interface Settings {
    base_delivery_fee: string;
    extra_fee_per_municipality: string;
}

export default function ShippingSettings({ auth, settings, municipalities, current_municipality_id }: {
    auth: any;
    settings: Settings | null;
    municipalities: Municipality[];
    current_municipality_id: number | null;
}) {
    const { data, setData, patch, processing, errors } = useForm({
        base_delivery_fee: settings?.base_delivery_fee ?? '150.00',
        extra_fee_per_municipality: settings?.extra_fee_per_municipality ?? '50.00',
        municipality_id: current_municipality_id ?? '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('miller.shipping_settings.update'));
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Shipping Settings" />
            <div className="p-6 bg-transparent min-h-screen">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center gap-2 mb-10">
                        <div className="w-2 h-8 bg-emerald-600 rounded-full shadow-[0_0_15px_rgba(5,150,105,0.4)]"></div>
                        <h2 className="text-3xl font-black uppercase tracking-tighter text-gray-900 leading-none">
                            Shipping & Delivery Settings
                        </h2>
                    </div>

                    <div className="bg-white/20 rounded-[2.5rem] p-10 border border-white/40 shadow-2xl overflow-hidden">
                        <form onSubmit={submit} className="space-y-6">
                            {/* Home Municipality */}
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">🏠 Miller's Home Municipality</label>
                                <select
                                    className="w-full bg-white/50 border-2 border-emerald-50 rounded-2xl p-4 font-black text-lg focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                                    value={data.municipality_id}
                                    onChange={e => setData('municipality_id', e.target.value)}
                                >
                                    <option value="">Select your home municipality...</option>
                                    {municipalities.map(m => (
                                        <option key={m.id} value={m.id}>{m.name}</option>
                                    ))}
                                </select>
                                {errors.municipality_id && <p className="text-red-500 text-xs font-black mt-2 uppercase italic tracking-widest">{errors.municipality_id}</p>}
                                <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-widest italic leading-tight">
                                    Determines 'Step 0' distance. Shipping is ₱0.00 within the same municipality.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Base Fee */}
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">🚚 Base Delivery Fee</label>
                                    <div className="relative">
                                        <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-emerald-600">₱</span>
                                        <input
                                            type="number"
                                            className="w-full bg-white/50 border-2 border-emerald-50 rounded-2xl p-4 pl-12 font-black text-lg focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                                            value={data.base_delivery_fee}
                                            onChange={e => setData('base_delivery_fee', e.target.value)}
                                        />
                                    </div>
                                    {errors.base_delivery_fee && <p className="text-red-500 text-xs font-black mt-2 uppercase italic tracking-widest">{errors.base_delivery_fee}</p>}
                                </div>
                                    <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-widest italic leading-tight">
                                        Fee for delivering to the immediate next municipality.
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">➕ Extra Fee per Municipality</label>
                                    <div className="relative">
                                        <span className="absolute left-6 top-1/2 -translate-y-1/2 font-black text-emerald-600">₱</span>
                                        <input
                                            type="number"
                                            className="w-full bg-white/50 border-2 border-emerald-50 rounded-2xl p-4 pl-12 font-black text-lg focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all"
                                            value={data.extra_fee_per_municipality}
                                            onChange={e => setData('extra_fee_per_municipality', e.target.value)}
                                        />
                                    </div>
                                    {errors.extra_fee_per_municipality && <p className="text-red-500 text-xs font-black mt-2 uppercase italic tracking-widest">{errors.extra_fee_per_municipality}</p>}
                                    <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-widest italic leading-tight">
                                        Added for every additional municipality jump beyond the first.
                                    </p>
                                </div>
                            </div>

                            {/* Summary Mockup */}
                            <div className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100/50">
                                <h4 className="text-[10px] font-black uppercase text-emerald-600 tracking-[0.2em] mb-4">Calculation Preview:</h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                                        <span className="text-gray-400">Same Municipality:</span>
                                        <span className="text-emerald-600">₱0.00</span>
                                    </div>
                                    <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                                        <span className="text-gray-400">Next Municipality:</span>
                                        <span className="text-gray-900 font-black">₱{Number(data.base_delivery_fee || 0).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                                        <span className="text-gray-400">2 Jumps Away:</span>
                                        <span className="text-gray-900 font-black">₱{(Number(data.base_delivery_fee || 0) + Number(data.extra_fee_per_municipality || 0)).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-gray-900 text-white font-black py-5 rounded-2xl uppercase tracking-widest text-sm hover:bg-black transition-all shadow-xl disabled:opacity-50"
                            >
                                {processing ? 'Updating...' : 'Save Settings'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
