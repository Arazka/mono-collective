import { Link, usePage } from "@inertiajs/react";

export default function NavLink() {
    const categories = usePage().props.categories;

    return (
        <>
            {categories?.map((data) => (
                <Link
                    key={data.id}
                    href={`/category/${data.slug}`}
                    className="md:hover:underline md:hover:underline-offset-4"
                >
                    {data.name}
                </Link>
            ))}
        </>
    );
}
