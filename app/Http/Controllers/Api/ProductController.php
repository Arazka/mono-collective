<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function search(Request $request)
    {
        $keywoard = $request->input('search');

        if (!$keywoard) {
            return $this->sendError('Search is rquired!', [], 400);
        }

        $products = Product::with('thumbImage')
            ->whereLike('name', '%' . $keywoard . '%')
            ->orWhereLike('slug', '%' . $keywoard . '%')
            ->latest()
            ->paginate(5);

        if ($products->isEmpty()) {
            return $this->sendError('Product not found', [], 404);
        }

        return $this->sendResponse($products, 'Products find!');
    }
}
