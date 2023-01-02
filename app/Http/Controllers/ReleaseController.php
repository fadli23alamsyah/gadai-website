<?php

namespace App\Http\Controllers;

use App\Models\Pawn;
use App\Models\Release;
use App\Models\Store;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ReleaseController extends Controller
{
    public function index(){
        $stores = (Auth::user()->role === 'admin') 
            ? Store::select('id')->get() 
            : User::find(Auth::user()->id)->stores()->get()->map(fn($store) => $store->id);
        $data = Release::orderBy('releases.created_at', 'desc')
            ->whereIn('releases.store_id', $stores)
            ->with('customer')->with('pawn')->with('finance')->with('store')->get();
        return Inertia::render('Release/IndexRelease',[
            "data" => $data,
        ]);
    }

    public function edit(Release $release){
        return Inertia::render('Release/FormRelease',[
            "release" => $release->customer,
            "release" => $release->pawn,
            "release" => $release->finance,
            "release" => $release,
        ]);
    }

    public function update(Request $request){
        $request->validate([
            'name' => 'required',
            'phone' => 'required|numeric',
            'main' => 'required|numeric',
            'interest' => 'required|numeric',
            'total' => 'required|numeric',
        ]);

        if($request->id === '' || $request->id <= 0) return to_route('release')->with("isSuccess", false)->with("message","Gagal diupdate");
        
        $release = Release::find($request->id);
        $release->update([
            'main' => $request->main,
            'interest' => $request->interest,
        ]);

        $release->customer()->update([
            'name' => $request->name,
            'phone' => $request->phone,
        ]);

        $release->finance()->update([
            'total' => $request->total,
            'source' => ($release->status === 'auction' ? 'Lelang ' : 'Tebus ') .$release->pawn->type .' oleh '.$request->name,
        ]);

        // update data finance pawn if status equal redeem
        if($release->status === 'redeem'){
            Pawn::find($release->pawn_id)->finance()->update([
                'source' => 'Gadai '.$release->pawn->type.' oleh '.$request->name,
            ]);
        }

        if($release->save()) return to_route('release')->with("isSuccess", true)->with("message","Berhasil diupdate");
        return to_route('release')->with("isSuccess", false)->with("message","Gagal diupdate");
    }

    public function destroy(Request $request){
        $release = Release::find($request->id);
        $release->delete();
        $release->finance()->delete();

        $pawn = Pawn::find($release->pawn_id);
        $pawn->delete();
        if($release->status === 'auction') $pawn->customer()->delete();
        $pawn->finance()->delete();

        if($release->customer()->delete()){
            return to_route('release')->with("isSuccess", true)->with("message","Berhasil dihapus");
        }
        return to_route('release')->with("isSuccess", false)->with("message","Gagal dihapus");
    }
}
