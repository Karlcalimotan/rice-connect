<?php

namespace Modules\Farmer\Http\Controllers;

use Modules\Farmer\Models\HarvestBatch;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia; // REQUIRED for React
use Inertia\Response;

class FarmerController extends Controller
{
    /**
     * Display a listing of the harvest.
     */
    public function index(): Response
    {
        $batches = HarvestBatch::with('buyer')
            ->where('user_id', Auth::id())
            ->where('hidden_from_farmer', false)
            ->latest()
            ->get()
            ->map(function ($batch) {
                $arr = $batch->toArray();
                // Remove sensitive milling/internal fields from Farmer view
                unset($arr['unpacked_weight_kg'], $arr['total_sacks'], $arr['price_per_sack'], $arr['drying_status']);

                // Once delivered, freeze Farmer-visible status — stop showing Miller stages
                if (in_array($arr['status'] ?? '', ['delivered', 'processing', 'processed', 'packed', 'for_sale', 'milled'])) {
                    if ($arr['status'] === 'delivered') {
                        $arr['status'] = 'delivered';
                    } else {
                        // Show a generic 'sold' status for post-sale Miller stages
                        $arr['status'] = 'sold';
                    }
                }

                return $arr;
            });

        return Inertia::render('Farmer::HarvestIndex', [
            'batches' => $batches,
        ]);
    }
    /**
     * Show the form for creating a new harvest batch.
     */
    public function create(): Response
    {
        return Inertia::render('Farmer::CreateHarvest');
    }
    /**
     * Remove the specified harvest from the database.
     */
    public function destroy($id)
    {
        $batch = HarvestBatch::where('user_id', Auth::id())->findOrFail($id);

        // Soft-hide the batch from the Farmer's UI while keeping DB history for Admin audit
        $batch->hidden_from_farmer = true;
        if (is_null($batch->hidden_at)) {
            $batch->hidden_at = now();
        }
        $batch->save();

        return redirect()->back()->with('message', 'Batch removed from your view (record preserved for audit).');
    }

    /**
     * Show the edit form (Optional: We can also use a Modal later)
     */
    public function edit($id): Response
    {
        $batch = HarvestBatch::where('user_id', Auth::id())->findOrFail($id);

        return Inertia::render('Farmer::EditHarvest', [
            'batch' => $batch
        ]);
    }

    public function update(Request $request, $id)
{
    $batch = HarvestBatch::where('user_id', Auth::id())->findOrFail($id);

    $validated = $request->validate([
        'rice_variety' => 'required|string|max:255',
        'harvest_date' => 'required|date',
        'condition' => 'required|in:fresh,ready',
    ]);

    $batch->update($validated);

    return redirect()->route('farmer.harvest')->with('message', 'Harvest updated successfully!');
}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    $validated = $request->validate([
        'rice_variety'   => 'required|string',
        'harvest_date'   => 'required|date',
        'condition'      => 'required|in:fresh,ready',
    ]);

    HarvestBatch::create([
        'user_id'        => auth()->id(),
        'rice_variety'   => $validated['rice_variety'],
        'harvest_date'   => $validated['harvest_date'],
        'condition'      => $validated['condition'],
        'status'         => 'unsold',
        'delivery_status' => 'Pending',
        'delivery_type'   => 'palay',
        'total_weight'   => 0, // Placeholder as it's required in some views maybe, will be updated by Driver
        'number_of_bags' => 0,
        'price_per_kg'   => 0,
    ]);

    return redirect()->route('farmer.harvest')->with('message', 'Harvest logged successfully! Waiting for pickup.');
}
    public function offers()
{
    // Get batches that have a Miller interested (buyer_id is not null)
    $offers = HarvestBatch::with('buyer') // 'buyer' is the User who is the Miller
        ->where('user_id', auth()->id())
        ->where('status', 'pending')
        ->get();

    return Inertia::render('Farmer::Offers', [
        'offers' => $offers
    ]);
}

public function acceptOffer($id)
{
    $batch = HarvestBatch::findOrFail($id);
    
    // Update status to 'sold'
    $batch->update(['status' => 'sold']);

    return redirect()->back()->with('message', 'Offer accepted! The Palay is now marked as sold.');
}
  public function acceptInterest($id)
{
    $batch = HarvestBatch::where('user_id', auth()->id())->findOrFail($id);

    // Change status from 'pending' to 'sold'
    $batch->update([
        'status' => 'sold'
    ]);

    return redirect()->back()->with('message', 'Rice successfully sold to the Miller!');
}
    /**
     * Remaining methods (show, edit, update, destroy) 
     * should also use Inertia::render when you build those pages.
     */
}