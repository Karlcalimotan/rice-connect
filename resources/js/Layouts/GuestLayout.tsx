import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0 bg-transparent relative font-['Plus_Jakarta_Sans',sans-serif]">
            {/* Architectural Network Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(#065f46 1px, transparent 1px)`, backgroundSize: '32px 32px' }}></div>
            {/* GLOBAL FIXED BACKGROUND */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <img 
                    src="/images/rice_field_hero.png" 
                    className="w-full h-full object-cover scale-110"
                    alt=""
                />
                <div className="absolute inset-0 bg-emerald-950/40 backdrop-blur-[2px]"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center">
                <Link href="/">
                    <img src="/favicon.png" className="w-20 h-20 object-cover rounded-2xl scale-150 drop-shadow-2xl" alt="RiceConnect Logo" />
                </Link>
                <div className="mt-8 text-center">
                    <h2 className="text-[10px] font-black text-emerald-900/40 uppercase tracking-[0.5em] leading-none mb-3">System Entry</h2>
                    <h1 className="text-3xl font-extrabold text-emerald-950 tracking-tighter leading-none italic uppercase">Hub Verification</h1>
                </div>
            </div>

            <div className="relative z-10 mt-12 w-full glass-card p-2 sm:max-w-md">
                <div className="bg-white/40 rounded-[3rem] p-10 backdrop-blur-3xl border border-white/60">
                    {children}
                </div>
            </div>
            
            <p className="relative z-10 mt-12 text-[10px] font-black text-emerald-900/20 uppercase tracking-[0.4em]">RiceConnect Operational Instance v2.0</p>
        </div>
    );
}
