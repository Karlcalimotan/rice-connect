import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/Checkbox';
import { Head, Link, useForm } from '@inertiajs/react';
import React, { FormEventHandler, useEffect } from 'react';

export default function Login({ status, canResetPassword }: { status?: string, canResetPassword?: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        login_id: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="flex min-h-screen bg-white font-['Plus_Jakarta_Sans',sans-serif] overflow-hidden">
            <Head title="Sign In | RiceConnect" />

            {/* LEFT SIDE: VISUAL EXPERIENCE */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-emerald-950">
                {/* Background Image */}
                <div 
                    className="absolute inset-0 z-0 scale-110"
                    style={{
                        backgroundImage: `url('/images/rice_field_hero.png')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                ></div>
                
                {/* Overlays */}
                <div className="absolute inset-0 bg-emerald-950/40 backdrop-blur-[2px] z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-black/40 z-20"></div>

                {/* Content */}
                <div className="relative z-30 flex flex-col justify-center h-full px-20 text-white">
                    <div className="mb-12 group">
                        <Link href="/">
                             <img src="/favicon.png" alt="Rice Connect" className="w-24 h-24 rounded-3xl shadow-2xl transform group-hover:rotate-6 transition-transform duration-500 object-cover" />
                        </Link>
                    </div>
                    
                    <h1 className="text-7xl font-black tracking-tighter mb-6 uppercase leading-[0.9]">
                        Rice<br/><span className="text-emerald-400">Connect</span>
                    </h1>
                    
                    <p className="text-xl text-emerald-50/80 max-w-md font-medium leading-relaxed mb-12">
                        Synchronizing the grain supply chain with precision. Secure access for ecosystem partners.
                    </p>

                    <div className="flex items-center gap-6">
                        <div className="h-0.5 w-12 bg-emerald-500 rounded-full"></div>
                        <span className="text-xs font-black uppercase tracking-[0.4em] text-emerald-400">Agri-Tech Solutions</span>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-10 left-20 z-30 opacity-20">
                     <p className="text-[10px] font-black uppercase tracking-[0.5em]">System Instance: PH-ILO-2026</p>
                </div>
            </div>

            {/* RIGHT SIDE: LOGIN FORM */}
            <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-20 xl:px-32 bg-[#f8faf9] relative">
                {/* Mobile Branding */}
                <div className="lg:hidden flex flex-col items-center mb-12">
                    <img src="/favicon.png" alt="Rice Connect" className="h-16 w-16 object-cover rounded-xl mb-4" />
                    <h2 className="text-3xl font-black text-emerald-950 tracking-tighter uppercase">Rice Connect</h2>
                </div>

                <div className="w-full max-w-md mx-auto">
                    <div className="glass-card !bg-white !p-12 !rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(6,95,70,0.1)] border border-white relative z-10">
                        <div className="mb-10">
                            <h2 className="text-4xl font-black text-emerald-950 tracking-tight mb-3 italic uppercase">Sign In</h2>
                            <p className="text-sm text-emerald-900/40 font-bold uppercase tracking-widest leading-relaxed">
                                Enter your credentials to access your secure portal.
                            </p>
                        </div>

                        {status && <div className="mb-6 font-bold text-sm text-emerald-600 bg-emerald-50 p-4 rounded-2xl border border-emerald-100">{status}</div>}

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <InputLabel htmlFor="login_id" value="Username or System ID" className="!text-emerald-950/40 !font-black !uppercase !tracking-widest !text-[10px] mb-3 ml-2" />
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-emerald-900/20 group-focus-within:text-emerald-600 transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                    </div>
                                    <TextInput
                                        id="login_id"
                                        type="text"
                                        name="login_id"
                                        value={data.login_id}
                                        className="!block !w-full !pl-16 !pr-6 !py-5 !bg-emerald-50/30 !border-2 !border-emerald-950/5 !rounded-2xl !font-bold !text-emerald-950 focus:!border-emerald-500 focus:!ring-[12px] focus:!ring-emerald-500/5 transition-all"
                                        autoComplete="username"
                                        isFocused={true}
                                        onChange={(e) => setData('login_id', e.target.value)}
                                        placeholder="e.g. FARMER-101"
                                    />
                                </div>
                                <InputError message={errors.login_id} className="mt-2 ml-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="password" value="Password" className="!text-emerald-950/40 !font-black !uppercase !tracking-widest !text-[10px] mb-3 ml-2" />
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-emerald-900/20 group-focus-within:text-emerald-600 transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                    </div>
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="!block !w-full !pl-16 !pr-6 !py-5 !bg-emerald-50/30 !border-2 !border-emerald-950/5 !rounded-2xl !font-bold !text-emerald-950 focus:!border-emerald-500 focus:!ring-[12px] focus:!ring-emerald-500/5 transition-all"
                                        autoComplete="current-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="••••••••"
                                    />
                                </div>
                                <InputError message={errors.password} className="mt-2 ml-2" />
                            </div>

                            <div className="flex items-center justify-between px-2">
                                <label className="flex items-center cursor-pointer group">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="!w-5 !h-5 !rounded-lg !border-emerald-200 !text-emerald-600 focus:!ring-emerald-500/20"
                                    />
                                    <span className="ms-3 text-sm font-bold text-emerald-900/40 group-hover:text-emerald-900 transition-colors">Remember Me</span>
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-xs font-black uppercase tracking-tighter text-emerald-600 hover:text-emerald-400 transition-colors"
                                    >
                                        Forgot?
                                    </Link>
                                )}
                            </div>

                            <PrimaryButton 
                                className="!w-full !py-6 !bg-emerald-600 hover:!bg-emerald-700 !text-white !font-black !rounded-2xl !transition-all !shadow-2xl !shadow-emerald-200 !transform hover:!scale-[0.98] active:!scale-95 !uppercase !tracking-[0.2em] !text-sm !flex !justify-center !border-none" 
                                disabled={processing}
                            >
                                Sign In to Portal
                            </PrimaryButton>
                        </form>

                        <div className="mt-10 pt-10 border-t border-emerald-50 text-center">
                            <p className="text-sm font-bold text-emerald-950/30">
                                Don't have a partner account? 
                                <Link href={route('register')} className="ms-2 font-black text-emerald-600 hover:text-emerald-400 transition-colors underline decoration-emerald-100 underline-offset-8">
                                    Connect with us
                                </Link>
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 text-center opacity-20">
                         <p className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-950">
                            © 2026 Rice Connect Supply Chain Solutions
                         </p>
                    </div>
                </div>

                {/* Architectural Background Pattern */}
                <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(#065f46 1px, transparent 1px)`, backgroundSize: '40px 40px' }}></div>
            </div>
        </div>
    );
}
