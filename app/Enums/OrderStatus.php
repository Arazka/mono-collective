<?php

namespace App\Enums;

enum OrderStatus
{
  const PENDING_PAYMENT = '1';
  const PROCESSING      = '2';
  const SHIPPED         = '3';
  const COMPLETED       = '4';
  const CANCELED        = '5';
}
