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
            <div className="p-6 bg-gray-50 min-h-screen">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-2 h-8 bg-blue-600 border border-black"></div>
                        <h2 className="text-3xl font-black uppercase tracking-tighter text-blue-800">
                            Shipping & Delivery Settings
                        </h2>
                    </div>

                    <div className="bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(30,64,175,1)]">
                        <form onSubmit={submit} className="space-y-6">
                            {/* Home Municipality */}
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 italic">🏠 Miller's Home Municipality</label>
                                <select
                                    className="w-full border-4 border-black p-4 font-bold text-lg focus:ring-0 focus:border-blue-600 bg-gray-50"
                                    value={data.municipality_id}
                                    onChange={e => setData('municipality_id', e.target.value)}
                                >
                                    <option value="">Select your home municipality...</option>
                                    {municipalities.map(m => (
                                        <option key={m.id} value={m.id}>{m.name}</option>
                                    ))}
                                </select>
                                {errors.municipality_id && <p className="text-red-500 text-xs font-bold mt-1 uppercase italic">{errors.municipality_id}</p>}
                                <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-widest italic leading-tight">
                                    Determines 'Step 0' distance. Shipping is ₱0.00 within the same municipality.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Base Fee */}
                                <div>
                                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 italic">🚚 Base Delivery Fee (Step 1)</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-gray-400">₱</span>
                                        <input
                                            type="number"
                                            className="w-full border-4 border-black p-4 pl-10 font-bold text-lg focus:ring-0 focus:border-blue-600 bg-gray-50"
                                            value={data.base_delivery_fee}
                                            onChange={e => setData('base_delivery_fee', e.target.value)}
                                        />
                                    </div>
                                    {errors.base_delivery_fee && <p className="text-red-500 text-xs font-bold mt-1 uppercase italic">{errors.base_delivery_fee}</p>}
                                    <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-widest italic leading-tight">
                                        Fee for delivering to the immediate next municipality.
                                    </p>
                                </div>

                                {/* Extra Fee */}
                                <div>
                                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 italic">➕ Extra Fee per Municipality</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-gray-400">₱</span>
                                        <input
                                            type="number"
                                            className="w-full border-4 border-black p-4 pl-10 font-bold text-lg focus:ring-0 focus:border-blue-600 bg-gray-50"
                                            value={data.extra_fee_per_municipality}
                                            onChange={e => setData('extra_fee_per_municipality', e.target.value)}
                                        />
                                    </div>
                                    {errors.extra_fee_per_municipality && <p className="text-red-500 text-xs font-bold mt-1 uppercase italic">{errors.extra_fee_per_municipality}</p>}
                                    <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-widest italic leading-tight">
                                        Added for every additional municipality jump beyond the first.
                                    </p>
                                </div>
                            </div>

                            {/* Summary Mockup */}
                            <div className="bg-blue-50 border-2 border-dashed border-blue-300 p-4">
                                <h4 className="text-[10px] font-black uppercase text-blue-600 tracking-widest mb-3">Calculation Preview:</h4>
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs font-bold uppercase">
                                        <span>Same Municipality:</span>
                                        <span className="text-green-600">₱0.00</span>
                                    </div>
                                    <div className="flex justify-between text-xs font-bold uppercase">
                                        <span>Next Municipality:</span>
                                        <span className="text-blue-700">₱{Number(data.base_delivery_fee || 0).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-xs font-bold uppercase">
                                        <span>2 Jumps Away:</span>
                                        <span className="text-blue-700">₱{(Number(data.base_delivery_fee || 0) + Number(data.extra_fee_per_municipality || 0)).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full bg-blue-700 text-white font-black py-4 border-4 border-black hover:bg-blue-800 uppercase transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                            >
                                {processing ? 'Updating...' : '💾 Save Settings'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
