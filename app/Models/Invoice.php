<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Invoice extends Model
{
    protected $fillable = [
        'order_id',
        'paid_at',
        'expired_at',
        'status',
        'payment_type',
        'bank',
        'va_number',
        'qr_code_url',
        'amount',
        'payment_response',
        'webhook_response',
    ];

    protected $casts = [
        'paid_at' => 'datetime',
        'expired_at' => 'datetime',
        'payment_response' => 'array',
        'webhook_response' => 'array',
    ];

    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class, 'order_id');
    }
}
