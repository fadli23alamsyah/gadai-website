<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StoreController;
use App\Models\Store;
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
});

Route::get('/dashboard', function () {
    return Inertia::render('Customer/Customer');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->group(function (){
    // Store
    Route::get('/store', [StoreController::class, 'index'])->name('store');
    Route::post('/store', [StoreController::class, 'store'])->name('store.store');
    Route::put('/store', [StoreController::class, 'update'])->name('store.update');
    Route::delete('/store', [StoreController::class, 'destroy'])->name('store.delete');
    Route::get('/store/add', function(){return Inertia::render('Store/FormStore');} )->name('store.add');
    Route::get('/store/edit/{store}', fn(Store $store) => Inertia::render('Store/FormStore',["store"=> $store]) )->name('store.edit');
});

require __DIR__.'/auth.php';
