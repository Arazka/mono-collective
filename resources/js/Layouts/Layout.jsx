import Navbar from "@/Components/Navbar/Navbar";
import customToast from "@/Components/ui/Toast";
import { usePage } from "@inertiajs/react";
import React from "react";

export default function Layout({ children }) {
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
            <Navbar />
            <div className="my-[4.5rem]">{children}</div>
        </>
    );
}
