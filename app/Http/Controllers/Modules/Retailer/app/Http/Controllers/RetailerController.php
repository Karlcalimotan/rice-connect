<?php

namespace Modules\Retailer\Http\Controllers; // Fixed namespace

use Modules\Farmer\Models\HarvestBatch;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RetailerController extends Controller
{
    /**
     * Display the Marketplace for Retailers.
     * They only see rice that is 'for_sale'.
     */
    public function index(): Response
    {
        $available_rice = HarvestBatch::with('user') // This gets the Miller's info
            ->where('status', 'for_sale')
            ->latest()
            ->get();

        return Inertia::render('Retailer::Marketplace', [
            'available_rice' => $available_rice
        ]);
    }
}