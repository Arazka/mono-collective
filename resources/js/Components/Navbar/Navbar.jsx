import {
    Bars2Icon,
    MagnifyingGlassCircleIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import NavLink from "./NavLink";
import NavLogo from "./NavLogo";
import NavActions from "./NavActions";
import MobileMenu from "./MobileMenu";
import { usePage } from "@inertiajs/react";
import SearchProduct from "./SearchProduct";

export default function Navbar() {
    const user = usePage().props.auth.user;
    const cartCount = usePage().props.cartCount;
    const cartItems = usePage().props.cartItems;
    const subtotalCartItems = usePage().props.subtotalCartItems;

    // console.log(cartItems?.length);

    return (
        <header className="fixed top-0 z-30 w-full bg-white border-b shadow-sm">
            <div className="flex items-center justify-between pl-3 pr-5 py-5 h-[4.5rem] mx-auto text-gray-900 bg-white lg:px-12 max-w-screen-2xl">
                <div className="flex items-center gap-3 lg:hidden">
                    <MobileMenu user={user} />

                    <div className="block lg:hidden">
                        <NavLogo />
                    </div>
                </div>

                <div className="flex items-center space-x-8">
                    {/* NavLogo */}
                    <div className="hidden lg:block">
                        <NavLogo />
                    </div>

                    {/* NavLink */}
                    <div className="hidden lg:flex z-50">
                        <div className="flex items-center space-x-4">
                            <NavLink />
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-3 z-50">
                    <SearchProduct />
                    <NavActions
                        user={user}
                        cartCount={cartCount}
                        cartItems={cartItems}
                        subtotalCartItems={subtotalCartItems}
                    />
                </div>
            </div>
        </header>
    );
}
