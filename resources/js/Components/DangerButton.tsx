import { ButtonHTMLAttributes } from 'react';

export default function DangerButton({
    className = '',
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={
                `bg-rose-600 text-white font-extrabold uppercase tracking-[0.2em] text-[11px] px-8 py-4 rounded-[2rem] shadow-[0_15px_35px_-5px_rgba(225,29,72,0.3)] hover:shadow-[0_25px_50px_-10px_rgba(225,29,72,0.5)] hover:-translate-y-1 active:translate-y-0 transition-all duration-500 relative overflow-hidden ${
                    disabled && 'opacity-30 grayscale cursor-not-allowed transform-none'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
