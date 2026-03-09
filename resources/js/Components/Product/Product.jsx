import { FormatRupiah } from "@/Helper/FormatRupiah";
import { Link } from "@inertiajs/react";

export default function Product({ product }) {
    return (
        <Link href={`/product/${product.slug}`} className="">
            <div className="mb-2">
                <img
                    src={`/storage/${product.thumb_image.image}`}
                    alt=""
                    className="object-cover object-top w-full h-auto rounded-xl"
                />
            </div>
            <div className="flex flex-col items-start space-y-2 justify-between px-1">
                <p className="line-clamp-2 text-sm text-dark-green">
                    {product.name}
                </p>
                <p className="font-medium text-sm text-dark-green">
                    {FormatRupiah(product.price)}
                </p>
            </div>
        </Link>
    );
}
