<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Finance extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function store(){
        return $this->belongsTo(Store::class);
    }

    public function pawn(){
        return $this->hasOne(Pawn::class);
    }

    public function release(){
        return $this->hasOne(Release::class);
    }
}
