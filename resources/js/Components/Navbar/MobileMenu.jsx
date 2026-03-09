import {
    ArrowLeftStartOnRectangleIcon,
    Bars2Icon,
    UserIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import Drawer from "../ui/Drawer";
import NavLink from "./NavLink";
import { Link } from "@inertiajs/react";
import LinkButton from "../ui/LinkButton";

export default function MobileMenu({ user }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsMenuOpen(true)}
                className="z-50"
            >
                <Bars2Icon className="size-6 text-gray-900" />
            </button>
            <Drawer
                position="left"
                title="Mono Collective"
                open={isMenuOpen}
                setOpen={setIsMenuOpen}
                onClose={() => setIsCartOpen(false)}
            >
                <div className="flex flex-col justify-between h-full">
                    <div className="flex flex-col space-y-4">
                        <NavLink />
                    </div>
                    <div className="flex flex-col space-y-2">
                        {user ? (
                            <>
                                <Link
                                    href={`/account/order`}
                                    as="button"
                                    className="underline underline-offset-2 flex items-end space-x-2 mb-4"
                                >
                                    <UserIcon className="size-6 text-gray-900" />
                                    <p>Hello, {user.name}</p>
                                </Link>
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="underline underline-offset-2 flex items-end space-x-2 mb-4"
                                >
                                    <ArrowLeftStartOnRectangleIcon className="size-6 text-gray-900" />
                                    <p>Logout</p>
                                </Link>
                            </>
                        ) : (
                            <>
                                <LinkButton
                                    href={`/login`}
                                    variant="primary"
                                    size="md"
                                >
                                    Sign In
                                </LinkButton>
                                <LinkButton
                                    href={`/register`}
                                    variant="secondary"
                                    size="md"
                                >
                                    Sign Up
                                </LinkButton>
                            </>
                        )}
                    </div>
                </div>
            </Drawer>
        </>
    );
}
