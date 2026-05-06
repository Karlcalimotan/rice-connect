import { InertiaLinkProps, Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}: InertiaLinkProps & { active?: boolean }) {
    return (
        <Link
            {...props}
            className={
                'relative flex items-center px-6 py-4 rounded-[1.5rem] text-[13px] font-black uppercase tracking-widest transition-all duration-500 overflow-hidden group ' +
                (active
                    ? 'bg-emerald-950 text-white shadow-[0_15px_30px_-5px_rgba(6,78,59,0.3)] border-white/10'
                    : 'text-emerald-900/60 hover:bg-emerald-50 hover:text-emerald-950') +
                ' ' + className
            }
        >
            {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-emerald-400 rounded-r-full shadow-[4px_0_15px_rgba(52,211,153,0.5)]"></span>
            )}
            
            <span className={`relative z-10 flex items-center gap-3 transition-transform duration-500 ${active ? 'translate-x-1' : 'group-hover:translate-x-1'}`}>
                {children}
            </span>

            {/* Subtle Inner Glow for Active */}
            {active && (
                <span className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></span>
            )}
        </Link>
    );
}

