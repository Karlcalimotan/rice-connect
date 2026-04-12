import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
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
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                {/* Name Row */}
                <div className="flex gap-4">
                    <div className="flex-1">
                        <InputLabel htmlFor="first_name" value="First Name" />
                        <TextInput
                            id="first_name"
                            name="first_name"
                            value={data.first_name}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('first_name', e.target.value)}
                            required
                        />
                        <InputError message={errors.first_name} className="mt-2" />
                    </div>

                    <div className="flex-1">
                        <InputLabel htmlFor="last_name" value="Last Name" />
                        <TextInput
                            id="last_name"
                            name="last_name"
                            value={data.last_name}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('last_name', e.target.value)}
                            required
                        />
                        <InputError message={errors.last_name} className="mt-2" />
                    </div>
                </div>

                {/* Contact Number */}
                <div className="mt-4">
                    <InputLabel htmlFor="contact" value="Contact Number" />
                    <TextInput
                        id="contact"
                        name="contact"
                        value={data.contact}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('contact', e.target.value)}
                        required
                    />
                    <InputError message={errors.contact} className="mt-2" />
                </div>

                {/* Role Selection */}
                <div className="mt-4">
                    <InputLabel htmlFor="role" value="Register as:" />
                    <select
                        id="role"
                        name="role"
                        value={data.role}
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        onChange={(e) => setData('role', e.target.value)}
                        required
                    >
                        <option value="farmer">Farmer</option>
                        <option value="miller">Miller</option>
                        <option value="retailer">Retailer</option>
                    </select>
                    <InputError message={errors.role} className="mt-2" />
                </div>

                {/* Municipality */}
                <div className="mt-4">
                    <InputLabel htmlFor="municipality" value="Municipality" />
                    <MunicipalitySelect
                        id="municipality"
                        name="municipality"
                        value={data.municipality}
                        onChange={(e) => setData('municipality', e.target.value)}
                        required
                    />
                    <InputError message={errors.municipality} className="mt-2" />
                </div>

                {/* Province */}
                <div className="mt-4">
                    <InputLabel htmlFor="province" value="Province" />
                    <TextInput
                        id="province"
                        name="province"
                        value={data.province}
                        className="mt-1 block w-full bg-gray-100 cursor-not-allowed"
                        readOnly
                    />
                    <InputError message={errors.province} className="mt-2" />
                </div>

                {/* Email */}
                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* Password */}
                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Confirm Password */}
                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route('login')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}