<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class FinanceController extends Controller
{
    public function index(){
        $data = [];
        return Inertia::render('Finance/IndexFinance',[
            "data" => $data,
        ]);
    }

    public function store(Request $request){}

    public function update(Request $request){}

    public function destroy(Request $request){}
}
