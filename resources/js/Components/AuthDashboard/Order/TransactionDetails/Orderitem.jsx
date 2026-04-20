import { FormatRupiah } from "@/Helper/FormatRupiah";

export default function Orderitem({ item }) {
    // console.log(item);
    return (
        <div className="flex flex-row items-start space-x-4">
            <div className="flex-none">
                <img
                    src={`/storage/${item?.product?.thumb_image?.image}`}
                    alt=""
                    className="object-cover w-[8rem] sm:w-[10rem] rounded-xl"
                />
            </div>
            <div className="flex-1">
                <div className="flex flex-col items-start justify-between space-y-3 w-full">
                    <p className="text-base text-dark-green font-medium">
                        {item?.product_name}
                    </p>
                    <div className="text-xs font-semibold text-dark-green">
                        <div>
                            Size:{" "}
                            <span className="uppercase">
                                {item?.product_size}
                            </span>
                        </div>
                        <div>
                            Qty : {item?.quantity} x {FormatRupiah(item?.price)}
                        </div>
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-400">
                            Total Amount
                        </p>
                        <p className="font-semibold text-xs text-dark-green flex-none">
                            {FormatRupiah(item?.subtotal)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
