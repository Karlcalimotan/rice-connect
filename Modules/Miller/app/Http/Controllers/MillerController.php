<?php

namespace Modules\Miller\Http\Controllers;

use Modules\Farmer\Models\HarvestBatch;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class MillerController extends Controller
{
    /**
     * Display the Marketplace for Millers.
     */
    public function index(): Response
    {
        $user = auth()->user();

        // SYNCED: Fetching 'unsold' batches with 'condition' included
        $batches = HarvestBatch::with('user')
            ->where('status', 'unsold')
            ->where('total_weight', '>', 0) // Hide empty batches
            ->whereHas('user', function($query) use ($user) {
                $query->where('province', $user->province);
            })
            ->latest()
            ->get();

        return Inertia::render('Miller::Marketplace', [
            'batches' => $batches,
            'miller_town' => $user->municipality 
        ]);
    }

    /**
     * Miller marking interest in a Farmer's Palay.
     */
    public function interest(Request $request, $id) 
    {
        $batch = HarvestBatch::findOrFail($id);
    
        $batch->update([
            'status' => 'pending',
            'buyer_id' => auth()->id(),
        ]);

        return redirect()->route('miller.incoming')->with('message', 'Marked as interested!');
    }

    public function incoming(): Response
    {
        $batches = HarvestBatch::with('user')
            ->where('buyer_id', auth()->id())
            ->whereIn('status', ['pending', 'sold', 'in_transit'])
            ->latest()
            ->get();

        return Inertia::render('Miller::IncomingPalay', [
            'batches' => $batches
        ]);
    }

    /**
     * View Palay bought but not yet processed.
     */
    public function inventory(): Response
    {
        // Aggregated view: group batches by rice variety for the Miller
        $inventory = HarvestBatch::with('user')
            ->where('buyer_id', auth()->id())
            ->whereIn('status', ['received','processing'])
            ->latest()
            ->get();

        // Group by variety and aggregate totals
        $grouped = $inventory->groupBy('rice_variety')->map(function ($batches, $variety) {
            return [
                'rice_variety' => $variety,
                'total_unpacked_weight_kg' => $batches->sum('unpacked_weight_kg'),
                'total_sacks' => $batches->sum('total_sacks'),
                'total_weight' => $batches->sum('total_weight'),
                'batch_count' => $batches->count(),
                'batches' => $batches->map(fn($b) => [
                    'id' => $b->id,
                    'status' => $b->status,
                    'total_weight' => $b->total_weight,
                    'unpacked_weight_kg' => $b->unpacked_weight_kg,
                    'total_sacks' => $b->total_sacks,
                    'drying_status' => $b->drying_status,
                    'condition' => $b->condition,
                    'farmer_name' => ($b->user->first_name ?? '') . ' ' . ($b->user->last_name ?? ''),
                ])->values(),
            ];
        })->values();

        return Inertia::render('Miller::Inventory', [
            'inventory' => $grouped
        ]);
    }

    /**
     * View Milled Rice ready for sale.
     */
    public function processedInventory(): Response
    {
        $inventory = \App\Models\FinishedRiceStock::where('miller_id', auth()->id())
            ->latest()
            ->get();

        return Inertia::render('Miller::ProcessedInventory', [
            'inventory' => $inventory
        ]);
    }

    /**
     * FIX: List Rice for Sale to Retailers
     */
    public function listForSale(Request $request, $id)
    {
        $request->validate([
            'price_per_sack' => 'required|numeric|min:1', 
            'delivery_fee' => 'required|numeric|min:0',
        ]);
        
        $stock = \App\Models\FinishedRiceStock::where('miller_id', auth()->id())->findOrFail($id);

        $stock->update([
            'price_per_sack' => $request->price_per_sack,
            'delivery_fee' => $request->delivery_fee,
        ]);

        return redirect()->route('miller.processed_inventory')->with('message', 'Rice is now listed in the Retailer Marketplace!');
    }

    /**
     * Replace "Confirm Receipt" flow with contact action for physical coordination.
     */
    public function contactFarmer($id)
    {
        $batch = HarvestBatch::where('buyer_id', auth()->id())->findOrFail($id);

        // For now: mark batch as in_transit and set delivery_status to pending (Farmer will see in_transit)
        $batch->update(['status' => 'in_transit', 'delivery_status' => 'pending']);

        return redirect()->back()->with('message', 'Farmer contact initiated. Coordinate pickup/delivery offline.');
    }

    public function markReceived($id)
    {
        $batch = HarvestBatch::where('buyer_id', auth()->id())->findOrFail($id);
        $batch->update(['status' => 'received', 'drying_status' => 'received']);
        return redirect()->back();
    }

    public function startDrying($id)
    {
        $batch = HarvestBatch::where('buyer_id', auth()->id())->findOrFail($id);
        $batch->update(['drying_status' => 'drying']);
        return redirect()->back();
    }

    public function millToRice(Request $request, $id)
    {
        $request->validate([
            'sacks' => 'required|integer|min:0',
            'leftover_kg' => 'required|numeric|min:0',
        ]);

        $batch = HarvestBatch::where('buyer_id', auth()->id())->findOrFail($id);
        
        $batch->update([
            'status' => 'milled',
        ]);

        // Aggregate into Finished Rice Stock
        $stock = \App\Models\FinishedRiceStock::firstOrCreate(
            ['miller_id' => auth()->id(), 'rice_variety' => $batch->rice_variety],
            ['total_sacks' => 0, 'unpacked_weight_kg' => 0]
        );

        $stock->increment('total_sacks', $request->sacks);
        $stock->increment('unpacked_weight_kg', $request->leftover_kg);

        return redirect()->back()->with('message', 'Palay milled and added to Finished Rice stock.');
    }

    public function updateThreshold(Request $request, $id)
    {
        $request->validate([
            'low_stock_threshold' => 'required|integer|min:0'
        ]);

        $stock = \App\Models\FinishedRiceStock::where('miller_id', auth()->id())->findOrFail($id);
        $stock->update(['low_stock_threshold' => $request->low_stock_threshold]);

        return redirect()->back()->with('message', 'Threshold updated successfully.');
    }

    public function setReadyToProcess($id)
    {
        $batch = HarvestBatch::where('buyer_id', auth()->id())->findOrFail($id);
        $batch->update(['drying_status' => 'ready_to_process']);
        return redirect()->back();
    }

    public function startProcessing($id)
    {
        $batch = HarvestBatch::where('buyer_id', auth()->id())->findOrFail($id);
        // If it's fresh, it must be ready_to_process. If dry, it can start immediately.
        if ($batch->condition === 'fresh' && $batch->drying_status !== 'ready_to_process') {
            return redirect()->back()->withErrors('Cannot start processing until drying is complete.');
        }
        $batch->update(['status' => 'processing']);
        return redirect()->back();
    }

    public function millerOrders(): Response
    {
        $orders = \Illuminate\Support\Facades\DB::table('orders')
            ->join('users', 'orders.retailer_id', '=', 'users.id')
            ->select('orders.*', 'users.first_name as retailer_first_name', 'users.last_name as retailer_last_name')
            ->where('orders.miller_id', auth()->id())
            ->orderByDesc('orders.created_at')
            ->get();

        return Inertia::render('Miller::MillerOrders', [
            'orders' => $orders
        ]);
    }

    /**
     * Mark order as ready for pickup.
     */
    public function readyForPickup($id)
    {
        \Illuminate\Support\Facades\DB::table('orders')
            ->where('id', $id)
            ->where('miller_id', auth()->id())
            ->update(['status' => 'ready_for_pickup', 'updated_at' => now()]);

        return redirect()->back()->with('message', 'Order marked as Ready for Pickup.');
    }

    /**
     * Dispatch delivery for an order.
     */
    public function dispatchDelivery($id)
    {
        \Illuminate\Support\Facades\DB::table('orders')
            ->where('id', $id)
            ->where('miller_id', auth()->id())
            ->update(['status' => 'in_transit', 'updated_at' => now()]);

        return redirect()->back()->with('message', 'Order dispatched for delivery.');
    }

    /**
     * Mark order as delivered/completed.
     */
    public function markDelivered($id)
    {
        \Illuminate\Support\Facades\DB::table('orders')
            ->where('id', $id)
            ->where('miller_id', auth()->id())
            ->update(['status' => 'delivered', 'updated_at' => now()]);

        return redirect()->back()->with('message', 'Order marked as delivered and completed.');
    }

    public function shippingSettings(): Response
    {
        $settings = \Illuminate\Support\Facades\DB::table('miller_delivery_settings')
            ->where('miller_id', auth()->id())
            ->first();

        return Inertia::render('Miller::ShippingSettings', [
            'settings' => $settings,
            'municipalities' => \Illuminate\Support\Facades\DB::table('municipalities')->orderBy('distance_index')->get(),
            'current_municipality_id' => auth()->user()->municipality_id
        ]);
    }

    public function updateShippingSettings(Request $request)
    {
        $request->validate([
            'base_delivery_fee' => 'required|numeric|min:0',
            'extra_fee_per_municipality' => 'required|numeric|min:0',
            'municipality_id' => 'required|exists:municipalities,id'
        ]);

        \Illuminate\Support\Facades\DB::table('miller_delivery_settings')
            ->updateOrInsert(
                ['miller_id' => auth()->id()],
                [
                    'base_delivery_fee' => $request->base_delivery_fee,
                    'extra_fee_per_municipality' => $request->extra_fee_per_municipality,
                    'municipality_id' => $request->municipality_id,
                    'updated_at' => now()
                ]
            );

        auth()->user()->update(['municipality_id' => $request->municipality_id]);

        return redirect()->back()->with('message', 'Shipping settings updated successfully!');
    }
}