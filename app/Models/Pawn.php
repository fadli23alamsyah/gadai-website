<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pawn extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function customer(){
        return $this->belongsTo(Customer::class);
    }

    public function finance(){
        return $this->belongsTo(Finance::class);
    }

    public function store(){
        return $this->belongsTo(Store::class);
    }
}
