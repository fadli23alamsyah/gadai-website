<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function pawns(){
        return $this->hasMany(Pawn::class);
    }

    public function releases(){
        return $this->hasMany(Release::class);
    }
}
