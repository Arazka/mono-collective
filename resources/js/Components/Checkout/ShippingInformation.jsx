import { useState } from "react";

export default function ShippingInformation({
    dataAddress,
    selectedAddress,
    setSelectedAddress,
}) {
    const [open, setOpen] = useState(true);

    return (
        <div className="bg-white border border-gray-300 rounded-2xl py-6 px-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="text-lg font-semibold text-gray-900">
                    Shipping Address
                </div>
                {selectedAddress && (
                    <button
                        onClick={() => setOpen((open) => !open)}
                        className="text-sm text-dark-green underline underline-offset-2"
                    >
                        {open ? "Cancel" : "Change"}
                    </button>
                )}
            </div>

            {/* Content */}
            <div className="mt-4">
                <div className="flex flex-col space-y-3">
                    {open ? (
                        dataAddress.map((data, index) => {
                            const selected = selectedAddress === data;
                            return (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() => {
                                        setSelectedAddress(data);
                                        setOpen(false);
                                    }}
                                    className={`w-full flex items-start gap-3 rounded-xl border border-gray-300 p-4 text-left transition-all duration-200 transform hover:scale-[1.02]`}
                                >
                                    {/* Radio Indicator */}
                                    <div
                                        className={`mt-1 w-5 h-5 flex flex-none items-center justify-center rounded-full border 
                                            ${
                                                selected
                                                    ? "border-dark-green"
                                                    : "border-gray-300"
                                            }`}
                                    >
                                        {selected && (
                                            <div className="w-3 h-3 rounded-full bg-dark-green"></div>
                                        )}
                                    </div>

                                    {/* Address Info */}
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">
                                            {data.shipping_name}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {data.shipping_phone}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-2 leading-relaxed capitalize">
                                            {data.shipping_address_detail},{" "}
                                            {data.shipping_subdistrict_name},{" "}
                                            {data.shipping_district_name},{" "}
                                            {data.shipping_city_name},{" "}
                                            {data.shipping_province_name}
                                        </p>
                                    </div>
                                </button>
                            );
                        })
                    ) : (
                        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                            <p className="text-sm font-medium text-gray-900">
                                {selectedAddress?.shipping_name}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                {selectedAddress?.shipping_phone}
                            </p>
                            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                                {selectedAddress?.shipping_address_detail}, kel.{" "}
                                {selectedAddress?.shipping_subdistrict_name},{" "}
                                kec. {selectedAddress?.shipping_district_name},{" "}
                                Kab/Kota {selectedAddress?.shipping_city_name},{" "}
                                {selectedAddress?.shipping_province_name}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
