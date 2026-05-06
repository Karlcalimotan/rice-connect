import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import MunicipalitySelect from '@/Components/MunicipalitySelect';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        contact: '',
        role: 'farmer',
        municipality: '',
        province: 'Iloilo',
        password: '',
        password_confirmation: '',
        vehicle_type: '',
        license_number: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const inputClass = "!block !w-full !px-6 !py-4 !bg-emerald-50/30 !border-2 !border-emerald-950/5 !rounded-2xl !font-bold !text-emerald-950 focus:!border-emerald-500 focus:!ring-[12px] focus:!ring-emerald-500/5 transition-all";
    const labelClass = "!text-emerald-950/40 !font-black !uppercase !tracking-widest !text-[10px] mb-2 ml-2";

    return (
        <div className="flex min-h-screen bg-white font-['Plus_Jakarta_Sans',sans-serif] overflow-hidden">
            <Head title="Register | RiceConnect" />

            {/* LEFT PANEL — Rice Terrace Visual */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-emerald-950 sticky top-0 h-screen">
                <div
                    className="absolute inset-0 z-0 scale-110"
                    style={{
                        backgroundImage: `url('/images/rice_field_hero.png')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <div className="absolute inset-0 bg-emerald-950/40 backdrop-blur-[2px] z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-black/40 z-20" />

                <div className="relative z-30 flex flex-col justify-center h-full px-20 text-white">
                    <div className="mb-12 group">
                        <Link href="/">
                            <img
                                src="/favicon.png"
                                alt="Rice Connect"
                                className="w-24 h-24 rounded-3xl shadow-2xl transform group-hover:rotate-6 transition-transform duration-500 object-cover"
                            />
                        </Link>
                    </div>

                    <h1 className="text-7xl font-black tracking-tighter mb-6 uppercase leading-[0.9]">
                        Rice<br /><span className="text-emerald-400">Connect</span>
                    </h1>

                    <p className="text-xl text-emerald-50/80 max-w-md font-medium leading-relaxed mb-12">
                        Join the ecosystem. Secure tracking and logistics for the modern grain supply chain.
                    </p>

                    <div className="flex items-center gap-6">
                        <div className="h-0.5 w-12 bg-emerald-500 rounded-full" />
                        <span className="text-xs font-black uppercase tracking-[0.4em] text-emerald-400">Network Registration</span>
                    </div>
                </div>

                <div className="absolute bottom-10 left-20 z-30 opacity-20">
                    <p className="text-[10px] font-black uppercase tracking-[0.5em]">System Instance: PH-ILO-2026</p>
                </div>
            </div>

            {/* RIGHT PANEL — Form */}
            <div className="flex-1 flex flex-col min-h-screen bg-[#f8faf9] relative overflow-y-auto">
                {/* Mobile branding */}
                <div className="lg:hidden flex flex-col items-center pt-10 pb-4">
                    <img src="/favicon.png" alt="Rice Connect" className="h-16 w-16 object-cover rounded-xl mb-4" />
                    <h2 className="text-3xl font-black text-emerald-950 tracking-tighter uppercase">Rice Connect</h2>
                </div>

                <div className="flex-1 flex items-start justify-center px-6 py-12 lg:px-12 xl:px-20">
                    <div className="w-full max-w-xl">
                        <div className="glass-card !bg-white !p-12 !rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(6,95,70,0.1)] border border-white relative z-10">
                            <div className="mb-10">
                                <h2 className="text-4xl font-black text-emerald-950 tracking-tight mb-3 italic uppercase">Sign Up</h2>
                                <p className="text-sm text-emerald-900/40 font-bold uppercase tracking-widest leading-relaxed">
                                    Create your partner account to access the platform.
                                </p>
                            </div>

                            <form onSubmit={submit} className="space-y-5">
                                {/* First + Last Name */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel htmlFor="first_name" value="First Name" className={labelClass} />
                                        <TextInput
                                            id="first_name"
                                            name="first_name"
                                            value={data.first_name}
                                            className={inputClass}
                                            onChange={(e) => setData('first_name', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.first_name} className="mt-2 ml-2" />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="last_name" value="Last Name" className={labelClass} />
                                        <TextInput
                                            id="last_name"
                                            name="last_name"
                                            value={data.last_name}
                                            className={inputClass}
                                            onChange={(e) => setData('last_name', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.last_name} className="mt-2 ml-2" />
                                    </div>
                                </div>

                                {/* Contact */}
                                <div>
                                    <InputLabel htmlFor="contact" value="Contact Number" className={labelClass} />
                                    <TextInput
                                        id="contact"
                                        name="contact"
                                        value={data.contact}
                                        className={inputClass}
                                        onChange={(e) => setData('contact', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.contact} className="mt-2 ml-2" />
                                </div>

                                {/* Role */}
                                <div>
                                    <InputLabel htmlFor="role" value="Register as:" className={labelClass} />
                                    <select
                                        id="role"
                                        name="role"
                                        value={data.role}
                                        className="block w-full px-6 py-4 bg-emerald-50/30 border-2 border-emerald-950/5 rounded-2xl font-bold text-emerald-950 focus:border-emerald-500 focus:ring-[12px] focus:ring-emerald-500/5 transition-all outline-none"
                                        onChange={(e) => setData('role', e.target.value)}
                                        required
                                    >
                                        <option value="farmer">Farmer</option>
                                        <option value="miller">Miller</option>
                                        <option value="retailer">Retailer</option>
                                        <option value="driver">Driver (Logistics)</option>
                                    </select>
                                    <InputError message={errors.role} className="mt-2 ml-2" />
                                </div>

                                {/* Driver credentials */}
                                {data.role === 'driver' && (
                                    <div className="p-6 bg-emerald-50/80 border-2 border-emerald-100 rounded-2xl space-y-4">
                                        <p className="text-[10px] font-black uppercase text-emerald-700 tracking-[0.3em]">Driver Credentials</p>
                                        <div>
                                            <InputLabel htmlFor="vehicle_type" value="Vehicle Type" className={labelClass} />
                                            <select
                                                id="vehicle_type"
                                                name="vehicle_type"
                                                value={data.vehicle_type}
                                                className="block w-full px-6 py-4 bg-white border-2 border-emerald-950/5 rounded-2xl font-bold text-emerald-950 focus:border-emerald-500 focus:ring-[12px] focus:ring-emerald-500/5 transition-all outline-none"
                                                onChange={(e) => setData('vehicle_type', e.target.value)}
                                                required
                                            >
                                                <option value="">Select Type...</option>
                                                <option value="Truck">Truck (Heavy Duty)</option>
                                                <option value="L300">L300 / Van</option>
                                                <option value="Motorcycle">Motorcycle</option>
                                                <option value="Tractor">Tractor / Trailer</option>
                                            </select>
                                            <InputError message={errors.vehicle_type} className="mt-2 ml-2" />
                                        </div>
                                        <div>
                                            <InputLabel htmlFor="license_number" value="License Number" className={labelClass} />
                                            <TextInput
                                                id="license_number"
                                                name="license_number"
                                                value={data.license_number}
                                                className="!block !w-full !px-6 !py-4 !bg-white !border-2 !border-emerald-950/5 !rounded-2xl !font-bold !text-emerald-950 focus:!border-emerald-500 focus:!ring-[12px] focus:!ring-emerald-500/5 transition-all"
                                                onChange={(e) => setData('license_number', e.target.value)}
                                                required
                                                placeholder="E.g. N01-XX-XXXXXX"
                                            />
                                            <InputError message={errors.license_number} className="mt-2 ml-2" />
                                        </div>
                                    </div>
                                )}

                                {/* Municipality */}
                                <div>
                                    <InputLabel htmlFor="municipality" value="Municipality" className={labelClass} />
                                    <div className="[&_input]:!block [&_input]:!w-full [&_input]:!px-6 [&_input]:!py-4 [&_input]:!bg-emerald-50/30 [&_input]:!border-2 [&_input]:!border-emerald-950/5 [&_input]:!rounded-2xl [&_input]:!font-bold [&_input]:!text-emerald-950">
                                        <MunicipalitySelect
                                            id="municipality"
                                            name="municipality"
                                            value={data.municipality}
                                            onChange={(e: any) => setData('municipality', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <InputError message={errors.municipality} className="mt-2 ml-2" />
                                </div>

                                {/* Province (read-only) */}
                                <div>
                                    <InputLabel htmlFor="province" value="Province" className={labelClass} />
                                    <TextInput
                                        id="province"
                                        name="province"
                                        value={data.province}
                                        className="!block !w-full !px-6 !py-4 !bg-emerald-50/10 !border-2 !border-emerald-950/5 !rounded-2xl !font-bold !text-emerald-950/50 cursor-not-allowed"
                                        readOnly
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <InputLabel htmlFor="email" value="Email" className={labelClass} />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className={inputClass}
                                        autoComplete="username"
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.email} className="mt-2 ml-2" />
                                </div>

                                {/* Password + Confirm */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <InputLabel htmlFor="password" value="Password" className={labelClass} />
                                        <TextInput
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className={inputClass}
                                            autoComplete="new-password"
                                            onChange={(e) => setData('password', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.password} className="mt-2 ml-2" />
                                    </div>
                                    <div>
                                        <InputLabel htmlFor="password_confirmation" value="Confirm Password" className={labelClass} />
                                        <TextInput
                                            id="password_confirmation"
                                            type="password"
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            className={inputClass}
                                            autoComplete="new-password"
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.password_confirmation} className="mt-2 ml-2" />
                                    </div>
                                </div>

                                {/* Submit */}
                                <PrimaryButton
                                    className="!w-full !py-6 !bg-emerald-600 hover:!bg-emerald-700 !text-white !font-black !rounded-2xl !transition-all !shadow-2xl !shadow-emerald-200 !transform hover:!scale-[0.98] active:!scale-95 !uppercase !tracking-[0.2em] !text-sm !flex !justify-center !border-none"
                                    disabled={processing}
                                >
                                    Complete Registration
                                </PrimaryButton>
                            </form>

                            <div className="mt-8 pt-8 border-t border-emerald-50 text-center">
                                <p className="text-sm font-bold text-emerald-950/30">
                                    Already registered?
                                    <Link
                                        href={route('login')}
                                        className="ms-2 font-black text-emerald-600 hover:text-emerald-400 transition-colors underline decoration-emerald-100 underline-offset-8"
                                    >
                                        Sign In here
                                    </Link>
                                </p>
                            </div>
                        </div>

                        <div className="mt-10 mb-12 text-center opacity-20">
                            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-950">
                                © 2026 Rice Connect Supply Chain Solutions
                            </p>
                        </div>
                    </div>
                </div>

                {/* Dot-grid pattern */}
                <div
                    className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: `radial-gradient(#065f46 1px, transparent 1px)`, backgroundSize: '40px 40px' }}
                />
            </div>
        </div>
    );
}