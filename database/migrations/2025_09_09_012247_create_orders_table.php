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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->dateTime('order_date')->nullable();
            $table->string('order_code')->nullable()->unique();
            $table->string('status')->nullable()->default('1');
            $table->json('shipping_method_detail')->nullable();
            $table->json('shipping_address_detail')->nullable();
            $table->decimal('subtotal', 15, 2)->nullable()->default(0);
            $table->decimal('shipping_cost', 15, 2)->nullable()->default(0);
            $table->decimal('tax', 15, 2)->nullable()->default(0);
            $table->decimal('grand_total', 15, 2)->nullable()->default(0);
            $table->string('resi_code')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();

            // Foreign key constraint
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
