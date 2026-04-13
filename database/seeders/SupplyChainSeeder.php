<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Modules\Farmer\Models\HarvestBatch;
use Illuminate\Support\Facades\DB;

class SupplyChainSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create users
        $farmer = User::create([
            'first_name' => 'Farmer',
            'last_name' => 'Joe',
            'email' => 'farmer@example.test',
            'role' => 'farmer',
            'contact' => '09170000001',
            'password' => Hash::make('password'),
        ]);

        $miller = User::create([
            'first_name' => 'Miller',
            'last_name' => 'Mary',
            'email' => 'miller@example.test',
            'role' => 'miller',
            'contact' => '09170000002',
            'password' => Hash::make('password'),
        ]);

        $retailer = User::create([
            'first_name' => 'Retailer',
            'last_name' => 'Rex',
            'email' => 'retailer@example.test',
            'role' => 'retailer',
            'contact' => '09170000003',
            'password' => Hash::make('password'),
        ]);

        $driver = User::create([
            'first_name' => 'Driver',
            'last_name' => 'Dan',
            'email' => 'driver@example.test',
            'role' => 'driver',
            'contact' => '09170000004',
            'password' => Hash::make('password'),
        ]);

        // Farmer creates a harvest batch
        $batch = HarvestBatch::create([
            'user_id' => $farmer->id,
            'rice_variety' => 'Dinorado',
            'number_of_bags' => 10,
            'total_weight' => 500.00,
            'unpacked_weight_kg' => 0,
            'total_sacks' => 0,
            'harvest_date' => now()->toDateString(),
            'status' => 'unsold',
            'condition' => 'fresh',
        ]);

        // Miller expresses interest and buys the batch
        $batch->update(['status' => 'pending', 'buyer_id' => $miller->id]);
        $batch->update(['status' => 'sold']);

        // Miller marks received -> start drying -> ready_to_process
        $batch->update(['drying_status' => 'received']);
        $batch->update(['drying_status' => 'drying']);
        $batch->update(['drying_status' => 'ready_to_process']);

        // Miller processes: convert palay into polished rice (simulate recovery)
        // Assume recovery yields 60% of total_weight in polished rice
        $polished = round($batch->total_weight * 0.6, 2);
        $sacks = (int) floor($polished / 50);

        $batch->update([
            'unpacked_weight_kg' => $polished,
            'total_sacks' => $sacks,
            'status' => 'processed',
        ]);

        // Miller packs one sack
        if ($batch->unpacked_weight_kg >= 50) {
            $batch->decrement('unpacked_weight_kg', 50);
            $batch->increment('total_sacks', 1);
        }

        // Miller lists for sale with price per sack
        $batch->update(['price_per_sack' => 1500.00, 'price_per_kg' => 1500.00 / 50, 'status' => 'for_sale']);

        // Retailer places an order for 1 sack
        $requestedSacks = 1;
        DB::transaction(function () use ($retailer, $batch, $requestedSacks) {
            HarvestBatch::where('id', $batch->id)->decrement('total_sacks', $requestedSacks);
            HarvestBatch::where('id', $batch->id)->decrement('unpacked_weight_kg', $requestedSacks * 50);

            DB::table('orders')->insert([
                'retailer_id' => $retailer->id,
                'miller_id' => $batch->buyer_id,
                'batch_id' => $batch->id,
                'rice_variety' => $batch->rice_variety,
                'sacks' => $requestedSacks,
                'total_weight' => $requestedSacks * 50,
                'total_price' => $requestedSacks * $batch->price_per_sack,
                'shipping_method' => 'pickup',
                'delivery_fee' => 0,
                'status' => 'pending_preparation',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        });
    }
}
