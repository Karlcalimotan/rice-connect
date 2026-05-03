import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import React, { useMemo } from 'react';

// ─── Tiny inline bar chart ─────────────────────────────────────────────────
function BarChart({ data }: { data: { month: string; value: number }[] }) {
    const max = Math.max(...data.map(d => d.value), 1);
    return (
        <div className="flex items-end gap-1.5 h-28 w-full">
            {data.map((d, i) => (
                <div key={i} className="flex flex-col items-center flex-1 gap-1 group">
                    <div className="relative flex-1 w-full flex items-end">
                        <div
                            className="w-full rounded-t-lg bg-emerald-500 group-hover:bg-emerald-400 transition-all duration-500 relative"
                            style={{ height: `${Math.max((d.value / max) * 100, 4)}%` }}
                        >
                            {d.value > 0 && (
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-emerald-900 text-white text-[9px] font-black px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                                    {d.value}
                                </div>
                            )}
                        </div>
                    </div>
                    <span className="text-[8px] font-black text-emerald-950/30 uppercase">{d.month}</span>
                </div>
            ))}
        </div>
    );
}

// ─── Stat card ─────────────────────────────────────────────────────────────
function StatCard({
    label, value, sub, accent = 'emerald', icon,
}: {
    label: string; value: string | number; sub?: string; accent?: string; icon: string;
}) {
    const colours: Record<string, string> = {
        emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        blue:    'bg-blue-50    text-blue-700    border-blue-200',
        orange:  'bg-orange-50  text-orange-700  border-orange-200',
        violet:  'bg-violet-50  text-violet-700  border-violet-200',
        rose:    'bg-rose-50    text-rose-700    border-rose-200',
        amber:   'bg-amber-50   text-amber-700   border-amber-200',
    };
    const cls = colours[accent] ?? colours.emerald;
    return (
        <div className={`glass-card p-6 flex flex-col gap-3 border ${cls} relative overflow-hidden group`}>
            <div className="absolute -right-4 -bottom-4 text-6xl opacity-10 group-hover:opacity-20 transition-opacity select-none pointer-events-none">{icon}</div>
            <span className="text-[9px] font-black uppercase tracking-[0.35em] opacity-60">{label}</span>
            <p className="text-3xl font-black leading-none tracking-tighter">{value}</p>
            {sub && <p className="text-[10px] font-bold opacity-50 uppercase">{sub}</p>}
        </div>
    );
}

