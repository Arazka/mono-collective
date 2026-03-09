import { FormatRupiah } from "@/Helper/FormatRupiah";
import QrCodeSection from "./PaymentMethod/QrCodeSection";
import VaNumberSection from "./PaymentMethod/VaNumberSection";
import { formatDate } from "@/Helper/FormatDate";

export default function PaymentDetails({
    invoice,
    subtotal,
    deliveryFee,
    grandTotal,
    tax,
}) {
    return (
        <div className="mb-6">
            <h1 className="text-lg font-medium mb-2">Payment Details</h1>
            <div className="bg-white border border-gray-300 rounded-xl px-4 py-6 mb-6">
                <div className="flex flex-col space-y-4">
                    <div>
                        <div className="w-full flex items-center justify-between mb-1.5">
                            <p className="text-xs font-bold text-gray-500/80 tracking-wide">
                                Payment Method
                            </p>
                            <p className="text-sm font-semibold text-dark-green uppercase">
                                {invoice?.payment_type == "qris" && "qris"}
                                {invoice?.payment_type == "bank_transfer" &&
                                    "bank - " + invoice?.bank}
                            </p>
                        </div>

                        <hr className="w-full mb-3" />

                        <div className="w-full flex items-center justify-between mb-1.5">
                            <p className="text-xs font-bold text-gray-500/80 tracking-wide">
                                Expired At
                            </p>
                            <p className="text-sm font-semibold text-dark-green uppercase">
                                {formatDate(invoice?.expired_at, "full")}
                            </p>
                        </div>

                        <hr className="w-full mb-3" />

                        <div className="w-full flex items-center justify-between mb-1.5">
                            <p className="text-xs font-bold text-gray-500/80 tracking-wide">
                                Paid At
                            </p>
                            <p className="text-sm font-semibold text-dark-green uppercase">
                                {invoice?.paid_at
                                    ? formatDate(invoice?.paid_at, "full")
                                    : "-"}
                            </p>
                        </div>

                        <hr className="w-full mb-3" />

                        {invoice?.payment_type === "bank_transfer" && (
                            <VaNumberSection vaNumber={invoice?.va_number} />
                        )}
                        {invoice?.payment_type === "qris" && (
                            <QrCodeSection qrCodeURL={invoice?.qr_code_url} />
                        )}
                    </div>
                    <div>
                        <div className="w-full flex items-center justify-between mb-1.5">
                            <p className="text-xs font-bold text-gray-500/80 tracking-wide">
                                Total Price
                            </p>
                            <p className="text-sm font-semibold text-dark-green">
                                {FormatRupiah(subtotal)}
                            </p>
                        </div>
                        <hr className="w-full" />
                    </div>
                    <div>
                        <div className="w-full flex items-center justify-between mb-1.5">
                            <p className="text-xs font-bold text-gray-500/80 tracking-wide">
                                Delivery Fee
                            </p>
                            <p className="text-sm font-semibold text-dark-green">
                                {FormatRupiah(deliveryFee)}
                            </p>
                        </div>
                        <hr className="w-full" />
                    </div>
                    <div>
                        <div className="w-full flex items-center justify-between mb-1.5">
                            <p className="text-xs font-bold text-gray-500/80 tracking-wide">
                                Tax 12%
                            </p>
                            <p className="text-sm font-semibold text-dark-green">
                                {FormatRupiah(tax)}
                            </p>
                        </div>
                        <hr className="w-full" />
                    </div>
                    <div>
                        <div className="w-full flex items-center justify-between">
                            <p className="text-sm font-bold text-gray-500/80 tracking-wide">
                                TOTAL
                            </p>
                            <p className="text-sm font-semibold text-dark-green">
                                {FormatRupiah(grandTotal)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
