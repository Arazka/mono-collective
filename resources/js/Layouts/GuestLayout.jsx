import NavLogo from "@/Components/Navbar/NavLogo";
import customToast from "@/Components/ui/Toast";
import { usePage } from "@inertiajs/react";
import React from "react";

export default function GuestLayout({ children, title }) {
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
        <div className="flex min-h-screen flex-col items-center justify-center bg-white">
            <header className="fixed top-0 z-30 w-full bg-white border-b shadow-sm">
                <div className="flex items-center justify-center px-3 py-5 mx-auto text-gray-900 bg-white h-[4.5rem]">
                    <NavLogo />
                </div>
            </header>

            <div className="uppercase tracking-wider text-2xl">{title}</div>
            <div className="px-4 pt-10 w-full max-w-sm">{children}</div>
        </div>
    );
}
