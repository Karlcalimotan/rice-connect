<?php

namespace Modules\Driver\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\Farmer\Models\HarvestBatch;
use App\Models\Order;
use Inertia\Inertia;
use Inertia\Response;

class DriverController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $driverId = auth()->id();

        // 1. Inbound Palay Assignments
        $palayAssignments = HarvestBatch::with('user', 'buyer')
            ->where('driver_id', $driverId)
            ->whereIn('delivery_status', ['Pending', 'In Transit'])
            ->latest()
            ->get();

        // 2. Outbound Rice Assignments
        $riceAssignments = Order::with('retailer', 'miller')
            ->where('driver_id', $driverId)
            ->whereIn('delivery_status', ['Pending', 'In Transit'])
            ->latest()
            ->get();

        // 3. History
        $history = [
            'palay' => HarvestBatch::where('driver_id', $driverId)->whereIn('delivery_status', ['Received', 'Completed'])->limit(5)->get(),
            'rice' => Order::where('driver_id', $driverId)->where('delivery_status', 'Completed')->limit(5)->get(),
        ];

        return Inertia::render('Driver::Dashboard', [
            'palayAssignments' => $palayAssignments,
            'riceAssignments' => $riceAssignments,
            'history' => $history,
        ]);
    }

    /**
     * Driver confirms pickup and logs weight/price.
     */
    public function logPickup(Request $request, $id)
    {
        $batch = HarvestBatch::where('driver_id', auth()->id())->findOrFail($id);

        $validated = $request->validate([
            'actual_weight_kg' => 'required|numeric|min:0.01',
            'suggested_price_per_kg' => 'required|numeric|min:0',
        ]);

        $batch->update([
            'actual_weight_kg' => $validated['actual_weight_kg'],
            'suggested_price_per_kg' => $validated['suggested_price_per_kg'],
            'delivery_status' => 'In Transit',
            'status' => 'in_transit',
        ]);

        return redirect()->back()->with('message', 'Pickup logged and transit started!');
    }

    /**
     * Driver marks rice delivery as "Arrived at Destination".
     */
    public function arriveAtDestination(Request $request, $id)
    {
        $order = Order::where('driver_id', auth()->id())->findOrFail($id);

        $order->update([
            'delivery_status' => 'Received',
            'status' => 'delivered', // Match Retailer expectation
        ]);

        return redirect()->back()->with('message', 'Order marked as Delivered. Waiting for Retailer confirmation.');
    }
}
