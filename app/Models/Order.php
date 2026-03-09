<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'order_date',
        'order_code',
        'status',
        'shipping_method_detail',
        'shipping_address_detail',
        'subtotal',
        'shipping_cost',
        'tax',
        'grand_total',
        'resi_code',
        'notes',
    ];

    protected $casts = [
        'order_date' => 'datetime',
        'shipping_detail' => 'array',
        'shipping_address_detail' => 'array',
        'subtotal' => 'decimal:2',
        'shipping_cost' => 'decimal:2',
        'tax' => 'decimal:2',
        'grand_total' => 'decimal:2',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class)->orderBy('created_at', 'desc');
    }

    public function invoice(): HasOne
    {
        return $this->hasOne(Invoice::class);
    }

    public static function generateOrderCode(): string
    {
        $prefix = 'MN';
        $date = now()->format('Ymd');

        do {
            $random = str_pad(mt_rand(1, 9999), 4, '0', STR_PAD_LEFT);
            $code = $prefix . '-' . $date . '-' . $random;
        } while (self::where('order_code', $code)->exists());

        return $code;
    }

    protected static function booted()
    {
        // Automatically generate order code and set order date when creating
        static::creating(function ($order) {
            if (empty($order->order_code)) {
                $order->order_code = self::generateOrderCode();
            }
            if (empty($order->order_date)) {
                $order->order_date = now();
            }
        });
    }
}
