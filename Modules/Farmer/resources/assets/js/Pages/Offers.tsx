import { router } from '@inertiajs/react';

// Inside your batches.map((batch) => ...) loop:
<div className="border-2 border-black p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4">
    <div className="flex justify-between items-start">
        <h3 className="font-black text-xl uppercase">{batch.variety}</h3>
        <span className={`px-2 py-1 border-2 border-black text-xs font-bold uppercase ${
            batch.status === 'pending' ? 'bg-yellow-400' : 'bg-gray-200'
        }`}>
            {batch.status}
        </span>
    </div>

    <p className="mt-2 text-sm">Weight: <strong>{batch.weight} kg</strong></p>

    {/* SHOW THIS SECTION ONLY IF STATUS IS PENDING */}
    {batch.status === 'pending' && batch.buyer && (
        <div className="mt-4 pt-4 border-t-2 border-dashed border-black">
            <p className="text-xs uppercase font-bold text-gray-500">Incoming Offer From:</p>
            <p className="font-black text-lg text-green-700">{batch.buyer.name}</p>
            <p className="text-sm">📍 {batch.buyer.municipality}, {batch.buyer.province}</p>
            
            <div className="flex gap-2 mt-4">
                <button 
                    onClick={() => router.post(route('farmer.accept', batch.id))}
                    className="flex-1 bg-green-500 text-white font-black py-2 border-2 border-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                    ACCEPT
                </button>
                <button 
                    className="flex-1 bg-red-500 text-white font-black py-2 border-2 border-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                    DECLINE
                </button>
            </div>
        </div>
    )}
</div>