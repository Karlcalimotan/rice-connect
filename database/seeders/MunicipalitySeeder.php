<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class MunicipalitySeeder extends Seeder
{
    public function run(): void
    {
        // 1. Specific Municipalities
        $munData = [
            ['name' => 'Leon', 'distance_index' => 1],
            ['name' => 'Alimodian', 'distance_index' => 2],
            ['name' => 'San Miguel', 'distance_index' => 3],
            ['name' => 'Santa Barbara', 'distance_index' => 4],
            ['name' => 'Pavia', 'distance_index' => 5],
        ];
        
        foreach ($munData as $m) {
            DB::table('municipalities')->updateOrInsert(['name' => $m['name']], $m);
        }

        $municipalities = DB::table('municipalities')->get();

        // 2. Default Users
        $users = [
            [
                'first_name' => 'Admin',
                'last_name' => 'User',
                'email' => 'admin@rice.com',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'contact' => '0000000000',
                'municipality_id' => $municipalities[0]->id, // Leon
            ],
            [
                'first_name' => 'Karl',
                'last_name' => 'Farmer',
                'email' => 'farmer@rice.com',
                'password' => Hash::make('password'),
                'role' => 'farmer',
                'contact' => '1111111111',
                'municipality_id' => $municipalities[0]->id, // Leon
            ],
            [
                'first_name' => 'Manny',
                'last_name' => 'Miller',
                'email' => 'miller@rice.com',
                'password' => Hash::make('password'),
                'role' => 'miller',
                'contact' => '2222222222',
                'municipality_id' => $municipalities[2]->id, // San Miguel (Index 3)
            ],
            [
                'first_name' => 'Rita',
                'last_name' => 'Retailer',
                'email' => 'retailer@rice.com',
                'password' => Hash::make('password'),
                'role' => 'retailer',
                'contact' => '3333333333',
                'municipality_id' => $municipalities[4]->id, // Pavia (Index 5)
            ],
        ];

        foreach ($users as $uData) {
            $user = User::updateOrCreate(['email' => $uData['email']], $uData);
            
            // Initialize Miller settings if miller
            if ($user->role === 'miller') {
                DB::table('miller_delivery_settings')->updateOrInsert(
                    ['miller_id' => $user->id],
                    [
                        'base_delivery_fee' => 150.00,
                        'extra_fee_per_municipality' => 50.00,
                        'municipality_id' => $user->municipality_id,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]
                );
            }
        }
    }
}
