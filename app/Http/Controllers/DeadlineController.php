<?php

namespace App\Http\Controllers;

use App\Models\Pawn;
use App\Models\Release;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DeadlineController extends Controller
{
    public function index(){
        $data = Pawn::whereNotIn('pawns.id', Release::select('pawn_id')->get())
            ->orderBy('pawns.created_at','desc')
            ->join('finances', 'finances.id', '=', 'pawns.finance_id')
            ->whereRaw('DATE_ADD(finances.date, INTERVAL 30 DAY) < ?',[date('Y-m-d')])
            ->with('customer')->with('store')->with('finance')->get();
        return Inertia::render('Deadline/IndexDeadline',[
            "data" => $data,
        ]);
    }
}
