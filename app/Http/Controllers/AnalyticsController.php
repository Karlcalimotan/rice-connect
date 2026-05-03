<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Modules\Farmer\Models\HarvestBatch;
use App\Models\User;

class AnalyticsController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $role = $user->role;

        $stats = match ($role) {
            'farmer' => $this->farmerStats($user->id),
            'miller' => $this->millerStats($user->id),
            'retailer' => $this->retailerStats($user->id),
            'driver' => $this->driverStats($user->id),
            'admin' => $this->adminStats(),
            default => [],
        };

        return Inertia::render('Analytics', [
            'stats' => $stats,
            'role'  => $role,
        ]);
    }

    private function farmerStats($userId): array
    {
        $batches = HarvestBatch::where('user_id', $userId)->where('hidden_from_farmer', false)->get();

        return [
            'totalBatches'     => $batches->count(),
            'totalSacks'       => $batches->sum('total_sacks'),
            'totalWeightKg'    => $batches->sum('actual_weight_kg'),
            'totalEarnings'    => $batches->sum(fn($b) => ($b->actual_weight_kg ?? 0) * ($b->suggested_price_per_kg ?? 0)),
            'pendingBatches'   => $batches->where('delivery_status', 'Pending')->count(),
            'inTransitBatches' => $batches->where('delivery_status', 'In Transit')->count(),
            'completedBatches' => $batches->whereIn('delivery_status', ['Completed', 'Payment Authorized', 'Finalized'])->count(),
            'byVariety'        => $batches->groupBy('rice_variety')->map->count()->toArray(),
            'monthlyYield'     => $this->monthlyGroup(
                HarvestBatch::where('user_id', $userId)->selectRaw('MONTH(created_at) as month, SUM(total_sacks) as total')->groupBy('month')->pluck('total', 'month')->toArray()
            ),
        ];
    }

    private function millerStats($userId): array
    {
        $acquired = HarvestBatch::where('buyer_id', $userId)->get();
        $orders   = DB::table('orders')->where('miller_id', $userId)->get();

        return [
            'totalAcquired'    => $acquired->count(),
            'totalWeightIn'    => $acquired->sum('actual_weight_kg'),
            'totalOrders'      => $orders->count(),
            'pendingOrders'    => $orders->where('delivery_status', 'Pending')->count(),
            'completedOrders'  => $orders->where('delivery_status', 'Completed')->count(),
            'totalRevenue'     => $orders->sum('total_price'),
            'byVariety'        => $acquired->groupBy('rice_variety')->map->count()->toArray(),
            'monthlyOrders'    => $this->monthlyGroup(
                DB::table('orders')->where('miller_id', $userId)->selectRaw('MONTH(created_at) as month, COUNT(*) as total')->groupBy('month')->pluck('total', 'month')->toArray()
            ),
        ];
    }

    private function retailerStats($userId): array
    {
        $orders = DB::table('orders')->where('retailer_id', $userId)->get();

        return [
            'totalOrders'     => $orders->count(),
            'pendingOrders'   => $orders->where('delivery_status', 'Pending')->count(),
            'inTransit'       => $orders->where('delivery_status', 'In Transit')->count(),
            'completedOrders' => $orders->where('delivery_status', 'Completed')->count(),
            'totalSpent'      => $orders->sum('total_price'),
            'totalWeightKg'   => $orders->sum('total_weight'),
            'monthlyOrders'   => $this->monthlyGroup(
                DB::table('orders')->where('retailer_id', $userId)->selectRaw('MONTH(created_at) as month, COUNT(*) as total')->groupBy('month')->pluck('total', 'month')->toArray()
            ),
        ];
    }

    private function driverStats($userId): array
    {
        $palayDone = HarvestBatch::where('driver_id', $userId)->whereIn('delivery_status', ['Completed', 'Payment Authorized', 'Finalized'])->get();
        $riceDone  = DB::table('orders')->where('driver_id', $userId)->where('delivery_status', 'Completed')->get();
        $palayAll  = HarvestBatch::where('driver_id', $userId)->get();
        $riceAll   = DB::table('orders')->where('driver_id', $userId)->get();

        return [
            'totalPalayDeliveries'  => $palayAll->count(),
            'totalRiceDeliveries'   => $riceAll->count(),
            'completedDeliveries'   => $palayDone->count() + $riceDone->count(),
            'totalWeightHauled'     => $palayDone->sum('actual_weight_kg') + $riceDone->sum('total_weight'),
            'pendingPalay'          => $palayAll->where('delivery_status', 'Pending')->count(),
            'inTransitPalay'        => $palayAll->where('delivery_status', 'In Transit')->count(),
        ];
    }

    private function adminStats(): array
    {
        return [
            'totalUsers'      => User::count(),
            'totalFarmers'    => User::where('role', 'farmer')->count(),
            'totalMillers'    => User::where('role', 'miller')->count(),
            'totalRetailers'  => User::where('role', 'retailer')->count(),
            'totalDrivers'    => User::where('role', 'driver')->count(),
            'totalBatches'    => HarvestBatch::count(),
            'totalOrders'     => DB::table('orders')->count(),
            'totalWeightKg'   => HarvestBatch::sum('actual_weight_kg'),
            'monthlyBatches'  => $this->monthlyGroup(
                HarvestBatch::selectRaw('MONTH(created_at) as month, COUNT(*) as total')->groupBy('month')->pluck('total', 'month')->toArray()
            ),
            'monthlyOrders'   => $this->monthlyGroup(
                DB::table('orders')->selectRaw('MONTH(created_at) as month, COUNT(*) as total')->groupBy('month')->pluck('total', 'month')->toArray()
            ),
        ];
    }

    /** Map month numbers to full 12-month array (Jan–Dec) */
    private function monthlyGroup(array $data): array
    {
        $months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        $result = [];
        foreach ($months as $i => $label) {
            $result[] = ['month' => $label, 'value' => $data[$i + 1] ?? 0];
        }
        return $result;
    }
}
