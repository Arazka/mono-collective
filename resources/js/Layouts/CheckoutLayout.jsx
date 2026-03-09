import NavLogo from "@/Components/Navbar/NavLogo";
import customToast from "@/Components/ui/Toast";
import { usePage } from "@inertiajs/react";
import React from "react";

export default function CheckoutLayout({ children }) {
    const { flash } = usePage().props;

    React.useEffect(() => {
        if (flash.message) {
            customToast(flash.message);
        }
        if (flash.success) {
            customToast(flash.success);
        }
        if (flash.error) {
            customToast(flash.error);
        }
    }, [flash]);

    return (
        <>
            <header className="fixed top-0 z-30 w-full bg-white border-b shadow-sm ">
                <div className="flex items-center justify-center px-3 py-5 mx-auto text-gray-900 bg-white h-[4.5rem]">
                    <NavLogo />
                </div>
            </header>
            <div className="my-[6rem] mx-auto max-w-screen-md lg:max-w-screen-xl px-4">
                <div className="text-center">
                    <h1 className="text-2xl tracking-wider text-dark-green">
                        Checkout
                    </h1>
                    <p className="text-gray-500 text-xs tracking-normal">
                        Review your order and complete your purchase
                    </p>
                </div>
                <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-[5rem] mt-8">
                    {children}
                </div>
            </div>
        </>
    );
}
