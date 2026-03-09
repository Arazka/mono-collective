<?php

use App\Http\Controllers\AddressController;
use App\Http\Controllers\Api\RajaongkirController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\CheckoutConrtoller;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WishlistController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// home, produt detail
Route::get('/', [ProductController::class, 'index'])->name('home');
Route::get('/search', [ProductController::class, 'search'])->name('home.search');
Route::get('/product/{slug}', [ProductController::class, 'show']);
// Route::get('/product/search', [ProductController::class, 'search'])->name('product.search');

// wishlist
Route::post('/wishlist/add', [WishlistController::class, 'addToWishlist'])->name('wishlist.add');

// categories
Route::get('/category/{slug}', [CategoriesController::class, 'show']);

// dashhboard customer
Route::prefix('/account')->middleware('auth')->group(function () {

    Route::get('/order', [OrderController::class, 'index'])->name('order.index');
    Route::get('/order/{order_code}', [OrderController::class, 'show'])->name('order.show');

    Route::get('/wishlist', [WishlistController::class, 'index'])->name('wishlist.index');

    // address
    Route::get('/address', [AddressController::class, 'index'])->name('address.index');
    Route::get('/address/create', [AddressController::class, 'create'])->name('address.create');
    Route::post('/address/create', [AddressController::class, 'store'])->name('address.store');
    Route::get('/address/edit/{id}', [AddressController::class, 'edit'])->name('address.edit');
    Route::put('/address/edit/{id}', [AddressController::class, 'update'])->name('address.update');
    Route::delete('/address/{id}', [AddressController::class, 'destroy'])->name('address.delete');

    Route::get('/account-info', function () {
        return Inertia::render('Auth/Dashboard/Account/AccountInfoPage');
    });
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::post('/cart/add', [CartController::class, 'addToCart'])->name('cart.add');
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // cart
    Route::put('/cart/update/quantity', [CartController::class, 'updateQuantity'])->name('cart.update.quantity');
    Route::delete('/cart/delete/{product_id}', [CartController::class, 'destroy'])->name('cart.delete');

    // checkout
    Route::get('/checkout', [CheckoutConrtoller::class, 'index'])->name('checkout.index');
    Route::post('/checkout/store', [CheckoutConrtoller::class, 'store'])->name('checkout.store');
});

require __DIR__ . '/auth.php';
