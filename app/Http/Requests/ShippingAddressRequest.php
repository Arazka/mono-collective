<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class ShippingAddressRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'shipping_name' => ['required', 'string', 'max:100'],
            'shipping_phone' => ['required', 'numeric', 'digits_between:10,15'],
            'shipping_address_detail' => ['required', 'string', 'max:255'],
            'shipping_province_id' => ['required'],
            'shipping_city_id' => ['required'],
            'shipping_district_id' => ['required'],
            'shipping_subdistrict_id' => ['required'],
            // 'shipping_district_name' => ['required', 'string'],
            // 'shipping_subdistrict_name' => ['required', 'string'],
        ];
    }

    // protected function failedValidation(Validator $validator)
    // {
    //     throw new HttpResponseException(
    //         response()->json([
    //             'success' => false,
    //             'message' => 'Error validation',
    //             'data' => $validator->errors(),
    //         ], 422)
    //     ); 
    // }
}
