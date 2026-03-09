import { FormatRupiah } from "@/Helper/FormatRupiah";

export default function OrderItems({ item }) {
    return (
        <div className="flex flex-row items-start space-x-3">
            <div className="flex-none">
                <img
                    src={`/storage/${item.product.thumb_image.image}`}
                    alt=""
                    className="object-cover object-top w-[5rem] rounded-lg"
                />
            </div>
            <div className="flex flex-col items-start justify-between space-y-3 w-full">
                <div className="flex justify-between items-start gap-3 w-full">
                    <p className="text-sm text-dark-green font-medium">
                        {item.product.name}
                    </p>
                    <p className="font-semibold text-sm text-dark-green flex-none">
                        {FormatRupiah(item.product.price)}
                    </p>
                </div>
                <div className="text-sm text-dark-green">
                    <div>
                        Size:{" "}
                        <span className="uppercase">{item.variant.size}</span>
                    </div>
                    <div>Qty : {item.quantity}</div>
                </div>
            </div>
        </div>
    );
}
