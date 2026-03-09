import OrderItems from "@/Components/Checkout/OrderItems";
import PaymentMethod from "@/Components/Checkout/PaymentMethod";
import ShippingInformation from "@/Components/Checkout/ShippingInformation";
import ShippingMethod from "@/Components/Checkout/ShippingMethod";
import Button from "@/Components/ui/Button";
import { payments } from "@/dummy/checkout";
import { FormatRupiah } from "@/Helper/FormatRupiah";
import CheckoutLayout from "@/Layouts/CheckoutLayout";
import { Link, router } from "@inertiajs/react";
import axios from "axios";
import React, { useState } from "react";

export default function Checkout({ carts, addresses, subtotal, weight }) {
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedShippingMehtod, setSelectedShippingMehtod] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [shippingMethods, setShippingMethods] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingShippingMethods, setIsLoadingShippingMethods] =
        useState(false);

    // console.log(selectedAddress?.id);
    // console.log(selectedShippingMehtod);
    // console.log(selectedPayment?.payment_type);

    // get shipping methods
    React.useEffect(() => {
        const getShippingMethods = async () => {
            setShippingMethods([]);
            setIsLoadingShippingMethods(true);
            if (setSelectedAddress) {
                try {
                    const res = await axios.post(
                        "/api/rajaongkir/calculatecost",
                        {
                            weight: weight,
                            destination: selectedAddress?.shipping_district_id,
                        }
                    );
                    setShippingMethods(res.data.data);
                    setIsLoadingShippingMethods(false);
                    // console.log(res.data.data);
                } catch (error) {
                    console.log("error: ", error);
                }
            }
        };

        getShippingMethods();
    }, [selectedAddress?.shipping_district_id]);

    //tax
    const tax = subtotal * 0.12;
    const total = selectedShippingMehtod?.cost
        ? subtotal + tax + selectedShippingMehtod?.cost
        : subtotal + tax;

    // submit
    const handlePayNow = () => {
        setIsLoading(true);
        router.post(
            `/checkout/store`,
            {
                shipping_address_detail: selectedAddress?.id,
                shipping_method_detail: selectedShippingMehtod,
                payment_type: selectedPayment?.payment_type,
                bank: selectedPayment?.value,
            },
            {
                showProgress: false,
                preserveScroll: true,
                onFinish: () => {
                    setIsLoading(false);
                },
            }
        );
    };

    return (
        <CheckoutLayout>
            <div className="flex flex-col flex-auto w-full space-y-8">
                {/* shipping address */}
                <ShippingInformation
                    dataAddress={addresses}
                    selectedAddress={selectedAddress}
                    setSelectedAddress={setSelectedAddress}
                />

                {/* shipping method */}
                <ShippingMethod
                    dataShippingMethod={shippingMethods}
                    selectedShippingMethod={selectedShippingMehtod}
                    setselectedShippingMethod={setSelectedShippingMehtod}
                    isLoadingShippingMethods={isLoadingShippingMethods}
                />

                <PaymentMethod
                    dataPayments={payments}
                    selectedPayment={selectedPayment}
                    setSelectedPayment={setSelectedPayment}
                />
            </div>

            {/* order items and total */}
            <div className="flex-none w-full lg:w-[28rem]">
                {/* order items */}
                <div className="text-lg font-semibold text-gray-900">
                    Order Items
                </div>
                <hr className="mb-4 mt-1 bg-gray-300" />
                <div className="flex flex-col space-y-4 overflow-y-auto max-h-[20rem] scrollbar-hide">
                    {carts?.map((data) => (
                        <OrderItems key={data.id} item={data} />
                    ))}
                </div>
                <hr className="mt-4 mb-1.5 bg-gray-300" />
                <div className="w-full flex items-center justify-end">
                    <span className="text-xs text-gray-500">
                        Total 3 item(s)
                    </span>
                </div>

                <div className="flex flex-col my-6 space-y-3">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Subtotal</p>
                        <p className="text-sm font-semibold">
                            {FormatRupiah(subtotal)}
                        </p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Shipping</p>
                        <p className="text-sm font-semibold">
                            {FormatRupiah(selectedShippingMehtod?.cost ?? 0)}
                        </p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Tax 12%</p>
                        <p className="text-sm font-semibold">
                            {FormatRupiah(tax)}
                        </p>
                    </div>
                    <div className="flex items-center justify-between pt-3">
                        <p className="text-base font-semibold">TOTAL</p>
                        <p className="text-base font-semibold">
                            {FormatRupiah(total)}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col items-center space-y-4">
                    <Button
                        onClick={handlePayNow}
                        variant="secondary"
                        size="lg"
                        fullWidth
                        loading={isLoading}
                        // disabled={
                        //     !selectedAddress ||
                        //     !selectedShippingMehtod ||
                        //     !selectedPayment
                        // }
                    >
                        <span className="uppercase tracking-wider">
                            Pay Now
                        </span>
                    </Button>
                    <Link
                        href={`/`}
                        className="text-sm underline underline-offset-2 tracking-wide text-dark-green hover:text-dark-green/50 transition ease-in-out duration-300"
                    >
                        Back to shop?
                    </Link>
                </div>
            </div>
        </CheckoutLayout>
    );
}
