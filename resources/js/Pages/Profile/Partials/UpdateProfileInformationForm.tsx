import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import MunicipalitySelect from '@/Components/MunicipalitySelect';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}) {
    const user = usePage().props.auth.user;

    // Change this part in your code:
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            // If your database uses first_name and last_name, do this:
            name: user.name || `${user.first_name} ${user.last_name}`,
            email: user.email,
            province: user.province || 'Iloilo',
            municipality: user.municipality || '',
            phone_number: user.phone_number || '',
        });
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header className="mb-10">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-1 h-4 bg-emerald-600 rounded-full shadow-[0_0_15px_rgba(5,150,105,0.4)]"></div>
                    <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-900/60">
                        Biographic Data
                    </h2>
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tighter text-emerald-950 leading-none">
                    Identity Records
                </h3>
                <p className="mt-4 text-[11px] font-bold text-emerald-950/40 uppercase tracking-widest leading-relaxed">
                    Update your account's profile information and authenticated contact details.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div>
                    <InputLabel htmlFor="province" value="Province" />

                    <TextInput
                        id="province"
                        className="mt-1 block w-full"
                        value={data.province}
                        onChange={(e) => setData('province', e.target.value)}
                        autoComplete="province"
                    />

                    <InputError className="mt-2" message={errors.province} />
                </div>

                <div>
                    <InputLabel htmlFor="municipality" value="Municipality" />

                    <MunicipalitySelect
                        id="municipality"
                        className="mt-1 block w-full"
                        value={data.municipality}
                        onChange={(e) => setData('municipality', e.target.value)}
                        required
                    />

                    <InputError className="mt-2" message={errors.municipality} />
                </div>

                <div>
                    <InputLabel htmlFor="phone_number" value="Phone Number (optional)" />

                    <TextInput
                        id="phone_number"
                        type="tel"
                        className="mt-1 block w-full"
                        value={data.phone_number}
                        onChange={(e) => setData('phone_number', e.target.value)}
                        autoComplete="tel"
                    />

                    <InputError className="mt-2" message={errors.phone_number} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-medium text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
