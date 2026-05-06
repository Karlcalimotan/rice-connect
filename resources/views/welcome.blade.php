<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scroll-smooth">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Rice Connect | Seed to Store Synchronization</title>
    <link rel="icon" type="image/png" href="{{ asset('favicon.png') }}">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

    <!-- Tailwind -->
    @vite(['resources/css/app.css', 'resources/js/app.tsx'])

    <style>
        body { font-family: 'Inter', sans-serif; }
        .glass-navbar {
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(12px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        }
        .text-gradient {
            background: linear-gradient(135deg, #065f46 0%, #059669 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .feature-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(6, 95, 70, 0.1);
        }
    </style>
</head>
<body class="antialiased text-gray-900 bg-white selection:bg-emerald-100 selection:text-emerald-900">
    <!-- Navigation -->
    <nav class="fixed top-0 inset-x-0 z-50 glass-navbar">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-20">
                <div class="flex items-center gap-2">
                    <img src="{{ asset('images/logo.png') }}" alt="Logo" class="h-10 w-10">
                    <span class="text-2xl font-extrabold tracking-tighter text-emerald-900">RICE<span class="text-emerald-500">CONNECT</span></span>
                </div>
                
                <div class="hidden md:flex items-center space-x-8">
                    <a href="#features" class="text-sm font-semibold text-gray-600 hover:text-emerald-600 transition-colors uppercase tracking-widest">Solutions</a>
                    <a href="#stats" class="text-sm font-semibold text-gray-600 hover:text-emerald-600 transition-colors uppercase tracking-widest">Growth</a>
                    <a href="{{ route('login') }}" class="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-full transition-all shadow-lg shadow-emerald-200 uppercase tracking-tighter">Partner Login</a>
                </div>

                <div class="md:hidden">
                    <button class="text-emerald-900 p-2">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <!-- Background Elements -->
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[1000px] bg-gradient-to-b from-emerald-50/50 to-transparent -z-10 rounded-[100%]"></div>
        
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div class="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 rounded-full text-emerald-700 text-xs font-bold uppercase tracking-widest mb-8 animate-fade-in-down">
                <span class="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
                Next-Gen Agri-Tech Ecosystem
            </div>
            
            <h1 class="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 tracking-tighter leading-[0.9] mb-8">
                Digitizing the Rice <br>
                <span class="text-gradient">Supply Chain</span>
            </h1>
            
            <p class="max-w-2xl mx-auto text-lg md:text-xl text-gray-500 leading-relaxed mb-12">
                We synchronize the journey from seed to store, empowering Farmers, Millers, and Retailers with intelligent logistics and real-time data transparency.
            </p>
            
            <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
                <a href="{{ route('login') }}" class="w-full sm:w-auto px-10 py-5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl transition-all shadow-xl shadow-emerald-200 transform hover:scale-105 active:scale-95 text-lg uppercase">
                    Get Started
                </a>
                <a href="#features" class="w-full sm:w-auto px-10 py-5 bg-white border-2 border-gray-100 hover:border-emerald-300 text-gray-600 font-bold rounded-2xl transition-all hover:bg-emerald-50 text-lg uppercase">
                    Learn More
                </a>
            </div>

            <!-- Hero Image / Visual -->
            <div class="mt-20 relative max-w-5xl mx-auto">
                <div class="absolute inset-0 bg-emerald-200 blur-3xl opacity-20 transform -rotate-6"></div>
                <img src="{{ asset('images/rice_field_hero.png') }}" alt="Sustainable Rice Farming" class="relative rounded-[2.5rem] shadow-2xl border-8 border-white object-cover h-[400px] md:h-[500px] w-full">
            </div>
        </div>
    </section>

    <!-- Role-Based Features -->
    <section id="features" class="py-24 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl font-black uppercase tracking-tighter text-gray-900 mb-4">Empowering the Ecosystem</h2>
                <div class="h-1.5 w-24 bg-gold-400 mx-auto rounded-full" style="background-color: #f59e0b;"></div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <!-- Farmer -->
                <div class="feature-card bg-white p-8 rounded-[2rem] border border-gray-100 transition-all duration-300">
                    <div class="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z"></path></svg>
                    </div>
                    <h3 class="text-xl font-bold mb-3">Farmers</h3>
                    <p class="text-gray-500 text-sm leading-relaxed">
                        Access real-time crop monitoring, pricing analytics, and direct market linkage to maximize harvest yields.
                    </p>
                </div>

                <!-- Miller -->
                <div class="feature-card bg-white p-8 rounded-[2rem] border border-gray-100 transition-all duration-300">
                    <div class="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                    </div>
                    <h3 class="text-xl font-bold mb-3">Millers</h3>
                    <p class="text-gray-500 text-sm leading-relaxed">
                        Streamline processing with automated inventory sync and quality tracking from warehouse to dispatch.
                    </p>
                </div>

                <!-- Driver -->
                <div class="feature-card bg-white p-8 rounded-[2rem] border border-gray-100 transition-all duration-300">
                    <div class="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <h3 class="text-xl font-bold mb-3">Drivers</h3>
                    <p class="text-gray-500 text-sm leading-relaxed">
                        Intelligent logistics management with optimized routing and digital proof of delivery at every stop.
                    </p>
                </div>

                <!-- Retailer -->
                <div class="feature-card bg-white p-8 rounded-[2rem] border border-gray-100 transition-all duration-300">
                    <div class="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                    </div>
                    <h3 class="text-xl font-bold mb-3">Retailers</h3>
                    <p class="text-gray-500 text-sm leading-relaxed">
                        Browse local rice Varieties, place bulk orders, and monitor your shipment in real-time until it hits the store.
                    </p>
                </div>
            </div>
        </div>
    </section>


    <!-- Footer -->
    <footer class="bg-white py-12 border-t border-gray-100 text-center">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-center gap-2 mb-6">
                <img src="{{ asset('images/logo.png') }}" alt="Logo" class="h-8 w-8">
                <span class="text-xl font-extrabold tracking-tighter text-emerald-900 uppercase">Rice Connect</span>
            </div>
            <p class="text-gray-400 text-sm">&copy; {{ date('Y') }} Rice Connect Supply Chain. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>
