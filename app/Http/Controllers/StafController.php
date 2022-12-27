<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class StafController extends Controller
{
    public function index(){
        $data = User::where('role', 'staf')->get();
        return Inertia::render('Staf/IndexStaf',[
            "data" => $data,
        ]);
    }

    public function store(Request $request){
        $data = $request->validate([
            "name" => "required|string|max:255",
            "username" => "required|string|min:6|max:255|unique:".User::class,
        ]);

        $data["username"] = strtolower($data["username"]);
        // add default password yaitu 123456
        $data["password"] = Hash::make('123456');
        $data["role"] = "staf";

        if(User::create($data)){
            return to_route('staf')->with("isSuccess", true)->with("message","Berhasil menambahkan");
        }
        return to_route('staf')->with("isSuccess", false)->with("message","Gagal menambahkan");
    }

    public function update(Request $request){
        $data = $request->validate([
            "name" => "required|string|max:255",
            "username" => "required|string|min:6|max:255|unique:".User::class,
        ]);
        $data["username"] = strtolower($data["username"]);
        $data["role"] = "staf";

        if(User::where('id', $request->id)->update($data)){
            return to_route('staf')->with("isSuccess", true)->with("message","Berhasil diupdate");
        }
        return to_route('staf')->with("isSuccess", false)->with("message","Gagal diupdate");
    }

    public function destroy(Request $request){
        if(User::where('id', $request->id)->where('role', $request->role)->delete()){
            return back()->with("isSuccess", true)->with("message","Berhasil dihapus");
        }
        return back()->with("isSuccess", false)->with("message","Gagal dihapus");
    }

    public function resetPassword(Request $request){
        // add default password yaitu 123456
        $data["password"] = Hash::make('123456');
        if(User::where('id', $request->id)->where('role', $request->role)->update($data)){
            return back()->with("isSuccess", true)->with("message","Password berhasil direset");
        }
        return back()->with("isSuccess", false)->with("message","Password gagal direset");
    }
}
