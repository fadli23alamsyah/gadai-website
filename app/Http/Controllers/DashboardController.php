<?php

namespace App\Http\Controllers;

use App\Models\Finance;
use App\Models\Pawn;
use App\Models\Release;
use App\Models\Store;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(){
        $stores = (Auth::user()->role === 'admin') 
            ? Store::get()
            : User::find(Auth::user()->id)->stores()->get();

        $stores_id = $stores->map(fn($store) => $store->id);

        $pawn = Pawn::whereIn('store_id', $stores_id)->with('finance')->get()->map(fn($pawn) => $pawn->finance->total)->sum();

        $in = Finance::where('status','in')->whereIn('store_id', $stores_id)->sum('total');

        $out = Finance::where('status','out')->whereIn('store_id', $stores_id)->sum('total');

        $customer = Pawn::whereNotIn('id', Release::select('pawn_id')->get())
            ->whereIn('store_id', $stores_id)->count();

        $deadline = Pawn::whereNotIn('pawns.id', Release::select('pawn_id')->get())
            ->join('finances', 'finances.id', '=', 'pawns.finance_id')
            ->whereRaw('DATE_ADD(finances.date, INTERVAL 30 DAY) < ?',[date('Y-m-d')])
            ->whereIn('pawns.store_id', $stores_id)->count();

        return Inertia::render('Dashboard',[
            "stores" => $stores,
            "allPawn" => $pawn,
            "in" => $in,
            "out" => $out,
            "customersPawn" => $customer,
            "deadlinesPawn" => $deadline,
        ]);
    }

    public function select_store(Request $request){
        $stores = (Auth::user()->role === 'admin') 
            ? Store::get()
            : User::find(Auth::user()->id)->stores()->get();

        $stores_id = ($request->id === 'all') ? $stores->map(fn($store) => $store->id) : [$request->id];

        $pawn = Pawn::whereIn('store_id', $stores_id)->with('finance')->get()->map(fn($pawn) => $pawn->finance->total)->sum();

        $in = Finance::where('status','in')->whereIn('store_id', $stores_id)->sum('total');

        $out = Finance::where('status','out')->whereIn('store_id', $stores_id)->sum('total');

        $customer = Pawn::whereNotIn('id', Release::select('pawn_id')->get())
            ->whereIn('store_id', $stores_id)->count();

        $deadline = Pawn::whereNotIn('pawns.id', Release::select('pawn_id')->get())
            ->join('finances', 'finances.id', '=', 'pawns.finance_id')
            ->whereRaw('DATE_ADD(finances.date, INTERVAL 30 DAY) < ?',[date('Y-m-d')])
            ->whereIn('pawns.store_id', $stores_id)->count();

        $data = [
            "allPawn" => $pawn,
            "in" => $in,
            "out" => $out,
            "customersPawn" => $customer,
            "deadlinesPawn" => $deadline,
        ];
        return json_encode($data);
    }
}
