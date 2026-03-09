import { FormatRupiah } from "@/Helper/FormatRupiah";

export default function ShippingMethod({
    dataShippingMethod,
    selectedShippingMethod,
    setselectedShippingMethod,
    isLoadingShippingMethods,
}) {
    return (
        <div className="bg-white border border-gray-300 rounded-2xl py-6 px-4">
            <div className="flex items-center justify-between">
                <div className="text-lg font-semibold text-gray-900">
                    Shipping Method
                </div>
            </div>

            <div className="mt-4 space-y-3">
                {/* {dataShippingMethod ? (
                    dataShippingMethod?.map((data, index) => {
                        const selected = selectedShippingMethod === data;
                        return (
                            <button
                                key={index}
                                type="button"
                                onClick={() => setselectedShippingMethod(data)}
                                className={`w-full flex items-center justify-between rounded-xl border border-gray-300 p-4 text-left transition-all duration-200 transform hover:scale-[1.02]`}
                            >
                                <div className="flex items-center space-x-3">
                                    <div
                                        className={`w-5 h-5 flex items-center justify-center rounded-full border 
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
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">
                                            {data?.name} - {data?.service}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {data?.etd}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-sm font-semibold text-gray-900">
                                    {FormatRupiah(data?.cost)}
                                </p>
                            </button>
                        );
                    })
                ) : (
                    <div className="w-full text-sm text-gray-400 flex justify-center items-center h-[8rem]">
                        Please choose shipping address
                    </div>
                )} */}

                {isLoadingShippingMethods ? (
                    <div className="w-full text-sm text-gray-400 flex justify-center items-center gap-2 h-[8rem]">
                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                        <p className="tracking-widest">Loading...</p>
                    </div>
                ) : dataShippingMethod ? (
                    dataShippingMethod?.map((data, index) => {
                        const selected = selectedShippingMethod === data;
                        return (
                            <button
                                key={index}
                                type="button"
                                onClick={() => setselectedShippingMethod(data)}
                                className={`w-full flex items-center justify-between rounded-xl border border-gray-300 p-4 text-left transition-all duration-200 transform hover:scale-[1.02]`}
                            >
                                {/* Radio Indicator */}
                                <div className="flex items-center space-x-3">
                                    <div
                                        className={`w-5 h-5 flex items-center justify-center rounded-full border 
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
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">
                                            {data?.name} - {data?.service}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {data?.etd}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-sm font-semibold text-gray-900">
                                    {FormatRupiah(data?.cost)}
                                </p>
                            </button>
                        );
                    })
                ) : (
                    <div className="w-full text-sm text-gray-400 flex justify-center items-center h-[10rem]">
                        Please choose shipping address
                    </div>
                )}
            </div>
        </div>
    );
}
