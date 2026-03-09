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
        Schema::table('user_shipping_addresses', function (Blueprint $table) {
            $table->unsignedInteger('shipping_district_id')->nullable()->after('shipping_city_id');
            $table->string('shipping_district_name')->after('shipping_city_name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_shipping_addresses', function (Blueprint $table) {
            $table->dropColumn('shipping_district_id');
            $table->dropColumn('shipping_district_name');
        });
    }
};
