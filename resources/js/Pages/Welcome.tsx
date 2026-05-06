import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import React from 'react';


export default function Welcome({
    auth,
}: PageProps) {
    return (
        <>
            <Head title="RiceConnect - Decentralized Rice Supply Chain" />
            
            {/* GLOBAL FIXED BACKGROUND */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <img 
                    src="/images/rice_field_hero.png" 
                    className="w-full h-full object-cover scale-110"
                    alt=""
                />
                <div className="absolute inset-0 bg-emerald-950/40 backdrop-blur-[2px]"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>
            </div>

            <div className="relative z-10 min-h-screen bg-transparent text-white font-sans selection:bg-green-500 selection:text-black">
                
                {/* NAVIGATION */}
                <nav className="p-6 lg:p-10 flex justify-between items-center max-w-7xl mx-auto w-full sticky top-0 z-50 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                        <img src="/favicon.png" className="w-10 h-10 object-cover rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.4)] rotate-3" alt="RiceConnect Logo" />
                        <h1 className="text-2xl font-black uppercase tracking-tighter">RiceConnect</h1>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="px-6 py-2 bg-green-600 text-black font-black uppercase text-xs rounded-full hover:bg-white transition-all shadow-lg active:scale-95"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="text-xs font-black uppercase tracking-widest hover:text-green-500 transition-colors">Login</Link>
                                <Link
                                    href={route('register')}
                                    className="px-6 py-2 bg-white text-black font-black uppercase text-xs rounded-full hover:bg-green-500 transition-all shadow-lg active:scale-95"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </nav>

                {/* HERO SECTION */}
                <header className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-32 flex flex-col items-center text-center">
                    <div className="inline-block px-4 py-1.5 glass-card !bg-green-600/20 !rounded-full border border-green-500/30 mb-8">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-green-400">
                            Now Live: Palay-to-Retail Pipeline 2026
                        </p>
                    </div>
                    <h2 className="text-6xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-8 max-w-4xl">
                        Intelligence In Every <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Grain</span>.
                    </h2>
                    <p className="text-lg lg:text-xl text-gray-400 max-w-2xl mb-12 font-medium">
                        Revolutionizing the Philippine rice industry through decentralized handshakes and precision logistics.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 mb-20">
                        <Link href={route('register')} className="px-10 py-5 bg-green-600 text-black font-black uppercase text-sm rounded-3xl hover:bg-white hover:scale-105 transition-all shadow-2xl">
                            Start Trading Today
                        </Link>
                        <button className="px-10 py-5 glass-card !bg-white/10 text-white font-black uppercase text-sm rounded-3xl hover:!bg-white/20 transition-all">
                            View Live Market
                        </button>
                    </div>
                </header>

                {/* SECTION 1: THE DIGITAL JOURNEY (Interactive Timeline) */}
                <section className="max-w-7xl mx-auto px-6 lg:px-10 py-32">
                    <div className="flex flex-col items-center text-center mb-20">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-1.5 h-8 bg-green-600"></div>
                            <h3 className="text-4xl font-black uppercase tracking-tighter">The Digital Journey</h3>
                        </div>
                        <p className="text-gray-400 max-w-xl">From initial planting to final retail delivery, every grain is tracked via high-fidelity security handshakes.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                        {/* Connecting Line Backdrop */}
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -translate-y-1/2 hidden lg:block"></div>
                        
                        {[
                            { 
                                step: "01", 
                                role: "Farmer", 
                                title: "Precision Logging", 
                                desc: "Capturing field data and yield volume authorization. Real-time satellite-backed harvest prediction.",
                                icon: "🌾",
                                color: "emerald"
                            },
                            { 
                                step: "02", 
                                role: "Miller", 
                                title: "Smart Inventory", 
                                desc: "Automated sack-packing and bottleneck detection. Real-time milling status synchronization.",
                                icon: "🏭",
                                color: "green"
                            },
                            { 
                                step: "03", 
                                role: "Driver", 
                                title: "Intelligent Logistics", 
                                desc: "Dynamic fees calculated based on municipality distances and fuel costs in real-time.",
                                icon: "🚚",
                                color: "blue"
                            },
                            { 
                                step: "04", 
                                role: "Retailer", 
                                title: "Real-time Fulfillment", 
                                desc: "Guaranteed fresh stock with digital proof of delivery and direct payment clearance.",
                                icon: "🏪",
                                color: "emerald"
                            },
                        ].map((item, idx) => (
                            <div key={idx} className="glass-card !bg-black/40 !backdrop-blur-2xl p-10 group relative hover:-translate-y-4 transition-all duration-700 border-white/10">
                                <div className="absolute -top-6 -left-6 w-12 h-12 bg-green-500 text-black flex items-center justify-center font-black text-xs rotate-12 group-hover:rotate-0 transition-transform shadow-xl">
                                    {item.step}
                                </div>
                                <div className="text-5xl mb-8 grayscale group-hover:grayscale-0 transition-all">{item.icon}</div>
                                <p className="text-green-400 font-black text-[10px] uppercase tracking-[0.3em] mb-2">Role: {item.role}</p>
                                <h4 className="text-2xl font-black uppercase mb-4 tracking-tighter leading-tight text-white">{item.title}</h4>
                                <p className="text-sm text-gray-300 font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* SECTION 2: LOGISTICS INTELLIGENCE (Showcase) */}
                <section className="max-w-7xl mx-auto px-6 lg:px-10 py-32 bg-black/40 backdrop-blur-3xl rounded-[4rem] border border-white/10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="relative">
                            <div className="glass-card p-10 aspect-square flex flex-col justify-between overflow-hidden">
                                <div className="absolute top-0 right-0 p-8">
                                    <span className="text-6xl opacity-20">🧮</span>
                                </div>
                                <div>
                                    <p className="text-green-400 font-black text-xs uppercase tracking-widest mb-4">Calculation Model v2.4</p>
                                    <h3 className="text-5xl font-black uppercase tracking-tighter mb-8 leading-none text-white">The Logistics Formula</h3>
                                    
                                    <div className="space-y-4 font-mono">
                                        <div className="bg-black/60 p-6 border-2 border-green-500/30 rounded-2xl">
                                            <p className="text-green-400 text-xl font-bold">Fee = $Base + (Steps × $Extra)</p>
                                        </div>
                                        <p className="text-xs text-white/40 uppercase tracking-widest px-4">Variables: Municipal Distance + Sack Volume</p>
                                    </div>
                                </div>

                                <div className="mt-12 space-y-3">
                                    <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10">
                                        <span className="text-xs uppercase font-black text-white/60 tracking-widest">Base Rate</span>
                                        <span className="font-black text-white">₱150.00</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10">
                                        <span className="text-xs uppercase font-black text-white/60 tracking-widest">Extra per Step</span>
                                        <span className="font-black text-white">₱50.00</span>
                                    </div>
                                </div>
                            </div>
                            {/* Decorative element */}
                            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-green-500/20 rounded-full blur-[100px] -z-10"></div>
                        </div>

                        <div>
                            <h3 className="text-5xl font-black uppercase tracking-tighter mb-8 leading-none text-white">Iloilo Logistics Hub</h3>
                            <p className="text-gray-300 text-lg mb-12 font-medium">Real-time simulation of delivery fees across various municipalities based on our dynamic steps model.</p>
                            
                            <div className="space-y-4">
                                {[
                                    { hub: "Pavia Hub", target: "Santa Barbara", steps: 1, fee: 200, status: "Local" },
                                    { hub: "Pavia Hub", target: "Cabatuan", steps: 3, fee: 300, status: "Regional" },
                                    { hub: "Pavia Hub", target: "Passi City", steps: 8, fee: 550, status: "Distanced" },
                                ].map((sim, idx) => (
                                    <div key={idx} className="glass-card !bg-black/60 p-6 flex items-center justify-between group hover:!bg-emerald-900/40 transition-all border-white/5">
                                        <div className="flex items-center gap-6">
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-black text-green-400 uppercase tracking-[0.4em] mb-1">{sim.status} Zone</span>
                                                <p className="text-lg font-black uppercase tracking-tighter leading-none text-white">{sim.hub} → {sim.target}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-black text-white">₱{sim.fee.toFixed(2)}</p>
                                            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">{sim.steps} Step{sim.steps > 1 ? 's' : ''}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 3: ECOSYSTEM TRUST (Handshake Transparency) */}
                <section className="max-w-7xl mx-auto px-6 lg:px-10 py-32">
                    <div className="text-center mb-20">
                        <h3 className="text-5xl font-black uppercase tracking-tighter mb-4">Ecosystem Trust</h3>
                        <p className="text-gray-400 uppercase tracking-widest text-xs font-black">Secure. Verifiable. Immutable.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { 
                                title: "Peer-to-Peer Verification", 
                                desc: "The 'Waiting for Acceptance' protocol. Neither party can proceed until digital fingerprints are matched for quality and volume.",
                                icon: "🤝"
                            },
                            { 
                                title: "Inventory Locking", 
                                desc: "Once an order is placed, prices and delivery fees are 'locked'. No hidden surcharges, no unexpected fees.",
                                icon: "🔒"
                            },
                            { 
                                title: "Proof-of-Collection", 
                                desc: "Digital handshake required when Miller hands over stock to a Driver. Transfers liability instantly with geotagged proof.",
                                icon: "📱"
                            },
                        ].map((trust, idx) => (
                            <div key={idx} className="glass-card !bg-black/40 !backdrop-blur-2xl p-12 text-center relative overflow-hidden group border-white/10">
                                <div className="absolute inset-0 bg-green-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
                                <div className="text-6xl mb-8 relative z-10">{trust.icon}</div>
                                <h4 className="text-2xl font-black uppercase mb-6 tracking-tighter relative z-10 text-white">{trust.title}</h4>
                                <p className="text-sm text-gray-300 font-medium leading-relaxed relative z-10">{trust.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* SECTION 4: MARKET HIGHLIGHTS */}
                <section className="max-w-7xl mx-auto px-6 lg:px-10 py-32">
                    <div className="flex justify-between items-end mb-16">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-1.5 h-6 bg-green-600"></div>
                                <p className="text-xs font-black uppercase tracking-[0.3em] text-green-500">Live Varietals</p>
                            </div>
                            <h3 className="text-4xl font-black uppercase tracking-tighter leading-none">The Stock Market</h3>
                        </div>
                        <Link href={route('login')} className="text-xs font-black uppercase tracking-widest text-green-500 hover:text-white transition-colors">Trade Marketplace →</Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { variety: "Dinorado", color: "from-pink-500/10", yield: "98.4%", sacks: "1,240" },
                            { variety: "Sinandomeng", color: "from-blue-500/10", yield: "94.2%", sacks: "3,850" },
                            { variety: "RC-218", color: "from-yellow-500/10", yield: "99.1%", sacks: "890" },
                            { variety: "Jasmine", color: "from-purple-500/10", yield: "92.8%", sacks: "2,100" },
                        ].map((rice, idx) => (
                            <div key={idx} className="glass-card !bg-black/40 !backdrop-blur-2xl group p-2 overflow-hidden hover:!border-green-500/50 transition-all duration-700 border-white/10">
                                <div className={`h-48 rounded-[3rem] bg-gradient-to-br ${rice.color} to-transparent flex items-center justify-center text-7xl group-hover:scale-110 transition-transform duration-700`}>
                                    🍚
                                </div>
                                <div className="p-8">
                                    <h4 className="text-2xl font-black uppercase tracking-tighter mb-6 text-white">{rice.variety}</h4>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center border-b border-white/5 pb-3">
                                            <span className="text-[9px] font-black uppercase text-white/40 tracking-[0.2em]">Yield Auth.</span>
                                            <span className="text-green-400 font-black text-sm">{rice.yield}</span>
                                        </div>
                                        <div className="flex justify-between items-center pb-3">
                                            <span className="text-[9px] font-black uppercase text-white/40 tracking-[0.2em]">Global Stock</span>
                                            <span className="font-black text-sm text-white">{rice.sacks} Sks</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <footer className="max-w-7xl mx-auto px-6 lg:px-10 py-20 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center font-black text-[10px]">RC</div>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">
                            &copy; 2026 RiceConnect Logistics Ecosystem.
                        </p>
                    </div>
                    <div className="flex gap-12">
                        <a href="#" className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-white transition-colors">Privacy Security</a>
                        <a href="#" className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 hover:text-white transition-colors">Logistics Node</a>
                    </div>
                </footer>
            </div>
        </>
    );
}
