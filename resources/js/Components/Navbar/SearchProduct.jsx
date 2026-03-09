import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from "react";
import Modal from "../ui/Modal";
import SearchProductItems from "./SearchProductItems";
import SpinLoading from "../ui/SpinLoading";
import axios from "axios";
import { useDebounce } from "@/Hooks/useDebounce";
import { router } from "@inertiajs/react";

export default function SearchProduct() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [keywoard, setKeywoard] = React.useState("");
    const [products, setProducts] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const debounceValue = useDebounce(keywoard, 1000);

    // live search
    React.useEffect(() => {
        const getProducts = async () => {
            if (debounceValue == "") return;

            try {
                const res = await axios.get(
                    `http://127.0.0.1:8000/api/products?search=${debounceValue}`
                );
                setProducts(res.data.data);
            } catch (error) {
                console.log("error:", error);
                setProducts([]);
            } finally {
                setIsLoading(false);
            }
        };

        getProducts();
    }, [debounceValue]);

    // loading live search
    React.useEffect(() => {
        if (!keywoard.trim()) {
            setIsLoading(false);
        } else {
            setIsLoading(true);
        }
    }, [keywoard]);

    // handle search
    const handleSearch = () => {
        router.get("/search", {
            keywoard: keywoard,
        });
    };

    // clear search value
    React.useEffect(() => {
        if (isOpen) {
            setKeywoard("");
        }
    }, [isOpen]);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                type="button"
                className="flex items-center gap-1 cursor-pointer text-gray-900 md:hover:underline md:hover:underline-offset-4 focus:outline-none"
            >
                <MagnifyingGlassIcon className="size-6" />
                <span className="hidden lg:block">Search</span>
            </button>

            <Modal open={isOpen} setOpen={setIsOpen} position="top">
                {/* search input */}
                <div className="flex items-center justify-between gap-1">
                    <input
                        type="text"
                        id="search"
                        name="search"
                        value={keywoard}
                        onChange={(e) => setKeywoard(e.target.value)}
                        className="rounded-3xl text-sm px-5 py-4 font-semibold w-full border-0 outline-none focus:ring-0 placeholder:text-gray-400/60"
                        placeholder="Search product..."
                    />
                    <button
                        type="button"
                        onClick={handleSearch}
                        className="basis-[4rem] h-full flex items-center justify-center py-3 rounded-tr-3xl"
                    >
                        <MagnifyingGlassIcon className="size-6 text-gray-800" />
                    </button>
                </div>

                {/* result */}
                {keywoard && (
                    <div className="border-t p-5">
                        {isLoading && (
                            <div className="w-full py-2 flex justify-center">
                                <SpinLoading
                                    size="w-8 h-8"
                                    color="border-gray-500"
                                />
                            </div>
                        )}
                        {!isLoading && products?.data?.length > 0 && (
                            <div className="space-y-1">
                                {products?.data?.map((data) => (
                                    <SearchProductItems
                                        key={data.id}
                                        product={data}
                                    />
                                ))}
                            </div>
                        )}
                        {!isLoading && !products?.data && (
                            <p className="text-sm text-gray-500 py-2">
                                Product not found
                            </p>
                        )}
                    </div>
                )}
            </Modal>
        </>
    );
}
