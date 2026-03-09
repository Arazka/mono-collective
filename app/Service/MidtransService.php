<?php

namespace App\Service;

use App\Models\Order;
use Midtrans\CoreApi;

// Set your Merchant Server Key
\Midtrans\Config::$serverKey = config('services.midtrans.server_key');
// Set to Development/Sandbox Environment (default). Set to true for Production Environment (accept real transaction).
\Midtrans\Config::$isProduction = false;
// Set sanitization on (default)
\Midtrans\Config::$isSanitized = true;
// Set 3DS transaction for credit card to true
\Midtrans\Config::$is3ds = true;

// webhook/notification
\Midtrans\Config::$overrideNotifUrl = config('services.midtrans.webhook');

class MidtransService
{
  public function createTransaction(Order $order, $paymentType, $bank)
  {
    $params = array(
      'transaction_details' => array(
        'order_id' => $order->order_code,
        'gross_amount' => $order->grand_total,
      ),
      'customer_details' => [
        'name' => $order->user->name,
        'email' => $order->user->email,
      ],
    );

    if ($paymentType == 'qris') {
      $params['payment_type'] = 'qris';
    } elseif ($paymentType == 'bank_transfer') {
      $params['payment_type'] = 'bank_transfer';
      $params['bank_transfer'] = [
        'bank' => $bank,
      ];
    }

    $response = \Midtrans\CoreApi::charge($params);

    return $response;
  }
}
