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
        Schema::table('invoices', function (Blueprint $table) {
            $table->dateTime('expired_at')->nullable()->change();
            $table->dateTime('paid_at')->nullable()->change();
            $table->enum('payment_type', ['bank_transfer', 'qris'])->nullable()->change();
            $table->enum('bank', ['bca', 'bni', 'bri'])->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('invoices', function (Blueprint $table) {
            $table->timestamp('expired_at')->nullable()->change();
            $table->timestamp('paid_at')->nullable()->change();
            $table->string('payment_type')->nullable()->change();
            $table->string('bank')->nullable()->change();
        });
    }
};
