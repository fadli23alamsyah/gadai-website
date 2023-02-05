<?php

namespace App\Http\Controllers;

use App\Models\Store;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class StoreController extends Controller
{
    public function index(){
        $data = Store::orderBy('created_at','desc')->get();
        return Inertia::render('Store/IndexStore', [
            'data' => $data,
        ]);
    }

    public function store(Request $request){
        $data = $request->validate([
            'name' => 'required',
            'address' => 'required',
            'balance' => 'required|numeric',
        ]);

        if(Store::create($data)){
            return to_route('store')->with("isSuccess", true)->with("message","Berhasil menambahkan");
        }
        return to_route('store')->with("isSuccess", false)->with("message","Gagal menambahkan");
    }

    public function update(Request $request){
        $data = $request->validate([
            'name' => 'required',
            'address' => 'required',
            'balance' => 'required|numeric',
        ]);

        if(Store::where('id', $request->id)->update($data)){
            return to_route('store')->with("isSuccess", true)->with("message","Update berhasil");
        }
        return to_route('store')->with("isSuccess", false)->with("message","Update gagal");
    }

    public function destroy(Request $request){
        $store = Store::withExists(['releases', 'pawns', 'finances'])->find($request->id);
        if(!$store->releases_exists && !$store->pawns_exists && !$store->finances_exists){
            $store->delete();
            return to_route('store')->with("isSuccess", true)->with("message","Berhasil dihapus");
        }
        return to_route('store')->with("isSuccess", false)->with("message","Gagal dihapus, masih terdapat relasi untuk ".$request->name);
    }

    public function info(){
        // Function for staf
        $auth = Auth::user();
        if($auth->role === 'admin') return to_route('store')->with(["isSuccess" => false, "message" => "Hanya untuk staf"]);
        $store = User::find($auth->id)->stores()->first();
        return Inertia::render('Store/InfoStore', ["store" => $store]);
    }

    public function updateinfo(Request $request){
        $data = $request->validate([
            'name' => 'required',
            'address' => 'required',
            'balance' => 'required|numeric',
        ]);

        if(Store::where('id', $request->id)->update($data)){
            return back()->with(["isSuccess" => true, "message" =>"Update berhasil"]);
        }
        return back()->with(["isSuccess" => true, "message" =>"Update gagal"]);
    }
}
