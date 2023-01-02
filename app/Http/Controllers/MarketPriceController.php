<?php

namespace App\Http\Controllers;

use App\Models\MarketPrice;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Date;
use Inertia\Inertia;

use function Termwind\render;

class MarketPriceController extends Controller
{
    public function index(){
        $data = MarketPrice::orderBy('created_at','desc')->get();
        return Inertia::render('Marketprice/IndexMarketprice',[
            "data" => $data,
        ]);
    }

    public function store(Request $request){
        $data = $request->validate([
            'type' => 'required',
            'price' => 'required|numeric'
        ]);
        $data["date"] = date('Y-m-d');

        if(MarketPrice::create($data)){
            return to_route('marketprice')->with("isSuccess", true)->with("message","Berhasil menambahkan");
        }
        return to_route('marketprice')->with("isSuccess", false)->with("message","Gagal menambahkan");
    }

    public function update(Request $request){
        $data = $request->validate([
            'type' => 'required',
            'price' => 'required|numeric'
        ]);
        $data["date"] = date('Y-m-d');

        if(MarketPrice::where('id', $request->id)->update($data)){
            return to_route('marketprice')->with("isSuccess", true)->with("message","Update berhasil");
        }
        return to_route('marketprice')->with("isSuccess", false)->with("message","Update gagal");
    }

    public function destroy(Request $request){
        if(MarketPrice::where('id', $request->id)->delete()){
            return back()->with("isSuccess", true)->with("message","Berhasil dihapus");
        }
        return back()->with("isSuccess", false)->with("message","Gagal dihapus");
    }
}
