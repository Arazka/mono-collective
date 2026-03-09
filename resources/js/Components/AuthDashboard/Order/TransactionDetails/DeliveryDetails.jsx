export default function DeliveryDetails({
    shipping_address,
    shipping_method,
    resi_code,
}) {
    // console.log(shipping_address);
    return (
        <div className="mb-6">
            <h1 className="text-lg font-medium mb-2">Delivery Details</h1>
            <div className="bg-white border border-gray-300 rounded-xl px-4 py-6 mb-6">
                <div className="flex flex-col space-y-4">
                    <div className="w-full">
                        <p className="text-xs font-bold text-gray-500/80 tracking-wide mb-1">
                            Delivery Type
                        </p>
                        <p className="text-sm font-semibold text-dark-green">
                            {shipping_method?.code} -{" "}
                            {shipping_method?.description}
                        </p>
                    </div>
                    <hr className="w-full" />
                    <div className="w-full">
                        <p className="text-xs font-bold text-gray-500/80 tracking-wide mb-1">
                            Resi Number
                        </p>
                        <p className="text-sm font-semibold text-dark-green">
                            {resi_code ? resi_code : "-"}
                        </p>
                    </div>
                    <hr className="w-full" />
                    <div className="w-full">
                        <p className="text-xs font-bold text-gray-500/80 tracking-wide mb-1">
                            Address
                        </p>
                        <div className="text-sm font-semibold text-dark-green">
                            <p>{shipping_address?.shipping_name}</p>
                            <p>
                                {shipping_address?.shipping_address_detail},{" "}
                                {shipping_address?.shipping_subdistrict_name},{" "}
                                {shipping_address?.shipping_district_name},{" "}
                                {shipping_address?.shipping_city_name},{" "}
                                {shipping_address?.shipping_province_name}
                            </p>
                            <p>{shipping_address?.shipping_phone}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
