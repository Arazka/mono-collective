import { formatDate } from "@/Helper/FormatDate";
import { FormatRupiah } from "@/Helper/FormatRupiah";
import StatusConfig from "@/Helper/StatusConfig";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";

export default function OrderItem({ order }) {
    // console.log(FormatRupiah(order?.grand_total));
    return (
        <Link
            href={`/account/order/${order?.order_code}`}
            as="button"
            className="bg-white border border-gray-300 rounded-xl p-4 transition-all duration-200 hover:shadow-inner hover:shadow-green-300"
        >
            <div className="flex flex-col justify-between space-y-6">
                <div className="flex items-start justify-between w-full">
                    <div>
                        <span className="flex items-end space-x-2 mb-2">
                            <ShoppingBagIcon className="size-5 text-dark-green mb-0.5" />
                            <p className="text-sm text-dark-green font-medium tracking-tight">
                                {order?.order_code}
                            </p>
                        </span>
                        <p className="text-sm text-dark-green tracking-tight text-start">
                            {formatDate(order?.order_date, "short")}
                            {/* {order?.order_date} */}
                        </p>
                    </div>
                    <div>
                        <StatusConfig value={order?.status} />
                    </div>
                </div>
                <div className="flex items-end justify-end w-full">
                    <div className="text-end">
                        <p className="text-xs text-gray-500 mb-0.5">
                            Total Amount
                        </p>
                        <p className="font-medium text-sm tracking-tighter">
                            {FormatRupiah(order?.grand_total)}
                        </p>
                    </div>
                    {/* <Link
                                href={`/`}
                                className="text-dark-green text-sm font-medium underline underline-offset-4"
                            >
                                Details Order
                            </Link> */}
                </div>
            </div>
        </Link>
    );
}
