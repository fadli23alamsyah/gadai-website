<?php

namespace App\Http\Controllers;

use App\Models\Pawn;
use App\Models\Release;
use App\Models\Store;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DeadlineController extends Controller
{
    public function index(){
        $stores = (Auth::user()->role === 'admin') 
            ? Store::select('id')->get() 
            : User::find(Auth::user()->id)->stores()->get()->map(fn($store) => $store->id);
        $data = Pawn::whereNotIn('pawns.id', Release::select('pawn_id')->get())
            ->orderBy('pawns.created_at','desc')
            ->join('finances', 'finances.id', '=', 'pawns.finance_id')
            ->whereRaw('DATE_ADD(finances.date, INTERVAL 30 DAY) < ?',[date('Y-m-d')])
            ->whereIn('pawns.store_id', $stores)
            ->with('customer')->with('store')->with('finance')->get();
        return Inertia::render('Deadline/IndexDeadline',[
            "data" => $data,
        ]);
    }
}
