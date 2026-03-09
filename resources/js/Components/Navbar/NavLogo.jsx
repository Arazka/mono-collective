import { Link } from "@inertiajs/react";

export default function NavLogo() {
    return (
        // <div
        //     className="
        //         flex justify-center items-center z-10
        //         absolute left-0 right-0 mx-auto
        //         lg:static lg:justify-start
        //     "
        // >
        //     <Link href="/">
        //         <span className="font-semibold text-xl capitalize">
        //             mono collective
        //         </span>
        //     </Link>
        // </div>

        <Link href={`/`} className="font-semibold text-xl capitalize">
            mono collective
        </Link>
    );
}
