import {
    ArrowLeftStartOnRectangleIcon,
    HeartIcon,
    HomeIcon,
    IdentificationIcon,
    ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { Link, usePage } from "@inertiajs/react";

export default function NavLink() {
    const { url } = usePage();

    return (
        <div className="flex flex-col space-y-5">
            <Link
                href={`/account/order`}
                className={`flex items-center space-x-3 hover:text-dark-green group ${
                    url.startsWith("/account/order")
                        ? "text-dark-green"
                        : "text-dark-green/50"
                }`}
            >
                <ShoppingBagIcon className="size-6" />
                <span
                    className={`${
                        url.startsWith("/account/order")
                            ? "font-semibold"
                            : "font-medium"
                    } group-hover:font-semibold`}
                >
                    My Order
                </span>
            </Link>
            <Link
                href={`/account/wishlist`}
                className={`flex items-center space-x-3 hover:text-dark-green group ${
                    url.startsWith("/account/wishlist")
                        ? "text-dark-green"
                        : "text-dark-green/50"
                }`}
            >
                <HeartIcon className="size-6" />
                <span
                    className={`${
                        url.startsWith("/account/wishlist")
                            ? "font-semibold"
                            : "font-medium"
                    } group-hover:font-semibold`}
                >
                    My Wishlist
                </span>
            </Link>
            <Link
                href={`/account/address`}
                className={`flex items-center space-x-3 hover:text-dark-green group ${
                    url.startsWith("/account/address")
                        ? "text-dark-green"
                        : "text-dark-green/50"
                }`}
            >
                <HomeIcon className="size-6" />
                <span
                    className={`${
                        url.startsWith("/account/address")
                            ? "font-semibold"
                            : "font-medium"
                    } group-hover:font-semibold`}
                >
                    My Address
                </span>
            </Link>
            <Link
                href={`/account/account-info`}
                className={`flex items-center space-x-3 hover:text-dark-green group ${
                    url.startsWith("/account/account-info")
                        ? "text-dark-green"
                        : "text-dark-green/50"
                }`}
            >
                <IdentificationIcon className="size-6" />
                <span
                    className={`${
                        url.startsWith("/account/account-info")
                            ? "font-semibold"
                            : "font-medium"
                    } group-hover:font-semibold`}
                >
                    Account Info
                </span>
            </Link>
            <Link
                href={route("logout")}
                method="post"
                as="button"
                className={`flex items-center space-x-3 text-dark-green/50 hover:text-dark-green group`}
            >
                <ArrowLeftStartOnRectangleIcon className="size-6" />
                <span className={`font-medium group-hover:font-semibold`}>
                    Logout
                </span>
            </Link>
        </div>
    );
}
