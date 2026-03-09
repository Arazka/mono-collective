import Product from "@/Components/Product/Product";
import Layout from "@/Layouts/Layout";
import ProductLayout from "@/Layouts/ProductLayout";
import React from "react";

export default function Search({ products = [], keywoard }) {
    const isProducts = products?.data ?? [];

    return (
        <Layout>
            <div className="px-3 lg:px-12 py-6 max-w-screen-2xl mx-auto">
                <div className="mb-6">
                    {keywoard && (
                        <p className="text-sm mb-6">
                            Showing result for{" "}
                            <span className="font-bold">"{keywoard}"</span>
                        </p>
                    )}
                    {isProducts?.length == 0 && (
                        <p className="font-bold text-lg">Nothing Found</p>
                    )}
                </div>
                <ProductLayout>
                    {isProducts?.length > 0 &&
                        isProducts?.map((data) => (
                            <Product key={data.id} product={data} />
                        ))}
                </ProductLayout>
            </div>
        </Layout>
    );
}
