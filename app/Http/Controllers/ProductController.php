<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
  public function index()
  {
    $products = Product::with('thumbImage')
      ->where('status', 'publish')
      ->select([
        'id',
        'name',
        'slug',
        'price',
      ])
      ->latest()
      ->get();

    return Inertia::render('Home/Home', compact('products'));
  }

  public function show($slug)
  {
    $product = Product::with(['variants', 'images'])->where('slug', $slug)->first();

    if (!$product) {
      return redirect()->route('home');
    }

    return Inertia::render('ProductDetail/ProductDetailPage', compact('product'));
  }

  public function search(Request $request)
  {
    $keywoard = $request->input('keywoard');

    $products = [];

    if ($keywoard) {
      $products = Product::with('thumbImage')
        ->whereLike('name', '%' . $keywoard . '%')
        ->orWhereLike('slug', '%' . $keywoard . '%')
        ->latest()
        ->paginate(5);
    }

    return Inertia::render('Home/Search', [
      'keywoard' => $keywoard,
      'products' => $products
    ]);
  }
}
