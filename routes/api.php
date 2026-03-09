<?php

use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\RajaongkirController;
use App\Http\Controllers\Api\webhookController;
use Illuminate\Support\Facades\Route;

// rajaongkir

// migrate
Route::get('/raja-ongkir/migration', [RajaongkirController::class, 'migration']);
Route::post('/raja-ongkir/migrate-provinces', [RajaongkirController::class, 'migrateProvinces']);
Route::post('/raja-ongkir/migrate-cities', [RajaongkirController::class, 'migrateCities']);
Route::post('/raja-ongkir/migrate-districts', [RajaongkirController::class, 'migrateDistricts']);
Route::post('/raja-ongkir/migrate-sub-districts', [RajaongkirController::class, 'migrateSubdistricts']);

// get data
Route::get('/rajaongkir/province', [RajaongkirController::class, 'province']);
Route::get('/rajaongkir/city/{id}', [RajaongkirController::class, 'city']);
Route::get('/rajaongkir/district/{id}', [RajaongkirController::class, 'district']);
Route::get('/rajaongkir/subdistrict/{id}', [RajaongkirController::class, 'subdistrict']);

Route::post('/rajaongkir/calculatecost', [RajaongkirController::class, 'calculateCost']);

// webhook midtrans
Route::post('/webhook/midtrans', [webhookController::class, 'webhookNotification']);

// product
Route::get('/products', [ProductController::class, 'search'])->name('api.products.search');
