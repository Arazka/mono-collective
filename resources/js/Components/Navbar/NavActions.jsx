import {
    HeartIcon,
    ShoppingBagIcon,
    UserIcon,
} from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";
import CartDrawer from "./CartDrawer";
import { CartContext } from "@/Context/CartContext";
import { useContext } from "react";

export default function NavActions({
    user,
    cartCount,
    cartItems,
    subtotalCartItems,
}) {
    const { openCart } = useContext(CartContext);

    return (
        <>
            <Link
                href={`${user ? "/account/order" : "/login"}`}
                as="button"
                className="lg:underline lg:underline-offset-2 hidden lg:flex lg:items-center lg:space-x-1"
            >
                <UserIcon className="size-6 text-gray-900" />
                <span className="capitalize">
                    {user && <p>Hello, {user.name}</p>}
                </span>
            </Link>

            <Link
                href={`/account/wishlist`}
                as="button"
                className="hidden lg:flex"
            >
                <HeartIcon className="size-6 text-gray-900" />
            </Link>
            <div className="relative cursor-pointer" onClick={openCart}>
                <ShoppingBagIcon className="size-6 text-gray-900" />
                <div className="rounded-full bg-light-green absolute -top-3 -right-3 w-6 h-6 flex justify-center items-center">
                    <span className="text-dark-green text-xs font-medium">
                        {user ? cartCount : "0"}
                    </span>
                </div>
            </div>
            <CartDrawer cartItems={cartItems} subtotal={subtotalCartItems} />
        </>
    );
}
