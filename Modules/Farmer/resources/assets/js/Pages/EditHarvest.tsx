import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function EditHarvest({ batch }: { batch: any }) {
    // Initialize the form with existing database values
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
        // Use patch to update the specific record
        patch(route('farmer.harvest.update', batch.id));
    };

    return (
        <AuthenticatedLayout 
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Harvest: {batch.rice_variety}</h2>}
        >
            <Head title="Edit Harvest" />

            <div className="py-12 mb-20">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white shadow-sm sm:rounded-lg p-8 border-2 border-blue-500">
                        <form onSubmit={submit} className="space-y-6">
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Rice Variety</label>
                                <input 
                                    type="text" 
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500"
                                    value={data.rice_variety}
                                    onChange={e => setData('rice_variety', e.target.value)}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Number of Bags</label>
                                    <input 
                                        type="number" 
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        value={data.number_of_bags}
                                        onChange={e => setData('number_of_bags', e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Total Weight (kg)</label>
                                    <input 
                                        type="number" 
                                        step="0.01"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        value={data.total_weight}
                                        onChange={e => setData('total_weight', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Harvest Date</label>
                                <input
                                    type="date"
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                    value={data.harvest_date}
                                    onChange={e => setData('harvest_date', e.target.value)}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Price Per KG */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Asking Price Per KG (₱)</label>
                                    <input
                                        type="number"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                        value={data.price_per_kg}
                                        onChange={e => setData('price_per_kg', e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Palay Condition */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">Palay Condition</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setData('condition', 'fresh')}
                                            className={`py-2 px-3 text-sm font-bold uppercase rounded transition-all ${
                                                data.condition === 'fresh' ? 'bg-yellow-400 text-black border-2 border-yellow-600' : 'bg-gray-100 text-gray-500 border-2 border-gray-200'
                                            }`}
                                        >
                                            🌾 Fresh
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setData('condition', 'ready')}
                                            className={`py-2 px-3 text-sm font-bold uppercase rounded transition-all ${
                                                data.condition === 'ready' ? 'bg-green-500 text-black border-2 border-green-600' : 'bg-gray-100 text-gray-500 border-2 border-gray-200'
                                            }`}
                                        >
                                            ☀️ Ready
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-center justify-center mt-12 pt-8 border-t-2 border-gray-100">
   <button 
        type="submit" 
        disabled={processing}
        className="inline-flex items-center px-16 py-5 bg-blue-600 hover:bg-blue-700 text-white font-black rounded border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-none active:translate-x-[2px] active:translate-y-[2px] text-lg uppercase tracking-widest"
    >
        {processing ? 'UPDATING...' : 'UPDATE'}
    </button>
    
    <p className="text-[10px] text-gray-400 mt-4 uppercase font-bold">
        
    </p>
</div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}