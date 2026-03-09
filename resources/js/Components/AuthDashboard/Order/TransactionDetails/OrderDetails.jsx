import Orderitem from "./Orderitem";

export default function OrderDetails({ orderItems }) {
    return (
        <div className="w-full mb-6">
            <h1 className="text-lg font-medium mb-2">Order Details</h1>
            <div className="w-full flex items-center justify-between">
                <p className="text-xs font-semibold text-dark-green">
                    Products
                </p>
                <p className="text-xs font-semibold text-gray-500/80">
                    {orderItems?.length} item
                </p>
            </div>

            <hr className="w-full mt-1.5" />

            <div className="pt-4 pb-6">
                <div className="flex flex-col space-y-4 overflow-y-auto max-h-[35rem] scrollbar-hide">
                    {orderItems?.map((data, index) => (
                        <Orderitem key={index} item={data} />
                    ))}

                    {/* <Orderitem />
                    <Orderitem /> */}
                </div>
            </div>

            <hr className="w-full mt-1.5" />
        </div>
    );
}
