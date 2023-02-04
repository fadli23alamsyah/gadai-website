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
        $stores = (Auth::user()->role === 'admin') 
            ? Store::select('id')->get() 
            : User::find(Auth::user()->id)->stores()->get()->map(fn($store) => $store->id);
        $data = Pawn::whereNotIn('id', Release::select('pawn_id')->get())
            ->whereIn('store_id', $stores)
            ->orderBy('created_at','desc')
            ->with('customer')->with('finance')->with('store')->get();
        return Inertia::render('Customer/IndexCustomer',[
            "data" => $data,
        ]);
    }

    public function add(){
        if(Auth::user()->role === 'admin') $stores = Store::get();
        else $stores = User::find(Auth::user()->id)->stores;
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
            'date' => 'required|date',
        ]);

        $customer = Customer::create([
            'name' => $request->name,
            'phone' => $request->phone,
        ]);

        $save = Finance::create([
            'date' => $request->date,
            'total' => $request->total,
            'status' => 'out',
            'source' => 'Gadai '.$request->type.' oleh '.$request->name,
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
        else $stores = User::find(Auth::user()->id)->stores;
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
            'date' => 'required|date',
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
            'date' => $request->date,
            'total' => $request->total,
            'source' => 'Gadai '.$request->type.' oleh '.$request->name,
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

    public function show(Pawn $pawn){
        if($pawn) return Inertia::render('Customer/ShowCustomer',[
            "pawn" => $pawn->store,
            "pawn" => $pawn->customer,
            "pawn" => $pawn->finance,
            "pawn" => $pawn,
        ]);
        return to_route('customer')->with("isSuccess", false)->with("message","Gagal menampilkan detail data");
    }

    public function release(Request $request, Pawn $pawn){
        $request->validate([
            'name' => 'required',
            'phone' => 'required|numeric',
            'status' => 'required|in:redeem,auction',
            'main' => 'required|numeric',
            'interest' => 'required|numeric',
            'total' => 'required|numeric',
            'date' => 'required|date',
        ]);

        if($request->status === 'auction'){
            $customer = Customer::create([
                'name' => $request->name,
                'phone' => $request->phone,
            ]);
        }

        $save = Finance::create([
            'date' => $request->date,
            'total' => $request->total,
            'status' => 'in',
            'source' => ($request->status === 'auction' ? 'Lelang ' : 'Tebus ') .$pawn->type .' oleh '.$request->name,
            'store_id' => $pawn->store_id,
        ])->release()->create([
            'main' => $request->main,
            'interest' => $request->interest,
            'status' => $request->status,
            'pawn_id' => $pawn->id,
            'customer_id' => $request->status === 'auction'? $customer->id : $pawn->customer_id,
            'store_id' => $pawn->store_id,
        ]);

        if($save){
            return to_route('customer')->with("isSuccess", true)->with("message",$request->status === 'auction'? 'Berhasil dilelang' : 'Berhasil ditebus');
        }
        return to_route('customer')->with("isSuccess", false)->with("message",$request->status === 'auction'? 'Gagal dilelang' : 'Gagal ditebus');
    }
}
