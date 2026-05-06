import { ButtonHTMLAttributes } from 'react';

export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={
                `btn-2026 flex items-center justify-center ${
                    disabled && 'opacity-30 grayscale cursor-not-allowed transform-none'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
