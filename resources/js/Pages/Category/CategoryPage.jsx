import Product from "@/Components/Product/Product";
import Breadcrumbs from "@/Components/ui/Breadcrumbs";
import Layout from "@/Layouts/Layout";
import ProductLayout from "@/Layouts/ProductLayout";

export default function CategoryPage({ category, products }) {
    return (
        <Layout>
            <div className="px-3 lg:px-12 pt-4 pb-10 max-w-screen-2xl mx-auto">
                <div className="mb-6">
                    <Breadcrumbs
                        pages={[
                            { name: "category" },
                            { name: `${category.slug}` },
                        ]}
                    />
                </div>

                <div>
                    {products && products.length > 0 ? (
                        <ProductLayout>
                            {products.map((data) => (
                                <Product key={data.id} product={data} />
                            ))}
                        </ProductLayout>
                    ) : (
                        <span className="h-[15rem] text-center flex flex-col justify-center items-center text-sm tracking-wide capitalize text-gray-400">
                            products not found
                        </span>
                    )}
                </div>
            </div>
        </Layout>
    );
}
