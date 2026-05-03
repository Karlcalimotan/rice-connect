import { SVGAttributes } from 'react';

export default function ApplicationLogo(props: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div {...props} className={`flex items-center gap-2 ${props.className}`}>
            <img src="/favicon.png" alt="Rice Connect Logo" className="h-10 w-10 object-cover rounded-lg shadow-sm" />
            <div className="flex flex-col -space-y-1">
                <span className="text-xl font-black tracking-tighter text-gray-900 leading-none">RICE</span>
                <span className="text-xl font-black tracking-tighter text-emerald-500 leading-none">CONNECT</span>
            </div>
        </div>
    );
}
