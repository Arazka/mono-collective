import { Link } from "@inertiajs/react";

export default function SearchProductItems({ product }) {
    return (
        <Link
            href={`/product/${product.slug}`}
            className="flex items-start gap-2 bg-white hover:bg-dark-green/30 rounded-md transition-all duration-200 ease-in-out"
        >
            <div className="basis-[4rem]">
                <img
                    src={`/storage/${product.thumb_image.image}`}
                    alt=""
                    className="object-cover w-full rounded-md"
                />
            </div>
            <div className="w-full flex flex-col items-start space-y-1">
                <p className="line-clamp-2 text-sm text-[#004030]">
                    {product.name}
                </p>
                <p className="font-medium text-sm text-[#004030] mb-2">
                    {product.price_rupiah}
                </p>
            </div>
        </Link>
    );
}
