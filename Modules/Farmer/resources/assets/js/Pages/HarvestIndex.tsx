import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';

export default function HarvestIndex({ auth, batches }: { auth: any, batches: any[] }) {
    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this harvest batch?')) {
            destroy(route('farmer.harvest.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="My Harvest Log" />
            
            <div className="py-12 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-8 bg-green-600 border border-black"></div>
                            <h2 className="text-3xl font-black uppercase tracking-tighter text-gray-900">
                                My Harvest Log
                            </h2>
                        </div>
                        <Link 
                            href={route('farmer.harvest.create')}
                            className="bg-black text-white px-6 py-3 font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(34,197,94,1)] hover:bg-green-600 hover:text-black transition-all active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                        >
                            + Post New Harvest
                        </Link>
                    </div>

                    <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b-4 border-black bg-gray-100">
                                    <th className="p-4 font-black uppercase text-xs tracking-widest">Variety & Condition</th>
                                    <th className="p-4 font-black uppercase text-xs tracking-widest text-center">Bags</th>
                                    <th className="p-4 font-black uppercase text-xs tracking-widest text-center">Weight (kg)</th>
                                    <th className="p-4 font-black uppercase text-xs tracking-widest text-center">Harvest Date</th>
                                    <th className="p-4 font-black uppercase text-xs tracking-widest text-center">Status</th>
                                    <th className="p-4 font-black uppercase text-xs tracking-widest text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {batches.length > 0 ? (
                                    batches.map((batch) => (
                                        <tr key={batch.id} className="border-b-2 border-gray-100 hover:bg-green-50/30 transition-colors">
                                            <td className="p-4">
                                                <div className="flex flex-col gap-2">
                                                    <span className="text-lg font-black uppercase text-gray-900">{batch.rice_variety}</span>
                                                    {/* SYNCED CONDITION BADGE */}
                                                    <div className={`w-fit text-[9px] px-2 py-0.5 uppercase font-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                                                        batch.condition === 'fresh' ? 'bg-yellow-400 text-black' : 'bg-green-500 text-white'
                                                    }`}>
                                                        {batch.condition === 'fresh' ? '🌾 Fresh / Wet' : '☀️ Ready to Mill'}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-center font-bold text-gray-700">{batch.number_of_bags}</td>
                                            <td className="p-4 text-center font-bold text-gray-700">{batch.total_weight} kg</td>
                                            <td className="p-4 text-center text-xs font-bold text-gray-500">{batch.harvest_date}</td>
                                            <td className="p-4 text-center">
                                                <div className="flex flex-col items-center gap-1">
                                                    <span className={`px-3 py-1 border-2 border-black text-[10px] font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                                                        batch.status === 'pending' ? 'bg-orange-400 text-black' : 
                                                        batch.status === 'sold' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                                                    }`}>
                                                        {batch.status}
                                                    </span>
                                                    {batch.status === 'pending' && batch.buyer && (
                                                        <span className="text-[9px] text-gray-500 font-bold italic">
                                                            Interested: {batch.buyer.first_name}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center justify-center gap-2">
                                                    {batch.status === 'pending' && (
                                                        <button 
                                                            onClick={() => router.post(route('farmer.accept', batch.id))}
                                                            className="px-3 py-1 bg-green-500 text-black text-[10px] font-black uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-green-600"
                                                        >
                                                            Accept
                                                        </button>
                                                    )}
                                                    {batch.status !== 'sold' && batch.status !== 'delivered' && (
                                                        <Link 
                                                            href={route('farmer.harvest.edit', batch.id)}
                                                            className="px-3 py-1 bg-white text-black text-[10px] font-black uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100"
                                                        >
                                                            Edit
                                                        </Link>
                                                    )}
                                                    <button 
                                                        onClick={() => handleDelete(batch.id)}
                                                        className="px-3 py-1 bg-red-500 text-white text-[10px] font-black uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-red-600"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="p-20 text-center">
                                            <p className="text-gray-400 font-black uppercase tracking-widest">No Harvest Records Found</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}