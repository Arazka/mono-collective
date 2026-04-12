<?php

namespace App\Http\Controllers;

use App\Enums\InvoiceStatus;
use App\Enums\OrderStatus;
use App\Models\Cart;
use App\Models\Order;
use App\Models\ProductVariant;
use App\Models\UserShippingAddress;
use App\Service\MidtransService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CheckoutConrtoller extends Controller
{
  protected $midtransService;

  public function __construct(MidtransService $midtransService)
  {
    $this->midtransService = $midtransService;
  }

  public function index()
  {
    // check cart item
    $existingCarts = Cart::where('user_id', Auth::user()->id)
      ->with(['product', 'product.thumbImage', 'variant'])
      ->latest()
      ->get();
    if ($existingCarts->isEmpty()) {
      return redirect()->route('home')->with('error', 'Cart item not found');
    };

    // check user address
    $existingAddresses = UserShippingAddress::where('user_id', Auth::user()->id)->latest()->get();
    if ($existingAddresses->isEmpty()) {
      return redirect()->route('address.index')->with('error', 'Please add address first');
    };

    // subtotal
    $subtotal = Cart::where('user_id', Auth::user()->id)
      ->with(['product'])
      ->get()
      ->sum(fn($cart) => $cart->subtotal);

    // calculate weight
    $weight = $existingCarts->sum(fn($cart) => $cart->quantity * $cart->variant->weight);

    return Inertia::render('Checkout/CheckoutPage', [
      'carts' => $existingCarts,
      'addresses' => $existingAddresses,
      'subtotal' => $subtotal,
      'weight' => $weight
    ]);
  }

  public function store(Request $request)
  {
    // dd($request);
    $shippingAddressDetail = $request->shipping_address_detail;
    $shippingMethodDetail = $request->shipping_method_detail;
    $paymentType = $request->payment_type;
    $bank = $request->bank;

    // check shipping address
    if (!$shippingAddressDetail) {
      return back()->with('error', 'Please choose shipping address');
    }

    // check shipping method
    if (!$shippingMethodDetail) {
      return back()->with('error', 'Please choose shipping method');
    }

    // check payment type
    if (!$paymentType) {
      return back()->with('error', 'Please choose payment method');
    }

    // check shipping address by user
    $shippingAddress = UserShippingAddress::where('user_id', Auth::user()->id)->where('id', $shippingAddressDetail)->first();
    if (!$shippingAddress) {
      return back()->with('error', 'Address not found');
    }

    // check cart items by user
    $cartItems = Cart::where('user_id', Auth::user()->id)
      ->with(['product', 'product.thumbImage', 'variant'])
      ->latest()
      ->get();
    if ($cartItems->isEmpty()) {
      return back()->with('error', 'Cart items not found');
    }

    // calculate subtotal, weight and tax
    $subtotal = Cart::where('user_id', Auth::user()->id)
      ->with(['product'])
      ->get()
      ->sum(fn($cart) => $cart->subtotal);
    // $weight = $cartItems->sum(fn($cart) => $cart->quantity * $cart->variant->weight);
    $tax = $subtotal * 0.12;
    $grandTotal = $subtotal + $tax + $shippingMethodDetail['cost'];

    // create order
    $order = Auth::user()->orders()->create([
      'order_date' => now(),
      'status' => OrderStatus::PENDING_PAYEMNT,
      'shipping_method_detail' => json_encode($shippingMethodDetail),
      'shipping_address_detail' => $shippingAddress,
      'subtotal' => $subtotal,
      'shipping_cost' => $shippingMethodDetail['cost'],
      'tax' => $tax,
      'grand_total' => $grandTotal,
      'resi_code' => null,
      'notes' => null,
    ]);

    // create order items
    foreach ($cartItems as $cart) {
      $order->orderItems()->create([
        'product_id' => $cart->product->id,
        'product_variant_id' => $cart->variant->id,
        'product_image_path' => null,
        'product_image_url' => null,
        'product_name' => $cart->product->name,
        'product_size' => $cart->variant->size,
        'price' => $cart->product->price,
        'quantity' => $cart->quantity,
        'subtotal' => $cart->quantity * $cart->product->price,
      ]);
    }

    // create transaction using midtrans core api
    $paymentResponse = $this->midtransService->createTransaction($order, $paymentType, $bank);
    // dd($paymentResponse);

    $order->invoice()->create([
      'expired_at' => $paymentResponse->expiry_time ?? null,
      'status' => InvoiceStatus::UNPAID,
      'payment_type' => $paymentResponse->payment_type,
      'bank' => $paymentResponse->va_numbers[0]->bank ?? null,
      'va_number' => $paymentResponse->va_numbers[0]->va_number ?? null,
      'qr_code_url' => $paymentResponse->actions[0]->url ?? null,
      'amount' => $order->grand_total,
      'payment_response' => $paymentResponse
    ]);

    foreach ($cartItems as $cart) {
      $cart->variant()->decrement('stock', $cart->quantity);
    }

    Cart::where('user_id', Auth::user()->id)->delete();

    return redirect()->route('order.show', $order->order_code)->with('success', 'Create order successfully!');
  }
}
