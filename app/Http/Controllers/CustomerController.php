<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Finance;
use App\Models\Pawn;
use App\Models\Release;
use App\Models\Store;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CustomerController extends Controller
{
    public function index(){
        $data = Pawn::whereNotIn('id', Release::select('pawn_id')->get())
            ->with('customer')->with('finance')->with('store')->get();
        return Inertia::render('Customer/IndexCustomer',[
            "data" => $data,
        ]);
    }

    public function add(){
        if(Auth::user()->role === 'admin') $stores = Store::get();
        else $stores = User::where('id', Auth::user()->id)->first()->stores;
        return Inertia::render('Customer/FormCustomer',[
            "stores" => $stores,
        ]);
    }

    public function store(Request $request){
        $request->validate([
            'name' => 'required',
            'phone' => 'required|numeric',
            'type' => 'required',
            'total' => 'required|numeric',
            'interest' => 'required|numeric',
            'store_id' => 'required',
        ]);

        $customer = Customer::create([
            'name' => $request->name,
            'phone' => $request->phone,
        ]);

        $save = Finance::create([
            'date' => date('Y-m-d'),
            'total' => $request->total,
            'status' => 'out',
            'source' => 'Pengambilan dana oleh '.$request->name.' dengan menggadaikan '.$request->type,
            'store_id' => $request->store_id,
        ])->pawn()->create([
            'type' => $request->type,
            'interest' => $request->interest,
            'additional' => $request->additional,
            'customer_id' => $customer->id,
            'store_id' => $request->store_id,
        ]);

        if($save){
            return to_route('customer')->with("isSuccess", true)->with("message","Berhasil menambahkan");
        }
        return to_route('customer')->with("isSuccess", false)->with("message","Gagal menambahkan");
    }

    public function edit(Pawn $pawn){
        if(Auth::user()->role === 'admin') $stores = Store::get();
        else $stores = User::where('id', Auth::user()->id)->first()->stores;
        return Inertia::render('Customer/FormCustomer',[
            "stores" => $stores,
            "pawn" => $pawn->customer,
            "pawn" => $pawn->finance,
            "pawn" => $pawn,
        ]);
    }

    public function update(Request $request){
        $request->validate([
            'name' => 'required',
            'phone' => 'required|numeric',
            'type' => 'required',
            'total' => 'required|numeric',
            'interest' => 'required|numeric',
            'store_id' => 'required',
        ]);

        $pawn = Pawn::find($request->id);
        $pawn->update([
            'type' => $request->type,
            'interest' => $request->interest,
            'additional' => $request->additional,
            'store_id' => $request->store_id,
        ]);
        $pawn->customer()->update([
            'name' => $request->name,
            'phone' => $request->phone,
        ]);
        $pawn->finance()->update([
            'total' => $request->total,
            'source' => 'Pengambilan dana oleh '.$request->name.' dengan menggadaikan '.$request->type,
            'store_id' => $request->store_id,
        ]);

        if($pawn){
            return to_route('customer')->with("isSuccess", true)->with("message","Update berhasil");
        }
        return to_route('customer')->with("isSuccess", false)->with("message","Update gagal");
    }

    public function destroy(Request $request){
        $pawn = Pawn::find($request->id);
        $pawn->delete();
        $pawn->customer()->delete();
        $pawn->finance()->delete();

        if($pawn){
            return to_route('customer')->with("isSuccess", true)->with("message","Berhasil dihapus");
        }
        return to_route('customer')->with("isSuccess", false)->with("message","Gagal dihapus");
    }
}
