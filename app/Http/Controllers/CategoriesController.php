<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoriesController extends Controller
{
  public function show($slug)
  {
    $category = Category::where('slug', $slug)->first();
    $products = Product::with('thumbImage')
      ->where('category_id', $category->id)
      ->where('status', 'publish')
      ->latest()
      ->get();

    return Inertia::render('Category/CategoryPage', compact('category', 'products'));
  }
}
