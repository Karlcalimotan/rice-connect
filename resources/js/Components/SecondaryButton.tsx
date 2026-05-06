import { ButtonHTMLAttributes } from 'react';

export default function SecondaryButton({
    type = 'button',
    className = '',
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            type={type}
            className={
                `bg-white/60 text-emerald-950 font-extrabold uppercase tracking-[0.2em] text-[11px] px-8 py-4 rounded-[2rem] border border-white/80 shadow-lg hover:bg-white hover:-translate-y-1 active:translate-y-0 transition-all duration-500 ${
                    disabled && 'opacity-30 grayscale cursor-not-allowed transform-none'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
