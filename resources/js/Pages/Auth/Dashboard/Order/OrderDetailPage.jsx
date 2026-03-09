import DeliveryDetails from "@/Components/AuthDashboard/Order/TransactionDetails/DeliveryDetails";
import OrderDetails from "@/Components/AuthDashboard/Order/TransactionDetails/OrderDetails";
import PaymentDetails from "@/Components/AuthDashboard/Order/TransactionDetails/PaymentDetails";
import { formatDate } from "@/Helper/FormatDate";
import StatusConfig from "@/Helper/StatusConfig";
import AuthDashboardLayout from "@/Layouts/AuthDashboard";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";

export default function OrderDetailPage({ orderDetail }) {
    // console.log(orderDetail.invoice.expired_at);
    // console.log(orderDetail.order_date);
    return (
        <AuthDashboardLayout
            title="Transaction Details"
            buttonOpenNavLink={false}
            buttonNavBack={true}
            buttonNavBackPathName={`/account/order`}
        >
            {/* header content */}
            <div className="hidden lg:flex lg:items-center lg:space-x-4 lg:mb-4">
                <Link
                    href={`/account/order`}
                    className="rounded-full border border-dark-green p-2 z-10"
                >
                    <ArrowLeftIcon className={`size-5 text-dark-green`} />
                </Link>
                <h1 className="w-full text-start text-xl font-semibold text-dark-green">
                    Transaction Details
                </h1>
            </div>

            {/* content */}
            <div className="w-full">
                <div className="bg-white border border-gray-300 rounded-xl p-4 mb-6">
                    <div className="flex flex-col space-y-2">
                        <div className="w-full flex items-center justify-between">
                            <p className="text-sm font-normal text-gray-500/80 tracking-wide">
                                Status
                            </p>
                            <StatusConfig value={orderDetail?.status} />
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <p className="text-sm font-normal text-gray-500/80 tracking-wide">
                                Order ID
                            </p>
                            <p className="text-sm font-medium text-dark-green">
                                {orderDetail?.order_code}
                            </p>
                        </div>
                        <div className="w-full flex items-center justify-between">
                            <p className="text-sm font-normal text-gray-500/80 tracking-wide">
                                Order Date
                            </p>
                            <p className="text-sm font-medium text-dark-green">
                                {formatDate(orderDetail?.order_date, "full")}
                            </p>
                        </div>
                    </div>
                </div>

                {/* order details */}
                <OrderDetails orderItems={orderDetail?.order_items} />

                {/* delivery details */}
                <DeliveryDetails
                    shipping_address={orderDetail?.shipping_address_detail}
                    shipping_method={JSON.parse(
                        orderDetail?.shipping_method_detail
                    )}
                    resi_code={orderDetail?.resi_code}
                />

                {/* payment details */}
                <PaymentDetails
                    invoice={orderDetail?.invoice}
                    subtotal={orderDetail?.subtotal}
                    deliveryFee={orderDetail?.shipping_cost}
                    grandTotal={orderDetail?.grand_total}
                    tax={orderDetail?.tax}
                />
            </div>
        </AuthDashboardLayout>
    );
}
