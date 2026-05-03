<?php

use Illuminate\Support\Facades\Route;
use Modules\Retailer\Http\Controllers\RetailerController;

Route::middleware(['auth', 'verified'])->prefix('retailer')->group(function () {
    
    // 1. The Marketplace View
    Route::get('/marketplace', [RetailerController::class, 'index'])
        ->name('retailer.marketplace');

    // 2. The Order Action (ONLY ONE ROUTE FOR THIS)
    Route::post('/order', [RetailerController::class, 'placeOrder'])
        ->name('retailer.order');

    // 3. The Order History View
    Route::get('/my-orders', [RetailerController::class, 'myOrders'])
        ->name('retailer.orders');

    // New: Purchases page with real-time status badges
    Route::get('/my-purchases', [RetailerController::class, 'myPurchases'])
        ->name('retailer.purchases');
        
});