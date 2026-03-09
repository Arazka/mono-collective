<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::where('user_id', Auth::user()->id)->select([
            'order_date',
            'order_code',
            'status',
            'grand_total',
        ])
            ->latest()
            ->get();

        return Inertia::render('Auth/Dashboard/Order/OrderPage', compact('orders'));
    }

    public function show($order_code)
    {
        $orderDetail = Order::with('orderItems', 'orderItems.product.thumbImage', 'invoice')
            ->where('user_id', Auth::user()->id)
            ->where('order_code', $order_code)
            ->first();

        return Inertia::render('Auth/Dashboard/Order/OrderDetailPage', compact('orderDetail'));
    }
}
