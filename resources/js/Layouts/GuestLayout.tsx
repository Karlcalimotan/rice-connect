import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center pt-6 sm:justify-center sm:pt-0 lush-gradient relative font-['Plus_Jakarta_Sans',sans-serif]">
            {/* Architectural Network Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(#065f46 1px, transparent 1px)`, backgroundSize: '32px 32px' }}></div>
            
            <div 
                className="absolute inset-0 grayscale opacity-10 pointer-events-none"
                style={{
                    backgroundImage: `url('/images/rice_2026.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            ></div>

            <div className="relative z-10 flex flex-col items-center">
                <Link href="/">
                    <ApplicationLogo className="scale-150 drop-shadow-2xl" />
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
