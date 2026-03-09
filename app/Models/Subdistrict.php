<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subdistrict extends Model
{
    protected $fillable = [
        'id',
        'district_id',
        'name',
        'zip_code',
    ];
}
