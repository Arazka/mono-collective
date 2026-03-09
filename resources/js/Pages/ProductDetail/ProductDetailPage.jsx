import ProductGallery from "@/Components/ProductDetail/ProductGallery";
import ProductInfo from "@/Components/ProductDetail/ProductInfo";
import SizeSelector from "@/Components/ProductDetail/SizeSelector";
import Breadcrumbs from "@/Components/ui/Breadcrumbs";
import Button from "@/Components/ui/Button";
import { CartContext } from "@/Context/CartContext";
import { sizes } from "@/dummy/productDetail";
import { FormatRupiah } from "@/Helper/FormatRupiah";
import Layout from "@/Layouts/Layout";
import { ShoppingBagIcon, HeartIcon } from "@heroicons/react/24/outline";
// import { HeartIcon } from "@heroicons/react/24/solid";
import { router, usePage } from "@inertiajs/react";
import { useContext, useState } from "react";

export default function ProductDetailPage({ product }) {
    const { auth, myWishlist } = usePage().props;
    const [selectedSize, setSelectedSize] = useState();
    const [isCartLoading, setIsCartLoading] = useState(false);
    const [isWishlistLoading, setIsWishlistLoading] = useState(false);
    const { openCart } = useContext(CartContext);

    const isWishlist = myWishlist?.some(
        (data) => data.product_id === product.id
    );

    const handleAddToCart = () => {
        setIsCartLoading(true);
        router.post(
            "/cart/add",
            {
                product_id: product.id,
                product_variant_id: selectedSize,
                quantity: 1,
            },
            {
                onSuccess: () => {
                    setIsCartLoading(false);
                    if (auth.user) {
                        openCart();
                    }
                },
                showProgress: false,
                preserveScroll: true,
            }
        );
    };

    const handleAddToWishlist = () => {
        setIsWishlistLoading(true);

        router.post(
            "/wishlist/add",
            {
                product_id: product.id,
            },
            {
                showProgress: false,
                preserveScroll: true,
                onSuccess: () => {
                    setIsWishlistLoading(false);
                },
            }
        );
    };

    return (
        <Layout>
            <div className="px-3 lg:px-12 pt-4 lg:pt-10 pb-10 mx-auto max-w-3xl lg:max-w-screen-xl flex justify-center">
                <div>
                    <div className="flex mb-6 lg:hidden">
                        <Breadcrumbs
                            pages={[
                                { name: "product" },
                                { name: `${product.slug}` },
                            ]}
                        />
                    </div>

                    <div className="flex flex-col items-start gap-4 w-full lg:justify-center lg:gap-8 lg:flex-row">
                        <div className="flex-1 w-full lg:w-[30rem]">
                            {/* product gallery */}
                            <ProductGallery images={product.images} />
                        </div>
                        <div className="flex-none">
                            <div className="w-full lg:max-w-md">
                                {/* product info */}
                                <ProductInfo
                                    breadcrumbsData={[
                                        { name: "product" },
                                        { name: `${product.slug}` },
                                    ]}
                                    name={product.name}
                                    price={FormatRupiah(product.price)}
                                />

                                {/* selected size */}
                                <SizeSelector
                                    sizes={product.variants}
                                    selectedSize={selectedSize}
                                    onSelectedSize={setSelectedSize}
                                />

                                {/* button add to cart and wishlist */}
                                <div className="flex flex-col mt-8 space-y-2">
                                    <Button
                                        onClick={handleAddToCart}
                                        variant="secondary"
                                        size="lg"
                                        fullWidth
                                        disabled={
                                            !selectedSize || isCartLoading
                                        }
                                        loading={isCartLoading}
                                    >
                                        <ShoppingBagIcon className="size-6 text-dark-green" />
                                        Add to Bag
                                    </Button>
                                    <Button
                                        onClick={handleAddToWishlist}
                                        variant="primary"
                                        size="lg"
                                        fullWidth
                                        disabled={isWishlistLoading}
                                        loading={isWishlistLoading}
                                    >
                                        {isWishlist ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="size-6"
                                            >
                                                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                                            </svg>
                                        ) : (
                                            <HeartIcon className="size-6 text-light-green" />
                                        )}
                                        Add to Wishlist
                                    </Button>
                                </div>

                                {/* description */}
                                <div className="mt-8">
                                    <p className="pb-1 font-medium border-b border-gray-200">
                                        Description
                                    </p>
                                    <div
                                        className="mt-3 text-sm text-gray-600"
                                        dangerouslySetInnerHTML={{
                                            __html: product.description,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
