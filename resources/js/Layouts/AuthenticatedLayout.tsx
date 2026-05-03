import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user as any;

    // State for the Sidebar (Mobile)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Only close sidebar on link clicks if we are on mobile
    const handleNavClick = () => {
        if (window.innerWidth < 1024) {
            setIsSidebarOpen(false);
        }
    };

    return (
        <div className="h-screen bg-gray-100 flex overflow-hidden">
            {/* --- 1. THE HIDDEN SIDEBAR (Slides in from left) --- */}
            <div 
                className={`fixed lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col inset-y-0 left-0 z-50 w-64 bg-white shadow-2xl lg:shadow-none transform transition-transform duration-300 ease-in-out border-r border-gray-200 ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                } lg:block`}
            >
                <div className="flex h-16 items-center justify-between px-6 border-b bg-green-50">
                    <span className="text-xl font-black text-green-700 uppercase tracking-tighter">Rice Connect</span>
                    <button onClick={() => setIsSidebarOpen(false)} className="text-gray-500 hover:text-black text-2xl font-bold lg:hidden">✕</button>
                </div>

                <nav className="p-4 space-y-2">
                    <p className="text-[10px] font-black text-gray-400 uppercase px-3 tracking-widest">General</p>
                    <NavLink 
                        href={route('dashboard')} 
                        active={route().current('dashboard')} 
                        className="w-full"
                        onClick={handleNavClick}
                    >
                        Dashboard
                    </NavLink>

                    {/* --- ROLE BASED LINKS --- */}
                    
                    {/* FARMER LINKS */}
                    {user.role === 'farmer' && (
                        <div className="pt-4 space-y-1">
                            <p className="text-[10px] font-black text-gray-400 uppercase px-3 tracking-widest mb-2">Farmer Tools</p>
                            <NavLink 
                                href={route('farmer.harvest')} 
                                active={route().current('farmer.harvest')} 
                                className="w-full"
                                onClick={handleNavClick}
                            >
                                My Harvest Log
                            </NavLink>
                            <NavLink 
                                href={route('farmer.harvest.create')} 
                                active={route().current('farmer.harvest.create')} 
                                className="w-full"
                                onClick={handleNavClick}
                            >
                                Post New Batch
                            </NavLink>
                        </div>
                    )}

                    {/* MILLER LINKS */}
                    {user.role === 'miller' && (
                        <div className="pt-4 space-y-1">
                            <p className="text-[10px] font-black text-gray-400 uppercase px-3 tracking-widest mb-2">Milling Station</p>
                            <NavLink 
                                href={route('miller.marketplace')} 
                                active={route().current('miller.marketplace')} 
                                className="w-full"
                                onClick={handleNavClick}
                            >
                                MARKET PLACE
                            </NavLink>
                            <NavLink 
                                href={route('miller.incoming')} 
                                active={route().current('miller.incoming')} 
                                className="w-full"
                                onClick={handleNavClick}
                            >
                                Incoming Palay
                            </NavLink>
                            <NavLink 
                                href={route('miller.inventory')} 
                                active={route().current('miller.inventory')} 
                                className="w-full"
                                onClick={handleNavClick}
                            >
                                Inventory
                            </NavLink>
                            <NavLink 
                                href={route('miller.processed_inventory')} 
                                active={route().current('miller.processed_inventory')}
                                className="w-full uppercase font-bold text-sm"
                                onClick={handleNavClick}
                            >
                                Finished Rice
                            </NavLink>
                            <NavLink 
                                href={route('miller.orders')} 
                                active={route().current('miller.orders')}
                                className="w-full"
                                onClick={handleNavClick}
                            >
                                📋 Customer Orders
                            </NavLink>
                            <NavLink 
                                href={route('miller.shipping_settings')} 
                                active={route().current('miller.shipping_settings')}
                                className="w-full"
                                onClick={handleNavClick}
                            >
                                🚚 Shipping Settings
                            </NavLink>
                        </div>
                    )}

                    {/* RETAILER LINKS */}
                    {user.role === 'retailer' && (
                        <div className="pt-4 space-y-1">
                            <p className="text-[10px] font-black text-gray-400 uppercase px-3 tracking-widest mb-2">
                                Retail Market
                            </p>
                            <NavLink 
                                href={route('retailer.marketplace')} 
                                active={route().current('retailer.marketplace')}
                                className="w-full text-left" 
                                onClick={handleNavClick}
                            >
                                MARKET PLACE
                            </NavLink>
                            <NavLink 
                                href={route('retailer.purchases')} 
                                active={route().current('retailer.purchases')}
                                className="w-full text-left" 
                                onClick={handleNavClick}
                            >
                                📦 My Purchases
                            </NavLink>
                        </div>
                    )}

                    {/* ADMIN LINKS */}
                    {user.role === 'admin' && (
                        <div className="pt-4 space-y-1">
                            <p className="text-[10px] font-black text-gray-400 uppercase px-3 tracking-widest mb-2">
                                Administration
                            </p>
                            <NavLink 
                                href={route('admin.dashboard')} 
                                active={route().current('admin.dashboard')}
                                className="w-full text-left" 
                                onClick={handleNavClick}
                            >
                                🔍 Observer Dashboard
                            </NavLink>
                            <NavLink 
                                href={route('admin.municipalities')} 
                                active={route().current('admin.municipalities')}
                                className="w-full text-left" 
                                onClick={handleNavClick}
                            >
                                🚚 Municipalities
                            </NavLink>
                        </div>
                    )}
                </nav>
            </div>

            {/* --- 2. MAIN CONTENT AREA --- */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between items-center lg:justify-end">
                            <div className="flex items-center lg:hidden">
                                {/* THE HAMBURGER BUTTON (☰) */}
                                <button
                                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                    className="p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none border-2 border-transparent active:border-black transition-all"
                                >
                                    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>

                                <div className="ml-4 flex shrink-0 items-center">
                                    <Link href="/">
                                        <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                    </Link>
                                </div>
                            </div>

                            {/* User Dropdown */}
                            <div className="flex items-center">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button type="button" className="inline-flex items-center rounded-md border-2 border-black bg-white px-4 py-2 text-sm font-black uppercase tracking-tighter text-gray-800 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-50 transition-all">
                                            {user.first_name} {user.last_name}
                                            <svg className="-me-0.5 ms-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">Log Out</Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </nav>

                <main className="flex-1 overflow-y-auto bg-gray-50">
                    {/* Header Title Section inside scrollable area */}
                    {header && (
                        <header className="bg-white border-b border-gray-100">
                            <div className="mx-auto max-w-7xl p-4 md:p-8 lg:p-10 lg:py-6 flex justify-center text-center">
                                <h1 className="text-2xl font-black uppercase tracking-tight text-gray-900">{header}</h1>
                            </div>
                        </header>
                    )}

                    <div className="mx-auto max-w-7xl p-4 md:p-8 lg:p-10">
                        {children}
                    </div>
                </main>
            </div>

            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
}