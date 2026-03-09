<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserShippingAddress extends Model
{
    protected $fillable = [
        'user_id',
        'shipping_name',
        'shipping_phone',
        'shipping_address_detail',
        'shipping_province_id',
        'shipping_city_id',
        'shipping_district_id',
        'shipping_subdistrict_id',
        'shipping_province_name',
        'shipping_city_name',
        'shipping_district_name',
        'shipping_subdistrict_name',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
