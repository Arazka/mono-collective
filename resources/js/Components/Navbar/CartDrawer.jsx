import Drawer from "../ui/Drawer";
import { useContext } from "react";
import CartItem from "../Cart/CartItem";
import LinkButton from "../ui/LinkButton";
import { CartContext } from "@/Context/CartContext";
import Button from "../ui/Button";
import { router } from "@inertiajs/react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { FormatRupiah } from "@/Helper/FormatRupiah";

export default function CartDrawer({ cartItems, subtotal = 0 }) {
    const { isCartOpen, setIsCartOpen, closeCart } = useContext(CartContext);

    // console.log(cartItems);

    const handleCheckout = () => {
        router.visit("/checkout", {
            onSuccess: () => {
                closeCart();
            },
        });
    };

    return (
        <Drawer
            position="right"
            title="Shoping Bags"
            open={isCartOpen}
            setOpen={setIsCartOpen}
            onClose={() => setIsCartOpen(false)}
        >
            {cartItems?.length > 0 ? (
                <div className="flex flex-col justify-between min-h-full space-y-0">
                    <div className="py-4 border-t border-b">
                        <div className="overflow-y-auto max-h-[calc(100vh-280px)] flex-1 scrollbar-hide">
                            <div className="flex flex-col space-y-4">
                                {cartItems?.map((data) => (
                                    <CartItem key={data.id} item={data} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className="flex items-center justify-between w-full mb-4 text-base font-medium">
                            <p>Subtotal :</p>
                            <p>{FormatRupiah(subtotal)}</p>
                        </div>

                        <Button
                            variant="secondary"
                            size="lg"
                            fullWidth
                            onClick={handleCheckout}
                        >
                            Checkout Now
                        </Button>
                        <p className="mt-2 text-xs text-center text-gray-500">
                            Taxes and shipping fee will be calculated at
                            checkout
                        </p>
                    </div>
                </div>
            ) : (
                <div className="w-full h-full flex justify-center items-center">
                    <div className="flex flex-col items-center gap-1">
                        <ShoppingBagIcon className="size-6 text-gray-400" />
                        <span className="text-sm text-gray-400 tracking-wide">
                            Your bag is empty
                        </span>
                    </div>
                </div>
            )}
        </Drawer>
    );
}
