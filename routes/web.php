<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AdminController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Role-based Dashboard Aliases
Route::middleware(['auth'])->group(function () {
    Route::get('/farmer/dashboard', function() { return redirect()->route('farmer.harvest'); })->name('farmer.dashboard');
    Route::get('/miller/dashboard', function() { return redirect()->route('miller.marketplace'); })->name('miller.dashboard');
    Route::get('/retailer/dashboard', function() { return redirect()->route('retailer.marketplace'); })->name('retailer.dashboard');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Admin Dashboard (Observer-Only, with conditional delete)
    Route::get('/admin/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
    Route::delete('/admin/harvest-batch/{id}', [AdminController::class, 'destroyHarvestBatch'])->name('admin.harvest.destroy');

    // Admin Municipality Management
    Route::get('/admin/municipalities', [AdminController::class, 'municipalities'])->name('admin.municipalities');
    Route::post('/admin/municipalities', [AdminController::class, 'storeMunicipality'])->name('admin.municipalities.store');
    Route::patch('/admin/municipalities/{id}', [AdminController::class, 'updateMunicipality'])->name('admin.municipalities.update');
    Route::delete('/admin/municipalities/{id}', [AdminController::class, 'destroyMunicipality'])->name('admin.municipalities.destroy');
});

require __DIR__.'/auth.php';

