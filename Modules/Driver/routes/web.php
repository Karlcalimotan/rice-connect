<?php

use Illuminate\Support\Facades\Route;
use Modules\Driver\Http\Controllers\DriverController;

Route::middleware(['auth', 'verified'])->prefix('driver')->group(function () {
    Route::get('/dashboard', [DriverController::class, 'index'])->name('driver.dashboard');
    Route::post('/palay/{id}/pickup', [DriverController::class, 'logPickup'])->name('driver.palay.pickup');
    Route::post('/rice/{id}/arrive', [DriverController::class, 'arriveAtDestination'])->name('driver.rice.arrive');
});
