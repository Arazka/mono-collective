<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_shipping_addresses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('shipping_name', 100);
            $table->string('shipping_phone', 15);
            $table->string('shipping_address_detail');
            $table->unsignedInteger('shipping_province_id');
            $table->unsignedInteger('shipping_city_id');
            $table->unsignedInteger('shipping_subdistrict_id')->nullable();
            $table->string('shipping_province_name');
            $table->string('shipping_city_name');
            $table->string('shipping_subdistrict_name');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_shipping_addresses');
    }
};
