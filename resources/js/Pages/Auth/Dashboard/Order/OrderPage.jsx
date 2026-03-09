import OrderItem from "@/Components/AuthDashboard/Order/OrderItem";
import AuthDashboardLayout from "@/Layouts/AuthDashboard";

export default function OrderPage({ orders }) {
    // console.log(orders);

    return (
        <AuthDashboardLayout title="My Order">
            {/* header content */}
            <div className="hidden lg:flex lg:mb-4">
                <h1 className="w-full text-start text-xl font-semibold text-dark-green">
                    My Order
                </h1>
            </div>

            {/* content */}
            <div className="flex flex-col space-y-4 max-h-[calc(100vh-280px)] overflow-y-auto scrollbar-hide scroll-smooth">
                {orders?.length > 0 ? (
                    orders.map((data, index) => (
                        <OrderItem key={index} order={data} />
                    ))
                ) : (
                    <span className="h-[12.5rem] text-center flex flex-col justify-center items-center text-sm tracking-wide capitalize text-gray-400">
                        orders not found
                    </span>
                )}

                {/* <OrderItem />
                <OrderItem />
                <OrderItem />
                <OrderItem /> */}
            </div>
        </AuthDashboardLayout>
    );
}
