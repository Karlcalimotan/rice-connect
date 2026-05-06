import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-12 bg-transparent">
                <div className="mx-auto max-w-7xl space-y-12 sm:px-6 lg:px-8">
                    <div className="glass-header px-4 sm:px-0">
                        <div className="glass-header-icon"></div>
                        <h2 className="text-5xl font-black uppercase tracking-tighter text-emerald-950 leading-none">
                            Identity Space
                        </h2>
                    </div>
                    <div className="glass-card p-8 sm:p-16">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="glass-card p-8 sm:p-16">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="glass-card p-8 sm:p-16 border-rose-500/10">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
