import React from 'react';
import { router } from '@inertiajs/react';

interface FleetManagementProps {
    allDrivers: any[];
    myFleet: any[];
}

const FleetManagement: React.FC<FleetManagementProps> = ({ allDrivers, myFleet }) => {
    
    const handleLinkDriver = (id: number) => {
        router.post(route('miller.transport.link_driver', id));
    };

    // Filter out drivers already in fleet
    const availableDrivers = allDrivers.filter(d => !myFleet.find(f => f.id === d.id));

    return (
        <div className="mt-12 space-y-8">
            <div className="flex items-center gap-2">
                <div className="w-2 h-6 bg-red-600 border border-black"></div>
                <h3 className="text-2xl font-black uppercase text-gray-900 tracking-tighter">Fleet Management</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* MY FLEET */}
                <div className="space-y-4">
                    <h4 className="text-xs font-black uppercase text-gray-400 tracking-widest">Authorized Drivers ({myFleet.length})</h4>
                    <div className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        {myFleet.length === 0 ? (
                            <p className="text-sm font-bold text-gray-400 italic">No drivers in your fleet yet.</p>
                        ) : (
                            <div className="divide-y-2 divide-gray-100">
                                {myFleet.map((driver) => (
                                    <div key={driver.id} className="py-3 flex justify-between items-center">
                                        <div>
                                            <p className="font-black text-sm uppercase">{driver.first_name} {driver.last_name}</p>
                                            <p className="text-[10px] font-bold text-gray-500 uppercase">{driver.vehicle_type || 'Unknown Vehicle'}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[10px] font-black bg-green-100 text-green-700 px-2 py-0.5 uppercase border border-green-300">Verified</span>
                                            <p className="text-[10px] font-bold text-gray-400">{driver.contact}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* AVAILABLE DRIVERS */}
                <div className="space-y-4">
                    <h4 className="text-xs font-black uppercase text-gray-400 tracking-widest">Available Network ({availableDrivers.length})</h4>
                    <div className="bg-gray-100 border-4 border-black border-dashed p-4">
                        {availableDrivers.length === 0 ? (
                            <p className="text-sm font-bold text-gray-400 italic">No other available drivers in the region.</p>
                        ) : (
                            <div className="space-y-3">
                                {availableDrivers.map((driver) => (
                                    <div key={driver.id} className="bg-white border-2 border-black p-3 flex justify-between items-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                        <div>
                                            <p className="font-black text-xs uppercase">{driver.first_name} {driver.last_name}</p>
                                            <p className="text-[9px] font-bold text-blue-600 uppercase">{driver.vehicle_type}</p>
                                        </div>
                                        <button 
                                            onClick={() => handleLinkDriver(driver.id)}
                                            className="bg-black text-white text-[9px] font-black uppercase px-3 py-1 hover:bg-green-500 hover:text-black transition-colors"
                                        >
                                            Verify & Add
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FleetManagement;
