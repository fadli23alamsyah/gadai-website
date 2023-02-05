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

        $stores_id = $stores->pluck('id');

        $getData = self::_getDataDashboard($stores_id);

        return Inertia::render('Dashboard',[
            "stores" => $stores,
            "allPawn" => $getData['pawn'],
            "in" => $getData['in'],
            "out" => $getData['out'],
            "storeBalance" => $getData["storeBalance"],
            "customersPawn" => $getData['customer'],
            "deadlinesPawn" => $getData['deadline'],
        ]);
    }

    public function select_store(Request $request){
        $stores = (Auth::user()->role === 'admin') 
            ? Store::get()
            : User::find(Auth::user()->id)->stores()->get();

        $stores_id = ($request->id === 'all') ? $stores->pluck('id') : [$request->id];
        
        $getData = self::_getDataDashboard($stores_id);

        $data = [
            "allPawn" => $getData['pawn'],
            "in" => $getData['in'],
            "out" => $getData['out'],
            "storeBalance" => $getData["storeBalance"],
            "customersPawn" => $getData['customer'],
            "deadlinesPawn" => $getData['deadline'],
        ];
        return json_encode($data);
    }

    private function _getDataDashboard($stores_id){
        $pawn = Pawn::whereIn('store_id', $stores_id)->whereNotIn('id', Release::select('pawn_id')->get())->with('finance')->get()->map(fn($pawn) => $pawn->finance->total)->sum();

        $in = Finance::where('status','in')->whereIn('store_id', $stores_id)->sum('total');

        // $out = Finance::where('status','out')->whereIn('store_id', $stores_id)->sum('total');
        $out = Finance::with(['pawn'])->where('status','out')->whereIn('store_id', $stores_id)->get()->whereNull('pawn')->sum('total');

        $storeBalance = Store::whereIn('id', $stores_id)->sum('balance');

        $customer = Pawn::whereNotIn('id', Release::select('pawn_id')->get())
            ->whereIn('store_id', $stores_id)->count();

        $deadline = Pawn::whereNotIn('pawns.id', Release::select('pawn_id')->get())
            ->join('finances', 'finances.id', '=', 'pawns.finance_id')
            ->whereRaw('DATE_ADD(finances.date, INTERVAL 30 DAY) < ?',[date('Y-m-d')])
            ->whereIn('pawns.store_id', $stores_id)->count();

        return [
            "pawn" => $pawn,
            "in" => $in,
            "out" => $out,
            "storeBalance" => $storeBalance,
            "customer" => $customer,
            "deadline" => $deadline,
        ];
    }
}
