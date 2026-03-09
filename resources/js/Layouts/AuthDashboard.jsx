import NavLink from "@/Components/AuthDashboard/NavLink";
import Layout from "./Layout";
import {
    ArrowLeftIcon,
    ChevronDownIcon,
    ChevronLeftIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "@inertiajs/react";

export default function AuthDashboardLayout({
    children,
    title = "title page",
    buttonOpenNavLink = true,
    buttonNavBack = false,
    buttonNavBackPathName,
}) {
    const [isOpenNavLink, setIsOpenNavLink] = useState(false);

    const handleOpenNavLink = () => {
        setIsOpenNavLink((prev) => !prev);
    };

    return (
        <Layout>
            <div className="my-[6rem] mx-auto max-w-screen-md lg:max-w-screen-lg px-4 lg:px-0">
                <div className="text-center">
                    <h1 className="text-2xl tracking-wider text-dark-green">
                        Mono Collective Account
                    </h1>
                    <p className="text-gray-500 text-xs tracking-normal">
                        You can manage your account and track your order here
                    </p>
                </div>
                <hr className="mb-8 lg:mb-10 mt-5" />
                <div className="flex flex-col lg:flex-row items-start w-full justify-normal gap-8 lg:gap-12">
                    {/* sidebar */}
                    <div className="w-full lg:w-[14rem]">
                        <div className="hidden lg:flex lg:flex-none">
                            <NavLink />
                        </div>
                        <div
                            className={`relative flex items-center w-full lg:hidden ${
                                buttonNavBack ? "justify-start" : "justify-end"
                            }`}
                        >
                            {buttonNavBack && (
                                <Link
                                    href={buttonNavBackPathName}
                                    className="rounded-full border border-dark-green p-2 z-10"
                                >
                                    <ArrowLeftIcon
                                        className={`size-5 text-dark-green`}
                                    />
                                </Link>
                            )}
                            <p className="absolute mx-auto w-full text-center text-xl font-semibold text-dark-green">
                                {title}
                            </p>
                            {buttonOpenNavLink && (
                                <button
                                    type="button"
                                    onClick={handleOpenNavLink}
                                    className="rounded-full border border-dark-green p-2 z-10"
                                >
                                    <ChevronDownIcon
                                        className={`size-5 w-full text-dark-green transition transform duration-300 ${
                                            isOpenNavLink
                                                ? "rotate-180"
                                                : "rotate-0"
                                        }`}
                                    />
                                </button>
                            )}
                            {isOpenNavLink && (
                                <div className="absolute bg-white right-0 top-12 shadow-lg py-6 px-4 w-[15rem] border rounded-xl z-50">
                                    <NavLink />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* content */}
                    <div className="w-full">{children}</div>
                </div>
            </div>
        </Layout>
    );
}
