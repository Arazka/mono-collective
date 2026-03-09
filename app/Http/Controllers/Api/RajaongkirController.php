<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\City;
use App\Models\District;
use App\Models\Province;
use App\Models\Subdistrict;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Ramsey\Uuid\Type\Integer;

class RajaongkirController extends Controller
{
    public function migration()
    {
        // provinces
        // $provinces = Http::withHeader('key', config('services.rajaongkir.key'))->get('https://rajaongkir.komerce.id/api/v1/destination/province');
        // return $provinces['data'];

        // cities
        // $cities = Http::withHeader('key', config('services.rajaongkir.key'))->get('https://rajaongkir.komerce.id/api/v1/destination/city/34');
        // return $cities['data'];

        // disctrict
        // $districts = Http::withHeader('key', config('services.rajaongkir.key'))->get('https://rajaongkir.komerce.id/api/v1/destination/district/2');
        // return $districts['data'];

        // subdisctrict
        $subdistricts = Http::withHeader('key', config('services.rajaongkir.key'))->get('https://rajaongkir.komerce.id/api/v1/destination/sub-district/3829');
        return $subdistricts['data'];
    }

    public function migrateProvinces()
    {
        $response = Http::withHeader('key', config('services.rajaongkir.key'))->get('https://rajaongkir.komerce.id/api/v1/destination/province');

        foreach ($response['data'] as $data) {
            $provinceID = Province::find($data['id']);

            if (!$provinceID) {
                Province::create([
                    'id' => $data['id'],
                    'name' => $data['name'],
                ]);
            }
        }

        return response()->json(['messagee' => 'Success migrate province data!']);
    }

    public function migrateCities()
    {
        foreach (Province::all() as $province) {
            $response = Http::withHeader('key', config('services.rajaongkir.key'))->get("https://rajaongkir.komerce.id/api/v1/destination/city/{$province->id}");

            foreach ($response['data'] as $data) {
                $cityID = City::find($data['id']);

                if (!$cityID) {
                    City::create([
                        'id' => $data['id'],
                        'province_id' => $province->id,
                        'name' => $data['name'],
                    ]);
                }
            }
        }

        return response()->json(['messagee' => 'Success migrate cities data!']);
    }

    public function migrateDistricts()
    {
        // foreach (City::all() as $city) {
        //     $response = Http::withHeader('key', config('services.rajaongkir.key'))->get("https://rajaongkir.komerce.id/api/v1/destination/district/{$city->id}");
        //     $body = $response->json();

        //     foreach ($body['data'] as $data) {
        //         $districtID = District::find($data['id']);

        //         if (!$districtID) {
        //             District::create([
        //                 'id' => $data['id'],
        //                 'city_id' => $city->id,
        //                 'name' => $data['name'],
        //             ]);
        //         }
        //     }
        // }

        $response = Http::withHeader('key', config('services.rajaongkir.key'))->get("https://rajaongkir.komerce.id/api/v1/destination/district/259");
        $body = $response->json();

        foreach ($body['data'] as $data) {
            $districtID = District::find($data['id']);

            if (!$districtID) {
                District::create([
                    'id' => $data['id'],
                    'city_id' => 259,
                    'name' => $data['name'],
                ]);
            }
        }

        return response()->json(['messagee' => 'Success migrate districts data!']);
    }

    public function migrateSubdistricts()
    {
        // foreach (City::all() as $city) {
        //     $response = Http::withHeader('key', config('services.rajaongkir.key'))->get("https://rajaongkir.komerce.id/api/v1/destination/district/{$city->id}");
        //     $body = $response->json();

        //     foreach ($body['data'] as $data) {
        //         $districtID = District::find($data['id']);

        //         if (!$districtID) {
        //             District::create([
        //                 'id' => $data['id'],
        //                 'city_id' => $city->id,
        //                 'name' => $data['name'],
        //             ]);
        //         }
        //     }
        // }

        $response = Http::withHeader('key', config('services.rajaongkir.key'))->get("https://rajaongkir.komerce.id/api/v1/destination/sub-district/2588");
        $body = $response->json();

        foreach ($body['data'] as $data) {
            $subdistrictID = Subdistrict::find($data['id']);

            if (!$subdistrictID) {
                Subdistrict::create([
                    'id' => $data['id'],
                    'district_id' => 2588,
                    'name' => $data['name'],
                    'zip_code' => $data['zip_code'],
                ]);
            }
        }

        return response()->json(['messagee' => 'Success migrate subdistricts data!']);
    }

    public function province()
    {
        try {
            $province = Province::all();
            return $this->sendResponse($province, 'Provinces Retrieved Successfully!');
        } catch (\Throwable $th) {
            return $this->sendError('Internal server error', [], 500);
        }
    }

    public function city($province_id)
    {
        try {
            $cities = City::where('province_id', $province_id)->get();
            return $this->sendResponse($cities, 'Cities Retrieved Successfully!');
        } catch (\Throwable $th) {
            return $this->sendError('Internal server error', [], 500);
        }
    }

    public function district($city_id)
    {
        try {
            $districts = District::where('city_id', $city_id)->get();
            return $this->sendResponse($districts, 'District Retrieved Successfully!');
        } catch (\Throwable $th) {
            return $this->sendError('Internal server error', [], 500);
        }
    }

    public function subdistrict($district_id)
    {
        try {
            $subdistricts = Subdistrict::where('district_id', $district_id)->get();
            return $this->sendResponse($subdistricts, 'District Retrieved Successfully!');
        } catch (\Throwable $th) {
            return $this->sendError('Internal server error', [], 500);
        }
    }

    public function calculateCost(Request $request)
    {
        // destination 3829
        // $cartItems = Cart::with('variant')->where('user_id', Auth::user()->id)->get();
        // $weight = $cartItems->sum(fn($cart) => $cart->quantity * $cart->variant->weight);

        $response = Http::withHeader('key', config('services.rajaongkir.key'))
            ->asForm()
            ->post("https://rajaongkir.komerce.id/api/v1/calculate/district/domestic-cost", [
                'origin' => 1331,
                'destination' => $request->destination,
                'weight' => $request->weight,
                'courier' => 'sicepat',
                'price' => 'lowest'
            ]);

        return $response;
    }
}
