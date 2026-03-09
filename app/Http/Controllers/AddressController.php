<?php

namespace App\Http\Controllers;

use App\Http\Requests\ShippingAddressRequest;
use App\Models\City;
use App\Models\District;
use App\Models\Province;
use App\Models\Subdistrict;
use App\Models\UserShippingAddress;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AddressController extends Controller
{
    public function index()
    {
        $addresses = UserShippingAddress::where('user_id', Auth::user()->id)
            ->select([
                'id',
                'shipping_name',
                'shipping_phone',
                'shipping_province_name',
                'shipping_city_name',
                'shipping_district_name',
                'shipping_subdistrict_name',
                'shipping_address_detail',
            ])
            ->latest()
            ->get();

        return Inertia::render('Auth/Dashboard/Address/AddressPage', ['addresses' => $addresses]);
    }

    public function create()
    {
        return Inertia::render('Auth/Dashboard/Address/AddressManage');
    }

    public function store(ShippingAddressRequest $request)
    {
        $user = Auth::user();

        $data = $request->only([
            'shipping_name',
            'shipping_phone',
            'shipping_address_detail',
            'shipping_province_id',
            'shipping_city_id',
            'shipping_district_id',
            'shipping_subdistrict_id',
        ]);

        $province = Province::find($data['shipping_province_id']);
        $city = City::find($data['shipping_city_id']);
        $district = District::find($data['shipping_district_id']);
        $subdistrict = Subdistrict::find($data['shipping_subdistrict_id']);

        $data['shipping_province_name'] = $province->name;
        $data['shipping_city_name'] = $city->name;
        $data['shipping_district_name'] = $district->name;
        $data['shipping_subdistrict_name'] = $subdistrict->name;

        $user->addresses()->create($data);

        return redirect()->route('address.index')->with('message', 'Create new address successfully!');
    }

    public function edit($id)
    {
        $address = UserShippingAddress::find($id);
        return Inertia::render('Auth/Dashboard/Address/AddressManage', ['address' => $address]);
    }

    public function update(ShippingAddressRequest $request, $id)
    {
        $user = Auth::user();
        $address = UserShippingAddress::where('id', $id)->where('user_id', $user->id)->firstOrFail();

        $data = $request->only([
            'shipping_name',
            'shipping_phone',
            'shipping_address_detail',
            'shipping_province_id',
            'shipping_city_id',
            'shipping_district_id',
            'shipping_subdistrict_id',
        ]);

        $province = Province::find($data['shipping_province_id']);
        $city = City::find($data['shipping_city_id']);
        $district = District::find($data['shipping_district_id']);
        $subdistrict = Subdistrict::find($data['shipping_subdistrict_id']);

        $data['shipping_province_name'] = $province->name;
        $data['shipping_city_name'] = $city->name;
        $data['shipping_district_name'] = $district->name;
        $data['shipping_subdistrict_name'] = $subdistrict->name;

        $address->update($data);

        return redirect()->route('address.index')->with('message', 'Edit address successfully!');
    }

    public function destroy($id)
    {
        // $user = Auth::user();
        UserShippingAddress::where('id', $id)->where('user_id', Auth::user()->id)->delete();

        return back()->with('message', 'Delete address successfully!');
    }
}
