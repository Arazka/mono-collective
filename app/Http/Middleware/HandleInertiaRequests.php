<?php

namespace App\Http\Middleware;

use App\Models\Cart;
use App\Models\Category;
use App\Models\Wishlist;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => fn() => $request->user()
                    ? [
                        'id' => $request->user()->id,
                        'name' => $request->user()->name,
                        'email' => $request->user()->email,
                    ]
                    : null,
            ],

            'cartCount' => fn() => $request->user() ? Cart::where('user_id', $request->user()->id)->count() : 0,

            'cartItems' => fn() => $request->user()
                ? Cart::where('user_id', $request->user()->id)
                ->with(['product', 'product.thumbImage', 'variant'])
                ->latest()
                ->get()
                : null,

            'subtotalCartItems' => fn() => $request->user()
                ? Cart::where('user_id', $request->user()->id)
                ->with(['product'])
                ->get()
                ->sum(fn($cart) => $cart->subtotal)
                : 0,

            'myWishlist' => fn() => $request->user() ? Wishlist::where('user_id', $request->user()->id)->latest()->get() : null,

            'categories' => fn() => Category::oldest()->get(),

            'flash' => [
                'message' => fn() => $request->session()->get('message'),
                'success' => fn() => $request->session()->get('success'),
                'error' => fn() => $request->session()->get('error'),
            ],
        ];
    }
}
