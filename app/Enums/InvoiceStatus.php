<?php

namespace App\Enums;

enum InvoiceStatus
{
    const UNPAID = '1';
    const PAID = '2';
    const EXPIRED = '3';
    const CANCELED = '4';
}
