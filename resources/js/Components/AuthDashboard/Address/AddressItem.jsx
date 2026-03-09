import { Link, router } from "@inertiajs/react";

export default function AddressItem({ address }) {
    const handleDelete = () => {
        router.delete(route("address.delete", address.id));
    };
    return (
        <div className="w-full border border-gray-300 rounded-xl p-4 bg-white">
            {/* header */}
            <div className="flex items-start justify-between mb-4">
                <p className="font-semibold text-lg text-dark-green">
                    {address.shipping_name}
                </p>

                <div className="flex items-start gap-3">
                    <Link
                        href={`/account/address/edit/${address.id}`}
                        className="underline underline-offset-4 tracking-wider"
                    >
                        Edit
                    </Link>
                    <button
                        type="submit"
                        onClick={handleDelete}
                        className="underline underline-offset-4 tracking-wider"
                    >
                        Delete
                    </button>
                </div>
            </div>

            {/* Address */}
            <div className="mb-4">
                <p className="text-gray-400 uppercase font-medium text-xs tracking-wider mb-1">
                    Alamat Lengkap
                </p>
                <p className="text-sm text-gray-700 leading-relaxed max-w-[18rem]">
                    {address.shipping_address_detail},{" "}
                    {address.shipping_subdistrict_name},{" "}
                    {address.shipping_district_name},{" "}
                    {address.shipping_city_name},{" "}
                    {address.shipping_province_name}
                </p>
            </div>

            {/* Phone */}
            <div>
                <p className="text-gray-400 uppercase font-medium text-xs tracking-wider mb-1">
                    Telepon
                </p>
                <p className="text-sm text-gray-700">
                    {address.shipping_phone}
                </p>
            </div>
        </div>
    );
}
