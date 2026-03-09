import Product from "@/Components/Product/Product";
import AuthDashboardLayout from "@/Layouts/AuthDashboard";

export default function WishlistPage({ wishlists }) {
    const products = wishlists.map((data) => data.product);
    // console.log(products);

    return (
        <AuthDashboardLayout title="My Wishlist">
            {/* header content */}
            <div className="hidden lg:flex lg:mb-4">
                <h1 className="w-full text-start text-xl font-semibold text-dark-green">
                    My Wishlist
                </h1>
            </div>

            {/* content */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-5">
                {products &&
                    products.map((data) => (
                        <Product key={data.id} product={data} />
                    ))}
            </div>
            {products.length == 0 && (
                <span className="h-[12.5rem] text-center flex flex-col justify-center items-center text-sm tracking-wide capitalize text-gray-400">
                    wishlist not found
                </span>
            )}
        </AuthDashboardLayout>
    );
}
