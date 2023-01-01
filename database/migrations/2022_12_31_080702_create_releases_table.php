<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('releases', function (Blueprint $table) {
            $table->id();
            $table->string('main',256);
            $table->string('interest',256);
            $table->enum('status',['redeem','auction']);
            $table->foreignId('pawn_id')->constrained('pawns');
            $table->foreignId('customer_id')->constrained('customers');
            $table->foreignId('finance_id')->constrained('finances');
            $table->foreignId('store_id')->constrained('stores');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('releases');
    }
};
