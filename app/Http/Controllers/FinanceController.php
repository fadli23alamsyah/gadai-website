<?php

namespace App\Http\Controllers;

use App\Models\Finance;
use App\Models\Store;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class FinanceController extends Controller
{
    public function index(){
        if(Auth::user()->role === 'admin') $data = Finance::with('store')->get();
        else $data = Finance::where('store_id', Auth::user()->id);
        return Inertia::render('Finance/IndexFinance',[
            "data" => $data,
        ]);
    }

    public function add(){
        if(Auth::user()->role === 'admin') $stores = Store::get();
        else $stores = User::where('id', Auth::user()->id)->stores;
        return Inertia::render('Finance/FormFinance',[
            "stores" => $stores,
        ]);
    }

    public function store(Request $request){
        $data = $request->validate([
            'status' => 'required|in:in,out',
            'total' => 'required',
            'source' => 'required',
            'store_id' => 'required',
        ]);
        $data['date'] = date('Y-m-d');
        if(Finance::create($data)){
            return to_route('finance')->with("isSuccess", true)->with("message","Berhasil menambahkan");
        }
        return to_route('finance')->with("isSuccess", false)->with("message","Gagal menambahkan");
    }

    public function edit(Finance $finance){
        if(Auth::user()->role === 'admin') $stores = Store::get();
        else $stores = User::where('id', Auth::user()->id)->stores;
        return Inertia::render('Finance/FormFinance',[
            "finance" => $finance,
            "stores" => $stores,
        ]);
    }

    public function update(Request $request){
        $data = $request->validate([
            'status' => 'required|in:in,out',
            'total' => 'required',
            'source' => 'required',
            'store_id' => 'required',
        ]);
        if(Finance::where('id', $request->id)->update($data)){
            return to_route('finance')->with("isSuccess", true)->with("message","Update berhasil");
        }
        return to_route('finance')->with("isSuccess", false)->with("message","Update gagal");
    }

    public function destroy(Request $request){
        if(Finance::where('id', $request->id)->delete()){
            return to_route('finance')->with("isSuccess", true)->with("message","Berhasil dihapus");
        }
        return to_route('finance')->with("isSuccess", false)->with("message","Gagal dihapus");
    }
}
