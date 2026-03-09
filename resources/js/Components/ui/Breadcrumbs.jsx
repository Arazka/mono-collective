import { Link } from "@inertiajs/react";

export default function Breadcrumbs({ pages }) {
    return (
        <nav className="flex mb-2" aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-1">
                <li>
                    <Link
                        href="/"
                        className="text-xs text-gray-500 hover:text-gray-700 hover:underline hover:underline-offset-4"
                    >
                        Home
                    </Link>
                </li>
                {pages.map((page) => (
                    <li key={page.name}>
                        <div className="flex items-center">
                            <svg
                                className="flex-shrink-0 w-4 h-4 text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                            >
                                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                            </svg>
                            {page.href ? (
                                <Link
                                    href={page.href}
                                    className="ml-1 text-xs text-gray-500 hover:text-gray-700 hover:underline hover:underline-offset-4"
                                    aria-current={
                                        page.current ? "page" : undefined
                                    }
                                >
                                    {page.name}
                                </Link>
                            ) : (
                                <span className="ml-1 text-xs text-gray-500">
                                    {page.name}
                                </span>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
