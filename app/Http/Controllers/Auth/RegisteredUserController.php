<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $allowedMunicipalities = [
            "Passi City", "San Enrique", "Dueñas", "Calinog", "Bingawan", "Lambunao", 
            "Badiangan", "Janiuay", "Maasin", "Pototan", "Dingle", "Mina", "Cabatuan", 
            "New Lucena", "Santa Barbara", "Zarraga", "Pavia", "Leganes", "Iloilo City", 
            "Oton", "San Miguel", "Alimodian", "Leon", "Tigbauan", "Guimbal", "Tubungan", 
            "Igbaras", "Miagao", "San Joaquin", "Dumangas", "Barotac Nuevo", "Anilao", 
            "Banate", "Barotac Viejo", "San Rafael", "Ajuy", "Sara", "Lemery", "Concepcion", 
            "San Dionisio", "Batad", "Balasan", "Estancia", "Carles"
        ];

        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'contact' => 'required|string|max:20',
            'role' => 'required|string|in:farmer,miller,retailer',
            'municipality' => ['required', 'string', \Illuminate\Validation\Rule::in($allowedMunicipalities)],
            'province' => 'required|string|in:Iloilo',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        // Find Municipality ID for linking
        $municipality = \Illuminate\Support\Facades\DB::table('municipalities')
            ->where('name', $request->municipality)
            ->first();

        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'contact' => $request->contact,
            'role' => $request->role,
            'municipality' => $request->municipality,
            'municipality_id' => $municipality?->id,
            'province' => 'Iloilo',
            'password' => Hash::make($request->password),
        ]);

        // Auto-initialize Miller Delivery Settings
        if ($request->role === 'miller') {
            \Illuminate\Support\Facades\DB::table('miller_delivery_settings')->insert([
                'miller_id' => $user->id,
                'base_delivery_fee' => 150.00,
                'extra_fee_per_municipality' => 50.00,
                'municipality_id' => $municipality?->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}
