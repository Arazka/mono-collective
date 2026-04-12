<?php

namespace App\Http\Controllers\Api;

use App\Enums\InvoiceStatus;
use App\Enums\OrderStatus;
use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\ProductVariant;
use Illuminate\Http\Request;

class webhookController extends Controller
{
  public function webhookNotification(Request $request)
  {
    $order_id = $request->order_id;
    $status_code = $request->status_code;
    $gross_amount = $request->gross_amount;
    $signature_key = $request->signature_key;
    $transaction_status = $request->transaction_status;
    $settlement_time = $request->settlement_time;

    $server_key = config('services.midtrans.server_key');
    $mySignatureKey = hash('sha512', $order_id . $status_code . $gross_amount . $server_key);

    // validate signature key
    if ($mySignatureKey != $signature_key) {
      return $this->sendError('Invalid signature key', [], 403);
    }

    // check order data
    $order = Order::where('order_code', $order_id)->first();
    if (!$order) {
      return $this->sendError('Order not found', [], 404);
    }

    // check invoice data
    $invoice = Invoice::where('order_id', $order->id)->first();
    if (!$invoice) {
      return $this->sendError('Invoice not found', [], 404);
    }

    if ($invoice->status != '1') {
      return $this->sendError('Invoice cannot be processed twice', [], 400);
    }

    // get order items
    $orderItems = OrderItem::where('order_id', $order->id)->get();
    if (!$orderItems) {
      return $this->sendError('Order items not found', [], 404);
    }

    // Process transaction status
    if ($transaction_status == 'settlement') {
      $order->update(['status' => OrderStatus::PROCESSING]);
      $invoice->update([
        'status' => InvoiceStatus::PAID,
        'paid_at' => $settlement_time
      ]);
    } elseif ($transaction_status == 'pending') {
      $order->update(['status' => OrderStatus::PENDING_PAYEMNT]);
      $invoice->update(['status' => InvoiceStatus::UNPAID]);
    } elseif ($transaction_status == 'deny' || $transaction_status == 'cancel') {
      $order->update(['status' => OrderStatus::CANCELED]);
      $invoice->update(['status' => InvoiceStatus::CANCELED]);
      $this->restoreStock($orderItems);
    } elseif ($transaction_status == 'expire') {
      $order->update(['status' => OrderStatus::CANCELED]);
      $invoice->update(['status' => InvoiceStatus::EXPIRED]);
      $this->restoreStock($orderItems);
    }

    // add webhook response
    $invoice->update([
      'webhook_response' => json_encode($request->all()),
    ]);

    return $this->sendResponse([], 'Webhook processed successfully');
  }

  private function restoreStock($orderItems)
  {
    foreach ($orderItems as $item) {
      ProductVariant::where('id', $item->product_variant_id)->increment('stock', $item->quantity);
    }
  }
}
