<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    /**
     * Observer-only Admin Dashboard.
     * Full visibility, zero interference — no create/edit/delete capabilities.
     */
    public function index(): Response
    {
        $users = DB::table('users')
            ->select('id', 'first_name', 'last_name', 'email', 'role', 'municipality', 'province', 'contact', 'created_at')
            ->orderByDesc('created_at')
            ->get();

        $batches = DB::table('harvest_batches')
            ->join('users', 'harvest_batches.user_id', '=', 'users.id')
            ->leftJoin('users as buyer', 'harvest_batches.buyer_id', '=', 'buyer.id')
            ->select(
                'harvest_batches.*',
                'users.first_name as farmer_first_name',
                'users.last_name as farmer_last_name',
                'buyer.first_name as buyer_first_name',
                'buyer.last_name as buyer_last_name'
            )
            ->orderByDesc('harvest_batches.created_at')
            ->get();

        $orders = DB::table('orders')
            ->join('users as retailer', 'orders.retailer_id', '=', 'retailer.id')
            ->join('users as miller', 'orders.miller_id', '=', 'miller.id')
            ->select(
                'orders.*',
                'retailer.first_name as retailer_first_name',
                'retailer.last_name as retailer_last_name',
                'miller.first_name as miller_first_name',
                'miller.last_name as miller_last_name'
            )
            ->orderByDesc('orders.created_at')
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'users' => $users,
            'batches' => $batches,
            'orders' => $orders,
        ]);
    }

    public function destroyHarvestBatch($id)
    {
        $batch = \Illuminate\Support\Facades\DB::table('harvest_batches')->where('id', $id)->first();
        if (!$batch) {
            return redirect()->back()->withErrors('Batch not found');
        }

        $hiddenAt = $batch->hidden_at ? \Carbon\Carbon::parse($batch->hidden_at) : null;
        $isHiddenAndOld = $hiddenAt && $hiddenAt->diffInDays(now()) >= 30;
        
        if (!$batch->hidden_from_farmer || !$isHiddenAndOld) {
            return redirect()->back()->withErrors(['error' => 'Condition not met: Record must be hidden by the Farmer for at least 30 days.']);
        }

        $isProcessed = in_array($batch->status, ['milled', 'processed', 'completed']);
        if (!$isProcessed) {
            return redirect()->back()->withErrors(['error' => 'Condition not met: Status must be processed/milled (moved to Finished Stock).']);
        }

        \Illuminate\Support\Facades\DB::table('harvest_batches')->where('id', $id)->delete();

        return redirect()->back()->with('message', 'Record permanently deleted.');
    }

    public function municipalities(): Response
    {
        return Inertia::render('Admin/MunicipalitiesManager', [
            'municipalities' => DB::table('municipalities')->orderBy('distance_index')->get()
        ]);
    }

    public function storeMunicipality(\Illuminate\Http\Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:municipalities,name',
            'distance_index' => 'required|integer|unique:municipalities,distance_index'
        ]);

        DB::table('municipalities')->insert([
            'name' => $request->name,
            'distance_index' => $request->distance_index,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return redirect()->back()->with('message', 'Municipality added successfully!');
    }

    public function updateMunicipality(\Illuminate\Http\Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|unique:municipalities,name,' . $id,
            'distance_index' => 'required|integer|unique:municipalities,distance_index,' . $id
        ]);

        DB::table('municipalities')->where('id', $id)->update([
            'name' => $request->name,
            'distance_index' => $request->distance_index,
            'updated_at' => now(),
        ]);

        return redirect()->back()->with('message', 'Municipality updated successfully!');
    }

    public function destroyMunicipality($id)
    {
        // Check if users are using this municipality
        $userCount = DB::table('users')->where('municipality_id', $id)->count();
        if ($userCount > 0) {
            return redirect()->back()->withErrors(['error' => 'Cannot delete municipality while it is assigned to users.']);
        }

        DB::table('municipalities')->where('id', $id)->delete();

        return redirect()->back()->with('message', 'Municipality deleted successfully!');
    }
}
