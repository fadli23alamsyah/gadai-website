<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DeadlineController;
use App\Http\Controllers\FinanceController;
use App\Http\Controllers\MarketPriceController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReleaseController;
use App\Http\Controllers\StafController;
use App\Http\Controllers\StoreController;
use App\Models\MarketPrice;
use App\Models\Store;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function(){
    return Inertia::render('Auth/Login');
})->middleware('guest');

Route::middleware(['auth', 'verified'])->group(function (){
    // profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::post('/dashboard', [DashboardController::class, 'select_store'])->name('dashboard.selectStore');
    
    // Customer
    Route::get('/customer', [CustomerController::class, 'index'])->name('customer');
    Route::post('/customer', [CustomerController::class, 'store'])->name('customer.store');
    Route::put('/customer', [CustomerController::class, 'update'])->name('customer.update');
    Route::delete('/customer', [CustomerController::class, 'destroy'])->name('customer.delete');
    Route::get('/customer/add', [CustomerController::class, 'add'])->name('customer.add');
    Route::get('/customer/edit/{pawn}', [CustomerController::class, 'edit'])->name('customer.edit');
    Route::get('/customer/show/{pawn}', [CustomerController::class, 'show'])->name('customer.show');
    Route::post('/customer/release/{pawn}', [CustomerController::class, 'release'])->name('customer.release');
    Route::post('/customer/extended/{pawn}', [CustomerController::class, 'extended'])->name('customer.extended');

    // Deadline
    Route::get('/deadline', [DeadlineController::class, 'index'])->name('deadline');

    // Release
    Route::get('/release', [ReleaseController::class, 'index'])->name('release');
    Route::put('/release', [ReleaseController::class, 'update'])->name('release.update');
    Route::delete('/release', [ReleaseController::class, 'destroy'])->name('release.delete');
    Route::get('/release/edit/{release}', [ReleaseController::class, 'edit'])->name('release.edit');

    // Finance
    Route::get('/finance', [FinanceController::class, 'index'])->name('finance');
    Route::post('/finance', [FinanceController::class, 'store'])->name('finance.store');
    Route::put('/finance', [FinanceController::class, 'update'])->name('finance.update');
    Route::delete('/finance', [FinanceController::class, 'destroy'])->name('finance.delete');
    Route::get('/finance/add', [FinanceController::class, 'add'])->name('finance.add');
    Route::get('/finance/edit/{finance}', [FinanceController::class, 'edit'])->name('finance.edit');

    // Market Price
    Route::get('/marketprice', [MarketPriceController::class, 'index'])->name('marketprice');
    Route::post('/marketprice', [MarketPriceController::class, 'store'])->name('marketprice.store');
    Route::put('/marketprice', [MarketPriceController::class, 'update'])->name('marketprice.update');
    Route::delete('/marketprice', [MarketPriceController::class, 'destroy'])->name('marketprice.delete');
    Route::get('/marketprice/add', fn() => Inertia::render('Marketprice/FormMarketprice'))->name('marketprice.add');
    Route::get('/marketprice/edit/{marketprice}', fn(MarketPrice $marketprice) => Inertia::render('Marketprice/FormMarketprice', ["marketprice"=>$marketprice]))->name('marketprice.edit');

    // Store for staf
    Route::get('/store/info', [StoreController::class, 'info'])->name('store.info');
    Route::put('/store/info', [StoreController::class, 'updateinfo'])->name('store.updateinfo');
    
    Route::middleware(['isAdmin'])->group(function(){
        // Store
        Route::get('/store', [StoreController::class, 'index'])->name('store');
        Route::post('/store', [StoreController::class, 'store'])->name('store.store');
        Route::put('/store', [StoreController::class, 'update'])->name('store.update');
        Route::delete('/store', [StoreController::class, 'destroy'])->name('store.delete');
        Route::get('/store/add', function(){return Inertia::render('Store/FormStore');} )->name('store.add');
        Route::get('/store/edit/{store}', fn(Store $store) => Inertia::render('Store/FormStore',["store"=> $store]) )->name('store.edit');
    
        // Staf
        Route::get('/staf', [StafController::class, 'index'])->name('staf');
        Route::post('/staf', [StafController::class, 'store'])->name('staf.store');
        Route::put('/staf', [StafController::class, 'update'])->name('staf.update');
        Route::delete('/staf', [StafController::class, 'destroy'])->name('staf.delete');
        Route::put('/staf/reset', [StafController::class, 'resetPassword'])->name('staf.reset');
        Route::get('/staf/add', [StafController::class, 'add'])->name('staf.add');
        Route::get('/staf/edit/{staf:username}', [StafController::class, 'edit'])->name('staf.edit');
    });
});

require __DIR__.'/auth.php';
