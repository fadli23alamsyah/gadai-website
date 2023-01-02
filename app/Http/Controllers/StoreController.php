<?php

namespace App\Http\Controllers;

use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
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
            'address' => 'required'
        ]);

        if(Store::create($data)){
            return to_route('store')->with("isSuccess", true)->with("message","Berhasil menambahkan");
        }
        return to_route('store')->with("isSuccess", false)->with("message","Gagal menambahkan");
    }

    public function update(Request $request){
        $data = $request->validate([
            'name' => 'required',
            'address' => 'required'
        ]);

        if(Store::where('id', $request->id)->update($data)){
            return to_route('store')->with("isSuccess", true)->with("message","Update berhasil");
        }
        return to_route('store')->with("isSuccess", false)->with("message","Update gagal");
    }

    public function destroy(Request $request){
        if(Store::where('id', $request->id)->delete()){
            return to_route('store')->with("isSuccess", true)->with("message","Berhasil dihapus");
        }
        return to_route('store')->with("isSuccess", false)->with("message","Gagal dihapus");
    }
}
