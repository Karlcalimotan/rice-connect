import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState, useEffect } from 'react';

// Custom SVG Icons (Lucide-inspired line art)
const Icons = {
    Console: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="4" strokeWidth="2"/><path d="M3 9h18" strokeWidth="2"/><path d="M9 21V9" strokeWidth="2"/></svg>,
    Harvest: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M7 20l3-7-3-7" strokeWidth="2"/><path d="M13 20l3-7-3-7" strokeWidth="2"/><path d="M19 20l3-7-3-7" strokeWidth="2"/></svg>,
    Market: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 3h18l-1 12H4L3 3z" strokeWidth="2"/><circle cx="9" cy="20" r="1" strokeWidth="2"/><circle cx="15" cy="20" r="1" strokeWidth="2"/><path d="M12 3v12" strokeWidth="2"/></svg>,
    Inventory: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2"/><path d="M3 9h18M3 15h18" strokeWidth="2"/><path d="M9 3v18M15 3v18" strokeWidth="2"/></svg>,
    Orders: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4" strokeWidth="2"/><path d="M3 3h18l-1 18H4L3 3z" strokeWidth="2"/></svg>,
    Logistics: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" strokeWidth="2"/><path d="M9 22V12h6v10" strokeWidth="2"/></svg>,
    Settings: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" strokeWidth="2"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" strokeWidth="2"/></svg>,
    User: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeWidth="2"/><circle cx="12" cy="7" r="4" strokeWidth="2"/></svg>,
    Analytics: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 3v18h18" strokeWidth="2" strokeLinecap="round"/><path d="M7 16l4-6 4 4 4-8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
};

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user as any;
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [localNotifications, setLocalNotifications] = useState(user?.notifications || []);

    useEffect(() => {
        setLocalNotifications(user?.notifications || []);
    }, [user?.notifications]);

    const handleMarkAsRead = (id: string) => {
        setLocalNotifications((prev: any) => 
            prev.map((n: any) => n.id === id ? { ...n, notification_status: 'read' } : n)
        );
        import('@inertiajs/react').then(({ router }) => {
            router.post(route('notifications.mark_as_read', id), {}, {
                preserveScroll: true,
                preserveState: true,
            });
        });
    };

    const handleNavClick = () => {
        if (window.innerWidth < 1024) {
            setIsSidebarOpen(false);
        }
    };

    return (
        <div 
            className="h-screen flex overflow-hidden selection:bg-emerald-200 selection:text-emerald-900 lush-gradient relative font-['Plus_Jakarta_Sans',sans-serif]"
            style={{
                backgroundImage: `url('/images/rice_field_hero.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            {/* Layered Technical Overlays */}
            <div className="absolute inset-0 bg-white/20 backdrop-saturate-[1.4] pointer-events-none"></div>
            <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-white/30 to-transparent pointer-events-none"></div>
            
            {/* Architectural Background Pattern */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `radial-gradient(#065f46 1px, transparent 1px)`, backgroundSize: '48px 48px' }}></div>

            {/* --- 1. THE 2026 FLOATING SIDEBAR --- */}
            <aside 
                className={`fixed inset-y-0 left-0 z-50 w-80 
                bg-white/90 backdrop-blur-3xl border-r border-white shadow-[20px_0_100px_rgba(6,95,70,0.1)] 
                transform transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} 
                overflow-y-auto no-scrollbar`}
            >
                {/* Internal Decorative Grid */}
                <div className="absolute inset-x-0 top-0 h-96 opacity-[0.05] pointer-events-none border-b border-emerald-900/10" style={{ background: 'linear-gradient(90deg, transparent 96%, rgba(6,78,59,0.3) 96%), linear-gradient(0deg, transparent 96%, rgba(6,78,59,0.3) 96%)', backgroundSize: '24px 24px' }}></div>

                <div className="flex h-24 items-center justify-between px-8 mb-6 relative">
                    <ApplicationLogo className="scale-125 origin-left" />
                    <button 
                        onClick={() => setIsSidebarOpen(false)} 
                        className="text-emerald-900 border border-emerald-100 bg-white shadow-sm p-2 rounded-2xl lg:hidden transition-all active:scale-95"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="px-6 pb-20 space-y-8 relative">
                    {/* Brand Banner (Custom Crafted) */}
                    <div className="p-8 bg-[#064e3b] rounded-[2.5rem] shadow-[0_20px_40px_rgba(6,78,59,0.2)] relative overflow-hidden group">
                        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-emerald-400 opacity-20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                        <p className="text-[10px] font-black text-emerald-100/40 uppercase tracking-[0.4em] mb-2 leading-none">System Core</p>
                        <p className="text-2xl font-extrabold text-white leading-none tracking-tighter">RiceConnect</p>
                        <p className="text-[10px] text-emerald-400 font-bold mt-3 border-t border-white/10 pt-3">v2.0.26 Build</p>
                    </div>

                    <nav className="space-y-8">
                        {/* Principal Navigation */}
                        <div className="space-y-2">
                            <p className="text-[9px] font-black text-emerald-950/20 uppercase px-4 tracking-[0.5em] mb-4">Core Interface</p>
                            <NavLink href={route('analytics')} active={route().current('analytics')} onClick={handleNavClick}>
                                <Icons.Analytics />
                                <span>Analytics</span>
                            </NavLink>
                        </div>

                        {/* Role-Specific Workspace */}
                        <div className="space-y-2">
                            <p className="text-[9px] font-black text-emerald-950/20 uppercase px-4 tracking-[0.5em] mb-4">Operations</p>
                            {user.role === 'farmer' && (
                                <>
                                    <NavLink href={route('farmer.harvest')} active={route().current('farmer.harvest')} onClick={handleNavClick}>
                                        <Icons.Console /> <span>Harvest Logs</span>
                                    </NavLink>
                                    <NavLink href={route('farmer.harvest.create')} active={route().current('farmer.harvest.create')} onClick={handleNavClick}>
                                        <Icons.Console /> <span>Post Yield</span>
                                    </NavLink>
                                </>
                            )}

                            {user.role === 'miller' && (
                                <>
                                    <NavLink href={route('miller.incoming')} active={route().current('miller.incoming')} onClick={handleNavClick}>
                                        <Icons.Market /> <span>Queue Management</span>
                                    </NavLink>
                                    <NavLink href={route('miller.inventory')} active={route().current('miller.inventory')} onClick={handleNavClick}>
                                        <Icons.Inventory /> <span>Milling Efficiency</span>
                                    </NavLink>
                                    <NavLink href={route('miller.marketplace')} active={route().current('miller.marketplace')} onClick={handleNavClick}>
                                        <Icons.Market /> <span>Acquisition</span>
                                    </NavLink>
                                    <NavLink href={route('miller.orders')} active={route().current('miller.orders')} onClick={handleNavClick}>
                                        <Icons.Orders /> <span>Fulfillment</span>
                                    </NavLink>
                                    <NavLink href={route('miller.transport')} active={route().current('miller.transport')} onClick={handleNavClick}>
                                        <Icons.Logistics /> <span>Logistics</span>
                                    </NavLink>
                                </>
                            )}

                            {user.role === 'retailer' && (
                                <>
                                    <NavLink href={route('retailer.purchases')} active={route().current('retailer.purchases')} onClick={handleNavClick}>
                                        <Icons.Orders /> <span>Inventory Tracking</span>
                                    </NavLink>
                                    <NavLink href={route('retailer.orders')} active={route().current('retailer.orders')} onClick={handleNavClick}>
                                        <Icons.Orders /> <span>My Orders</span>
                                    </NavLink>
                                    <NavLink href={route('retailer.marketplace')} active={route().current('retailer.marketplace')} onClick={handleNavClick}>
                                        <Icons.Market /> <span>Marketplace</span>
                                    </NavLink>
                                </>
                            )}

                            {user.role === 'driver' && (
                                <NavLink href={route('driver.dashboard')} active={route().current('driver.dashboard')} onClick={handleNavClick}>
                                    <Icons.Logistics /> <span>Active Routes</span>
                                </NavLink>
                            )}

                            {user.role === 'admin' && (
                                <>
                                    <NavLink href={route('admin.dashboard')} active={route().current('admin.dashboard')} onClick={handleNavClick}>
                                        <Icons.Console /> <span>Market Watch</span>
                                    </NavLink>
                                    <NavLink href={route('admin.municipalities')} active={route().current('admin.municipalities')} onClick={handleNavClick}>
                                        <Icons.Logistics /> <span>Location Tracker</span>
                                    </NavLink>
                                </>
                            )}
                        </div>

                        {/* System Preferences */}
                        <div className="space-y-2">
                            <p className="text-[9px] font-black text-emerald-950/20 uppercase px-4 tracking-[0.5em] mb-4">Configuration</p>
                            
                            {user.role === 'miller' && (
                                <NavLink href={route('miller.shipping_settings')} active={route().current('miller.shipping_settings')} onClick={handleNavClick}>
                                    <Icons.Settings /> <span>Logistics Auth</span>
                                </NavLink>
                            )}
                            
                            <NavLink href={route('profile.edit')} active={route().current('profile.edit')} onClick={handleNavClick}>
                                <Icons.User /> <span>Identity Space</span>
                            </NavLink>
                        </div>
                    </nav>
                </div>
            </aside>

            {/* --- 2. MAIN CONTENT AREA --- */}
            <div className="flex-1 flex flex-col min-w-0 relative lg:ml-80">
                
                {/* --- PINNED TOP NAVBAR --- */}
                <header className="sticky top-0 z-40 px-6 py-6 lg:px-12 bg-white/10 backdrop-blur-xl border-b border-white/10">
                    <nav className="flex items-center justify-between transition-all duration-500">
                        <div className="flex items-center gap-10">
                            <button
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                className="lg:hidden p-4 rounded-2xl text-emerald-950 bg-white shadow-xl border border-emerald-50 active:scale-95 transition-all"
                            >
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>

                            <div className="hidden lg:flex flex-col">
                                <h2 className="text-[10px] font-black text-emerald-900/30 uppercase tracking-[0.4em] leading-none mb-2">Authenticated Data</h2>
                                <h1 className="text-2xl font-extrabold text-emerald-950 tracking-tighter leading-none italic">{header || 'Platform Console'}</h1>
                            </div>
                        </div>

                        <div className="flex items-center gap-10">
                            {/* Animated Network Status Badge */}
                            <div className="hidden sm:flex items-center gap-4 px-6 py-3 bg-emerald-500/5 rounded-full border border-emerald-500/10">
                                <div className="relative flex h-2.5 w-2.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                                </div>
                            {/* Notification Bell */}
                            <div className="relative group">
                                <button className="p-3 bg-white shadow-sm border border-emerald-50 rounded-full relative hover:shadow-md transition-all active:scale-95">
                                    <svg className="w-5 h-5 text-emerald-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    {localNotifications?.filter((n: any) => n.notification_status === 'unread').length > 0 && (
                                        <span className="absolute top-0 right-0 h-4 w-4 bg-rose-500 text-white text-[8px] font-black flex items-center justify-center rounded-full border-2 border-white shadow-sm animate-bounce">
                                            {localNotifications.filter((n: any) => n.notification_status === 'unread').length}
                                        </span>
                                    )}
                                </button>
                                
                                {/* Dropdown for Notifications */}
                                <div className="absolute right-0 mt-4 w-80 bg-white/95 backdrop-blur-3xl border border-emerald-50 rounded-[2rem] shadow-[0_30px_60px_rgba(6,95,70,0.15)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 z-50 p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <p className="text-[10px] font-black text-emerald-900 uppercase tracking-widest">Alerts Center</p>
                                        <span className="text-[8px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded uppercase">Real-time</span>
                                    </div>
                                    <div className="space-y-6 max-h-96 overflow-y-auto no-scrollbar">
                                        {/* 1. UNREAD SECTION: Action Required */}
                                        <div className="space-y-3">
                                            <p className="text-[8px] font-black text-rose-500 uppercase tracking-[0.2em] px-2 mb-2">Action Required</p>
                                            {localNotifications?.filter((n: any) => n.notification_status === 'unread').length > 0 ? (
                                                localNotifications.filter((n: any) => n.notification_status === 'unread').map((n: any) => (
                                                    <div 
                                                        key={n.id} 
                                                        className="p-4 rounded-2xl border-2 border-emerald-100 bg-emerald-50/50 hover:bg-emerald-50 transition-all cursor-pointer group/item shadow-sm hover:shadow-md"
                                                        onClick={() => handleMarkAsRead(n.id)}
                                                    >
                                                        <div className="flex justify-between items-start gap-3">
                                                            <p className="text-xs font-bold text-emerald-950 leading-snug">{n.data?.message}</p>
                                                            <span className="shrink-0 bg-rose-500 text-white text-[7px] font-black px-2 py-1 rounded uppercase animate-pulse whitespace-nowrap shadow-sm">
                                                                {n.data?.date ? new Date(n.data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'NEW'}
                                                            </span>
                                                        </div>
                                                        <p className="text-[9px] text-emerald-500 mt-2 font-black uppercase tracking-widest italic">
                                                            {new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </p>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="py-4 text-center border-2 border-dashed border-emerald-950/5 rounded-2xl bg-gray-50/30">
                                                    <p className="text-[9px] font-black text-emerald-950/20 uppercase tracking-[0.2em]">All Caught Up</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* 2. READ SECTION: History Toggle */}
                                        {localNotifications?.filter((n: any) => n.notification_status === 'read').length > 0 && (
                                            <div className="pt-4 border-t border-emerald-950/5">
                                                <button 
                                                    onClick={() => setShowHistory(!showHistory)}
                                                    className="w-full flex items-center justify-between px-2 py-2 text-[8px] font-black text-gray-400 uppercase tracking-[0.2em] hover:text-emerald-600 transition-colors"
                                                >
                                                    <span>Logistics History ({localNotifications.filter((n: any) => n.notification_status === 'read').length})</span>
                                                    <svg className={`w-3 h-3 transition-transform ${showHistory ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path d="M19 9l-7 7-7-7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                </button>
                                                
                                                {showHistory && (
                                                    <div className="space-y-3 mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                                        {localNotifications.filter((n: any) => n.notification_status === 'read').map((n: any) => (
                                                            <div 
                                                                key={n.id} 
                                                                className="p-3 rounded-xl border border-gray-100 bg-gray-50 opacity-60 grayscale transition-all"
                                                            >
                                                                <div className="flex justify-between items-start gap-3">
                                                                    <p className="text-[11px] font-bold text-gray-600 leading-tight">{n.data?.message}</p>
                                                                    <span className="shrink-0 text-emerald-600 text-xs font-black">✓</span>
                                                                </div>
                                                                <p className="text-[8px] text-gray-400 mt-1.5 font-black uppercase tracking-widest">
                                                                    {new Date(n.created_at).toLocaleDateString()} • {new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <span className="text-[10px] font-black text-emerald-800 uppercase tracking-[0.2em]">Real-time Sync Active</span>
                        </div>

                            {/* User Profile Menu with 2026 Premium Pill */}
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button type="button" className="flex items-center gap-4 p-2 pr-8 rounded-full bg-white shadow-[0_10px_30px_rgba(6,78,59,0.06)] border border-emerald-50 hover:shadow-xl hover:border-emerald-100 hover:-translate-y-0.5 transition-all duration-500 group">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#064e3b] to-[#042e24] flex items-center justify-center text-white font-extrabold text-sm shadow-xl group-hover:scale-105 transition-transform">
                                            {user.first_name[0]}{user.last_name[0]}
                                        </div>
                                        <div className="flex flex-col items-start">
                                            <span className="text-sm font-extrabold text-emerald-950 truncate max-w-[120px] leading-tight mb-1">{user.first_name}</span>
                                            <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest leading-none">
                                                {user.role === 'farmer' ? 'Farmer' : user.role === 'miller' ? 'Miller' : user.role === 'retailer' ? 'Retailer' : user.role === 'driver' ? 'Driver' : 'Admin'}
                                            </span>
                                        </div>
                                        <svg className="h-4 w-4 text-emerald-300 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="3"/></svg>
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content contentClasses="py-6 bg-white/90 backdrop-blur-3xl border border-white rounded-[3rem] shadow-[0_40px_80px_rgba(6,95,70,0.15)] mt-6 ring-0">
                                    <div className="px-10 py-6 border-b border-emerald-950/5 mb-4 text-left">
                                        <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-2">Logged in as</p>
                                        <p className="text-[12px] font-extrabold text-emerald-950 truncate leading-none">{user.email}</p>
                                    </div>
                                    <div className="px-3 space-y-1">
                                        <Dropdown.Link href={route('profile.edit')} className="px-8 py-4 rounded-[1.5rem] hover:bg-emerald-50 font-extrabold text-emerald-950/80 hover:text-emerald-950 transition-all">
                                            My Account Settings
                                        </Dropdown.Link>
                                        <div className="mx-6 h-px bg-emerald-950/5"></div>
                                        <Dropdown.Link href={route('logout')} method="post" as="button" className="px-8 py-4 rounded-[1.5rem] hover:bg-rose-50 font-black text-rose-600 uppercase text-[10px] tracking-[0.2em] transition-all">
                                            Log Out
                                        </Dropdown.Link>
                                    </div>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </nav>
                </header>

                <main className="flex-1 overflow-y-auto no-scrollbar relative p-6 lg:p-12">
                    {/* Layered Technical Overlays */}
                    <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>

                    <div className="relative z-10 mx-auto max-w-7xl pb-32">
                        <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
                            {children}
                        </section>
                    </div>
                </main>
            </div>

            {/* Premium Mobile Overlay */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-[#042e24]/40 backdrop-blur-3xl z-40 transition-all duration-700 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
}