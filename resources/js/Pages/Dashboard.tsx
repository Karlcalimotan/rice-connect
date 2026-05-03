import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Dashboard() {
    const { auth } = usePage().props as any;

    useEffect(() => {
        if (auth.user.role === 'farmer') {
            window.location.href = route('farmer.harvest');
        } else if (auth.user.role === 'miller') {
            window.location.href = route('miller.marketplace');
        } else if (auth.user.role === 'retailer') {
            window.location.href = route('retailer.marketplace');
        } else if (auth.user.role === 'admin') {
            window.location.href = route('admin.dashboard');
        } else if (auth.user.role === 'driver') {
            window.location.href = route('driver.dashboard');
        }
    }, [auth.user.role]);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 border-4 border-black font-black uppercase tracking-widest animate-pulse">
                            Redirecting to your hub...
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
