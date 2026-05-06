import { LabelHTMLAttributes } from 'react';

export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}: LabelHTMLAttributes<HTMLLabelElement> & { value?: string }) {
    return (
        <label
            {...props}
            className={
                `block text-[10px] font-black uppercase tracking-[0.3em] text-emerald-950/60 mb-3 ` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
