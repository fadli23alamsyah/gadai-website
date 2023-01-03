<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function users(){
        return $this->belongsToMany(User::class, 'user_store');
    }

    public function finances(){
        return $this->hasMany(Finance::class);
    }

    public function pawns(){
        return $this->hasMany(Pawn::class);
    }

    public function releases(){
        return $this->hasMany(Release::class);
    }
}