// ─── Donut-style variety breakdown ─────────────────────────────────────────
function VarietyBreakdown({ data }: { data: Record<string, number> }) {
    const entries = Object.entries(data);
    const total   = entries.reduce((s, [, v]) => s + v, 0) || 1;
    const palette = ['bg-emerald-500','bg-blue-500','bg-orange-500','bg-violet-500','bg-rose-500','bg-amber-500'];
    return (
        <div className="space-y-2">
            {entries.length === 0 && (
                <p className="text-[11px] font-black uppercase text-emerald-950/30 tracking-widest">No variety data yet.</p>
            )}
            {entries.map(([variety, count], i) => (
                <div key={variety} className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${palette[i % palette.length]}`} />
                    <div className="flex-1">
                        <div className="flex justify-between mb-0.5">
                            <span className="text-[11px] font-black uppercase text-emerald-950/70">{variety}</span>
                            <span className="text-[11px] font-black text-emerald-950/50">{count}</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-emerald-950/5 overflow-hidden">
                            <div
                                className={`h-full rounded-full ${palette[i % palette.length]} transition-all duration-700`}
                                style={{ width: `${(count / total) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

// ─── Role-specific panels ───────────────────────────────────────────────────
function FarmerPanel({ stats }: { stats: any }) {
    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
                <StatCard label="Total Batches"    value={stats.totalBatches}   icon="🌾" accent="emerald" />
                <StatCard label="Total Sacks"      value={stats.totalSacks}     icon="📦" accent="orange"  sub="bags logged" />
                <StatCard label="Weight Hauled"    value={`${(stats.totalWeightKg ?? 0).toLocaleString()} kg`} icon="⚖️" accent="blue" />
                <StatCard label="Est. Earnings"    value={`₱${(stats.totalEarnings ?? 0).toLocaleString()}`}   icon="💰" accent="amber" />
                <StatCard label="Pending"          value={stats.pendingBatches}   icon="⏳" accent="rose"   />
                <StatCard label="In Transit"       value={stats.inTransitBatches} icon="🚚" accent="blue"   />
                <StatCard label="Completed"        value={stats.completedBatches} icon="✅" accent="emerald" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-card p-8">
                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-emerald-950/30 mb-6">Monthly Yield (Sacks)</p>
                    <BarChart data={stats.monthlyYield ?? []} />
                </div>
                <div className="glass-card p-8">
                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-emerald-950/30 mb-6">Yield by Variety</p>
                    <VarietyBreakdown data={stats.byVariety ?? {}} />
                </div>
            </div>
        </>
    );
}

function MillerPanel({ stats }: { stats: any }) {
    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
                <StatCard label="Palay Acquired"   value={stats.totalAcquired}   icon="🌾" accent="orange" />
                <StatCard label="Weight In"        value={`${(stats.totalWeightIn ?? 0).toLocaleString()} kg`} icon="⚖️" accent="blue" />
                <StatCard label="Total Orders"     value={stats.totalOrders}      icon="📋" accent="emerald" />
                <StatCard label="Revenue"          value={`₱${(stats.totalRevenue ?? 0).toLocaleString()}`}    icon="💰" accent="amber" />
                <StatCard label="Pending Orders"   value={stats.pendingOrders}    icon="⏳" accent="rose"   />
                <StatCard label="Completed Orders" value={stats.completedOrders}  icon="✅" accent="emerald" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-card p-8">
                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-emerald-950/30 mb-6">Monthly Orders</p>
                    <BarChart data={stats.monthlyOrders ?? []} />
                </div>
                <div className="glass-card p-8">
                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-emerald-950/30 mb-6">Palay by Variety</p>
                    <VarietyBreakdown data={stats.byVariety ?? {}} />
                </div>
            </div>
        </>
    );
}

function RetailerPanel({ stats }: { stats: any }) {
    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 mb-10">
                <StatCard label="Total Orders"     value={stats.totalOrders}      icon="📋" accent="blue"   />
                <StatCard label="In Transit"       value={stats.inTransit}        icon="🚚" accent="orange" />
                <StatCard label="Completed"        value={stats.completedOrders}  icon="✅" accent="emerald" />
                <StatCard label="Pending Orders"   value={stats.pendingOrders}    icon="⏳" accent="rose"   />
                <StatCard label="Total Spent"      value={`₱${(stats.totalSpent ?? 0).toLocaleString()}`}   icon="💳" accent="amber" />
                <StatCard label="Rice Received"    value={`${(stats.totalWeightKg ?? 0).toLocaleString()} kg`} icon="🍚" accent="violet" />
            </div>
            <div className="glass-card p-8">
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-emerald-950/30 mb-6">Monthly Orders</p>
                <BarChart data={stats.monthlyOrders ?? []} />
            </div>
        </>
    );
}

function DriverPanel({ stats }: { stats: any }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 mb-10">
            <StatCard label="Palay Deliveries"   value={stats.totalPalayDeliveries}  icon="🌾" accent="orange" />
            <StatCard label="Rice Deliveries"    value={stats.totalRiceDeliveries}   icon="🍚" accent="blue"   />
            <StatCard label="Completed"          value={stats.completedDeliveries}   icon="✅" accent="emerald" />
            <StatCard label="Weight Hauled"      value={`${(stats.totalWeightHauled ?? 0).toLocaleString()} kg`} icon="⚖️" accent="violet" />
            <StatCard label="Pending Palay"      value={stats.pendingPalay}          icon="⏳" accent="rose"   />
            <StatCard label="Palay In Transit"   value={stats.inTransitPalay}        icon="🚚" accent="blue"   />
        </div>
    );
}

function AdminPanel({ stats }: { stats: any }) {
    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
                <StatCard label="Total Users"     value={stats.totalUsers}     icon="👥" accent="violet"  />
                <StatCard label="Farmers"         value={stats.totalFarmers}   icon="🌾" accent="orange"  />
                <StatCard label="Millers"         value={stats.totalMillers}   icon="🏭" accent="blue"    />
                <StatCard label="Retailers"       value={stats.totalRetailers} icon="🏬" accent="emerald" />
                <StatCard label="Drivers"         value={stats.totalDrivers}   icon="🚚" accent="amber"   />
                <StatCard label="Total Batches"   value={stats.totalBatches}   icon="📦" accent="orange"  />
                <StatCard label="Total Orders"    value={stats.totalOrders}    icon="📋" accent="blue"    />
                <StatCard label="Weight Processed" value={`${(stats.totalWeightKg ?? 0).toLocaleString()} kg`} icon="⚖️" accent="emerald" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-card p-8">
                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-emerald-950/30 mb-6">Monthly Harvest Batches</p>
                    <BarChart data={stats.monthlyBatches ?? []} />
                </div>
                <div className="glass-card p-8">
                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-emerald-950/30 mb-6">Monthly Orders</p>
                    <BarChart data={stats.monthlyOrders ?? []} />
                </div>
            </div>
        </>
    );
}

// ─── Role label map ─────────────────────────────────────────────────────────
const roleLabel: Record<string, string> = {
    farmer:   'Yield & Earnings',
    miller:   'Processing & Revenue',
    retailer: 'Purchase Flow',
    driver:   'Delivery Performance',
    admin:    'Platform Overview',
};

// ─── Main Page ──────────────────────────────────────────────────────────────
export default function Analytics({ stats, role }: { stats: any; role: string }) {
    return (
        <AuthenticatedLayout header="Analytics">
            <Head title="Analytics" />

            <div className="py-4">
                {/* Page Header */}
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-3 h-10 bg-emerald-600 rounded-full shadow-[0_0_15px_rgba(5,150,105,0.4)]" />
                    <div>
                        <h2 className="text-5xl font-black uppercase tracking-tighter text-emerald-950 leading-none">
                            Analytics
                        </h2>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600 mt-1">
                            {roleLabel[role] ?? 'Performance Metrics'}
                        </p>
                    </div>
                </div>

                {/* Role panels */}
                {role === 'farmer'   && <FarmerPanel   stats={stats} />}
                {role === 'miller'   && <MillerPanel   stats={stats} />}
                {role === 'retailer' && <RetailerPanel stats={stats} />}
                {role === 'driver'   && <DriverPanel   stats={stats} />}
                {role === 'admin'    && <AdminPanel    stats={stats} />}
            </div>
        </AuthenticatedLayout>
    );
}
