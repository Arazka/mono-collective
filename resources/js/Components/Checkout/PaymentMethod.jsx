export default function PaymentMethod({
    dataPayments,
    selectedPayment,
    setSelectedPayment,
}) {
    return (
        <div className="bg-white border border-gray-300 rounded-2xl py-6 px-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="text-lg font-semibold text-gray-900">
                    Payment Method
                </div>
            </div>

            {/* Options */}
            <div className="mt-4 space-y-3">
                {dataPayments.map((data, index) => {
                    const selected = selectedPayment === data;
                    return (
                        <button
                            key={index}
                            type="button"
                            onClick={() => setSelectedPayment(data)}
                            className={`w-full flex items-center justify-between rounded-xl border border-gray-300 p-4 text-left transition-all duration-200 transform hover:scale-[1.02]`}
                        >
                            {/* Left side: radio + payment info */}
                            <div className="flex items-center gap-3">
                                {/* Radio Indicator */}
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

                                {/* Payment logo */}
                                <img
                                    src={data.src}
                                    alt={data.title}
                                    className="w-10 h-6 object-contain"
                                />

                                {/* Payment name */}
                                <span className="text-sm font-medium text-gray-900">
                                    {data.title}
                                </span>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
