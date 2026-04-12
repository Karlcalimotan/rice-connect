import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

interface Municipality {
    id: number;
    name: string;
    distance_index: number;
}

export default function MunicipalitiesManager({ auth, municipalities }: { auth: any; municipalities: Municipality[] }) {
    const [editingId, setEditingId] = useState<number | null>(null);

    const { data, setData, post, patch, delete: destroy, reset, processing, errors } = useForm({
        name: '',
        distance_index: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            patch(route('admin.municipalities.update', editingId), {
                onSuccess: () => {
                    setEditingId(null);
                    reset();
                }
            });
        } else {
            post(route('admin.municipalities.store'), {
                onSuccess: () => reset()
            });
        }
    };

    const startEdit = (m: Municipality) => {
        setEditingId(m.id);
        setData({
            name: m.name,
            distance_index: m.distance_index.toString(),
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
        reset();
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Municipality Management" />
            <div className="p-6 bg-gray-50 min-h-screen">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-2 h-8 bg-red-600 border border-black"></div>
                        <h2 className="text-3xl font-black uppercase tracking-tighter text-gray-900">
                            Municipality Logistics Manager
                        </h2>
                    </div>

                    {/* Form Section */}
                    <div className="bg-white border-4 border-black p-6 mb-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <h3 className="text-xl font-black uppercase mb-4 text-gray-800">
                            {editingId ? 'Edit Municipality' : 'Add New Municipality'}
                        </h3>
                        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Municipality Name</label>
                                <input 
                                    type="text"
                                    className="w-full border-4 border-black p-3 font-bold text-lg focus:ring-0 focus:border-red-600"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    placeholder="e.g. Leon"
                                />
                                {errors.name && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">Distance Index</label>
                                <input 
                                    type="number"
                                    className="w-full border-4 border-black p-3 font-bold text-lg focus:ring-0 focus:border-red-600"
                                    value={data.distance_index}
                                    onChange={e => setData('distance_index', e.target.value)}
                                    placeholder="Index #"
                                />
                                {errors.distance_index && <p className="text-red-500 text-[10px] font-bold mt-1 uppercase">{errors.distance_index}</p>}
                            </div>
                            <div className="flex items-end gap-2">
                                <button 
                                    disabled={processing}
                                    className="flex-1 bg-black text-white font-black py-4 border-2 border-black hover:bg-gray-800 uppercase transition-all"
                                >
                                    {editingId ? 'Update' : 'Add Municipality'}
                                </button>
                                {editingId && (
                                    <button 
                                        type="button"
                                        onClick={cancelEdit}
                                        className="bg-gray-200 text-black font-black py-4 px-4 border-2 border-black hover:bg-gray-300 uppercase transition-all"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Table Section */}
                    <div className="bg-white border-4 border-black overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <table className="w-full text-left">
                            <thead className="bg-gray-900 text-white">
                                <tr>
                                    <th className="p-4 uppercase font-black tracking-widest text-[10px]">Index</th>
                                    <th className="p-4 uppercase font-black tracking-widest text-[10px]">Municipality</th>
                                    <th className="p-4 uppercase font-black tracking-widest text-[10px] text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y-2 divide-black">
                                {municipalities.map(m => (
                                    <tr key={m.id} className="hover:bg-red-50 transition-colors">
                                        <td className="p-4 font-black text-xl italic text-red-600">#{m.distance_index}</td>
                                        <td className="p-4 font-black uppercase text-gray-900">{m.name}</td>
                                        <td className="p-4 text-right flex justify-end gap-2">
                                            <button 
                                                onClick={() => startEdit(m)}
                                                className="bg-blue-600 text-white p-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] active:shadow-none active:translate-x-[1px] active:translate-y-[1px] transition-all"
                                            >
                                                ✏️
                                            </button>
                                            <button 
                                                onClick={() => {
                                                    if(confirm('Delete this municipality? This will fail if users are assigned to it.')) {
                                                        destroy(route('admin.municipalities.destroy', m.id));
                                                    }
                                                }}
                                                className="bg-white text-black p-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] active:shadow-none active:translate-x-[1px] active:translate-y-[1px] transition-all"
                                            >
                                                🗑️
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
