<?php

namespace App\Models;

use App\Enums\ProductStatus;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Product extends Model
{
    //
    use SoftDeletes;

    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'price',
        'status',
        'excerpt',
        'description',
    ];

    protected $appends = ['price_rupiah'];

    protected function casts(): array
    {
        return [
            'status' => ProductStatus::class,
            'variants' => 'array',
            'images' => 'array'
        ];
    }

    protected static function booted()
    {
        static::forceDeleting(function (Product $product) {
            $product->images()->each(function ($productImage) {
                if ($productImage->image) {
                    Storage::disk('public')->delete($productImage->image);
                }
            });
        });
    }

    public function setNameAttribute($value)
    {
        $this->attributes['name'] = $value;
        $this->attributes['slug'] = Str::slug($value);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function variants(): HasMany
    {
        return $this->hasMany(ProductVariant::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(ProductImage::class)->orderby('sort_order', 'asc');
    }

    // public function productImages(): HasMany
    // {
    //     return $this->hasMany(ProductImage::class)->orderby('sort_order', 'asc');
    // }

    public function thumbImage(): HasOne
    {
        return $this->hasOne(ProductImage::class, 'product_id')->where('sort_order', '1');
    }

    // accessor
    public function getPriceRupiahAttribute()
    {
        return 'Rp ' . number_format($this->price, 0, ',', '.');
    }
}
