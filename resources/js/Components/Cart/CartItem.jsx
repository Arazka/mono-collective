import { FormatRupiah } from "@/Helper/FormatRupiah";
import {
    MinusCircleIcon,
    PlusCircleIcon,
    TrashIcon,
} from "@heroicons/react/24/solid";
import { router } from "@inertiajs/react";
import React, { useState } from "react";

export default function CartItem({ item }) {
    const [isLoading, setIsLoading] = useState(false);

    const handleUpdateQuantity = (isMethod) => {
        setIsLoading(true);

        router.put(
            "/cart/update/quantity",
            {
                cart_id: item.id,
                method: isMethod,
            },
            {
                showProgress: false,
                preserveScroll: true,
                onSuccess: () => {
                    setIsLoading(false);
                },
            }
        );
    };

    const handleDelete = () => {
        setIsLoading(true);

        router.delete(`/cart/delete/${item.id}`, {
            showProgress: false,
            preserveScroll: true,
            onSuccess: () => {
                setIsLoading(false);
            },
        });
    };

    return (
        <div className="relative flex flex-row items-start gap-3">
            <div className="basis-[15rem]">
                <img
                    src={`/storage/${item.product.thumb_image.image}`}
                    alt=""
                    className="object-cover w-full rounded-lg"
                />
            </div>
            <div className="basis-[25rem] flex flex-col items-start justify-between space-y-4">
                <div>
                    <p className="line-clamp-2 text-sm text-[#004030]">
                        {item.product.name}
                    </p>
                    <p className="font-medium text-sm text-[#004030] mb-2">
                        {FormatRupiah(item.product.price)}
                    </p>
                    <p className="font-medium text-sm text-[#004030] uppercase">
                        {item.variant.size}
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => handleUpdateQuantity("decrement")}
                        disabled={item.quantity <= 1}
                    >
                        <MinusCircleIcon className="size-8 text-[#004030]" />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                        onClick={() => handleUpdateQuantity("increment")}
                        disabled={item.quantity >= 3}
                    >
                        <PlusCircleIcon className="size-8 text-[#004030]" />
                    </button>
                </div>
            </div>
            <button
                onClick={handleDelete}
                className="bg-red-500 rounded-full p-1.5"
            >
                <TrashIcon className="size-4 text-white" />
            </button>
            {isLoading && (
                <div className="absolute w-full h-full rounded-lg flex justify-center items-center text-sm tracking-widest bg-white/80  text-gray-400 text-semibold">
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
        </div>
    );
}
