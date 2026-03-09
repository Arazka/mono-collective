<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function addToCart(Request $request)
    {
        // dd($request);
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'product_variant_id' => 'required|exists:product_variants,id',
            'quantity' => 'sometimes|integer|min:1|max:99'
        ]);

        // request
        $productID = $request->product_id;
        $productVariantID = $request->product_variant_id;
        $quantity = $request->quantity ?? 1;

        // check auth
        if (!Auth::check()) {
            return redirect()->route('login')->with('error', 'Please login first');
        }

        // check product
        $product = Product::find($productID);
        if (!$product) {
            return back()->with('error', 'Product not found');
        }

        // check variant
        $productVariant = ProductVariant::where('id', $productVariantID)->where('product_id', $product->id)->first();
        if (!$productVariant) {
            return back()->with('error', 'Size not found');
        }

        // check cart
        $existingCart = Auth::user()->carts()
            ->where('product_id', $product->id)
            ->where('product_variant_id', $productVariant->id)
            ->first();

        // add to cart
        if ($existingCart) {
            $existingCart->increment('quantity', $quantity);
        } else {
            Auth::user()->carts()->create([
                'product_id' => $product->id,
                'product_variant_id' => $productVariant->id,
                'quantity' => $quantity
            ]);
        }

        return back()->with('success', 'Product added to cart successfully!');
    }

    public function updateQuantity(Request $request)
    {
        // check auth
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        // check cart
        $existingCart = Cart::where('user_id', Auth::user()->id)->findOrFail($request->cart_id);
        if (!$existingCart) {
            return back()->with('error', 'Item not found');
        }

        // request increment
        if ($request->method == 'increment') {
            if ($existingCart->quantity >= 3) {
                return back()->with('error', 'Quantity not more than 3');
            }
            $existingCart->increment('quantity');
        }

        // request decrement
        if ($request->method == 'decrement') {
            if ($existingCart->quantity <= 1) {
                return back()->with('error', 'Quantity not under than 1');
            }
            $existingCart->decrement('quantity');
        }

        return back()->with('success', 'Update item successfully!');
    }

    public function destroy($id)
    {
        // check auth
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        // check cart
        $existingCart = Cart::where('user_id', Auth::user()->id)->findOrFail($id);
        if (!$existingCart) {
            return back()->with('error', 'Item not found');
        }

        // delete cart
        $existingCart->delete();
        return back()->with('success', 'Delete item successfully!');
    }
}
