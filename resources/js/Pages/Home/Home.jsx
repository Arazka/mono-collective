import Navbar from "@/Components/Navbar/Navbar";
import Product from "@/Components/Product/Product";
import Layout from "@/Layouts/Layout";
import ProductLayout from "@/Layouts/ProductLayout";

export default function Home({ products }) {
    // console.log(products);

    return (
        <Layout>
            <div className="relative">
                <img
                    src="/assets/images/promo.jpg"
                    alt=""
                    className="w-full object-cover object-top md:h-[20rem] lg:h-[35rem] xl:h-[43rem]"
                />
                <div className="absolute inset-0 z-10 bg-black/30"></div>
                <div className="absolute inset-0 w-full flex justify-center items-center">
                    <p className="text-white font-semibold text-2xl md:text-3xl lg:text-5xl z-20">
                        Mid-Season Sale
                    </p>
                </div>
            </div>
            <div className="px-3 lg:px-12 py-10 max-w-screen-2xl mx-auto">
                <div className="mb-6">
                    <h1 className="font-semibold text-2xl">
                        Trending Products
                    </h1>
                </div>
                <ProductLayout>
                    {products.map((data) => (
                        <Product key={data.id} product={data} />
                    ))}
                </ProductLayout>
            </div>
        </Layout>
    );
}
