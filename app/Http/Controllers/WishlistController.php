<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Wishlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WishlistController extends Controller
{
    public function index()
    {
        $wishlists = Wishlist::where('user_id', Auth::user()->id)
            ->with(['product', 'product.thumbImage'])
            ->latest()
            ->get();

        return Inertia::render('Auth/Dashboard/Wishlist/WishlistPage', compact('wishlists'));
    }

    public function addToWishlist(Request $request)
    {
        $request->validate([
            'product_id' => 'exists:products,id'
        ]);

        if (!Auth::check()) {
            return redirect()->route('login')->with('error', 'Please login first');
        }

        if (!$request->product_id) {
            return back()->with('error', 'Product not found');
        }

        $existingWishlistItem = Auth::user()->wishlists()->where('product_id', $request->product_id)->first();

        if (!$existingWishlistItem) {
            Auth::user()->wishlists()->create(['product_id' => $request->product_id]);
            return back()->with('success', 'Product added to wishlist successfully!');
        } else {
            $existingWishlistItem->delete();
            return back()->with('success', 'Product remove from wishlist successfully!');
        }
    }
}
