<?php

namespace App\Http\Controllers;

use App\Enums\InvoiceStatus;
use App\Enums\OrderStatus;
use App\Models\Cart;
use App\Models\ProductVariant;
use App\Models\UserShippingAddress;
use App\Service\MidtransService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Exception;
use Illuminate\Support\Facades\Log;

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
    $subtotal = $existingCarts->sum(fn($cart) => $cart->subtotal);

    // calculate weight
    $weight = $existingCarts->sum(fn($cart) => $cart->quantity * $cart->variant->weight);

    return Inertia::render('Checkout/CheckoutPage', [
      'carts'     => $existingCarts,
      'addresses' => $existingAddresses,
      'subtotal'  => $subtotal,
      'weight'    => $weight
    ]);
  }

  public function store(Request $request)
  {
    $shippingAddressDetail = $request->shipping_address_detail;
    $shippingMethodDetail  = $request->shipping_method_detail;
    $paymentType           = $request->payment_type;
    $bank                  = $request->bank;

    if (!$shippingAddressDetail) {
      return back()->with('error', 'Please choose shipping address');
    }

    if (!$shippingMethodDetail) {
      return back()->with('error', 'Please choose shipping method');
    }

    if (!$paymentType) {
      return back()->with('error', 'Please choose payment method');
    }

    if ($paymentType == 'bank_transfer') {
      $allowedBanks = ['bri', 'bca', 'bni'];

      if (!in_array($bank, $allowedBanks)) {
        return back()->with('error', 'Bank not valid');
      }
    }

    $shippingAddress = UserShippingAddress::where('user_id', Auth::user()->id)->where('id', $shippingAddressDetail)->first();
    if (!$shippingAddress) {
      return back()->with('error', 'Address not found');
    }

    try {
      $orderData = DB::transaction(function () use ($shippingAddress, $shippingMethodDetail) {
        $cartItems = Cart::where('user_id', Auth::id())
          ->lockForUpdate()
          ->with([
            'product',
            'product.thumbImage',
            'variant' => fn($q) => $q->lockForUpdate(),
          ])
          ->get();

        if ($cartItems->isEmpty()) {
          throw new Exception('Cart items not found');
        }

        foreach ($cartItems as $cart) {
          if ($cart->variant->stock < $cart->quantity) {
            throw new Exception('Stock for ' . $cart->product->name . ' (size: ' . $cart->variant->size . ') is not enough');
          }
        }

        $subtotal   = $cartItems->sum(fn($cart) => $cart->subtotal);
        $tax        = $subtotal * 0.12;
        $grandTotal = $subtotal + $tax + $shippingMethodDetail['cost'];

        $order = Auth::user()->orders()->create([
          'order_date'              => now(),
          'status'                  => OrderStatus::PENDING_PAYMENT,
          'shipping_method_detail'  => json_encode($shippingMethodDetail),
          'shipping_address_detail' => $shippingAddress,
          'subtotal'                => $subtotal,
          'shipping_cost'           => $shippingMethodDetail['cost'],
          'tax'                     => $tax,
          'grand_total'             => $grandTotal,
          'resi_code'               => null,
          'notes'                   => null,
        ]);

        $orderItems = collect();

        foreach ($cartItems as $cart) {
          $orderItems->push(
            $order->orderItems()->create([
              'product_id'         => $cart->product->id,
              'product_variant_id' => $cart->variant->id,
              'product_image_path' => null,
              'product_image_url'  => null,
              'product_name'       => $cart->product->name,
              'product_size'       => $cart->variant->size,
              'price'              => $cart->product->price,
              'quantity'           => $cart->quantity,
              'subtotal'           => $cart->quantity * $cart->product->price,
            ])
          );

          $cart->variant()->decrement('stock', $cart->quantity);
        }

        // $cartItems->delete();
        Cart::where('user_id', Auth::id())->delete();

        return compact('order', 'orderItems');
      });
    } catch (\Throwable $e) {
      Log::error('failed: ' . $e->getMessage());
      return back()->with('error', 'Internal server error');
    }

    $order      = $orderData['order'];
    $orderItems = $orderData['orderItems'];

    try {
      $paymentResponse = $this->midtransService->createTransaction($order, $paymentType, $bank);

      DB::transaction(function () use ($order, $paymentResponse) {
        $order->invoice()->create([
          'expired_at'       => $paymentResponse->expiry_time ?? null,
          'status'           => InvoiceStatus::UNPAID,
          'payment_type'     => $paymentResponse->payment_type,
          'bank'             => $paymentResponse->va_numbers[0]->bank ?? null,
          'va_number'        => $paymentResponse->va_numbers[0]->va_number ?? null,
          'qr_code_url'      => $paymentResponse->actions[0]->url ?? null,
          'amount'           => $order->grand_total,
          'payment_response' => $paymentResponse,
        ]);
      });
    } catch (\Throwable $e) {
      Log::error('Create invoice failed: ' . $e->getMessage());

      DB::transaction(function () use ($orderItems, $order) {
        foreach ($orderItems as $item) {
          ProductVariant::where('id', $item->product_variant_id)
            ->where('product_id', $item->product_id)
            ->increment('stock', $item->quantity);

          Cart::create([
            'user_id'            => Auth::id(),
            'product_id'         => $item->product_id,
            'product_variant_id' => $item->product_variant_id,
            'quantity'           => $item->quantity
          ]);
        }

        $order->delete();
      });

      return back()->with('error', 'Internal server error');
    }


    return redirect()->route('order.show', $order->order_code)->with('success', 'Create order successfully!');
  }
}
