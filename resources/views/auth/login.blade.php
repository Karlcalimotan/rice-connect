<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="h-full bg-gray-50">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Partner Login | Rice Connect</title>
    
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="{{ asset('favicon.png') }}">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

    <!-- Tailwind -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])

    <style>
        body { font-family: 'Inter', sans-serif; }
        .glass-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(8px);
        }
        .login-bg {
            background-image: url('{{ asset('images/rice_field_hero.png') }}');
            background-size: cover;
            background-position: center;
        }
    </style>
</head>
<body class="min-h-screen h-full antialiased text-gray-900 bg-white">
    <div class="flex min-h-screen h-full w-full bg-white relative z-[9999]">
        <!-- Left Side: Visual Experience (Desktop Only) -->
        <div class="hidden lg:block lg:w-1/2 relative overflow-hidden login-bg">
            <div class="absolute inset-0 bg-emerald-950/40 backdrop-blur-[2px]"></div>
            
            <div class="relative z-10 flex flex-col justify-center h-full px-16 text-white">
                <div class="mb-8">
                    <img src="{{ asset('images/logo.png') }}" alt="Rice Connect" class="h-24 w-24 object-contain">
                </div>
                <h1 class="text-6xl font-black tracking-tighter mb-4 uppercase">
                    Rice<br><span class="text-emerald-400">Connect</span>
                </h1>
                <p class="text-xl text-emerald-50 max-w-md font-medium leading-relaxed opacity-90">
                    Synchronizing the grain supply chain with precision. Secure access for ecosystem partners.
                </p>
                
                <div class="mt-20 flex items-center gap-4 text-sm text-emerald-200 font-bold uppercase tracking-widest">
                    <span class="w-12 h-0.5 bg-emerald-500"></span>
                    Agri-Tech Solutions
                </div>
            </div>
        </div>

        <!-- Right Side: Minimalist Login Form -->
        <div class="flex flex-col justify-center flex-1 px-6 py-12 lg:px-20 xl:px-24 bg-white">
            <div class="w-full max-w-sm mx-auto">
                <!-- Mobile Branding -->
                <div class="lg:hidden flex flex-col items-center mb-12">
                    <img src="{{ asset('images/logo.png') }}" alt="Rice Connect" class="h-20 w-20 mb-4">
                    <h2 class="text-3xl font-black text-emerald-900 tracking-tighter uppercase">Rice Connect</h2>
                </div>

                <div class="glass-card p-10 rounded-3xl shadow-2xl border border-gray-100">
                    <div class="space-y-8">
                        <div>
                            <h2 class="text-3xl font-black text-gray-900 tracking-tight">Sign In</h2>
                            <p class="text-sm text-gray-500 mt-2 font-medium">Enter your credentials to access your secure portal.</p>
                        </div>

                        <form action="{{ route('login') }}" method="POST" class="space-y-6">
                            @csrf
                            
                            <!-- Username / ID -->
                            <div>
                                <label for="login_id" class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Username or System ID</label>
                                <div class="relative group">
                                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-emerald-600">
                                        <svg class="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                    </div>
                                    <input id="login_id" name="login_id" type="text" required value="{{ old('login_id') }}"
                                        class="block w-full pl-12 pr-4 py-4 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all duration-200 bg-gray-50 font-medium placeholder-gray-300"
                                        placeholder="e.g. FARMER-101">
                                </div>
                                @error('login_id')
                                    <div class="mt-2 p-3 text-xs font-bold text-red-600 bg-red-50 rounded-xl border border-red-100">
                                        {{ $message }}
                                    </div>
                                @enderror
                            </div>

                            <!-- Password -->
                            <div>
                                <label for="password" class="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Password</label>
                                <div class="relative group">
                                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-emerald-600">
                                        <svg class="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                    </div>
                                    <input id="password" name="password" type="password" required
                                        class="block w-full pl-12 pr-4 py-4 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all duration-200 bg-gray-50 font-medium placeholder-gray-300"
                                        placeholder="••••••••">
                                </div>
                                @error('password')
                                    <div class="mt-2 p-3 text-xs font-bold text-red-600 bg-red-50 rounded-xl border border-red-100">
                                        {{ $message }}
                                    </div>
                                @enderror
                            </div>

                            <div class="flex items-center justify-between">
                                <div class="flex items-center">
                                    <input id="remember" name="remember" type="checkbox"
                                        class="h-5 w-5 text-emerald-600 focus:ring-emerald-500/20 border-gray-200 rounded-lg transition-colors cursor-pointer">
                                    <label for="remember" class="ml-2 block text-sm font-semibold text-gray-500 cursor-pointer">Remember Me</label>
                                </div>
                                <a href="#" class="text-sm font-bold text-emerald-600 hover:text-emerald-500 transition-colors uppercase tracking-tighter">Forgot?</a>
                            </div>

                            <button type="submit"
                                class="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl transition-all shadow-xl shadow-emerald-200 transform hover:scale-[0.98] active:scale-95 uppercase tracking-tighter text-lg">
                                Sign In to Portal
                            </button>
                        </form>

                        <div class="pt-8 border-t border-gray-100 text-center">
                            <p class="text-sm text-gray-500 font-medium">
                                Don't have a partner account? 
                                <a href="{{ route('register') }}" class="font-bold text-emerald-600 hover:text-emerald-500 transition-colors ml-1">Connect with us</a>
                            </p>
                        </div>
                    </div>
                </div>
                
                <p class="mt-12 text-center text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">
                    &copy; {{ date('Y') }} Rice Connect Supply Chain Solutions
                </p>
            </div>
        </div>
    </div>
</body>
</html>
