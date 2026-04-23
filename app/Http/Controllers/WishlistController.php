<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class WishlistController extends Controller
{
  public function index(Request $request)
  {
    $wishlists = $request->user()->wishlists()
      ->with(['product', 'product.thumbImage'])
      ->latest()
      ->get();

    return Inertia::render('Auth/Dashboard/Wishlist/WishlistPage', compact('wishlists'));
  }

  public function addToWishlist(Request $request)
  {
    $validated = $request->validate([
      'product_id' => 'required|exists:products,id'
    ]);

    $wishlists = $request->user()->wishlists()->where('product_id', $validated['product_id'])->first();

    if ($wishlists) {
      $wishlists->delete();
      return back()->with('success', 'Product remove from wishlist successfully!');
    }

    $request->user()->wishlists()->create($validated);

    return back()->with('success', 'Product added to wishlist successfully!');
  }
}
