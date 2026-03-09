<?php

namespace App\Enums;

enum ProductStatus: string
{
    case Draft = 'draft';
    case Publish = 'publish';
    case Archive = 'archive';
}
